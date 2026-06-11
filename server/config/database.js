const mongoose = require("mongoose");
const dns = require("node:dns");

const DEFAULT_LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/ai-growth-exa";

const getDbUris = () => {
    const primary =
        process.env.MONGO_URI ||
        process.env.MONGODB_URI ||
        DEFAULT_LOCAL_MONGO_URI;
    const fallback =
        process.env.MONGO_URI_FALLBACK ||
        process.env.MONGODB_URI_FALLBACK ||
        process.env.MONGO_FALLBACK_URI;

    if (!primary) {
        throw new Error(
            "MongoDB connection string (MONGO_URI or MONGODB_URI) is missing in environment variables."
        );
    }

    return { primary, fallback };
};

const shouldTryFallback = (err, uri) => {
    const msg = String(err?.message || "");
    return (
        typeof uri === "string" &&
        uri.startsWith("mongodb+srv://") &&
        (msg.includes("querySrv") ||
            msg.includes("ENOTFOUND") ||
            msg.includes("EAI_AGAIN") ||
            msg.includes("ECONNREFUSED"))
    );
};

const applyDnsServersIfConfigured = () => {
    const raw = process.env.DNS_SERVERS;
    if (!raw) return false;

    const servers = raw
        .split(",")
        .map((server) => server.trim())
        .filter(Boolean);

    if (servers.length === 0) return false;

    dns.setServers(servers);
    return true;
};

const applyDefaultDnsServersForSrv = () => {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
};

const connectOnce = async (dbUri) =>
    mongoose.connect(dbUri, {
        family: 4,
        serverSelectionTimeoutMS: 10000,
    });

const connectToMongo = async () => {
    const { primary, fallback } = getDbUris();

    applyDnsServersIfConfigured();

    try {
        const conn = await connectOnce(primary);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return;
    } catch (err) {
        if (shouldTryFallback(err, primary) && !process.env.DNS_SERVERS) {
            try {
                applyDefaultDnsServersForSrv();
                const conn = await connectOnce(primary);
                console.log(`MongoDB connected (dns retry): ${conn.connection.host}`);
                return;
            } catch (_) {
                // Fall through to URI fallback or final error logging.
            }
        }

        const canFallback = Boolean(fallback) && shouldTryFallback(err, primary);

        if (canFallback) {
            try {
                const conn = await connectOnce(fallback);
                console.log(`MongoDB connected (fallback): ${conn.connection.host}`);
                return;
            } catch (fallbackErr) {
                console.error(
                    "MongoDB connection error (fallback):",
                    fallbackErr?.message || fallbackErr
                );
            }
        }

        console.error("MongoDB connection error:", err?.message || err);

        if (process.env.NODE_ENV === "production") {
            throw err;
        }
    }
};

module.exports = connectToMongo;

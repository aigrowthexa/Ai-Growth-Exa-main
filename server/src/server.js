const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const PORT = process.env.PORT || 5011;
const DEFAULT_LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/ai-growth-exa";
const MONGO_URI = process.env.MONGO_URI || DEFAULT_LOCAL_MONGO_URI;
const MONGO_FALLBACK_URI = process.env.MONGO_FALLBACK_URI || DEFAULT_LOCAL_MONGO_URI;

const startServer = (port) => {
    const server = app.listen(port, "0.0.0.0", () => {
        console.log(`Server running on port ${port}`);
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE" && process.env.NODE_ENV !== "production") {
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error("Server error:", err);
            process.exit(1);
        }
    });
};

const isSrvDnsError = (err) =>
    err?.code === "ECONNREFUSED" && err?.syscall === "querySrv";

const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${MONGO_URI}`);
        return;
    } catch (err) {
        const canFallback =
            process.env.NODE_ENV !== "production" &&
            isSrvDnsError(err) &&
            MONGO_FALLBACK_URI !== MONGO_URI;

        if (!canFallback) {
            throw err;
        }

        console.warn("Atlas SRV lookup failed, trying local MongoDB fallback...");
        await mongoose.connect(MONGO_FALLBACK_URI);
        console.log(`MongoDB connected via fallback: ${MONGO_FALLBACK_URI}`);
    }
};

connectToMongo()
    .then(() => {
        startServer(Number(PORT));
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });

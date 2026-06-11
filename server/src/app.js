const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const blogRoutes = require("./routes/blogRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const careerRoutes = require("./routes/careerRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const connectRoutes = require("./routes/connectRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const serviceRoutes = require("./routes/pageRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use("/uploads", express.static("uploads"));

const defaultAllowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://ai-growth-exa-main.vercel.app",
];

const configuredOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URLS,
]
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        const isAllowedOrigin = allowedOrigins.includes(origin);
        const isLocalDevOrigin =
            process.env.NODE_ENV !== "production" &&
            /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

        if (isAllowedOrigin || isLocalDevOrigin) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api", connectRoutes);
app.use("/api", subscriberRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Ai Growth Exa API", status: "Running" });
});


if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "../../client/dist");
    const indexFilePath = path.join(distPath, "index.html");

    if (fs.existsSync(indexFilePath)) {
        app.use(express.static(distPath));

        app.use((req, res, next) => {
            if (!req.path.startsWith("/api")) {
                res.sendFile(indexFilePath);
            } else {
                next();
            }
        });
    } else {
        console.warn(`Client dist not found at ${indexFilePath}. Serving API routes only.`);
    }
}


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;

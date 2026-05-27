const express = require("express");
const router = express.Router();

const upload = require("../middlewares/applicationMiddleware");
const { applyForJob } = require("../controllers/applicationControllers");

router.post("/apply", (req, res, next) => {
    upload.single("resume")(req, res, (error) => {
        if (!error) {
            return next();
        }

        const statusCode = error.code === "LIMIT_FILE_SIZE" ? 400 : 422;

        return res.status(statusCode).json({
            success: false,
            message: error.message || "Resume upload failed",
        });
    });
}, applyForJob);

module.exports = router;

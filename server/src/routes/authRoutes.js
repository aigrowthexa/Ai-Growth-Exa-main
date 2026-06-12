const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
    createAdmin,
    getProfile,
    register,
    resendVerificationOtp,
    verifyEmail,
    login,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    googleLogin,
    getGoogleAuthConfig
} = require("../controllers/authController");

router.get("/google-config", getGoogleAuthConfig);
router.get("/me", protect, getProfile);
router.post("/create-admin", createAdmin);
router.post("/register", register);
router.post("/resend-verification-otp", resendVerificationOtp);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
router.post("/google", googleLogin);

module.exports = router;

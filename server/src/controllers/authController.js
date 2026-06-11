const User = require("../models/User");
const PendingRegistration = require("../models/PendingRegistration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { OAuth2Client } = require('google-auth-library');

const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

const EMAIL_LOGO_URL =
    process.env.EMAIL_LOGO_URL || "https://aigrowthexa.com/assets/email-logo.png";

const buildOtpEmailHtml = ({ label, otp, intro, footer }) => `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
        <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
            <div style="margin: 0 0 20px; text-align: center;">
                <img
                    src="${EMAIL_LOGO_URL}"
                    alt="AI Growth Exa"
                    style="max-width: 210px; width: 100%; height: auto; display: inline-block;"
                />
            </div>
            <p style="margin: 0 0 8px; color: #6366f1; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-align: center;">AI Growth Exa</p>
            <h1 style="margin: 0 0 16px; color: #0f172a; font-size: 24px; line-height: 1.25;">${label}</h1>
            <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.7;">${intro}</p>
            <div style="margin: 0 0 16px; padding: 18px; text-align: center; border-radius: 14px; background: #eef2ff; border: 1px solid #c7d2fe;">
                <p style="margin: 0 0 8px; color: #6366f1; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;">One-Time Password</p>
                <p style="margin: 0; color: #0f172a; font-size: 32px; font-weight: 800; letter-spacing: 0.3em;">${otp}</p>
            </div>
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.7;">${footer}</p>
        </div>
    </div>
`;

const sendRegistrationOtpEmail = async (email, otp) =>
    sendEmail(
        email,
        "Verify your AI Growth Exa account",
        `Your registration OTP is ${otp}.\n\nUse this code to verify your email address. This code will expire in 2 minutes.`,
        buildOtpEmailHtml({
            label: "Verify your account",
            otp,
            intro: "Use the OTP below to complete your registration and activate your AI Growth Exa account.",
            footer: "This code expires in 10 minutes. If you did not try to create an account, you can ignore this email.",
        })
    );

const sendResetOtpEmail = async (email, otp) =>
    sendEmail(
        email,
        "Reset your AI Growth Exa password",
        `Your password reset OTP is ${otp}.\n\nUse this code to continue resetting your password. This code will expire in 2 minutes.`,
        buildOtpEmailHtml({
            label: "Reset password verification",
            otp,
            intro: "Use the OTP below to continue resetting your password for AI Growth Exa.",
            footer: "This code expires in 10 minutes. If you did not request a password reset, you can ignore this email.",
        })
    );

exports.createAdmin = async (req, res) => {
    const exists = await User.findOne({ role: "admin" });
    if (exists) return res.status(400).json({ message: "Admin exists" });

    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password: await bcrypt.hash(password.toString(), 10),
        role: "admin",
        isVerified: true
    });

    res.json({ message: "Admin created" });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser?.isVerified) {
            return res.status(400).json({ message: "User exists" });
        }

        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000;

        if (existingUser && !existingUser.isVerified) {
            existingUser.name = name;
            existingUser.password = await bcrypt.hash(password.toString(), 10);
            existingUser.otp = otp;
            existingUser.otpExpiry = otpExpiry;
            await existingUser.save();
        } else {
            await PendingRegistration.findOneAndUpdate(
                { email: normalizedEmail },
                {
                    name,
                    email: normalizedEmail,
                    password: await bcrypt.hash(password.toString(), 10),
                    otp,
                    otpExpiry,
                    createdAt: new Date(),
                },
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                }
            );
        }

        await sendRegistrationOtpEmail(normalizedEmail, otp);
        res.json({ message: "OTP sent", email: normalizedEmail });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resendVerificationOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000;

        const pendingRegistration = await PendingRegistration.findOne({ email: normalizedEmail });
        if (pendingRegistration) {
            pendingRegistration.otp = otp;
            pendingRegistration.otpExpiry = otpExpiry;
            pendingRegistration.createdAt = new Date();
            await pendingRegistration.save();

            await sendRegistrationOtpEmail(normalizedEmail, otp);
            return res.json({ message: "OTP resent", email: normalizedEmail });
        }

        const user = await User.findOne({ email: normalizedEmail, isVerified: false });
        if (!user) {
            return res.status(404).json({ message: "No pending registration found for this email" });
        }

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendRegistrationOtpEmail(normalizedEmail, otp);
        return res.json({ message: "OTP resent", email: normalizedEmail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    const { email, otp } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const pendingRegistration = await PendingRegistration.findOne({ email: normalizedEmail });
    if (pendingRegistration) {
        if (pendingRegistration.otp !== otp || pendingRegistration.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const existingVerifiedUser = await User.findOne({ email: normalizedEmail, isVerified: true });
        if (existingVerifiedUser) {
            await PendingRegistration.deleteOne({ _id: pendingRegistration._id });
            return res.status(400).json({ message: "User exists" });
        }

        await User.findOneAndUpdate(
            { email: normalizedEmail },
            {
                name: pendingRegistration.name,
                email: normalizedEmail,
                password: pendingRegistration.password,
                role: "user",
                isVerified: true,
                otp: undefined,
                otpExpiry: undefined,
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            }
        );

        await PendingRegistration.deleteOne({ _id: pendingRegistration._id });
        return res.json({ message: "Email verified" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || user.otp !== otp || user.otpExpiry < Date.now())
        return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "Invalid login" });

    const isMatch = await bcrypt.compare(
        password.toString(),
        user.password.toString()
    );

    if (!isMatch)
        return res.status(400).json({ message: "Invalid login" });

    if (!user.isVerified) {
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendResetOtpEmail(normalizedEmail, otp);
        res.json({ message: "OTP sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user || user.otp !== otp || user.otpExpiry < Date.now())
            return res.status(400).json({ message: "Invalid OTP" });

        res.json({ message: "OTP verified" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user || user.otp !== otp || user.otpExpiry < Date.now())
            return res.status(400).json({ message: "Invalid OTP" });

        user.password = await bcrypt.hash(newPassword.toString(), 10);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!process.env.GOOGLE_CLIENT_ID) {
            return res.status(500).json({ message: "GOOGLE_CLIENT_ID is not configured on the server." });
        }

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { name, email, sub: googleId, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            user = new User({
                name,
                email,
                googleId,
                role: 'user',
                isVerified: true
            });
            await user.save();
        }

        const jwtToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            token: jwtToken,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Google Login failed", error: error.message });
    }
};

exports.getGoogleAuthConfig = async (req, res) => {
    res.status(200).json({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        enabled: Boolean(process.env.GOOGLE_CLIENT_ID),
    });
};

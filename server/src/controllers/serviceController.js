const ServiceInquiry = require("../models/ServiceInquiry");
const Service = require("../models/Service");
const sendEmail = require("../utils/sendEmail");

exports.submitServiceInquiry = async (req, res) => {
    try {
        const {
            serviceName,
            fullName,
            email,
            phone,
            companyName,
            budget,
            goals,
        } = req.body;

        const trimmedServiceName = serviceName?.trim();
        const trimmedFullName = fullName?.trim();
        const trimmedEmail = email?.trim().toLowerCase();
        const trimmedPhone = phone?.trim();
        const trimmedCompanyName = companyName?.trim();
        const trimmedBudget = budget?.trim();
        const trimmedGoals = goals?.trim();

        if (!trimmedServiceName || !trimmedFullName || !trimmedEmail || !trimmedPhone) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const inquiry = await ServiceInquiry.create({
            serviceName: trimmedServiceName,
            fullName: trimmedFullName,
            email: trimmedEmail,
            phone: trimmedPhone,
            companyName: trimmedCompanyName,
            budget: trimmedBudget,
            goals: trimmedGoals,
        });

        await sendEmail(
            trimmedEmail,
            `Thanks for your interest in ${trimmedServiceName}`,
            `Hi ${trimmedFullName},\n\nWe received your inquiry for ${trimmedServiceName}. Our team will review your goals and contact you shortly.\n\nBest,\nAi Growth Exa Team`
        ).catch((err) => console.error("Service inquiry email failed:", err));

        res.status(201).json({
            success: true,
            message: "Service inquiry submitted successfully",
            data: inquiry,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ id: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.searchServices = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json({ success: true, data: [] });
        }

        const services = await Service.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        res.json({ success: true, data: services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

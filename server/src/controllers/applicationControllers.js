const Application = require("../models/Application");

exports.applyForJob = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume is required",
            });
        }

        const payload = {
            ...req.body,
            name: req.body.name?.trim(),
            email: req.body.email?.trim().toLowerCase(),
            phone: req.body.phone?.trim(),
            location: req.body.location?.trim(),
            experience: req.body.experience?.trim(),
            yearsOfExperience: Number(req.body.yearsOfExperience || 0),
            currentSalary: req.body.currentSalary?.trim(),
            expectedSalary: req.body.expectedSalary?.trim(),
            linkedin: req.body.linkedin?.trim(),
            github: req.body.github?.trim(),
            noticePeriod: req.body.noticePeriod?.trim(),
            coverLetter: req.body.coverLetter?.trim(),
            jobTitle: req.body.jobTitle?.trim(),
            jobDepartment: req.body.jobDepartment?.trim(),
            jobLocation: req.body.jobLocation?.trim(),
            jobId: req.body.jobId?.toString().trim(),
            applicationType: req.body.applicationType?.trim() || "general",
            resume: req.file.filename,
        };

        if (
            !payload.name ||
            !payload.email ||
            !payload.phone ||
            !payload.experience ||
            !payload.expectedSalary ||
            !payload.noticePeriod ||
            !payload.coverLetter ||
            !payload.jobTitle
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required application fields",
            });
        }

        const application = new Application({
            ...payload,
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: application,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

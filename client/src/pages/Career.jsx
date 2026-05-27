import React, { useState, useEffect } from 'react';
import api from "../api/api";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search,
    Globe,
    BarChart3,
    GraduationCap,
    Users,
    ChevronRight,
    ArrowRight,
    Star,
    Brain,
    Code,
    Palette,
    UserCircle,
    Handshake,
    Sparkles,
    Bot,
    Smartphone,
    Zap,
    X,
    Upload,
    DollarSign,
    Briefcase,
    Linkedin,
    Github,
    FileText,
    CheckCircle,
    Layout,
    Mail,
    Heart,
    Smile,
    Award,
    BookOpen,
    Trophy,
    Coffee,
    SearchIcon,
    ShieldCheck,
    Cpu,
    Send,
    Beaker,
    Phone,
    TrendingUp,
    PenTool,
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaFilePdf, FaArrowRight, FaTimes, FaDollarSign, FaUserTie, FaUsers, FaStar, FaBriefcase, FaGlobe, FaRobot, FaBullseye, FaChartLine, FaBrain, FaPalette, FaMagic, FaCode, FaMobileAlt, FaGraduationCap, FaChevronRight, FaHandshake, FaLightbulb, FaRocket, FaFire, FaSearch, FaUpload } from 'react-icons/fa';

// Single Job Application Modal Component
const JobApplicationModal = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        currentSalary: '',
        expectedSalary: '',
        experience: 'fresher',
        yearsOfExperience: '',
        resume: null,
        resumeName: '',
        linkedin: '',
        github: '',
        coverLetter: '',
        noticePeriod: 'immediate',
        isSubmitting: false
    });

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    const inputClassName = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
    const sectionTitleClassName = "text-sm font-black uppercase tracking-[0.18em] text-slate-900";

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files?.[0];
            if (!file) return;

            const allowedTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];

            if (!allowedTypes.includes(file.type)) {
                alert('Please upload only PDF or DOCX files.');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('Resume file size must be 10MB or less.');
                return;
            }

            setFormData(prev => ({
                ...prev,
                resume: file,
                resumeName: file.name
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.resume) {
                alert("Please upload your resume before submitting.");
                return;
            }

            setFormData(prev => ({ ...prev, isSubmitting: true }));

            const data = new FormData();

            // Personal Information
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("location", formData.location);

            // Professional Information
            data.append("experience", formData.experience);
            data.append("yearsOfExperience", formData.experience === 'fresher' ? 0 : (formData.yearsOfExperience || 0));
            data.append("currentSalary", formData.currentSalary);
            data.append("expectedSalary", formData.expectedSalary);
            data.append("linkedin", formData.linkedin);
            data.append("github", formData.github);
            data.append("noticePeriod", formData.noticePeriod);
            data.append("coverLetter", formData.coverLetter);

            // If job is selected, add job details
            if (job) {
                data.append("jobTitle", job.title);
                data.append("jobDepartment", job.department);
                data.append("jobLocation", job.location);
                data.append("jobId", job.id);
                data.append("applicationType", "specific");
            } else {
                data.append("jobTitle", "General Application");
                data.append("jobDepartment", "Various");
                data.append("applicationType", "general");
            }

            // Resume file
            data.append("resume", formData.resume);

            // Submit to single API endpoint
            const response = await api.post("/applications/apply", data);

            if (response.data?.message) {
                alert(response.data.message);
                onClose();
                return;
            }

            alert("Application submitted successfully ✅");
            onClose();

        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
                return;
            }
            alert("Something went wrong ❌");
        } finally {
            setFormData(prev => ({ ...prev, isSubmitting: false }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {job ? (
                                <>
                                    Apply for: <span className="text-blue-600">{job.title}</span>
                                </>
                            ) : (
                                "Start Your Application Journey"
                            )}
                        </h2>
                        <p className="text-gray-600">
                            {job ? `${job.department} • ${job.location}` : "Tell us about yourself and your career aspirations"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        type="button"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FaUserTie className="text-blue-500" />
                                Personal Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FaBriefcase className="text-blue-500" />
                                Professional Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience Level *
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                >
                                    <option value="fresher">Fresher (0-1 years)</option>
                                    <option value="junior">Junior (1-3 years)</option>
                                    <option value="mid">Mid-Level (3-5 years)</option>
                                    <option value="senior">Senior (5+ years)</option>
                                    <option value="lead">Lead (8+ years)</option>
                                </select>
                            </div>

                            {formData.experience !== 'fresher' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Years of Experience *
                                    </label>
                                    <input
                                        type="number"
                                        name="yearsOfExperience"
                                        value={formData.yearsOfExperience}
                                        onChange={handleInputChange}
                                        required={formData.experience !== 'fresher'}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="3"
                                        min="0"
                                        max="50"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Salary (Annual)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaDollarSign className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="currentSalary"
                                        value={formData.currentSalary}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="e.g., $60,000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expected Salary (Annual) *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaDollarSign className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="expectedSalary"
                                        value={formData.expectedSalary}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="e.g., $80,000 - $100,000"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FaUpload className="text-blue-500" />
                            Resume / CV *
                        </h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                            <FaFilePdf className="text-3xl text-gray-400 mx-auto mb-2" />
                            <label className="block mb-2 cursor-pointer">
                                <span className="text-blue-600 font-medium hover:text-blue-700">
                                    Click to upload
                                </span>
                                <input
                                    type="file"
                                    name="resume"
                                    onChange={handleInputChange}
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    required
                                />
                                <span className="text-gray-600"> or drag and drop</span>
                            </label>
                            <p className="text-sm text-gray-500">
                                PDF, DOC, DOCX up to 10MB
                            </p>
                            {formData.resumeName && (
                                <p className="mt-2 text-sm text-green-600">
                                    ✓ Selected: {formData.resumeName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Social Profiles */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                LinkedIn Profile
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLinkedin className="text-blue-500" />
                                </div>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                GitHub Profile
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaGithub className="text-gray-700" />
                                </div>
                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FaGraduationCap className="text-blue-500" />
                            Additional Information
                        </h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notice Period *
                            </label>
                            <select
                                name="noticePeriod"
                                value={formData.noticePeriod}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            >
                                <option value="immediate">Immediate (0-15 days)</option>
                                <option value="1month">1 Month</option>
                                <option value="2months">2 Months</option>
                                <option value="3months">3 Months</option>
                                <option value="negotiable">Negotiable</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {job ? "Cover Letter / Why should we hire you?" : "Tell us about yourself and your career aspirations"} *
                            </label>
                            <textarea
                                name="coverLetter"
                                value={formData.coverLetter}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                placeholder={job ? "Tell us why you're the perfect fit for this role..." : "Share your motivation for joining our team and your career goals..."}
                            />
                        </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-start mb-6">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1 mr-2"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the terms and conditions and confirm that the information provided is accurate.
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={formData.isSubmitting}
                                className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${formData.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'} flex items-center justify-center gap-2`}
                            >
                                {formData.isSubmitting ? 'Submitting...' : 'Submit Application'}
                                {!formData.isSubmitting && <FaArrowRight />}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 bg-white hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const JobDetailsModal = ({ job, onClose, onApply }) => {
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    if (!job) return null;

    const detailBlocks = {
        Marketing: {
            overview: "You will drive strategy, campaign performance, and scalable acquisition systems for ambitious growth-focused brands.",
            responsibilities: [
                "Own campaign thinking, funnel planning, and performance improvement across digital channels.",
                "Translate data into actionable testing ideas, sharper messaging, and stronger ROI decisions.",
                "Collaborate with creative and execution teams to deliver measurable business growth.",
            ],
            requirements: [
                "Strong understanding of digital growth systems, channel performance, and conversion thinking.",
                "Ability to work with data, identify opportunities, and communicate strategy clearly.",
                "Execution mindset with ownership, curiosity, and attention to outcomes.",
            ],
        },
        Technology: {
            overview: "You will build and improve the systems, automations, and technical delivery layers that support modern growth operations.",
            responsibilities: [
                "Create robust implementation workflows, automations, and technical solutions for client growth.",
                "Work closely with marketing and business teams to ship dependable systems quickly.",
                "Improve scalability, reliability, and performance across technical touchpoints.",
            ],
            requirements: [
                "Strong problem solving and systems thinking with a practical delivery mindset.",
                "Confidence working independently on technical execution and iteration.",
                "Ability to collaborate across non-technical and technical teams effectively.",
            ],
        },
        Creative: {
            overview: "You will help shape the visual and communication layer of brands so campaigns feel sharp, intentional, and conversion-ready.",
            responsibilities: [
                "Create high-quality creative assets aligned with campaign goals and brand direction.",
                "Collaborate with strategists to turn briefs into strong visual and content outcomes.",
                "Maintain consistency, originality, and usability across all creative deliverables.",
            ],
            requirements: [
                "Strong design judgment, storytelling instinct, and user-focused thinking.",
                "Ability to move from concept to polished output with speed and clarity.",
                "Open collaboration style with comfort around feedback and iteration.",
            ],
        },
        Business: {
            overview: "You will support revenue growth, client relationships, and operational momentum through structured business execution.",
            responsibilities: [
                "Build and move opportunities through strong communication, follow-up, and ownership.",
                "Coordinate with internal teams to align delivery, expectations, and growth priorities.",
                "Support revenue systems, relationship growth, and strategic expansion efforts.",
            ],
            requirements: [
                "Strong commercial communication and relationship-building ability.",
                "Comfort working in fast-moving environments with accountability and initiative.",
                "Ability to bring structure, urgency, and clarity into business workflows.",
            ],
        },
    };

    const currentDetails = detailBlocks[job.department] || detailBlocks.Marketing;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-2 backdrop-blur-sm sm:p-4">
            <div className="relative mx-auto my-3 flex max-h-[calc(100vh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl sm:my-6 sm:max-h-[calc(100vh-3rem)]">
                <div className="sticky top-0 z-10 border-b border-slate-100 bg-white px-5 py-4 md:px-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="mb-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">{job.department}</span>
                                <span className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{job.type}</span>
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">{job.location}</span>
                            </div>
                            <h2 className="text-[1.75rem] font-black leading-tight text-slate-950 md:text-3xl">{job.title}</h2>
                            <p className="mt-1.5 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                                {currentDetails.overview}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div
                    className="flex-1 overflow-y-auto overscroll-contain scroll-smooth px-5 py-5 md:px-6"
                    style={{ scrollbarWidth: 'thin', scrollbarGutter: 'stable' }}
                >
                    <div className="grid gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-3 md:grid-cols-3 md:p-4">
                        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Experience</p>
                            <p className="mt-1.5 text-lg font-black text-slate-900">{job.experience}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Salary Range</p>
                            <p className="mt-1.5 text-lg font-black text-slate-900">{job.salary}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Mode</p>
                            <p className="mt-1.5 text-lg font-black text-slate-900">{job.location}</p>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
                            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-900">Key Responsibilities</h3>
                            <ul className="space-y-2.5">
                                {currentDetails.responsibilities.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-sm font-medium leading-relaxed text-slate-600">
                                        <span className="mt-1 text-blue-500">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
                            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-900">Requirements</h3>
                            <ul className="space-y-2.5">
                                {currentDetails.requirements.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-sm font-medium leading-relaxed text-slate-600">
                                        <span className="mt-1 text-indigo-500">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 border-t border-slate-100 bg-white px-5 py-4 md:flex-row md:justify-end md:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={() => onApply(job)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500"
                    >
                        Apply Now <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Careers Page Component
const JobCard = ({ job, idx, onApply, onViewDetails }) => {
    const fallbackJobImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative flex h-[620px] flex-col rounded-[2.5rem] border border-slate-100 bg-white overflow-hidden shadow-sm transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
        >
            {/* Full-width Image Header */}
            <div className="relative h-52 w-full overflow-hidden shrink-0">
                <img
                    src={job.image}
                    alt={job.title}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackJobImage;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {job.featured && (
                    <div className="absolute top-6 left-6 z-10">
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 rounded-full shadow-lg shadow-purple-900/20">
                            <Sparkles size={10} /> Featured
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col p-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${job.department === 'Marketing' ? 'bg-blue-50 text-blue-600' :
                        job.department === 'Technology' ? 'bg-indigo-50 text-indigo-600' :
                            'bg-rose-50 text-rose-600'
                        }`}>{job.department}</span>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">Full-time</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-tight transition-colors group-hover:text-blue-600 mb-6 min-h-[56px] line-clamp-2">{job.title}</h3>

                <div className="grid grid-cols-3 gap-4 mb-8 bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <Globe size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{job.location}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-x border-slate-200 px-2 text-center">
                        <Star size={14} className="text-indigo-500" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{job.experience}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <DollarSign size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{job.salary}</span>
                    </div>
                </div>



                {/* Expandable Details Section */}
                <div className="mb-3">
                    <button
                        type="button"
                        onClick={() => onViewDetails(job)}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest transition-colors hover:text-blue-700"
                    >
                        View Full Details
                    </button>
                </div>

                <div className="mt-2">
                    <button
                        onClick={() => onApply(job)}
                        className="mx-auto flex w-[86%] items-center justify-center gap-2.5 rounded-[1.15rem] bg-blue-600 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
                    >
                        Apply Now <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const CareersPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('all');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [visibleJobsCount, setVisibleJobsCount] = useState(8);

    // Single modal state for all applications
    const [showJobDetailsModal, setShowJobDetailsModal] = useState(false);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    // Job openings data
    const jobOpenings = [
        {
            id: 1,
            title: "AI Marketing Strategist",
            department: "Marketing",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            featured: true,
            salary: "$80k - $120k",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            icon: <FaBrain className="text-purple-500" />
        },
        {
            id: 2,
            title: "Performance Marketing Specialist",
            department: "Marketing",
            location: "Remote",
            experience: "2+ years",
            type: "Full-time",
            featured: true,
            salary: "$70k - $100k",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            icon: <FaBullseye className="text-red-500" />
        },
        {
            id: 3,
            title: "SEO & Growth Strategist",
            department: "Marketing",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            salary: "$75k - $110k",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            icon: <FaChartLine className="text-green-500" />
        },
        {
            id: 4,
            title: "Automation & CRM Specialist",
            department: "Technology",
            location: "Remote",
            experience: "4+ years",
            type: "Full-time",
            featured: true,
            salary: "$90k - $130k",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
            icon: <FaRobot className="text-blue-500" />
        },
        {
            id: 5,
            title: "Content Writer & Brand Storyteller",
            department: "Creative",
            location: "Remote",
            experience: "2+ years",
            type: "Full-time",
            salary: "$60k - $90k",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
            icon: <FaPalette className="text-pink-500" />
        },
        {
            id: 6,
            title: "Graphic Designer & Creative Strategist",
            department: "Creative",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            salary: "$65k - $95k",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
            icon: <FaMagic className="text-yellow-500" />
        },
        {
            id: 7,
            title: "Web & App Developer",
            department: "Technology",
            location: "Remote",
            experience: "4+ years",
            type: "Full-time",
            featured: true,
            salary: "$85k - $125k",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
            icon: <FaCode className="text-indigo-500" />
        },
        {
            id: 8,
            title: "UX/UI Designer",
            department: "Creative",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            salary: "$70k - $105k",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
            icon: <FaMobileAlt className="text-teal-500" />
        },
        {
            id: 9,
            title: "Sales & Growth Consultant",
            department: "Business",
            location: "Remote",
            experience: "5+ years",
            type: "Full-time",
            salary: "$90k - $140k",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
            icon: <FaUserTie className="text-orange-500" />
        },
        {
            id: 10,
            title: "Business Development Manager",
            department: "Business",
            location: "Remote",
            experience: "4+ years",
            type: "Full-time",
            salary: "$85k - $130k",
            featured: true,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
            icon: <FaHandshake className="text-blue-500" />
        },
        {
            id: 11,
            title: "Operations Lead",
            department: "Business",
            location: "Remote",
            experience: "6+ years",
            type: "Full-time",
            salary: "$100k - $150k",
            image: "https://images.unsplash.com/photo-1507206130118-b5907f817163?w=800&q=80",
            icon: <FaRocket className="text-purple-500" />
        },
    ];

    // Company stats
    const companyStats = [
        { number: "70+", label: "Team Members", icon: <FaUsers /> },
        { number: "500+", label: "Projects Delivered", icon: <FaGlobe /> },
        { number: "98%", label: "Client Satisfaction", icon: <FaStar /> },
        { number: "50+", label: "AI Projects", icon: <FaRobot /> },
    ];

    // Filter jobs based on search and tab
    const filteredJobs = jobOpenings.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'featured') return matchesSearch && job.featured;
        return matchesSearch && job.department.toLowerCase() === activeTab;
    });

    // Handle scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress((currentScroll / totalScroll) * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Single function for all apply buttons
    const handleApplyClick = (job = null) => {
        setSelectedJob(job);
        setShowJobDetailsModal(false);
        setShowApplicationModal(true);
    };

    const handleViewDetailsClick = (job) => {
        setSelectedJob(job);
        setShowJobDetailsModal(true);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden border-b border-slate-200/50 flex items-center bg-slate-900">
                <video
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{ filter: "brightness(0.82) contrast(1.12) saturate(1.08)" }}
                >
                    <source src="/career-video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 z-10 bg-slate-900/[0.28]" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020617]/90 via-[#0b1120]/60 to-[#1a1060]/20" />
                <div className="absolute inset-y-0 left-0 z-10 w-[62%] bg-gradient-to-r from-[#020617]/90 via-[#020617]/60 to-transparent" />

                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/6 blur-3xl" />
                </div>

                <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-20 lg:py-0">
                    <div className="grid items-center gap-12 lg:grid-cols-1">
                        <div className="mt-6 max-w-3xl md:mt-10">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#081225]/38 px-4 py-1.5 backdrop-blur-sm"
                            >
                                <span className="text-yellow-400">+</span>
                                <span className="text-sm font-semibold text-white">We&apos;re Hiring Builders & Innovators</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="max-w-[11ch] text-4xl font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(2,6,23,0.7)] md:text-5xl lg:text-6xl"
                                style={{ textWrap: 'balance' }}
                            >
                                Careers That{" "}
                                <span className="bg-gradient-to-r from-blue-800 via-violet-700 to-purple-700 bg-clip-text text-transparent">
                                    Shape Intelligent Growth
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 max-w-[34rem] text-lg font-semibold leading-[1.7] text-white/95 drop-shadow-[0_5px_16px_rgba(2,6,23,0.7)] md:text-xl"
                                style={{ textWrap: 'balance' }}
                            >
                                Join AI Growth Exa to build bold digital experiences, launch AI-powered systems, and grow alongside a team that moves fast with purpose.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-10 flex flex-wrap gap-4"
                            >
                                <button
                                    onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40"
                                >
                                    Explore Roles <ArrowRight size={16} />
                                </button>
                                <button
                                    onClick={() => handleApplyClick(null)}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                                >
                                    <Mail size={16} /> Start Application
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <div className="pt-16 pb-8 bg-white border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { number: "70+", label: "Team Members", sub: "Across the globe", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                            { number: "500+", label: "Projects Delivered", sub: "For leading brands", icon: Globe, color: "text-violet-500", bg: "bg-violet-50" },
                            { number: "98%", label: "Client Satisfaction", sub: "Our work speaks", icon: Star, color: "text-pink-500", bg: "bg-pink-50" },
                            { number: "50+", label: "AI Projects", sub: "And counting", icon: Bot, color: "text-indigo-500", bg: "bg-indigo-50" },
                        ].map((stat, index) => (
                            <div key={index} className="flex items-center gap-6 group">
                                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${stat.bg} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                    <stat.icon className={stat.color} size={32} />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-slate-900">{stat.number}</div>
                                    <div className="text-sm font-bold text-slate-900">{stat.label}</div>
                                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Life at AI Growth Exa Section */}
            <section className="pt-10 pb-8 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl mb-4">Life at AI Growth Exa</h2>
                        <p className="text-slate-500 font-medium">A place to learn, grow and make an impact together.</p>
                    </div>

                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 xl:grid-cols-6">
                            {[
                                { title: "Flexible Work", desc: "Work from anywhere", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=200&q=80" },
                                { title: "Health & Wellness", desc: "Mental & physical health", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80" },
                                { title: "Learning Budget", desc: "Constant skill growth", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&q=80" },
                                { title: "Career Growth", desc: "Fast-track your path", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200&q=80" },
                                { title: "Team Offsites", desc: "Fun & collaboration", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&q=80" },
                                { title: "Recognition", desc: "Monthly awards & perks", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-[1.5rem] border border-slate-100 shadow-sm">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <h4 className="mb-2 text-[1.05rem] font-black leading-snug text-slate-900">
                                        {item.title}
                                    </h4>
                                    <p className="text-[0.72rem] font-black uppercase tracking-[0.12em] text-slate-500">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Join Us Section */}
            {/* Why Join AI Growth Exa Section */}
            <section className="bg-white pt-8 pb-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <div className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-black">
                            Why Join Us
                        </div>
                        <h2 className="mx-auto max-w-4xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            This is Not Just a Job, It's a{" "}
                            <span className="text-black">
                                Career Revolution
                            </span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-7 text-black sm:text-lg">
                            If you're curious, ambitious, and energized by AI, growth, and innovation,
                            you won't just work here, you'll evolve here.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {[
                            {
                                title: "Learn Faster Than Lightning",
                                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
                            },
                            {
                                title: "Tackle High-Impact Challenges",
                                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
                            },
                            {
                                title: "Master Future-Ready Skills",
                                image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80",
                            },
                            {
                                title: "Work With Exceptional Talent",
                                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
                            },
                            {
                                title: "Make a Global Impact",
                                image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&q=80",
                            },
                            {
                                title: "Thrive & Grow Together",
                                image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80",
                            }
                        ].map((item, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    className="relative flex h-[270px] flex-col items-center rounded-[1.7rem] border border-slate-100 bg-white px-4 py-5 text-center shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(99,102,241,0.12)]"
                                >
                                    <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-50 shadow-[0_14px_30px_rgba(99,102,241,0.14)] ring-1 ring-slate-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-xs font-black text-white">
                                        {index + 1}
                                    </div>
                                    <h4 className="mx-auto flex min-h-[78px] max-w-[150px] items-center justify-center text-[0.9rem] font-black leading-snug text-slate-900 sm:text-[0.95rem]">
                                        {item.title}
                                    </h4>
                                    {index < 5 && (
                                        <div className="absolute -right-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-violet-500 shadow-md xl:flex">
                                            <ArrowRight size={16} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Hiring Process */}
                    <div className="mt-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl mb-4">Our Hiring Process</h2>
                            <p className="text-slate-500 font-medium">Our process is simple, transparent and designed to respect your time.</p>
                        </div>

                        <div className="relative pt-6 pb-3">
                            {/* Animated Connector Line (Desktop) */}
                            <div className="absolute top-20 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden lg:block z-0">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 5, ease: "easeInOut" }}
                                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 relative z-10">
                                {[
                                    { step: "01", title: "Apply Online", desc: "Submit your application in just a few minutes.", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&q=80", color: "text-blue-600", bg: "bg-blue-100" },
                                    { step: "02", title: "Screening Call", desc: "Let's get to know each other better.", image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=200&q=80", color: "text-indigo-600", bg: "bg-indigo-100" },
                                    { step: "03", title: "Assignment / Test", desc: "Showcase your skills with a short task.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&q=80", color: "text-pink-600", bg: "bg-pink-100" },
                                    { step: "04", title: "Interview", desc: "Meet the team and align on the vision.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", color: "text-green-600", bg: "bg-green-100" },
                                    { step: "05", title: "Offer & Onboarding", desc: "Welcome aboard! Your journey begins.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80", color: "text-orange-600", bg: "bg-orange-100" }
                                ].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <div className="relative mb-6">
                                            <div className={`flex h-20 w-20 items-center justify-center rounded-full overflow-hidden shadow-lg ring-8 ring-white ${step.bg}`}>
                                                <img
                                                    src={step.image}
                                                    alt={step.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-125"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-black text-slate-900 shadow-md">
                                                {step.step}
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-black text-slate-900 mb-2">{step.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[160px]">{step.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Our Culture Section */}
            <section className="pt-4 pb-10 bg-white overflow-hidden">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-8">
                        <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-5 border border-blue-100">
                            Our Culture
                        </span>
                        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Where Innovation Meets Collaboration</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 xl:grid-cols-6">
                        {[
                            { title: "Flexible Work", desc: "Work from anywhere", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=200&q=80" },
                            { title: "Health & Wellness", desc: "Mental & physical health", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80" },
                            { title: "Learning Budget", desc: "Constant skill growth", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&q=80" },
                            { title: "Career Growth", desc: "Fast-track your path", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200&q=80" },
                            { title: "Team Offsites", desc: "Fun & collaboration", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&q=80" },
                            { title: "Recognition", desc: "Monthly awards & perks", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-[1.45rem] border border-slate-100 shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h4 className="mb-2 text-[1.08rem] font-black leading-snug text-slate-900">
                                    {item.title}
                                </h4>
                                <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-slate-500">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Roles Section */}
            <section id="open-roles" className="pt-10 pb-10 bg-slate-50/50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600 mb-4">Open Positions</p>
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Open Roles <span className="text-blue-600">(Future-Focused Hiring)</span></h2>
                        <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
                            We're actively seeking high-potential professionals across our AI-driven service verticals.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {[
                            { id: 'all', label: 'All Roles' },
                            { id: 'featured', label: 'Featured' },
                            { id: 'marketing', label: 'Marketing' },
                            { id: 'technology', label: 'Technology' },
                            { id: 'business', label: 'Business' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2 rounded-full text-xs font-black transition-all ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 shadow-sm'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Job Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
                        {filteredJobs.slice(0, visibleJobsCount).map((job, idx) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                idx={idx}
                                onApply={handleApplyClick}
                                onViewDetails={handleViewDetailsClick}
                            />
                        ))}
                    </div>

                    {filteredJobs.length > visibleJobsCount && (
                        <div className="mt-10 text-center">
                            <button
                                onClick={() => setVisibleJobsCount(prev => prev + 4)}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-10 py-3 text-xs font-black text-blue-600 transition-all hover:bg-slate-50 uppercase tracking-widest shadow-sm"
                            >
                                View More Roles <ArrowRight size={16} />
                            </button>
                        </div>
                    )}



                    {filteredJobs.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-white shadow-sm mt-12">
                            <Search size={48} className="mx-auto text-slate-300 mb-6" />
                            <h3 className="text-2xl font-black text-slate-900">No matching roles found</h3>
                            <p className="mt-4 text-slate-600">Try adjusting your filters or search term.</p>
                        </div>
                    )}


                </div>
            </section>

            {/* Employee Stories Section */}
            <section className="pt-4 pb-10 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-6">
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600 mb-2">Employee Stories</p>
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Real People. Real Growth. Real Impact.</h2>
                    </div>

                    <div className="relative overflow-hidden py-0">
                        <motion.div
                            className="flex gap-12 whitespace-nowrap"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {[
                                {
                                    name: "Priya Sharma",
                                    role: "Marketing Strategist",
                                    quote: "The learning culture here is unmatched. I've grown more in 1 year than in my previous 3 years combined!",
                                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Rahul Verma",
                                    role: "Performance Specialist",
                                    quote: "Working on global projects and using AI every day makes this place exciting and future-ready.",
                                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Ananya Iyer",
                                    role: "Content Lead",
                                    quote: "I love the ownership and trust we get. Ideas are valued, and impact is recognized.",
                                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Vikram Singh",
                                    role: "AI Research Lead",
                                    quote: "Building the next generation of AI tools with such a brilliant team is a dream come true.",
                                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Sarah Jenkins",
                                    role: "Creative Director",
                                    quote: "Creativity thrives when you're surrounded by people who challenge you to think differently.",
                                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "David Chen",
                                    role: "Full Stack Developer",
                                    quote: "The tech stack here is cutting-edge. Every day is a chance to solve complex, rewarding problems.",
                                    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop"
                                },
                                // Duplicate for infinite scroll
                                {
                                    name: "Priya Sharma",
                                    role: "Marketing Strategist",
                                    quote: "The learning culture here is unmatched. I've grown more in 1 year than in my previous 3 years combined!",
                                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Rahul Verma",
                                    role: "Performance Specialist",
                                    quote: "Working on global projects and using AI every day makes this place exciting and future-ready.",
                                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Ananya Iyer",
                                    role: "Content Lead",
                                    quote: "I love the ownership and trust we get. Ideas are valued, and impact is recognized.",
                                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Vikram Singh",
                                    role: "AI Research Lead",
                                    quote: "Building the next generation of AI tools with such a brilliant team is a dream come true.",
                                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "Sarah Jenkins",
                                    role: "Creative Director",
                                    quote: "Creativity thrives when you're surrounded by people who challenge you to think differently.",
                                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop"
                                },
                                {
                                    name: "David Chen",
                                    role: "Full Stack Developer",
                                    quote: "The tech stack here is cutting-edge. Every day is a chance to solve complex, rewarding problems.",
                                    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop"
                                }
                            ].map((story, index) => (
                                <div key={index} className="flex flex-col items-center text-center group min-w-[400px] bg-slate-50/50 px-8 pb-8 pt-6 rounded-[2.5rem] border border-slate-100/50">
                                    <div className="relative mb-5">
                                        <div className="absolute -inset-4 rounded-full border border-blue-100 group-hover:scale-110 transition-transform duration-500" />
                                        <img src={story.image} alt={story.name} className="relative h-24 w-24 rounded-full object-cover shadow-xl" />
                                    </div>
                                    <p className="text-sm text-slate-600 italic leading-relaxed mb-4 w-full whitespace-normal">"{story.quote}"</p>
                                    <h4 className="text-lg font-black text-slate-900">{story.name}</h4>
                                    <p className="text-sm font-bold text-blue-600">{story.role}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Perks & Benefits Section */}
            <section className="pt-6 pb-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600 mb-4">Perks & Benefits</p>
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Perks That Empower You</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                        {[
                            { title: "Flexible Work", desc: "Work from anywhere", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=200&q=80" },
                            { title: "Health & Wellness", desc: "Mental & physical health", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80" },
                            { title: "Learning Budget", desc: "Constant skill growth", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&q=80" },
                            { title: "Career Growth", desc: "Fast-track your path", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80" },
                            { title: "Team Offsites", desc: "Fun & collaboration", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&q=80" },
                            { title: "Recognition", desc: "Monthly awards & perks", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" },
                        ].map((perk, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <motion.div
                                    whileHover={{ y: -10, rotate: [0, -5, 5, 0] }}
                                    className="mb-6 h-20 w-20 rounded-[1.5rem] bg-white overflow-hidden shadow-md transition-shadow group-hover:shadow-2xl group-hover:shadow-blue-200/50 border border-slate-100 ring-4 ring-slate-50/50"
                                    style={{
                                        backgroundImage: `url(${perk.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{perk.title}</h4>
                                <p className="mt-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">{perk.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a1128] p-10 md:p-16 text-white shadow-2xl">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                            <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 flex-1 text-center md:text-left">
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white shadow-2xl shadow-blue-900/20">
                                    <Send size={40} className="text-blue-600 -rotate-12" />
                                </div>
                                <div className="max-w-xl">
                                    <h2 className="text-3xl font-black tracking-tight sm:text-4xl mb-4">Ready to Transform Your Career?</h2>
                                    <p className="text-lg text-blue-100 font-medium">
                                        Join AI Growth Exa and be part of a team that's building the future of AI-driven growth and digital transformation.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleApplyClick(null)}
                                className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-sm font-black text-blue-600 shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                Start Your Application Journey <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {showJobDetailsModal && selectedJob && (
                <JobDetailsModal
                    job={selectedJob}
                    onApply={handleApplyClick}
                    onClose={() => setShowJobDetailsModal(false)}
                />
            )}

            {/* Single Modal for all applications */}
            {showApplicationModal && (
                <JobApplicationModal
                    job={selectedJob}
                    onClose={() => {
                        setShowApplicationModal(false);
                        setSelectedJob(null);
                    }}
                />
            )}
        </div>
    );
};

export default CareersPage;

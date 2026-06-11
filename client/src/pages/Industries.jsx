import React from "react";
import { Link, useLocation } from "react-router-dom";
import FloatingParticles from "../components/FloatingParticles";
import {
    FaArrowRight,
    FaBolt,
    FaBullseye,
    FaBuilding,
    FaChartBar,
    FaComments,
    FaCog,
    FaFilter,
    FaGraduationCap,
    FaHospital,
    FaRobot,
    FaSitemap,
    FaShoppingCart,
    FaUsers,
    FaWallet,
    FaIndustry,
    FaPlus,
} from "react-icons/fa";

const industries = [
    {
        icon: <FaHospital />,
        title: "Healthcare & Pharma",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        summary: "AI growth systems for clinics, hospitals, diagnostics, and wellness brands.",
        marketOutlook: { value: "USD 156.25B", label: "India Pharmaceutical Market", sublabel: "by 2032" },
        cagr: { value: "12.20% CAGR", years: "2018 – 2032" },
        pain: [
            "High competition & rising ad costs",
            "Trust & compliance challenges",
            "Low-quality patient inquiries",
            "Long patient decision cycles",
            "Weak follow-up after the first inquiry",
        ],
        solutions: [
            "AI lead qualification",
            "Patient-focused landing funnels",
            "Doctor & clinic reputation campaigns",
            "Compliance-aware ad strategy",
            "Automated WhatsApp and callback routing",
        ],
        result: "2.4x",
        resultLabel: "Increase in qualified patient inquiries",
        outcomeNotes: ["Lower junk lead volume", "Faster response for serious patients"],
    },
    {
        icon: <FaBuilding />,
        title: "Real Estate",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        summary: "Lead systems for developers, brokers, and location-specific property campaigns.",
        marketOutlook: { value: "USD 1.0T", label: "Indian Real Estate Market Value", sublabel: "by 2030" },
        cagr: { value: "19.50% CAGR", years: "2020 – 2030" },
        pain: [
            "Extremely high cost per lead (CPL)",
            "Delayed lead follow-ups by sales teams",
            "Junk leads from generic social ads",
            "Low site-visit booking rates",
            "Poor visibility into source-wise conversions",
        ],
        solutions: [
            "Automated WhatsApp lead qualification",
            "Site-visit scheduling automation",
            "Hyperlocal targeting strategies",
            "CRM database nurturing sequences",
            "Campaign dashboards for source-level tracking",
        ],
        result: "41%",
        resultLabel: "Reduction in cost per qualified lead",
        outcomeNotes: ["More site visits booked", "Better sales-team follow-through"],
    },
    {
        icon: <FaGraduationCap />,
        title: "Education & EdTech",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
        summary: "Enrollment-focused growth plans for institutes, universities, and EdTech brands.",
        marketOutlook: { value: "USD 10.4B", label: "Indian EdTech Market Size", sublabel: "by 2025" },
        cagr: { value: "25.80% CAGR", years: "2020 – 2025" },
        pain: [
            "High student acquisition costs",
            "Low trial-to-paid conversion rates",
            "Unqualified student inquiries",
            "High student churn and drop-out rates",
            "Slow counselor response times",
        ],
        solutions: [
            "Parent & student decision funnels",
            "AI-powered counselor routing",
            "Automated admission drip campaigns",
            "Interactive value-driven webinars",
            "Lead scoring for admission priority",
        ],
        result: "2.7x",
        resultLabel: "Growth in paid student enrollments",
        outcomeNotes: ["Higher counseling efficiency", "Improved admission pipeline clarity"],
    },
    {
        icon: <FaShoppingCart />,
        title: "E-commerce & D2C",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        summary: "Performance-led retention and acquisition systems for scaling online brands.",
        marketOutlook: { value: "USD 200B", label: "Indian E-commerce Market Value", sublabel: "by 2026" },
        cagr: { value: "21.50% CAGR", years: "2021 – 2026" },
        pain: [
            "Skyrocketing customer acquisition cost (CAC)",
            "High shopping cart abandonment rates",
            "Low customer lifetime value (LTV)",
            "Inconsistent returns on ad spend (ROAS)",
            "Weak retention after first purchase",
        ],
        solutions: [
            "High-converting landing pages",
            "Automated email & WhatsApp flows",
            "Multi-channel retargeting engines",
            "Post-purchase retention campaigns",
            "Offer sequencing for repeat orders",
        ],
        result: "3.1x",
        resultLabel: "Improvement in ROAS & repeat purchases",
        outcomeNotes: ["More repeat customers", "Stronger retention campaign performance"],
    },
    {
        icon: <FaWallet />,
        title: "Finance & Fintech",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        summary: "Trust-building client acquisition funnels and compliance-aligned lead systems for fintech brands.",
        marketOutlook: { value: "USD 150B", label: "Indian Fintech Market Size", sublabel: "by 2025" },
        cagr: { value: "22.70% CAGR", years: "2020 – 2025" },
        pain: [
            "Strict regulatory compliance barriers",
            "High skepticism and lack of consumer trust",
            "Long sales cycles for high-value services",
            "High drop-off rates during KYC/onboarding",
            "Low completion rates on application steps",
        ],
        solutions: [
            "Educational lead generation funnels",
            "Compliance-locked ad creatives",
            "Interactive financial calculators",
            "Onboarding drop-off recovery flows",
            "Trust-building remarketing sequences",
        ],
        result: "1.9x",
        resultLabel: "Increase in completed KYC onboarding",
        outcomeNotes: ["Higher trust before signup", "Less onboarding abandonment"],
    },
    {
        icon: <FaIndustry />,
        title: "Manufacturing",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        summary: "B2B client acquisition systems, distributor networks, and global B2B lead pipeline engines.",
        marketOutlook: { value: "USD 1.0T", label: "Indian Manufacturing Sector Output", sublabel: "by 2028" },
        cagr: { value: "11.80% CAGR", years: "2022 – 2028" },
        pain: [
            "Reliance on traditional, offline sales agents",
            "Low B2B digital discoverability",
            "Difficulty reaching global buyers & distributors",
            "Extremely long contract decision cycles",
            "Inconsistent inquiry quality from trade channels",
        ],
        solutions: [
            "B2B organic search (SEO) domination",
            "Distributor lead portal funnels",
            "LinkedIn account-based marketing (ABM)",
            "Virtual factory tour video campaigns",
            "Buyer-segmented export inquiry workflows",
        ],
        result: "2.2x",
        resultLabel: "Increase in qualified B2B bulk export inquiries",
        outcomeNotes: ["More distributor-ready leads", "Clearer buyer qualification process"],
    },
    {
        icon: <FaPlus />,
        title: "More",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        summary: "Custom growth systems designed for Professional Services, SaaS, Hospitality, and other niche B2B/B2C markets.",
        marketOutlook: { value: "Custom", label: "Growth Strategy for Your Niche", sublabel: "Tailored KPIs" },
        cagr: { value: "Scale Faster", years: "No limits" },
        pain: [
            "Unique market challenges and niches",
            "Generic agency blueprints that fail",
            "Need for custom data tracking integrations",
            "Varying buyer personas and touchpoints",
            "Scattered growth systems with no single view",
        ],
        solutions: [
            "Tailored cross-channel marketing campaigns",
            "Bespoke CRM integrations",
            "Custom automated dashboard setups",
            "Exclusive marketing strategy consulting",
            "Niche-specific funnel architecture planning",
        ],
        result: "Custom",
        resultLabel: "Revenue-driven systems built for your B2B/B2C business model",
        outcomeNotes: ["Built around your exact funnel", "Reporting matched to your KPIs"],
    },
];

const pillars = [
    {
        title: "Industry-Aware Strategy",
        titleLines: ["Industry-Aware", "Strategy"],
        description: "We do not copy one funnel across every business. We shape the message, offer, and flow around how your buyers actually decide.",
        icon: <FaBullseye />,
    },
    {
        title: "AI plus Human Execution",
        titleLines: ["AI plus Human", "Execution"],
        description: "Automation helps us move faster, but strategy, positioning, and conversion thinking stay deeply human.",
        icon: <FaRobot />,
    },
    {
        title: "Built for Measurable Growth",
        titleLines: ["Built for Measurable", "Growth"],
        description: "From ads to follow-ups, CRM to reporting — everything works together.",
        icon: <FaChartBar />,
    },
];

const growthSteps = [
    {
        title: "Attract",
        description: "High-intent traffic through performance campaigns.",
        icon: <FaBullseye />,
    },
    {
        title: "AI Qualification",
        description: "AI filters and scores leads based on intent & behavior.",
        icon: <FaFilter />,
    },
    {
        title: "Engage",
        description: "Personalized nurturing via multi-channel automation.",
        icon: <FaComments />,
    },
    {
        title: "Convert",
        description: "Optimized funnels designed for higher conversions.",
        icon: <FaShoppingCart />,
    },
    {
        title: "Automate",
        description: "CRM workflows & follow-ups to close faster.",
        icon: <FaCog />,
    },
    {
        title: "Measure",
        description: "Real-time dashboards to track what drives revenue.",
        icon: <FaChartBar />,
    },
];

export default function IndustriesWeServe() {
    const location = useLocation();
    const [activeTab, setActiveTab] = React.useState("all");
    const tabs = [{ title: "All", icon: <FaSitemap />, value: "all" }, ...industries.map((item, idx) => ({
        title: item.title,
        icon: item.icon,
        value: idx,
    }))];

    return (
        <div className="bg-white pt-18 text-slate-900 md:pt-20">
            <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-slate-950 text-white md:min-h-[calc(100vh-80px)]">
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="/about.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-slate-950/65" />

                <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-900/10 blur-[100px]" />

                <div className="container relative z-10 mx-auto w-full max-w-7xl px-6 py-6 md:py-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-800 bg-blue-900/30 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-200">
                            <span className="h-2 w-2 rounded-full bg-blue-400" />
                            Industries We Serve
                        </div>

                        <h1 className="text-[2.5rem] font-black leading-[0.98] sm:text-[3.6rem] md:text-[4rem] lg:text-[4.2rem]">
                            Growth Systems Built for
                            <span className="block text-blue-400">Real Industry Challenges</span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-slate-300 md:text-[1.05rem]">
                            AI Growth Exa creates industry-specific marketing systems that combine performance,
                            automation, and conversion strategy, so your business gets a plan that fits your market,
                            your audience, and your growth stage.
                        </p>

                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                to="/contact"
                                state={{ background: location }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500"
                            >
                                Book a Strategy Call
                                <FaArrowRight className="text-sm" />
                            </Link>
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white transition-all duration-300 hover:border-blue-400/40 hover:bg-white/10"
                            >
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 pb-3 pt-6 sm:px-6 sm:pb-4 sm:pt-8 lg:px-8 lg:pb-5 lg:pt-10">
                <div className="mx-auto max-w-[1240px]">
                    <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-6">
                        {/* Left: Text Content */}
                        <div className="min-w-0 py-0">
                            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#2563eb]">
                                <FaBolt className="text-[11px]" />
                                Why Businesses Choose Us
                            </span>
                            <h2 className="mt-2 max-w-[15ch] text-[2.1rem] font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[2.4rem] md:max-w-[18ch] md:text-[2.75rem] lg:text-[3rem]">
                                One Brand System.
                                <span className="mt-1 block ">
                                    Different Industries. Same Growth Clarity.
                                </span>
                            </h2>
                            <p className="mt-3 max-w-[39rem] text-[0.94rem] leading-[1.66] text-slate-500 sm:text-[0.98rem]">
                                We align this page with the same AI Growth Exa visual language used across the website:
                                sharp blue accents, clean white sections, dark strategic hero areas, and content blocks
                                that focus on trust, execution, and measurable business outcomes.
                            </p>
                        </div>

                        {/* Right: Image — equal height to left column */}
                        <div className="relative min-h-[200px] overflow-hidden rounded-[1.55rem] border border-slate-200/80 bg-slate-100 shadow-[0_22px_60px_-28px_rgba(15,23,42,0.28)] sm:min-h-[230px] lg:ml-auto lg:min-h-0 lg:w-full lg:max-w-[33rem] lg:self-stretch">
                            <img
                                src="/images/why_partner_team.png"
                                alt="Why Partner With Us"
                                className="absolute inset-0 h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Pillar Cards */}
                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {pillars.map((item) => (
                            <div
                                key={item.title}
                                className="flex min-h-[168px] flex-col rounded-[1.75rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(37,99,235,0.24)]"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f3f7ff] text-[1.2rem] text-[#2563eb]">
                                        {item.icon}
                                    </div>
                                    <h3 className="pt-0.5 text-[1.26rem] font-black leading-[1.1] tracking-[-0.03em] text-slate-900">
                                        {item.titleLines?.map((line, idx) => (
                                            <span key={idx} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </h3>
                                </div>
                                <p className="mt-3 max-w-[28ch] text-[0.9rem] leading-[1.62] text-slate-500">
                                    {item.title === "Built for Measurable Growth"
                                        ? "Every industry plan connects acquisition, qualification, follow-up, and reporting into one practical and measurable system."
                                        : item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── From Click to Revenue ── */}
            <section className="bg-[#f4f7ff] px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:px-8 lg:pb-12 lg:pt-6">
                <div className="mx-auto max-w-[1240px]">
                    {/* Header */}
                    <div className="mb-5 text-center">
                        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                            Our Proven AI Growth System
                        </span>
                        <h2 className="mt-2 text-[2rem] font-black tracking-tight text-slate-900 sm:text-[2.35rem] md:text-[2.75rem]">
                            From Click to Revenue
                        </h2>
                    </div>

                    {/* Steps row */}
                    <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-0 lg:justify-between">
                        {/* Dotted connector line — desktop only */}
                        <div
                            aria-hidden="true"
                            className="absolute top-[1.7rem] left-[calc(8.33%+1.5rem)] right-[calc(8.33%+1.5rem)] hidden border-t-2 border-dashed border-blue-200 lg:block"
                        />

                        {growthSteps.map((step, idx) => (
                            <div
                                key={step.title}
                                className="relative z-10 flex flex-col items-center text-center lg:w-[16.66%] lg:px-1.5"
                            >
                                {/* Icon box */}
                                <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[1rem] border border-blue-100 bg-white text-[1.35rem] text-blue-600 shadow-[0_6px_20px_-10px_rgba(37,99,235,0.18)]">
                                    {step.icon}
                                </div>

                                {/* Step number badge */}
                                <div className="mt-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white shadow-sm">
                                    {idx + 1}
                                </div>

                                {/* Title */}
                                <h3 className="mt-2 text-[0.88rem] font-black leading-snug text-slate-900">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-1 max-w-[122px] text-[0.74rem] leading-[1.55] text-slate-500">
                                    {step.description}
                                </p>

                                {/* Mobile arrow (between steps, hidden on lg) */}
                                {idx < growthSteps.length - 1 && (
                                    <FaArrowRight className="mt-3 rotate-90 text-blue-300 text-sm lg:hidden" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:pb-14 lg:pt-10">
                <div className="mx-auto max-w-[1240px]">
                    {/* Section Header */}
                    <div className="mx-auto mb-6 max-w-3xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#2563eb]">
                            <FaBolt className="text-[10px]" />
                            Industry Deep Dive
                        </span>
                        <h2 className="mt-3 text-[2.05rem] font-black tracking-tight text-slate-950 md:text-[2.45rem]">
                            Explore How We Drive Growth
                        </h2>
                        <p className="mt-2 text-[0.94rem] leading-relaxed text-slate-500">
                            Select your industry to see market insights, pain points, and AI-powered solutions.
                        </p>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
                        {tabs.map((item) => (
                            <button
                                key={item.title}
                                onClick={() => setActiveTab(item.value)}
                                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-[12px] font-bold shrink-0 transition-all duration-300 ${activeTab === item.value
                                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600"
                                    }`}
                            >
                                <span className={`text-sm ${activeTab === item.value ? "text-white" : "text-slate-400"}`}>
                                    {item.icon}
                                </span>
                                {item.title}
                            </button>
                        ))}
                    </div>

                    {/* Active Industry Card */}
                    {(() => {
                        const selectedIndustries = activeTab === "all" ? industries : [industries[activeTab]];
                        return (
                            <div className={activeTab === "all" ? "space-y-4" : ""}>
                                {selectedIndustries.map((item) => (
                            <div
                                key={item.title}
                                className="grid grid-cols-1 gap-0 overflow-hidden rounded-[2.25rem] border border-slate-100 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.10)] lg:grid-cols-[0.94fr_1.32fr] lg:items-stretch"
                            >
                                {/* Left Side: Image with overlaid stats */}
                                <div className="relative min-h-[240px] lg:min-h-[360px]">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-slate-900/20" />

                                    {/* Market Outlook — top left */}
                                    {item.marketOutlook && (
                                        <div className="absolute left-5 top-5">
                                            <span className="inline-block bg-blue-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full mb-2.5">
                                                Market Outlook
                                            </span>
                                            <h4 className="text-[1.75rem] font-black leading-tight text-white sm:text-[2.4rem]">
                                                {item.marketOutlook.value}
                                            </h4>
                                            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider leading-snug text-slate-200">
                                                {item.marketOutlook.label}
                                            </p>
                                            <p className="mt-0.5 text-[10px] leading-snug text-slate-300">
                                                {item.marketOutlook.sublabel}
                                            </p>
                                        </div>
                                    )}

                                    {/* Industry title overlay — bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <h3 className="text-[1.45rem] font-black leading-tight text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-[0.82rem] font-medium leading-relaxed text-slate-300">
                                            {item.summary}
                                        </p>
                                        {/* CAGR Pill */}
                                        {item.cagr && (
                                            <div className="mt-3 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                                                <div>
                                                    <p className="text-base font-black text-white leading-tight">{item.cagr.value}</p>
                                                    <p className="text-[10px] text-slate-300 leading-none mt-0.5">{item.cagr.years}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Industry Details */}
                                <div className="flex h-full flex-col p-4 md:p-5 lg:p-6">
                                    {/* Featured badge */}
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border border-emerald-100">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            Featured Industry
                                        </span>
                                        {/* Pagination dots */}
                                        {activeTab !== "all" ? (
                                            <div className="flex items-center gap-1.5">
                                                {industries.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveTab(idx)}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${activeTab === idx ? "w-5 bg-blue-600" : "w-1.5 bg-slate-200"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* 3-Column Grid: Pain · Solutions · Outcome */}
                                    <div className="grid flex-1 grid-cols-1 items-stretch gap-2 md:auto-rows-fr md:grid-cols-3">
                                        {/* Column 1: PAIN POINTS */}
                                        <div className="flex h-full flex-col rounded-2xl border border-rose-100/60 bg-rose-50/60 p-3">
                                            <span className="mb-2.5 block text-[10px] font-black uppercase tracking-widest text-rose-600">
                                                Pain Points
                                            </span>
                                            <ul className="space-y-1.5">
                                                {item.pain.map((point, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-[11px] font-semibold leading-snug text-slate-700">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Column 2: AI SOLUTIONS */}
                                        <div className="flex h-full flex-col rounded-2xl border border-blue-100/60 bg-blue-50/60 p-3">
                                            <span className="mb-2.5 block text-[10px] font-black uppercase tracking-widest text-blue-600">
                                                Our AI Solutions
                                            </span>
                                            <ul className="space-y-1.5">
                                                {item.solutions.map((sol, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-[11px] font-semibold leading-snug text-slate-700">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                                                        <span>{sol}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Column 3: OUTCOME SNAPSHOT */}
                                        <div className="flex h-full flex-col rounded-2xl border border-emerald-100/60 bg-emerald-50/60 p-3">
                                            <div>
                                                <span className="mb-2.5 block text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                                    Outcome Snapshot
                                                </span>
                                                {/* SVG Line Chart */}
                                                <svg className="mb-2.5 h-9 w-full text-emerald-500/80" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M5,32 Q25,22 45,28 T85,8 T95,5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="5" cy="32" r="2.5" fill="#10b981" />
                                                    <circle cx="45" cy="28" r="2.5" fill="#10b981" />
                                                    <circle cx="85" cy="8" r="2.5" fill="#10b981" />
                                                    <circle cx="95" cy="5" r="2.5" fill="#10b981" />
                                                </svg>
                                                <span className="block text-[2.15rem] font-black text-slate-900">
                                                    {item.result}
                                                </span>
                                                <p className="mt-1 text-[11px] font-semibold leading-relaxed text-slate-500">
                                                    {item.resultLabel}
                                                </p>
                                                {item.outcomeNotes?.length ? (
                                                    <ul className="mt-2.5 space-y-1.5">
                                                        {item.outcomeNotes.map((note, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2 text-[10px] font-semibold leading-snug text-slate-600"
                                                            >
                                                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                                                <span>{note}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div>
                                            <Link
                                                to="/contact"
                                                state={{ background: location }}
                                                className="group mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-600 transition-colors hover:text-blue-500"
                                            >
                                                View Case Study
                                                <FaArrowRight className="text-[8px] transition-transform group-hover:translate-x-0.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </section>

            <section className="bg-white px-6 pb-7 pt-3 md:pb-8 md:pt-4">
                <div className="mx-auto max-w-6xl text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
                        <FaUsers />
                    </div>
                    <h2 className="mx-auto mt-3 max-w-4xl text-[1.8rem] font-black leading-[1.02] text-slate-950 md:text-[2.65rem]">
                        Need this page to turn into a lead engine for your industry too?
                    </h2>
                    <p className="mx-auto mt-2 max-w-3xl text-[0.94rem] leading-[1.6] text-slate-500 md:text-[0.98rem]">
                        We can build a full funnel around your market, from positioning and campaigns to AI automation,
                        follow-up systems, and reporting that your team can actually use.
                    </p>

                    <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
                        <Link
                            to="/contact"
                            state={{ background: location }}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500"
                        >
                            Book Free Strategy Call
                            <FaArrowRight className="text-sm" />
                        </Link>
                        <Link
                            to="/services"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-blue-300 hover:text-blue-600"
                        >
                            See Our Services
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

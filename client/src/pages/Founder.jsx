import React, { useEffect, useState, useRef } from 'react';
import {
    TrendingUp,
    Cpu,
    Users,
    Target,
    ChevronRight,
    Award,
    Briefcase,
    BookOpen,
    Linkedin,
    Mail,
    Phone
} from 'lucide-react';

import WhatsAppModal from '../components/Modals/WhatsAppModal';
import founderProfile from '../assets/images/founder/founder-profile.png';

const FounderIntroduction = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const marketingPlanSteps = [
        {
            number: "1",
            title: "Situation (SWOT)",
            items: ["Identify problem", "Develop solution", "Implement solution"]
        },
        {
            number: "2",
            title: "Objectives",
            items: ["Sales", "Market share", "Increase revenue", "Reduce costs"]
        },
        {
            number: "3",
            title: "Strategy",
            items: ["Segment-target", "Price-quality", "Product positioning", "Differentiation", "Distribution"]
        },
        {
            number: "4",
            title: "Action Plan",
            items: ["Budget allocation", "Production", "Promotion", "Distribution"]
        },
        {
            number: "5",
            title: "Forecasts",
            items: ["Quality", "Quantity", "Market share", "Profitability"]
        },
        {
            number: "6",
            title: "Control",
            items: ["Evaluate results", "Make adjustments", "Measure success", "Track progress"]
        }
    ];

    const focusAreas = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Growth Strategy Design",
            description: "Building scalable growth roadmaps aligned with real business goals, not vanity metrics."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Performance Marketing Systems",
            description: "Designing ROI-focused ad systems with clear attribution, control, and scale."
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: "AI Automation Frameworks",
            description: "Smarter funnels, predictive targeting, automated follow-ups, and conversion systems."
        }
    ];

    const industries = [
        { name: "Healthcare", description: "Lead generation & patient acquisition systems" },
        { name: "SaaS & IT Services", description: "Subscription growth, funnels & retention strategies" },
        { name: "Real Estate", description: "High-net lead systems & CRM automation" },
        { name: "Enterprises", description: "Large-scale performance and growth optimization" }
    ];

    const stats = [
        { label: "Years of Experience", value: "5.8+" },
        { label: "Ad Budgets Managed", value: "1.5-2 Career" },
        { label: "Projects Delivered", value: "1600+" },
        { label: "ROAS & CPL Improvements", value: "Proven" }
    ];

    const homeHealthcareMarketData = [
        { year: '2022', marketSize: 8.8 },
        { year: '2024', marketSize: 12.5 },
        { year: '2026', marketSize: 17.7 },
        { year: '2028', marketSize: 25.1 },
        { year: '2030', marketSize: 35.8 },
    ];

    const formatMarketValue = (value) => `USD ${value.toFixed(1)}B`;
    const chartWidth = 640;
    const chartHeight = 256;
    const chartPadding = { top: 18, right: 24, bottom: 34, left: 48 };
    const chartBaselineY = chartHeight - chartPadding.bottom;
    const maxMarketValue = 40;
    const yTickValues = [0, 10, 20, 30, 40];
    const chartPoints = homeHealthcareMarketData.map((entry, index) => {
        const x = chartPadding.left + (index * (chartWidth - chartPadding.left - chartPadding.right)) / (homeHealthcareMarketData.length - 1);
        const y =
            chartPadding.top +
            ((maxMarketValue - entry.marketSize) / maxMarketValue) *
                (chartHeight - chartPadding.top - chartPadding.bottom);

        return { ...entry, x, y };
    });
    const linePoints = chartPoints.map((point) => `${point.x},${point.y}`).join(' ');
    const areaPath = [
        `M ${chartPoints[0].x} ${chartBaselineY}`,
        ...chartPoints.map((point) => `L ${point.x} ${point.y}`),
        `L ${chartPoints[chartPoints.length - 1].x} ${chartBaselineY}`,
        'Z',
    ].join(' ');

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />

            {/* Main Content with proper spacing */}
            <main className="container mx-auto px-4 py-8" ref={heroRef}>
                {/* Hero Section */}
                <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/3">
                            <div className="relative">
                                <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 rounded-full mx-auto overflow-hidden border-8 border-white shadow-2xl">
                                    <img
                                        src={founderProfile}
                                        alt="Priyanshu Srivastava"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg animate-pulse-slow">
                                    <Briefcase className="w-5 h-5 inline mr-2" />
                                    Founder
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Priyanshu Srivastava
                            </h1>
                            <p className="text-xl text-gray-600 mb-6 italic border-l-4 border-blue-500 pl-4">
                                "Behind every scalable brand is a growth mind that understands both numbers and people."
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Priyanshu Srivastava is a growth-focused strategist and AI marketing architect who believes marketing should not just look good — it should perform, convert, and scale.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                    He founded AI Growth Exa with one clear vision:
                                </p>
                                <p className="text-gray-700">
                                    To replace guesswork marketing with intelligent, data-backed growth systems.
                                </p>
                                <p className="text-gray-600 mt-3">
                                    In a market full of noise, trends, and shortcuts, Priyanshu focuses on clarity, systems, and results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                            {stat.label === "ROAS & CPL Improvements" && (
                                <div className="mt-2">
                                    <span className="text-green-600 text-sm font-semibold">✓ Verified Results</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Core Focus Areas */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Core Focus Areas</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {focusAreas.map((area, index) => (
                            <div
                                key={index}
                                className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
                            >
                                <div className="text-blue-600 mb-4">{area.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                                <p className="text-gray-600">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6-Step Marketing Plan */}
                <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">The 6-Step Marketing Plan</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marketingPlanSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300`}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 ml-4">{step.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {step.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-center text-gray-600">
                                            <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Industries & Experience */}
                <div className="flex flex-col lg:flex-row gap-12 mb-16">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Industry Experience</h2>

                        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">Indian Home Healthcare Market</h3>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    CAGR 19.3%
                                </span>
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                                <div className="mb-4 grid grid-cols-3 gap-3">
                                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Base Year</p>
                                        <p className="mt-2 text-lg font-bold text-slate-900">2022</p>
                                        <p className="text-sm text-slate-500">USD 8.8B</p>
                                    </div>
                                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Forecast</p>
                                        <p className="mt-2 text-lg font-bold text-slate-900">2030</p>
                                        <p className="text-sm text-slate-500">USD 35.8B</p>
                                    </div>
                                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Growth Trend</p>
                                        <p className="mt-2 text-lg font-bold text-emerald-600">4.1x</p>
                                        <p className="text-sm text-slate-500">Projected expansion</p>
                                    </div>
                                </div>

                                <div className="h-64 w-full min-w-0">
                                    <svg
                                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                                        className="h-full w-full"
                                        role="img"
                                        aria-label="Indian home healthcare market growth chart"
                                    >
                                        <defs>
                                            <linearGradient id="founderMarketFill" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity="0.35" />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity="0.04" />
                                            </linearGradient>
                                        </defs>

                                        {yTickValues.map((tick) => {
                                            const y =
                                                chartPadding.top +
                                                ((maxMarketValue - tick) / maxMarketValue) *
                                                    (chartHeight - chartPadding.top - chartPadding.bottom);

                                            return (
                                                <g key={tick}>
                                                    <line
                                                        x1={chartPadding.left}
                                                        y1={y}
                                                        x2={chartWidth - chartPadding.right}
                                                        y2={y}
                                                        stroke="#e2e8f0"
                                                        strokeDasharray="4 4"
                                                    />
                                                    <text
                                                        x={chartPadding.left - 12}
                                                        y={y + 4}
                                                        textAnchor="end"
                                                        fontSize="12"
                                                        fontWeight="600"
                                                        fill="#94a3b8"
                                                    >
                                                        ${tick}B
                                                    </text>
                                                </g>
                                            );
                                        })}

                                        <path d={areaPath} fill="url(#founderMarketFill)" />
                                        <polyline
                                            fill="none"
                                            stroke="#2563eb"
                                            strokeWidth="3"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            points={linePoints}
                                        />

                                        {chartPoints.map((point) => (
                                            <g key={point.year}>
                                                <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                                                <circle cx={point.x} cy={point.y} r="2.5" fill="#10b981" />
                                                <text
                                                    x={point.x}
                                                    y={chartHeight - 10}
                                                    textAnchor="middle"
                                                    fontSize="12"
                                                    fontWeight="700"
                                                    fill="#475569"
                                                >
                                                    {point.year}
                                                </text>
                                            </g>
                                        ))}
                                    </svg>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                                    <span>Market Growth Chart</span>
                                    <span>Projected from CAGR-led market expansion</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Industries Served</h3>
                            {industries.map((industry, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-1">{industry.name}</h4>
                                    <p className="text-gray-600 text-sm">{industry.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Professional Journey</h2>

                        <div className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                            {[
                                { role: "Intern", period: "Started from ground up", icon: <BookOpen /> },
                                { role: "Digital Marketing Specialist", period: "Hands-on execution", icon: <Target /> },
                                { role: "Digital Marketing Manager", period: "Team leadership", icon: <Users /> },
                                { role: "Chief Marketing Officer", period: "Strategic oversight", icon: <TrendingUp /> },
                                { role: "Founder & Growth Architect", period: "AI Growth Exa", icon: <Briefcase /> }
                            ].map((item, index) => (
                                <div key={index} className="relative mb-8 pl-16">
                                    <div className="absolute left-4 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                                    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                                        <div className="flex items-center mb-2">
                                            <div className="text-blue-600 mr-3">{item.icon}</div>
                                            <h3 className="text-xl font-bold text-gray-900">{item.role}</h3>
                                        </div>
                                        <p className="text-gray-600">{item.period}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white shadow-xl">
                            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                                <div className="shrink-0">
                                    <div className="h-32 w-32 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg">
                                        <img
                                            src={founderProfile}
                                            alt="Founder strategic snapshot"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
                                        Founder Snapshot
                                    </p>
                                    <h3 className="mt-2 text-2xl font-bold">
                                        Strategy, Systems, and Scale in One View
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-blue-100/90">
                                        From performance marketing to automation-led growth, this journey reflects hands-on execution backed by systems thinking and measurable business impact.
                                    </p>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                                            <p className="text-xs uppercase tracking-[0.18em] text-blue-200">Focus</p>
                                            <p className="mt-1 text-sm font-semibold text-white">Growth Architecture</p>
                                        </div>
                                        <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                                            <p className="text-xs uppercase tracking-[0.18em] text-blue-200">Approach</p>
                                            <p className="mt-1 text-sm font-semibold text-white">Data-Backed Execution</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Philosophy Section */}
                <section className="mb-16 bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            "Anyone can run ads. Very few can build growth that lasts."
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Priyanshu believes in long-term partnerships, transparent communication, data-driven decision-making, and empowering teams with clarity and systems.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Long-term partnerships", "Transparent communication", "Data-driven decisions", "Team empowerment"].map((item, index) => (
                                <div key={index} className="bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Connect Section */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Connect With the Founder</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Want to Talk Growth, Strategy, or AI? Connect directly with the mind behind AI Growth Exa.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                            {/* Buttons Column */}
                            <div className="flex flex-col gap-4 w-full md:w-auto">
                                <a
                                    href="mailto:contact@aigrowthexa.com"
                                    className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 text-lg font-semibold w-full md:w-64"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>Email Founder</span>
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 text-lg font-semibold border-2 border-blue-600 w-full md:w-64"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    <span>LinkedIn Profile</span>
                                </a>
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-32 bg-gray-200"></div>

                            {/* WhatsApp QR Column */}
                            <div className="flex flex-col items-center group cursor-pointer" onClick={() => setIsWhatsAppModalOpen(true)}>
                                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-3 group-hover:border-blue-300 group-hover:shadow-md transition-all">
                                    <img
                                        src="/assets/whatsapp-qr.png"
                                        alt="WhatsApp QR Code"
                                        className="w-48 h-auto object-contain blur-[2px] group-hover:blur-0 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">Click to Expand</div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                                    <Phone className="w-4 h-4" />
                                    <span>Connect on WhatsApp</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FounderIntroduction;

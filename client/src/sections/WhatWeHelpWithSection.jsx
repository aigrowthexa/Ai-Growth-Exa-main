import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutGrid, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "AI-Powered Performance Marketing",
        serviceTitle: "Performance Marketing Services",
        description: "Smarter targeting. Better ROAS. Lower CPL.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop"
    },
    {
        title: "Lead Generation Systems",
        serviceTitle: "Funnel & Automation Systems",
        description: "Predictable, high-quality leads and conversion paths.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop"
    },
    {
        title: "Marketing Automation & Funnels",
        serviceTitle: "Sales-Aligned Marketing Systems",
        description: "AI-driven follow-ups that convert while you sleep.",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=80&auto=format&fit=crop"
    },
    {
        title: "Conversion Rate Optimization (CRO)",
        serviceTitle: "Site Optimization",
        description: "Turn visitors into customers scientifically.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop"
    },
    {
        title: "AI CRM & Sales Automation",
        serviceTitle: "Sales-Aligned Marketing Systems",
        description: "Close more deals with less manual effort.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&auto=format&fit=crop"
    },
    {
        title: "Brand Growth & Scaling Strategy",
        serviceTitle: "Branding, Creative & Design",
        description: "From startup traction to scale-up dominance.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop"
    },
    {
        title: "Social Media Growth Campaigns",
        serviceTitle: "Social Media Marketing",
        description: "Content systems and paid social that build demand.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=80&auto=format&fit=crop"
    },
    {
        title: "Website & Funnel Development",
        serviceTitle: "Web, App & UX/UI Development",
        description: "Fast, conversion-ready pages built to scale.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format&fit=crop"
    }
];

const ServiceCard = ({ title, description, image, serviceTitle }) => {
    const cardRef = useRef(null);
    const timelineRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cardInner = cardRef.current?.querySelector('.card-inner');

            if (!cardInner) {
                return;
            }

            timelineRef.current = gsap.timeline({ paused: true }).to(cardInner, {
                rotateY: 180,
                duration: 0.35,
                ease: 'power2.inOut',
            });
        }, cardRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => timelineRef.current?.play();
    const handleMouseLeave = () => timelineRef.current?.reverse();
    const handleLearnMore = () => {
        navigate('/services', { state: { openServiceTitle: serviceTitle } });
    };

    return (
        <div
            ref={cardRef}
            className="service-card w-full max-w-[250px] h-[145px] perspective-1000 cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-inner relative w-full h-full transition-all duration-300 transform-style-3d">
                <div className="absolute inset-0 w-full h-full backface-hidden bg-slate-950 border border-white/15 rounded-[1.4rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-3 flex flex-col items-center justify-center text-center z-20 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] group-hover:-translate-y-1 perspective-1000 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-[0.92] transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/84 via-[#020617]/28 to-transparent" />
                    <div className="relative z-10 mx-auto w-full max-w-[88%] rounded-xl bg-black/52 px-3.5 py-2.5 shadow-[0_18px_40px_rgba(2,6,23,0.38)]">
                        <h3 className="text-[15px] md:text-base font-black text-white tracking-tight leading-tight text-center group-hover:text-blue-200 transition-colors duration-300">
                            {title}
                        </h3>
                        <div className="mt-1 flex items-center justify-center gap-1 text-blue-200 font-bold text-[8px] uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                            Details <ChevronRight size={10} />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#0a0a0a] rounded-[1.4rem] shadow-2xl p-3.5 flex flex-col items-center justify-center text-center text-white border border-white/5 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/92 via-[#0a0a0a]/88 to-[#22103c]/88" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/15" />
                    <div className="relative z-10">
                        <h3 className="text-xs font-black mb-1 text-white tracking-tight uppercase">{title}</h3>
                        <p className="text-[11px] leading-snug mb-2 text-gray-300 font-medium px-1">
                            {description}
                        </p>
                        <button
                            type="button"
                            onClick={handleLearnMore}
                            className="px-4 py-1.5 bg-blue-600 text-white font-black rounded-full text-[8px] uppercase tracking-[0.18em] hover:bg-white hover:text-blue-600 transition-all duration-500"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WhatWeHelpWithSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const headerChildren = headerRef.current?.children;
            const serviceCards = gridRef.current?.querySelectorAll('.service-card');

            if (headerChildren?.length) {
                gsap.fromTo(
                    headerChildren,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                        },
                    }
                );
            }

            if (serviceCards?.length) {
                gsap.fromTo(
                    serviceCards,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 90%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative z-20 py-6 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),rgba(255,255,255,0)_28%),linear-gradient(180deg,#eef4ff_0%,#f6f9ff_100%)] overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-400/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div ref={headerRef} className="text-center max-w-6xl mx-auto mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-500/20 font-bold text-[9px] uppercase tracking-[0.2em] mb-1.5">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                        Capability Matrix
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-[2.9rem] font-semibold text-gray-950 mb-1 tracking-tight leading-[1] uppercase whitespace-nowrap">
                        Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Growth Engine</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-bold tracking-tight">
                        Deploying <span className="text-blue-600 font-black">AI AGENTS</span> and <span className="text-purple-600 font-black">NEURAL STRATEGIES</span> to outpace competition.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] justify-center gap-3 mb-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>

                <div className="text-center border-t border-gray-100 pt-4">
                    <Link
                        to="/services"
                        ref={buttonRef}
                        className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gray-950 text-white font-black text-base rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <LayoutGrid size={20} className="text-blue-400 group-hover:rotate-90 transition-transform duration-500" />
                        <span>EXPLORE FULL SPECTRUM</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-400" />
                    </Link>
                    <p className="mt-3 text-gray-400 font-bold text-[9px] uppercase tracking-[0.3em]">
                        SECURE_SYNC // GLOBAL_SCALE
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.05; transform: scale(1); }
                    50% { opacity: 0.08; transform: scale(1.1); }
                }
                .animate-pulse {
                    animation: pulse 8s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default WhatWeHelpWithSection;

import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StrategyCallModal from '../components/Modals/StrategyCallModal';
import PlansModal from '../components/Modals/PlansModal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Defining Process",
        desc: "Establishing the framework and objectives",
        color: "text-gray-700",
        bg: "bg-white border-2 border-blue-500",
        iconColor: "text-blue-500",
        glow: "shadow-blue-200"
    },
    {
        title: "Meeting Preparation",
        desc: "Organizing and gathering necessary material",
        color: "text-gray-700",
        bg: "bg-white border-2 border-blue-500",
        iconColor: "text-blue-500",
        glow: "shadow-blue-200"
    },
    {
        title: "Holding the Meeting",
        desc: "Conducting the meeting to discuss and strategize",
        color: "text-gray-700",
        bg: "bg-white border-2 border-blue-500",
        iconColor: "text-blue-500",
        glow: "shadow-blue-200"
    },
    {
        title: "The Follow Up",
        desc: "Reviewing outcomes and ensuring actions are taken",
        color: "text-gray-700",
        bg: "bg-white border-2 border-blue-500",
        iconColor: "text-blue-500",
        glow: "shadow-blue-200"
    },
    {
        title: "Maintaining Momentum",
        desc: "Continuously driving progress and engagement",
        color: "text-gray-700",
        bg: "bg-white border-2 border-blue-500",
        iconColor: "text-blue-500",
        glow: "shadow-blue-200"
    }
];

const FinalCtaSection = () => {
    const sectionRef = useRef(null);
    const nodesRef = useRef([]);
    const linesRef = useRef([]);
    const rocketRef = useRef(null);
    const location = useLocation();
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [isStrategyCallOpen, setIsStrategyCallOpen] = useState(false);
    const [isPlansOpen, setIsPlansOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate nodes one by one
            nodesRef.current.forEach((node, i) => {
                if (!node) {
                    return;
                }

                gsap.fromTo(node,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        delay: i * 0.2,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: node,
                            start: "top 85%",
                        }
                    }
                );
            });

            // Animate dashed lines
            linesRef.current.forEach((line, i) => {
                if (!line) {
                    return;
                }

                gsap.fromTo(line,
                    { width: 0, opacity: 0 },
                    {
                        width: "100%",
                        opacity: 1,
                        duration: 0.8,
                        delay: (i * 0.2) + 0.3,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 85%",
                        }
                    }
                );
            });

            // Rocket animation following the path
            if (rocketRef.current) {
                gsap.fromTo(rocketRef.current,
                    { x: -50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.5,
                        delay: 1.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: rocketRef.current,
                            start: "top 90%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleWhatsApp = (e) => {
        e.preventDefault();
        setIsWhatsAppOpen(!isWhatsAppOpen);
    };

    return (
        <section ref={sectionRef} className="relative pt-6 pb-16 md:pt-8 md:pb-20 bg-white overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-4 sm:mb-5 md:mb-6 px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
                        Ready to Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500">Smarter Growth System?</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium">
                        Stop guessing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500">Start scaling</span> with AI-powered strategies.
                    </p>
                </div>

                {/* Animated Process Flow */}
                <div className="relative mb-10 sm:mb-12 md:mb-14 py-6 sm:py-8 md:py-10 px-3 sm:px-4 bg-gray-50/50 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-4 relative">
                        {steps.map((step, i) => (
                            <React.Fragment key={i}>
                                <div
                                    ref={el => nodesRef.current[i] = el}
                                    className="flex flex-col items-center text-center relative z-20 w-full md:w-1/5"
                                >
                                    <div className={`w-16 h-16 rounded-3xl ${step.bg} shadow-lg ${step.glow} flex items-center justify-center mb-4 transform transition-transform hover:scale-110 hover:rotate-3 cursor-default`}>
                                        <svg className={`w-8 h-8 ${step.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
                                            {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                                            {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                                            {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                            {i === 4 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                                        </svg>
                                    </div>
                                    <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 ${step.color}`}>{step.title}</h4>
                                    <p className="text-xs text-gray-500 font-medium max-w-[140px] sm:max-w-[150px]">{step.desc}</p>
                                </div>

                                {i < steps.length - 1 && (
                                    <div className="hidden md:block flex-1 h-[2px] relative top-[-24px]">
                                        <div
                                            ref={el => linesRef.current[i] = el}
                                            className="w-full h-full border-t-2 border-dashed border-gray-300 opacity-0"
                                        ></div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}

                        {/* Rocket Icon at the end */}
                        <div
                            ref={rocketRef}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-0 hidden md:block"
                        >
                            <svg className="w-10 h-10 text-blue-600 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                    <Link
                        to="/contact"
                        state={{ background: location }}
                        className="px-8 md:px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-xl shadow-blue-500/20 hover:-translate-y-1 flex items-center justify-center gap-3 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Book Strategy Call</span>
                    </Link>

                    <button
                        onClick={toggleWhatsApp}
                        className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-emerald-50 text-emerald-700 font-bold text-base md:text-lg rounded-full hover:bg-emerald-100 transition-all duration-300 border border-emerald-200 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        <span>WhatsApp</span>
                    </button>

                    <button
                        onClick={() => setIsStrategyCallOpen(true)}
                        className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-blue-50 text-blue-700 font-bold text-base md:text-lg rounded-full hover:bg-blue-100 transition-all duration-300 border border-blue-200 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Calendly</span>
                    </button>
                </div>
            </div>

            {/* WhatsApp Popup */}
            {isWhatsAppOpen && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={toggleWhatsApp}>
                    <div className="bg-white p-6 rounded-2xl relative max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={toggleWhatsApp}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center">
                            <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
                                <img
                                    src="/assets/whatsapp-qr.png"
                                    alt="WhatsApp QR Code"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-gray-900 font-bold mb-1">Add me as a contact on WhatsApp.</p>
                            <p className="text-sm text-gray-500 mb-4">Scan this code using the WhatsApp camera to get my number</p>

                            <a
                                href="https://wa.me/message/OUMPIAT35KYIC1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold hover:underline bg-emerald-50 px-4 py-2 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                Connect on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {/* Strategy Call Modal */}
            <StrategyCallModal isOpen={isStrategyCallOpen} onClose={() => setIsStrategyCallOpen(false)} />

            {/* Plans & Helpline Modal */}
            <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
        </section>
    );
};

export default FinalCtaSection;

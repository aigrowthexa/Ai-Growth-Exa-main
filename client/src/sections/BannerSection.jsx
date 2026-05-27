import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, BarChart, Activity, ShieldCheck, Globe } from "lucide-react";
import AiBrainVisual from "../components/AiBrainVisual";
import PlansModal from "../components/Modals/PlansModal";

gsap.registerPlugin(ScrollTrigger);

const BannerSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const visualRef = useRef(null);
    const [isPlansOpen, setIsPlansOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (textRef.current) {
                gsap.fromTo(
                    textRef.current.children,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                        },
                    }
                );
            }

            if (visualRef.current) {
                gsap.fromTo(
                    visualRef.current,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section
                ref={sectionRef}
                className="relative w-full py-12 px-6 md:px-12 overflow-hidden bg-gray-950"
            >
                {/* Dotted Background Pattern */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#3b82f6 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div ref={textRef} className="space-y-4">
                        <div>
                            <h3 className="text-3xl md:text-5xl font-handwriting text-blue-400 mb-2 transform -rotate-2 inline-block">
                                Digital
                            </h3>
                            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight uppercase tracking-tighter">
                                Marketing <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                    Agency
                                </span>
                            </h2>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-6 py-2">
                            <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                AI Infrastructure for Marketers
                            </h4>
                            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                                We empower brands to scale faster using AI,
                                marketing and automation systems tailored for growth.
                            </p>
                        </div>

                        {/* Compact Horizontal Metrics Strip */}
                        <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
                            {[
                                { title: "Accuracy", value: "99.8%", icon: <ShieldCheck size={14} className="text-blue-400" /> },
                                { title: "Velocity", value: "2.4M+", icon: <Zap size={14} className="text-blue-400" /> },
                                { title: "Latency", value: "12ms", icon: <BarChart size={14} className="text-blue-400" /> }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 opacity-60">
                                        {item.icon}
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">{item.title}</span>
                                    </div>
                                    <div className="text-2xl font-black text-white tracking-tight">{item.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 flex flex-wrap items-center gap-6">
                            <button
                                onClick={() => setIsPlansOpen(true)}
                                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xl rounded-full shadow-[0_0_20px_rgba(39,102,241,0.3)] hover:shadow-[0_0_35px_rgba(39,102,241,0.5)] hover:scale-105 transition-all duration-300 transform"
                            >
                                Book a Free Strategy Call
                            </button>

                            {/* Compact Status Indicator */}
                            <div className="flex items-center gap-4 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Activity size={10} className="text-blue-400" />
                                        <span className="text-[9px] text-gray-500 uppercase font-black tracking-[0.2em]">Infrastructure</span>
                                    </div>
                                    <span className="text-[11px] text-white font-black tracking-tighter uppercase italic">SYSTEM_OPTIMIZED</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 p-1.5 px-3 bg-blue-500/5 rounded-full border border-blue-500/10">
                                <Globe size={11} className="text-blue-500/50" />
                                <span className="text-[10px] text-blue-500/60 font-mono font-bold tracking-widest uppercase truncate max-w-[200px]">
                                    AIGrowthExa.com // SECURE_SYNC
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual: AI Dodecahedron with Integrated Content */}
                    <div ref={visualRef} className="relative h-full lg:h-[600px] w-full flex items-center justify-center">
                        {/* Enhanced Glow Background with Blur */}
                        <div className="absolute inset-0 bg-blue-500/10 blur-[160px] rounded-full pointer-events-none"></div>
                        <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none"></div>

                        {/* Core AI Visual (3D Dodecahedron with Content Inside) */}
                        <div className="relative w-full h-[500px] max-w-[500px] z-10 transition-transform duration-500 hover:scale-105">
                            <AiBrainVisual />
                        </div>
                    </div>
                </div>
            </section>

            <PlansModal
                isOpen={isPlansOpen}
                onClose={() => setIsPlansOpen(false)}
            />

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-30px) translateX(-15px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-15px) translateX(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 7s ease-in-out infinite;
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
                    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default BannerSection;
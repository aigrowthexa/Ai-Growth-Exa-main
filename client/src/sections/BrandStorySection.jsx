import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FloatingParticles from '../components/FloatingParticles';
import StarBorder from '../components/StarBorder';
import GradientText from '../components/GradientText';

gsap.registerPlugin(ScrollTrigger);

const BrandStorySection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom center",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(contentRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
                .fromTo(cardRef.current,
                    { x: 50, opacity: 0, scale: 0.95 },
                    { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
                    "-=0.8"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-0 sm:py-1 md:py-2 lg:py-3 flex items-center justify-center overflow-hidden bg-white text-gray-900">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <FloatingParticles theme="light" />
            </div>

            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-blue-50/60 blur-[120px] rounded-full pointer-events-none -mr-16 md:-mr-32 -mt-16 md:-mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-purple-50/60 blur-[120px] rounded-full pointer-events-none -ml-16 md:-ml-32 -mb-16 md:-mb-32"></div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 items-center">

                    {/* Left Column: Narrative */}
                    <div className="flex flex-col gap-3 sm:gap-4 max-w-[500px]">
                        <div>
                            <StarBorder as="span" color="magenta" speed="5s" thickness={1} className="rounded-full mb-3 inline-block" innerClassName="!bg-white !from-white !to-white !border-gray-200 !py-2 !px-4 !rounded-full">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                    <GradientText
                                        colors={['#2563EB', '#9333EA', '#2563EB']}
                                        animationSpeed={3}
                                        showBorder={false}
                                        className="text-sm font-bold uppercase tracking-widest"
                                    >
                                        Brand Story
                                    </GradientText>
                                </span>
                            </StarBorder>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-0">
                                Capturing the <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Soul of Your Business
                                </span>
                            </h2>
                        </div>

                        <div ref={contentRef} className="flex flex-col gap-3 sm:gap-4">
                            <div className="flex flex-col gap-3 text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                                <p>
                                    At <span className="font-bold text-gray-900">AI Growth Exa</span>, we believe that a brand is more than just a logo or a color palette. It is the voice that speaks when you're not in the room, the feeling you leave behind, and the promise you keep to your customers.
                                </p>
                                <p>
                                    In a digital landscape drowned in noise, we help you find your frequency. We blend <span className="text-blue-700 font-bold">data-driven strategy</span> with <span className="text-purple-700 font-bold">creative brilliance</span> to build identities that don't just fit in—they stand out and lead.
                                </p>
                            </div>

                            <div className="mt-1">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-all duration-300 overflow-hidden">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                    <Link to="/careers" className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        Start Your Transformation
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feature Card */}
                    <div ref={cardRef} className="relative lg:max-w-[520px] mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-[2rem] opacity-30 blur-xl"></div>
                        <div className="relative bg-gray-900 text-white p-2.5 sm:p-3.5 md:p-4 rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-gray-800">

                            {/* Card Background Elements */}
                            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-3xl -ml-12 sm:-ml-16 -mb-12 sm:-mb-16 pointer-events-none"></div>

                            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 relative z-10">We don't just <br /> design logos.</h3>

                            <div className="space-y-2 sm:space-y-3 relative z-10">
                                {/* We Create Meaning */}
                                <div className="flex gap-2 sm:gap-2.5 group/item cursor-pointer relative rounded-xl p-2 sm:p-2.5 transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]">
                                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center transition-all duration-300 group-hover/item:bg-blue-600/20 group-hover/item:border-blue-500/50 group-hover/item:scale-110 perspective-500">
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            whileHover={{ rotateX: 20, rotateY: 20, translateZ: 10 }}
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 transition-transform duration-300 group-hover/item:rotate-12 group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base sm:text-lg mb-1 transition-colors duration-300 group-hover/item:text-blue-400">We Create Meaning</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                            Every pixel, every word, and every interaction is crafted to communicate your core values and vision.
                                        </p>
                                    </div>
                                </div>

                                {/* We Build Consistency */}
                                <div className="flex gap-2 sm:gap-2.5 group/item cursor-pointer relative rounded-xl p-2 sm:p-2.5 transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]">
                                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center transition-all duration-300 group-hover/item:bg-purple-600/20 group-hover/item:border-purple-500/50 group-hover/item:scale-110 perspective-500">
                                        <motion.div
                                            animate={{ scale: [1, 1.15, 1] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            whileHover={{ rotateX: 20, rotateY: 20, translateZ: 10 }}
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 transition-transform duration-300 group-hover/item:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base sm:text-lg mb-1 transition-colors duration-300 group-hover/item:text-purple-400">We Build Consistency</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                            A unified brand experience across all channels that builds recognition and loyalty instantly.
                                        </p>
                                    </div>
                                </div>

                                {/* We Establish Trust */}
                                <div className="flex gap-2 sm:gap-2.5 group/item cursor-pointer relative rounded-xl p-2 sm:p-2.5 transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]">
                                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center transition-all duration-300 group-hover/item:bg-indigo-600/20 group-hover/item:border-indigo-500/50 group-hover/item:scale-110 perspective-500">
                                        <motion.div
                                            animate={{ y: [0, -3, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            whileHover={{ rotateX: 20, rotateY: 20, translateZ: 10 }}
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 transition-transform duration-300 group-hover/item:-rotate-12 group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base sm:text-lg mb-1 transition-colors duration-300 group-hover/item:text-indigo-400">We Establish Trust</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                            Professional, polished, and purposeful design that makes your audience confident in choosing you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-800">
                                <p className="text-gray-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                                    Your brand deserves more than ordinary.
                                </p>
                                <div className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Let's build something extraordinary.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BrandStorySection;

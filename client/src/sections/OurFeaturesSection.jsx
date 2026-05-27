import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
    Bot, BarChart3, Zap, Mic, Smartphone, MapPin, Bolt, Palette,
    PenTool, Globe, Tablet, FileText, Handshake, Mail,
    ShoppingBag, MessageCircle, Users, Star, Target, TrendingUp, Flag
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
    { icon: <Bot size={28} />, title: 'AI Marketing Solutions', subtitle: 'LLM Growth', color: 'blue', animation: 'pulse' },
    { icon: <BarChart3 size={28} />, title: 'Performance Marketing', subtitle: 'Google • Meta • LinkedIn • YouTube', color: 'indigo', animation: 'bounce' },
    { icon: <Zap size={28} />, title: 'SEO & Growth Strategy', subtitle: 'Organic Growth', color: 'yellow', animation: 'spin' },
    { icon: <Mic size={28} />, title: 'Podcast Marketing', subtitle: 'Audio Branding', color: 'purple', animation: 'breathe' },
    { icon: <Smartphone size={28} />, title: 'Social Media Marketing', subtitle: 'Multi-Platform', color: 'pink', animation: 'bounce' },
    { icon: <MapPin size={28} />, title: 'GMB with AI Model', subtitle: 'Local SEO', color: 'red', animation: 'pulse' },
    { icon: <Bolt size={28} />, title: 'Funnel & Automation', subtitle: 'Lead Generation', color: 'orange', animation: 'spin' },
    { icon: <Palette size={28} />, title: 'Branding & Creative', subtitle: 'Visual Identity', color: 'cyan', animation: 'bounce' },
    { icon: <PenTool size={28} />, title: 'Logo Design', subtitle: 'Brand Assets', color: 'emerald', animation: 'spin' },
    { icon: <Globe size={28} />, title: 'Website Development', subtitle: 'Full Stack', color: 'sky', animation: 'breathe' },
    { icon: <Tablet size={28} />, title: 'Mobile Applications', subtitle: 'Android / iOS', color: 'violet', animation: 'bounce' },
    { icon: <FileText size={28} />, title: 'Content Creation', subtitle: 'Writing & Strategy', color: 'amber', animation: 'pulse' },
    { icon: <Handshake size={28} />, title: 'Sales Alignment', subtitle: 'Revenue Growth', color: 'rose', animation: 'breathe' },
    { icon: <Mail size={28} />, title: 'Email Marketing', subtitle: 'Automation', color: 'blue', animation: 'pulse' },
    { icon: <ShoppingBag size={28} />, title: 'E-commerce Marketing', subtitle: 'Conversion Focus', color: 'green', animation: 'bounce' },
    { icon: <MessageCircle size={28} />, title: 'WhatsApp Messaging', subtitle: 'Direct Outreach', color: 'emerald', animation: 'pulse' },
    { icon: <Users size={28} />, title: 'Brand Collaborations', subtitle: 'Strategic Partners', color: 'indigo', animation: 'breathe' },
    { icon: <Star size={28} />, title: 'Influencer Marketing', subtitle: 'Social Proof', color: 'yellow', animation: 'spin' },
    { icon: <Target size={28} />, title: 'UX/UI Design', subtitle: 'User Experience', color: 'fuchsia', animation: 'bounce' },
    { icon: <TrendingUp size={28} />, title: 'Application Marketing', subtitle: 'App Growth', color: 'teal', animation: 'pulse' },
    { icon: <Flag size={28} />, title: 'Go-To-Market', subtitle: 'Launch Success', color: 'orange', animation: 'spin' }
];

const row1 = features.slice(0, 11);
const row2 = features.slice(11);

const FeatureCard = ({ icon, title, subtitle, color, animation }) => {
    const colorClasses = {
        blue: "bg-blue-50 border-blue-100 text-blue-600",
        indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
        yellow: "bg-yellow-50 border-yellow-100 text-yellow-600",
        purple: "bg-purple-50 border-purple-100 text-purple-600",
        pink: "bg-pink-50 border-pink-100 text-pink-600",
        red: "bg-red-50 border-red-100 text-red-600",
        orange: "bg-orange-50 border-orange-100 text-orange-600",
        cyan: "bg-cyan-50 border-cyan-100 text-cyan-600",
        emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
        sky: "bg-sky-50 border-sky-100 text-sky-600",
        violet: "bg-violet-50 border-violet-100 text-violet-600",
        amber: "bg-amber-50 border-amber-100 text-amber-600",
        rose: "bg-rose-50 border-rose-100 text-rose-600",
        green: "bg-green-50 border-green-100 text-green-600",
        fuchsia: "bg-fuchsia-50 border-fuchsia-100 text-fuchsia-600",
        teal: "bg-teal-50 border-teal-100 text-teal-600",
    };

    const currentColors = colorClasses[color] || colorClasses.blue;

    const animations = {
        spin: {
            animate: { rotate: 360 },
            transition: { duration: 10, repeat: Infinity, ease: "linear" }
        },
        bounce: {
            animate: { y: [0, -4, 0] },
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        },
        pulse: {
            animate: { scale: [1, 1.05, 1] },
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        },
        breathe: {
            animate: { opacity: [0.7, 1, 0.7], scale: [0.95, 1, 0.95] },
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
    };

    const selectedAnimation = animations[animation] || animations.pulse;

    return (
        <div className="flex-shrink-0 w-52 p-4 bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.06)] hover:border-blue-200/50 transition-all duration-500 hover:-translate-y-2 group perspective-1000">
            {/* 3D Animated Icon Container */}
            <motion.div
                className={`w-12 h-12 mb-3 rounded-xl ${currentColors} border shadow-[0_8px_0_rgb(0,0,0,0.05)] flex items-center justify-center transform-style-3d group-hover:shadow-[0_4px_0_rgb(0,0,0,0.05)] transition-all duration-500`}
                whileHover={{
                    rotateX: 15,
                    rotateY: 15,
                    translateZ: 20,
                    scale: 1.1
                }}
            >
                <motion.div {...selectedAnimation} style={{ transformStyle: 'preserve-3d' }}>
                    <div style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))' }}>
                        {icon}
                    </div>
                </motion.div>
            </motion.div>

            {/* Title */}
            <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                {title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-gray-500 font-medium tracking-tight">
                {subtitle}
            </p>
        </div>
    );
};

const OurFeaturesSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const containerRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!headerRef.current) {
                return;
            }

            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden mb-8">
            {/* Header Section - Light Theme */}
            <div className="bg-white py-4 md:py-5">
                <div ref={headerRef} className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
                    {/* Tag */}
                    <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-2">
                        <span className="text-blue-600 text-xs md:text-sm font-semibold tracking-widest uppercase">
                            OUR FEATURES
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-1">
                        <span className="text-gray-900">Together, we achieve </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">great things</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        At AI GrowthExa, we blend innovation and expertise to deliver tailored digital solutions.
                        Our features empower businesses to reach their full potential and achieve success collaboratively.
                    </p>
                </div>
            </div>

            {/* Horizontal Scroll Gallery */}
            <div ref={containerRef} className="bg-gradient-to-b from-white via-gray-50 to-white flex flex-col justify-center py-1 overflow-hidden">
                {/* Row 1 - Slides Right to Left */}
                <div className="relative mb-1.5">
                    <div
                        ref={row1Ref}
                        className="marquee-track flex gap-3 px-3 animate-marquee-left"
                        style={{
                            animation: 'marquee-left 30s linear infinite',
                            willChange: 'transform',
                            pointerEvents: 'none',
                        }}
                    >
                        {[...row1, ...row1].map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                subtitle={feature.subtitle}
                                color={feature.color}
                                animation={feature.animation}
                            />
                        ))}
                    </div>
                </div>

                {/* Row 2 - Slides Left to Right */}
                <div className="relative">
                    <div
                        ref={row2Ref}
                        className="marquee-track flex gap-3 px-3 animate-marquee-right"
                        style={{
                            animation: 'marquee-right 18s linear infinite'
                        }}
                    >
                        {[...row2, ...row2].map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                subtitle={feature.subtitle}
                                color={feature.color}
                                animation={feature.animation}
                            />
                        ))}
                    </div>
                </div>

                {/* CSS Keyframes */}
                <style>{`
                    @keyframes marquee-left {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    
                    @keyframes marquee-right {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                    
                    .marquee-track:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default OurFeaturesSection;

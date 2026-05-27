import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Globe, Users, Mail, Phone, Shield, ArrowRight, Instagram,
    Facebook, Linkedin, Youtube, Twitter,
    Briefcase, User, MessageCircle, Info, BookOpen, Scale,
    Cookie, Copyright, Send, Building2
} from 'lucide-react';
import logo from '../assets/images/site/AI_Growth_Exa_logo_designs22-removebg-preview.png';
import api from '../api/api.js';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const location = useLocation();
    const footerRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await api.post("/connect", formData);
            alert("Message sent successfully 🚀");

            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                message: "",
            });
        } catch (error) {
            alert("Something went wrong 😢");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const ctx = gsap.context(() => {
            const footerColumns = footerRef.current?.querySelectorAll(".footer-column");

            if (!footerRef.current || !footerColumns?.length) {
                return;
            }

            const footerIsAlreadyVisible =
                footerRef.current.getBoundingClientRect().top <= window.innerHeight * 0.95;

            if (footerIsAlreadyVisible) {
                gsap.fromTo(
                    footerColumns,
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                    }
                );
                return;
            }

            gsap.fromTo(
                footerColumns,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleLinkHover = (e) => {
        gsap.to(e.target, { x: 5, color: "#3b82f6", duration: 0.3 });
    };

    const handleLinkLeave = (e) => {
        gsap.to(e.target, { x: 0, color: "#9ca3af", duration: 0.3 });
    };

    const socialLinks = [
        { name: "LinkedIn", url: "https://www.linkedin.com/company/ai-growthexa/about/?viewAsMember=true", icon: <Linkedin size={16} /> },
        { name: "Instagram", url: "https://www.instagram.com/aigrowthexa/", icon: <Instagram size={16} /> },
        { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61586954705320", icon: <Facebook size={16} /> },
        { name: "YouTube", url: "https://www.youtube.com/@AIGrowthExa", icon: <Youtube size={16} /> },
        { name: "X (Twitter)", url: "https://x.com/aigrowthexa", icon: <Twitter size={16} /> },
    ];

    return (
        <footer id="site-footer" ref={footerRef} className="bg-gray-900 text-gray-300 py-12 px-6 sm:px-12 lg:px-16 border-t border-gray-800 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 max-w-7xl relative z-10">
                {/* Branding Column */}
                <div className="footer-column flex flex-col space-y-4 lg:pr-4">
                    <Link to="/" className="inline-block transform transition-transform hover:scale-105">
                        <img src={logo} alt="Ai Growth Exa" className="h-10 md:h-12 w-auto object-contain" />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Elevating businesses through precision AI-powered strategies and performance-first growth systems.
                    </p>
                    <div className="flex items-center gap-4 text-gray-500">
                        <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold">
                            <Shield size={12} className="text-blue-500" />
                            Secure
                        </span>
                        <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold">
                            <Globe size={12} className="text-blue-500" />
                            Global
                        </span>
                    </div>
                </div>

                { }
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative flex items-center gap-2">
                        <Globe size={20} className="text-blue-500" />
                        Explore
                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <ul className="space-y-2">
                        {[
                            { name: "About Us", path: "/about", icon: <Info size={14} /> },
                            { name: "Our Services", path: "/services", icon: <Briefcase size={14} /> },
                            { name: "Blog", path: "/blog", icon: <BookOpen size={14} /> },
                            { name: "Careers", path: "/careers", icon: <Users size={14} /> },
                            { name: "About the Founder", path: "/about", icon: <User size={14} /> },
                            { name: "Industries We Serve", path: "/services", icon: <Building2 size={14} /> },
                            { name: "Case Studies", path: "/blog", icon: <BookOpen size={14} /> },
                            { name: "Contact Us", path: "/contact", icon: <MessageCircle size={14} /> }
                        ].map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    state={item.path === '/contact' ? { background: location } : undefined}
                                    className="flex items-center gap-2 transition-colors duration-300 text-gray-400 hover:text-blue-400"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    <span className="text-blue-500/50">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                { }
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative flex items-center gap-2">
                        <Users size={20} className="text-blue-500" />
                        Social Media
                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <ul className="space-y-2">
                        {socialLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 transition-colors duration-300 text-gray-400 hover:text-blue-400"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    <span className="text-blue-500/50">{link.icon}</span>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                { }
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative flex items-center gap-2">
                        <Shield size={20} className="text-blue-500" />
                        Legal
                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <ul className="space-y-2">
                        {[
                            { name: "Terms & Conditions", path: "/terms-and-conditions", icon: <Scale size={14} /> },
                            { name: "Privacy Policy", path: "/privacy-policy", icon: <Shield size={14} /> },
                            { name: "Cookie Policy", path: "/cookie-policy", icon: <Cookie size={14} /> },
                            { name: "Copyright Policy", path: "/copyright-policy", icon: <Copyright size={14} /> }
                        ].map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className="flex items-center gap-2 transition-colors duration-300 text-gray-400 hover:text-blue-400"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    <span className="text-blue-500/50">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                { }
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative flex items-center gap-2">
                        <Mail size={20} className="text-blue-500" />
                        Connect With Us
                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <textarea
                            placeholder="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-all duration-300 transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Ai Growth Exa. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../api/api.js';

gsap.registerPlugin(ScrollTrigger);

const GrowthPlanSection = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        industry: '',
        services: '',
        budget: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: leftRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(formRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Reset status when user starts typing again
        if (submitStatus) setSubmitStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Validate required fields
            if (!formData.name || !formData.phone || !formData.email) {
                throw new Error('Please fill in all required fields');
            }

            // Validate phone number format
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
                throw new Error('Please enter a valid 10-digit phone number');
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

            const response = await api.post('/leads/leadcreate', formData);



            // Success message
            setSubmitStatus('success');

            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                company: '',
                industry: '',
                services: '',
                budget: '',
                message: ''
            });

            // Show success alert
            alert('✅ Thank you! Your growth plan request has been submitted successfully. We will contact you within 24 hours.');

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');

            let errorMessage = 'Something went wrong. Please try again.';

            if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
            } else if (error.request) {
                // Request was made but no response
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.message) {
                // Custom validation error
                errorMessage = error.message;
            }

            alert(`❌ ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-4 transition-colors duration-500">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10"></div>
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-400/5 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-400/5 rounded-full blur-[128px]"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Left Side - Heading & Tagline */}
                    <div ref={leftRef} className="space-y-3">
                        <div className="inline-block px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                            <span className="text-blue-600 text-xs font-semibold uppercase">PERSONALIZED GROWTH PLAN</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-gray-800 leading-tight">
                            Every brand is different.
                        </h2>

                        <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                            Your growth plan should be too.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl pt-1">
                            Share your goals and challenges with us. We'll create a personalized AI-powered marketing plan
                            tailored to your brand's unique needs and objectives.
                        </p>

                        <div className="space-y-3 pt-3">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4.5 h-4.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-medium">Free 30-minute strategy consultation</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4.5 h-4.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-medium">Custom AI solution recommendation</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4.5 h-4.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-medium">No commitment required</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4.5 h-4.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-medium">ROI-focused performance tracking</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4.5 h-4.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-medium">Dedicated AI growth consultant</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4.5 h-4.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-medium">Transparent reporting & dashboard access</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4.5 h-4.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-medium">24/7 dedicated support team</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Lead Form */}
                    <div ref={formRef}>
                        <form onSubmit={handleSubmit} className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-2xl">
                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-green-700 font-medium">Thank you! We'll contact you soon.</span>
                                    </div>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-700 font-medium">Something went wrong. Please try again.</span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2.5">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                        placeholder="John Doe"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                        placeholder="9876543210"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                        placeholder="john@company.com"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                        placeholder="Your Company Inc."
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Industry
                                    </label>
                                    <select
                                        id="industry"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                        disabled={isSubmitting}
                                    >

                                        <option value="">Select your industry</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="SaaS / Technology">SaaS / Technology</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Education">Education</option> {/* ✅ CHANGED */}
                                        <option value="Retail">Retail</option>
                                        <option value="Consulting">Consulting</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Services You're Looking For */}
                                <div>
                                    <label htmlFor="services" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Services You're Looking For
                                    </label>
                                    <select
                                        id="services"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleChange}
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select service</option>
                                        <option value="Brand Identity & Design">Brand Identity & Design</option>
                                        <option value="AI-Powered Marketing">AI-Powered Marketing</option>
                                        <option value="Content Creation">Content Creation</option>
                                        <option value="Social Media Management">Social Media Management</option>
                                        <option value="SEO & Performance Marketing">SEO & Performance Marketing</option>
                                        <option value="Marketing Automation">Marketing Automation</option>
                                        <option value="Full-Service Growth">Full-Service Growth</option>
                                    </select>
                                </div>

                                {/* Monthly Marketing Budget */}
                                <div>
                                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Monthly Marketing Budget
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select your budget range</option>
                                        <option value="Less than $5,000">Less than $5,000</option>
                                        <option value="$5,000 - $10,000">$5,000 - $10,000</option> {/* ✅ CHANGED */}
                                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                                        <option value="$50,000+">$50,000+</option>
                                    </select>
                                </div>

                                {/* Query / Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-0.5">
                                        Query / Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-medium"
                                        placeholder="What are your biggest marketing challenges?"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-500 hover:to-purple-500 hover:scale-105'}`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        'Get My Personalized Growth Plan'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthPlanSection;

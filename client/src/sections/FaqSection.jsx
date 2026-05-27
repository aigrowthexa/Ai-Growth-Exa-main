import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
    {
        question: "What industries do you work with?",
        answer: "We work across startups, e-commerce, SaaS, real estate, education, healthcare, service businesses, and B2B brands. Our systems are flexible, making us a trusted choice among the best marketing and IT companies in India."
    },
    {
        question: "How does AI actually help in marketing?",
        answer: "AI allows us to predict user behavior, optimize targeting, reduce ad waste, improve conversions, and automate follow-ups — delivering higher ROI with smarter decisions."
    },
    {
        question: "Do you replace human marketers with AI?",
        answer: "Never. AI enhances human strategy. We combine human creativity + machine intelligence to build scalable growth systems."
    },
    {
        question: "Is AI marketing expensive?",
        answer: "Not when done right. AI reduces costs by improving efficiency, accuracy, and long-term performance."
    },
    {
        question: "What is your pricing model?",
        answer: "We offer custom pricing based on your goals, scope, and budget. No rigid packages — only strategies that fit your business."
    },
    {
        question: "How long before we see results?",
        answer: "Most clients see initial traction within 30 days, with strong optimization and scalable growth in 60–90 days."
    },
    {
        question: "Do you guarantee results?",
        answer: "We don’t promise magic numbers. We build growth engines designed to perform consistently — the reason clients rank us among the top marketing agencies in Delhi NCR."
    },
    {
        question: "Can small businesses work with you?",
        answer: "Absolutely. Especially small businesses that are serious about scaling smartly and sustainably."
    },
    {
        question: "Do you handle ads and automation together?",
        answer: "Yes. Strategy, performance ads, funnels, and AI automation — all under one roof."
    },
    {
        question: "Which platforms do you work on?",
        answer: "Google Ads, Meta (Facebook & Instagram), LinkedIn, YouTube, CRM tools, automation platforms, and advanced AI systems."
    },
    {
        question: "Is AI safe for my business data?",
        answer: "Yes. We follow strict data privacy, compliance, and security standards."
    },
    {
        question: "Do you work globally?",
        answer: "Yes. We serve clients across India, the Middle East, Europe, and other global markets."
    },
    {
        question: "What makes you different from other agencies?",
        answer: "We don’t sell services. We build growth engines. That’s why we’re recognized as one of the best IT and marketing companies in Delhi NCR."
    },
    {
        question: "Can you audit our existing marketing?",
        answer: "Yes. We provide deep, AI-powered audits covering ads, funnels, SEO, automation, and conversion gaps."
    },
    {
        question: "How do we get started?",
        answer: "Simple — book a strategy call and let’s map your growth."
    },
    {
        question: "Do you build websites and applications?",
        answer: "Yes. We design and develop high-performance websites and mobile applications built for growth."
    },
    {
        question: "What marketing and IT services do you provide?",
        answer: "We offer end-to-end solutions, positioning us among the top 5 marketing and IT companies in Noida, Greater Noida, and Delhi NCR:\n\n• AI Marketing Solutions (LLM-Driven Growth)\n• Performance Marketing (Google, Meta, LinkedIn, YouTube Ads)\n• SEO & Growth Strategy\n• Funnel Building & Marketing Automation\n• Branding, Creative & Logo Design\n• Website Development & UX/UI Design\n• Mobile App Development (Android & iOS)\n• Content Creation & Copywriting\n• Email & WhatsApp Marketing\n• E-commerce & Application Marketing\n• Podcast, Influencer & Brand Collaborations\n• Go-To-Market Strategies\n• CRM, GMB & Sales-Marketing Alignment"
    }
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        if (!contentRef.current || !iconRef.current) {
            return;
        }

        if (isOpen) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.to(iconRef.current, {
                rotate: 180,
                duration: 0.3
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });
            gsap.to(iconRef.current, {
                rotate: 0,
                duration: 0.3
            });
        }
    }, [isOpen]);

    return (
        <div className={`mb-2 rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-white/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'}`}>
            <button
                onClick={onClick}
                className="w-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 flex items-center justify-between text-left group transition-all duration-300"
            >
                <span className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-all duration-300 pr-3 ${isOpen ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'}`}>
                    {question}
                </span>
                <div
                    ref={iconRef}
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border transition-colors duration-300 ${isOpen ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-gray-500 group-hover:text-blue-400 group-hover:border-blue-400/50'}`}
                >
                    <span className="text-lg">▼</span>
                </div>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden h-0 opacity-0"
            >
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line border-t border-white/5 pt-3 sm:pt-4 md:pt-5 mx-4 sm:mx-5 md:mx-6">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current) {
                return;
            }

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom", // When top of section hits bottom of viewport
                end: "bottom top", // When bottom of section hits top of viewport
                onLeave: () => {
                    // Close all FAQs and reset count when moving to NEXT section
                    setOpenIndex(null);
                    setVisibleCount(5);
                },
                onLeaveBack: () => {
                    // Close all FAQs and reset count when moving to PREVIOUS section
                    setOpenIndex(null);
                    setVisibleCount(5);
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, faqData.length));
    };

    return (
        <section ref={sectionRef} className="relative py-10 md:py-12 bg-[#050b1a] overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full"></div>
                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.14) 0.7px, transparent 0.7px)",
                        backgroundSize: "18px 18px",
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-2 md:mb-3 tracking-tight">
                        FAQ – <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Real Questions.</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-400 font-medium tracking-wide">
                        Clear Answers. <span className="text-white">Proven Growth.</span>
                    </p>
                </div>

                <div className="space-y-2.5">
                    {faqData.slice(0, visibleCount).map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFaq(index)}
                        />
                    ))}
                </div>

                {visibleCount < faqData.length ? (
                    <div className="mt-6 md:mt-8 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/5 border border-white/10 hover:border-blue-500/50 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-1"
                        >
                            <span>Load More Questions</span>
                            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 md:mt-8 text-center">
                        <button
                            onClick={() => setVisibleCount(5)}
                            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/5 border border-white/10 hover:border-blue-500/50 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-1"
                        >
                            <span>Show Less</span>
                            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FaqSection;

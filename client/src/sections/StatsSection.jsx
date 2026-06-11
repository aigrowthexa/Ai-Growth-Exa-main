import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ number, suffix = '', label, delay }) => {
    const cardRef = useRef(null);
    const countRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const countElement = countRef.current;

        if (!card || !countElement) return;

        // Initial state
        gsap.set(card, { y: 50, opacity: 0 });

        // ScrollTrigger Animation
        const trigger = ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => {
                // Card entrance
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: delay * 0.1
                });

                // Counter animation
                gsap.to(countElement, {
                    innerHTML: number,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function () {
                        if (countElement) {
                            countElement.innerHTML = Math.ceil(this.targets()[0].innerHTML).toLocaleString();
                        }
                    }
                });
            },
            once: true
        });

        // Cleanup on unmount
        return () => {
            trigger.kill();
            gsap.killTweensOf(card);
            gsap.killTweensOf(countElement);
        };
    }, [number, delay]);

    return (
        <div
            ref={cardRef}
            className="flex-shrink-0 w-[280px] sm:w-[320px] mx-3 overflow-hidden rounded-2xl p-4 sm:p-5 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group"
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)'
            }}
        >
            <div className="text-center relative z-10">
                <div className="mb-4 flex items-center justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
                    <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-blue-400"></div>
                </div>

                <div className="mb-4 relative">
                    <span
                        ref={countRef}
                        className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-blue-300 drop-shadow-sm"
                    >
                        0
                    </span>
                    <span className="text-5xl md:text-6xl font-black text-blue-400 ml-1">{suffix}</span>

                    {/* Glow effect behind number */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500/20 blur-3xl rounded-full -z-10 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                </div>

                <p className="text-sm sm:text-base text-gray-400 font-medium tracking-wide uppercase group-hover:text-gray-300 transition-colors">
                    {label}
                </p>
            </div>

            {/* Bottom highlight line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    );
};

const StatsSection = () => {
    const sectionRef = useRef(null);
    const scrollerRef = useRef(null);
    const cardsRef = useRef(null);


    const [barData, setBarData] = useState([
        { month: 'Jan', value: 35, cost: '$35' },
        { month: 'Feb', value: 42, cost: '$42' },
        { month: 'Mar', value: 50, cost: '$55' },
        { month: 'Apr', value: 58, cost: '$68' },
        { month: 'May', value: 65, cost: '$82' },
        { month: 'Jun', value: 72, cost: '$95' },
        { month: 'Jul', value: 80, cost: '$108' },
        { month: 'Aug', value: 88, cost: '$118' },
        { month: 'Sep', value: 95, cost: '$125' },
        { month: 'Oct', value: 102, cost: '$132' },
        { month: 'Nov', value: 110, cost: '$138' },
        { month: 'Dec', value: 115, cost: '$145' }
    ]);

    const [metrics, setMetrics] = useState({
        netProfit: 145,
        totalLeads: 12528,
        conversionRate: 4.1
    });

    // Year and Currency selection state
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedCurrency, setSelectedCurrency] = useState('$');

    // Available years and currencies
    const years = ['2022', '2023', '2024', '2025'];
    const currencies = [
        { symbol: '$', name: 'USD (Dollar)' },
        { symbol: '€', name: 'EUR (Euro)' },
        { symbol: '₹', name: 'INR (Rupee)' },
        { symbol: '£', name: 'GBP (Pound)' },
        { symbol: '¥', name: 'JPY (Yen)' }
    ];

    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [startMonth, setStartMonth] = useState('Jan');
    const [endMonth, setEndMonth] = useState('Dec');

    // Filter data based on selected month range
    const getFilteredData = () => {
        const startIndex = allMonths.indexOf(startMonth);
        const endIndex = allMonths.indexOf(endMonth);

        if (startIndex > endIndex) return barData; // Fallback if selection is invalid

        return barData.filter(item => {
            const itemIndex = allMonths.indexOf(item.month);
            return itemIndex >= startIndex && itemIndex <= endIndex;
        });
    };

    const filteredData = getFilteredData();

    // Calculate cost difference
    const getCostDifference = () => {
        if (filteredData.length < 2) return null;

        const firstValue = parseInt(filteredData[0].cost.replace(/[^0-9]/g, ''));
        const lastValue = parseInt(filteredData[filteredData.length - 1].cost.replace(/[^0-9]/g, ''));
        const diff = lastValue - firstValue;
        const percentage = ((diff / firstValue) * 100).toFixed(1);

        return { diff, percentage, isIncrease: diff > 0 };
    };

    const costDiff = getCostDifference();
    // Real-time data simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setBarData(prev => prev.map(item => ({
                ...item,
                value: Math.max(30, Math.min(120, item.value + (Math.random() * 2 - 0.5)))
            })));

            setMetrics(prev => ({
                netProfit: Math.max(50, Math.min(180, prev.netProfit + (Math.random() * 1.5 - 0.3))),
                totalLeads: prev.totalLeads + Math.floor(Math.random() * 10),
                conversionRate: Math.max(2, Math.min(8, prev.conversionRate + (Math.random() - 0.4) * 0.1))
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Animated Icon Components - Minimal & Technical
    const RoasIcon = () => (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="url(#roasGrad)" opacity="0.1" />
            <defs>
                <linearGradient id="roasGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
            </defs>
            {/* Trend arrow */}
            <path d="M10 28L16 18L22 22L30 12" stroke="url(#roasGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25 12H30V17" stroke="url(#roasGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Animated dot */}
            <circle cx="30" cy="12" r="2" fill="#8b5cf6" className="animate-pulse" />
        </svg>
    );

    const CplIcon = () => (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="url(#cplGrad)" opacity="0.1" />
            <defs>
                <linearGradient id="cplGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
            </defs>
            {/* Down arrow with base */}
            <path d="M20 10V26M20 26L14 20M20 26L14 20M20 26L26 20" stroke="url(#cplGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="30" x2="28" y2="30" stroke="url(#cplGrad)" strokeWidth="2" strokeLinecap="round" />
            {/* Small pulsing indicators */}
            <circle cx="20" cy="26" r="1.5" fill="#14b8a6" className="animate-ping" />
        </svg>
    );

    const GrowthIcon = () => (
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="url(#growthGrad)" opacity="0.1" />
            <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
            </defs>
            {/* Stacked bars for growth */}
            <rect x="10" y="24" width="6" height="10" rx="1" fill="url(#growthGrad)" opacity="0.6" />
            <rect x="17" y="18" width="6" height="16" rx="1" fill="url(#growthGrad)" opacity="0.8" />
            <rect x="24" y="12" width="6" height="22" rx="1" fill="url(#growthGrad)" className="animate-pulse" />
            {/* Sparkle effect */}
            <path d="M32 10V14M30 12H34" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
        </svg>
    );

    const heroStats = [
        { range: '3.8x – 6.2x', label: 'ROAS across paid campaigns', icon: <RoasIcon /> },
        { range: 'Up to 42%', label: 'CPL Reduction using AI targeting', icon: <CplIcon /> },
        { range: '2x – 5x', label: 'Business Growth within 90–180 days', icon: <GrowthIcon /> }
    ];

    const detailedStats = [
        { number: 5000, suffix: '+', label: 'Clients Served' },
        { number: 95, suffix: '%+', label: 'Happy Clients' },
        { number: 98, suffix: '%', label: 'Project Success Ratio' },
        { number: 1100, suffix: '+', label: 'SEO Projects Delivered' },
        { number: 571, suffix: '+', label: 'Websites Developed' },
        { number: 11, suffix: '+', label: 'Mobile Applications (Android & iOS)' },
        { number: 1557, suffix: '+', label: 'Google & Meta Ad Campaigns Managed' },
        { number: 750, suffix: '+', label: 'Social Media Campaigns (SMO)' },
        { number: 151, suffix: '+', label: 'LLM & AI Growth Implementations' }
    ];

    return (
        <section ref={sectionRef} className="relative py-12 md:py-16 bg-gray-950 overflow-hidden">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-rotate-slow {
                    animation: rotate 20s linear infinite;
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }

                .animate-pulse-glow {
                    animation: pulse-glow 3s ease-in-out infinite;
                }

                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
                
                @keyframes scroll-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }

                .animate-scroll-reverse {
                    animation: scroll-reverse 40s linear infinite;
                }

                @keyframes scroll-vertical {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }

                .animate-vertical-scroll {
                    animation: scroll-vertical 40s linear infinite;
                }
                
                @keyframes marquee-stats {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .animate-marquee-stats {
                    animation: marquee-stats 30s linear infinite;
                }
                
                .animate-marquee-stats:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-12 left-[10%] w-16 h-16 md:w-20 md:h-20 border-2 border-blue-500/20 rounded-lg animate-float animate-rotate-slow"></div>
                <div className="absolute bottom-32 right-[15%] w-16 h-16 border-2 border-purple-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 right-[10%] w-14 h-14 md:w-16 md:h-16 border-2 border-pink-500/20 rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Main Heading */}
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2">
                        <span className="text-white">Real Numbers.</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Real Growth.</span>
                    </h2>
                    <div className="flex justify-center gap-2 mt-2">

                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-150"></div>
                    </div>


                </div>

                {/* Two Column Layout: Text/Stats (Left) + Graphs (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-10 mb-6 items-start">
                    {/* Left: Text Content & Stats (3 columns) */}
                    <div className="lg:col-span-3 space-y-3">
                        {heroStats.map((stat, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-3 transition-all duration-300"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                                        {stat.range}
                                    </div>
                                    <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}

                        {/* Tagline below stats */}
                        <div className="mt-8 pt-6 border-t border-gray-700/50">
                            <p className="text-lg md:text-xl text-gray-300 font-light">
                                Because when <span className="font-bold text-white">AI meets strategy</span>  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">results follow.</span>
                            </p>
                        </div>

                        {/* Vertical Stats Slider to fill vacant space */}
                        <div className="mt-16 h-[300px] overflow-hidden relative rounded-xl bg-gray-900/20 border border-gray-800/50 backdrop-blur-sm">
                            {/* Gradient Masks */}
                            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-gray-950/80 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-950/80 to-transparent z-10 pointer-events-none"></div>

                            {/* Vertical Scrolling Container */}
                            <div className="animate-vertical-scroll hover:animation-play-state-paused">
                                {[...detailedStats, ...detailedStats].map((stat, index) => (
                                    <div
                                        key={`vt-${index}`}
                                        className="p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="text-2xl md:text-3xl font-black text-white mb-1 flex items-baseline gap-1">
                                                {stat.number.toLocaleString()}<span className="text-blue-400 text-lg font-bold">{stat.suffix}</span>
                                            </div>
                                            <p className="text-gray-400 font-medium uppercase tracking-wider text-xs">{stat.label}</p>
                                        </div>
                                        <div className="h-8 w-1 bg-gray-800 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Graph (4 columns) */}
                    <div className="lg:col-span-4">
                        {/* Graph Card */}
                        <div className="relative overflow-hidden rounded-xl p-4 backdrop-blur-xl border border-blue-500/30 bg-gradient-to-br from-gray-900/90 to-gray-800/90">
                            <div className="bg-gray-800 px-3 py-1.5 -mx-4 -mt-4 mb-3 border-b border-gray-700">
                                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Overview</h4>
                            </div>

                            <h3 className="text-base font-bold text-white mb-1">Net Profit Growth</h3>
                            <p className="text-xs text-gray-400 mb-3">Monthly Revenue vs. Net Profit</p>

                            {/* Live Metrics */}
                            <div className="grid grid-cols-3 gap-2 mb-3 p-2.5 bg-gray-900/50 rounded-lg border border-gray-700/50">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-0.5">Net Profit</p>
                                    <p className="text-base font-bold text-cyan-400">${Math.round(metrics.netProfit)}k</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-0.5">Total Leads</p>
                                    <p className="text-base font-bold text-purple-400">{metrics.totalLeads.toLocaleString()}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-0.5">Conv. Rate</p>
                                    <p className="text-base font-bold text-green-400">{metrics.conversionRate.toFixed(1)}%</p>
                                </div>
                            </div>


                            {/* Fresh X and Y Graph */}
                            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 h-[340px] w-full">
                                {/* Month Range, Year and Currency Selection */}
                                <div className="flex flex-wrap justify-end gap-2 mb-4">
                                    {/* Start Month Selector */}
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-gray-500">From:</span>
                                        <select
                                            value={startMonth}
                                            onChange={(e) => setStartMonth(e.target.value)}
                                            className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1.5 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500"
                                        >
                                            {allMonths.map(month => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* End Month Selector */}
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-gray-500">To:</span>
                                        <select
                                            value={endMonth}
                                            onChange={(e) => setEndMonth(e.target.value)}
                                            className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1.5 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500"
                                        >
                                            {allMonths.map(month => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Cost Difference Indicator */}
                                    {costDiff && (
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${costDiff.isIncrease
                                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                                            }`}>
                                            <span className="text-xs font-bold">
                                                {costDiff.isIncrease ? '+' : ''}{costDiff.percentage}%
                                            </span>
                                            <span className="text-[10px] opacity-80">
                                                ({selectedCurrency}{Math.abs(costDiff.diff)})
                                            </span>
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div className="w-px h-6 bg-gray-700 mx-1"></div>

                                    {/* Year Selector */}
                                    {/* Year Selector */}
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="bg-gray-700/50 text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>

                                    {/* Currency Selector */}
                                    <select
                                        value={selectedCurrency}
                                        onChange={(e) => setSelectedCurrency(e.target.value)}
                                        className="bg-gray-700/50 text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500"
                                    >
                                        {currencies.map(curr => (
                                            <option key={curr.symbol} value={curr.symbol}>{curr.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-start gap-3">
                                    {/* Y-axis with currency name */}
                                    <div className="flex items-center gap-1">
                                        {/* Currency name - rotated */}
                                        <div className="-rotate-90 text-[10px] text-cyan-400 font-medium whitespace-nowrap">
                                            {currencies.find(c => c.symbol === selectedCurrency)?.name.split(' ')[0] || 'Dollar'}
                                        </div>

                                        {/* Y-axis values */}
                                        <div className="flex flex-col justify-between h-52 text-[10px] text-gray-400">
                                            <span>{selectedCurrency}150</span>
                                            <span>{selectedCurrency}120</span>
                                            <span>{selectedCurrency}90</span>
                                            <span>{selectedCurrency}60</span>
                                            <span>{selectedCurrency}30</span>
                                            <span>{selectedCurrency}0</span>
                                        </div>
                                    </div>

                                    {/* Graph Area */}
                                    <div className="flex-1">
                                        {/* Grid and axes */}
                                        <div className="relative h-52 border-l-2 border-b-2 border-cyan-500/50">
                                            {/* Gridlines */}
                                            <div className="absolute inset-0">
                                                {[0, 25, 50, 75, 100].map((line) => (
                                                    <div
                                                        key={line}
                                                        className="absolute w-full border-t border-gray-700/20"
                                                        style={{ bottom: `${line}%` }}
                                                    />
                                                ))}
                                            </div>

                                            {/* Dynamic Line Chart - plots based on filteredData values */}
                                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                {/* Line connecting all data points */}
                                                <polyline
                                                    fill="none"
                                                    stroke="#06b6d4"
                                                    strokeWidth="0.5"
                                                    points={filteredData.map((item, index) => {
                                                        const x = ((index + 0.5) / filteredData.length) * 100;
                                                        // Scale Y: 0 = bottom (100), 150 = top (0)
                                                        // Extract number from cost string like "$25"
                                                        const costValue = parseInt(item.cost.replace(/[^0-9]/g, ''));
                                                        const y = 100 - ((costValue / 150) * 100);
                                                        return `${x},${y}`;
                                                    }).join(' ')}
                                                />
                                            </svg>

                                            {/* Data Points */}
                                            {filteredData.map((item, index) => {
                                                const left = ((index + 0.5) / filteredData.length) * 100;
                                                // Scale bottom: 0 = 0%, 150 = 100%
                                                const costValue = parseInt(item.cost.replace(/[^0-9]/g, ''));
                                                const bottom = (costValue / 150) * 100;
                                                return (
                                                    <div
                                                        key={index}
                                                        className="absolute w-3 h-3 bg-cyan-400 rounded-full border-2 border-white shadow-lg shadow-cyan-500/50 transform -translate-x-1/2 translate-y-1/2 cursor-pointer hover:scale-150 transition-transform group"
                                                        style={{ left: `${left}%`, bottom: `${bottom}%` }}
                                                    >
                                                        {/* Tooltip */}
                                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 px-2 py-1 rounded text-xs text-white whitespace-nowrap z-10">
                                                            {item.cost}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* X-axis */}
                                        <div className="flex justify-between mt-4 text-xs text-gray-400 uppercase">
                                            {filteredData.map((item, index) => (
                                                <span key={index} className="flex-1 text-center">{item.month}</span>
                                            ))}
                                        </div>

                                        {/* Year label */}
                                        <div className="text-center mt-2 text-[10px] text-cyan-400 font-medium uppercase">
                                            YEAR {selectedYear}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center justify-center gap-6 mt-3 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded"></div>
                                    <span className="text-gray-400">Net Profit</span>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-700">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Cost Per Click (CPC)</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Transactions</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={scrollerRef} className="mt-24 relative overflow-hidden">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Our Growth in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Numbers</span>
                        </h3>
                        <p className="text-gray-400 text-lg">Watch our achievements continuously scroll</p>
                    </div>

                    <div className="relative w-full">
                        {/* Gradient Masks */}
                        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"></div>

                        <div className="flex overflow-hidden">
                            <div ref={cardsRef} className="flex gap-6 px-6 animate-marquee-stats">
                                {/* Original set */}
                                {detailedStats.map((stat, index) => (
                                    <div
                                        key={`original-${index}`}
                                        className="flex-shrink-0 w-[240px] p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm"
                                    >
                                        <div className="text-center relative z-10">
                                            <div className="mb-4 flex items-center justify-center gap-3">
                                                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-blue-400"></div>
                                            </div>

                                            <div className="text-4xl font-extrabold text-white mb-2 flex justify-center items-baseline">
                                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                                                    {stat.number.toLocaleString()}
                                                </span>
                                                <span className="text-blue-500 text-xl font-bold ml-1">{stat.suffix}</span>
                                            </div>

                                            <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {/* Duplicate set for seamless loop */}
                                {detailedStats.map((stat, index) => (
                                    <div
                                        key={`duplicate-${index}`}
                                        className="flex-shrink-0 w-[240px] p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm"
                                    >
                                        <div className="text-center relative z-10">
                                            <div className="mb-4 flex items-center justify-center gap-3">
                                                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-blue-400"></div>
                                            </div>

                                            <div className="text-4xl font-extrabold text-white mb-2 flex justify-center items-baseline">
                                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                                                    {stat.number.toLocaleString()}
                                                </span>
                                                <span className="text-blue-500 text-xl font-bold ml-1">{stat.suffix}</span>
                                            </div>

                                            <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default StatsSection;

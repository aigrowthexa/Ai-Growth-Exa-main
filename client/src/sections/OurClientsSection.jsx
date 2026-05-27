import React from 'react';

const imagesGlob = import.meta.glob('../assets/images/clients/*.{png,svg,webp,jpeg,jpg}', { eager: true, as: 'url' });
const clientImages = Object.values(imagesGlob);

const ClientLogo = ({ src }) => (
    <div className="mx-2 md:mx-3 w-[150px] md:w-[200px] flex items-center justify-center transition-transform duration-300 ease-out transform-gpu hover:scale-110 group">
        <div className="relative w-full h-[100px] md:h-[120px] p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 hover:border-blue-400 flex items-center justify-center">
            <img
                src={src}
                alt="Client Logo"
                loading="lazy"
                className="max-h-full max-w-full w-auto h-auto object-contain filter grayscale-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
        </div>
    </div>
);

const MarqueeRow = ({ items, direction = 'left', speed = 40 }) => {
    return (
        <div className="relative flex overflow-hidden py-3 md:py-4 group">
            <div
                className={`flex items-center ${direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
                style={{ animationDuration: `${speed}s` }}
            >
                {items.map((src, index) => (
                    <ClientLogo key={`original-${index}`} src={src} />
                ))}
            </div>
            <div
                className={`flex items-center absolute inset-y-0 left-full ${direction === 'right' ? 'animate-marquee2-reverse' : 'animate-marquee2'} group-hover:[animation-play-state:paused]`}
                style={{ animationDuration: `${speed}s` }}
            >
                {items.map((src, index) => (
                    <ClientLogo key={`duplicate-${index}`} src={src} />
                ))}
            </div>
        </div>
    );
};

const OurClientsSection = ({ hideHeader = false }) => {
    const rowItems = [...clientImages, ...clientImages];

    return (
        <section className="relative -mt-4 md:-mt-6 bg-gray-950 overflow-hidden flex flex-col items-center pt-4 pb-8 md:pt-6 md:pb-10 min-h-[420px] md:min-h-[460px]">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes marquee2 {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(0%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes marquee2-reverse {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                    will-change: transform;
                }
                .animate-marquee2 {
                    animation: marquee2 linear infinite;
                    will-change: transform;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse linear infinite;
                    will-change: transform;
                }
                .animate-marquee2-reverse {
                    animation: marquee2-reverse linear infinite;
                    will-change: transform;
                }
            `}</style>

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-blue-600 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-10 right-[20%] w-80 h-80 bg-purple-600 rounded-full blur-[128px]"></div>
            </div>

            {/* Header Section */}
            {!hideHeader && (
                <div className="text-center mb-4 md:mb-5 relative z-20 px-4">
                    <h2 className="text-5xl md:text-7xl font-light text-white mb-3 md:mb-4 tracking-wide">
                        Our <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">Clients</span>
                    </h2>
                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full mb-4 md:mb-5 opacity-60"></div>
                    <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
                        Trusted by innovative companies and organizations across various industries.
                    </p>
                </div>
            )}

            {/* Logo Marquee */}
            <div className="relative w-full overflow-hidden space-y-5 md:space-y-6 pb-4 md:pb-6">
                {/* Horizontal Fade Masks */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"></div>

                {clientImages.length > 0 ? (
                    <>
                        <MarqueeRow items={rowItems} direction="left" speed={80} />
                        <MarqueeRow items={rowItems} direction="right" speed={90} />
                    </>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        <p>No client images found in src/assets/images</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OurClientsSection;

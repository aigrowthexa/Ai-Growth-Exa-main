import React, { Suspense, lazy } from 'react';
import HeroSection from '../sections/HeroSection';
import BrandStorySection from '../sections/BrandStorySection';

import BoldStatementSection from '../sections/BoldStatementSection';
import GrowthPlanSection from '../sections/GrowthPlanSection';
import PrimaryCtaSection from '../sections/PrimaryCtaSection';
import OurFeaturesSection from '../sections/OurFeaturesSection';
import BannerSection from '../sections/BannerSection';
import WhatWeHelpWithSection from '../sections/WhatWeHelpWithSection';
import OurClientsSection from '../sections/OurClientsSection';
import WhyAiGrowthExaSection from '../sections/WhyAiGrowthExaSection';
import StatsSection from '../sections/StatsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import AboutHeroSection from '../sections/AboutHeroSection';
import FaqSection from '../sections/FaqSection';
import FinalCtaSection from '../sections/FinalCtaSection';

const Home = () => {
    return (
        <>
            <HeroSection />
            <BrandStorySection />
            <BoldStatementSection />
            <GrowthPlanSection />
            <PrimaryCtaSection />
            <OurFeaturesSection />
            <BannerSection />
            <WhatWeHelpWithSection />
            <OurClientsSection />
            <WhyAiGrowthExaSection />
            <StatsSection />
            <TestimonialsSection />
            <div id="about-section">
                <AboutHeroSection />
            </div>
            <FaqSection />
            <FinalCtaSection />
        </>
    );
};

export default Home;

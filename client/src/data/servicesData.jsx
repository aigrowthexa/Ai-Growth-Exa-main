import React from 'react';
import {
    AutoAwesome as AutoAwesomeIcon,
    TrendingUp as TrendingUpIcon,
    Search as SearchIcon,
    Podcasts as PodcastsIcon,
    Store as StoreIcon,
    Bolt as BoltIcon,
    Brush as BrushIcon,
    Web as WebIcon,
    Create as CreateIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Mail as MailIcon,
    ShoppingBag as ShoppingBagIcon,
    WhatsApp as WhatsAppIcon,
    GroupWork as GroupWorkIcon,
    Smartphone as SmartphoneIcon,
    Flag as FlagIcon,
    Speed as SpeedIcon,
    BrandingWatermark as BrandingWatermarkIcon,
} from '@mui/icons-material';

export const slugifyServiceTitle = (title) =>
    title
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[()]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const serviceImages = [
    { id: 1, title: 'AI Marketing Solutions', label: 'LLM Growth', url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80' },
    { id: 2, title: 'Performance Marketing', label: 'Paid Ads & ROI', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80' },
    { id: 3, title: 'SEO & Growth Strategy', label: 'Organic Traffic', url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&q=80' },
    { id: 4, title: 'Podcast Marketing', label: 'Audio Authority', url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80' },
    { id: 5, title: 'GMB & Local SEO', label: 'Local Growth', url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&q=80' },
    { id: 6, title: 'Funnel & Automation', label: 'Convert at Scale', url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80' },
    { id: 7, title: 'Branding & Creative', label: 'Visual Identity', url: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80' },
    { id: 8, title: 'Web & App Development', label: 'Digital Presence', url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80' },
    { id: 9, title: 'Content Creation', label: 'Words that Convert', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80' },
    { id: 10, title: 'Sales-Aligned Marketing', label: 'Revenue Systems', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80' },
    { id: 11, title: 'Social Media Marketing', label: 'Community Growth', url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80' },
    { id: 12, title: 'Email Marketing', label: 'Inbox Revenue', url: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&q=80' },
    { id: 13, title: 'E-commerce Marketing', label: 'Online Store Growth', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80' },
    { id: 14, title: 'WhatsApp Marketing', label: 'Direct Messaging', url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200&q=80' },
    { id: 15, title: 'Brand Collaborations', label: 'Strategic Partnerships', url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80' },
    { id: 16, title: 'Influencer Marketing', label: 'Trust & Reach', url: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&q=80' },
    { id: 17, title: 'App Marketing', label: 'Installs & Retention', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80' },
    { id: 18, title: 'Go-To-Market Strategy', label: 'Launch Planning', url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80' },
    { id: 19, title: 'Site Optimization', label: 'Speed & Conversions', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80' },
    { id: 20, title: 'Product Branding', label: 'Market Positioning', url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80' },
];

const servicePalettes = [
    { primary: '#667eea', secondary: '#c4b5fd', accent: '#ede9fe' },
    { primary: '#2563eb', secondary: '#7dd3fc', accent: '#dbeafe' },
    { primary: '#16a34a', secondary: '#86efac', accent: '#dcfce7' },
    { primary: '#db2777', secondary: '#f9a8d4', accent: '#fce7f3' },
    { primary: '#ea580c', secondary: '#fdba74', accent: '#ffedd5' },
    { primary: '#7c3aed', secondary: '#c4b5fd', accent: '#f3e8ff' },
    { primary: '#8b5cf6', secondary: '#d8b4fe', accent: '#f5f3ff' },
    { primary: '#4f46e5', secondary: '#93c5fd', accent: '#e0e7ff' },
    { primary: '#0891b2', secondary: '#67e8f9', accent: '#cffafe' },
    { primary: '#0f766e', secondary: '#5eead4', accent: '#ccfbf1' },
    { primary: '#e11d48', secondary: '#fda4af', accent: '#ffe4e6' },
    { primary: '#1d4ed8', secondary: '#93c5fd', accent: '#dbeafe' },
    { primary: '#f43f5e', secondary: '#fda4af', accent: '#fff1f2' },
    { primary: '#059669', secondary: '#6ee7b7', accent: '#d1fae5' },
    { primary: '#d97706', secondary: '#fcd34d', accent: '#fef3c7' },
    { primary: '#dc2626', secondary: '#fca5a5', accent: '#fee2e2' },
    { primary: '#0ea5e9', secondary: '#7dd3fc', accent: '#e0f2fe' },
    { primary: '#be185d', secondary: '#f9a8d4', accent: '#fdf2f8' },
    { primary: '#7c2d12', secondary: '#fdba74', accent: '#ffedd5' },
    { primary: '#7c3aed', secondary: '#c4b5fd', accent: '#f3e8ff' },
];

const baseServices = [
    { id: 1, title: 'AI Marketing Solutions (LLM Growth)', icon: <AutoAwesomeIcon />, tagline: 'Smart Growth Starts With Intelligent AI Systems', category: 'AI-POWERED MARKETING', shortDesc: 'AI & LLM-powered marketing frameworks that analyze behavior, automate decisions, and maximize conversions.', features: ['Predict customer behavior with AI analytics', 'Intelligent targeting & messaging', 'Marketing automation that thinks', 'Funnel optimization with AI'], benefits: ['Data-driven decisions - no assumptions', 'Higher conversion rates', 'Cost efficiency with predictive targeting', 'Scalable growth systems'], faqs: [{ q: 'What are AI marketing solutions?', a: 'AI marketing uses ML to analyze data, predict behavior, automate campaigns, and improve performance.' }, { q: 'How do LLMs improve marketing?', a: 'LLMs enhance personalization, automate content, and optimize communication across channels.' }, { q: 'Is AI marketing suitable for small businesses?', a: 'Yes, it helps small businesses reduce costs and automate workflows efficiently.' }] },
    { id: 2, title: 'Performance Marketing Services', icon: <TrendingUpIcon />, tagline: 'AI-Powered Advertising That Delivers Real ROI', category: 'PAID ADVERTISING', shortDesc: 'Measurable growth campaigns across Google, Meta, LinkedIn, and YouTube with AI optimization.', features: ['Precision AI-powered targeting', 'Data-driven campaign optimization', 'AI-assisted decision making', 'Full-funnel performance strategy', 'Real-time performance tracking', 'Multi-platform campaign management'], benefits: ['Higher ROI on ad spend', 'Lower cost per lead & acquisition', 'AI-optimized campaign performance', 'Clear reporting & transparency', 'Scalable paid growth systems'], platforms: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'YouTube Ads', 'TikTok Ads'] },
    { id: 3, title: 'SEO & Growth Strategy', icon: <SearchIcon />, tagline: 'AI-Driven SEO That Fuels Long-Term Growth', category: 'SEO & GROWTH', shortDesc: 'Build search ecosystems that align visibility with business goals for sustainable traffic and revenue.', features: ['AI-powered keyword & intent research', 'Technical SEO optimization', 'Content & topical authority strategy', 'Growth-focused SEO execution'], benefits: ['Higher search engine rankings', 'Sustainable organic traffic growth', 'Improved website authority & trust', 'Better conversion rates from SEO'], platforms: ['Google Search', 'Bing', 'Local SEO', 'E-commerce SEO'] },
    { id: 4, title: 'Podcast & Social Media Marketing', icon: <PodcastsIcon />, tagline: 'Build Authority. Earn Attention. Create Trust at Scale.', category: 'CONTENT MARKETING', shortDesc: 'Authority-building audio and social content for deep audience connection.', features: ['Podcast strategy & positioning', 'Authority-building content planning', 'Niche audience targeting', 'Social media community building'], benefits: ['Stronger brand authority & trust', 'Loyal, high-intent audience', 'Long-form trust building', 'Position as industry expert'], platforms: ['Spotify', 'Apple Podcasts', 'LinkedIn', 'Instagram', 'YouTube'] },
    { id: 5, title: 'GMB with AI Model (Local Growth)', icon: <StoreIcon />, tagline: 'Dominate Local Search with AI-Powered Visibility', category: 'LOCAL SEO', shortDesc: 'AI-powered Google Business Profile optimization for local rankings, calls, and visits.', features: ['Complete GMB optimization', 'AI-driven local keyword strategy', 'Automated reviews & engagement', 'Local ranking improvement'], benefits: ['Higher Google Maps rankings', 'More phone calls & walk-in customers', 'Automated review management', 'Hands-free local growth system'], platforms: ['Google Business Profile', 'Google Maps', 'Local Directories'] },
    { id: 6, title: 'Funnel & Automation Systems', icon: <BoltIcon />, tagline: 'Turn Traffic Into Revenue Automatically', category: 'AUTOMATION', shortDesc: 'Capture leads, nurture prospects, and convert customers without manual effort.', features: ['High-converting lead funnels', 'Sales automation workflows', 'CRM integrations & data syncing', 'AI-assisted funnel optimization'], benefits: ['Higher conversion rates', 'Reduced manual work & errors', 'Faster lead response times', 'Scalable automation systems'], platforms: ['CRM Systems', 'Email Marketing', 'WhatsApp', 'SMS'] },
    { id: 7, title: 'Branding, Creative & Design', icon: <BrushIcon />, tagline: 'Design That Builds Recall. Creativity That Drives Growth.', category: 'BRANDING', shortDesc: 'Cohesive brand systems that stand out, stay memorable, and convert consistently.', features: ['Brand positioning & messaging', 'Visual identity systems', 'Logo design & brand guidelines', 'Performance-optimized assets'], benefits: ['Stronger brand recognition & recall', 'Higher engagement & conversion rates', 'Professional, scalable brand identity', 'Consistent brand experience'], platforms: ['Adobe Creative Suite', 'Figma', 'Canva', 'Brand Guidelines'] },
    { id: 8, title: 'Web, App & UX/UI Development', icon: <WebIcon />, tagline: 'Your Digital Salesperson Built to Convert', category: 'DEVELOPMENT', shortDesc: 'High-performance websites, mobile apps, and UX/UI systems that guide users and drive conversions.', features: ['High-conversion website development', 'Mobile app design & development', 'User behavior-driven UX/UI', 'Speed & performance optimization'], benefits: ['Higher conversion rates', 'Improved user experience & retention', 'Faster load times & performance', 'Mobile-first responsive design'], platforms: ['React', 'Next.js', 'React Native', 'Figma', 'Webflow'] },
    { id: 9, title: 'Content Creation & Writing', icon: <CreateIcon />, tagline: 'Words Sell. Stories Convert. Strategy Scales.', category: 'CONTENT', shortDesc: 'Human-written, emotion-driven content that builds trust, ranks, and converts.', features: ['Website copy & messaging', 'SEO blogs & articles', 'Brand storytelling', 'Sales-driven content'], benefits: ['Clear, persuasive brand messaging', 'Higher engagement & conversion rates', 'SEO-optimized, rank-ready content', 'Emotionally resonant storytelling'], platforms: ['WordPress', 'Medium', 'SEO Tools', 'Content Management'] },
    { id: 10, title: 'Sales-Aligned Marketing Systems', icon: <DashboardIcon />, tagline: 'Where Marketing Meets Sales and Revenue Follows', category: 'MARKETING SYSTEMS', shortDesc: 'Connect marketing, sales, and revenue into one seamless growth engine.', features: ['Email marketing systems', 'WhatsApp bulk messaging', 'CRM workflows & automation', 'Lead qualification systems'], benefits: ['Higher lead-to-sale conversion rates', 'Better marketing ROI', 'Faster sales response times', 'Automated follow-ups & workflows'], platforms: ['CRM Systems', 'Email Platforms', 'WhatsApp Business API', 'Automation Tools'] },
    { id: 11, title: 'Social Media Marketing', icon: <PeopleIcon />, tagline: 'Community-Led. Conversion-Focused. Trust-Driven.', category: 'SOCIAL MEDIA', shortDesc: 'Build real communities and meaningful engagement that turn into conversions.', features: ['Social media strategy & planning', 'Community-focused content creation', 'Platform-specific content execution', 'Engagement & comment management'], benefits: ['Stronger brand voice & identity', 'Engaged, loyal online communities', 'Consistent, high-quality content', 'Conversion-supportive social presence'], platforms: ['LinkedIn', 'Instagram', 'Facebook', 'X/Twitter', 'TikTok'] },
    { id: 12, title: 'Email Marketing', icon: <MailIcon />, tagline: 'Turn Inboxes Into Conversations and Conversations Into Revenue', category: 'EMAIL MARKETING', shortDesc: 'Nurture leads, activate customers, and drive repeat revenue automatically.', features: ['Email strategy & planning', 'Email automation & workflows', 'Sales & conversion email copy', 'Analytics, testing & optimization'], benefits: ['Higher open & click-through rates', 'Better lead nurturing & conversions', 'Automated, consistent communication', 'Stronger customer relationships'], platforms: ['Mailchimp', 'Klaviyo', 'SendGrid', 'ActiveCampaign', 'HubSpot'] },
    { id: 13, title: 'E-commerce Marketing', icon: <ShoppingBagIcon />, tagline: 'Turn Browsers Into Buyers and Buyers Into Repeat Customers', category: 'E-COMMERCE', shortDesc: 'Scale online stores with performance marketing, CRO, automation, and retention strategies.', features: ['Performance-driven e-commerce campaigns', 'Conversion rate optimization (CRO)', 'Retention & repeat purchase systems', 'Data, tracking & optimization'], benefits: ['Higher conversion rates', 'Lower cost per purchase', 'Increased average order value', 'Better customer retention'], platforms: ['Shopify', 'WooCommerce', 'BigCommerce', 'Amazon', 'Google Shopping'] },
    { id: 14, title: 'Bulk WhatsApp Marketing', icon: <WhatsAppIcon />, tagline: 'Direct. Personal. High-Conversion Messaging at Scale.', category: 'WHATSAPP MARKETING', shortDesc: 'Reach customers instantly, personally, and at scale with permission-based WhatsApp systems.', features: ['Bulk WhatsApp campaigns', 'WhatsApp automation & flows', 'CRM & funnel integration', 'Performance tracking & optimization'], benefits: ['90%+ message open rates', 'Faster lead response & conversions', 'Automated, scalable communication', 'Higher engagement than email or SMS'], platforms: ['WhatsApp Business API', 'CRM Integration', 'Automation Tools'] },
    { id: 15, title: 'Brand Collaboration', icon: <GroupWorkIcon />, tagline: 'Grow Faster by Growing Together', category: 'COLLABORATIONS', shortDesc: 'Expand reach, credibility, and revenue through strategic partnerships with aligned brands.', features: ['Strategic brand partnerships', 'Campaign & co-marketing execution', 'Creator & influencer collaborations', 'Performance tracking & reporting'], benefits: ['Access to new, relevant audiences', 'Higher trust & brand credibility', 'Shared marketing effort & cost efficiency', 'Stronger brand positioning'], platforms: ['Cross-Platform Promotion', 'Co-Branded Campaigns', 'Influencer Networks'] },
    { id: 16, title: 'Influencer Marketing', icon: <PeopleIcon />, tagline: 'Leverage Trust. Amplify Reach. Drive Real Conversions.', category: 'INFLUENCER MARKETING', shortDesc: 'Partner with authentic creators who have the trust of your ideal audience.', features: ['Influencer discovery & vetting', 'Campaign strategy & execution', 'Content & UGC creation', 'Tracking, analytics & optimization'], benefits: ['Access to trust-built audiences', 'Higher engagement than traditional ads', 'Authentic brand storytelling', 'Reusable influencer content (UGC)'], platforms: ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitch'] },
    { id: 17, title: 'App Marketing', icon: <SmartphoneIcon />, tagline: 'Drive Installs. Activate Users. Scale Retention.', category: 'APP MARKETING', shortDesc: 'Get apps discovered, downloaded, and actively used with sustainable growth systems.', features: ['App user acquisition', 'App store optimization (ASO)', 'Activation & onboarding optimization', 'Retention & re-engagement systems'], benefits: ['More quality app installs', 'Lower cost per install (CPI)', 'Higher activation & retention rates', 'Improved app store visibility'], platforms: ['Google Play', 'App Store', 'App Campaigns', 'ASO Tools'] },
    { id: 18, title: 'Go-To-Market (GTM) Strategies', icon: <FlagIcon />, tagline: 'Launch Smarter. Enter Faster. Scale Confidently.', category: 'STRATEGY', shortDesc: 'Align product, audience, pricing, channels, and messaging into one executable growth plan.', features: ['Market & customer research', 'Product positioning & messaging', 'Pricing & offer strategy', 'Channel & launch strategy'], benefits: ['Faster market entry & adoption', 'Clear product positioning', 'Lower customer acquisition risk', 'Aligned marketing & sales execution'], platforms: ['Market Research', 'Positioning Frameworks', 'Launch Planning'] },
    { id: 19, title: 'Site Optimization', icon: <SpeedIcon />, tagline: 'Turn Your Website Into a High-Performance Growth Engine', category: 'OPTIMIZATION', shortDesc: 'Improve speed, usability, SEO health, and conversion flow for better results.', features: ['Website speed & performance optimization', 'Technical SEO optimization', 'Conversion rate optimization (CRO)', 'UX/UI optimization'], benefits: ['Faster website load times', 'Higher conversion rates', 'Improved SEO rankings', 'Better user experience'], platforms: ['Core Web Vitals', 'SEO Tools', 'CRO Tools', 'Analytics'] },
    { id: 20, title: 'Product Branding', icon: <BrandingWatermarkIcon />, tagline: 'Turn Your Product Into a Recognizable, Trust-Built Brand', category: 'PRODUCT BRANDING', shortDesc: 'Position products clearly, differentiate in the market, and build emotional connection.', features: ['Product positioning & strategy', 'Visual identity for products', 'Product messaging & storytelling', 'Brand guidelines & consistency'], benefits: ['Clear product positioning', 'Stronger brand recall & recognition', 'Higher customer trust & adoption', 'Consistent product experience'], platforms: ['Brand Identity', 'Packaging Design', 'Visual Systems', 'Brand Guidelines'] },
];

export const servicesData = baseServices.map((service, index) => {
    const image = serviceImages.find((item) => item.id === service.id);
    const palette = servicePalettes[index];

    return {
        ...service,
        slug: slugifyServiceTitle(service.title),
        image,
        palette,
    };
});

export const getServiceBySlug = (slug) =>
    servicesData.find((service) => service.slug === slug);

export const getServiceByTitle = (title) =>
    servicesData.find((service) => service.title === title);

export const getServicePath = (serviceOrTitle) => {
    const service = typeof serviceOrTitle === 'string'
        ? getServiceByTitle(serviceOrTitle)
        : serviceOrTitle;

    return service ? '/services' : '/services';
};

import React, { useState, useEffect, useMemo, memo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import api from "../api/api";
import {
    Box, Container, Typography, Grid, Card, CardContent, CardActions,
    Button, Chip, Accordion, AccordionSummary, AccordionDetails,
    List, ListItem, ListItemIcon, ListItemText, Stack,
    useTheme as useMuiTheme, useMediaQuery, alpha, Fade, Grow,
    createTheme, ThemeProvider, CssBaseline, Dialog, DialogTitle,
    DialogContent, DialogActions, IconButton, Divider, Paper,
    TextField, MenuItem, Select, InputLabel, FormControl,
    FormHelperText, Snackbar, Alert, Avatar, LinearProgress,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon, AutoAwesome as AutoAwesomeIcon,
    RocketLaunch as RocketLaunchIcon, TrendingUp as TrendingUpIcon,
    Campaign as CampaignIcon, Store as StoreIcon, Bolt as BoltIcon,
    Star as StarIcon, Smartphone as SmartphoneIcon, Email as EmailIcon,
    Groups as GroupsIcon, ShoppingCart as ShoppingCartIcon, Chat as ChatIcon,
    Handshake as HandshakeIcon, Person as PersonIcon, AppShortcut as AppShortcutIcon,
    Flag as FlagIcon, CheckCircle as CheckCircleIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon, Brush as BrushIcon,
    Code as CodeIcon, Draw as DrawIcon, DesignServices as DesignServicesIcon,
    Close as CloseIcon, ChevronRight as ChevronRightIcon, Send as SendIcon,
    Phone as PhoneIcon, Business as BusinessIcon, Description as DescriptionIcon,
    Psychology as PsychologyIcon, Search as SearchIcon, Podcasts as PodcastsIcon,
    Public as PublicIcon, FilterFrames as FilterFramesIcon, Web as WebIcon,
    Create as CreateIcon, Mail as MailIcon, ShoppingBag as ShoppingBagIcon,
    WhatsApp as WhatsAppIcon, GroupWork as HandshakeOutlinedIcon,
    People as PeopleIcon, BrandingWatermark as BrandingWatermarkIcon,
    Speed as SpeedIcon, SmartToy as SmartToyIcon, Dashboard as DashboardIcon,
    FormatQuote as FormatQuoteIcon, EmojiEvents as EmojiEventsIcon,
    AccessTime as AccessTimeIcon, BarChart as BarChartIcon,
    Verified as VerifiedIcon, ArrowForward as ArrowForwardIcon,
    HeadsetMic as SupportAgentIcon, Insights as AnalyticsIcon,
    Lightbulb as LightbulbIcon, WorkspacePremium as WorkspacePremiumIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { keyframes } from '@emotion/react';
import InView from '../components/InView';
import { servicesData } from '../data/servicesData';
const ChevronRightOutlined = ChevronRightIcon;

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-33.33%); }
`;
const pulseRing = keyframes`
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(1.6); opacity: 0; }
`;
const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;
const shimmerAnim = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// ─── Service Images ───────────────────────────────────────────────────────────


// ─── Hero Slider ──────────────────────────────────────────────────────────────


// ─── Contact Form Modal ────────────────────────────────────────────────────────
const ContactFormModal = memo(({ open, onClose, serviceName, theme }) => {
    const defaultServiceName = serviceName || 'AI Marketing Solutions';
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '',
        service: defaultServiceName, budget: '', message: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        setFormData(prev => ({ ...prev, service: defaultServiceName }));
        if (open) {
            setErrors({});
            setSubmitError('');
        }
    }, [defaultServiceName, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        if (submitError) setSubmitError('');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        setLoading(true);
        setSubmitError('');
        try {
            await api.post('/services/submit', {
                serviceName: formData.service,
                fullName: formData.name, email: formData.email, phone: formData.phone,
                companyName: formData.company, budget: formData.budget, goals: formData.message
            });
            setSuccess(true);
            alert("Service inquiry submitted successfully 🎉");
            setErrors({});
            setFormData({
                name: '', email: '', phone: '', company: '',
                service: defaultServiceName, budget: '', message: ''
            });
            onClose();
        } catch (error) {
            console.error(error);
            setSubmitError(error.response?.data?.message || 'Failed to submit form. Please try again.');
        } finally { setLoading(false); }
    };

    const budgetOptions = [
        { value: 'under-5k', label: 'Under $5,000' }, { value: '5k-10k', label: '$5,000 - $10,000' },
        { value: '10k-25k', label: '$10,000 - $25,000' }, { value: '25k-50k', label: '$25,000 - $50,000' },
        { value: '50k-plus', label: '$50,000+' }, { value: 'not-sure', label: 'Not Sure Yet' }
    ];

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
                PaperProps={{ sx: { borderRadius: 3, maxHeight: '90vh' } }}>
                <DialogTitle sx={{
                    m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    background: '#7f95f4', color: 'white'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RocketLaunchIcon />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Start Your Growth Journey</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>Get Started with {defaultServiceName}</Typography>
                        </Box>
                    </Box>
                    <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 4 }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Tell us about your project</Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3} sx={{ width: '100%' }}>
                                <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange}
                                    error={!!errors.name} helperText={errors.name} required
                                    InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange}
                                    error={!!errors.email} helperText={errors.email} required
                                    InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange}
                                    error={!!errors.phone} helperText={errors.phone} required
                                    InputProps={{ startAdornment: <PhoneIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                <TextField fullWidth label="Company Name" name="company" value={formData.company} onChange={handleChange}
                                    error={!!errors.company} helperText={errors.company} required
                                    InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                <FormControl fullWidth>
                                    <InputLabel>Monthly Marketing Budget</InputLabel>
                                    <Select name="budget" value={formData.budget} onChange={handleChange} label="Monthly Marketing Budget">
                                        {budgetOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Helps us tailor our recommendations</FormHelperText>
                                </FormControl>
                                <TextField fullWidth label="Tell us about your goals" name="message" value={formData.message}
                                    onChange={handleChange} multiline rows={4}
                                    InputProps={{ startAdornment: <DescriptionIcon sx={{ mr: 1, color: theme.palette.text.secondary, mt: 1, alignSelf: 'flex-start' }} /> }}
                                    placeholder="What are your main marketing challenges?" />
                                {submitError && (
                                    <Alert severity="error" onClose={() => setSubmitError('')}>
                                        {submitError}
                                    </Alert>
                                )}
                                <Button type="submit" variant="contained" size="large" fullWidth startIcon={loading ? null : <SendIcon />}
                                    disabled={loading}
                                    sx={{ mt: 2, py: 1.5, background: theme.palette.primary.main, '&:hover': { background: theme.palette.primary.dark } }}>
                                    {loading ? 'Sending...' : 'Submit Application'}
                                </Button>
                                <Typography variant="caption" color="text.secondary" align="center">
                                    By submitting, you agree to our Privacy Policy. We'll contact you within 24 hours.
                                </Typography>
                            </Stack>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="success" variant="filled" onClose={() => setSuccess(false)}>
                    Thank you! We've received your application. Our team will contact you within 24 hours.
                </Alert>
            </Snackbar>
        </>
    );
});

// ─── Service Modal ─────────────────────────────────────────────────────────────
const SERVICE_MODAL_INSIGHTS = {
    1: {
        overview: "This service brings AI, audience intelligence, and automation together so your marketing decisions are based on patterns, not assumptions. Instead of treating every visitor the same, we help you understand intent, personalize messaging, and improve conversions at every stage.",
        businessImpact: "For businesses that want predictable growth, this creates a smarter system for lead generation, nurturing, and scaling. It is especially valuable when you want faster testing, better targeting, and a marketing engine that keeps learning from real user behavior.",
        idealFor: ["Brands that want to scale without increasing manual effort", "Teams looking to improve personalization across campaigns", "Businesses with multiple channels that need one intelligent growth system"],
        outcomes: ["Clearer customer insights and stronger campaign decisions", "Higher conversion potential through personalized communication", "A more scalable marketing workflow with less guesswork"],
    },
    2: {
        overview: "Performance marketing focuses on measurable growth. We build, manage, and optimize campaigns across paid channels so every budget is connected to a clear objective, whether that is leads, sales, bookings, or app installs.",
        businessImpact: "This service helps you move from random ad spending to structured acquisition. With better targeting, testing, and reporting, you can understand which creatives, audiences, and platforms are actually driving profitable results.",
        idealFor: ["Businesses that need immediate lead or sales generation", "Brands spending on ads without clear ROI visibility", "Growth teams that want better data-backed campaign control"],
        outcomes: ["Stronger return on ad spend", "More reliable lead and customer acquisition", "Better control over budget allocation and campaign performance"],
    },
    3: {
        overview: "SEO and growth strategy is about building long-term visibility that compounds over time. We align technical SEO, search intent, content planning, and conversion thinking so your website attracts the right audience and moves them toward action.",
        businessImpact: "This is useful when you want sustainable traffic instead of depending only on ads. It creates a foundation where better rankings lead to better quality visitors, and better quality visitors lead to stronger business outcomes.",
        idealFor: ["Businesses that want steady inbound traffic growth", "Websites with content potential but weak search visibility", "Brands looking to reduce long-term dependence on paid acquisition"],
        outcomes: ["Improved search rankings and stronger domain authority", "More relevant organic traffic from high-intent users", "A scalable content and SEO system tied to business goals"],
    },
    4: {
        overview: "Podcast and social media marketing helps you build trust before you ask for a sale. We shape your voice, position your expertise, and create content that makes your audience remember your brand and keep coming back.",
        businessImpact: "This works especially well for brands that sell through credibility, education, or authority. It helps you stay visible, deepen audience relationships, and turn attention into long-term trust and community growth.",
        idealFor: ["Founders and brands that want to build authority", "Businesses selling complex or trust-based services", "Teams that want stronger audience engagement across content channels"],
        outcomes: ["A more credible and recognizable brand presence", "Stronger audience loyalty and repeat engagement", "Content assets that continue to build value over time"],
    },
    5: {
        overview: "GMB with AI Model improves how your business appears in local search when customers are actively looking for services nearby. We optimize your Google Business Profile, local signals, reviews, and visibility so you become easier to discover and easier to trust.",
        businessImpact: "For local businesses, this directly affects calls, direction requests, and walk-in traffic. It helps you compete better in your area and turns search visibility into real local demand.",
        idealFor: ["Local businesses that depend on calls or physical visits", "Brands competing in crowded city or area-based searches", "Businesses with an under-optimized Google Business Profile"],
        outcomes: ["Stronger Google Maps and local search visibility", "More high-intent local enquiries and visits", "A profile that supports trust, reviews, and conversion"],
    },
    6: {
        overview: "Funnel and automation systems help you convert traffic into structured customer journeys. We design the flow from first click to follow-up so users receive the right message, at the right time, without your team manually handling every step.",
        businessImpact: "This is especially valuable when leads are being lost because of delayed response, unclear follow-up, or disconnected systems. It gives your business a repeatable conversion process instead of a scattered one.",
        idealFor: ["Businesses generating leads but struggling to convert them", "Teams overwhelmed by manual follow-up work", "Brands that want a cleaner sales journey from lead to customer"],
        outcomes: ["Higher conversion efficiency through better journey design", "Faster and more consistent lead nurturing", "A sales process that can scale without growing chaos"],
    },
    7: {
        overview: "Branding, creative, and design shape how people feel about your business before they read a word. We define visual consistency, messaging direction, and brand personality so every touchpoint feels intentional and credible.",
        businessImpact: "Strong branding improves recall, trust, and conversion because people understand who you are faster. It helps your business look more established, communicate more clearly, and stand out in crowded markets.",
        idealFor: ["Businesses launching or refreshing their brand identity", "Brands that look inconsistent across channels", "Teams that want stronger visual trust and positioning"],
        outcomes: ["A clearer and more memorable brand presence", "Better consistency across digital and offline assets", "Creative direction that supports marketing performance"],
    },
    8: {
        overview: "Web, app, and UX/UI development turn your digital presence into a conversion tool, not just an online brochure. We focus on structure, speed, user experience, and design clarity so your platform becomes easier to use and more effective at guiding action.",
        businessImpact: "This service matters when a poor user experience is slowing growth. Better product flows, stronger interfaces, and faster performance can improve leads, retention, trust, and customer satisfaction at the same time.",
        idealFor: ["Businesses rebuilding websites or launching digital products", "Teams with traffic but weak conversion rates", "Brands that need better UX, speed, and mobile experience"],
        outcomes: ["A smoother user journey with less friction", "Stronger conversion support across site or app screens", "Digital assets that look modern and perform reliably"],
    },
    9: {
        overview: "Content creation and writing help your business explain value clearly, build trust, and drive action. We create content that is not only readable but purposeful, whether the goal is ranking, educating, persuading, or converting.",
        businessImpact: "Good content improves how people understand your offer and how confidently they move toward your call to action. It is useful for brands that need sharper messaging, stronger storytelling, and more persuasive communication across channels.",
        idealFor: ["Businesses with unclear or weak messaging", "Brands investing in SEO, thought leadership, or nurture content", "Teams that need content tied to real business goals"],
        outcomes: ["More persuasive messaging across customer touchpoints", "Content that supports awareness, trust, and conversion", "A clearer voice that makes the brand easier to understand"],
    },
    10: {
        overview: "Sales-aligned marketing systems connect marketing activity with actual revenue outcomes. We bring together lead capture, qualification, nurturing, and follow-up so the path from campaign to close becomes more efficient and visible.",
        businessImpact: "This is important when marketing and sales are working hard but not working together. It reduces drop-offs, improves handoffs, and makes sure your demand generation process supports the people who have to close the deal.",
        idealFor: ["Businesses with separate sales and marketing workflows", "Teams struggling with lead quality or follow-up consistency", "Brands that want marketing to contribute more directly to revenue"],
        outcomes: ["Better conversion from lead to sale", "Stronger coordination between acquisition and closing", "A more accountable and trackable growth system"],
    },
    11: {
        overview: "Social media marketing is more than posting regularly. We help you build a presence that reflects your brand, earns attention, and creates interaction that supports real business growth rather than vanity metrics alone.",
        businessImpact: "This service is effective when you want to stay top of mind, create stronger audience connection, and make your social channels contribute to trust, enquiries, and community building.",
        idealFor: ["Brands that want a consistent social presence", "Businesses trying to convert visibility into engagement", "Teams that need stronger platform-specific communication"],
        outcomes: ["A more active and recognisable social identity", "Better audience engagement and consistency", "Content that supports both brand value and conversion goals"],
    },
    12: {
        overview: "Email marketing gives you a direct and reliable channel to nurture leads, retain customers, and increase repeat revenue. We build strategy, messaging, flows, and optimization systems that turn email into a business asset.",
        businessImpact: "It is especially useful for businesses that already have traffic or leads but need stronger follow-up. Instead of one-off emails, you get a structured communication system that keeps your audience warm and engaged.",
        idealFor: ["Businesses with growing lead lists or customer databases", "Brands that need better retention and repeat sales", "Teams that want automated communication without losing relevance"],
        outcomes: ["Better nurturing and higher repeat engagement", "Stronger conversion from existing audience segments", "More predictable lifecycle communication and retention growth"],
    },
    13: {
        overview: "E-commerce marketing helps you grow store revenue by improving acquisition, conversion, and retention together. We look beyond ads alone and build a full growth system that supports product discovery, purchase confidence, and repeat orders.",
        businessImpact: "This matters when your store has traffic but weak profitability, or when you want to scale without losing efficiency. It helps turn isolated marketing tactics into a more complete commerce engine.",
        idealFor: ["Online stores trying to scale profitably", "E-commerce brands with inconsistent sales performance", "Teams that need stronger retention and repeat purchase systems"],
        outcomes: ["Improved purchase conversion and order quality", "More efficient customer acquisition", "Better retention, repeat buying, and store growth stability"],
    },
    14: {
        overview: "Bulk WhatsApp marketing brings speed and personal communication together. We help you build permission-based messaging systems that feel direct, timely, and useful instead of spammy or disconnected.",
        businessImpact: "For businesses that depend on fast response, reminders, offers, or conversational follow-up, WhatsApp can become one of the most efficient channels. It increases visibility while keeping communication close to the customer.",
        idealFor: ["Brands needing faster customer communication", "Businesses running lead follow-up, reminders, or offers", "Teams that want a higher-engagement alternative to email or SMS"],
        outcomes: ["Quicker conversations and shorter response cycles", "Higher open and engagement potential", "A more personal communication channel that supports conversion"],
    },
    15: {
        overview: "Brand collaboration helps you grow by partnering with aligned brands, communities, or creators who already have audience trust. We structure collaborations so they feel relevant, mutually valuable, and strategically useful.",
        businessImpact: "This is a strong option when you want visibility beyond your own audience. It helps you borrow trust, expand reach, and create growth opportunities that would be expensive or slow to build alone.",
        idealFor: ["Brands wanting access to new but relevant audiences", "Businesses exploring co-marketing opportunities", "Teams that want partnership-led awareness and trust building"],
        outcomes: ["Expanded visibility through trusted partner networks", "Higher credibility through association and co-creation", "Smarter growth opportunities with shared value"],
    },
    16: {
        overview: "Influencer marketing works best when the right creator matches the right audience and message. We focus on relevance, authenticity, and business outcomes so the campaign does more than generate views.",
        businessImpact: "When done correctly, influencer marketing shortens the trust-building process. It helps people see your brand through a voice they already follow, making discovery feel more natural and persuasive.",
        idealFor: ["Consumer brands looking to grow awareness with trust", "Businesses launching products or campaigns that need social proof", "Teams that want creator-led storytelling tied to outcomes"],
        outcomes: ["Access to trusted communities and warmer audiences", "More authentic campaign communication", "Stronger awareness and conversion support through creator influence"],
    },
    17: {
        overview: "App marketing supports the full growth journey from discovery to activation to retention. We help your app get found, installed, understood, and repeatedly used by the right people.",
        businessImpact: "This matters when app growth is being limited by low visibility, poor onboarding, or weak retention. It helps transform installs into engaged users and gives your product a more sustainable growth foundation.",
        idealFor: ["Apps that need more qualified installs", "Product teams facing drop-offs after download", "Brands wanting stronger retention and re-engagement systems"],
        outcomes: ["Better app discoverability and acquisition quality", "Improved onboarding and usage activation", "Higher retention potential across the customer lifecycle"],
    },
    18: {
        overview: "Go-to-market strategy turns a launch idea into a market-ready plan. We align positioning, pricing, audience, channels, messaging, and execution so the product or service enters the market with clarity and direction.",
        businessImpact: "This reduces wasted effort during launch because teams know what they are selling, who they are selling it to, and how they should communicate value. It creates confidence before scale begins.",
        idealFor: ["Startups and businesses launching new offers", "Brands repositioning products for a new audience", "Teams that need strategic clarity before execution"],
        outcomes: ["Stronger launch readiness and market confidence", "Better message-market fit and audience alignment", "A clearer roadmap for sales and marketing execution"],
    },
    19: {
        overview: "Site optimization improves the parts of your website that directly affect user experience and business performance. We focus on speed, clarity, technical quality, and conversion flow so your site performs better for both people and search engines.",
        businessImpact: "Even small usability improvements can create meaningful gains in leads and revenue. This service helps ensure your traffic is not being wasted because of friction, confusion, or slow performance.",
        idealFor: ["Businesses with traffic but weak site conversion", "Teams dealing with slow or technically inconsistent websites", "Brands that want stronger performance without rebuilding everything"],
        outcomes: ["A faster and more reliable website experience", "Reduced friction in the conversion journey", "Better technical health for SEO, UX, and business results"],
    },
    20: {
        overview: "Product branding helps customers understand what your product stands for, why it matters, and why it is different. We define the positioning, visual expression, and story around the product so it earns stronger recognition and trust.",
        businessImpact: "This is valuable when the product itself is strong but the market does not yet understand its value clearly. Strong branding improves perceived quality, helps differentiation, and supports long-term adoption.",
        idealFor: ["Product-led businesses building category presence", "Brands preparing launches or rebrands for core offers", "Teams that need stronger product storytelling and positioning"],
        outcomes: ["A more distinct and recognisable product identity", "Clearer customer understanding and stronger trust", "Better positioning that supports adoption and market recall"],
    },
};

const ServiceModal = memo(({ service, open, onClose, theme, onStartService }) => {
    if (!service) return null;
    const serviceInsight = SERVICE_MODAL_INSIGHTS[service.id];

    const renderAdditionalInsights = () => {
        if (!serviceInsight) return null;

        return (
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Why This Service Matters
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8, mb: 2.5 }}>
                    {serviceInsight.overview}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3.5 }}>
                    {serviceInsight.businessImpact}
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                            Best For
                        </Typography>
                        <Stack spacing={1.4}>
                            {serviceInsight.idealFor.map((item, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                                    <CheckCircleIcon sx={{ fontSize: 18, color: theme.palette.primary.main, mt: '3px', flexShrink: 0 }} />
                                    <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                            What Success Looks Like
                        </Typography>
                        <Stack spacing={1.4}>
                            {serviceInsight.outcomes.map((item, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                                    <StarIcon sx={{ fontSize: 18, color: theme.palette.success.main, mt: '3px', flexShrink: 0 }} />
                                    <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>

                {service.platforms && service.platforms.length > 0 && (
                    <Box sx={{ mt: 4.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                            Channels and Platforms We Work With
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                            Depending on your growth goals, we adapt this service across the platforms and systems that matter most to your audience, sales process, and delivery model.
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                            {service.platforms.map((platform, idx) => (
                                <Chip
                                    key={idx}
                                    label={platform}
                                    variant="outlined"
                                    sx={{
                                        borderColor: alpha(theme.palette.primary.main, 0.2),
                                        color: theme.palette.text.primary,
                                        fontWeight: 600,
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {service.faqs && service.faqs.length > 0 && service.id !== 1 && (
                    <Box sx={{ mt: 4.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Common Questions
                        </Typography>
                        <Stack spacing={2}>
                            {service.faqs.map((faq, idx) => (
                                <Box key={idx}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.8 }}>
                                        {faq.q}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                        {faq.a}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Box>
        );
    };

    const getFullContent = () => {
        switch (service.id) {
            case 1:
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
                            AI Marketing Solutions (LLM-Powered Growth)
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Traditional marketing relies on guesswork.{' '}
                                <Typography component="span" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>We rely on intelligence.</Typography>
                            </Typography>
                            <Typography variant="body1" paragraph>
                                At AI Growth Era, we built an LLM-powered marketing framework that helps brands grow faster, smarter, and more predictably.
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            {[
                                { icon: <AutoAwesomeIcon />, title: "1. Predict Customer Behavior", desc: "We use AI-driven analytics to understand how users think, browse, and buy." },
                                { icon: <CampaignIcon />, title: "2. Intelligent Targeting & Messaging", desc: "LLM-powered systems personalize messaging across email, ads, landing pages, and chat." },
                                { icon: <BoltIcon />, title: "3. Marketing Automation That Thinks", desc: "Automate decision-making using AI logic  campaigns adapt automatically based on performance." },
                                { icon: <TrendingUpIcon />, title: "4. Funnel Optimization With AI", desc: "From awareness to conversion, optimize each stage of your funnel for maximum ROI." },
                            ].map((item, idx) => (
                                <Grid size={{ xs: 12, md: 6 }} key={idx}>
                                    <Box sx={{ py: 1.5, pr: { md: 2 } }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ color: theme.palette.primary.main }}>{item.icon}</Box> {item.title}
                                        </Typography>
                                        <Typography variant="body2">{item.desc}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        {renderAdditionalInsights()}
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Frequently Asked Questions</Typography>
                            {[
                                { q: "What are AI marketing solutions?", a: "AI marketing uses ML to analyze data, predict behavior, automate campaigns, and improve performance." },
                                { q: "How do LLMs improve marketing?", a: "LLMs enhance personalization, automate content, and optimize communication across channels." },
                                { q: "Is AI marketing suitable for small businesses?", a: "Yes, it helps small businesses reduce costs and compete with data-driven strategies." },
                                { q: "How long does it take to see results?", a: "Most clients see improvements within 30-60 days depending on data availability." },
                            ].map((faq, idx) => (
                                <Box key={idx} sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>{idx + 1}. {faq.q}</Typography>
                                    <Typography variant="body1">{faq.a}</Typography>
                                    <Divider sx={{ mt: 2 }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                );
            default:
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>{service.title}</Typography>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>{service.tagline}</Typography>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4 }}>
                            <Typography variant="body1" paragraph>{service.shortDesc}</Typography>
                        </Box>
                        <Grid container spacing={{ xs: 2, md: 1.5 }} sx={{ mt: 1, alignItems: 'start' }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 3, mb: 1.5 }}>What We Offer</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main, mt: { xs: 0, md: 3.25 }, mb: 1.5 }}>
                                    Benefits You Get
                                </Typography>
                            </Grid>
                            {Array.from({ length: Math.max(service.features.length, service.benefits.length) }).map((_, idx) => (
                                <React.Fragment key={idx}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        {service.features[idx] ? (
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, py: 0.6, pr: { md: 1.5 } }}>
                                                <ChevronRightIcon sx={{ color: theme.palette.primary.main, fontSize: 20, mt: '2px', flexShrink: 0 }} />
                                                <Typography variant="body1" sx={{ lineHeight: 1.45 }}>
                                                    {service.features[idx]}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box sx={{ py: 0.6 }} />
                                        )}
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        {service.benefits[idx] ? (
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, py: 0.6 }}>
                                                <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main, mt: '4px', flexShrink: 0 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.45 }}>
                                                    {service.benefits[idx]}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box sx={{ py: 0.6 }} />
                                        )}
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                        {renderAdditionalInsights()}
                    </Box>
                );
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper"
            PaperProps={{ sx: { borderRadius: 3, maxHeight: '90vh', width: '100%', maxWidth: 820 } }}>
            <DialogTitle sx={{
                m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.primary.main }}>
                        {React.cloneElement(service.icon, { sx: { fontSize: 20 } })}
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{service.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{service.category}</Typography>
                    </Box>
                </Box>
                <IconButton aria-label="close" onClick={onClose} sx={{ color: theme.palette.text.secondary }}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>{getFullContent()}</DialogContent>
            <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, justifyContent: 'space-between' }}>
                <Button onClick={onClose} sx={{ color: 'text.secondary' }}>Close</Button>
                <Button variant="contained" startIcon={<RocketLaunchIcon />}
                    onClick={() => { onClose(); onStartService(service.title); }}
                    sx={{ bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}>
                    Start with {service.title}
                </Button>
            </DialogActions>
        </Dialog>
    );
});

// ─── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = memo(({ service, index, theme, onExploreDetails }) => (
    <InView threshold={0.1} triggerOnce={true} placeholderHeight="300px">
        <Grow in={true} timeout={500}>
            <Card sx={{
                height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4,
                border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                background: alpha(theme.palette.background.paper, 0.4), backdropFilter: 'blur(20px)',
                transition: 'all 0.4s ease', position: 'relative', overflow: 'visible',
                '&:hover': {
                    transform: 'translateY(-8px)', borderColor: theme.palette.primary.main,
                    boxShadow: `0 12px 30px -10px ${alpha(theme.palette.primary.main, 0.15)}`,
                    '& .icon-box': { transform: 'scale(1.1) rotate(5deg)', background: theme.palette.primary.main, color: 'white', boxShadow: `0 8px 20px -6px ${alpha(theme.palette.primary.main, 0.4)}` }
                }
            }}>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box className="icon-box" sx={{
                            width: 64, height: 64, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: alpha(theme.palette.primary.main, 0.08), color: theme.palette.primary.main,
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}>
                            {React.cloneElement(service.icon, { sx: { fontSize: 32 } })}
                        </Box>
                        <Chip label={service.category || "Premium"} size="small" sx={{
                            height: 24, background: alpha(theme.palette.primary.main, 0.05), color: theme.palette.primary.main,
                            fontWeight: 700, fontSize: '0.7rem', borderRadius: 1
                        }} />
                    </Box>
                    <Typography variant="h5" sx={{
                        fontWeight: 800, mb: 2, fontSize: '1.4rem',
                        background: theme.palette.mode === 'dark' ? 'linear-gradient(to right, #fff, #ccc)' : 'linear-gradient(to right, #1a1a1a, #4a4a4a)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>{service.title}</Typography>
                    <Typography variant="body2" sx={{
                        mb: 3, color: 'text.secondary', lineHeight: 1.7, minHeight: '4.8em',
                        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>{service.shortDesc}</Typography>
                    <Box sx={{ pt: 3, borderTop: '1px dashed', borderColor: alpha(theme.palette.divider, 0.1) }}>
                        {service.features.slice(0, 3).map((feature, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: theme.palette.primary.main, mr: 2, opacity: 0.7 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem' }}>{feature}</Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
                <CardActions sx={{ p: 4, pt: 0, mt: 'auto' }}>
                    <Button endIcon={<KeyboardArrowRightIcon />} onClick={() => onExploreDetails(service)}
                        sx={{ color: 'text.primary', fontWeight: 700, p: 0, '&:hover': { background: 'transparent', gap: 2, color: theme.palette.primary.main }, gap: 1, transition: 'all 0.3s ease' }}>
                        Explore Details
                    </Button>
                </CardActions>
            </Card>
        </Grow>
    </InView>
));

// ─── Service Detail Accordion ──────────────────────────────────────────────────
const ServiceDetail = memo(({ service, expanded, onChange, theme, onStartService }) => (
    <InView threshold={0.1} triggerOnce={true} placeholderHeight="80px">
        <Accordion id={`service-${service.id}`} expanded={expanded} onChange={onChange}
            TransitionProps={{ unmountOnExit: true }}
            sx={{
                mb: 3, borderRadius: '24px !important', overflow: 'hidden',
                background: theme.palette.background.paper,
                boxShadow: expanded ? `0 20px 40px -4px ${alpha(theme.palette.common.black, 0.1)}` : 'none',
                border: '1px solid', borderColor: expanded ? theme.palette.primary.main : alpha(theme.palette.divider, 0.1),
                '&:before': { display: 'none' }, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
            <AccordionSummary
                expandIcon={<Box sx={{
                    width: 40, height: 40, borderRadius: '50%', border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: expanded ? 'white' : 'text.secondary', background: expanded ? theme.palette.primary.main : 'transparent', transition: 'all 0.3s ease'
                }}><ExpandMoreIcon /></Box>}
                sx={{ px: 4, py: 2, '& .MuiAccordionSummary-content': { alignItems: 'center' }, '&:hover': { background: alpha(theme.palette.background.default, 0.5) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 3 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: '14px', background: alpha(theme.palette.primary.main, 0.08), color: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {React.cloneElement(service.icon, { sx: { fontSize: 24 } })}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.2rem' }}>{service.title}</Typography>
                        {!expanded && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, display: { xs: 'none', sm: 'block' }, opacity: 0.8 }}>{service.tagline}</Typography>
                        )}
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
                <Box sx={{ p: 6, background: alpha(theme.palette.background.default, 0.3), borderTop: '1px solid', borderColor: alpha(theme.palette.divider, 0.05) }}>
                    <Grid container spacing={8}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 2, display: 'block', mb: 2 }}>OVERVIEW</Typography>
                            <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, lineHeight: 1.2 }}>{service.tagline}</Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 5, fontSize: '1.1rem' }}>{service.shortDesc}</Typography>
                            <Button variant="contained" size="large" endIcon={<RocketLaunchIcon />} onClick={() => onStartService(service.title)}
                                sx={{ borderRadius: '50px', background: theme.palette.primary.main, fontWeight: 700, px: 5, py: 1.8, color: 'white', boxShadow: `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.4)}`, '&:hover': { background: theme.palette.primary.dark, transform: 'translateY(-2px)' } }}>
                                Start with {service.title}
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Grid container spacing={6}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}><AutoAwesomeIcon sx={{ fontSize: 18 }} /></Box>
                                        Key Features
                                    </Typography>
                                    <Stack spacing={2}>
                                        {service.features.map((feature, idx) => (
                                            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <CheckCircleIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mr: 1.5, opacity: 0.8 }} />
                                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{feature}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main }}><TrendingUpIcon sx={{ fontSize: 18 }} /></Box>
                                        Benefits
                                    </Typography>
                                    {service.benefits && (
                                        <Stack spacing={2}>
                                            {service.benefits.slice(0, 5).map((benefit, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: theme.palette.warning.main, mt: 1, mr: 2, flexShrink: 0 }} />
                                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{benefit}</Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    )}
                                </Grid>
                            </Grid>
                            {service.platforms && (
                                <Box sx={{ mt: 2, p: 3, borderRadius: 3, background: alpha(theme.palette.background.paper, 0.5), border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary', letterSpacing: 1 }}>TECHNOLOGIES</Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {service.platforms.map((platform, idx) => (
                                            <Chip key={idx} label={platform} size="small" variant="outlined" sx={{ borderColor: alpha(theme.palette.divider, 0.2), fontWeight: 600, background: 'transparent' }} />
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    {service.faqs && (
                        <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}><ChatIcon sx={{ fontSize: 18 }} /></Box>
                                Frequently Asked Questions
                            </Typography>
                            <Grid container spacing={4}>
                                {service.faqs.map((faq, idx) => (
                                    <Grid size={{ xs: 12, md: 4 }} key={idx}>
                                        <Box sx={{ p: 3, height: '100%', borderRadius: 2, background: alpha(theme.palette.background.paper, 0.5), border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.4 }}>{faq.q}</Typography>
                                            <Typography variant="body2" color="text.secondary">{faq.a}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    </InView>
));

// ══════════════════════════════════════════════════════════════════
// ─── StatsSection (hidden) ────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const StatsSection = memo(({ theme }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── WhyChooseUsSection (hidden) ──────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const WhyChooseUsSection = memo(({ theme, onStartService }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── HowItWorksSection (hidden) ───────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const HowItWorksSection = memo(({ theme }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── TestimonialsSection (hidden) ─────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const TestimonialsSection = memo(({ theme }) => {
    const [active, setActive] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActive(a => (a + 1) % 5), 5500);
        return () => clearInterval(t);
    }, []);
    return null;
});

// ══════════════════════════════════════════════════════════════════
// ─── FeaturedServicesSpotlight (hidden) ───────────────────────────
// ══════════════════════════════════════════════════════════════════
const FeaturedServicesSpotlight = memo(({ theme, onStartService }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── HowWeWorkSection (hidden) ────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const marquee2 = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const HowWeWorkSection = memo(({ theme }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── FIX 1: Industries Section  Grid fixed, boxes properly sized ─
// ══════════════════════════════════════════════════════════════════
const IndustriesSection = memo(({ theme }) => {
    const industries = [
        { name: 'E-commerce & D2C', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80', desc: 'Shopify, WooCommerce, Amazon  scale your store.' },
        { name: 'SaaS & Tech', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80', desc: 'Product-led growth and B2B pipeline building.' },
        { name: 'Real Estate', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80', desc: 'Lead generation and funnel automation for properties.' },
        { name: 'Healthcare', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80', desc: 'Patient acquisition and reputation management.' },
        { name: 'Education', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80', desc: 'Student acquisition funnels and app growth.' },
        { name: 'Restaurants', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', desc: 'Local SEO and influencer tie-ups.' },
        { name: 'Finance', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', desc: 'Performance marketing and compliance funnels.' },
        { name: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', desc: 'Influencer marketing and Instagram growth.' },
    ];

    return (
        <Box sx={{ pt: { xs: 2.5, md: 3 }, pb: { xs: 7, md: 8 }, bgcolor: alpha(theme.palette.background.default, 0.5), overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 4.5 } }}>
                    <Chip label="INDUSTRIES WE SERVE" size="small" sx={{
                        mb: 3, fontWeight: 800, letterSpacing: 2,
                        background: alpha('#6b6b6b', 0.1), color: '#121312',
                        border: `1px solid ${alpha('#43e97b', 0.3)}`, borderRadius: 1,
                    }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}>
                        We've Driven Growth Across Every Industry
                        <Box component="span" sx={{
                            background: 'linear-gradient(135deg, #43e97b, #4facfe)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}></Box>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 900, mx: 'auto', whiteSpace: 'nowrap' }}>
                        AI Growth Era's frameworks are battle-tested across 10+ industries.
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    }
                }}>
                    {industries.map((ind, i) => (
                        <Box key={i} sx={{
                            position: 'relative',
                            height: 220,
                            borderRadius: '20px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            background: '#1e293b',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            '&:hover .ind-img': { transform: 'scale(1.1)' }
                        }}>
                            {/* Background Image */}
                            <Box
                                className="ind-img"
                                component="img"
                                src={ind.img}
                                alt={ind.name}
                                onError={(event) => {
                                    event.currentTarget.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80';
                                }}
                                sx={{
                                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                                    objectFit: 'cover', transition: 'transform 0.5s ease',
                                }}
                            />
                            {/* Dark Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
                                }}
                            />
                            {/* Content */}
                            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5, zIndex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', mb: 0.5, fontSize: '1.1rem', lineHeight: 1.2 }}>
                                    {ind.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                                    {ind.desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
});

// ══════════════════════════════════════════════════════════════════
// ─── Tools & Technologies Marquee ─────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const toolsMarquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const toolsMarqueeReverse = keyframes`
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
`;

const ToolsSection = memo(({ theme }) => {
    const row1 = [
        { name: 'Google Ads', emoji: '🔍' }, { name: 'Meta Ads', emoji: '📘' },
        { name: 'HubSpot', emoji: '🧡' }, { name: 'Klaviyo', emoji: '📧' },
        { name: 'Shopify', emoji: '🛍️' }, { name: 'Figma', emoji: '🎨' },
        { name: 'React', emoji: '⚛️' }, { name: 'Next.js', emoji: '▲' },
        { name: 'Google Analytics', emoji: '📊' }, { name: 'Semrush', emoji: '🔎' },
        { name: 'WhatsApp API', emoji: '💬' }, { name: 'Mailchimp', emoji: '🐒' },
    ];
    const row2 = [
        { name: 'TikTok Ads', emoji: '🎵' }, { name: 'LinkedIn Ads', emoji: '💼' },
        { name: 'YouTube Ads', emoji: '▶️' }, { name: 'WooCommerce', emoji: '🛒' },
        { name: 'ActiveCampaign', emoji: '⚡' }, { name: 'Ahrefs', emoji: '🔗' },
        { name: 'Zapier', emoji: '🔄' }, { name: 'Notion', emoji: '📝' },
        { name: 'Canva', emoji: '✏️' }, { name: 'OpenAI', emoji: '🤖' },
        { name: 'Hotjar', emoji: '🔥' }, { name: 'Stripe', emoji: '💳' },
    ];

    const ToolChip = ({ tool }) => (
        <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1.5,
            px: 3, py: 1.5, mx: 1.5, borderRadius: '50px', flexShrink: 0,
            border: '1px solid', borderColor: alpha(theme.palette.divider, 0.15),
            background: theme.palette.background.paper,
            transition: 'all 0.3s ease',
            '&:hover': {
                borderColor: theme.palette.primary.main,
                transform: 'translateY(-3px)',
                boxShadow: `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.15)}`,
            },
        }}>
            <Typography sx={{ fontSize: '1.15rem', lineHeight: 1 }}>{tool.emoji}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: 'nowrap', color: 'text.primary' }}>
                {tool.name}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Chip label="TOOLS & PLATFORMS" size="small" sx={{
                        mb: 3, fontWeight: 800, letterSpacing: 2,
                        background: alpha('#f093fb', 0.1), color: '#f093fb',
                        border: `1px solid ${alpha('#f093fb', 0.3)}`, borderRadius: 1,
                    }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}>
                        We Work With the{' '}
                        <Box component="span" sx={{
                            background: 'linear-gradient(135deg, #f093fb, #667eea)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Best Tools in the Industry</Box>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 500, mx: 'auto' }}>
                        24+ platforms, tools, and technologies  all orchestrated by our AI systems.
                    </Typography>
                </Box>
            </Container>

            {/* Row 1 */}
            <Box sx={{
                position: 'relative', overflow: 'hidden', mb: 3,
                '&::before, &::after': {
                    content: '""', position: 'absolute', top: 0, width: '120px', height: '100%', zIndex: 2, pointerEvents: 'none',
                },
                '&::before': { left: 0, background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)` },
                '&::after': { right: 0, background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)` },
            }}>
                <Box sx={{
                    display: 'flex', width: 'max-content', py: 1,
                    animation: `${toolsMarquee} 28s linear infinite`,
                    '&:hover': { animationPlayState: 'paused' },
                }}>
                    {[...row1, ...row1].map((tool, i) => <ToolChip key={i} tool={tool} />)}
                </Box>
            </Box>

            {/* Row 2 */}
            <Box sx={{
                position: 'relative', overflow: 'hidden',
                '&::before, &::after': {
                    content: '""', position: 'absolute', top: 0, width: '120px', height: '100%', zIndex: 2, pointerEvents: 'none',
                },
                '&::before': { left: 0, background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)` },
                '&::after': { right: 0, background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)` },
            }}>
                <Box sx={{
                    display: 'flex', width: 'max-content', py: 1,
                    animation: `${toolsMarqueeReverse} 32s linear infinite`,
                    '&:hover': { animationPlayState: 'paused' },
                }}>
                    {[...row2, ...row2].map((tool, i) => <ToolChip key={i} tool={tool} />)}
                </Box>
            </Box>
        </Box>
    );
});

// ══════════════════════════════════════════════════════════════════
// ─── FIX 2: Final CTA Section  dark background removed ───────────
// ══════════════════════════════════════════════════════════════════
const FinalCTASection = memo(({ theme, onStartService }) => (
    <Box sx={{
        position: 'relative', overflow: 'hidden',
        // ✅ FIX: removed dark gradient background  now uses site background
        background: theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : '#ffffff',
    }}>
        {/* ✅ FIX: background image removed (opacity: 0) */}
        <Box component="img"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
            alt="CTA"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
        />
        {/* Subtle gradient orbs  adjusted for light bg */}
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,126,234,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,147,251,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, py: { xs: 10, md: 16 }, textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 1, px: 3, py: 1, mb: 4,
                    borderRadius: '50px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    background: alpha(theme.palette.primary.main, 0.06),
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box sx={{
                        width: 8, height: 8, borderRadius: '50%', background: '#43e97b',
                        boxShadow: '0 0 0 3px rgba(67,233,123,0.25)',
                        animation: `${pulseRing} 2s ease infinite`,
                    }} />
                    <Typography sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : theme.palette.text.primary,
                        fontSize: '0.85rem', fontWeight: 700,
                    }}>
                        AI Systems Live & Running 24/7
                    </Typography>
                </Box>

                <Typography variant="h2" sx={{
                    fontWeight: 900,
                    color: theme.palette.text.primary,
                    mb: 3, lineHeight: 1.1, letterSpacing: '-0.03em',
                    fontSize: { xs: '2rem', md: '3.5rem', lg: '4rem' },
                }}>
                    Ready to Build{' '}
                    <Box component="span" sx={{
                        background: 'linear-gradient(135deg, #f9a8d4, #d8b4fe, #a5b4fc)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 200%',
                        animation: `${shimmerAnim} 4s linear infinite`,
                    }}>Intelligent Growth?</Box>
                </Typography>

                <Typography variant="h6" sx={{
                    color: 'text.secondary',
                    mb: 6, fontWeight: 400, lineHeight: 1.7, maxWidth: 580, mx: 'auto',
                }}>
                    Let's turn your data into decisions  and decisions into revenue. Most clients see results within 30–60 days. No contracts. No fluff. Just growth.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center">
                    <Button variant="contained" size="large" endIcon={<RocketLaunchIcon />}
                        onClick={() => onStartService('AI Growth Era  All Services')}
                        sx={{
                            borderRadius: '50px', fontWeight: 800, px: 6, py: 2,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            fontSize: '1rem',
                            boxShadow: '0 0 40px rgba(102,126,234,0.3)',
                            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 0 60px rgba(102,126,234,0.5)', filter: 'brightness(1.1)' },
                            transition: 'all 0.3s ease',
                        }}>
                        Start Your Growth Journey
                    </Button>
                    <Button variant="outlined" size="large"
                        sx={{
                            borderRadius: '50px', fontWeight: 700, px: 5, py: 2,
                            color: theme.palette.text.primary,
                            borderColor: alpha(theme.palette.primary.main, 0.4),
                            fontSize: '1rem',
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                background: alpha(theme.palette.primary.main, 0.05),
                                transform: 'translateY(-3px)',
                            },
                            transition: 'all 0.3s ease',
                        }}>
                        View All 20+ Services
                    </Button>
                </Stack>

                <Grid container spacing={4} sx={{ mt: 8 }} justifyContent="center">
                    {[
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: 'Free Strategy Call' },
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: 'No Long-Term Contracts' },
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: 'Results Within 30 Days' },
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: '24/7 AI Systems' },
                    ].map((item, i) => (
                        <Grid key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {item.icon}
                                <Typography sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600, fontSize: '0.9rem',
                                }}>{item.label}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Container>
    </Box>
));

// ══════════════════════════════════════════════════════════════════
// ─── MAIN PAGE CONTENT ────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const ServicesContent = () => {
    const theme = useMuiTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [expandedService, setExpandedService] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [deferredReady, setDeferredReady] = useState(false);
    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceName, setSelectedServiceName] = useState('');
    const [showAllServices, setShowAllServices] = useState(false);
    const ourServicesSectionRef = useRef(null);
    const heroVideoRef = useRef(null);
    const heroVideoSrc = '/es_video_me_me_sare_service_d.mp4';

    useEffect(() => {
        if (typeof document === 'undefined') return undefined;

        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'video';
        preloadLink.href = heroVideoSrc;
        preloadLink.type = 'video/mp4';
        document.head.appendChild(preloadLink);

        const videoElement = heroVideoRef.current;
        if (videoElement) {
            videoElement.load();
            const playPromise = videoElement.play();
            if (playPromise?.catch) {
                playPromise.catch(() => { });
            }
        }

        return () => {
            if (document.head.contains(preloadLink)) {
                document.head.removeChild(preloadLink);
            }
        };
    }, [heroVideoSrc]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => setLoaded(true), 0);
        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            setDeferredReady(true);
            return undefined;
        }

        let cancelled = false;
        let idleId;
        let fallbackId;
        let frameId;

        const enableDeferredSections = () => {
            if (!cancelled) {
                setDeferredReady(true);
            }
        };

        if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(enableDeferredSections, { timeout: 600 });
        } else {
            frameId = window.requestAnimationFrame(() => {
                fallbackId = window.setTimeout(enableDeferredSections, 60);
            });
        }

        return () => {
            cancelled = true;
            if (idleId) {
                window.cancelIdleCallback(idleId);
            }
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
            if (fallbackId) {
                window.clearTimeout(fallbackId);
            }
        };
    }, []);

    const services = servicesData;

    useEffect(() => {
        const openServiceTitle = location.state?.openServiceTitle;
        if (!openServiceTitle) return;

        const matchedService = services.find((service) => service.title === openServiceTitle);
        if (matchedService) {
            setSelectedService(matchedService);
            setServiceModalOpen(true);
        }

        navigate(location.pathname, { replace: true, state: {} });
    }, [location.pathname, location.state, navigate, services]);

    const handleExploreDetails = (service) => {
        if (!service) return;
        setSelectedService(service);
        setServiceModalOpen(true);
    };
    const handleServiceModalClose = () => { setServiceModalOpen(false); setSelectedService(null); };
    const handleStartService = (serviceName) => { setSelectedServiceName(serviceName); setContactFormOpen(true); setServiceModalOpen(false); };
    const handleContactFormClose = () => { setContactFormOpen(false); setSelectedServiceName(''); };
    const handleServiceExpand = (serviceId) => setExpandedService(expandedService === serviceId ? null : serviceId);
    const handleScrollToServices = () => {
        ourServicesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const handleScrollToFooter = () => {
        document.getElementById('site-footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    return (
        <Box sx={{ minHeight: '100vh', background: theme.palette.mode === 'dark' ? '#111827' : '#ffffff', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ width: '100%', overflow: 'hidden' }}>

                {/* ── HERO SECTION ── */}
                <Box sx={{
                    position: 'relative', height: '100vh', minHeight: 560, maxHeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', textAlign: 'center', color: 'white',
                }}>
                    {/* Background Video */}
                    <Box
                        component="video"
                        ref={heroVideoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        src={heroVideoSrc}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: { xs: 'center', md: 'center right' },
                            zIndex: 0,
                            filter: 'brightness(0.9) contrast(1.16) saturate(1.2)',
                            transform: 'scale(1.01)',
                        }}
                    />

                    {/* Gradient Overlay */}
                    <Box sx={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        background: `
                            linear-gradient(90deg, rgba(6, 12, 26, 0.76) 0%, rgba(8, 16, 34, 0.54) 34%, rgba(8, 16, 34, 0.18) 62%, rgba(7, 12, 28, 0.24) 100%),
                            linear-gradient(to bottom, rgba(10, 10, 30, 0.2) 0%, rgba(10, 10, 30, 0.08) 36%, rgba(7, 10, 22, 0.44) 100%)
                        `,
                    }} />
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5, pt: { xs: 20, md: 24 }, pb: { xs: 16, md: 18 } }}>
                        <Box sx={{
                            maxWidth: { xs: 860, md: 720 },
                            ml: { xs: 'auto', md: 0 },
                            mr: { xs: 'auto', md: 'auto' },
                            px: { xs: 1.4, md: 0.5 },
                            py: { xs: 2, md: 1.2 },
                            textAlign: { xs: 'center', md: 'left' },
                        }}>
                            <Fade in={loaded} timeout={550}>
                                <Typography variant="h1" sx={{
                                    fontWeight: 900, mb: 2,
                                    fontSize: { xs: '1.72rem', md: '2.65rem', lg: '3.2rem' },
                                    lineHeight: 1.02, letterSpacing: '-0.035em',
                                    animation: `${fadeInUp} 0.8s ease-out`,
                                    textShadow: '0 10px 34px rgba(0,0,0,0.4)',
                                }}>
                                    Growth Services That{' '}
                                    <Box component="span" sx={{ background: 'linear-gradient(to right, #7dd3fc, #c4b5fd, #f9a8d4)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        Perform
                                    </Box>
                                    <br />
                                    and Scale With You
                                </Typography>
                            </Fade>
                            <Fade in={loaded} timeout={700}>
                                <Typography variant="h5" sx={{
                                    mb: 2,
                                    color: 'rgba(226,232,240,0.98)',
                                    fontWeight: 500,
                                    maxWidth: 620,
                                    mx: { xs: 'auto', md: 0 },
                                    fontSize: { xs: '1rem', md: '1.12rem' },
                                    lineHeight: 1.55,
                                    animation: `${fadeInUp} 0.8s ease-out 0.18s both`,
                                    textShadow: '0 3px 18px rgba(0,0,0,0.38)',
                                }}>
                                    Strategy, performance marketing, automation, and creative execution built to turn visibility into qualified leads and measurable business growth.
                                </Typography>
                            </Fade>
                            <Fade in={loaded} timeout={850}>
                                <Typography variant="body1" sx={{
                                    mb: 4.5,
                                    fontSize: { xs: '0.92rem', md: '1rem' },
                                    lineHeight: 1.7,
                                    color: 'rgba(255,255,255,0.86)',
                                    maxWidth: 610,
                                    mx: { xs: 'auto', md: 0 },
                                    animation: `${fadeInUp} 0.8s ease-out 0.32s both`,
                                    textShadow: '0 3px 12px rgba(0,0,0,0.34)',
                                }}>
                                    From AI marketing and SEO to funnels, branding, and conversion systems, we create connected services that help your brand grow faster, communicate clearly, and scale with confidence.
                                </Typography>
                            </Fade>
                            <Fade in={loaded} timeout={1000}>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1.1, mb: 3, animation: `${fadeInUp} 0.8s ease-out 0.45s both` }}>
                                    {[
                                        { label: '20+ Growth Services', color: '#c4b5fd' },
                                        { label: 'Clear Strategy', color: '#7dd3fc' },
                                        { label: 'Better Conversions', color: '#86efac' },
                                        { label: 'Scalable Execution', color: '#f9a8d4' },
                                    ].map((badge, i) => (
                                        <Box key={i} sx={{ px: 1.8, py: 0.65, borderRadius: '999px', border: `1px solid ${badge.color}50`, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
                                            <Typography sx={{ color: badge.color, fontSize: '0.82rem', fontWeight: 700, letterSpacing: 0.3 }}>{badge.label}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Fade>
                            <Fade in={loaded} timeout={950}>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    gap: 1.5,
                                    mt: 0.5,
                                    mb: 4,
                                    animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
                                }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleScrollToServices}
                                        sx={{
                                            px: 3,
                                            py: 1.1,
                                            borderRadius: '999px',
                                            fontWeight: 800,
                                            textTransform: 'none',
                                            background: 'linear-gradient(135deg, #60a5fa, #8b5cf6)',
                                            boxShadow: '0 14px 30px rgba(96,165,250,0.28)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                                            },
                                        }}
                                    >
                                        Services
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleScrollToFooter}
                                        sx={{
                                            px: 3,
                                            py: 1.1,
                                            borderRadius: '999px',
                                            fontWeight: 800,
                                            textTransform: 'none',
                                            color: '#fff',
                                            borderColor: 'rgba(255,255,255,0.38)',
                                            background: 'rgba(255,255,255,0.04)',
                                            backdropFilter: 'blur(6px)',
                                            '&:hover': {
                                                borderColor: 'rgba(255,255,255,0.65)',
                                                background: 'rgba(255,255,255,0.08)',
                                            },
                                        }}
                                    >
                                        Contact Us
                                    </Button>
                                </Box>
                            </Fade>
                        </Box>
                    </Container>
                </Box>

                {deferredReady ? (
                    <>
                        {/* Stats (hidden) */}
                        <StatsSection theme={theme} />

                        {/* ── Philosophy Section ── */}
                        <Box sx={{ pt: { xs: 4, md: 4.5 }, pb: { xs: 1, md: 1.5 }, bgcolor: 'background.paper' }}>
                            <Container maxWidth="xl">
                                <Box sx={{ width: '100%', mx: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 1.25, md: 1.5 } }}>
                                    <Typography variant="h3" align="center" sx={{ mb: 0, fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1 }}>
                                        Our Core Philosophy (Why Our Services Work)
                                    </Typography>
                                    <Typography variant="h5" align="center" sx={{ mb: 0, maxWidth: 800, mx: 'auto', fontStyle: 'italic', color: 'text.secondary', lineHeight: 1.35 }}>
                                        "Most agencies focus on activities. We focus on outcomes."
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0 }}>Every service is:</Typography>
                                    <Box sx={{
                                        width: '100%', overflow: 'hidden', position: 'relative',
                                        '&::before, &::after': { content: '""', position: 'absolute', top: 0, width: '100px', height: '100%', zIndex: 2, pointerEvents: 'none' },
                                        '&::before': { left: 0, background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)` },
                                        '&::after': { right: 0, background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)` }
                                    }}>
                                        <Box sx={{ display: 'flex', width: 'max-content', animation: `${marquee} 20s linear infinite`, '&:hover': { animationPlayState: 'paused' } }}>
                                            {[...Array(3)].map((_, i) => (
                                                [{ title: 'AI-Driven', sticker: '🧠', desc: 'Strategies powered by data, not guesswork.' },
                                                { title: 'ROI-Focused', sticker: '📈', desc: 'Every campaign differs, but the goal is profit.' },
                                                { title: 'Designed to Scale', sticker: '🚀', desc: 'Systems built to grow with your business.' },
                                                { title: 'Sales Integrated', sticker: '🤝', desc: 'Marketing that actually drives closed deals.' }
                                                ].map((item, index) => (
                                                    <Box key={`${i}-${index}`} sx={{ width: { xs: 200, md: 220 }, mx: 1.5, flexShrink: 0, display: 'flex' }}>
                                                        <Paper elevation={0} sx={{
                                                            p: 3, width: '100%', height: '100%', borderRadius: 3,
                                                            bgcolor: alpha(theme.palette.background.paper, 0.6), backdropFilter: 'blur(20px)',
                                                            border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                                                            textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': { transform: 'translateY(-8px)', borderColor: theme.palette.primary.main, boxShadow: `0 12px 30px -10px ${alpha(theme.palette.primary.main, 0.15)}` }
                                                        }}>
                                                            <Box sx={{ mb: 2, p: 0.5, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.08), width: 68, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.16)}`, border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}` }}>
                                                                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                                                                    <Box
                                                                        component="img"
                                                                        src={{
                                                                            'AI-Driven': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&q=80',
                                                                            'ROI-Focused': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80',
                                                                            'Designed to Scale': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&q=80',
                                                                            'Sales Integrated': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80',
                                                                        }[item.title]}
                                                                        alt={item.title}
                                                                        sx={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                                                                    />
                                                                </motion.div>
                                                            </Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}>{item.title}</Typography>
                                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{item.desc}</Typography>
                                                        </Paper>
                                                    </Box>
                                                ))
                                            ))}
                                        </Box>
                                    </Box>
                                    {/* <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mt: 4 }}>
                                That's why our services don't work in isolation  they work together.
                            </Typography> */}
                                </Box>
                            </Container>
                        </Box>

                        {/* Why Choose Us (hidden) */}
                        <WhyChooseUsSection theme={theme} onStartService={handleStartService} />

                        {/* How It Works (hidden) */}
                        <HowItWorksSection theme={theme} />

                        {/* ── All Services Grid ── */}
                        <Box ref={ourServicesSectionRef} sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 2, md: 2.5 }, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                            <Container maxWidth="lg">
                                <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 3.5 } }}>
                                    <Typography variant="h2" align="center" sx={{ mb: 1, fontWeight: 800, color: theme.palette.text.primary, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1 }}>
                                        Our All Services
                                    </Typography>
                                    <Typography variant="h6" align="center" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 900, mx: 'auto', whiteSpace: 'nowrap', lineHeight: 1.35 }}>
                                        20+ AI-powered growth services designed to scale your business
                                    </Typography>
                                </Box>
                                {(() => {
                                    const tileServiceMap = {
                                        "AI Marketing Solutions": 1,
                                        "Performance Marketing": 2,
                                        "SEO & Growth Strategy": 3,
                                        "Podcast Marketing": 4,
                                        "Social Media Marketing": 11,
                                        "GMB with AI Model": 5,
                                        "Funnel & Automation": 6,
                                        "Branding & Creative": 7,
                                        "Logo Design": 7,
                                        "Website Development": 8,
                                        "Mobile Applications": 8,
                                        "Content Creation": 9,
                                        "Sales-Aligned Marketing": 10,
                                        "Email Marketing": 12,
                                        "E-commerce Marketing": 13,
                                        "WhatsApp Bulk Messaging": 14,
                                        "Brand Collaborations": 15,
                                        "Influencer Marketing": 16,
                                        "UX/UI Design": 8,
                                        "Application Marketing": 17,
                                        "Go-To-Market Strategies": 18,
                                    };

                                    const allServiceTiles = [
                                        { name: "AI Marketing Solutions", sub: "LLM Growth", icon: <PsychologyIcon />, img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80", color: '#667eea', desc: "Leverage Large Language Models to automate content, personalize outreach, and scale marketing efforts." },
                                        { name: "Performance Marketing", sub: "Google â€¢ Meta â€¢ LinkedIn", icon: <CampaignIcon />, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", color: '#4facfe', desc: "Data-driven advertising campaigns focused on measurable results and high conversion rates across platforms." },
                                        { name: "SEO & Growth Strategy", sub: "Organic Traffic", icon: <SearchIcon />, img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&q=80", color: '#43e97b', desc: "Dominate search results and drive sustainable organic growth with advanced SEO and keyword strategies." },
                                        { name: "Podcast Marketing", sub: "Audio Authority", icon: <PodcastsIcon />, img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&q=80", color: '#f093fb', desc: "Build brand authority and reach engaged listeners through strategic podcast placements and sponsorships." },
                                        { name: "Social Media Marketing", sub: "Community Growth", icon: <PublicIcon />, img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80", color: '#fa709a', desc: "Engage your audience and grow a loyal community across all major social media platforms." },
                                        { name: "GMB with AI Model", sub: "Local Growth", icon: <StoreIcon />, img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&q=80", color: '#f7971e', desc: "Optimize your Google Business Profile with AI to dominate local search and attract more foot traffic." },
                                        { name: "Funnel & Automation", sub: "Convert at Scale", icon: <FilterFramesIcon />, img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&q=80", color: '#fda085', desc: "Streamline your sales process with automated funnels that nurture leads into loyal customers." },
                                        { name: "Branding & Creative", sub: "Visual Identity", icon: <BrushIcon />, img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=500&q=80", color: '#a18cd1', desc: "Create a memorable brand identity that resonates with your target audience and stands out." },
                                        { name: "Logo Design", sub: "Brand Mark", icon: <DrawIcon />, img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80", color: '#fd79a8', desc: "Professional logo design that captures your brand's essence and leaves a lasting impression." },
                                        { name: "Website Development", sub: "Digital Presence", icon: <CodeIcon />, img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80", color: '#6c5ce7', desc: "High-performance, responsive websites built with modern technologies for the best user experience." },
                                        { name: "Mobile Applications", sub: "Android / iOS", icon: <SmartphoneIcon />, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80", color: '#00b894', desc: "Build powerful mobile apps that keep your customers engaged and drive business growth." },
                                        { name: "Content Creation", sub: "Words that Convert", icon: <CreateIcon />, img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80", color: '#00cec9', desc: "Engaging content that tells your story and drives action across all your digital channels." },
                                        { name: "Sales-Aligned Marketing", sub: "Revenue Systems", icon: <HandshakeIcon />, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80", color: '#0984e3', desc: "Align your marketing and sales teams to create a seamless revenue-generating machine." },
                                        { name: "Email Marketing", sub: "Inbox Revenue", icon: <EmailIcon />, img: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&q=80", color: '#74b9ff', desc: "Nurture relationships and drive sales with personalized email campaigns that deliver results." },
                                        { name: "E-commerce Marketing", sub: "Online Store Growth", icon: <ShoppingCartIcon />, img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80", color: '#fd79a8', desc: "Scale your online store with specialized e-commerce strategies that increase sales and loyalty." },
                                        { name: "WhatsApp Bulk Messaging", sub: "Direct Messaging", icon: <WhatsAppIcon />, img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500&q=80", color: '#55efc4', desc: "Reach your customers directly in their favorite messaging app with high-impact WhatsApp campaigns." },
                                        { name: "Brand Collaborations", sub: "Strategic Partnerships", icon: <GroupsIcon />, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80", color: '#fdcb6e', desc: "Expand your reach through strategic partnerships and brand-to-brand collaborations." },
                                        { name: "Influencer Marketing", sub: "Trust & Reach", icon: <PeopleIcon />, img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80", color: '#e17055', desc: "Partner with trusted influencers to reach new audiences and build social proof for your brand." },
                                        { name: "UX/UI Design", sub: "User Experience", icon: <DesignServicesIcon />, img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&q=80", color: '#a29bfe', desc: "Design beautiful, intuitive interfaces that provide exceptional user experiences across all devices." },
                                        { name: "Application Marketing", sub: "Installs & Retention", icon: <AppShortcutIcon />, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80", color: '#fd79a8', desc: "Drive app installs and increase user retention with targeted mobile app marketing strategies." },
                                        { name: "Go-To-Market Strategies", sub: "Launch Planning", icon: <FlagIcon />, img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80", color: '#e84393', desc: "Launch your products or services with confidence using a data-backed go-to-market plan." },
                                    ].map((tile) => ({
                                        ...tile,
                                        detailService: services.find((item) => item.id === tileServiceMap[tile.name]) || null,
                                    }));
                                    const visibleServiceTiles = showAllServices ? allServiceTiles : allServiceTiles.slice(0, 16);
                                    return (
                                        <>
                                            <Grid container spacing={4} justifyContent="center">
                                                {visibleServiceTiles.map((service, index) => (
                                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 30 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.4, delay: (index % 8) * 0.06 }}
                                                            viewport={{ once: true }}
                                                        >
                                                            <Box
                                                                role="button"
                                                                tabIndex={0}
                                                                onClick={() => handleExploreDetails(service.detailService)}
                                                                onKeyDown={(event) => {
                                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                                        event.preventDefault();
                                                                        handleExploreDetails(service.detailService);
                                                                    }
                                                                }}
                                                                sx={{
                                                                    position: 'relative',
                                                                    borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                                                                    border: '1px solid', borderColor: alpha(theme.palette.divider, 0.08),
                                                                    background: 'transparent',
                                                                    height: '100%',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                                                                    outline: 'none',
                                                                    '&:hover': {
                                                                        transform: 'translateY(-6px)',
                                                                        borderColor: alpha(service.color, 0.45),
                                                                        boxShadow: `0 22px 50px -20px ${alpha(service.color, 0.45)}`,
                                                                        '& .svc-img': {
                                                                            filter: 'blur(8px)',
                                                                            transform: 'scale(1.06)',
                                                                        },
                                                                        '& .svc-base-overlay': {
                                                                            opacity: 0.18,
                                                                        },
                                                                        '& .svc-base-content': {
                                                                            opacity: 0,
                                                                            transform: 'translateY(16px)',
                                                                        },
                                                                        '& .svc-hover-overlay': {
                                                                            opacity: 1,
                                                                        },
                                                                        '& .svc-hover-content': {
                                                                            opacity: 1,
                                                                            transform: 'translateY(0)',
                                                                        },
                                                                    },
                                                                    '&:focus-visible': {
                                                                        transform: 'translateY(-6px)',
                                                                        borderColor: alpha(service.color, 0.6),
                                                                        boxShadow: `0 22px 50px -20px ${alpha(service.color, 0.45)}`,
                                                                    },
                                                                }}>
                                                                <Box sx={{ position: 'relative', height: { xs: 360, sm: 420, md: 460 }, overflow: 'hidden', flexShrink: 0 }}>
                                                                    <Box
                                                                        className="svc-img"
                                                                        component="img"
                                                                        src={service.img}
                                                                        alt={service.name}
                                                                        sx={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover',
                                                                            display: 'block',
                                                                            transition: 'filter 0.45s ease, transform 0.45s ease',
                                                                        }}
                                                                    />
                                                                    <Box
                                                                        className="svc-base-overlay"
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            inset: 0,
                                                                            background: 'linear-gradient(180deg, rgba(21,10,44,0.18) 0%, rgba(15,10,34,0.58) 100%)',
                                                                            zIndex: 1,
                                                                            opacity: 1,
                                                                            transition: 'opacity 0.35s ease',
                                                                        }}
                                                                    />
                                                                    <Box
                                                                        className="svc-base-content"
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            inset: 0,
                                                                            zIndex: 2,
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            justifyContent: 'space-between',
                                                                            p: 2.5,
                                                                            color: '#fff',
                                                                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                                                                        }}
                                                                    >
                                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                            <Box sx={{
                                                                                px: 2, py: 0.75, borderRadius: '999px',
                                                                                background: alpha('#ffffff', 0.18), color: '#fff',
                                                                                fontWeight: 700, fontSize: '0.7rem', letterSpacing: 1,
                                                                                textTransform: 'uppercase',
                                                                                boxShadow: '0 14px 40px rgba(0,0,0,0.22)',
                                                                            }}>
                                                                                {service.name.split(' ')[0]}
                                                                            </Box>
                                                                        </Box>
                                                                        <Box>
                                                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.12, fontSize: { xs: '1.2rem', md: '1.35rem' }, maxWidth: '88%' }}>
                                                                                {service.name}
                                                                            </Typography>
                                                                            <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.82)', fontSize: '0.92rem', fontWeight: 600 }}>
                                                                                {service.sub}
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    mt: 1.4,
                                                                                    color: 'rgba(255,255,255,0.92)',
                                                                                    fontSize: '0.92rem',
                                                                                    lineHeight: 1.55,
                                                                                    maxWidth: '92%',
                                                                                }}
                                                                            >
                                                                                {service.desc}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    <Box
                                                                        className="svc-hover-overlay"
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            inset: 0,
                                                                            background: `linear-gradient(180deg, ${alpha('#19062f', 0.9)} 0%, ${alpha(service.color, 0.78)} 100%)`,
                                                                            zIndex: 3,
                                                                            opacity: 0,
                                                                            transition: 'opacity 0.35s ease',
                                                                        }}
                                                                    />
                                                                    <Box
                                                                        className="svc-hover-content"
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            inset: 0,
                                                                            zIndex: 4,
                                                                            p: 2.5,
                                                                            color: '#fff',
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            justifyContent: 'space-between',
                                                                            opacity: 0,
                                                                            transform: 'translateY(18px)',
                                                                            transition: 'opacity 0.35s ease, transform 0.35s ease',
                                                                        }}
                                                                    >
                                                                        <Box>
                                                                            <Typography sx={{ fontWeight: 800, fontSize: '0.78rem', letterSpacing: 1, textTransform: 'uppercase', mb: 2.5 }}>
                                                                                {service.sub}
                                                                            </Typography>
                                                                            <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.55rem', md: '1.75rem' }, lineHeight: 1.08, mb: 1.6 }}>
                                                                                {service.name}
                                                                            </Typography>
                                                                            <Typography sx={{ color: 'rgba(255,255,255,0.98)', fontSize: '0.92rem', lineHeight: 1.65, mb: 1.5 }}>
                                                                                {service.desc}
                                                                            </Typography>
                                                                            <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '95%' }}>
                                                                                This service helps you get clearer positioning, better quality leads, and stronger business growth with a focused strategy.
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: 1,
                                                                                fontWeight: 800,
                                                                                fontSize: '1.05rem',
                                                                                color: '#fff',
                                                                                background: 'transparent',
                                                                                p: 0,
                                                                                pointerEvents: 'none',
                                                                            }}
                                                                        >
                                                                            <Typography component="span" sx={{ fontWeight: 800, fontSize: 'inherit' }}>
                                                                                Expand
                                                                            </Typography>
                                                                            <ChevronRightOutlined sx={{ fontSize: 20 }} />
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                                <Box sx={{ height: 4, background: `linear-gradient(to right, ${service.color}, ${alpha(service.color, 0.3)})`, mt: 'auto' }} />
                                                            </Box>
                                                        </motion.div>
                                                    </Grid>
                                                ))}
                                            </Grid>

                                            {!showAllServices && (
                                                <Box sx={{ textAlign: 'center', mt: 2.5 }}>
                                                    <Button variant="contained" size="large" onClick={() => setShowAllServices(true)} sx={{ borderRadius: '999px', px: 6, py: 1.8 }}>
                                                        View All Services
                                                    </Button>
                                                </Box>
                                            )}
                                        </>
                                    );
                                })()}
                            </Container>
                        </Box>

                        {/* Featured Spotlight (hidden) */}
                        <FeaturedServicesSpotlight theme={theme} onStartService={handleStartService} />

                        {/* Testimonials (hidden) */}
                        <TestimonialsSection theme={theme} />

                        {/* ── Service Detail Accordions ── */}
                        {/* <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" align="center" sx={{ mb: 8, fontWeight: 800, color: theme.palette.text.primary }}>
                            Explore Details
                        </Typography>
                        {services.map((service) => (
                            <ServiceDetail
                                key={service.id}
                                service={service}
                                expanded={expandedService === service.id}
                                onChange={() => handleServiceExpand(service.id)}
                                theme={theme}
                                onStartService={handleStartService}
                            />
                        ))}
                    </Container>
                </Box> */}

                        {/* ── Our Approach Process Section (New) ── */}
                        <Box sx={{ pt: { xs: 2.5, md: 3 }, pb: { xs: 1, md: 1.5 }, bgcolor: theme.palette.mode === 'dark' ? 'rgba(15,23,42,0.5)' : '#ffffff', position: 'relative', overflow: 'hidden' }}>
                            <Container maxWidth="lg">
                                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 4.5 } }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <Typography variant="overline" sx={{ color: 'black', fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                            OUR APPROACH
                                        </Typography>
                                        <Typography variant="h3" sx={{ mt: 1.5, mb: 2, fontWeight: 900, color: theme.palette.text.primary, fontSize: { xs: '2rem', md: '3rem' } }}>
                                            A Proven Process That Delivers Results
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 650, mx: 'auto', fontSize: '1.1rem' }}>
                                            We follow a data-driven process to deliver predictable growth<span style={{ color: theme.palette.black, fontWeight: 700 }}></span> for your brand.
                                        </Typography>
                                    </motion.div>
                                </Box>

                                <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                                    {[
                                        { title: "Discover", desc: "We understand your business, audience, and goals.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=80", color: "#3b82f6" },
                                        { title: "Strategize", desc: "We create a custom AI-powered growth strategy.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&q=80", color: "#8b5cf6" },
                                        { title: "Execute", desc: "We implement, test, and optimize every campaign.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80", color: "#10b981" },
                                        { title: "Optimize", desc: "We analyze data and continually improve results.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80", color: "#f59e0b" },
                                        { title: "Scale", desc: "We scale what works and maximize your growth.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80", color: "#ef4444" },
                                    ].map((step, index, arr) => (
                                        <React.Fragment key={index}>
                                            <Grid size={{ xs: 12, sm: 6, md: 2.2 }}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <Box sx={{
                                                        textAlign: 'center', px: 1, py: 4, borderRadius: 6,
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': { transform: 'translateY(-10px)' }
                                                    }}>
                                                        <Box sx={{
                                                            width: 100, height: 100, mx: 'auto', mb: 3,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            position: 'relative',
                                                            // Dotted border container
                                                            '&::after': {
                                                                content: '""', position: 'absolute', inset: -8, borderRadius: '50%',
                                                                border: `3px dotted ${step.color}`,
                                                                animation: 'spin 10s linear infinite',
                                                                opacity: 0.6
                                                            }
                                                        }}>
                                                            <Box
                                                                component="img"
                                                                src={step.img}
                                                                alt={step.title}
                                                                sx={{
                                                                    width: '100%', height: '100%',
                                                                    objectFit: 'cover', zIndex: 1,
                                                                    borderRadius: '50%',
                                                                    border: `2px solid ${alpha(step.color, 0.2)}`,
                                                                    boxShadow: `0 10px 25px ${alpha(step.color, 0.3)}`
                                                                }}
                                                            />
                                                        </Box>
                                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: theme.palette.text.primary, fontSize: '1.15rem' }}>
                                                            {step.title}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5, fontSize: '0.8rem', maxWidth: 160, mx: 'auto' }}>
                                                            {step.desc}
                                                        </Typography>
                                                    </Box>
                                                </motion.div>
                                            </Grid>
                                            {index < arr.length - 1 && (
                                                <Grid size={{ md: 0.2 }} sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'center' }}>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <ArrowForwardIcon sx={{ color: alpha(theme.palette.text.secondary, 0.2), fontSize: 22 }} />
                                                    </motion.div>
                                                </Grid>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Container>
                            <style>
                                {`
                            @keyframes spin {
                                from { transform: rotate(0deg); }
                                to { transform: rotate(360deg); }
                            }
                        `}
                            </style>
                        </Box>

                        {/* ── Testimonials Section (New) ── */}
                        <Box sx={{ pt: { xs: 2, md: 2.5 }, pb: { xs: 2.5, md: 3 }, mt: { xs: -1, md: -1.5 }, bgcolor: theme.palette.mode === 'dark' ? 'rgba(15,23,42,0.8)' : '#f8fafc', position: 'relative' }}>
                            <Container maxWidth="lg">
                                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 4.5 } }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <Typography variant="overline" sx={{ color: 'black', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
                                            CLIENT LOVE
                                        </Typography>
                                        <Typography variant="h3" sx={{ mt: 1.5, mb: 2, fontWeight: 900, color: theme.palette.text.primary, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                                            What Our Clients Say
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 600, mx: 'auto', fontSize: '1.05rem' }}>
                                            We're proud to be a growth partner for amazing brands.
                                        </Typography>
                                    </motion.div>
                                </Box>

                                <Box sx={{
                                    overflow: 'hidden', py: 2, mx: -2, position: 'relative',
                                    '&::before, &::after': {
                                        content: '""', position: 'absolute', top: 0, bottom: 0, width: 100, zIndex: 2,
                                        pointerEvents: 'none'
                                    },
                                    '&::before': { left: 0, background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)` },
                                    '&::after': { right: 0, background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)` }
                                }}>
                                    <motion.div
                                        animate={{ x: [0, -1500] }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        style={{ display: 'flex', gap: '32px', width: 'max-content' }}
                                    >
                                        {[
                                            { name: "Rohit Sharma", role: "CEO, Fitness Pro", text: "AI Growth Exa transformed our marketing completely. Leads up 200%!", img: "https://i.pravatar.cc/150?u=1" },
                                            { name: "Ananya Verma", role: "Marketing Head", text: "Their AI strategies saved us time and increased ROI by 3X.", img: "https://i.pravatar.cc/150?u=2" },
                                            { name: "Vikas Malhotra", role: "Founder, StyleCart", text: "Professional team and unmatched results. Highly recommended!", img: "https://i.pravatar.cc/150?u=3" },
                                            { name: "Sanya Gupta", role: "Director, TechFlow", text: "The automation funnels are a game changer for our sales team.", img: "https://i.pravatar.cc/150?u=4" },
                                            { name: "Arjun Mehta", role: "E-com Owner", text: "Scaled our ad spend with better efficiency than ever before.", img: "https://i.pravatar.cc/150?u=5" },
                                            { name: "Priya Das", role: "Founder, Bloom", text: "Creative and strategic. They really understand our brand goals.", img: "https://i.pravatar.cc/150?u=6" },
                                            // Duplicate for infinite effect
                                            { name: "Rohit Sharma", role: "CEO, Fitness Pro", text: "AI Growth Exa transformed our marketing completely. Leads up 200%!", img: "https://i.pravatar.cc/150?u=1" },
                                            { name: "Ananya Verma", role: "Marketing Head", text: "Their AI strategies saved us time and increased ROI by 3X.", img: "https://i.pravatar.cc/150?u=2" },
                                            { name: "Vikas Malhotra", role: "Founder, StyleCart", text: "Professional team and unmatched results. Highly recommended!", img: "https://i.pravatar.cc/150?u=3" },
                                        ].map((testi, index) => (
                                            <Paper key={index} elevation={0} sx={{
                                                p: 3, borderRadius: 5, bgcolor: 'background.paper',
                                                border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                                                width: 320, flexShrink: 0,
                                                display: 'flex', flexDirection: 'column',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    borderColor: 'primary.main',
                                                    boxShadow: '0 15px 30px rgba(0,0,0,0.05)'
                                                }
                                            }}>
                                                <FormatQuoteIcon sx={{ color: 'primary.main', fontSize: 30, mb: 1, opacity: 0.4 }} />
                                                <Typography variant="body2" sx={{ color: 'text.primary', mb: 3, fontStyle: 'italic', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                                    "{testi.text}"
                                                </Typography>
                                                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Avatar src={testi.img} sx={{ width: 44, height: 44, border: '1.5px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }} />
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.2 }}>
                                                            {testi.name}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                            {testi.role}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </motion.div>
                                </Box>

                            </Container>
                        </Box>

                        {/* How We Work (hidden) */}
                        <HowWeWorkSection theme={theme} />

                        {/* ── Industries Section (FIXED) ── */}
                        <IndustriesSection theme={theme} />


                        {/* ── Connect With the Founder ── */}
                        <Box sx={{ py: 10, bgcolor: theme.palette.mode === 'dark' ? alpha('#fff', 0.02) : '#f8fafc' }}>
                            <Container maxWidth="md">
                                <Box sx={{ textAlign: 'center', mb: 6 }}>
                                    <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, letterSpacing: '-0.02em', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                                        Connect With our expert team

                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 600, mx: 'auto', lineHeight: 1.6, fontSize: '1.1rem' }}>
                                        Want to Talk Growth, Strategy, or AI? Connect directly with the mind behind AI Growth Exa.
                                    </Typography>
                                </Box>

                                <Paper elevation={0} sx={{
                                    p: { xs: 4, md: 6 },
                                    borderRadius: '32px',
                                    border: '1px solid',
                                    borderColor: alpha(theme.palette.divider, 0.1),
                                    background: theme.palette.mode === 'dark' ? '#1e293b' : '#fff',
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: { xs: 4, md: 8 },
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                }}>
                                    {/* Buttons Side */}
                                    <Stack spacing={2.5} sx={{ width: { xs: '100%', md: '280px' } }}>
                                        <Button
                                            onClick={() => handleStartService('Founder Connect')}
                                            variant="contained"
                                            size="large"
                                            endIcon={<RocketLaunchIcon />}
                                            sx={{
                                                py: 1.8, px: 4, borderRadius: '100px',
                                                background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                                                fontWeight: 800, fontSize: '1rem',
                                                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
                                                '&:hover': { transform: 'scale(1.03)', background: 'linear-gradient(90deg, #4f46e5 0%, #9333ea 100%)' }
                                            }}
                                        >
                                            Start Growth Journey
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={handleScrollToServices}
                                            sx={{
                                                py: 1.8, px: 4, borderRadius: '100px',
                                                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(99, 102, 241, 0.5)',
                                                color: theme.palette.mode === 'dark' ? '#fff' : '#1e1b4b',
                                                fontWeight: 800, fontSize: '1rem',
                                                border: '1.5px solid',
                                                '&:hover': { borderColor: '#6366f1', background: alpha('#6366f1', 0.05) }
                                            }}
                                        >
                                            Our Services
                                        </Button>
                                    </Stack>

                                    {/* Vertical Divider */}
                                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, opacity: 0.5 }} />

                                    {/* QR Code Side */}
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Box sx={{
                                            p: 1.5, borderRadius: '20px', bgcolor: '#fff',
                                            boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                                            border: '1px solid #e2e8f0',
                                            mb: 2, width: 220, height: 220, mx: 'auto',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Box
                                                component="img"
                                                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://wa.me/91XXXXXXXXXX"
                                                alt="WhatsApp QR"
                                                sx={{ width: '90%', height: '90%' }}
                                            />
                                        </Box>
                                        <Button
                                            startIcon={<WhatsAppIcon />}
                                            sx={{
                                                color: '#16a34a', fontWeight: 800, textTransform: 'none', fontSize: '1rem',
                                                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                                            }}
                                        >
                                            Connect on WhatsApp
                                        </Button>
                                    </Box>
                                </Paper>
                            </Container>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 6 }, bgcolor: 'background.paper' }}>
                        <Container maxWidth="lg">
                            <Box sx={{ maxWidth: 620, mx: 'auto', textAlign: 'center', mb: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1 }}>
                                    Loading service experience...
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5 }}>
                                    The page shell is ready. Detailed sections are being prepared in the background.
                                </Typography>
                                <LinearProgress sx={{ height: 8, borderRadius: 999, bgcolor: alpha(theme.palette.primary.main, 0.08) }} />
                            </Box>
                            <Grid container spacing={3}>
                                {[1, 2, 3, 4].map((item) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                minHeight: 220,
                                                borderRadius: 4,
                                                border: '1px solid',
                                                borderColor: alpha(theme.palette.divider, 0.12),
                                                background: alpha(theme.palette.background.paper, 0.9),
                                            }}
                                        >
                                            <Box sx={{ width: 52, height: 52, borderRadius: 3, mb: 2, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.16)}, ${alpha('#a855f7', 0.16)})` }} />
                                            <Box sx={{ height: 18, width: '70%', borderRadius: 999, mb: 1.5, bgcolor: alpha(theme.palette.text.primary, 0.08) }} />
                                            <Box sx={{ height: 12, width: '100%', borderRadius: 999, mb: 1, bgcolor: alpha(theme.palette.text.primary, 0.06) }} />
                                            <Box sx={{ height: 12, width: '86%', borderRadius: 999, mb: 1, bgcolor: alpha(theme.palette.text.primary, 0.06) }} />
                                            <Box sx={{ height: 12, width: '62%', borderRadius: 999, bgcolor: alpha(theme.palette.text.primary, 0.06) }} />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>
                )}
            </Box>

            {/* Modals */}
            <ServiceModal service={selectedService} open={serviceModalOpen} onClose={handleServiceModalClose} theme={theme} onStartService={handleStartService} />
            <ContactFormModal open={contactFormOpen} onClose={handleContactFormClose} serviceName={selectedServiceName} theme={theme} />
        </Box>
    );
};

// ─── Page Wrapper ──────────────────────────────────────────────────────────────
const ServicesPage = () => {
    const { theme: appTheme } = useAppTheme();
    const muiTheme = useMemo(() => createTheme({
        palette: {
            mode: appTheme || 'light',
            primary: { main: '#667eea' },
            background: {
                default: appTheme === 'dark' ? '#0f172a' : '#f8fafc',
                paper: appTheme === 'dark' ? '#1e293b' : '#ffffff',
            },
            text: {
                primary: appTheme === 'dark' ? '#f1f5f9' : '#0f172a',
                secondary: appTheme === 'dark' ? '#94a3b8' : '#475569',
            },
        },
        typography: {
            fontFamily: '"Geist Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h1: { fontWeight: 800 }, h2: { fontWeight: 800 }, h3: { fontWeight: 700 },
        },
        components: {
            MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, borderRadius: '0.5rem' } } },
            MuiPaper: { styleOverrides: { root: { borderRadius: '1rem' } } }
        }
    }), [appTheme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Box sx={{
                minHeight: '100vh',
                background: appTheme === 'dark'
                    ? 'linear-gradient(to bottom, #0f172a, #1e1b4b)'
                    : 'linear-gradient(to bottom, #f8fafc, #ffffff, #eff6ff)',
                color: 'text.primary'
            }}>
                <ServicesContent />
            </Box>
        </ThemeProvider>
    );
};

export default ServicesPage;


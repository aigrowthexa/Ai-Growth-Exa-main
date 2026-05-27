import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import api from "../api/api";
import {
    ArrowRight,
    BookOpen,
    Brain,
    CalendarDays,
    CheckCircle,
    ChevronRight,
    Clock,
    Cpu,
    Eye,
    FileText,
    Globe,
    Heart,
    Mail,
    Rocket,
    Search,
    Settings,
    Share2,
    Sparkles,
    Target,
    TrendingUp,
    User,
    Bookmark,
    DollarSign,
    Users,
    Briefcase,
    BarChart,
    ShoppingCart,
    Smartphone,
    X,
} from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const fallbackBlogs = [
    {
        _id: "1",
        title: "How AI Is Transforming Paid Ads in 2026",
        content: "Discover how AI is optimizing ad targeting, budgets, and creative systems like never before.",
        author: "AI Growth Exa Team",
        createdAt: "2026-05-01T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        category: "AI Marketing",
    },
    {
        _id: "2",
        title: "7 Proven Growth Hacks That Still Work in 2026",
        content: "Simple but powerful growth experiments you can implement immediately.",
        author: "AI Growth Exa Team",
        createdAt: "2026-04-28T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        category: "Growth Hacks",
    },
    {
        _id: "3",
        title: "The New Performance Marketing Playbook",
        content: "A data-driven approach to scale campaigns, increase ROI, and reduce wasted spend.",
        author: "AI Growth Exa Team",
        createdAt: "2026-04-25T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        category: "Performance",
    },
    {
        _id: "4",
        title: "Mastering Prompt Engineering for B2B Sales",
        content: "Learn how to craft precise AI prompts to generate high-converting sales copy and personalized outreach at scale.",
        author: "AI Growth Exa Team",
        createdAt: "2026-04-20T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        category: "AI Marketing",
    },
    {
        _id: "5",
        title: "The Ultimate Guide to Conversion Rate Optimization",
        content: "Stop guessing what works. Use these data-backed CRO frameworks to instantly boost your landing page performance.",
        author: "AI Growth Exa Team",
        createdAt: "2026-04-15T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        category: "Performance",
    },
    {
        _id: "6",
        title: "Scaling Automated Workflows with AI Agents",
        content: "Discover how autonomous AI agents are replacing traditional automation setups to handle complex operations seamlessly.",
        author: "AI Growth Exa Team",
        createdAt: "2026-04-10T00:00:00.000Z",
        image: "https://images.unsplash.com/photo-1518932945647-7a3c96922de1?auto=format&fit=crop&w=1200&q=80",
        category: "Growth Hacks",
    },
];

const categoryDetails = [
    {
        id: "ai",
        label: "AI Marketing",
        icon: Brain,
        count: 18,
        title: "AI Marketing",
        description: "How AI is transforming ads, content, and customer journeys.",
        learnPoints: [
            "AI ads optimization",
            "LLM content strategies",
            "Automation workflows",
        ],
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "growth",
        label: "Growth Hacks",
        icon: Rocket,
        count: 12,
        title: "Growth Hacks",
        description: "Real experiments that helped brands scale faster.",
        learnPoints: [
            "Viral strategies",
            "Conversion tricks",
            "Scaling systems",
        ],
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "performance",
        label: "Performance Marketing",
        icon: Target,
        count: 10,
        title: "Performance Marketing",
        description: "ROI-focused strategies backed by real data.",
        learnPoints: [
            "CPL optimization",
            "Ad scaling",
            "Budget strategies",
        ],
        iconColor: "text-orange-500",
        iconBg: "bg-orange-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "automation",
        label: "Automation",
        icon: Settings,
        count: 10,
        title: "Automation",
        description: "Build systems that work 24/7 without manual effort.",
        learnPoints: [
            "Funnels",
            "CRM automation",
            "Chatbots",
        ],
        iconColor: "text-blue-500",
        iconBg: "bg-blue-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "strategy",
        label: "Business Strategy",
        icon: Globe,
        count: 14,
        title: "Business Strategy",
        description: "Frameworks used by high-growth companies.",
        learnPoints: [
            "Market positioning",
            "Scaling roadmap",
            "Revenue models",
        ],
        iconColor: "text-purple-500",
        iconBg: "bg-purple-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "seo",
        label: "SEO & Content",
        icon: Search,
        count: 15,
        title: "SEO & Content",
        description: "Organic growth systems and content frameworks.",
        learnPoints: [
            "Semantic SEO strategies",
            "Content clustering",
            "Link building at scale",
        ],
        iconColor: "text-teal-500",
        iconBg: "bg-teal-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "social",
        label: "Social Media",
        icon: Smartphone,
        count: 11,
        title: "Social Media",
        description: "Building engaged audiences across social platforms.",
        learnPoints: [
            "Short-form video tactics",
            "Community building",
            "Social commerce",
        ],
        iconColor: "text-pink-500",
        iconBg: "bg-pink-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "ecommerce",
        label: "E-commerce",
        icon: ShoppingCart,
        count: 16,
        title: "E-commerce",
        description: "Scaling DTC brands and marketplace strategies.",
        learnPoints: [
            "CRO for product pages",
            "Retention strategies",
            "Cart abandonment",
        ],
        iconColor: "text-indigo-500",
        iconBg: "bg-indigo-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "data",
        label: "Data Analytics",
        icon: BarChart,
        count: 9,
        title: "Data Analytics",
        description: "Making better decisions with actionable data.",
        learnPoints: [
            "Attribution modeling",
            "Customer LTV analysis",
            "Dashboard building",
        ],
        iconColor: "text-cyan-500",
        iconBg: "bg-cyan-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: "email",
        label: "Email Marketing",
        icon: Mail,
        count: 13,
        title: "Email Marketing",
        description: "Maximizing revenue from owned audience channels.",
        learnPoints: [
            "List segmentation",
            "Automated flows",
            "Deliverability optimization",
        ],
        iconColor: "text-rose-500",
        iconBg: "bg-rose-50",
        borderColor: "border-slate-100",
        image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=400&q=80",
    },
];

const categoryArticles = {
    ai: [
        "AI marketing is no longer just a trend. It has become a practical growth system for brands that want faster execution, better personalization, and smarter decision-making. Instead of relying only on manual campaign management, businesses can now use AI to analyze customer behavior, predict intent, generate content ideas, and improve communication across multiple channels.",
        "The real value of AI marketing comes from its ability to reduce wasted effort. It helps teams understand which messages are working, which audiences are responding, and where conversions are being lost. This means brands can improve performance without guessing, while also building more relevant customer journeys that feel timely and personal.",
        "For growing companies, AI marketing creates an advantage in both speed and scale. It allows businesses to test more ideas, optimize faster, and deliver better customer experiences without increasing operational complexity at the same pace.",
    ],
    growth: [
        "Growth hacks work best when they are built on insight rather than shortcuts. The strongest growth strategies usually come from understanding user behavior, improving conversion paths, and finding repeatable experiments that can scale once they prove effective.",
        "A good growth framework combines creativity with discipline. Instead of trying random tactics, successful teams test one idea at a time, measure impact carefully, and double down only on the channels, messages, or experiences that move the right metrics.",
        "This approach helps businesses grow more efficiently. It turns experimentation into a system, reduces wasted time, and creates momentum through practical wins that can compound over time.",
    ],
    performance: [
        "Performance marketing is about building campaigns that are measurable, efficient, and directly tied to business outcomes. Rather than focusing only on impressions or reach, it prioritizes leads, purchases, bookings, and other results that contribute to revenue.",
        "The strength of performance marketing lies in its ability to turn data into action. Campaigns can be optimized continuously using audience insights, creative testing, bidding strategies, and landing page improvements. This creates a much clearer path between budget spent and results achieved.",
        "For brands that want reliable acquisition, performance marketing provides accountability. It makes scaling easier because decisions are based on evidence, not assumptions, and it helps teams invest more confidently in the channels that are delivering the best return.",
    ],
    automation: [
        "Automation helps businesses create systems that continue working even when the team is offline. From lead nurturing and email sequences to CRM actions and follow-up flows, automation reduces repetitive work while improving consistency across the customer journey.",
        "When used correctly, automation does not make marketing feel robotic. Instead, it ensures that the right message reaches the right person at the right stage. This improves response speed, reduces missed opportunities, and allows teams to focus on strategy instead of manual execution.",
        "For scaling businesses, automation creates structure. It transforms scattered tasks into a dependable process, helping operations become faster, cleaner, and easier to manage over time.",
    ],
    strategy: [
        "Business strategy gives direction to growth. It helps companies understand where they are positioned, what opportunity they are pursuing, and how their marketing, sales, and product efforts should support one another.",
        "A strong strategy clarifies more than goals. It defines priorities, sharpens positioning, and reduces confusion when decisions need to be made quickly. This is especially important for brands entering competitive markets or trying to scale without losing focus.",
        "The result is not just a better plan on paper. Good strategy makes execution more effective because every campaign, offer, and channel decision is connected to a larger business objective.",
    ],
    seo: [
        "SEO and content work together to build visibility that grows over time. Search optimization helps businesses appear when users are actively looking for solutions, while strong content gives those users a reason to trust, engage, and convert.",
        "The most effective SEO is not limited to keywords. It includes search intent, technical structure, authority building, internal linking, and content quality. When these elements work together, websites become easier to discover and more useful to visitors.",
        "For businesses that want sustainable inbound growth, SEO and content provide compounding value. Unlike short-term spikes from paid campaigns, they help create a long-lasting discovery engine that continues attracting qualified traffic.",
    ],
    social: [
        "Social media is most valuable when it builds trust, attention, and connection around a brand. It is not only a publishing channel, but also a space where businesses can shape perception, stay visible, and create stronger audience relationships.",
        "The difference between average and effective social media usually comes down to consistency and relevance. Content should reflect brand identity, speak to the audience's interests, and guide engagement toward meaningful actions rather than vanity metrics alone.",
        "For modern brands, social media can become a growth asset when it supports awareness, community building, and conversion together. It works best when content strategy and business goals are aligned.",
    ],
    ecommerce: [
        "E-commerce growth depends on more than traffic. To scale effectively, brands need stronger product positioning, better shopping experiences, higher conversion rates, and systems that increase repeat purchases over time.",
        "A successful e-commerce strategy usually combines acquisition, retention, and optimization. That means not only attracting buyers, but also improving product pages, reducing friction in checkout, recovering abandoned carts, and building post-purchase loyalty.",
        "When these elements come together, online stores become more resilient and profitable. Growth becomes easier to sustain because each visitor has a better chance of becoming both a customer and a returning buyer.",
    ],
    data: [
        "Data analytics helps businesses move from assumptions to informed decisions. It reveals what is happening across campaigns, funnels, and customer journeys so teams can identify patterns, inefficiencies, and opportunities with greater confidence.",
        "The real power of analytics comes from interpretation, not just reporting. Metrics become valuable when they explain why a result is happening and what action should be taken next. This makes dashboards, attribution models, and customer insights far more useful for strategy.",
        "For growth-focused businesses, analytics improves clarity. It helps prioritize better, spend smarter, and create systems where decisions are supported by evidence rather than intuition alone.",
    ],
    email: [
        "Email marketing remains one of the most dependable channels for nurturing leads and increasing customer lifetime value. Because the audience is owned rather than rented, it gives brands more control over communication and long-term relationship building.",
        "Effective email strategy goes far beyond newsletters. It includes segmentation, automated sequences, personalized offers, lifecycle messaging, and consistent testing. These elements make communication more relevant and improve the likelihood of action.",
        "For businesses that want stronger retention and better conversion from existing audiences, email marketing offers both stability and scale. It creates a direct line to the customer that can keep delivering value over time.",
    ],
};

const categoryArticleExtensions = {
    ai: [
        "Another important advantage of AI marketing is adaptability. As user behavior shifts, offers evolve, or platforms change their rules, AI-assisted systems can help teams respond faster with better recommendations. This keeps execution flexible while reducing the delay between insight and action.",
        "Over time, AI marketing can also improve internal efficiency. Teams spend less time on repetitive tasks and more time on higher-value work such as strategy, creative direction, and customer experience design. That balance often leads to stronger performance and better long-term scalability.",
    ],
    growth: [
        "What makes growth strategy effective is not the novelty of the tactic, but the clarity of the process behind it. Businesses that grow well usually document their learning, refine their experiments, and build repeatable systems from successful tests rather than chasing constant reinvention.",
        "This creates a healthier path to scale. Instead of depending on one lucky campaign, the business develops a reliable framework for attracting attention, increasing conversions, and improving customer value in a way that can be repeated over time.",
    ],
    performance: [
        "Performance marketing also improves strategic clarity across teams. When campaigns are measured carefully, it becomes easier to see how messaging, landing pages, and channel choices affect results. This helps leadership make sharper decisions about where to invest and where to improve.",
        "In the long run, strong performance marketing does more than generate leads. It builds a disciplined growth engine where every campaign teaches something useful, every improvement compounds, and every budget decision becomes more informed than the last.",
    ],
    automation: [
        "Automation also helps remove friction from internal operations. Sales, support, and marketing teams can work from cleaner systems with fewer handoff errors, more timely updates, and more predictable workflows. This reduces operational stress while improving the customer experience.",
        "As a business grows, this becomes increasingly valuable. Manual processes that work for a small team often become bottlenecks at scale, but automation makes it possible to expand without losing consistency, speed, or quality in execution.",
    ],
    strategy: [
        "Business strategy also creates alignment. It ensures that product decisions, campaign planning, audience targeting, and revenue goals are moving in the same direction instead of competing for attention. That alignment can make execution much more efficient.",
        "When teams operate with strategic clarity, they tend to move faster and with less waste. The business gains a stronger sense of identity, a better understanding of market opportunity, and a more focused path toward sustainable growth.",
    ],
    seo: [
        "Strong SEO and content strategy also improve trust. When users consistently discover useful, relevant information from a brand, they begin to see that brand as a reliable source instead of just another company trying to sell something quickly.",
        "That trust has long-term value. It supports stronger rankings, better engagement, and more qualified leads because the business is not only being found more often, but also being understood more clearly when visitors arrive.",
    ],
    social: [
        "Social media also gives brands a fast feedback loop. Reactions, comments, saves, shares, and direct messages can reveal what resonates with the audience and what fails to connect. That insight can strengthen both content quality and broader marketing decisions.",
        "Over time, a well-managed social presence becomes a brand asset. It supports discovery, reinforces credibility, and helps businesses stay culturally relevant in a way that static marketing channels often cannot achieve alone.",
    ],
    ecommerce: [
        "E-commerce performance also depends on customer confidence. Shoppers need clarity around value, ease in navigation, and fewer reasons to hesitate before purchase. The brands that grow consistently are usually the ones that make buying feel simple and trustworthy.",
        "As these systems improve, the business becomes stronger beyond a single campaign. Better retention, better experience, and better conversion flow create a compounding effect that makes growth more profitable and easier to sustain.",
    ],
    data: [
        "Analytics also help businesses identify hidden patterns that are easy to miss in day-to-day execution. It can reveal which audiences have stronger lifetime value, which channels create better downstream outcomes, and which parts of the journey are slowing performance.",
        "When teams learn to use analytics as a decision tool rather than a reporting exercise, the value increases significantly. Data becomes something that actively shapes growth rather than something that is reviewed after the fact.",
    ],
    email: [
        "Email marketing is also powerful because it supports different stages of the customer lifecycle. The same channel can educate new leads, recover nearly-lost opportunities, activate inactive users, and strengthen loyalty among existing customers.",
        "As a result, email often becomes one of the most efficient long-term assets in a business. It is cost-effective, measurable, and highly adaptable, making it useful not just for campaigns, but for sustained relationship building and revenue growth.",
    ],
};

const blogLongFormArticles = {
    "How AI Is Transforming Paid Ads in 2026": [
        "Artificial intelligence is changing paid advertising from a reactive activity into a proactive growth system. In earlier models, marketers often relied on manual observation, delayed reports, and broad audience assumptions to optimize campaigns. In 2026, that approach is no longer enough. AI allows brands to detect patterns faster, process large volumes of performance data, and improve campaign decisions in near real time.",
        "One of the most important changes is the way targeting has evolved. Instead of relying only on static interest groups or basic demographic filters, AI can evaluate behavior signals, browsing intent, historical actions, and engagement quality to identify audiences with stronger conversion potential. This improves not only campaign reach but also the efficiency of spend, because the budget is directed toward users who are more likely to take meaningful action.",
        "Creative strategy has also become more dynamic. AI systems can support testing across multiple ad variations, messaging angles, and visual combinations much faster than traditional workflows. This gives teams a clearer understanding of what language resonates, which offers create urgency, and which formats perform best across channels. As a result, creative production becomes more informed, iterative, and commercially effective.",
        "Budget management is another area where AI is creating significant value. Rather than waiting for underperformance to become visible after a campaign has already lost momentum, AI-assisted optimization can adjust bids, identify inefficient segments, and shift attention toward better-performing variables much earlier. This makes performance management more disciplined and reduces the amount of spend lost to slow decision-making.",
        "For modern growth teams, the true benefit of AI in paid ads is not automation alone. It is the combination of speed, clarity, and better judgment. Brands that use AI well are able to build campaigns that learn faster, adapt faster, and scale with more confidence. In a market where acquisition costs are rising and competition is tightening, that advantage can make the difference between expensive visibility and profitable growth.",
    ],
    "7 Proven Growth Hacks That Still Work in 2026": [
        "Growth in 2026 is less about chasing trends and more about applying repeatable principles with discipline. The most effective growth tactics are usually not the loudest ones. They are the ones that remove friction, sharpen value communication, improve conversion flow, and create momentum through small but measurable wins.",
        "Many brands make the mistake of treating growth hacks as isolated tricks. In reality, growth works best when tactics are connected to a broader system. A landing page optimization, a stronger call to action, a better onboarding sequence, or a smarter retargeting flow may seem like small changes individually, but together they create meaningful lifts in customer acquisition and conversion.",
        "Another reason proven growth tactics continue to work is that they are rooted in customer psychology. Users still respond to clarity, speed, trust, relevance, and ease of decision-making. Businesses that improve these factors consistently tend to outperform those that focus only on reach or short-term visibility.",
        "In practical terms, strong growth execution means testing carefully, measuring honestly, and scaling only what shows evidence of impact. Teams that document learning and build systems around what works create more reliable results than teams that constantly restart from zero with unproven tactics.",
        "The real value of proven growth hacks is not novelty, but leverage. They help brands improve outcomes without always requiring bigger budgets. When combined with good analytics and a clear growth objective, these strategies become a durable part of how a business scales.",
    ],
    "The New Performance Marketing Playbook": [
        "Performance marketing today is no longer defined only by campaign launch and reporting. It is defined by how quickly a team can learn, adapt, and improve outcomes in an environment where customer attention is expensive and platform competition is high. The new playbook is built on precision, accountability, and continuous optimization.",
        "At the center of this approach is a clear link between spending and business results. Strong performance marketing does not stop at impressions or clicks. It measures the quality of leads, the strength of conversion paths, the efficiency of landing pages, and the long-term value of acquired customers. This allows marketers to judge campaigns based on commercial impact rather than surface-level activity.",
        "Modern performance strategy also depends on better integration across creative, targeting, and analytics. Campaign results improve when ad messaging is aligned with audience intent, when landing pages match the promise of the creative, and when reporting systems reveal which variables are truly influencing performance. This makes optimization more intelligent and less fragmented.",
        "Another major shift is the importance of speed. Markets move quickly, and winning teams are the ones that can identify underperformance early, test new directions fast, and scale what works with confidence. The role of strategy is not just to launch campaigns, but to build a framework where decisions become sharper with every cycle of data.",
        "A strong performance marketing playbook therefore acts like an operating system for growth. It brings structure to acquisition, discipline to budget decisions, and clarity to execution. For brands that want profitable scale rather than random bursts of traffic, that structured approach is what turns paid marketing into a true growth engine.",
    ],
};

function getBlogArticleParagraphs(blog) {
    if (!blog) return [];

    if (blogLongFormArticles[blog.title]) {
        return blogLongFormArticles[blog.title];
    }

    return [
        `${blog.title} is an important topic for businesses that want to grow with more clarity, stronger execution, and better long-term results. In practice, the subject goes beyond theory because it directly affects how brands attract attention, communicate value, and turn interest into action.`,
        `A major reason this topic matters is that modern growth depends on systems, not isolated tactics. ${blog.content || "Businesses need strategies that connect positioning, messaging, customer experience, and performance measurement."} When these elements work together, outcomes become more consistent and easier to improve over time.`,
        `Professional teams also benefit from approaching this subject with structure. Rather than relying on assumptions, they define goals clearly, measure progress carefully, and identify the points where stronger execution can create a visible business impact. This leads to better decisions and more efficient use of resources.`,
        `From a strategic perspective, the value of this area often becomes more obvious as a business scales. Complexity increases with growth, and brands that build stronger frameworks early are usually better prepared to compete, adapt, and maintain quality while expanding their reach.`,
        `Ultimately, the goal is not only to understand the topic but to apply it in a way that improves real outcomes. A thoughtful, professional approach creates stronger marketing, sharper operations, and a more dependable path toward sustainable business growth.`,
    ];
}

const filterButtons = [
    { id: "all", label: "All Articles", icon: BookOpen, count: 42 },
    ...categoryDetails.map(({ id, label, icon, count }) => ({ id, label, icon, count })),
];

const navItems = [
    "Home",
    "About us",
    "About the Founder",
    "Industries We Serve",
    "Case Studies",
    "Awards & Recognitions",
    "Contact Us",
    "Our Services",
    "AI SOLUTIONS",
    "Blog",
    "Careers",
    "Terms & Conditions",
    "Privacy Policy",
    "Cookie Policy",
    "Copyright Policy",
];

const topicTags = [
    "AI Marketing",
    "Growth Strategy",
    "Conversion Optimization",
    "Marketing Automation",
    "Paid Ads",
    "SEO",
    "Analytics",
    "Branding",
    "Content Strategy",
    "E-commerce",
    "Lead Generation",
    "Email Marketing",
];

function CategoryDetailCard({ category, onExplore }) {
    const Icon = category.icon;
    const lightIconColor = category.iconColor.replace('600', '400').replace('500', '400');

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group relative flex h-[300px] w-full flex-col overflow-hidden rounded-xl bg-slate-900 shadow-md cursor-pointer"
            onClick={() => onExplore(category)}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
            />

            {/* Gradient overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Darken slightly on hover */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col p-6">

                {/* Bottom Content Area */}
                <div className="mt-auto flex flex-col">
                    <h3 className="mb-2 text-xl font-bold leading-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
                        {category.title}
                    </h3>

                    {/* Description is always visible */}
                    <p className="text-sm leading-relaxed text-slate-300 line-clamp-3 transition-transform duration-500 group-hover:-translate-y-1">
                        {category.description}
                    </p>

                    {/* Extra Content slides in on hover */}
                    <div className="max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[200px] group-hover:opacity-100">
                        <div className="overflow-hidden pt-4">
                            <ul className="mb-6 space-y-2 text-sm font-medium text-slate-200">
                                {category.learnPoints.map((point) => (
                                    <li key={point} className="flex items-start gap-2">
                                        <ArrowRight size={14} className={`mt-1 shrink-0 ${lightIconColor}`} />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={(e) => { e.stopPropagation(); onExplore(category); }}
                                className="inline-flex items-center gap-2 text-sm font-bold text-white transition-all hover:gap-3"
                            >
                                Explore Now <ArrowRight size={16} className={lightIconColor} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function EnhancedBlogCard({ blog, index, onRead }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [controls, isInView]);

    const image = blog?.image?.startsWith?.("http")
        ? blog.image
        : blog?.image
            ? `${import.meta.env.VITE_SERVER_URL}${blog.image}`
            : fallbackBlogs[index % fallbackBlogs.length].image;

    return (
        <motion.div
            ref={ref}
            onClick={() => onRead && onRead(blog)}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.1 },
                },
            }}
            className="group relative flex h-[320px] w-full flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Gradient Overlay: clear at the top so image is fully visible, dark at bottom for text. Expands on hover */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent transition-all duration-500 group-hover:h-full group-hover:via-slate-900/90" />

            <div className="relative z-10 flex h-full flex-col p-6">

                {/* Category Badge with NO background color, just a premium glass border */}
                <div className="mb-auto w-fit rounded-lg border border-white/40 bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors group-hover:bg-white/20">
                    {blog.category || "INSIGHTS"}
                </div>

                {/* Bottom Reveal Area */}
                <div className="mt-auto flex flex-col">
                    <h3 className="mb-3 text-xl font-bold leading-tight text-white transition-transform duration-500 group-hover:-translate-y-2 line-clamp-2">
                        {blog.title}
                    </h3>

                    {/* Description is now always visible */}
                    <p className="mb-4 text-sm leading-relaxed text-slate-300 line-clamp-2 transition-transform duration-500 group-hover:-translate-y-2">
                        {blog.content}
                    </p>

                    {/* Clean Footer is now always visible */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-auto transition-transform duration-500 group-hover:-translate-y-2">
                        <span className="text-white font-semibold">{blog.author || "AI Growth Exa Team"}</span>
                        <span>&middot;</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>&middot;</span>
                        <span>{blog.readTime || "5 min read"}</span>
                    </div>

                    {/* Expandable Read More option on hover */}
                    <div className="max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[40px] group-hover:opacity-100">
                        <div className="overflow-hidden pt-3">
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-400">
                                Read full article <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function BlogInsights() {
    const location = useLocation();
    const [activeFilter, setActiveFilter] = useState("all");
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllFeatured, setShowAllFeatured] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get("/blogs");
                const data = Array.isArray(response.data) && response.data.length ? response.data : fallbackBlogs;
                setBlogs(data);
            } catch (error) {
                setBlogs(fallbackBlogs);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleSubscribe = async () => {
        if (!email) {
            alert("Please enter your work email");
            return;
        }

        try {
            await api.post("/subscribe", { email });
            alert("Subscribed successfully");
            setEmail("");
        } catch (err) {
            alert(err.response?.data?.message || "Subscription failed");
        }
    };

    const filteredCategories = useMemo(() => {
        if (activeFilter === "all") return categoryDetails;
        return categoryDetails.filter((cat) => cat.id === activeFilter);
    }, [activeFilter]);

    const filteredBlogs = useMemo(() => {
        if (!searchQuery.trim()) return blogs;
        return blogs.filter((blog) =>
            `${blog.title} ${blog.content} ${blog.author}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [blogs, searchQuery]);

    return (
        <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
            <section
                className="relative min-h-screen overflow-hidden border-b border-slate-200/50 flex items-center"
            >
                {/* Background Video */}
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="/mp_%20(3).mp4" type="video/mp4" />
                </video>
                {/* Dark overlay over the video */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/88 via-[#0b1120]/54 to-[#1a1060]/16" />
                {/* Glow blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:py-0">
                    <div className="grid items-center gap-12 lg:grid-cols-1">

                        {/* LEFT - Text Content */}
                        <div className="mt-6 max-w-3xl md:mt-10">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#081225]/38 px-4 py-1.5 backdrop-blur-sm"
                            >
                                <span className="text-yellow-400">✦</span>
                                <span className="text-sm font-semibold text-white">Latest Insights &amp; Strategies</span>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="max-w-[11ch] text-4xl font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(2,6,23,0.7)] md:text-5xl lg:text-6xl"
                                style={{ textWrap: 'balance' }}
                            >
                                Insights That{" "}
                                <span className="bg-gradient-to-r from-blue-800 via-violet-700 to-purple-700 bg-clip-text text-transparent">
                                    Drive Intelligent Growth
                                </span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 max-w-[34rem] text-lg font-semibold leading-[1.7] text-white/95 drop-shadow-[0_5px_16px_rgba(2,6,23,0.7)] md:text-xl"
                                style={{ textWrap: 'balance' }}
                            >
                                Actionable insights, proven strategies, and AI-powered marketing knowledge to help your business scale smarter.
                            </motion.p>

                            {/* Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-10 flex flex-wrap gap-4"
                            >
                                <button
                                    onClick={() => document.getElementById("explore-categories")?.scrollIntoView({ behavior: "smooth" })}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40"
                                >
                                    Explore Articles <ArrowRight size={16} />
                                </button>
                                <button
                                    onClick={() => document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                                >
                                    <Mail size={16} /> Subscribe Now
                                </button>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative">
                <motion.section variants={itemVariants} className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
                    <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)] xl:items-start">
                        <div className="pt-1">
                            <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                                <Sparkles size={13} />
                                WELCOME
                            </div>

                            <h2 className="text-[2.05rem] font-black leading-[1.18] tracking-tight text-slate-950 md:text-[3rem]">
                                Welcome to the
                                <br />
                                Insights Hub of
                                <br />
                                <span className="text-black">AI Growth Exa</span>
                            </h2>

                            <p className="mt-6 text-[14px] leading-8 text-black md:max-w-[320px]">
                                We go beyond the surface to bring you data-backed strategies, real-world case studies,
                                and growth frameworks that deliver measurable results.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {[
                                {
                                    title: "What’s working right now",
                                    desc: "Data-backed strategies that are currently delivering results.",
                                    icon: CheckCircle,
                                    color: "text-emerald-500",
                                    bg: "bg-emerald-50",
                                    line: "bg-emerald-500",
                                },
                                {
                                    title: "What’s next in the game",
                                    desc: "Future trends and emerging opportunities before they trend.",
                                    icon: TrendingUp,
                                    color: "text-blue-500",
                                    bg: "bg-blue-50",
                                    line: "bg-blue-500",
                                },
                                {
                                    title: "What brands must do",
                                    desc: "Actionable steps for sustainable competitive advantage.",
                                    icon: Rocket,
                                    color: "text-violet-500",
                                    bg: "bg-violet-50",
                                    line: "bg-violet-500",
                                },
                            ].map((item) => (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ y: -4 }}
                                    className="flex min-h-[262px] flex-col rounded-[1.45rem] border border-slate-100 bg-white px-6 py-7 shadow-sm"
                                >
                                    <div className={`w-fit rounded-2xl ${item.bg} p-3`}>
                                        <item.icon className={item.color} size={24} />
                                    </div>
                                    <h4 className="mt-8 max-w-[150px] text-[1.15rem] font-black leading-[1.45] text-slate-900">
                                        {item.title}
                                    </h4>
                                    <p className="mt-4 max-w-[165px] text-[14px] leading-8 text-black">{item.desc}</p>
                                    <div className={`mt-auto h-[2px] w-10 rounded-full ${item.line}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <motion.section id="explore-categories" variants={itemVariants} className="mx-auto max-w-7xl px-4 py-8">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-3xl font-bold text-slate-900">Explore by Category</h3>
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                        >
                            {showAllCategories ? "Show less" : "View all categories"} <ArrowRight className={`ml-1 inline transition-transform ${showAllCategories ? '-rotate-90' : ''}`} size={16} />
                        </button>
                    </div>

                    <div className="mb-10 flex flex-wrap gap-3">
                        {filterButtons.map((btn) => {
                            const Icon = btn.icon;
                            const active = activeFilter === btn.id;
                            return (
                                <button
                                    key={btn.id}
                                    onClick={() => setActiveFilter(btn.id)}
                                    className={`flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-all ${active ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100" : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600"
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{btn.label}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{btn.count}</span>
                                </button>
                            );
                        })}
                    </div>

                    <motion.div
                        layout
                        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    >
                        {(showAllCategories ? filteredCategories : filteredCategories.slice(0, 5)).map((category) => (
                            <CategoryDetailCard key={category.id} category={category} onExplore={setSelectedCategory} />
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section variants={itemVariants} className="mx-auto max-w-7xl px-4 py-12">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h3 className="text-3xl font-bold text-slate-900">Featured Insights</h3>
                            <p className="mt-2 text-black">
                                {loading ? "Loading articles..." : "Handpicked articles to fuel your growth journey."}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAllFeatured(!showAllFeatured)}
                            className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                        >
                            {showAllFeatured ? "Show less" : "View all articles"} <ArrowRight className={`ml-1 inline transition-transform ${showAllFeatured ? '-rotate-90' : ''}`} size={16} />
                        </button>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {(showAllFeatured ? filteredBlogs : filteredBlogs.slice(0, 3)).map((blog, index) => (
                            <EnhancedBlogCard key={blog._id || index} blog={blog} index={index} onRead={setSelectedBlog} />
                        ))}
                    </div>
                </motion.section>

                {/* Popular Topics */}
                <motion.section variants={itemVariants} className="mx-auto max-w-7xl px-4 py-10">
                    <h3 className="mb-6 text-2xl font-bold text-slate-900">Popular Topics</h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: "AI Marketing", icon: Brain, color: "text-blue-600", bg: "bg-blue-50", url: "https://en.wikipedia.org/wiki/Artificial_intelligence_marketing" },
                            { label: "Growth Strategy", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", url: "https://en.wikipedia.org/wiki/Growth_hacking" },
                            { label: "Conversion Optimization", icon: Target, color: "text-orange-500", bg: "bg-orange-50", url: "https://en.wikipedia.org/wiki/Conversion_marketing" },
                            { label: "Marketing Automation", icon: Settings, color: "text-violet-600", bg: "bg-violet-50", url: "https://en.wikipedia.org/wiki/Marketing_automation" },
                            { label: "Paid Ads", icon: DollarSign, color: "text-pink-500", bg: "bg-pink-50", url: "https://en.wikipedia.org/wiki/Online_advertising" },
                            { label: "SEO", icon: Globe, color: "text-teal-600", bg: "bg-teal-50", url: "https://en.wikipedia.org/wiki/Search_engine_optimization" },
                            { label: "Analytics", icon: BarChart, color: "text-indigo-600", bg: "bg-indigo-50", url: "https://en.wikipedia.org/wiki/Analytics" },
                            { label: "Branding", icon: Sparkles, color: "text-yellow-500", bg: "bg-yellow-50", url: "https://en.wikipedia.org/wiki/Brand" },
                            { label: "Content Strategy", icon: FileText, color: "text-slate-600", bg: "bg-slate-100", url: "https://en.wikipedia.org/wiki/Content_strategy" },
                            { label: "E-commerce", icon: ShoppingCart, color: "text-red-500", bg: "bg-red-50", url: "https://en.wikipedia.org/wiki/E-commerce" },
                            { label: "Lead Generation", icon: Users, color: "text-cyan-600", bg: "bg-cyan-50", url: "https://en.wikipedia.org/wiki/Lead_generation" },
                            { label: "Social Media", icon: Share2, color: "text-purple-500", bg: "bg-purple-50", url: "https://en.wikipedia.org/wiki/Social_media_marketing" },
                            { label: "Email Marketing", icon: Mail, color: "text-blue-500", bg: "bg-blue-50", url: "https://en.wikipedia.org/wiki/Email_marketing" },
                            { label: "Sales Funnel", icon: Bookmark, color: "text-emerald-600", bg: "bg-emerald-50", url: "https://en.wikipedia.org/wiki/Purchase_funnel" },
                            { label: "UX/UI Design", icon: Smartphone, color: "text-rose-500", bg: "bg-rose-50", url: "https://en.wikipedia.org/wiki/User_experience_design" },
                        ].map(({ label, icon: Icon, color, bg, url }) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-black shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                            >
                                <span className={`inline-flex rounded-md ${bg} p-1`}>
                                    <Icon size={14} className={color} />
                                </span>
                                {label}
                            </a>
                        ))}
                    </div>
                </motion.section>

                {/* Stay Ahead of the Curve - Newsletter */}
                <motion.section id="newsletter" variants={itemVariants} className="mx-auto max-w-7xl px-4 py-6">
                    <div className="rounded-3xl bg-[#0f1535] p-8 text-white shadow-2xl lg:p-10">
                        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
                            <div className="flex items-start gap-6">
                                <div className="shrink-0 rounded-full bg-white/10 p-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold leading-tight">Stay Ahead of the Curve</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                                        Get actionable growth insights, strategies, and frameworks straight to your inbox.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-grow rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-violet-500 transition"
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        className="rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-900/50"
                                    >
                                        Subscribe Now
                                    </button>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-5 text-xs font-medium text-white/60">
                                    <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> No spam</span>
                                    <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> Unsubscribe anytime</span>
                                    <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> Weekly insights</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Explore More - horizontal 5 cards */}
                <motion.section variants={itemVariants} className="mx-auto max-w-7xl px-4 pb-20 pt-6">
                    <h3 className="mb-6 text-2xl font-bold text-slate-900">Explore More</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {[
                            { title: "Case Studies", text: "Real results. Real businesses. Real growth.", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", url: "https://en.wikipedia.org/wiki/Case_study" },
                            { title: "Resources", text: "Guides, templates & tools to scale smarter.", icon: FileText, color: "text-violet-600", bg: "bg-violet-50", url: "https://en.wikipedia.org/wiki/Resource" },
                            { title: "Webinars", text: "Learn from experts. Grow your knowledge.", icon: Sparkles, color: "text-pink-500", bg: "bg-pink-50", url: "https://en.wikipedia.org/wiki/Webinar" },
                            { title: "Free Tools", text: "AI-powered tools to boost your productivity.", icon: Cpu, color: "text-orange-500", bg: "bg-orange-50", url: "https://en.wikipedia.org/wiki/Free_software" },
                            { title: "Glossary", text: "Marketing terms explained simply.", icon: BookOpen, color: "text-teal-600", bg: "bg-teal-50", url: "https://en.wikipedia.org/wiki/Glossary" },
                        ].map((item) => (
                            <a
                                key={item.title}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                            >
                                <div className={`inline-flex w-fit rounded-xl ${item.bg} p-3 ${item.color}`}>
                                    <item.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                                    <p className="mt-1 text-sm leading-relaxed text-black">{item.text}</p>
                                </div>
                                <span className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-transform group-hover:translate-x-1">
                                    <ArrowRight size={15} />
                                </span>
                            </a>
                        ))}
                    </div>
                </motion.section>

                <AnimatePresence>
                    {selectedCategory && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCategory(null)}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl custom-scrollbar"
                            >
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="absolute right-6 top-6 z-10 rounded-full bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-8 sm:p-12">
                                    <h3 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                                        {selectedCategory.title}
                                    </h3>
                                    <div className="mb-8 h-1 w-20 rounded-full bg-blue-600/80" />
                                    <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
                                        {[
                                            ...(categoryArticles[selectedCategory.id] || [
                                                selectedCategory.description,
                                                "This topic plays an important role in modern growth strategy because it helps businesses create better systems, communicate more clearly, and improve results in a structured way.",
                                                "When applied properly, these ideas can strengthen visibility, performance, and long-term business decision-making.",
                                            ]),
                                            ...(categoryArticleExtensions[selectedCategory.id] || [
                                                "This subject also becomes more valuable as a business grows, because complexity increases with scale and clearer systems become more important.",
                                                "A deeper understanding of this area helps brands make smarter decisions, improve execution quality, and build a stronger foundation for long-term growth.",
                                            ]),
                                        ].map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Blog Detail Modal */}
                <AnimatePresence>
                    {selectedBlog && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedBlog(null)}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl custom-scrollbar"
                            >
                                <button
                                    onClick={() => setSelectedBlog(null)}
                                    className="absolute right-6 top-6 z-20 rounded-full bg-slate-900/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-slate-900/70"
                                >
                                    <X size={24} />
                                </button>
                                <div className="p-8 sm:p-12">
                                    <h3 className="mb-6 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                                        {selectedBlog.title}
                                    </h3>

                                    <div className="mb-8 flex items-center gap-4 text-sm font-medium text-slate-500 border-b border-slate-100 pb-8">
                                        <span className="text-slate-800 font-semibold">{selectedBlog.author || "AI Growth Exa Team"}</span>
                                        <span>&middot;</span>
                                        <span>{new Date(selectedBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        <span>&middot;</span>
                                        <span>{selectedBlog.readTime || "5 min read"}</span>
                                    </div>

                                    <div className="prose prose-lg prose-slate max-w-none">
                                        <div className="space-y-6 text-lg leading-8 text-slate-700">
                                            {getBlogArticleParagraphs(selectedBlog).map((paragraph, index) => (
                                                <p key={index} className="whitespace-pre-wrap">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
}

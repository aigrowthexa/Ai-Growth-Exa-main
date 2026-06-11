import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Megaphone,
    Settings,
    TrendingUp,
    Rocket,
    Box,
    PieChart,
    Database,
    Users,
    Target,
    ShieldCheck,
    ArrowRight,
    Check,
    Tag,
    Brain,
    Laptop,
    Zap,
    TrendingDown,
    Activity,
    Lock,
    X
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const processSteps = [
    {
        title: "Analyze",
        description: ["Understand data", "& patterns"],
        icon: Brain,
        iconClasses: "bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-[0_10px_24px_rgba(99,102,241,0.24)]",
    },
    {
        title: "Predict",
        description: ["Forecast trends", "& behaviors"],
        icon: Target,
        iconClasses: "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-[0_10px_24px_rgba(59,130,246,0.24)]",
    },
    {
        title: "Automate",
        description: ["Execute & optimize", "repetitive tasks"],
        icon: null,
        isCenter: true,
    },
    {
        title: "Optimize",
        description: ["Improve outcomes", "in real-time"],
        icon: Settings,
        iconClasses: "bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-[0_10px_24px_rgba(79,70,229,0.2)]",
    },
    {
        title: "Scale",
        description: ["Sustainable", "business growth"],
        icon: Activity,
        iconClasses: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_10px_24px_rgba(168,85,247,0.2)]",
    },
];

const coreSolutions = [
    {
        id: "1",
        title: "AI-Based Marketing",
        description: "Smarter campaigns, better targeting, reduced wasted spend, and improved ROI.",
        modal: {
            eyebrow: "AI-Driven Demand Generation",
            headline: "Build campaigns that learn faster, target better, and convert more consistently.",
            intro: "This solution focuses on replacing guesswork with live performance intelligence. We use audience signals, creative testing, funnel behavior, and campaign feedback loops to improve results continuously instead of relying on fixed assumptions.",
            sections: [
                {
                    title: "What this includes",
                    paragraphs: [
                        "We structure AI-assisted campaign systems across paid media, messaging, landing pages, and retargeting so the full acquisition journey works together.",
                        "That means we do not treat ads, content, and conversion pages as separate pieces. Each part feeds performance insight back into the system so the next decision is sharper than the last one.",
                    ],
                    bullets: [
                        "Audience research with intent-based segmentation",
                        "Creative angle testing and message optimization",
                        "Budget allocation based on performance signals",
                        "Lead-quality tracking across the funnel",
                    ],
                },
                {
                    title: "How it helps your business",
                    paragraphs: [
                        "Instead of scaling spend blindly, we identify which channels, creatives, and audience groups actually move revenue. That gives your team clearer decisions and a more efficient growth engine.",
                        "Over time, this creates a more stable acquisition model where improvements are measured, documented, and repeated rather than rediscovered every month.",
                    ],
                    bullets: [
                        "Lower wasted ad spend",
                        "Better lead relevance and conversion intent",
                        "Faster optimization cycles",
                        "More reliable ROI visibility",
                    ],
                },
                {
                    title: "Where this works best",
                    paragraphs: [
                        "AI-Based Marketing is especially useful for businesses that already invest in campaigns but need better conversion quality, stronger reporting clarity, or more confidence in where budget should go next.",
                        "It also helps teams that want faster experimentation without losing discipline around performance measurement and commercial outcomes.",
                    ],
                    bullets: [
                        "Growth-stage brands running multi-channel campaigns",
                        "Teams that need stronger demand-generation clarity",
                        "Founders who want better visibility into ad efficiency",
                        "Businesses preparing to scale acquisition spend",
                    ],
                },
            ],
        },
        icon: Megaphone,
        iconClasses: "bg-gradient-to-br from-violet-500 to-indigo-600 text-white",
        badgeClasses: "border-violet-100 bg-violet-50 text-violet-600",
        hoverTextClasses: "group-hover:text-violet-600",
        arrowClasses: "group-hover:border-violet-600 group-hover:bg-violet-600",
    },
    {
        id: "2",
        title: "Automation Systems",
        description: "Lead capture, CRM workflows, email, WhatsApp follow-ups, and funnel automation.",
        modal: {
            eyebrow: "Workflow Automation",
            headline: "Connect your leads, follow-ups, and internal actions into one reliable system.",
            intro: "Automation Systems are built to remove repetitive manual work without losing control. We map the customer journey, define triggers, and create workflows that keep leads moving even when your team is busy.",
            sections: [
                {
                    title: "What this includes",
                    paragraphs: [
                        "We connect forms, CRM stages, notifications, email journeys, WhatsApp sequences, and internal tasks so every lead is routed and followed up properly.",
                        "The system is designed around your actual process, not a generic template. That matters because automation only works when it reflects how your sales and marketing teams really operate.",
                    ],
                    bullets: [
                        "Lead capture and qualification workflows",
                        "CRM stage automation and assignment logic",
                        "Email and WhatsApp nurturing sequences",
                        "Internal reminders, alerts, and handoff rules",
                    ],
                },
                {
                    title: "Why it matters",
                    paragraphs: [
                        "Most growth teams do not lose leads because of weak demand alone. They lose them in follow-up delays, missed handoffs, and inconsistent operations. Automation closes those gaps and keeps execution disciplined.",
                        "It also gives leadership more confidence that important actions are happening on time, even when the team is juggling multiple campaigns, channels, and conversations at once.",
                    ],
                    bullets: [
                        "Faster response time",
                        "Fewer manual errors",
                        "Consistent follow-up at scale",
                        "Higher operational clarity for the team",
                    ],
                },
                {
                    title: "Operational impact",
                    paragraphs: [
                        "A good automation layer makes your business feel more responsive without forcing people to work harder. Repetitive coordination moves into the system so the team can focus on judgment-heavy work.",
                        "That usually improves both lead experience and internal efficiency because fewer opportunities get stuck between tools, messages, or team handoffs.",
                    ],
                    bullets: [
                        "Cleaner ownership across funnel stages",
                        "Less dependency on manual reminders",
                        "Better process consistency during scale",
                        "Improved visibility across lead movement",
                    ],
                },
            ],
        },
        icon: Settings,
        iconClasses: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
        badgeClasses: "border-blue-100 bg-blue-50 text-blue-600",
        hoverTextClasses: "group-hover:text-blue-600",
        arrowClasses: "group-hover:border-blue-600 group-hover:bg-blue-600",
    },
    {
        id: "3",
        title: "Predictive Analytics",
        description: "Forecast performance, identify drop-offs early, and optimize budgets proactively.",
        modal: {
            eyebrow: "Forecasting and Decision Support",
            headline: "See performance patterns earlier and act before problems become expensive.",
            intro: "Predictive Analytics helps your team move from reactive reporting to proactive decision-making. We analyze campaign behavior, conversion patterns, and drop-off signals to surface what needs attention sooner.",
            sections: [
                {
                    title: "What this includes",
                    paragraphs: [
                        "We combine historical performance, customer behavior, and live channel trends to identify likely outcomes and pressure points across the funnel.",
                        "Rather than waiting for end-of-month summaries, we use trend signals to highlight where momentum is improving, flattening, or starting to break down.",
                    ],
                    bullets: [
                        "Trend detection and performance forecasting",
                        "Drop-off and churn risk identification",
                        "Budget guidance based on outcome probability",
                        "Funnel-stage health monitoring",
                    ],
                },
                {
                    title: "Business value",
                    paragraphs: [
                        "When leaders can spot weak signals early, they can adjust spend, improve messaging, and resolve friction before the loss compounds. That leads to steadier growth and sharper control.",
                        "This kind of visibility is particularly valuable when multiple campaigns and channels are running at once, because issues often start small and become expensive only after they have spread.",
                    ],
                    bullets: [
                        "Earlier course correction",
                        "Better resource allocation",
                        "Improved planning confidence",
                        "Smarter revenue forecasting",
                    ],
                },
                {
                    title: "How teams use it",
                    paragraphs: [
                        "Predictive Analytics becomes most useful when teams tie insight directly to action. Forecasts should influence budget pacing, funnel fixes, offer adjustments, and channel priorities instead of staying inside reporting decks.",
                        "That turns analytics from a descriptive layer into a working part of the growth system.",
                    ],
                    bullets: [
                        "Weekly prioritization with clearer signals",
                        "Stronger confidence in performance planning",
                        "Reduced lag between insight and action",
                        "Better communication between leadership and execution teams",
                    ],
                },
            ],
        },
        icon: TrendingUp,
        iconClasses: "bg-gradient-to-br from-indigo-500 to-violet-600 text-white",
        badgeClasses: "border-indigo-100 bg-indigo-50 text-indigo-600",
        hoverTextClasses: "group-hover:text-indigo-600",
        arrowClasses: "group-hover:border-indigo-600 group-hover:bg-indigo-600",
    },
    {
        id: "4",
        title: "Smart Scaling",
        description: "Scale only what is profitable using AI-powered performance tracking systems.",
        modal: {
            eyebrow: "Profitable Growth Expansion",
            headline: "Scale the parts of your business that are proven, not just visible.",
            intro: "Smart Scaling is about disciplined expansion. Before increasing budget, channels, or markets, we identify what is already working, where margins are healthy, and what needs to be stabilized first.",
            sections: [
                {
                    title: "What this includes",
                    paragraphs: [
                        "We review acquisition efficiency, conversion flow, operational readiness, and reporting visibility so scaling decisions are grounded in actual performance.",
                        "This process helps separate healthy growth from noisy growth. The difference matters because not every increase in volume improves the business.",
                    ],
                    bullets: [
                        "Profitability-focused growth analysis",
                        "Scaling thresholds and readiness checks",
                        "Channel expansion planning",
                        "Performance tracking for controlled growth",
                    ],
                },
                {
                    title: "What you gain",
                    paragraphs: [
                        "The goal is not growth at any cost. The goal is sustainable growth with better control over CAC, conversion quality, and delivery capacity.",
                        "When that foundation is clear, scaling becomes a managed decision instead of a risky leap. Teams know what to push, what to protect, and what to fix first.",
                    ],
                    bullets: [
                        "Stronger scaling confidence",
                        "Reduced margin leakage",
                        "Better operational planning",
                        "More sustainable growth velocity",
                    ],
                },
                {
                    title: "When to use it",
                    paragraphs: [
                        "Smart Scaling is ideal when a business is seeing traction and wants to expand without damaging unit economics, delivery quality, or internal execution rhythm.",
                        "It is also useful when past growth has created complexity and leadership needs a cleaner path forward before investing further.",
                    ],
                    bullets: [
                        "Pre-scale readiness assessment",
                        "Safer expansion into new channels or offers",
                        "Clearer margin protection during growth",
                        "More disciplined decision-making for leadership",
                    ],
                },
            ],
        },
        icon: Rocket,
        iconClasses: "bg-gradient-to-br from-blue-500 to-violet-500 text-white",
        badgeClasses: "border-blue-100 bg-blue-50 text-blue-600",
        hoverTextClasses: "group-hover:text-blue-600",
        arrowClasses: "group-hover:border-blue-600 group-hover:bg-blue-600",
    },
    {
        id: "5",
        title: "LLM Growth Models",
        description: "Personalized messaging, content intelligence, and smarter customer journeys.",
        modal: {
            eyebrow: "Language Model Systems",
            headline: "Use LLMs to improve messaging quality, personalization, and customer experience.",
            intro: "LLM Growth Models help teams create smarter interactions across content, lead nurturing, support, and sales enablement. The focus is on making communication more relevant without turning the brand voice robotic or generic.",
            sections: [
                {
                    title: "What this includes",
                    paragraphs: [
                        "We design use cases where large language models improve speed and consistency while staying aligned with your business goals and customer context.",
                        "The work is not just about generating more text. It is about creating systems that help teams respond faster, personalize better, and keep communication quality high across channels.",
                    ],
                    bullets: [
                        "Personalized message frameworks",
                        "Content acceleration and variation systems",
                        "Customer-journey response assistance",
                        "Internal knowledge support for teams",
                    ],
                },
                {
                    title: "Where it helps most",
                    paragraphs: [
                        "This works especially well when your team needs to communicate at scale but still maintain clarity, relevance, and a strong brand point of view.",
                        "It is also valuable when different departments need a more unified way to create content, assist customers, and support sales conversations without duplicating effort.",
                    ],
                    bullets: [
                        "Improved content relevance",
                        "Faster response and production cycles",
                        "More adaptive customer engagement",
                        "Better consistency across touchpoints",
                    ],
                },
                {
                    title: "Practical outcomes",
                    paragraphs: [
                        "Used well, LLM systems reduce friction across the customer journey. They help people receive clearer answers, more useful content, and better-timed communication at each stage.",
                        "For internal teams, that usually means less repetitive drafting and more time spent on strategy, quality control, and higher-value decisions.",
                    ],
                    bullets: [
                        "Better alignment between brand voice and scale",
                        "More efficient content and support workflows",
                        "Higher usefulness in customer interactions",
                        "Stronger communication consistency across teams",
                    ],
                },
            ],
        },
        icon: Box,
        iconClasses: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
        badgeClasses: "border-fuchsia-100 bg-fuchsia-50 text-fuchsia-600",
        hoverTextClasses: "group-hover:text-fuchsia-600",
        arrowClasses: "group-hover:border-fuchsia-600 group-hover:bg-fuchsia-600",
    },
    {
        id: "6",
        title: "Growth Intelligence",
        description: "Convert raw business data into clear insights and better growth decisions.",
        modal: {
            eyebrow: "Unified Growth Insights",
            headline: "Turn scattered data into a decision system your team can actually use.",
            intro: "Growth Intelligence brings together the numbers, trends, and operational signals that usually live across separate tools. The goal is to give leadership one clearer view of what is driving growth and what is slowing it down.",
            sections: [
                {
                    title: "What this includes",
                    paragraphs: [
                        "We organize dashboards, reporting logic, and interpretation layers so data becomes useful for action, not just presentation.",
                        "That includes deciding which metrics matter most, how they relate to business goals, and how to surface changes in a way that helps teams respond quickly.",
                    ],
                    bullets: [
                        "Cross-channel reporting visibility",
                        "KPI mapping aligned to business goals",
                        "Insight summaries for faster decisions",
                        "Clarity on bottlenecks and opportunities",
                    ],
                },
                {
                    title: "Why teams need it",
                    paragraphs: [
                        "When data is fragmented, teams argue over dashboards instead of fixing performance. Growth Intelligence creates a shared source of truth so strategy, marketing, and operations can move together.",
                        "This reduces confusion, shortens reporting discussions, and helps leaders spend more time making decisions instead of reconciling inconsistent metrics from different systems.",
                    ],
                    bullets: [
                        "Stronger strategic alignment",
                        "Cleaner reporting conversations",
                        "Faster identification of growth blockers",
                        "More confident execution decisions",
                    ],
                },
                {
                    title: "What it improves over time",
                    paragraphs: [
                        "Once reporting is organized properly, the value compounds. Teams start noticing patterns earlier, asking better questions, and aligning action plans around the same performance story.",
                        "That creates a stronger operating rhythm across leadership, marketing, sales, and execution teams.",
                    ],
                    bullets: [
                        "More useful recurring reporting",
                        "Better cross-functional alignment",
                        "Stronger accountability around KPIs",
                        "Faster recognition of opportunities and bottlenecks",
                    ],
                },
            ],
        },
        icon: PieChart,
        iconClasses: "bg-gradient-to-br from-blue-500 to-indigo-500 text-white",
        badgeClasses: "border-blue-100 bg-blue-50 text-blue-600",
        hoverTextClasses: "group-hover:text-blue-600",
        arrowClasses: "group-hover:border-blue-600 group-hover:bg-blue-600",
    },
];

const growthProcessSteps = [
    { id: "01", title: ["Collect", "Business Data"], icon: Database },
    { id: "02", title: ["Analyze Customer", "Behavior"], icon: Users },
    { id: "03", title: ["Automate", "Repetitive Tasks"], icon: Settings },
    { id: "04", title: ["Predict Future", "Outcomes"], icon: TrendingUp },
    { id: "05", title: ["Scale Profitable", "Systems"], icon: Rocket },
];

const detailedSolutions = [
    {
        title: "AI-Based Marketing",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        alt: "AI-Based Marketing Dashboard",
        bullets: [
            "Analyze large datasets instantly",
            "Identify high-intent audiences",
            "Optimize messaging in real time",
            "Reduce wasted ad spend",
        ],
    },
    {
        title: "Automation Systems",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        alt: "Automation Systems Workflow",
        bullets: [
            "Lead capture & qualification",
            "CRM & sales workflows",
            "Email & WhatsApp follow-ups",
            "Funnel-based nurturing",
        ],
    },
    {
        title: "Predictive Analytics",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        alt: "Predictive Analytics Charts",
        bullets: [
            "Forecast campaign performance",
            "Identify drop-off points early",
            "Optimize budgets proactively",
            "Improve customer LTV",
        ],
    },
    {
        title: "Smart Scaling",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
        alt: "Business Smart Scaling",
        bullets: [
            "Strengthen funnels first",
            "Automate critical processes",
            "Use AI to detect saturation",
            "Expand only what is profitable",
        ],
    },
    {
        title: "LLM Growth Models",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80",
        alt: "LLM AI Models",
        bullets: [
            "Personalize messaging at scale",
            "Improve content relevance",
            "Enhance customer journeys",
            "Align marketing + sales",
        ],
    },
    {
        title: "Growth Intelligence",
        image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=900&q=80",
        alt: "Growth Intelligence Dashboard",
        bullets: [
            "Unified business dashboards",
            "Real-time actionable insights",
            "Better growth decisions",
            "Data-driven clarity",
        ],
    },
];

const outcomeHighlights = [
    { title: ["Lower", "Customer", "Acquisition Costs"], icon: Tag, iconClasses: "text-violet-500" },
    { title: ["Faster", "Decision-", "Making"], icon: Rocket, iconClasses: "text-blue-500" },
    { title: ["Scalable", "Growth", "Systems"], icon: TrendingUp, iconClasses: "text-indigo-500" },
    { title: ["Reduced", "Manual", "Dependency"], icon: ShieldCheck, iconClasses: "text-violet-500" },
];

const capabilityCards = [
    {
        title: ["AI vs Traditional", "Marketing Comparison"],
        description: "A clearer look at how AI-led systems outperform manual campaign management in speed, adaptability, and decision quality.",
        subtitle: "See the real difference",
        icon: TrendingUp,
        iconClasses: "bg-gradient-to-br from-blue-500 to-violet-500 text-white",
        modal: {
            eyebrow: "Performance Comparison",
            headline: "Understand where AI-driven marketing creates a real operating advantage.",
            intro: "This comparison is not about trends or buzzwords. It is about how modern growth teams use AI to reduce reaction time, improve targeting precision, and run more adaptive campaign systems than traditional manual workflows allow.",
            sections: [
                {
                    title: "What changes with AI-led execution",
                    paragraphs: [
                        "Traditional marketing often depends on slower review cycles, manual reporting, and delayed optimization. AI-supported systems shorten that loop by surfacing performance signals faster and helping teams act before inefficiency compounds.",
                        "That does not remove human strategy. It gives strategy better inputs and a much stronger execution cadence.",
                    ],
                    bullets: [
                        "Faster performance analysis and decision support",
                        "More adaptive audience, message, and budget tuning",
                        "Lower dependence on manual reporting handoffs",
                        "Better visibility into what is actually driving results",
                    ],
                },
                {
                    title: "Why the comparison matters",
                    paragraphs: [
                        "Many teams are still measuring modern growth challenges with outdated operating models. The result is slower learning, more wasted spend, and fragmented communication between strategy and execution.",
                        "When the comparison is made clearly, leadership can see where AI should be introduced first for the strongest business impact.",
                    ],
                    bullets: [
                        "Clearer prioritization for growth investments",
                        "Stronger alignment between data and execution",
                        "More reliable optimization cycles",
                        "Better readiness for competitive markets",
                    ],
                },
                {
                    title: "What teams usually discover",
                    paragraphs: [
                        "The biggest difference is often not volume, it is responsiveness. AI-powered systems help teams learn and adjust with much more consistency, which creates a compounding advantage over time.",
                        "That usually leads to stronger campaign efficiency, faster experimentation, and better use of internal resources.",
                    ],
                    bullets: [
                        "More efficient campaign learning loops",
                        "Sharper messaging and targeting decisions",
                        "Reduced operational drag in reporting",
                        "Higher confidence in scaling what works",
                    ],
                },
            ],
        },
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        alt: "Marketing comparison analytics dashboard",
    },
    {
        title: ["LLM Growth Model", "Deep-Dive Solutions"],
        description: "A deeper view of how language-model systems support content, sales enablement, and customer communication at scale.",
        subtitle: "Understand our models",
        icon: Brain,
        iconClasses: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
        modal: {
            eyebrow: "LLM Model Deep Dive",
            headline: "See how language models fit into real growth systems, not just content generation.",
            intro: "This deep-dive explains how LLMs can support high-quality communication across marketing, nurture flows, support assistance, and sales enablement. The real value comes from designing useful systems around them, not from using the model in isolation.",
            sections: [
                {
                    title: "How these models are used",
                    paragraphs: [
                        "We apply LLMs where teams need speed, relevance, and consistency at scale. That can include messaging support, content workflows, lead qualification assistance, internal knowledge prompts, and customer-response guidance.",
                        "The aim is to improve output quality while keeping brand context, business goals, and user intent aligned.",
                    ],
                    bullets: [
                        "Faster content and message drafting",
                        "Improved personalization across touchpoints",
                        "Support for lead and customer communication flows",
                        "Reusable internal knowledge assistance for teams",
                    ],
                },
                {
                    title: "What makes the model useful",
                    paragraphs: [
                        "A strong LLM workflow is built with structure. Prompt logic, tone control, business context, and review rules all matter if the output is expected to support growth rather than just fill space.",
                        "When that structure is in place, the model becomes a practical operating layer for communication-heavy teams.",
                    ],
                    bullets: [
                        "More consistent brand voice across channels",
                        "Reduced repetitive content effort",
                        "Higher responsiveness in customer interactions",
                        "Better coordination between marketing and sales teams",
                    ],
                },
                {
                    title: "Where the long-term value comes from",
                    paragraphs: [
                        "The long-term advantage is not only productivity. It is the ability to create better communication systems that stay useful as volume grows.",
                        "That helps teams scale relevance, maintain clarity, and improve customer experience without multiplying manual effort at the same pace.",
                    ],
                    bullets: [
                        "Scalable communication quality",
                        "Better internal efficiency for content-heavy teams",
                        "Stronger customer journey continuity",
                        "More strategic use of team time",
                    ],
                },
            ],
        },
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
        alt: "LLM model and AI intelligence concept",
    },
    {
        title: ["AI-Powered Landing Pages", "for Enterprise Clients"],
        description: "How intelligent landing page systems improve conversion quality, page relevance, and enterprise funnel performance.",
        subtitle: "High-converting & intelligent",
        icon: Laptop,
        iconClasses: "bg-gradient-to-br from-sky-500 to-indigo-600 text-white",
        modal: {
            eyebrow: "Conversion Experience Design",
            headline: "Explore how AI-powered landing pages turn more traffic into qualified action.",
            intro: "AI-powered landing pages are built to do more than look polished. They are designed to respond to user intent, support clearer decision paths, and align page content more closely with the campaign or audience source bringing people in.",
            sections: [
                {
                    title: "What makes these pages different",
                    paragraphs: [
                        "Traditional landing pages are often static and generic. Intelligent landing page systems are more deliberate about message relevance, UX sequencing, conversion cues, and performance feedback.",
                        "That helps the page behave like an active part of the funnel rather than a passive destination.",
                    ],
                    bullets: [
                        "Sharper message-to-audience alignment",
                        "Stronger page structure for conversion flow",
                        "More useful insights from visitor behavior",
                        "Better coordination between campaign and page performance",
                    ],
                },
                {
                    title: "Why enterprise teams care",
                    paragraphs: [
                        "For enterprise or high-value lead funnels, small improvements in page clarity and qualification can create a major downstream impact on pipeline quality and sales efficiency.",
                        "That is why landing pages should be treated as growth systems, not just creative deliverables.",
                    ],
                    bullets: [
                        "Higher conversion quality from paid traffic",
                        "Improved clarity for complex offers",
                        "Better support for multi-step nurture journeys",
                        "Stronger performance visibility across campaigns",
                    ],
                },
                {
                    title: "What the popup is pointing to",
                    paragraphs: [
                        "This heading is about using page intelligence to improve both user experience and commercial performance. The strongest landing pages reduce friction, reinforce trust, and guide visitors toward the next action with more confidence.",
                        "When done well, they support both immediate conversions and stronger long-term funnel performance.",
                    ],
                    bullets: [
                        "Cleaner conversion pathways",
                        "Lower friction in decision-making",
                        "Better matching between traffic intent and page content",
                        "More reliable landing-page contribution to growth",
                    ],
                },
            ],
        },
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80",
        alt: "Landing page design on laptop screen",
    },
];

export default function AISolutions() {
    const pageRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSolution, setActiveSolution] = useState(null);

    const handleOpenContact = () => {
        navigate("/contact", { state: { background: location } });
    };

    const handleOpenServices = () => {
        navigate("/services");
    };

    const handleOpenSolutionModal = (solution) => {
        setActiveSolution(solution);
    };

    const handleOpenDetailedSolutionModal = (title) => {
        const matchingSolution = coreSolutions.find((item) => item.title === title);
        if (matchingSolution) {
            setActiveSolution(matchingSolution);
        }
    };

    const handleOpenCapabilityModal = (card) => {
        setActiveSolution({
            ...card,
            title: card.title.join(" "),
        });
    };

    const handleCardKeyOpen = (event, callback) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            callback();
        }
    };

    const handleCloseSolutionModal = () => {
        setActiveSolution(null);
    };

    useEffect(() => {
        if (!activeSolution) {
            document.body.style.overflow = "";
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                handleCloseSolutionModal();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [activeSolution]);

    useGSAP(() => {
        const heroTimeline = gsap.timeline({
            defaults: {
                duration: 0.85,
                ease: "power3.out",
            },
        });

        heroTimeline.from("[data-gsap-hero-item]", {
            opacity: 0,
            y: 30,
            stagger: 0.12,
        });

        heroTimeline.from(".gsap-hero-visual", {
            opacity: 0,
            scale: 0.92,
            duration: 1,
        }, 0.2);

        gsap.to(".gsap-hero-orbit-1", {
            rotate: 360,
            duration: 20,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
        });

        gsap.to(".gsap-hero-orbit-2", {
            rotate: -360,
            duration: 26,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
        });

        gsap.to(".gsap-hero-orbit-3", {
            rotate: 360,
            duration: 32,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
        });

        gsap.to(".gsap-ai-float", {
            y: -12,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.utils.toArray("[data-gsap-section]").forEach((section) => {
            const items = section.querySelectorAll("[data-gsap-item]");
            if (!items.length) return;

            gsap.set(items, { autoAlpha: 1, y: 0 });

            gsap.fromTo(items,
                {
                    autoAlpha: 0,
                    y: 28,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        once: true,
                        invalidateOnRefresh: true,
                    },
                }
            );
        });

        ScrollTrigger.refresh();
    }, { scope: pageRef });

    return (
        <main ref={pageRef} className="bg-[#f8fafc] text-[#0f172a] overflow-hidden min-h-screen">
            {/* HERO SECTION - Dark Space Cyber Theme */}
            <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#0a1b55_0%,#050716_30%,#03030d_100%)] px-6 pt-24 pb-10 md:pt-28 md:pb-12 lg:min-h-[calc(100svh-4.85rem)] lg:pt-20 lg:pb-4">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#5b7cff10_1px,transparent_1px),linear-gradient(to_bottom,#5b7cff0d_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-y-0 left-0 w-[52%] bg-[linear-gradient(90deg,rgba(3,5,20,0.98)_0%,rgba(3,5,20,0.92)_72%,rgba(3,5,20,0)_100%)]" />
                    <div className="absolute left-[6%] top-[10%] h-56 w-56 rounded-full bg-blue-500/18 blur-[110px]" />
                    <div className="absolute right-[12%] top-[16%] h-72 w-72 rounded-full bg-fuchsia-500/16 blur-[130px]" />
                    <div className="absolute right-[20%] bottom-[8%] h-64 w-64 rounded-full bg-blue-500/16 blur-[120px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_45%,rgba(2,4,15,0.32)_100%)]" />
                </div>

                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[calc(100svh-6.75rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)] lg:gap-5">
                    {/* Left Column Text */}
                    <div className="max-w-[33rem] text-left">
                        <span
                            data-gsap-hero-item
                            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/35 bg-[#06153d]/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-100 shadow-[0_0_0_1px_rgba(59,130,246,0.08),0_0_30px_rgba(37,99,235,0.18)]"
                        >
                            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.85)] animate-pulse" />
                            AI Solutions by AI Growth Exa
                        </span>

                        <h1
                            data-gsap-hero-item
                            className="text-[clamp(2.35rem,4.4vw,4.1rem)] font-extrabold tracking-[-0.055em] text-white leading-[0.94]"
                        >
                            Where Intelligence <br />
                            Meets Scalable <br />
                            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(34,211,238,0.2)]">
                                Growth
                            </span>
                        </h1>

                        <p
                            data-gsap-hero-item
                            className="mt-5 max-w-xl text-base md:text-[1.02rem] leading-[1.65] text-slate-300/95"
                        >
                            AI is not a buzzword. It is the foundation of how we think, plan, automate, and scale growth for modern businesses.
                        </p>

                        {/* CTA Buttons */}
                        <div
                            data-gsap-hero-item
                            className="mt-7 flex flex-wrap gap-3"
                        >
                            <button
                                onClick={handleOpenServices}
                                className="inline-flex min-w-[14.5rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-7 py-3.5 text-sm md:text-base font-bold text-white shadow-[0_14px_40px_rgba(59,130,246,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_46px_rgba(96,165,250,0.4)]"
                            >
                                Explore Services <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleOpenContact}
                                className="inline-flex min-w-[15.75rem] items-center justify-center gap-2 rounded-full border border-violet-400/40 bg-[#050b24]/70 px-7 py-3.5 text-sm md:text-base font-bold text-white shadow-[inset_0_0_0_1px_rgba(99,102,241,0.1)] transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/50 hover:bg-white/5"
                            >
                                Book an AI Strategy Call <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sub-Hero Badges */}
                        <div
                            data-gsap-hero-item
                            className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs md:text-sm font-semibold text-slate-200/90"
                        >
                            <span className="flex items-center gap-2.5 transition-colors duration-200 hover:text-white">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-400/45 bg-[#081338] text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.25)]">
                                    <Check className="w-3.5 h-3.5" />
                                </span>
                                Smarter Decisions
                            </span>
                            <span className="flex items-center gap-2.5 transition-colors duration-200 hover:text-white">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-400/45 bg-[#081338] text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.25)]">
                                    <Check className="w-3.5 h-3.5" />
                                </span>
                                Automate & Scale
                            </span>
                            <span className="flex items-center gap-2.5 transition-colors duration-200 hover:text-white">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-400/45 bg-[#081338] text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.25)]">
                                    <Check className="w-3.5 h-3.5" />
                                </span>
                                Predict with Confidence
                            </span>
                            <span className="flex items-center gap-2.5 transition-colors duration-200 hover:text-white">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-400/45 bg-[#081338] text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.25)]">
                                    <Check className="w-3.5 h-3.5" />
                                </span>
                                Future-Ready Growth
                            </span>
                        </div>
                    </div>

                    {/* Right Column Cyber Hologram Visual */}
                    <div className="gsap-hero-visual relative mt-4 flex min-h-[24rem] w-full items-center justify-center lg:mt-0 lg:min-h-[28rem] xl:min-h-[30rem]">
                        <div className="gsap-hero-orbit-1 absolute bottom-[18%] h-[15rem] w-[24rem] rounded-[999px] border border-violet-400/20 xl:h-[17rem] xl:w-[28rem]" />
                        <div className="gsap-hero-orbit-2 absolute bottom-[21%] h-[11rem] w-[20rem] rounded-[999px] border border-sky-400/20 xl:h-[12rem] xl:w-[22rem]" />
                        <div className="gsap-hero-orbit-3 absolute bottom-[23%] h-[8rem] w-[16rem] rounded-[999px] border border-fuchsia-400/18 xl:h-[9rem] xl:w-[18rem]" />

                        <div className="absolute bottom-[13%] h-16 w-[17rem] rounded-[100%] bg-sky-500/20 blur-[14px] xl:h-20 xl:w-[20rem]" />
                        <div className="absolute bottom-[11%] h-14 w-[20rem] rounded-[100%] border border-sky-400/35 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.38),rgba(23,37,84,0.22),rgba(4,7,22,0.12))] shadow-[0_0_50px_rgba(59,130,246,0.24)] xl:h-16 xl:w-[24rem]" />
                        <div className="absolute bottom-[9%] h-8 w-[22rem] rounded-[100%] border border-violet-400/30 bg-[linear-gradient(180deg,rgba(59,130,246,0.18),rgba(29,78,216,0.08))] shadow-[0_0_50px_rgba(168,85,247,0.22)] xl:h-9 xl:w-[26rem]" />

                        <div className="gsap-ai-float relative z-20 flex select-none items-end justify-center text-center">
                            <span className="bg-gradient-to-b from-sky-200 via-sky-400 to-violet-500 bg-clip-text text-[clamp(3.4rem,7.2vw,6rem)] font-black leading-[0.88] tracking-[-0.06em] text-transparent drop-shadow-[0_12px_40px_rgba(59,130,246,0.35)] xl:text-[clamp(4.2rem,8vw,6.6rem)]">
                                AI <br />
                                Solution
                            </span>
                        </div>

                        <div className="absolute right-[8%] top-[26%] h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(192,132,252,0.9)]" />
                        <div className="absolute right-[19%] top-[48%] h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
                        <div className="absolute right-[14%] bottom-[19%] h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.9)]" />
                    </div>
                </div>
            </section>

            {/* PROCESS + CORE SOLUTIONS SECTION */}
            <section data-gsap-section className="bg-[#f7f9ff] px-6 pt-14 pb-3 md:pt-16 md:pb-4">
                <div className="mx-auto flex max-w-7xl flex-col gap-3">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.45fr] lg:gap-8">
                        <div data-gsap-item className="max-w-md text-left">
                            <h2 className="text-4xl font-extrabold leading-[1.05] text-slate-950 md:text-[3.2rem]">
                                AI Solutions by <br />
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                                    AI Growth Exa
                                </span>
                            </h2>

                            <p className="mt-5 text-[1.02rem] leading-8 text-slate-600">
                                While traditional agencies react to data, we predict, automate, and optimize before problems even appear. Our AI solutions help businesses make smarter decisions, scale without chaos, reduce wasted spend, and build future-ready growth systems.
                            </p>
                        </div>

                        <div data-gsap-item className="w-full">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-7 px-1 pt-1 md:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-1">
                                {processSteps.map((step, index) => {
                                    const StepIcon = step.icon;

                                    return (
                                        <React.Fragment key={step.title}>
                                            <div className={`flex flex-col items-center text-center ${step.isCenter ? 'col-span-2 md:col-span-1 lg:w-[10rem]' : 'lg:w-[7.3rem]'}`}>
                                                {step.isCenter ? (
                                                    <div className="relative flex h-[8rem] w-[8rem] items-center justify-center">
                                                        <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-indigo-700 via-blue-600 to-violet-600 shadow-[0_18px_38px_rgba(59,130,246,0.24)]" />
                                                        <div className="absolute inset-0 rounded-full border border-indigo-300/65" />
                                                        <div className="absolute inset-[-13px] rounded-full border border-violet-300/55" />
                                                        <div className="absolute inset-[-25px] rounded-full border border-blue-300/35" />
                                                        <div className="absolute inset-x-[10%] top-1/2 h-px -translate-y-1/2 bg-indigo-300/70 rotate-[24deg]" />
                                                        <div className="absolute inset-x-[10%] top-1/2 h-px -translate-y-1/2 bg-violet-300/70 -rotate-[24deg]" />
                                                        <div className="absolute left-1/2 inset-y-[10%] w-px -translate-x-1/2 bg-blue-300/70" />
                                                        <div className="absolute inset-y-[10%] left-1/2 w-px -translate-x-1/2 rotate-[90deg] bg-violet-300/60" />
                                                        <span className="relative z-10 text-[2.6rem] font-black tracking-[-0.08em] text-white">AI</span>
                                                    </div>
                                                ) : (
                                                    <div className={`flex h-[4.15rem] w-[4.15rem] items-center justify-center rounded-full border border-white/90 ${step.iconClasses}`}>
                                                        {StepIcon ? <StepIcon className="h-6 w-6" /> : null}
                                                    </div>
                                                )}

                                                <span className="mt-3 text-[1rem] font-extrabold text-slate-900">{step.title}</span>
                                                <span className="mt-1 text-[0.88rem] font-medium leading-6 text-slate-600">
                                                    {step.description[0]} <br />
                                                    {step.description[1]}
                                                </span>
                                            </div>

                                            {index < processSteps.length - 1 && (
                                                <div className="hidden flex-1 items-start justify-center pt-[2.05rem] lg:flex">
                                                    <div className="relative h-px w-full border-t-2 border-dotted border-indigo-200/90">
                                                        <div className="absolute -right-0.5 -top-[4px] h-0 w-0 border-y-[4px] border-y-transparent border-l-[8px] border-l-indigo-400" />
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="px-0 py-1">
                        <div data-gsap-item className="mb-5 text-center">
                            <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-violet-500">
                                Our Core Solutions
                            </span>
                            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 md:text-[2.75rem]">
                                Powerful AI Solutions for Every Growth Stage
                            </h2>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {coreSolutions.map((solution) => {
                                const Icon = solution.icon;

                                return (
                                    <div
                                        data-gsap-item
                                        key={solution.id}
                                        className="group relative flex min-h-[150px] items-start gap-4 rounded-[1.45rem] border border-slate-200/80 bg-white px-4 py-4 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.18)] transition-all duration-300 hover:shadow-[0_20px_45px_-28px_rgba(37,99,235,0.24)]"
                                    >
                                        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.15rem] shadow-[0_10px_28px_rgba(99,102,241,0.18)] ${solution.iconClasses}`}>
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <div className="pr-9 text-left">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-black ${solution.badgeClasses}`}>
                                                    {solution.id}
                                                </span>
                                                <h3 className={`text-[1.28rem] font-extrabold leading-snug text-slate-950 transition-colors ${solution.hoverTextClasses}`}>
                                                    {solution.title}
                                                </h3>
                                            </div>

                                            <p className="text-[0.98rem] leading-8 text-slate-600">
                                                {solution.description}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleOpenSolutionModal(solution)}
                                            aria-label={`Open details for ${solution.title}`}
                                            className={`absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 ${solution.arrowClasses} group-hover:text-white`}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* REFERENCE-STYLE PROCESS + DETAILED SOLUTIONS */}
            <section data-gsap-section className="bg-[#f8fafc] px-6 pt-2 pb-12 md:pt-3 md:pb-14">
                <div className="mx-auto max-w-7xl">
                    <div data-gsap-item className="rounded-[1.75rem] border border-slate-200/80 bg-white px-4 py-5 shadow-[0_16px_40px_-34px_rgba(37,99,235,0.16)] md:px-7 md:py-6">
                        <div className="text-center">
                            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-violet-500">
                                Our AI Growth Process
                            </span>
                            <h2 className="mt-1.5 text-[1.45rem] font-extrabold leading-tight text-slate-950 md:text-[2rem]">
                                From Data to Growth - Our 5-Step AI Framework
                            </h2>
                        </div>

                        <div className="mt-6">
                            <div className="grid gap-7 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between lg:gap-0">
                                {growthProcessSteps.map((step, index) => {
                                    const StepIcon = step.icon;

                                    return (
                                        <React.Fragment key={step.id}>
                                            <div className="relative flex flex-col items-center text-center lg:w-[8.8rem]">
                                                <div className="relative flex h-[5.15rem] w-[5.15rem] items-center justify-center rounded-full border border-indigo-100 bg-[radial-gradient(circle_at_top,#ffffff_0%,#eef2ff_100%)] shadow-[0_12px_30px_-22px_rgba(99,102,241,0.55)]">
                                                    <span className="absolute left-[-1.05rem] top-1/2 z-20 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-violet-500 text-[9px] font-black text-white lg:flex">
                                                        {step.id}
                                                    </span>
                                                    <StepIcon className="h-8 w-8 text-indigo-600" />
                                                </div>
                                                <h3 className="mt-3 text-[0.95rem] font-extrabold leading-[1.2] text-slate-900">
                                                    {step.title[0]} <br />
                                                    {step.title[1]}
                                                </h3>
                                            </div>

                                            {index < growthProcessSteps.length - 1 && (
                                                <div className="hidden lg:flex lg:min-w-[4.25rem] lg:flex-1 lg:items-center lg:justify-center lg:pt-10">
                                                    <div className="relative h-px w-full border-t-2 border-dotted border-indigo-300">
                                                        <div className="absolute -right-0.5 -top-[5px] h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-indigo-400" />
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                        {detailedSolutions.map((solution) => (
                            <article
                                data-gsap-item
                                key={solution.title}
                                className="grid overflow-hidden rounded-[1.7rem] border border-slate-200/80 bg-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.14)] sm:grid-cols-[11.75rem_minmax(0,1fr)]"
                            >
                                <div className="relative h-52 overflow-hidden sm:h-full">
                                    <img
                                        src={solution.image}
                                        alt={solution.alt}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col justify-between px-5 py-5 text-left md:px-6">
                                    <div>
                                        <h3 className="text-[1.9rem] font-extrabold leading-none text-slate-900 md:text-[2rem]">
                                            {solution.title}
                                        </h3>
                                        <ul className="mt-4 space-y-2.5">
                                            {solution.bullets.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-2.5 text-[0.95rem] font-semibold leading-6 text-slate-600">
                                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleOpenDetailedSolutionModal(solution.title)}
                                        className="mt-4 inline-flex items-center gap-1 text-sm font-black text-indigo-500 transition-colors hover:text-indigo-400"
                                    >
                                        Learn More <span className="inline-block">-&gt;</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS TIMELINE SECTION - "Our AI Growth Process" */}
            <section className="hidden py-24 px-6 bg-white border-t border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
                            Our AI Growth Process
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 leading-tight">
                            From Data to Growth – Our 5-Step AI Framework
                        </h2>
                    </div>

                    {/* Timeline Stepper Container */}
                    <div className="relative">
                        {/* Horizontal Timeline Connector Line (Desktop) */}
                        <div className="absolute top-[85px] left-1/10 right-1/10 h-0.5 border-t border-dashed border-indigo-200 hidden md:block" />

                        {/* Responsive Stepper Steps */}
                        <div className="grid gap-12 md:grid-cols-5 relative z-10 text-center">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 relative group-hover:border-indigo-500 group-hover:bg-indigo-50/20 transition-all duration-300">
                                    <Database className="w-6 h-6 text-indigo-500" />
                                    {/* Number Circle Badge on Line */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center shadow">
                                        01
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-base text-slate-900 mt-6 leading-tight">Collect Business Data</h3>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 relative group-hover:border-indigo-500 group-hover:bg-indigo-50/20 transition-all duration-300">
                                    <Users className="w-6 h-6 text-indigo-500" />
                                    {/* Number Circle Badge on Line */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center shadow">
                                        02
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-base text-slate-900 mt-6 leading-tight">Analyze Customer Behavior</h3>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 relative group-hover:border-indigo-500 group-hover:bg-indigo-50/20 transition-all duration-300">
                                    <Settings className="w-6 h-6 text-indigo-500" />
                                    {/* Number Circle Badge on Line */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center shadow">
                                        03
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-base text-slate-900 mt-6 leading-tight">Automate Repetitive Tasks</h3>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 relative group-hover:border-indigo-500 group-hover:bg-indigo-50/20 transition-all duration-300">
                                    <TrendingUp className="w-6 h-6 text-indigo-500" />
                                    {/* Number Circle Badge on Line */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center shadow">
                                        04
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-base text-slate-900 mt-6 leading-tight">Predict Future Outcomes</h3>
                            </div>

                            {/* Step 5 */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 relative group-hover:border-indigo-500 group-hover:bg-indigo-50/20 transition-all duration-300">
                                    <Rocket className="w-6 h-6 text-indigo-500" />
                                    {/* Number Circle Badge on Line */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center shadow">
                                        05
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-base text-slate-900 mt-6 leading-tight">Scale Profitable Systems</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DETAILED SOLUTIONS GRID - 6 Split Cards */}
            <section className="hidden py-24 px-6 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* 1. AI-Based Marketing */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden h-full group">
                            <div className="sm:w-[45%] h-52 sm:h-auto overflow-hidden relative shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                                    alt="AI-Based Marketing Dashboard"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-between text-left flex-grow">
                                <div>
                                    <h3 className="font-extrabold text-2xl text-slate-900 mb-4">AI-Based Marketing</h3>
                                    <ul className="space-y-2.5">
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Analyze large datasets instantly
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Identify high-intent audiences
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Optimize messaging in real time
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Reduce wasted ad spend
                                        </li>
                                    </ul>
                                </div>
                                <button className="mt-6 font-bold text-sm text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline self-start">
                                    Learn More <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                </button>
                            </div>
                        </div>

                        {/* 2. Automation Systems */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden h-full group">
                            <div className="sm:w-[45%] h-52 sm:h-auto overflow-hidden relative shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
                                    alt="Automation Systems Workflow"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-between text-left flex-grow">
                                <div>
                                    <h3 className="font-extrabold text-2xl text-slate-900 mb-4">Automation Systems</h3>
                                    <ul className="space-y-2.5">
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Lead capture & qualification
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            CRM & sales workflows
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Email & WhatsApp follow-ups
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Funnel-based nurturing
                                        </li>
                                    </ul>
                                </div>
                                <button className="mt-6 font-bold text-sm text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline self-start">
                                    Learn More <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                </button>
                            </div>
                        </div>

                        {/* 3. Predictive Analytics */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden h-full group">
                            <div className="sm:w-[45%] h-52 sm:h-auto overflow-hidden relative shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
                                    alt="Predictive Analytics Charts"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-between text-left flex-grow">
                                <div>
                                    <h3 className="font-extrabold text-2xl text-slate-900 mb-4">Predictive Analytics</h3>
                                    <ul className="space-y-2.5">
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Forecast campaign performance
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Identify drop-off points early
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Optimize budgets proactively
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Improve customer LTV
                                        </li>
                                    </ul>
                                </div>
                                <button className="mt-6 font-bold text-sm text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline self-start">
                                    Learn More <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                </button>
                            </div>
                        </div>

                        {/* 4. Smart Scaling */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden h-full group">
                            <div className="sm:w-[45%] h-52 sm:h-auto overflow-hidden relative shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                                    alt="Business Smart Scaling"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-between text-left flex-grow">
                                <div>
                                    <h3 className="font-extrabold text-2xl text-slate-900 mb-4">Smart Scaling</h3>
                                    <ul className="space-y-2.5">
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Strengthen funnels first
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Automate critical processes
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Use AI to detect saturation
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Expand only what is profitable
                                        </li>
                                    </ul>
                                </div>
                                <button className="mt-6 font-bold text-sm text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline self-start">
                                    Learn More <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                </button>
                            </div>
                        </div>

                        {/* 5. LLM Growth Models */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden h-full group">
                            <div className="sm:w-[45%] h-52 sm:h-auto overflow-hidden relative shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
                                    alt="LLM AI Models"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-between text-left flex-grow">
                                <div>
                                    <h3 className="font-extrabold text-2xl text-slate-900 mb-4">LLM Growth Models</h3>
                                    <ul className="space-y-2.5">
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Personalize messaging at scale
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Improve content relevance
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Enhance customer journeys
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Align marketing + sales
                                        </li>
                                    </ul>
                                </div>
                                <button className="mt-6 font-bold text-sm text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline self-start">
                                    Learn More <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                </button>
                            </div>
                        </div>

                        {/* 6. Growth Intelligence */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden h-full group">
                            <div className="sm:w-[45%] h-52 sm:h-auto overflow-hidden relative shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=600&q=80"
                                    alt="Growth Intelligence Dashboard"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col justify-between text-left flex-grow">
                                <div>
                                    <h3 className="font-extrabold text-2xl text-slate-900 mb-4">Growth Intelligence</h3>
                                    <ul className="space-y-2.5">
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Unified business dashboards
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Real-time actionable insights
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Better growth decisions
                                        </li>
                                        <li className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                                            <span className="mt-0.5 text-emerald-500 font-bold">✔</span>
                                            Data-driven clarity
                                        </li>
                                    </ul>
                                </div>
                                <button className="mt-6 font-bold text-sm text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline self-start">
                                    Learn More <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REFERENCE-STYLE INSIGHT + OUTCOMES + CAPABILITIES + CTA */}
            <section data-gsap-section className="bg-[#f8fafc] px-5 pb-10 pt-3 md:px-6">
                <div className="mx-auto flex max-w-7xl flex-col gap-[6px]">
                    <div data-gsap-item className="relative overflow-hidden rounded-[1.35rem] border border-slate-200/60 bg-[#040922] px-5 py-4 text-white shadow-[0_24px_70px_-40px_rgba(15,23,42,0.55)] md:px-7">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:34px_34px]" />
                        <div className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[105px]" />
                        <div className="absolute inset-y-0 left-0 w-[24%] bg-[linear-gradient(90deg,rgba(4,9,34,0.92),rgba(4,9,34,0))]" />
                        <div className="absolute inset-y-0 right-0 w-[24%] bg-[linear-gradient(270deg,rgba(4,9,34,0.92),rgba(4,9,34,0))]" />

                        <div className="relative z-10 grid items-center gap-3 lg:grid-cols-[0.9fr_1.14fr_0.9fr]">
                            <div className="text-left">
                                <h2 className="text-[1.82rem] font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[1.98rem]">
                                    Why This Matters for <br />
                                    Your Business
                                </h2>
                                <div className="mt-3.5 space-y-2.5">
                                    {[
                                        "Lower customer acquisition costs",
                                        "Faster, data-backed decision-making",
                                        "Scalable growth systems",
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-2.5 text-[0.9rem] font-medium leading-snug text-slate-200">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-violet-500/55 text-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.22)]">
                                                <Check className="h-3 w-3" />
                                            </span>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative flex h-[12.6rem] w-full max-w-[18.75rem] items-center justify-center">
                                    <div className="absolute bottom-[0.15rem] h-[2.1rem] w-[15.8rem] rounded-[100%] border border-blue-500/18 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),rgba(37,99,235,0.08),transparent_78%)]" />
                                    <div className="absolute bottom-[0.55rem] h-[1.2rem] w-[12.2rem] rounded-[100%] bg-blue-400/18 blur-[6px]" />
                                    <div className="absolute bottom-[1rem] h-[4.7rem] w-[10.8rem] rounded-[100%] border border-sky-400/12" />
                                    <div className="absolute bottom-[1.15rem] h-[6.4rem] w-[14rem] rounded-[100%] border border-violet-400/10" />

                                    <svg className="relative z-10 h-full w-full" viewBox="0 0 180 140">
                                        <defs>
                                            <radialGradient id="targetGlow" cx="50%" cy="40%" r="60%">
                                                <stop offset="0%" stopColor="#9af3ff" stopOpacity="1" />
                                                <stop offset="50%" stopColor="#3f8cff" stopOpacity="0.95" />
                                                <stop offset="100%" stopColor="#224bcb" stopOpacity="1" />
                                            </radialGradient>
                                            <linearGradient id="arrowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ffb7ff" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>

                                        <path d="M50 102 L90 88 L130 102 L90 114 Z" fill="rgba(24,84,255,0.16)" stroke="rgba(96,165,250,0.45)" strokeWidth="1.5" />
                                        <path d="M57 100 L90 89 L123 100" fill="none" stroke="rgba(96,165,250,0.55)" strokeWidth="1.3" />

                                        <circle cx="90" cy="54" r="43" fill="url(#targetGlow)" opacity="0.18" />
                                        <circle cx="90" cy="54" r="39" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1.2" />
                                        <circle cx="90" cy="54" r="31" fill="rgba(33,78,201,0.98)" stroke="rgba(125,211,252,0.7)" strokeWidth="5.5" />
                                        <circle cx="90" cy="54" r="22" fill="rgba(120,228,255,0.9)" stroke="rgba(33,78,201,0.75)" strokeWidth="5.5" />
                                        <circle cx="90" cy="54" r="13" fill="rgba(33,78,201,0.98)" stroke="rgba(120,228,255,0.7)" strokeWidth="4.5" />
                                        <circle cx="90" cy="54" r="5.5" fill="#8df0ff" />

                                        <circle cx="90" cy="54" r="52" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="1.2" />
                                        <circle cx="90" cy="54" r="60" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />

                                        <path d="M91 53 L118 26" stroke="url(#arrowGlow)" strokeWidth="6.5" strokeLinecap="round" />
                                        <path d="M116 24 L134 20 L126 38 Z" fill="url(#arrowGlow)" />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-left lg:pl-2">
                                <div className="space-y-3.5">
                                    {[
                                        "Reduced dependency on manual effort",
                                        "Less chaos. More clarity. Better growth.",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-2.5 text-[0.9rem] font-medium leading-snug text-slate-200">
                                            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-violet-500/55 text-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.22)]">
                                                <Check className="h-3 w-3" />
                                            </span>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div data-gsap-item className="rounded-[1.45rem] border border-slate-200/70 bg-white px-5 py-3.5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.18)] md:px-6">
                        <h2 className="text-center text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-950">
                            Real Outcomes You Can Expect
                        </h2>
                        <div className="mt-3.5 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                            {outcomeHighlights.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div data-gsap-item key={item.title.join(" ")} className="flex min-h-[4.85rem] items-center gap-3 rounded-[0.95rem] border border-[#ecebff] bg-[linear-gradient(180deg,#fdfdff_0%,#f7f5ff_100%)] px-4 py-3.5">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-[0.85rem] bg-white/80 shadow-[0_10px_22px_-18px_rgba(99,102,241,0.35)]">
                                            <Icon className={`h-6 w-6 ${item.iconClasses}`} />
                                        </div>
                                        <div className="text-left text-[0.95rem] font-extrabold leading-[1.18] text-slate-900">
                                            {item.title[0]} <br />
                                            {item.title[1]} <br />
                                            {item.title[2]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div data-gsap-item className="rounded-[1.45rem] border border-slate-200/70 bg-white px-5 py-3.5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.18)] md:px-6">
                        <h2 className="text-center text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-950">
                            Explore Deeper AI Capabilities
                        </h2>
                        <div className="mt-3.5 grid gap-[3px] md:grid-cols-3">
                            {capabilityCards.map((card, index) => (
                                <article
                                    data-gsap-item
                                    key={card.title.join(" ")}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleOpenCapabilityModal(card)}
                                    onKeyDown={(event) => handleCardKeyOpen(event, () => handleOpenCapabilityModal(card))}
                                    className="grid min-h-[7.6rem] cursor-pointer overflow-hidden rounded-[0.82rem] border border-[#dce1ff] bg-[linear-gradient(180deg,#ffffff_0%,#f8f7ff_100%)] shadow-[0_12px_28px_-28px_rgba(37,99,235,0.2)] transition-all duration-200 hover:border-indigo-200 hover:shadow-[0_18px_36px_-26px_rgba(37,99,235,0.28)] sm:grid-cols-[1.2fr_0.8fr]"
                                >
                                    <div className="px-3.5 py-3 text-left">
                                        <h3 className="text-[1rem] font-extrabold leading-[1.16] text-indigo-600">
                                            {card.title[0]} <br />
                                            {card.title[1]}
                                        </h3>
                                        <p className="mt-2 text-[0.76rem] font-semibold text-slate-500">
                                            {card.subtitle}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleOpenCapabilityModal(card);
                                            }}
                                            aria-label={`Open ${card.title.join(" ")} details`}
                                            className="mt-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-indigo-200 bg-white text-indigo-500 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="relative h-[7.6rem] overflow-hidden sm:h-full">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_72%)]" />
                                        <img
                                            src={card.image}
                                            alt={card.alt}
                                            className={`absolute inset-0 h-full w-full object-cover ${index === 0
                                                    ? "object-center"
                                                    : index === 1
                                                        ? "object-center"
                                                        : "object-center"
                                                }`}
                                        />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div data-gsap-item className="relative overflow-hidden rounded-[1.6rem] border border-slate-200/70 bg-[#04071b] px-6 py-5 text-white shadow-[0_24px_70px_-40px_rgba(15,23,42,0.55)] md:px-8">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />
                        <div className="absolute -right-12 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[70px]" />

                        <div className="relative z-10 grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr_0.9fr]">
                            <div className="text-left">
                                <h2 className="text-[2.15rem] font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[2.35rem]">
                                    Ready to Build Your <br />
                                    <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                                        AI Growth Plan?
                                    </span>
                                </h2>
                            </div>

                            <p className="max-w-md text-[0.95rem] leading-7 text-slate-300 lg:justify-self-center">
                                The difference is not just using AI. The difference is building intelligent systems that help your business stay relevant, scalable, and profitable.
                            </p>

                            <div className="flex flex-col gap-3 lg:justify-self-end">
                                <button
                                    onClick={handleOpenServices}
                                    className="rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-7 py-3.5 text-[0.95rem] font-black text-white shadow-[0_14px_34px_-16px_rgba(59,130,246,0.4)]"
                                >
                                    Customize Your AI Growth Plan -&gt;
                                </button>
                                <button
                                    onClick={handleOpenContact}
                                    className="rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-[0.95rem] font-black text-white"
                                >
                                    Book an AI Strategy Call -&gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY THIS MATTERS FOR YOUR BUSINESS - Concentric target block */}
            <section className="hidden py-16 px-6 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#030014] text-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center">
                        {/* Background glow overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

                        {/* Title (Left) */}
                        <div className="lg:col-span-4 text-left relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                                Why This Matters <br className="hidden lg:block" />
                                for Your Business
                            </h2>
                        </div>

                        {/* Target Visual (Center) */}
                        <div className="lg:col-span-4 flex justify-center items-center relative z-10 my-8 lg:my-0">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* SVG concentric glowing target */}
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    {/* Outer circles */}
                                    <circle cx="50" cy="50" r="45" className="fill-none stroke-blue-500/10" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="35" className="fill-none stroke-indigo-500/20" strokeWidth="1.5" />
                                    <circle cx="50" cy="50" r="25" className="fill-none stroke-purple-500/30" strokeWidth="1.5" />

                                    {/* Bullseye circle */}
                                    <circle cx="50" cy="50" r="14" className="fill-blue-600/30 stroke-blue-400" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="6" className="fill-blue-500" />
                                </svg>

                                {/* Target icon floating overlay */}
                                <div className="absolute w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/40 text-blue-400 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                                    <Target className="w-6 h-6 animate-pulse" />
                                </div>

                                {/* Orbital rings */}
                                <div className="absolute inset-2 rounded-full border border-dashed border-blue-400/20" />
                            </div>
                        </div>

                        {/* Bullets (Right) */}
                        <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-6 text-left relative z-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Lower customer acquisition costs</span>
                                </div>
                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Faster, data-backed decision-making</span>
                                </div>
                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Scalable growth systems</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Reduced dependency on manual effort</span>
                                </div>
                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Less chaos. More clarity. Better growth.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REAL OUTCOMES YOU CAN EXPECT - Row of 4 Badges */}
            <section className="hidden py-24 px-6 bg-white border-t border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            Real Outcomes You Can Expect
                        </h2>
                    </div>

                    {/* Outcome Badges Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Outcome 1 */}
                        <div className="bg-[#f8fafc] border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-500 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                                <Tag className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-sm text-slate-800 text-left leading-snug">
                                Lower Customer Acquisition Costs
                            </span>
                        </div>

                        {/* Outcome 2 */}
                        <div className="bg-[#f8fafc] border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:bg-white hover:border-blue-100 hover:shadow-md transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                                <Rocket className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-sm text-slate-800 text-left leading-snug">
                                Faster Decision-Making
                            </span>
                        </div>

                        {/* Outcome 3 */}
                        <div className="bg-[#f8fafc] border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-500 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-sm text-slate-800 text-left leading-snug">
                                Scalable Growth Systems
                            </span>
                        </div>

                        {/* Outcome 4 */}
                        <div className="bg-[#f8fafc] border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:bg-white hover:border-emerald-100 hover:shadow-md transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-sm text-slate-800 text-left leading-snug">
                                Reduced Manual Dependency
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPLORE DEEPER AI CAPABILITIES - 3 Cards */}
            <section className="hidden py-24 px-6 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            Explore Deeper AI Capabilities
                        </h2>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Card 1 */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => handleOpenCapabilityModal(capabilityCards[0])}
                            onKeyDown={(event) => handleCardKeyOpen(event, () => handleOpenCapabilityModal(capabilityCards[0]))}
                            className="cursor-pointer bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] text-left group h-full"
                        >
                            <div className="mb-6">
                                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                                    AI vs Traditional <br /> Marketing Comparison
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCapabilityModal(capabilityCards[0])}
                                    className="mt-3 text-sm font-extrabold text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline"
                                >
                                    See the real difference <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCapabilityModal(capabilityCards[0])}
                                    aria-label="Open AI vs Traditional Marketing Comparison details"
                                    className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-100"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="h-44 w-full bg-slate-50 border border-slate-100/50 rounded-2xl overflow-hidden relative flex items-center justify-center shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                                    alt="3D Chart comparison concept"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => handleOpenCapabilityModal(capabilityCards[1])}
                            onKeyDown={(event) => handleCardKeyOpen(event, () => handleOpenCapabilityModal(capabilityCards[1]))}
                            className="cursor-pointer bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] text-left group h-full"
                        >
                            <div className="mb-6">
                                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                                    LLM Growth Model <br /> Deep-Dive Solutions
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCapabilityModal(capabilityCards[1])}
                                    className="mt-3 text-sm font-extrabold text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline"
                                >
                                    Understand our models <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCapabilityModal(capabilityCards[1])}
                                    aria-label="Open LLM Growth Model Deep-Dive Solutions details"
                                    className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-100"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="h-44 w-full bg-slate-50 border border-slate-100/50 rounded-2xl overflow-hidden relative flex items-center justify-center shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
                                    alt="3D Brain rendering concept"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => handleOpenCapabilityModal(capabilityCards[2])}
                            onKeyDown={(event) => handleCardKeyOpen(event, () => handleOpenCapabilityModal(capabilityCards[2]))}
                            className="cursor-pointer bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] text-left group h-full"
                        >
                            <div className="mb-6">
                                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                                    AI-Powered Landing Pages <br /> for Enterprise Clients
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCapabilityModal(capabilityCards[2])}
                                    className="mt-3 text-sm font-extrabold text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 group/btn hover:underline"
                                >
                                    High-converting & intelligent <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCapabilityModal(capabilityCards[2])}
                                    aria-label="Open AI-Powered Landing Pages for Enterprise Clients details"
                                    className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-100"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="h-44 w-full bg-slate-50 border border-slate-100/50 rounded-2xl overflow-hidden relative flex items-center justify-center shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                                    alt="Laptop dashboard mockup"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION - Ready to Build */}
            <section className="hidden px-6 py-12 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#030014] text-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
                        {/* Grid and glows overlays */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px]" />
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />

                        <div className="max-w-2xl relative z-10">
                            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                                Ready to Build <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Your <br className="sm:hidden" /> AI Growth Plan?</span>
                            </h2>
                            <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
                                The difference is not just using AI. The difference is building intelligent systems that help your business stay relevant, scalable, and profitable.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 relative z-10">
                            <button
                                onClick={handleOpenServices}
                                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-7 py-4 text-sm transition-all duration-300 shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
                            >
                                Customize Your AI Growth Plan
                            </button>

                            <button
                                onClick={handleOpenContact}
                                className="rounded-full border border-white/20 hover:border-white/40 text-white hover:bg-white/5 font-bold px-7 py-4 text-sm transition-all duration-300 hover:scale-[1.02]"
                            >
                                Book an AI Strategy Call
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {activeSolution && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
                    onClick={handleCloseSolutionModal}
                >
                    <div
                        className="relative flex max-h-[88vh] w-full max-w-[42rem] flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#f5f3ff_55%,#eef4ff_100%)] px-5 py-4 md:px-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="max-w-[35rem] pr-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-violet-500">
                                        {activeSolution.modal.eyebrow}
                                    </span>
                                    <h3 className="mt-1.5 text-[1.28rem] font-extrabold leading-[1.18] text-slate-950 md:text-[1.65rem]">
                                        {activeSolution.modal.headline}
                                    </h3>
                                    <p className="mt-2 max-w-xl text-[0.9rem] leading-6 text-slate-600">
                                        {activeSolution.modal.intro}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCloseSolutionModal}
                                    aria-label="Close details popup"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="scroll-smooth overflow-y-auto px-5 py-5 md:px-6">
                            <div className="mb-4 flex items-center gap-3 rounded-[1rem] border border-violet-100 bg-violet-50/60 px-4 py-3">
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] shadow-[0_10px_24px_rgba(99,102,241,0.18)] ${activeSolution.iconClasses}`}>
                                    <activeSolution.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">{activeSolution.title}</p>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">{activeSolution.description}</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {activeSolution.modal.sections.map((section) => (
                                    <section
                                        key={section.title}
                                        className="rounded-[1.25rem] border border-slate-200/90 bg-slate-50/70 px-4 py-4 md:px-5"
                                    >
                                        <h4 className="text-[1.02rem] font-extrabold text-slate-950">
                                            {section.title}
                                        </h4>

                                        <div className="mt-3 space-y-3 text-[0.95rem] leading-7 text-slate-600">
                                            {section.paragraphs?.map((paragraph) => (
                                                <p key={paragraph}>{paragraph}</p>
                                            ))}
                                        </div>

                                        {section.bullets?.length > 0 && (
                                            <ul className="mt-4 space-y-2.5">
                                                {section.bullets.map((bullet) => (
                                                    <li key={bullet} className="flex items-start gap-2.5 text-[0.95rem] font-semibold leading-6 text-slate-700">
                                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </section>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

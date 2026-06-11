import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Cpu,
  Crosshair,
  HeartPulse,
  House,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const onlineImages = {
  healthcare:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  realEstate:
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  ecommerce:
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  saas:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  cta:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
};

const caseStudyTheme = {
  '--case-bg': '#F8FAFC',
  '--case-card': '#FFFFFF',
  '--case-primary': '#2563EB',
  '--case-text': '#0F172A',
  '--case-secondary': '#64748B',
  '--case-border': '#E2E8F0',
  '--case-shadow': '0 16px 36px -28px rgba(15,23,42,0.16)',
};

const caseStudies = [
  {
    id: 'healthcare',
    index: '01',
    icon: HeartPulse,
    visual: onlineImages.healthcare,
    title: 'Healthcare Lead Generation System',
    hook: 'Attract more patients, not just clicks, with AI-led qualification and faster follow-up systems.',
    industry: 'Healthcare',
    businessType: 'Multi-specialty clinic',
    goal: 'Increase qualified patient inquiries at a lower cost',
    before: [
      'High ad spend with low-quality leads',
      'Manual and delayed follow-ups',
      'Cost per lead increasing month after month',
    ],
    strategy: [
      'AI-based audience targeting',
      'Funnel-driven patient journey design',
      'Automated WhatsApp and CRM follow-ups',
      'Conversion-focused landing pages',
    ],
    results: [
      { value: '38%', label: 'Reduction in CPL', icon: TrendingDown },
      { value: '2.4x', label: 'Qualified patient inquiries', icon: TrendingUp },
      { value: '<5 min', label: 'Response time', icon: Clock3 },
    ],
    outcome:
      'A predictable and scalable patient acquisition system that worked consistently, not occasionally.',
  },
  {
    id: 'real-estate',
    index: '02',
    icon: House,
    visual: onlineImages.realEstate,
    title: 'Real Estate High-Intent Lead Funnel',
    hook: 'Move the sales team away from junk leads and toward site-visit-ready prospects.',
    industry: 'Real Estate',
    businessType: 'Residential developer',
    goal: 'Generate site-visit-ready leads',
    before: [
      'High volume of junk leads',
      'Poor follow-up and tracking',
      'Low site-visit conversion ratio',
    ],
    strategy: [
      'Location and intent-based ad targeting',
      'AI-powered lead qualification',
      'CRM and site-visit automation',
      'Multi-step nurturing funnel',
    ],
    results: [
      { value: '3.1x', label: 'ROAS growth', icon: BarChart3 },
      { value: '41%', label: 'Reduction in CPL', icon: TrendingDown },
      { value: '2x', label: 'Confirmed site visits', icon: CalendarCheck2 },
    ],
    outcome:
      'Sales teams spoke only with ready-to-buy prospects, not cold or unqualified leads.',
  },
  {
    id: 'ecommerce-d2c',
    index: '03',
    icon: ShoppingBag,
    visual: onlineImages.ecommerce,
    title: 'E-commerce and D2C Scaling System',
    hook: 'Scale revenue without killing margins by fixing acquisition, retention, and ROAS together.',
    industry: 'E-commerce / D2C',
    businessType: 'Consumer brand',
    goal: 'Scale revenue without killing margins',
    before: [
      'Rising acquisition costs',
      'Low repeat purchase rate',
      'Ad fatigue impacting performance',
    ],
    strategy: [
      'AI-powered product and audience segmentation',
      'Funnel-level ROAS optimization',
      'Retargeting and retention automation',
      'CRO-driven website improvements',
    ],
    results: [
      { value: '5.2x', label: 'ROAS growth', icon: BarChart3 },
      { value: '2x', label: 'Repeat purchase rate', icon: TrendingUp },
      { value: '1.9x', label: 'Revenue growth in 90 days', icon: Sparkles },
    ],
    outcome:
      'Profit-first scaling with sustainable growth, not discount dependency.',
  },
  {
    id: 'saas-b2b',
    index: '04',
    icon: Building2,
    visual: onlineImages.saas,
    title: 'SaaS and B2B Lead Generation',
    hook: 'Increase demo bookings with decision-makers instead of wasting spend on low-intent traffic.',
    industry: 'SaaS / B2B',
    businessType: 'B2B software company',
    goal: 'Increase demo bookings with decision-makers',
    before: ['Long sales cycles', 'Low demo-to-close ratio', 'High cost per lead'],
    strategy: [
      'LinkedIn and Google Ads demand generation',
      'AI-based lead scoring',
      'Demo-focused landing pages',
      'Funnel-level attribution tracking',
    ],
    results: [
      { value: '3.6x', label: 'Increase in demo bookings', icon: CalendarCheck2 },
      { value: '29%', label: 'Reduction in CPL', icon: TrendingDown },
      { value: 'Higher', label: 'Demo-to-sale conversion', icon: Crosshair },
    ],
    outcome:
      'Sales teams engaged only with qualified decision-makers, improving efficiency and revenue.',
  },
];

const commonPatterns = [
  {
    title: 'AI-driven decision-making',
    description: 'Every case study starts with signal quality, audience intent, and better qualification logic.',
    icon: BrainCircuit,
  },
  {
    title: 'Funnel-based growth systems',
    description: 'We fix the full path from click to conversion instead of isolated campaigns.',
    icon: Crosshair,
  },
  {
    title: 'Automation that saves time and money',
    description: 'Lead routing, follow-ups, and CRM actions are connected so response quality improves fast.',
    icon: Cpu,
  },
  {
    title: 'Clear focus on ROI, not vanity metrics',
    description: 'The reporting lens stays on qualified leads, site visits, demos, repeat sales, and revenue.',
    icon: ShieldCheck,
  },
];

const trustComparison = {
  avoid: ['Fake screenshots', 'Over-promised guarantees', 'One-time wins'],
  believe: ['Transparent growth stories', 'Realistic expectations', 'Long-term, scalable systems'],
};

const filterOptions = [
  { label: 'All Cases', value: 'all' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Real Estate', value: 'real-estate' },
  { label: 'E-commerce / D2C', value: 'ecommerce-d2c' },
  { label: 'SaaS / B2B', value: 'saas-b2b' },
];

const topStats = [
  { value: '38%', label: 'Average reduction in CPL', icon: TrendingUp },
  { value: '2.4x', label: 'More qualified inquiries', icon: Users },
  { value: '< 5 min', label: 'Average response time', icon: Clock3 },
  { value: 'Across 4', label: 'High-impact industries', icon: Crosshair },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const IndustryBadge = ({ children }) => (
  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-700">
    {children}
  </span>
);

const StatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -3 }}
      className="min-h-[116px] rounded-[18px] border border-[var(--case-border)] bg-white px-4 py-4 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.1)] sm:min-h-[132px] sm:px-6"
    >
      <Icon className="h-6 w-6 text-[var(--case-primary)]" strokeWidth={2.1} />
      <div className="mt-6 text-[1.55rem] font-black leading-none tracking-[-0.03em] text-[var(--case-text)] sm:mt-8 sm:text-[1.85rem]">{item.value}</div>
      <div className="mt-2 text-[0.8rem] font-medium leading-5 text-[var(--case-text)]/82 sm:text-[0.88rem]">{item.label}</div>
    </motion.div>
  );
};

const FilterPill = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-[10px] font-semibold leading-none transition duration-300 sm:px-4 sm:text-[11px] ${active
        ? 'border-slate-950 bg-slate-950 text-white'
        : 'border-[var(--case-border)] bg-white text-[var(--case-text)]/80 hover:border-blue-200 hover:text-[var(--case-primary)]'
      }`}
  >
    {children}
  </button>
);

const KeyMetric = ({ result, bordered = true }) => {
  const Icon = result.icon;

  return (
    <div className={`px-4 py-0.5 ${bordered ? 'border-r border-[var(--case-border)] last:border-r-0' : ''}`}>
      <div className="flex items-center gap-1.5 text-[var(--case-primary)]">
        <Icon className="h-3 w-3" />
      </div>
      <div className="mt-2 text-[1.05rem] font-black leading-none tracking-tight text-[var(--case-text)]">{result.value}</div>
      <div className="mt-1.5 max-w-[132px] text-[10px] font-medium leading-4 text-[var(--case-text)]/82">{result.label}</div>
    </div>
  );
};

const BulletList = ({ title, items, tone = 'danger' }) => {
  const isDanger = tone === 'danger';

  return (
    <div className="min-w-0">
      <div
        className={`text-[10px] font-black uppercase tracking-[0.22em] ${isDanger ? 'text-rose-500' : 'text-[var(--case-primary)]'
          }`}
      >
        {title}
      </div>
      <ul className="mt-3.5 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            {isDanger ? (
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--case-primary)]" />
            )}
            <span className="text-[10.5px] font-medium leading-5 text-[var(--case-text)]/90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MetaStrip = ({ study }) => (
  <div className="sr-only">
    <div>{study.industry}</div>
    <div>{study.businessType}</div>
    <div>{study.goal}</div>
    <div>{study.outcome}</div>
  </div>
);

const CaseStudyCard = ({ study }) => {
  return (
    <motion.article
      id={study.id}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="scroll-mt-28 overflow-hidden rounded-[20px] border border-[var(--case-border)] bg-white shadow-[0_10px_24px_-22px_rgba(15,23,42,0.16)]"
    >
      <div className="grid lg:grid-cols-[30%_24%_46%]">
        <div className="relative border-b border-[var(--case-border)] lg:border-b-0 lg:border-r">
          <div className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-slate-950 px-3.5 py-2.5 text-[1rem] font-black text-white">
            {study.index}
          </div>
          <img
            src={study.visual}
            alt={study.title}
            className="h-[200px] w-full object-cover sm:h-[240px] lg:h-full lg:min-h-[252px]"
          />
        </div>

        <div className="border-b border-[var(--case-border)] p-4 sm:p-5 lg:border-b-0 lg:border-r lg:px-5 lg:py-4.5">
          <IndustryBadge>{study.industry}</IndustryBadge>
          <h3 className="mt-3.5 max-w-full text-[0.95rem] font-black leading-[1.15] text-[var(--case-text)] sm:max-w-[210px] sm:text-[0.98rem] lg:text-[1.02rem]">
            {study.title}
          </h3>
          <p className="mt-2.5 max-w-full text-[10.5px] leading-5 text-[var(--case-text)]/82 sm:max-w-[215px]">{study.hook}</p>
          <MetaStrip study={study} />
          <div className="mt-7">
            <Link
              to={`/case-studies/${study.id}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--case-primary)] transition duration-300 hover:gap-2.5"
            >
              View Case Study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-5 lg:px-5 lg:py-4.5">
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--case-text)]">Key Outcomes</div>
          <div className="mt-3 grid gap-2 py-1 min-[390px]:grid-cols-3 min-[390px]:gap-0">
            {study.results.map((result, index) => (
              <KeyMetric key={result.label} result={result} bordered={index !== study.results.length - 1} />
            ))}
          </div>

          <div className="mt-4 grid gap-4 border-t border-[var(--case-border)] pt-4 sm:grid-cols-2">
            <BulletList title="Before AI Growth Exa" items={study.before} tone="danger" />
            <BulletList title="Strategy Used" items={study.strategy} tone="success" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const PatternCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      className="relative px-4 py-3 text-center sm:px-5"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--case-primary)]">
        <Icon className="h-7 w-7" strokeWidth={1.9} />
      </div>
      <h3 className="mt-4 text-[1.05rem] font-black leading-[1.25] text-[var(--case-text)]">{item.title}</h3>
      <p className="mt-2.5 text-[12px] leading-6 text-[var(--case-secondary)]">{item.description}</p>
    </motion.div>
  );
};

const TrustCard = ({ title, items, positive = false }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    className={`rounded-[18px] border px-4 py-5 shadow-[0_10px_22px_-22px_rgba(15,23,42,0.12)] sm:px-6 ${positive ? 'border-emerald-100 bg-[linear-gradient(90deg,rgba(240,253,250,0.92),rgba(236,253,245,0.72))]' : 'border-rose-100 bg-[linear-gradient(90deg,rgba(255,241,242,0.92),rgba(255,245,245,0.72))]'
      }`}
  >
    <div
      className={`text-[11px] font-black uppercase tracking-[0.24em] ${positive ? 'text-emerald-700' : 'text-rose-600'
        }`}
    >
      {title}
    </div>
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          {positive ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
          ) : (
            <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
          )}
          <span className="text-[12px] font-semibold text-[var(--case-text)]">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const CTASection = ({ location }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden rounded-[18px] border border-[var(--case-border)] bg-white shadow-[0_12px_28px_-22px_rgba(15,23,42,0.14)]"
  >
    <div className="grid items-center lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="p-5 sm:p-7 md:p-9 lg:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--case-border)] bg-slate-50 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--case-primary)]">
          <Sparkles className="h-3 w-3" />
          Final CTA
        </div>
        <h2 className="mt-4 max-w-[390px] text-[1.7rem] font-black leading-[1.08] text-[var(--case-text)] sm:text-[2rem] md:text-[3rem]">
          Want results like these built for your business?
        </h2>
        <p className="mt-4 max-w-[420px] text-[0.92rem] leading-7 text-[var(--case-secondary)] sm:text-[0.98rem]">
          Every case study starts with one decision: stop guessing and start building smart growth systems.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/services"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--case-primary)] px-6 py-3 text-[13px] font-bold text-white transition duration-300 hover:scale-[1.02] hover:bg-blue-700 sm:w-auto"
          >
            Customize Your Growth Plan
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/contact"
            state={{ background: location }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--case-border)] bg-white px-6 py-3 text-[13px] font-bold text-[var(--case-text)] transition duration-300 hover:scale-[1.02] hover:border-blue-200 hover:text-[var(--case-primary)] sm:w-auto"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>

      <div className="p-3 md:p-4">
        <img
          src={onlineImages.cta}
          alt="AI Growth Exa dashboard visual"
          className="h-full min-h-[220px] w-full rounded-[16px] object-cover sm:min-h-[260px]"
        />
      </div>
    </div>
  </motion.section>
);

const CaseStudyDetailView = ({ study, location }) => (
  <div className="bg-[var(--case-bg)] py-8 md:py-10">
    <div className="mx-auto max-w-[1180px] px-3 md:px-4 lg:px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--case-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--case-text)] transition duration-300 hover:border-blue-200 hover:text-[var(--case-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies
        </Link>

        <section className="overflow-hidden rounded-[24px] border border-[var(--case-border)] bg-white shadow-[var(--case-shadow)]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[280px] border-b border-[var(--case-border)] lg:min-h-full lg:border-b-0 lg:border-r">
              <div className="absolute left-0 top-0 z-10 rounded-br-[16px] bg-slate-950 px-4 py-3 text-lg font-black text-white">
                {study.index}
              </div>
              <img src={study.visual} alt={study.title} className="h-full min-h-[280px] w-full object-cover" />
            </div>

            <div className="p-5 sm:p-7 lg:p-10">
              <IndustryBadge>{study.industry}</IndustryBadge>
              <h1 className="mt-4 text-[1.8rem] font-black leading-[1.02] text-[var(--case-text)] sm:text-[2.35rem] lg:text-[3rem]">
                {study.title}
              </h1>
              <p className="mt-4 max-w-[620px] text-[0.98rem] leading-7 text-[var(--case-secondary)] sm:text-[1.05rem]">
                {study.hook}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[18px] border border-[var(--case-border)] bg-slate-50 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--case-secondary)]">Industry</div>
                  <div className="mt-2 text-sm font-bold text-[var(--case-text)]">{study.industry}</div>
                </div>
                <div className="rounded-[18px] border border-[var(--case-border)] bg-slate-50 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--case-secondary)]">Business Type</div>
                  <div className="mt-2 text-sm font-bold text-[var(--case-text)]">{study.businessType}</div>
                </div>
                <div className="rounded-[18px] border border-[var(--case-border)] bg-slate-50 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--case-secondary)]">Goal</div>
                  <div className="mt-2 text-sm font-bold text-[var(--case-text)]">{study.goal}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-[var(--case-border)] bg-white p-5 shadow-[var(--case-shadow)] sm:p-7 lg:p-8">
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--case-text)]">Key Outcomes</div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {study.results.map((result) => {
              const Icon = result.icon;
              return (
                <div
                  key={result.label}
                  className="rounded-[18px] border border-[var(--case-border)] bg-slate-50 p-5"
                >
                  <Icon className="h-5 w-5 text-[var(--case-primary)]" />
                  <div className="mt-4 text-[1.8rem] font-black leading-none text-[var(--case-text)]">{result.value}</div>
                  <div className="mt-2 text-sm font-semibold text-[var(--case-secondary)]">{result.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[24px] border border-rose-100 bg-white p-5 shadow-[var(--case-shadow)] sm:p-7">
            <BulletList title="Before AI Growth Exa" items={study.before} tone="danger" />
          </div>
          <div className="rounded-[24px] border border-blue-100 bg-white p-5 shadow-[var(--case-shadow)] sm:p-7">
            <BulletList title="Strategy Used" items={study.strategy} tone="success" />
          </div>
        </section>

        <section className="rounded-[24px] border border-blue-100 bg-blue-50 p-5 shadow-[var(--case-shadow)] sm:p-7 lg:p-8">
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--case-primary)]">Outcome</div>
          <p className="mt-3 text-[1.05rem] font-bold leading-7 text-[var(--case-text)] sm:text-[1.2rem]">
            {study.outcome}
          </p>
        </section>

        <CTASection location={location} />
      </motion.div>
    </div>
  </div>
);

const CaseStudies = () => {
  const location = useLocation();
  const { studyId } = useParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const selectedStudy = studyId ? caseStudies.find((study) => study.id === studyId) : null;

  const filteredCaseStudies = caseStudies.filter(
    (study) => activeFilter === 'all' || study.id === activeFilter
  );
  const visibleCaseStudies = filteredCaseStudies.length > 0 ? filteredCaseStudies : caseStudies;

  const handleFilterChange = (value) => {
    setActiveFilter((current) => {
      if (value === 'all') return 'all';
      return current === value ? 'all' : value;
    });
  };

  if (studyId) {
    if (!selectedStudy) {
      return (
        <div className="bg-[var(--case-bg)] py-20" style={caseStudyTheme}>
          <div className="mx-auto max-w-[900px] px-4 text-center">
            <h1 className="text-3xl font-black text-[var(--case-text)]">Case study not found</h1>
            <p className="mt-3 text-[var(--case-secondary)]">The requested case study could not be found.</p>
            <Link
              to="/case-studies"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--case-primary)] px-5 py-3 text-sm font-bold text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div style={caseStudyTheme}>
        <CaseStudyDetailView study={selectedStudy} location={location} />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-white" style={caseStudyTheme}>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pb-10 pt-24 text-white sm:pt-32 md:min-h-screen md:pb-10 md:pt-32">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/about.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 opacity-20">
          <FloatingParticles theme="dark" />
        </div>
        <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-16 top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="container relative z-10 mx-auto flex w-full max-w-5xl justify-center px-4 text-center sm:px-6">
          <div className="flex w-full max-w-[320px] min-w-0 flex-col items-center sm:max-w-4xl">
            <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Case Studies & Results
            </div>

            <h1 className="mt-4 break-words text-[1.48rem] font-black leading-[0.98] text-white sm:text-[4rem] sm:leading-[0.92] lg:text-[4.5rem]">
              Real Growth.
              <br />
              <span className="text-blue-400">Real Systems.</span>
              <br />
              Real Impact.
            </h1>

            <p className="mt-4 max-w-[300px] text-[0.84rem] leading-6 text-slate-300 sm:mx-auto sm:max-w-3xl sm:text-[0.98rem] sm:leading-7 md:text-[1.05rem] md:leading-8">
              At <span className="font-bold text-white">AI Growth Exa</span>, we believe results speak louder than
              promises. This page showcases real-world growth systems built using our AI-driven strategies,
              performance frameworks, and automation engines.
            </p>

            <p className="mt-4 max-w-[300px] text-[0.8rem] font-semibold leading-6 text-slate-200 sm:mx-auto sm:max-w-3xl sm:text-sm sm:leading-7">
              Client identities are anonymized for confidentiality. Outcomes, systems, and results are 100% real.
            </p>

            <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                state={{ background: location }}
                className="inline-flex w-full max-w-[260px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-[13px] font-bold text-white transition hover:bg-blue-500 sm:w-auto sm:max-w-none sm:px-7 sm:py-4 sm:text-sm"
              >
                Customize Your Growth Plan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex w-full max-w-[260px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-[13px] font-bold text-white transition hover:bg-white/10 sm:w-auto sm:max-w-none sm:px-7 sm:py-4 sm:text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[var(--case-bg)] py-8 md:py-10">
        <div className="mx-auto max-w-[1280px] px-3 md:px-4 lg:px-5">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start"
          >
            <motion.div variants={itemVariants} className="min-w-0 pt-1 lg:pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--case-primary)]">
                <Sparkles className="h-3.5 w-3.5" />
                Featured Case Studies
              </div>
              <h2 className="mt-4 max-w-[720px] text-[1.65rem] font-black leading-[1] tracking-[-0.045em] text-[var(--case-text)] sm:text-[2rem] md:text-[3.05rem]">
                <span className="block sm:hidden">Growth stories built from strategy, automation, and qualified demand.</span>
                <span className="hidden sm:block">Growth stories built from strategy, automation, and</span>
                <span className="hidden sm:block">qualified demand.</span>
              </h2>
              <p className="mt-4 max-w-[470px] text-[0.92rem] leading-7 text-[var(--case-text)]/75 sm:text-[0.98rem] sm:leading-8">
                Every case study follows the same principle: diagnose the funnel problem first, design the right AI
                support layer, and then measure outcomes that matter to the business.
              </p>

              <div className="mt-4 hidden items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex sm:flex-wrap sm:overflow-visible">
                {filterOptions.map((option) => (
                  <FilterPill
                    key={option.value}
                    active={activeFilter === option.value}
                    onClick={() => handleFilterChange(option.value)}
                  >
                    {option.label}
                  </FilterPill>
                ))}
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="grid min-w-0 gap-3 min-[390px]:grid-cols-2 lg:ml-auto lg:max-w-[500px] lg:w-full">
              {topStats.map((item) => (
                <StatCard key={`${item.value}-${item.label}`} item={item} />
              ))}
            </motion.div>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
            className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
          >
            {filterOptions.map((option) => (
              <FilterPill
                key={`mobile-${option.value}`}
                active={activeFilter === option.value}
                onClick={() => handleFilterChange(option.value)}
              >
                {option.label}
              </FilterPill>
            ))}
          </motion.div>

          <motion.section
            key={activeFilter}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-5 space-y-5 md:mt-6"
          >
            {visibleCaseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mt-16 md:mt-18"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--case-primary)]">
                <Cpu className="h-3.5 w-3.5" />
                What They Have In Common
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="mt-6 grid gap-y-6 md:mt-7 md:grid-cols-2 xl:grid-cols-4 xl:gap-y-0"
            >
              {commonPatterns.map((item, index) => (
                <div
                  key={item.title}
                  className={`xl:border-r xl:border-[var(--case-border)] ${index === commonPatterns.length - 1 ? 'xl:border-r-0' : ''}`}
                >
                  <PatternCard item={item} />
                </div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mt-12 md:mt-14"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--case-primary)]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Why We Share Results This Way
              </div>
              <h2 className="mt-3 text-[2rem] font-black text-[var(--case-text)] md:text-[3rem]">Built on trust, not inflated promises.</h2>
            </motion.div>

            <motion.div variants={containerVariants} className="mt-6 grid gap-4 lg:grid-cols-2 md:mt-7">
              <TrustCard title="We do not believe in" items={trustComparison.avoid} />
              <TrustCard title="We believe in" items={trustComparison.believe} positive />
            </motion.div>
          </motion.section>

          <div className="mt-6 md:mt-7">
            <CTASection location={location} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;



import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState, useMemo } from "react"
import gsap from "gsap"

import GradientText from "../components/GradientText"
import Threads from "../components/Threads"
import SplitText from "../components/SplitText"

const HeroSection = () => {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const location = useLocation()

  const [textIndex, setTextIndex] = useState(0)
  const [loaderDone, setLoaderDone] = useState(false)

  const threadColor = useMemo(() => [0.7, 0.85, 1], [])

  const shufflingTexts = [
    "AI-Driven Growth, IT & Marketing Agency",
    "LLM-Powered Marketing Automation",
    "Performance-First Ad Management",
    "Data-Driven Brand Identities",
    "Predictive Analytics & Insights",
    "Intelligent Growth Infrastructure"
  ]

  // Wait for loader to finish before showing SplitText
  useEffect(() => {
    if (sessionStorage.getItem('hasLoaded')) {
      setLoaderDone(true)
      return
    }
    const interval = setInterval(() => {
      if (sessionStorage.getItem('hasLoaded')) {
        setLoaderDone(true)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!titleRef.current || !textRef.current || !buttonsRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )

    // Text shuffling interval
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setTextIndex((prev) => (prev + 1) % shufflingTexts.length)
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          )
        }
      })
    }, 2500) // 2s pause + 0.5s animation = 2.5s total cycle

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] md:min-h-screen items-center justify-start md:justify-center overflow-hidden pt-[calc(4.5rem+env(safe-area-inset-top))] pb-6 sm:pb-8 md:pt-8 md:pb-3">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b1a] via-[#040914] to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.06),transparent_40%,rgba(168,85,247,0.05))]" />
      </div>

      {/* Threads Animation Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Threads
          color={threadColor}
          amplitude={2.3}
          distance={0.5}
          enableMouseInteraction
        />
      </div>




      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">

        <div
          className="inline-block mt-0 mb-2 md:mb-3 px-3 py-1 rounded-full border border-blue-400/20 bg-blue-500/10 backdrop-blur"
        >
          <span className="text-sm font-semibold tracking-wide uppercase text-blue-400">
            Introducing AI GrowthExa
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-white"
        >
          {loaderDone ? (
            <SplitText
              text="AI GrowthExa"
              className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-white"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="center"
              tag="span"
            />
          ) : (
            <span style={{ opacity: 0 }}>AI GrowthExa</span>
          )}
          <GradientText
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            animationSpeed={8}
            showBorder={false}
            className="mt-1.5 md:mt-2 text-xl sm:text-2xl md:text-4xl font-extrabold tracking-wider"
          >
            Empower • Scale • Succeed
          </GradientText>
        </h1>
        <div className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
          <div ref={textRef} className="min-h-[1.5em] mb-1">
            {shufflingTexts[textIndex]}
          </div>
          <span className="block text-white font-bold tracking-wide">
            Where Data Thinks. AI Acts. Brands Grow.
          </span>
        </div>

        <div
          ref={buttonsRef}
          className="mt-4 md:mt-5 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
        >
          <Link
            to="/contact"
            state={{ background: location }}
            className="px-9 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-extrabold text-xl transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30"
          >
            Get Your Growth Plan
          </Link>

          <Link
            to="/services"
            className="px-9 py-4 bg-white/5 border border-white/10 hover:border-blue-400 text-gray-300 hover:text-white rounded-full font-extrabold text-xl transition-all backdrop-blur"
          >
            Explore Services
          </Link>
        </div>
      </div>

    </section>
  )
}

export default HeroSection

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  LuMessageSquareMore,
  LuSearch,
  LuX,
} from "react-icons/lu";

/* ============================================================
   METAGRAM HERO SLIDES
============================================================ */

const heroSlides = [
  {
    id: 1,
    title: "WE ARE ONE OF EUROPE'S 50 LARGEST BANKS.",
    description: "THE PRIDE BELONGS TO ALL OF US!",
    image: "/img/slide1.png",
    button: "Detailed Information",
    buttonLink: "/signup",
  },

  {
    id: 2,
    title: "YOUR GOLD AT HOME IS WORTH MUCH MORE AT ZIRAAT.",
    description:
      "Those who bring their gold to Ziraat Bank now are increasing their gold holding with an additional return opportunity and enjoying the advantage of physical delivery.",
    image: "/img/slide2.jpg",
    button: "Detailed Information",
    buttonLink: "/signup",
  },

  {
    id: 3,
    title:
      "ZIRAAT OPEN BANKING: OPEN BANKING FOR ALL YOUR ACCOUNTS AND CARDS!",
    description: "",
    image: "/img/slide3.jpg",
    button: "Detailed Information",
    buttonLink: "/signup",
  },

  {
    id: 4,
    title:
      "Our pensioners have been eagerly waiting, and the awaited opportunity has arrived at Ziraat Bank!",
    description:
      "Now our pensioners are enjoying additional benefits of up to 90,000 TL on top of the cash bonus.",
    image: "/img/slide4.jpg",
    button: "Detailed Information",
    buttonLink: "/signup",
  },

  {
    id: 5,
    title: "Easy School Collection System",
    description:
      "Take advantage of flexible installment options for your education payments.",
    image: "/img/slide5.jpg",
    button: "Detailed Information",
    buttonLink: "/signup",
  },

  {
    id: 6,
    title: "Ziraat Bank offers a full export support loan package.",
    description: "",
    image: "/img/slide6.png",
    button: "Detailed Information",
    buttonLink: "/signup",
  },
];

/* ============================================================
   HOMEPAGE
============================================================ */

export const HomepageHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const slide = heroSlides[currentSlide];

  /* ============================================================
     AUTOMATIC SLIDER
  ============================================================ */

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrentSlide((previous) => {
        return (previous + 1) % heroSlides.length;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [paused]);

  /* ============================================================
     LOCK BODY WHEN MOBILE MENU IS OPEN
  ============================================================ */

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  /* ============================================================
     CHANGE SLIDE
  ============================================================ */

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  /* ============================================================
     CLOSE MOBILE MENU
  ============================================================ */

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-gray-900">

      {/* ========================================================
          DESKTOP TOP BAR
      ======================================================== */}

      <div className="hidden h-[48px] bg-[#ed0016] text-white lg:block">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-8">

          {/* LEFT */}

          <div className="flex items-center gap-8 text-[14px] font-medium">

            <a
              href="/support"
              className="flex items-center gap-2 transition-opacity hover:opacity-75"
            >
              <span className="text-[17px]">⌘</span>
              Super Branch
            </a>

            <a
              href="/locations"
              className="flex items-center gap-2 transition-opacity hover:opacity-75"
            >
              <span className="text-[17px]">Z</span>
              Trade Route
            </a>

            <a
              href="/transformation"
              className="flex items-center gap-2 transition-opacity hover:opacity-75"
            >
              <span className="text-[17px]">⌁</span>
              Transformation
            </a>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-6 text-[13px]">

            <a href="/fees" className="transition hover:underline">
              Product and Service Fees
            </a>

            <a href="/campaigns" className="transition hover:underline">
              Campaigns
            </a>

            <a href="/digital-banking" className="transition hover:underline">
              Digital Banking
            </a>

            <a
              href="/investor-relations"
              className="transition hover:underline"
            >
              Investor Relations
            </a>

            <a href="/about" className="transition hover:underline">
              Our Bank
            </a>

            <span className="h-5 w-px bg-white/50" />

            <a href="/" className="transition hover:underline">
              EN
            </a>

          </div>

        </div>
      </div>

      {/* ========================================================
          MOBILE TOP BAR
      ======================================================== */}

      <div className="block bg-[#ed0016] px-4 py-2.5 lg:hidden">
        <a
          href="/fees"
          className="block text-[11px] font-medium text-white"
        >
          Product and Service Fees
        </a>
      </div>

      {/* ========================================================
          MAIN HEADER
      ======================================================== */}

      <header className="relative z-50 border-b border-gray-100 bg-white">

        {/* ======================================================
            DESKTOP HEADER
        ====================================================== */}

        <div className="mx-auto hidden h-[82px] max-w-[1440px] items-center justify-between px-8 lg:flex">

          {/* LOGO */}

          <a href="/" className="shrink-0">

            <Image
              src="/icons/logo.gif"
              alt="Ziraat Bank Logo"
              width={170}
              height={60}
              priority
              className="h-[46px] w-auto object-contain"
            />

          </a>

          {/* DESKTOP NAV */}

          <nav className="flex items-center">

            <a
              href="/signup"
              className="
                border-r
                border-gray-300
                px-5
                text-[16px]
                font-semibold
                transition
                hover:text-[#ed0016]
              "
            >
              Individual
            </a>

            <a
              href="/signup"
              className="
                border-r
                border-gray-300
                px-5
                text-[16px]
                font-semibold
                transition
                hover:text-[#ed0016]
              "
            >
              Commercial
            </a>

            <a
              href="/signup"
              className="
                px-5
                text-[16px]
                font-semibold
                transition
                hover:text-[#ed0016]
              "
            >
              Institutional
            </a>

            {/* OFFLINE */}

            <a
              href="/request-offline"
              className="
                ml-3
                flex
                h-[48px]
                items-center
                justify-center
                rounded-full
                border-2
                border-gray-300
                px-6
                text-[15px]
                font-semibold
                transition
                hover:border-[#ed0016]
                hover:text-[#ed0016]
              "
            >
              Offline
            </a>

            {/* SEARCH */}

            <button
              type="button"
              aria-label="Search"
              className="
                ml-2
                flex
                h-[48px]
                w-[48px]
                items-center
                justify-center
                rounded-full
                border-2
                border-gray-300
                text-gray-900
                transition
                hover:border-[#ed0016]
                hover:text-[#ed0016]
              "
            >
              <LuSearch size={21} />
            </button>

            {/* INTERNET BANKING */}

            <a
              href="/login"
              className="
                ml-3
                flex
                h-[48px]
                items-center
                justify-center
                rounded-full
                border-2
                border-[#ed0016]
                px-7
                text-[16px]
                font-semibold
                text-gray-900
                transition
                hover:bg-[#ed0016]
                hover:text-white
              "
            >
              Internet Banking
            </a>

            {/* BECOME CUSTOMER */}

            <a
              href="/signup"
              className="
                ml-3
                flex
                h-[48px]
                items-center
                justify-center
                rounded-full
                border-2
                border-[#ed0016]
                bg-white
                px-7
                text-[16px]
                font-semibold
                text-gray-900
                transition
                hover:bg-[#ed0016]
                hover:text-white
              "
            >
              Become a Customer
            </a>

          </nav>

        </div>

        {/* ======================================================
            MOBILE HEADER
        ====================================================== */}

        <div className="block lg:hidden">

          <div className="flex h-[66px] items-center justify-between px-4">

            {/* LOGO */}

            <a href="/" className="shrink-0">

              <Image
                src="/icons/logo.gif"
                alt="Ziraat Bank Logo"
                width={145}
                height={55}
                priority
                className="h-[38px] w-auto object-contain"
              />

            </a>

            {/* MENU BUTTON */}

            <button
              type="button"
              onClick={() => setMobileMenu(true)}
              aria-label="Open menu"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-[25px]
                text-black
              "
            >
              ☰
            </button>

          </div>

          {/* MOBILE LOGIN BUTTONS */}

          <div className="flex items-center gap-2 px-4 pb-3">

            <a
              href="/login"
              className="
                flex
                h-[38px]
                flex-1
                items-center
                justify-center
                rounded-full
                border-[1.5px]
                border-[#ed0016]
                px-2
                text-[11px]
                font-semibold
                text-black
              "
            >
              Internet Banking
            </a>

            <a
              href="/signup"
              className="
                flex
                h-[38px]
                flex-1
                items-center
                justify-center
                rounded-full
                border-[1.5px]
                border-[#ed0016]
                px-2
                text-[11px]
                font-semibold
                text-black
              "
            >
              Become a Customer
            </a>

          </div>

        </div>

      </header>

      {/* ========================================================
          FIXED MOBILE FULL-SCREEN MENU

          Covers the ENTIRE header + viewport.
      ======================================================== */}

      {mobileMenu && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            h-[100dvh]
            w-screen
            flex-col
            overflow-hidden
            bg-white
            lg:hidden
          "
        >

          {/* ====================================================
              TOP MINI MENU
          ==================================================== */}

          <div className="shrink-0 border-b border-gray-100 px-3 py-2">

            <div className="flex items-center gap-1 overflow-x-auto">

              <MobilePill text="◉" />

              <MobilePill text="Ziraat" />

              <MobilePill text="Cards bankkart" />

              <MobilePill text="Süper Şube" />

              <span className="ml-auto shrink-0 px-2 text-[10px] font-medium">
                English
              </span>

            </div>

          </div>

          {/* ====================================================
              SINGLE MENU LOGO

              There is ONLY ONE logo inside the fixed menu.
          ==================================================== */}

          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-4">

            <Image
              src="/icons/logo.gif"
              alt="Ziraat Bank Logo"
              width={150}
              height={45}
              priority
              className="h-[34px] w-auto object-contain"
            />

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                text-black
              "
            >
              <LuX size={23} strokeWidth={1.8} />
            </button>

          </div>

          {/* ====================================================
              MAIN MENU CONTENT
          ==================================================== */}

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">

            <nav className="px-4 pt-10">

              <MobileLink
                href="/signup"
                text="Individual"
                close={closeMobileMenu}
              />

              <MobileLink
                href="/signup"
                text="Commercial"
                close={closeMobileMenu}
              />

              <MobileLink
                href="/signup"
                text="Institutional"
                close={closeMobileMenu}
              />

              <MobileLink
                href="/request-offline"
                text="Offline"
                close={closeMobileMenu}
              />

            </nav>

            {/* ==================================================
                BOTTOM MENU LINKS
            ================================================== */}

            <div className="mt-auto px-4 pb-5 pt-12">

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[9px] font-medium text-black">

                <a
                  href="/about"
                  onClick={closeMobileMenu}
                  className="hover:underline"
                >
                  About Our Bank
                </a>

                <span className="h-3 w-px bg-gray-300" />

                <a
                  href="/investor-relations"
                  onClick={closeMobileMenu}
                  className="hover:underline"
                >
                  Investor Relations
                </a>

                <span className="h-3 w-px bg-gray-300" />

                <a
                  href="/digital-banking"
                  onClick={closeMobileMenu}
                  className="hover:underline"
                >
                  Digital Banking
                </a>

                <span className="h-3 w-px bg-gray-300" />

                <a
                  href="/campaigns"
                  onClick={closeMobileMenu}
                  className="hover:underline"
                >
                  Campaigns
                </a>

              </div>

              {/* CALL / SEARCH */}

              <button
                type="button"
                className="
                  mt-4
                  flex
                  h-[42px]
                  w-full
                  items-center
                  justify-between
                  rounded-full
                  border
                  border-gray-300
                  px-5
                  text-[11px]
                  font-medium
                  text-gray-600
                "
              >
                <span>CALL</span>

                <LuSearch size={18} />

              </button>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================
          HERO SECTION
      ======================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#ed0016]
        "
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* ======================================================
            ABSTRACT RED BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* LARGE DARK ANGULAR SHAPE */}

          <div
            className="
              absolute
              -left-[160px]
              -top-[180px]
              h-[620px]
              w-[620px]
              rotate-[45deg]
              border-[2px]
              border-[#b50012]/30
            "
          />

          {/* SECOND ANGULAR SHAPE */}

          <div
            className="
              absolute
              -left-[70px]
              top-[20px]
              h-[500px]
              w-[500px]
              rotate-[45deg]
              border-[2px]
              border-[#b50012]/25
            "
          />

          {/* RIGHT ANGULAR SHAPE */}

          <div
            className="
              absolute
              -right-[250px]
              -bottom-[300px]
              h-[700px]
              w-[700px]
              rotate-[45deg]
              border-[2px]
              border-[#a90011]/25
            "
          />

          {/* ==================================================
              REPEATING DIAGONAL PATTERN

              This creates the angular pattern visible
              throughout the red hero.
          ================================================== */}

          <div
            className="absolute inset-0 opacity-[0.24]"
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  transparent 0px,
                  transparent 28px,
                  rgba(120,0,12,0.30) 29px,
                  rgba(120,0,12,0.30) 32px,
                  transparent 33px,
                  transparent 58px
                ),
                linear-gradient(
                  45deg,
                  transparent 0px,
                  transparent 42px,
                  rgba(120,0,12,0.22) 43px,
                  rgba(120,0,12,0.22) 46px,
                  transparent 47px,
                  transparent 78px
                )
              `,
              backgroundSize: "130px 130px",
            }}
          />

          {/* ==================================================
              LARGE CHEVRON
          ================================================== */}

          <div
            className="
              absolute
              left-[4%]
              top-[5%]
              h-[340px]
              w-[340px]
              rotate-[45deg]
              border-[3px]
              border-[#a90011]/20
            "
          />

          {/* ==================================================
              SUBTLE WHITE LIGHT
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-white/[0.05]
              via-transparent
              to-black/[0.05]
            "
          />

        </div>

        {/* ======================================================
            HERO CONTENT
        ====================================================== */}

        <div className="relative mx-auto max-w-[1440px]">

          {/* ====================================================
              DESKTOP HERO — SIMPLE 40 / 60 GRID
          ==================================================== */}

          <div className="hidden min-h-[470px] grid-cols-[40%_60%] lg:grid">

            {/* ==================================================
                LEFT — 40%
            ================================================== */}

            <div
              className="
                relative
                z-10
                flex
                flex-col
                justify-center
                px-8
                py-14
                xl:px-8
              "
            >

              <h1
                key={`title-${slide.id}`}
                className="
                  max-w-[610px]
                  text-[35px]
                  font-black
                  uppercase
                  leading-[1.18]
                  tracking-[-0.7px]
                  text-white
                  xl:text-[40px]
                "
              >
                {slide.title}
              </h1>

              {slide.description && (
                <p
                  key={`description-${slide.id}`}
                  className="
                    mt-5
                    max-w-[590px]
                    text-[18px]
                    font-semibold
                    leading-[1.65]
                    text-white
                    xl:text-[20px]
                  "
                >
                  {slide.description}
                </p>
              )}

              {/* CTA */}

              <div>

                <a
                  href={slide.buttonLink}
                  className="
                    mt-7
                    inline-flex
                    min-w-[215px]
                    items-center
                    justify-center
                    rounded-full
                    border-[5px]
                    border-[#a6000e]
                    bg-white
                    px-8
                    py-2.5
                    text-[16px]
                    font-bold
                    text-gray-900
                    shadow-md
                    transition-all
                    duration-200
                    hover:scale-[1.02]
                    hover:bg-gray-100
                  "
                >
                  {slide.button}
                </a>

              </div>

              {/* =================================================
                  DESKTOP SLIDER
              ================================================= */}

              <div className="mt-14 flex items-center gap-2">

                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => changeSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`
                      rounded-full
                      border
                      border-white
                      transition-all
                      duration-200
                      ${
                        currentSlide === index
                          ? "h-[18px] w-[18px] border-[3px] bg-[#ed0016] ring-2 ring-white"
                          : "h-[11px] w-[11px] bg-white/45"
                      }
                    `}
                  />
                ))}

                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? "Play slider" : "Pause slider"}
                  className="
                    ml-1
                    flex
                    h-[24px]
                    w-[24px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white
                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  {paused ? "▶" : "Ⅱ"}
                </button>

              </div>

            </div>

            {/* ==================================================
                RIGHT — 60%
            ================================================== */}

            <div className="relative min-h-[470px] overflow-hidden">

              <img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-opacity
                  duration-700
                "
              />

              {/* RED BLEND AT IMAGE EDGE */}

              <div
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-[100px]
                  bg-gradient-to-r
                  from-[#ed0016]/50
                  to-transparent
                "
              />

              {/* TOP IMAGE BLEND */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[25px]
                  bg-gradient-to-b
                  from-[#ed0016]/20
                  to-transparent
                "
              />

            </div>

          </div>

          {/* ====================================================
              MOBILE HERO

              KEPT SIMPLE AND RESPONSIVE
          ==================================================== */}

          <div className="block lg:hidden">

            {/* IMAGE */}

            <div className="relative h-[180px] overflow-hidden sm:h-[270px]">

              <img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

            </div>

            {/* RED CONTENT */}

            <div className="relative px-5 pb-6 pt-6">

              <h1
                key={`mobile-title-${slide.id}`}
                className="
                  text-center
                  text-[25px]
                  font-black
                  uppercase
                  leading-[1.15]
                  tracking-[-0.3px]
                  text-white
                  sm:text-[30px]
                "
              >
                {slide.title}
              </h1>

              {slide.description && (
                <p
                  key={`mobile-description-${slide.id}`}
                  className="
                    mx-auto
                    mt-3
                    max-w-[600px]
                    text-center
                    text-[14px]
                    font-semibold
                    leading-[1.45]
                    text-white
                    sm:text-[16px]
                  "
                >
                  {slide.description}
                </p>
              )}

              {/* CTA */}

              <div className="flex justify-center">

                <a
                  href={slide.buttonLink}
                  className="
                    mt-5
                    inline-flex
                    min-w-[175px]
                    items-center
                    justify-center
                    rounded-full
                    border-[4px]
                    border-[#a6000e]
                    bg-white
                    px-6
                    py-2
                    text-[13px]
                    font-bold
                    text-gray-900
                    shadow-md
                  "
                >
                  {slide.button}
                </a>

              </div>

              {/* MOBILE DOTS */}

              <div className="mt-5 flex items-center justify-center gap-[5px]">

                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => changeSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`
                      rounded-full
                      border
                      border-white
                      transition-all
                      duration-200
                      ${
                        currentSlide === index
                          ? "h-[8px] w-[8px] bg-white"
                          : "h-[7px] w-[7px] bg-white/40"
                      }
                    `}
                  />
                ))}

                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? "Play slider" : "Pause slider"}
                  className="
                    ml-1
                    flex
                    h-[17px]
                    w-[17px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white
                    text-[6px]
                    font-bold
                    text-white
                  "
                >
                  {paused ? "▶" : "Ⅱ"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          FLOATING SUPPORT BUTTON
      ======================================================== */}

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://tawk.to/chat/6ab431538582123445b61beb/1k37u1coh"
        aria-label="Customer support"
        className="
          fixed
          bottom-6
          right-6
          z-[120]
          flex
          h-[76px]
          w-[76px]
          items-center
          justify-center
          rounded-full
          border-[6px]
          border-gray-500/40
          bg-white
          shadow-lg
          transition-transform
          duration-200
          hover:scale-105
          max-[700px]:bottom-5
          max-[700px]:right-5
          max-[700px]:h-[62px]
          max-[700px]:w-[62px]
        "
      >

        <span
          className="
            flex
            h-[51px]
            w-[51px]
            items-center
            justify-center
            rounded-full
            bg-[#ed0016]
            text-white
            max-[700px]:h-[43px]
            max-[700px]:w-[43px]
          "
        >
          <LuMessageSquareMore
            size={27}
            strokeWidth={2}
            className="max-[700px]:h-[23px] max-[700px]:w-[23px]"
          />
        </span>

      </a>

    </main>
  );
};

/* ==============================================================
   MOBILE NAV LINK
============================================================== */

function MobileLink({ href, text, close }) {
  return (
    <a
      href={href}
      onClick={close}
      className="
        block
        w-full
        border-b
        border-gray-300
        py-5
        text-center
        text-[15px]
        font-semibold
        text-black
        transition
        hover:text-[#ed0016]
      "
    >
      {text}
    </a>
  );
}

/* ==============================================================
   MOBILE TOP PILL
============================================================== */

function MobilePill({ text }) {
  return (
    <div
      className="
        flex
        h-[34px]
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-gray-300
        px-3
        text-[9px]
        font-semibold
        text-black
      "
    >
      {text}
    </div>
  );
}

/* ==============================================================
   QUICK LINK
============================================================== */

function QuickLink({ title, description, href }) {
  return (
    <a
      href={href}
      className="
        group
        border-b
        border-r
        border-gray-200
        px-5
        py-5
        transition
        hover:bg-gray-50
        lg:px-7
        lg:py-6
      "
    >
      <div
        className="
          text-[16px]
          font-bold
          text-gray-900
          transition
          group-hover:text-[#ed0016]
        "
      >
        {title}
      </div>

      <div className="mt-1 text-xs text-gray-500">
        {description}
      </div>
    </a>
  );
}

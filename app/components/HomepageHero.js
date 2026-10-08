"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuMessageSquareMore, LuSearch, LuX } from "react-icons/lu";

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
              href="https://tawk.to/chat/6ab431538582123445b61beb/1k37u1coh"
              className="flex items-center gap-2 transition-opacity hover:opacity-75"
            >
              <span className="text-[17px]">⌘</span>
              Super Branch
            </a>

            <a
              href="#"
              className="flex items-center gap-2 transition-opacity hover:opacity-75"
            >
              <span className="text-[17px]">Z</span>
              Trade Route
            </a>

            <a
              href="/login"
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
          MAIN NAVIGATION
      ======================================================== */}

      <header className="relative z-[100] border-b border-gray-100 bg-white">
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
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
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
              {mobileMenu ? <LuX size={25} /> : "☰"}
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
                text-sm
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
                text-sm
                font-semibold
                text-black
              "
            >
              Become a Customer
            </a>
          </div>
        </div>

        {/* ======================================================
            MOBILE MENU
        ====================================================== */}

        {mobileMenu && (
          <div
            className="
              fixed
              left-0
              right-0
              top-0
              bottom-0
              z-[110]
              max-h-[calc(100vh-100px)]
              overflow-y-auto
              border-t
              border-gray-200
              bg-white
              shadow-2xl
              lg:hidden
            "
          >
            {/* TOP MINI ITEMS */}

            <div className="flex items-center gap-1 overflow-x-auto px-3 py-2">
              <MobilePill link="/" text="◉" />
              <MobilePill link="/request-offline" text="Offline Banking" />
              <MobilePill link="#" text="Bankkart" />
              
              <a href="/" className="ml-auto shrink-0 text-sm font-medium">
                English
              </a>
            </div>

            {/* MOBILE LOGO ROW */}

            <div className="flex items-center justify-between px-4 py-4">
              <Image
                src="/icons/logo.gif"
                alt="Ziraat Bank Logo"
                width={150}
                height={45}
                className="h-[34px] w-auto object-contain"
              />

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="text-2xl font-light text-black"
              >
                <LuX size={22} />
              </button>
            </div>

            {/* MAIN LINKS */}

            <nav className="flex flex-col justify-center px-4 items-center w-full text-lg gap-2 py-10">
              <MobileLink
                href="/signup"
                text="Individual"
                close={() => setMobileMenu(false)}
              />

              <MobileLink
                href="/signup"
                text="Commercial"
                close={() => setMobileMenu(false)}
              />

              <a
                href={"/request-offline"}
                onClick={close}
                className="
                py-4
                text-[16px]
                font-semibold
                w-full
                text-center
                transition
                hover:text-isoColor1
              "
              >
                Institutional
              </a>

              <div className="py-8"></div>

              <div className="flex w-fit items-center gap-5 text-xs font-medium text-black">
                <a href="/about" className="hover:underline">
                  About Our Bank
                </a>

                <span className="opacity-50">|</span>

                <a href="/investor-relations" className="hover:underline">
                  Investor Relations
                </a>

                <span className="opacity-50">|</span>

                <a href="/digital-banking" className="hover:underline">
                  Digital Banking
                </a>

                <span className="opacity-50">|</span>

                <a href="/campaigns" className="hover:underline">
                  Campaigns
                </a>
              </div>

              {/* MOBILE LOGIN */}

              <button
                type="button"
                className="
                  mt-5
                  flex
                  h-12
                  w-full
                  items-center
                  justify-between
                  px-6
                  rounded-full
                  text-sm
                  border-2
                  border-gray-300
                  font-semibold
                  text-gray-500
                "
              >
                <span>CALL</span>
                <span className="text-3xl">⌕</span>
              </button>
            </nav>
          </div>
        )}
      </header>

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
            ZIRAAT STYLE IMAGE BACKGROUND
        ====================================================== */}

        <div
          className="relative min-h-screen w-full h-fit overflow-hidden bg-[#ed0016] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/herobackground.png')",
          }}
        >

        <div className="relative mx-auto max-w-[1440px]">
          {/* ====================================================
              DESKTOP HERO
          ==================================================== */}

          <div className="relative hidden min-h-[470px] lg:block">
            {/* ==================================================
                IMAGE
            ================================================== */}

            <div className="absolute right-0 top-0 h-full w-[60%] overflow-hidden">
               <div className="py-7">
                 <img
                   key={slide.image}
                   src={slide.image}
                   alt={slide.title}
                   className="
                     h-full
                     w-full
                     object-cover
                     transition-all
                     duration-700
                   "
                 />
               </div>

              
            </div>

            {/* ==================================================
                CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-20
                flex
                min-h-[470px]
                w-[58%]
                flex-col
                justify-center
                px-8
                py-12
                xl:px-8
              "
            >
              <h1
                key={`title-${slide.id}`}
                className="
                  max-w-[790px]
                  text-[36px]
                  font-black
                  uppercase
                  leading-[1.18]
                  tracking-[-0.8px]
                  text-white
                  xl:text-[41px]
                "
              >
                {slide.title}
              </h1>

              {slide.description && (
                <p
                  key={`description-${slide.id}`}
                  className="
                    mt-5
                    max-w-[700px]
                    text-[19px]
                    font-semibold
                    leading-[1.65]
                    text-white
                    xl:text-[21px]
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
                    mt-6
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

              {/* ==================================================
                  DESKTOP SLIDER CONTROLS
              ================================================== */}

              <div className="absolute bottom-6 left-8 flex items-center gap-2">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => changeSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`
                      h-[11px]
                      w-[11px]
                      rounded-full
                      border
                      border-white
                      transition-all
                      duration-200
                      ${
                        currentSlide === index
                          ? "h-[18px] w-[18px] border-[3px] bg-[#fff] ring-2 ring-black"
                          : "bg-white/45"
                      }
                    `}
                  />
                ))}

                {/* PAUSE */}

                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? "Play slider" : "Pause slider"}
                  className="
                    ml-1
                    flex
                    h-[23px]
                    w-[23px]
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
          </div>

          {/* ====================================================
              MOBILE HERO
          ==================================================== */}

          <div className="block lg:hidden">
            {/* ==================================================
                MOBILE CONTENT
            ================================================== */}

            <div className="relative z-10 px-5 pb-6 pt-6">
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

              {/* MOBILE IMAGE */}

              <div
                className="
                  relative
                  mx-auto
                  mt-5
                  h-[180px]
                  w-full
                  max-w-[520px]
                  overflow-hidden
                  bg-white
                  sm:h-[270px]
                "
              >
                <img
                  key={`mobile-image-${slide.image}`}
                  src={slide.image}
                  alt={slide.title}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>

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

              {/* MOBILE SLIDER */}

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
      </div>
      </section>

      {/* ========================================================
          FLOATING SUPPORT BUTTON
      ======================================================== */}

      <a
        href="https://tawk.to/chat/6ab431538582123445b61beb/1k37u1coh"
         target="_blank"
        aria-label="Customer support"
        className="
                  fixed
                  bottom-6
                  right-5
                  z-40
                  w-[78px]
                  h-[78px]
                  p-0
                  grid
                  place-items-center
                  rounded-full
                  border-[7px]
                  border-black/20
                  bg-white/90
                  cursor-pointer
                  transition
                  hover:scale-105
                  max-[700px]:right-5
                  max-[700px]:bottom-[25px]
                "
      >
        <span
          className="
                    w-[51px]
                    h-[51px]
                    grid
                    place-items-center
                    rounded-full
                    bg-[#ed0016]
                    text-white
                  "
        >
          <LuMessageSquareMore size={27} strokeWidth={2} />
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

function MobilePill({ text, link }) {
  return (
    <a
      href={link}
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
        text-sm
        font-semibold
        text-black
      "
    >
      {text}
    </a>
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

      <div className="mt-1 text-xs text-gray-500">{description}</div>
    </a>
  );
}


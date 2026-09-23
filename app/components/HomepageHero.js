"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { LuMessageSquareMore } from 'react-icons/lu';

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
    title: "ZIRAAT OPEN BANKING: OPEN BANKING FOR ALL YOUR ACCOUNTS AND CARDS!",
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
    description:
      "",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const slide = heroSlides[currentSlide];

  /* ------------------------------------------------------------
     AUTOMATIC SLIDER
  ------------------------------------------------------------ */

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrentSlide((previous) => {
        return (previous + 1) % heroSlides.length;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [paused]);

  /* ------------------------------------------------------------
     CHANGE SLIDE
  ------------------------------------------------------------ */

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ========================================================
          TOP BAR
      ======================================================== */}

      <div className="hidden bg-isoColor1 text-white lg:block">
        <div className="mx-auto flex h-[46px] max-w-[1440px] items-center justify-between px-8">
          {/* LEFT */}

          <div className="flex items-center gap-8 text-sm font-medium">
            <a href="/support" className="transition hover:opacity-75">
              Super Branch
            </a>

            <a href="/locations" className="transition hover:opacity-75">
              Trade Route
            </a>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-7 text-sm">
            <a href="/fees" className="hover:underline">
              Product and Service Fees
            </a>
            <a href="/campaigns" className="hover:underline">
              Campaigns
            </a>
            <a href="/digital-banking" className="hover:underline">
              Digital Banking
            </a>

            <a href="/investor-relations" className="hover:underline">
              Investor Relations
            </a>

            <a href="/about" className="hover:underline">
              Our Bank
            </a>
            <span className="opacity-50">|</span>
            <a href="/" className="hover:underline">
              EN
            </a>
          </div>
        </div>
      </div>

      <a
        href="/fees"
        className="block text-xs text-white bg-isoColor1 px-4 py-3 lg:hidden"
      >
        Product and Service Fees
      </a>

      {/* ========================================================
          MAIN NAVIGATION
      ======================================================== */}

      <header className="relative z-50 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 lg:px-8">
          {/* ====================================================
              LOGO
          ==================================================== */}

          <a href="/" className="flex items-center gap-3">
            {/* M LOGO 

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-isoColor1 text-[26px] font-black text-white shadow-sm">
              Z
            </div> */}

            <Image
              src={"/icons/logo.gif"}
              alt={"Ziraat Bank Logo"}
              width={100}
              height={100}
              className="h-11 w-auto lg:block"
            />

            {/* COMPANY NAME 

            <div className="leading-none hidden">
              <div className="text-[19px] font-extrabold tracking-tight text-black">
                Ziraat Bank
              </div>
            </div> */}
          </a>

          {/* ====================================================
              DESKTOP NAV
          ==================================================== */}

          <nav className="hidden items-center lg:flex">
            <a
              href="/signup"
              className="border-r border-gray-300 px-5 text-[16px] font-semibold transition hover:text-isoColor1"
            >
              Individual
            </a>

            <a
              href="/signup"
              className="border-r border-gray-300 px-5 text-[16px] font-semibold transition hover:text-isoColor1"
            >
              Commercial
            </a>

            <a
              href="/signup"
              className="px-5 text-[16px] font-semibold transition hover:text-isoColor1"
            >
              Institutional
            </a>

            {/* SERVICES */}

            <a
            href='/request-offline'
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
                font-semibold
                transition
                hover:border-isoColor1
                hover:text-isoColor1
              "
            >
              Offline
            </a>

            {/* SEARCH */}

            <button
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
                text-xl
                transition
                hover:border-isoColor1
                hover:text-isoColor1
              "
            >
              ⌕
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
                border-isoColor1
                px-7
                text-[16px]
                font-semibold
                transition
                hover:bg-isoColor1/70
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
                bg-isoColor1
                px-7
                text-[16px]
                font-semibold
                text-white
                transition
                hover:bg-isoColor1/70
              "
            >
              Become a Customer
            </a>
          </nav>

          {/* ====================================================
              MOBILE MENU BUTTON
          ==================================================== */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-lg
              text-2xl
              text-gray-900
              lg:hidden
            "
            aria-label="Toggle menu"
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>

        <div className="flex items-center px-4 pb-4 justify-between bg-white lg:hidden">
          {/* MOBILE LOGIN */}

          <a
            href="/login"
            className="
                  mt-5
                  flex
                  h-10
                  px-4
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-isoColor1
                  font-medium
                  text-sm
                  text-black
                "
          >
            Internet Banking
          </a>

          {/* MOBILE SIGNUP */}

          <a
            href="/signup"
            className="
                  mt-5
                  flex
                  h-10
                  px-4
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-isoColor1
                  font-medium
                  text-sm
                  text-black
                "
          >
            Become a Customer
          </a>
        </div>

        {/* ======================================================
            MOBILE NAVIGATION
        ====================================================== */}

        {mobileMenu && (
          <div className="absolute left-0 right-0 h-fit top-full border-t border-gray-100 bg-white px-5 py-6 shadow-2xl lg:hidden">
            <nav className="flex flex-col justify-center items-center w-full text-lg gap-2 py-10">
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
                href={"/signup"}
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
        className="relative overflow-hidden bg-isoColor1"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ======================================================
            SUBTLE BACKGROUND PATTERN
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  transparent 45%,
                  white 46%,
                  transparent 47%
                ),
                linear-gradient(
                  45deg,
                  transparent 45%,
                  white 46%,
                  transparent 47%
                )
              `,
              backgroundSize: "140px 140px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          {/* ====================================================
              DESKTOP HERO
          ==================================================== */}

          <div className="hidden min-h-[470px] grid-cols-[40%_60%] lg:grid">
            {/* ------------------------------------------------
                LEFT CONTENT
            ------------------------------------------------ */}

            <div className="relative z-10 flex flex-col justify-center px-8 py-14 xl:px-12">
              <h1
                key={`title-${slide.id}`}
                className="
                  max-w-[600px]
                  text-[36px]
                  font-black
                  uppercase
                  leading-[1.12]
                  tracking-tight
                  text-white
                  xl:text-[42px]
                "
              >
                {slide.title}
              </h1>

              <p
                key={`description-${slide.id}`}
                className="
                  mt-5
                  max-w-[590px]
                  text-[18px]
                  font-medium
                  leading-8
                  text-white
                  xl:text-[20px]
                "
              >
                {slide.description}
              </p>

              {/* CTA */}

              <div>
                <a
                  href={slide.buttonLink}
                  className="
                    mt-7
                    inline-flex
                    rounded-full
                    border-[5px]
                    border-black/70
                    bg-white
                    px-8
                    py-3
                    text-[16px]
                    font-bold
                    text-gray-900
                    shadow-lg
                    transition
                    hover:bg-gray-100
                  "
                >
                  {slide.button}
                </a>
              </div>

              {/* =================================================
                  SLIDER CONTROLS
              ================================================= */}

              <div className="mt-14 flex items-center gap-2">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => changeSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-white
                      transition-all
                      ${
                        currentSlide === index
                          ? "scale-125 bg-white"
                          : "bg-white/40"
                      }
                    `}
                  />
                ))}

                {/* PLAY / PAUSE */}

                <button
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? "Play" : "Pause"}
                  className="
                    ml-2
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {paused ? "▶" : "Ⅱ"}
                </button>
              </div>
            </div>

            {/* ------------------------------------------------
                RIGHT IMAGE
            ------------------------------------------------ */}

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

              {/* BLUE IMAGE BLEND */}

              <div
                className="
                absolute
                inset-y-0
                left-0
                w-40
                bg-gradient-to-r
                from-isoColor1/50
                to-transparent
              "
              />
            </div>
          </div>

          {/* ====================================================
              MOBILE HERO
          ==================================================== */}

          <div className="block lg:hidden">
            {/* IMAGE */}

            <div className="relative h-[230px] overflow-hidden sm:h-[300px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* BLUE CONTENT */}

            <div className="px-5 pb-7 pt-7">
              <h1
                className="
                  text-center
                  text-[25px]
                  font-black
                  uppercase
                  leading-[1.18]
                  text-white
                  sm:text-[30px]
                "
              >
                {slide.title}
              </h1>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-xl
                  text-center
                  text-[15px]
                  font-medium
                  leading-6
                  text-white
                "
              >
                {slide.description}
              </p>

              {/* CTA */}

              <div className="flex justify-center">
                <a
                  href={slide.buttonLink}
                  className="
                    mt-5
                    inline-flex
                    rounded-full
                    border-[4px]
                    border-[#000]
                    bg-white
                    px-7
                    py-2.5
                    text-sm
                    font-bold
                    text-gray-900
                  "
                >
                  {slide.button}
                </a>
              </div>

              {/* MOBILE DOTS */}

              <div className="mt-6 flex justify-center gap-2">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => changeSlide(index)}
                    className={`
                      h-2.5
                      w-2.5
                      rounded-full
                      border
                      border-white
                      ${currentSlide === index ? "bg-white" : "bg-white/40"}
                    `}
                  />
                ))}

                <button
                  onClick={() => setPaused(!paused)}
                  className="ml-1 text-xs text-white"
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
        href="https://embed.tawk.to/6ab431538582123445b61beb/1k37u1coh"
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
                  border-gray-500/45
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
}


/* ==============================================================
   MOBILE NAV LINK
============================================================== */

function MobileLink({ href, text, close }) {
  return (
    <a
      href={href}
      onClick={close}
      className="
        border-b
        border-b-2
        border-gray-300
        py-4
        text-[16px]
        font-semibold
        w-full
        text-center
        transition
        hover:text-isoColor1
      "
    >
      {text}
    </a>
  );
}


/* ==============================================================
   QUICK LINK
============================================================== */

function QuickLink({
  title,
  description,
  href,
}) {
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
          group-hover:text-isoColor1
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

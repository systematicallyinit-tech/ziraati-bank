"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  MessageSquare,
  Copy,
  Check,
  X,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

/*
|--------------------------------------------------------------------------
| DIGITAL BANKING PAGE
|--------------------------------------------------------------------------
|
| Next.js 16
| JavaScript
| Tailwind CSS
|
| Everything is contained in this single file.
|
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| DIGITAL BANKING DATA
|--------------------------------------------------------------------------
*/

const digitalBankingCards = [
  {
    id: "internet-banking",

    title: "Internet Banking",

    image: "/img/internet-banking.png",

    links: [
      "Individual Internet Banking",
      "Corporate Internet Branch",
      "How do I do it?",
    ],
  },

  {
    id: "mobile-banking",

    title: "Mobile Banking",

    image: "/img/mobile-banking.png",

    links: [
      "Ziraat Mobile",
      "Ziraat Mobile Corporate",
      "Online Application",
      "How do I do it?",
    ],
  },

  {
    id: "agricultural-bank",

    title: "Innovations from the Agricultural Bank",

    image: "/img/agricultural-bank.jpg",

    links: [
      "Become a customer through Ziraat Mobile and start benefiting from Ziraat’s advantages immediately.",
      "Z-Transformation",
      "Agricultural Farmers Platform",
      "I want to be a Ziraat Bank student.",
      "Stock market and VIOP (Futures and Options) transactions are now available on Ziraat Mobile.",
      "Bankkart Mobile POS",
    ],
  },
];

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function DigitalBankingPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | BACK BUTTON
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | COPY CURRENT URL
  |--------------------------------------------------------------------------
  */

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setShareOpen(false);
      }, 1200);
    } catch (error) {
      console.error("Unable to copy page URL:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#d5d3d6]">
      <Header />

      {/* =========================================================
          FULL BACKGROUND
      ========================================================= */}

      <section
        className="
          relative
          min-h-screen
          bg-cover
          bg-center
          bg-fixed
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(70, 65, 76, 0.30),
              rgba(70, 65, 76, 0.30)
            ),
            url('/img/ziraat-background.avif')
          `,
        }}
      >
        {/* Slight overlay */}

        <div
          className="
            absolute
            inset-0
            bg-black/[0.025]
          "
        />

        {/* =======================================================
            HEADER
        ======================================================= */}

        <header
          className="
            relative
            z-30
            px-4
            pt-5
            sm:px-6
            sm:pt-6
            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              max-w-[1300px]
            "
          >
            {/* ===================================================
                TOP HEADER BUTTONS
            =================================================== */}

            <div
              className="
                flex
                items-start
                justify-between
              "
            >
              {/* BACK */}

              <button
                type="button"
                onClick={handleBack}
                aria-label="Go back"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  text-white
                  transition-all
                  duration-200
                  hover:bg-white/15
                  active:scale-95
                  sm:h-[52px]
                  sm:w-[52px]
                "
              >
                <ArrowLeft size={30} strokeWidth={1.5} />
              </button>

              {/* SHARE */}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShareOpen((value) => !value)}
                  aria-label="Share page"
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    text-white
                    transition-all
                    duration-200
                    hover:bg-white/15
                    active:scale-95
                    sm:h-[52px]
                    sm:w-[52px]
                  "
                >
                  <Share2 size={25} strokeWidth={1.5} />
                </button>

                {/* SHARE POPUP */}

                {shareOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[62px]
                      z-[100]
                      w-[215px]
                      rounded-2xl
                      bg-white
                      p-3
                      shadow-2xl
                    "
                  >
                    <div
                      className="
                        px-2
                        py-1
                        text-sm
                        font-semibold
                        text-[#27364a]
                      "
                    >
                      Share this page
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="
                        mt-1
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        text-gray-600
                        transition
                        hover:bg-gray-100
                      "
                    >
                      {copied ? (
                        <Check size={18} className="text-green-600" />
                      ) : (
                        <Copy size={18} />
                      )}

                      <span>{copied ? "Copied!" : "Copy page link"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ===================================================
                PAGE TITLE
            =================================================== */}

            <div
              className="
                mt-[-3px]
                text-center
                text-white
                sm:mt-[-5px]
              "
            >
              <h1
                className="
                  text-[34px]
                  font-light
                  leading-none
                  tracking-[-1px]
                  sm:text-[39px]
                  md:text-[42px]
                  lg:text-[43px]
                "
              >
                Digital Banking
              </h1>

              {/* =================================================
                  BREADCRUMB
              ================================================= */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-1
                  text-[12px]
                  sm:text-[13px]
                "
              >
                <button
                  type="button"
                  className="
                    underline
                    underline-offset-2
                    hover:no-underline
                  "
                >
                  Home
                </button>

                <ChevronRight size={13} strokeWidth={1.5} />

                <span
                  className="
                    underline
                    underline-offset-2
                  "
                >
                  Digital Banking
                </span>

                <span
                  className="
                    ml-1
                    flex
                    h-[19px]
                    w-[19px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#777]
                  "
                >
                  <ChevronDown size={15} strokeWidth={2} />
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <section
          className="
            relative
            z-10
            mx-auto
            mt-7
            max-w-[1300px]
            px-4
            pb-10
            sm:mt-7
            sm:px-6
            lg:px-0
          "
        >
          {/* =====================================================
              CARDS GRID
          ===================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
              lg:gap-[30px]
            "
          >
            {digitalBankingCards.map((card) => (
              <DigitalBankingCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| DIGITAL BANKING CARD
|--------------------------------------------------------------------------
*/

function DigitalBankingCard({ card }) {
  return (
    <article
      className="
        group
        relative
        flex
        min-h-[540px]
        flex-col
        overflow-hidden
        rounded-[10px]
        bg-white/95
        shadow-[0_1px_5px_rgba(0,0,0,0.04)]
        backdrop-blur-[2px]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      "
    >

      {/* =========================================================
          CARD CONTENT
      ========================================================= */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-[30px]
          pb-[30px]
          pt-[23px]
          sm:px-[30px]
          sm:pt-[23px]
        "
      >

        {/* =======================================================
            CARD TITLE
        ======================================================= */}

        <h2
          className="
            mb-[18px]
            text-[19px]
            font-normal
            leading-[1.25]
            text-[#e30613]
            sm:text-[20px]
          "
        >
          {card.title}
        </h2>

        {/* =======================================================
            IMAGE
        ======================================================= */}

        <div
          className="
            relative
            mb-[18px]
            aspect-[1.84/1]
            w-full
            overflow-hidden
            rounded-[6px]
            bg-[#eeeeee]
          "
        >

          <img
            src={card.image}
            alt={card.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.025]
            "
          />

        </div>

        {/* =======================================================
            LINKS
        ======================================================= */}

        <div
          className="
            flex
            flex-col
          "
        >

          {card.links.map((link, index) => (

            <button
              key={`${card.id}-${index}`}
              type="button"
              className="
                group/link
                flex
                min-h-[43px]
                w-full
                items-center
                border-b
                border-[#c9c9c9]
                py-[9px]
                text-left
                text-[15px]
                font-normal
                leading-[1.25]
                text-[#272727]
                transition-colors
                duration-200
                hover:text-[#e30613]
                last:border-b-0
              "
            >

              <span
                className="
                  transition-transform
                  duration-200
                  group-hover/link:translate-x-[2px]
                "
              >
                {link}
              </span>

            </button>

          ))}

        </div>

      </div>

    </article>
  );
}
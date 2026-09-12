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
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

/*
|--------------------------------------------------------------------------
| INVESTOR RELATIONS PAGE
|--------------------------------------------------------------------------
|
| Next.js 16
| JavaScript
| Tailwind CSS
|
| Everything for this page is contained in this single file.
|
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| CORPORATE INFORMATION
|--------------------------------------------------------------------------
*/

const corporateInformation = [
  {
    label: "Today, Ziraat Bank",
  },
  {
    label: "Ziraat Finance Group",
  },
  {
    label: "Domestic Subsidiaries",
    subItem: true,
  },
  {
    label: "Other Domestic Subsidiaries",
    subItem: true,
  },
  {
    label:
      "Foreign Subsidiary Banks, Branches and Representative Offices",
    subItem: true,
  },
  {
    label: "Our Bank’s Board of Directors",
  },
  {
    label: "Senior Management",
  },
  {
    label: "Our Organizational Structure",
  },
];

/*
|--------------------------------------------------------------------------
| CORPORATE GOVERNANCE
|--------------------------------------------------------------------------
*/

const corporateGovernance = [
  "Vision and Mission",
  "Articles of Association",
  "Internal Regulations",
  "General Assembly Meetings",
  "Commercial Registry Information",
  "Our Bank’s Compliance Policy",
  "Information Policy",
  "Sustainability Policy",
];

/*
|--------------------------------------------------------------------------
| SUMMARY FINANCIAL DATA
|--------------------------------------------------------------------------
*/

const financialData = [
  {
    heading: "Balance Sheet Data (Billion TL)",
    value: "June 30, 2026",
  },
  {
    heading: "Ratios (%)",
    value: "",
  },
];

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function InvestorRelationsPage() {
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
  | COPY PAGE URL
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
      console.error("Unable to copy URL:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#d5d3d6]">
      <Header />

      {/* =========================================================
          BACKGROUND
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
        {/* Slight background overlay */}

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
                HEADER BUTTONS
            =================================================== */}

            <div
              className="
                flex
                items-start
                justify-between
              "
            >
              {/* BACK BUTTON */}

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
                mt-[-4px]
                text-center
                text-white
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
                Investor Relations
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
                  Investor Relations
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
            sm:px-6
            lg:px-0
          "
        >
          {/* =====================================================
              TOP ROW
          ===================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-2
              lg:gap-[30px]
            "
          >
            {/* ===================================================
                CORPORATE INFORMATION
            =================================================== */}

            <InvestorCard
              title="Corporate Information"
              image="/images/corporate-information.jpg"
              imageAlt="Corporate Information"
            >
              <div className="w-full lg:w-[52%]">
                {corporateInformation.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`
                        group
                        relative
                        flex
                        w-full
                        items-center
                        border-b
                        border-[#c8c8c8]
                        text-left
                        text-[15px]
                        leading-[1.25]
                        text-[#282828]
                        transition-colors
                        hover:text-[#e30613]
                        ${
                          item.subItem
                            ? "min-h-[28px] border-b-0 pl-3 text-[14px]"
                            : "min-h-[43px]"
                        }
                      `}
                  >
                    {item.subItem && (
                      <span
                        className="
                            absolute
                            left-0
                            top-1/2
                            h-[15px]
                            w-[3px]
                            -translate-y-1/2
                            bg-[#e30613]
                          "
                      />
                    )}

                    <span
                      className="
                          transition-transform
                          duration-200
                          group-hover:translate-x-[2px]
                        "
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </InvestorCard>

            {/* ===================================================
                CORPORATE GOVERNANCE
            =================================================== */}

            <InvestorCard
              title="Corporate Governance"
              image="/images/corporate-governance.jpg"
              imageAlt="Corporate Governance"
            >
              <div className="w-full lg:w-[52%]">
                {corporateGovernance.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className="
                        group
                        flex
                        min-h-[43px]
                        w-full
                        items-center
                        border-b
                        border-[#c8c8c8]
                        text-left
                        text-[15px]
                        leading-[1.25]
                        text-[#282828]
                        transition-colors
                        hover:text-[#e30613]
                        last:border-b-0
                      "
                  >
                    <span
                      className="
                          transition-transform
                          duration-200
                          group-hover:translate-x-[2px]
                        "
                    >
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </InvestorCard>
          </div>

          {/* =====================================================
              SECOND ROW
          ===================================================== */}

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-[2fr_1fr]
              lg:gap-[30px]
            "
          >
            {/* ===================================================
                SUMMARY FINANCIAL DATA
            =================================================== */}

            <section
              className="
                min-h-[300px]
                overflow-hidden
                rounded-[10px]
                bg-white/95
                px-[30px]
                pb-8
                pt-[23px]
                backdrop-blur-[2px]
              "
            >
              <h2
                className="
                  mb-5
                  text-[19px]
                  font-normal
                  leading-[1.25]
                  text-[#e30613]
                  sm:text-[20px]
                "
              >
                Summary Financial Data
                <span className="hidden sm:inline">
                  {" "}
                  (Non-Consolidated Data)
                </span>
                <span className="sm:hidden"> (Non-Consolidated Data)</span>
              </h2>

              {/* Financial headings */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  sm:gap-8
                "
              >
                {/* Balance sheet */}

                <div>
                  <div
                    className="
                      flex
                      min-h-[43px]
                      items-center
                      justify-between
                      border-b
                      border-[#c8c8c8]
                      text-[14px]
                      font-semibold
                      text-[#262626]
                      sm:text-[15px]
                    "
                  >
                    <span>
                      Balance Sheet Data
                      <span className="hidden sm:inline"> (Billion TL)</span>
                    </span>

                    <span className="ml-3 whitespace-nowrap">
                      June 30, 2026
                    </span>
                  </div>
                </div>

                {/* Ratios */}

                <div>
                  <div
                    className="
                      flex
                      min-h-[43px]
                      items-center
                      border-b
                      border-[#c8c8c8]
                      text-[14px]
                      font-semibold
                      text-[#262626]
                      sm:text-[15px]
                    "
                  >
                    Ratios (%)
                  </div>
                </div>
              </div>

              {/* Small data area */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                <div
                  className="
                    h-[55px]
                    rounded-md
                    bg-transparent
                  "
                />

                <div
                  className="
                    h-[55px]
                    rounded-md
                    bg-transparent
                  "
                />
              </div>
            </section>

            {/* ===================================================
                FINANCIAL INFORMATION
            =================================================== */}

            <section
              className="
                min-h-[300px]
                overflow-hidden
                rounded-[10px]
                bg-white/95
                px-[30px]
                pb-8
                pt-[23px]
                backdrop-blur-[2px]
              "
            >
              <h2
                className="
                  mb-5
                  text-[19px]
                  font-normal
                  leading-[1.25]
                  text-[#e30613]
                  sm:text-[20px]
                "
              >
                Financial Information
              </h2>

              <div
                className="
                  overflow-hidden
                  rounded-[6px]
                "
              >
                <img
                  src="/images/financial-information.jpg"
                  alt="Financial Information"
                  className="
                    h-[160px]
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    hover:scale-[1.02]
                  "
                />
              </div>
            </section>
          </div>
        </section>

    
      </section>

      <Footer />
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| REUSABLE INVESTOR CARD
|--------------------------------------------------------------------------
*/

function InvestorCard({
  title,
  image,
  imageAlt,
  children,
}) {
  return (
    <article
      className="
        group
        relative
        min-h-[390px]
        overflow-hidden
        rounded-[10px]
        bg-white/95
        px-[30px]
        pb-[30px]
        pt-[23px]
        backdrop-blur-[2px]
        transition-all
        duration-300
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      "
    >

      {/* =========================================================
          TITLE
      ========================================================= */}

      <h2
        className="
          mb-4
          text-[19px]
          font-normal
          leading-[1.25]
          text-[#e30613]
          sm:text-[20px]
        "
      >
        {title}
      </h2>

      {/* =========================================================
          CARD BODY
      ========================================================= */}

      <div
        className="
          relative
          min-h-[310px]
        "
      >

        {/* =======================================================
            TEXT
        ======================================================= */}

        <div
          className="
            relative
            z-10
            w-full
            lg:w-full
          "
        >
          {children}
        </div>

        {/* =======================================================
            CARD IMAGE
        ======================================================= */}

        <div
          className="
            mt-6
            overflow-hidden
            rounded-[6px]
            lg:absolute
            lg:right-0
            lg:top-0
            lg:mt-0
            lg:w-[43%]
          "
        >

          <img
            src={image}
            alt={imageAlt}
            className="
              h-[165px]
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.025]
              lg:h-[165px]
            "
          />

        </div>

      </div>

    </article>
  );
}
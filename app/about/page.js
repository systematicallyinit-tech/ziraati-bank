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

export default function OurBankPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | BACK BUTTON
  |--------------------------------------------------------------------------
  */

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | COPY PAGE URL
  |--------------------------------------------------------------------------
  */

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

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

        {/* Background overlay */}

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
                TOP BUTTONS
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
                onClick={goBack}
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
                <ArrowLeft
                  size={31}
                  strokeWidth={1.5}
                />
              </button>

              {/* SHARE BUTTON */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setShareOpen((value) => !value)
                  }
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
                  <Share2
                    size={25}
                    strokeWidth={1.5}
                  />
                </button>

                {/* SHARE MENU */}

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
                      onClick={copyPageLink}
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
                        <Check
                          size={18}
                          className="text-green-600"
                        />
                      ) : (
                        <Copy size={18} />
                      )}

                      <span>
                        {copied
                          ? "Copied!"
                          : "Copy page link"}
                      </span>

                    </button>

                  </div>
                )}

              </div>

            </div>

            {/* ===================================================
                TITLE
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
                  text-[36px]
                  font-light
                  leading-none
                  tracking-[-1px]
                  sm:text-[39px]
                  md:text-[42px]
                  lg:text-[43px]
                "
              >
                Our bank
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

                <ChevronRight
                  size={13}
                  strokeWidth={1.5}
                />

                <span
                  className="
                    underline
                    underline-offset-2
                  "
                >
                  Our bank
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
                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                  />
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
              THREE COLUMN GRID
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

            {/* ===================================================
                ABOUT US
            =================================================== */}

            <OurBankCard
              title="About Us"
              image="/images/about-us.jpg"
              imageAlt="About Us"
            >

              {/* MAIN ITEMS */}

              <BankLink>
                Today, Ziraat Bank
              </BankLink>

              <BankLink>
                History of Our Bank
              </BankLink>

              <BankLink>
                General Manager’s Message
              </BankLink>

              <BankLink>
                Ziraat Finance Group
              </BankLink>

              {/* NESTED ITEMS */}

              <BankNestedLink>
                Domestic Subsidiaries
              </BankNestedLink>

              <BankNestedLink>
                Other Domestic Subsidiaries
              </BankNestedLink>

              <BankNestedLink>
                Foreign Subsidiary Banks, Branches and
                Representative Offices
              </BankNestedLink>

              <BankLink>
                Vision and Mission
              </BankLink>

              <BankLink>
                Our Bank’s Board of Directors
              </BankLink>

              <BankLink>
                Senior Management
              </BankLink>

              <BankLink>
                Our Organizational Structure
              </BankLink>

            </OurBankCard>

            {/* ===================================================
                CULTURE AND ARTS
            =================================================== */}

            <OurBankCard
              title="Culture and Arts"
              image="/images/culture-and-arts.jpg"
              imageAlt="Culture and Arts"
            >

              <BankLink>
                Ziraat Bank Museum
              </BankLink>

              <BankLink>
                Ziraat Bank Izmir Art Museum
              </BankLink>

              <BankLink>
                Picture Collection
              </BankLink>

              <BankLink>
                Galleries
              </BankLink>

              <BankLink>
                Exhibitions
              </BankLink>

              <BankLink>
                DEVRİM ERBİL New Pictures, New Touches
                Virtual Exhibition
              </BankLink>

              <BankLink>
                Türkiye Through the Eyes of Our Employees
              </BankLink>

            </OurBankCard>

            {/* ===================================================
                SUSTAINABILITY
            =================================================== */}

            <OurBankCard
              title="Sustainability"
              image="/images/sustainability.jpg"
              imageAlt="Sustainability"
            >

              {/* OUR POLICIES */}

              <BankLink>
                Our policies
              </BankLink>

              <BankNestedLink>
                Sustainability Policy
              </BankNestedLink>

              <BankNestedLink>
                Environmental and Social Impact Management
                Policy in Lending Activities
              </BankNestedLink>

              <BankNestedLink>
                Environmental Policy
              </BankNestedLink>

              <BankLink>
                A Sustainable Future
              </BankLink>

              <BankLink>
                Our Stakeholders
              </BankLink>

              <BankLink>
                Contribution to Society
              </BankLink>

              <BankLink>
                Education
              </BankLink>

              <BankLink>
                Sustainable Development
              </BankLink>

              <BankLink>
                Climate Change
              </BankLink>

            </OurBankCard>

          </div>

        </section>

      </section>

      <Footer />

    </main>
  );
}

/*
|--------------------------------------------------------------------------
| REUSABLE CARD
|--------------------------------------------------------------------------
*/

function OurBankCard({
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
        overflow-hidden
        rounded-[10px]
        bg-white/95
        px-[30px]
        pb-[30px]
        pt-[23px]
        backdrop-blur-[2px]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
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
        {title}
      </h2>

      {/* =======================================================
          IMAGE
      ======================================================= */}

      <div
        className="
          mb-[18px]
          overflow-hidden
          rounded-[6px]
          bg-[#eeeeee]
        "
      >

        <img
          src={image}
          alt={imageAlt}
          className="
            h-[164px]
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

      <div className="flex flex-col">
        {children}
      </div>

    </article>
  );
}

/*
|--------------------------------------------------------------------------
| NORMAL LINK
|--------------------------------------------------------------------------
*/

function BankLink({ children }) {
  return (
    <button
      type="button"
      className="
        group/link
        flex
        min-h-[43px]
        w-full
        items-center
        border-b
        border-[#c9c9c9]
        py-[8px]
        text-left
        text-[15px]
        font-normal
        leading-[1.25]
        text-[#292929]
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
        {children}
      </span>

    </button>
  );
}

/*
|--------------------------------------------------------------------------
| NESTED LINK
|--------------------------------------------------------------------------
*/

function BankNestedLink({ children }) {
  return (
    <button
      type="button"
      className="
        group/nested
        relative
        flex
        min-h-[30px]
        w-full
        items-center
        pl-[12px]
        pr-1
        text-left
        text-[14px]
        leading-[1.25]
        text-[#292929]
        transition-colors
        duration-200
        hover:text-[#e30613]
      "
    >

      {/* Red vertical line */}

      <span
        className="
          absolute
          left-0
          top-1/2
          h-[15px]
          w-[2px]
          -translate-y-1/2
          bg-[#e30613]
        "
      />

      <span
        className="
          transition-transform
          duration-200
          group-hover/nested:translate-x-[2px]
        "
      >
        {children}
      </span>

    </button>
  );
}
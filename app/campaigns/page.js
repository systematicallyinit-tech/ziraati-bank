"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
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
| CAMPAIGN DATA
|--------------------------------------------------------------------------
|
| Replace the image paths with your actual campaign images.
|
*/

const campaigns = [
  {
    id: 1,
    category: "All",
    title:
      "Pay your rent more easily at Ziraat with the advantageous rent account.",
    image: "/img/avantajli-kira-hesabi.jpg",
  },
  {
    id: 2,
    category: "All",
    title:
      "Earn extra interest on your deposit account as you make your payments through our bank with our Advantageous Term Deposit Account.",
    image: "/img/avantajli-vadeli-hesap-3.png",
  },
  {
    id: 3,
    category: "All",
    title:
      "Become a customer through Ziraat Mobile and start benefiting from Ziraat’s advantages immediately.",
    image: "/img/ziraat-mobil-musteri-avantajlar-detay-7.jpg",
  },
];

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [campaignType, setCampaignType] =
    useState("Current Campaigns");

  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | FILTER CAMPAIGNS
  |--------------------------------------------------------------------------
  */

  const filteredCampaigns = useMemo(() => {
    if (activeTab === "All") {
      return campaigns;
    }

    return campaigns.filter(
      (campaign) => campaign.category === activeTab
    );
  }, [activeTab]);

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
    <main className="min-h-screen bg-[#d6d3d7]">
        <Header />

      {/* =========================================================
          FULL PAGE BACKGROUND
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

        <div className="absolute inset-0 bg-black/[0.04]" />

        {/* =======================================================
            TOP HEADER
        ======================================================= */}

        <header
          className="
            relative
            z-20
            px-4
            pt-6
            sm:px-6
            lg:px-8
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-[1300px]
              items-start
              justify-between
            "
          >

            {/* ===================================================
                BACK BUTTON
            =================================================== */}

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
                sm:h-14
                sm:w-14
              "
            >
              <ArrowLeft
                size={30}
                strokeWidth={1.5}
              />
            </button>

            {/* ===================================================
                SHARE BUTTON
            =================================================== */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShareOpen((value) => !value)
                }
                aria-label="Share"
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
                  sm:h-14
                  sm:w-14
                "
              >
                <Share2
                  size={25}
                  strokeWidth={1.5}
                />
              </button>

              {/* Share popup */}

              {shareOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-[65px]
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

          {/* =====================================================
              PAGE TITLE
          ===================================================== */}

          <div
            className="
              mx-auto
              mt-[-4px]
              max-w-[900px]
              text-center
              text-white
              sm:mt-[-2px]
            "
          >

            <h1
              className="
                text-[34px]
                font-light
                leading-none
                tracking-tight
                sm:text-[40px]
                md:text-[42px]
                lg:text-[44px]
              "
            >
              Campaigns
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
                Campaigns
              </span>

              <ChevronDown
                size={18}
                strokeWidth={2}
                className="
                  ml-1
                  rounded-full
                  bg-white
                  text-[#777]
                "
              />

            </div>

          </div>

        </header>

        {/* =========================================================
            MAIN WHITE CONTENT
        ========================================================= */}

        <section
          className="
            relative
            z-10
            mx-auto
            mt-7
            max-w-[1300px]
            rounded-t-[20px]
            bg-white
            px-4
            pb-10
            pt-8
            sm:mt-7
            sm:rounded-[20px]
            sm:px-7
            sm:pb-12
            sm:pt-9
            md:px-8
            lg:px-[30px]
            lg:pt-[50px]
          "
        >

          {/* =====================================================
              TOP FILTER AREA
          ===================================================== */}

          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            {/* ===================================================
                CAMPAIGN TABS
            =================================================== */}

            <div
              className="
                flex
                min-w-0
                items-end
                border-b
                border-[#d5d5d5]
                lg:flex-1
              "
            >

              {/* ALL */}

              <button
                type="button"
                onClick={() => setActiveTab("All")}
                className={`
                  relative
                  px-0
                  pb-[21px]
                  pr-7
                  text-[17px]
                  font-normal
                  transition-colors
                  sm:text-[18px]
                  ${
                    activeTab === "All"
                      ? "text-[#e30613]"
                      : "text-[#222f3e] hover:text-[#e30613]"
                  }
                `}
              >

                All

                <span
                  className="
                    ml-1
                    text-[15px]
                  "
                >
                  (3)
                </span>

                {activeTab === "All" && (
                  <span
                    className="
                      absolute
                      bottom-[-1px]
                      left-0
                      h-[4px]
                      w-[54px]
                      bg-[#e30613]
                    "
                  />
                )}

              </button>

              {/* Vertical separator */}

              <span
                className="
                  mb-[18px]
                  h-7
                  w-px
                  bg-[#d7d7d7]
                "
              />

              {/* OTHER */}

              <button
                type="button"
                onClick={() => setActiveTab("Other")}
                className={`
                  relative
                  px-7
                  pb-[21px]
                  text-[17px]
                  font-normal
                  transition-colors
                  sm:text-[18px]
                  ${
                    activeTab === "Other"
                      ? "text-[#e30613]"
                      : "text-[#222f3e] hover:text-[#e30613]"
                  }
                `}
              >

                Other

                <span className="ml-1 text-[15px]">
                  (3)
                </span>

                {activeTab === "Other" && (
                  <span
                    className="
                      absolute
                      bottom-[-1px]
                      left-7
                      h-[4px]
                      w-[65px]
                      bg-[#e30613]
                    "
                  />
                )}

              </button>

            </div>

            {/* ===================================================
                DESKTOP FILTERS
            =================================================== */}

            <div
              className="
                hidden
                items-center
                gap-7
                lg:flex
              "
            >

              {/* Current campaigns dropdown */}

              <div className="relative">

                <select
                  value={campaignType}
                  onChange={(event) =>
                    setCampaignType(event.target.value)
                  }
                  className="
                    h-[44px]
                    w-[285px]
                    appearance-none
                    rounded-full
                    border-2
                    border-[#dedede]
                    bg-white
                    px-5
                    pr-11
                    text-[15px]
                    font-semibold
                    text-[#27364a]
                    outline-none
                    focus:border-[#cfcfcf]
                  "
                >
                  <option>
                    Current Campaigns
                  </option>

                  <option>
                    Past Campaigns
                  </option>

                  <option>
                    All Campaigns
                  </option>
                </select>

                <ChevronDown
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-[#45525d]
                  "
                />

              </div>

              {/* Bankkart button */}

              <button
                type="button"
                className="
                  flex
                  h-[44px]
                  w-[283px]
                  items-center
                  justify-between
                  rounded-full
                  bg-[#e30613]
                  px-5
                  text-[15px]
                  font-bold
                  text-white
                  transition
                  hover:bg-[#c9000c]
                  active:scale-[0.99]
                "
              >

                <span>
                  Bankkart Campaigns
                </span>

                {/* Bankkart icon-style circle */}

                <span
                  className="
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#e30613]
                  "
                >
                  <span
                    className="
                      text-[17px]
                      font-black
                      italic
                    "
                  >
                    W
                  </span>
                </span>

              </button>

            </div>

          </div>

          {/* =====================================================
              MOBILE FILTER CONTROLS
          ===================================================== */}

          <div className="mt-5 lg:hidden">

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  (value) => !value
                )
              }
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-full
                border-2
                border-[#dedede]
                px-5
                py-3
                text-sm
                font-semibold
                text-[#27364a]
              "
            >

              <span>
                {campaignType}
              </span>

              {mobileFiltersOpen ? (
                <X size={18} />
              ) : (
                <ChevronDown size={18} />
              )}

            </button>

            {mobileFiltersOpen && (
              <div
                className="
                  mt-2
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-lg
                "
              >

                {[
                  "Current Campaigns",
                  "Past Campaigns",
                  "All Campaigns",
                ].map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setCampaignType(item);
                      setMobileFiltersOpen(false);
                    }}
                    className={`
                      block
                      w-full
                      border-b
                      border-gray-100
                      px-5
                      py-3
                      text-left
                      text-sm
                      last:border-0
                      ${
                        campaignType === item
                          ? "font-semibold text-[#e30613]"
                          : "text-[#27364a]"
                      }
                    `}
                  >
                    {item}
                  </button>

                ))}

              </div>
            )}

          </div>

          {/* =====================================================
              MOBILE BANKKART BUTTON
          ===================================================== */}

          <button
            type="button"
            className="
              mt-4
              flex
              h-[44px]
              w-full
              items-center
              justify-between
              rounded-full
              bg-[#e30613]
              px-5
              text-[14px]
              font-bold
              text-white
              lg:hidden
            "
          >

            <span>
              Bankkart Campaigns
            </span>

            <span
              className="
                flex
                h-[32px]
                w-[32px]
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#e30613]
              "
            >
              <span
                className="
                  text-[16px]
                  font-black
                  italic
                "
              >
                W
              </span>
            </span>

          </button>

          {/* =====================================================
              CAMPAIGN CARDS
          ===================================================== */}

          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-5
              border-t
              border-[#d5d5d5]
              pt-8
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {filteredCampaigns.map((campaign) => (

              <article
                key={campaign.id}
                className="
                  flex
                  min-h-[470px]
                  flex-col
                  overflow-hidden
                  rounded-[5px]
                  border
                  border-[#d8d8d8]
                  bg-white
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                {/* =================================================
                    CAMPAIGN IMAGE
                ================================================= */}

                <div
                  className="
                    px-[30px]
                    pt-[30px]
                    sm:px-[30px]
                    sm:pt-[30px]
                  "
                >

                  <div
                    className="
                      relative
                      aspect-[1.72/1]
                      w-full
                      overflow-hidden
                      rounded-[6px]
                      bg-[#eeeeee]
                    "
                  >

                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-[1.03]
                      "
                    />

                  </div>

                </div>

                {/* =================================================
                    CAMPAIGN TITLE
                ================================================= */}

                <div
                  className="
                    px-[30px]
                    pb-[30px]
                    pt-6
                  "
                >

                  <h2
                    className="
                      text-[19px]
                      font-semibold
                      leading-[1.27]
                      text-[#17334d]
                      sm:text-[20px]
                    "
                  >
                    {campaign.title}
                  </h2>

                </div>

              </article>

            ))}

          </div>

          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {filteredCampaigns.length === 0 && (
            <div
              className="
                flex
                min-h-[250px]
                items-center
                justify-center
                text-center
                text-gray-500
              "
            >
              No campaigns found.
            </div>
          )}

        </section>

      </section>

      <Footer />

    </main>
  );
}
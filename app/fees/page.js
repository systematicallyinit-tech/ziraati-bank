"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Share2,
  MessageSquare,
  X,
  Copy,
  Check,
} from "lucide-react";
import Image from 'next/image'
import { LuMessageSquareMore } from 'react-icons/lu';
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const categories = [
  "ATM Usage",
  "Personal Loans",
  "Checks and Promissory Notes",
  "Foreign trade",
  "Safe Deposit Box Fees",
  "Commercial Loans",
  "Credit Cards and Debit Cards",
  "Securities Transactions",
  "Deposit Accounts",
  "Money Transfer",
  "Maximum Fees for Merchant and POS Products and Services",
];

const atmRows = [
  {
    expense: "Balance Inquiry (TL)",
    minAmount: "0",
    minRate: "0",
    maxAmount: "0",
    maxRate: "0",
    explanation: "Free",
    updateDate: "08.05.2026",
    updateTime: "13:58:49",
  },
  {
    expense: "Withdrawal Exceeding Limit (TL)",
    minAmount: "23",
    minRate: "2.88",
    maxAmount: "-",
    maxRate: "-",
    explanation:
      "BSMV (Banking and Insurance Transaction Tax) is included.",
    updateDate: "08.05.2026",
    updateTime: "13:58:49",
  },
  {
    expense: "Withdrawal (TL)",
    minAmount: "0",
    minRate: "0",
    maxAmount: "0",
    maxRate: "0",
    explanation: "Free",
    updateDate: "08.05.2026",
    updateTime: "13:58:49",
  },
];

export default function ProductServiceFeesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ATM Usage");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return atmRows;

    return atmRows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [search]);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setShareOpen(false);
      }, 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#d5d3d6]">
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
              rgba(62, 57, 68, 0.32),
              rgba(62, 57, 68, 0.32)
            ),
            url('/img/ziraat-background.avif')
          `,
        }}
      >

        {/* Background overlay */}

        <div className="absolute inset-0 bg-black/[0.03]" />

        {/* =======================================================
            HEADER
        ======================================================= */}

        <header className="relative z-20 px-4 pt-6 sm:px-6 lg:px-8">

          <div
            className="
              mx-auto
              flex
              max-w-[1300px]
              items-start
              justify-between
            "
          >

            {/* Back button */}

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

            {/* Share */}

            <div className="relative">

              <button
                type="button"
                aria-label="Share"
                onClick={() => setShareOpen((value) => !value)}
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
                    w-[210px]
                    rounded-2xl
                    bg-white
                    p-3
                    shadow-2xl
                  "
                >

                  <p
                    className="
                      px-2
                      py-1
                      text-sm
                      font-semibold
                      text-[#27364a]
                    "
                  >
                    Share this page
                  </p>

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
                text-[30px]
                font-light
                leading-tight
                tracking-tight
                sm:text-[36px]
                md:text-[42px]
                lg:text-[44px]
              "
            >
              Product and Service Fees
            </h1>

            {/* Breadcrumb */}

            <div
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-1
                text-[11px]
                sm:text-xs
              "
            >

              <button
                type="button"
                className="underline hover:no-underline"
              >
                Home
              </button>

              <span>›</span>

              <span>
                Product and Service Fees
              </span>

            </div>

          </div>

        </header>

        {/* =======================================================
            WHITE MAIN CONTENT CONTAINER
        ======================================================= */}

        <section
          className="
            relative
            z-10
            mx-auto
            mt-5
            max-w-[1300px]
            rounded-t-[22px]
            bg-white
            px-4
            py-6
            shadow-[0_-5px_30px_rgba(0,0,0,0.05)]
            sm:mt-6
            sm:rounded-[22px]
            sm:px-7
            sm:py-7
            md:px-8
            lg:px-[30px]
            lg:py-8
          "
        >

          {/* =====================================================
              MOBILE CATEGORY MENU
          ===================================================== */}

          <div className="mb-6 lg:hidden">

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((value) => !value)
              }
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                bg-[#eeeeee]
                px-4
                py-3.5
                text-left
                text-sm
                font-semibold
                text-[#e30613]
              "
            >

              <span>
                {activeCategory}
              </span>

              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <ChevronRight size={20} />
              )}

            </button>

            {mobileMenuOpen && (
              <div
                className="
                  mt-2
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  shadow-lg
                "
              >

                {categories.map((category) => (

                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      border-b
                      border-gray-200
                      px-4
                      py-3
                      text-left
                      text-sm
                      last:border-b-0
                      ${
                        activeCategory === category
                          ? "font-semibold text-[#e30613]"
                          : "text-[#27364a]"
                      }
                    `}
                  >

                    <span className="pr-3">
                      {category}
                    </span>

                    <ChevronRight
                      size={17}
                      className="shrink-0 text-[#e30613]"
                    />

                  </button>

                ))}

              </div>
            )}

          </div>

          {/* =====================================================
              DESKTOP SIDEBAR + CONTENT
          ===================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-7
              lg:grid-cols-[285px_minmax(0,1fr)]
              lg:gap-[30px]
            "
          >

            {/* ===================================================
                SIDEBAR
            =================================================== */}

            <aside
              className="
                hidden
                overflow-hidden
                rounded-[20px]
                bg-[#eeeeee]
                lg:block
              "
            >

              {/* Sidebar heading */}

              <div className="px-[30px] pb-3 pt-7">

                <h2
                  className="
                    text-[18px]
                    font-medium
                    text-[#e30613]
                  "
                >
                  Product and Service Fees
                </h2>

              </div>

              {/* Sidebar navigation */}

              <nav>

                {categories.map((category) => {

                  const isActive =
                    activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setActiveCategory(category)
                      }
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        border-b
                        border-[#d7d7d7]
                        px-[30px]
                        py-[10px]
                        text-left
                        transition-colors
                        duration-200
                        ${
                          isActive
                            ? "text-[#e30613]"
                            : "text-[#1e344c] hover:text-[#e30613]"
                        }
                      `}
                    >

                      <span
                        className="
                          max-w-[205px]
                          text-[16px]
                          leading-[1.2]
                        "
                      >
                        {category}
                      </span>

                      <ChevronRight
                        size={19}
                        strokeWidth={1.5}
                        className="
                          shrink-0
                          text-[#e30613]
                          transition-transform
                          duration-200
                          group-hover:translate-x-1
                        "
                      />

                    </button>
                  );

                })}

              </nav>

            </aside>

            {/* ===================================================
                MAIN CONTENT
            =================================================== */}

            <div className="min-w-0">

              {/* =================================================
                  SEARCH
              ================================================= */}

              <div
                className="
                  mb-9
                  flex
                  flex-col
                  gap-4
                  md:flex-row
                  md:items-center
                "
              >

                {/* Search field */}

                <div className="relative flex-1">

                  <Search
                    size={24}
                    strokeWidth={1.7}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#333333]
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Product and Service Price Search"
                    className="
                      h-[50px]
                      w-full
                      rounded-full
                      border-2
                      border-[#e6e9eb]
                      bg-white
                      pl-11
                      pr-5
                      text-[14px]
                      text-gray-700
                      outline-none
                      transition
                      placeholder:text-gray-500
                      focus:border-[#d8dce0]
                      focus:ring-2
                      focus:ring-red-100
                    "
                  />

                </div>

                {/* Search button */}

                <button
                  type="button"
                  className="
                    h-[50px]
                    w-full
                    rounded-full
                    bg-[#e30613]
                    px-12
                    text-[16px]
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#c9000c]
                    active:scale-[0.99]
                    md:w-[206px]
                  "
                >
                  Search
                </button>

              </div>

              {/* =================================================
                  SECTION TITLE
              ================================================= */}

              <div className="mb-5">

                <h2
                  className="
                    text-[19px]
                    font-medium
                    text-[#e30613]
                  "
                >
                  ATM Usage
                </h2>

                <h3
                  className="
                    mt-3
                    text-[17px]
                    font-semibold
                    text-[#52606b]
                  "
                >
                  Our bank&apos;s ATMs
                </h3>

              </div>

              {/* =================================================
                  DESKTOP TABLE
              ================================================= */}

              <div
                className="
                  hidden
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#e2e6e8]
                  md:block
                "
              >

                <div className="overflow-x-auto">

                  <table
                    className="
                      w-full
                      min-w-[850px]
                      border-collapse
                      text-left
                    "
                  >

                    {/* Table header */}

                    <thead>

                      <tr className="bg-white">

                        <th
                          className="
                            px-5
                            py-4
                            text-[14px]
                            font-bold
                            text-[#314153]
                          "
                        >
                          Expense Name
                        </th>

                        <th
                          className="
                            px-3
                            py-4
                            text-center
                            text-[14px]
                            font-bold
                            leading-[1.1]
                            text-[#314153]
                          "
                        >
                          Minimum
                          <br />
                          Amount
                        </th>

                        <th
                          className="
                            px-3
                            py-4
                            text-center
                            text-[14px]
                            font-bold
                            leading-[1.1]
                            text-[#314153]
                          "
                        >
                          Minimum
                          <br />
                          Rate (%)
                        </th>

                        <th
                          className="
                            px-3
                            py-4
                            text-center
                            text-[14px]
                            font-bold
                            leading-[1.1]
                            text-[#314153]
                          "
                        >
                          Maximum
                          <br />
                          Amount
                        </th>

                        <th
                          className="
                            px-3
                            py-4
                            text-center
                            text-[14px]
                            font-bold
                            leading-[1.1]
                            text-[#314153]
                          "
                        >
                          Maximum
                          <br />
                          Rate
                          <br />
                          (%)
                        </th>

                        <th
                          className="
                            px-4
                            py-4
                            text-[14px]
                            font-bold
                            text-[#314153]
                          "
                        >
                          Explanation
                        </th>

                        <th
                          className="
                            px-4
                            py-4
                            text-center
                            text-[14px]
                            font-bold
                            text-[#314153]
                          "
                        >
                          Update Date
                        </th>

                      </tr>

                    </thead>

                    {/* Table body */}

                    <tbody>

                      {filteredRows.length > 0 ? (

                        filteredRows.map((row, index) => (

                          <tr
                            key={row.expense}
                            className={`
                              border-t
                              border-[#e3e6e8]
                              ${
                                index % 2 === 0
                                  ? "bg-[#f0f3f4]"
                                  : "bg-white"
                              }
                            `}
                          >

                            <td
                              className="
                                px-5
                                py-5
                                text-[14px]
                                font-semibold
                                leading-[1.15]
                                text-[#52606b]
                              "
                            >
                              {row.expense}
                            </td>

                            <td
                              className="
                                px-3
                                py-5
                                text-center
                                text-[14px]
                                font-semibold
                                text-[#52606b]
                              "
                            >
                              {row.minAmount}
                            </td>

                            <td
                              className="
                                px-3
                                py-5
                                text-center
                                text-[14px]
                                font-semibold
                                text-[#52606b]
                              "
                            >
                              {row.minRate}
                            </td>

                            <td
                              className="
                                px-3
                                py-5
                                text-center
                                text-[14px]
                                font-semibold
                                text-[#52606b]
                              "
                            >
                              {row.maxAmount}
                            </td>

                            <td
                              className="
                                px-3
                                py-5
                                text-center
                                text-[14px]
                                font-semibold
                                text-[#52606b]
                              "
                            >
                              {row.maxRate}
                            </td>

                            <td
                              className="
                                max-w-[300px]
                                px-4
                                py-5
                                text-[13px]
                                font-semibold
                                leading-[1.2]
                                text-[#52606b]
                              "
                            >
                              {row.explanation}
                            </td>

                            <td
                              className="
                                whitespace-nowrap
                                px-4
                                py-5
                                text-center
                                text-[13px]
                                font-semibold
                                leading-[1.15]
                                text-[#52606b]
                              "
                            >
                              {row.updateDate}
                              <br />
                              {row.updateTime}
                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="7"
                            className="
                              px-5
                              py-10
                              text-center
                              text-sm
                              text-gray-500
                            "
                          >
                            No matching results found.
                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* =================================================
                  MOBILE FEE CARDS
              ================================================= */}

              <div className="space-y-4 md:hidden">

                {filteredRows.length > 0 ? (

                  filteredRows.map((row, index) => (

                    <article
                      key={row.expense}
                      className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#e1e5e7]
                        bg-white
                        shadow-sm
                      "
                    >

                      {/* Card title */}

                      <div
                        className={`
                          px-4
                          py-4
                          ${
                            index % 2 === 0
                              ? "bg-[#f0f3f4]"
                              : "bg-[#f8f9fa]"
                          }
                        `}
                      >

                        <h4
                          className="
                            text-sm
                            font-bold
                            leading-5
                            text-[#52606b]
                          "
                        >
                          {row.expense}
                        </h4>

                      </div>

                      {/* Four values */}

                      <div
                        className="
                          grid
                          grid-cols-2
                          gap-px
                          bg-gray-200
                        "
                      >

                        <FeeItem
                          label="Minimum Amount"
                          value={row.minAmount}
                        />

                        <FeeItem
                          label="Minimum Rate (%)"
                          value={row.minRate}
                        />

                        <FeeItem
                          label="Maximum Amount"
                          value={row.maxAmount}
                        />

                        <FeeItem
                          label="Maximum Rate (%)"
                          value={row.maxRate}
                        />

                      </div>

                      {/* Explanation */}

                      <div className="bg-white p-4">

                        <p
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-gray-400
                          "
                        >
                          Explanation
                        </p>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-medium
                            leading-5
                            text-[#52606b]
                          "
                        >
                          {row.explanation}
                        </p>

                        {/* Date */}

                        <div
                          className="
                            mt-4
                            border-t
                            border-gray-100
                            pt-3
                          "
                        >

                          <p
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-wide
                              text-gray-400
                            "
                          >
                            Update Date
                          </p>

                          <p
                            className="
                              mt-1
                              text-sm
                              font-semibold
                              text-[#52606b]
                            "
                          >
                            {row.updateDate}{" "}
                            {row.updateTime}
                          </p>

                        </div>

                      </div>

                    </article>

                  ))

                ) : (

                  <div
                    className="
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      px-5
                      py-10
                      text-center
                      text-sm
                      text-gray-500
                    "
                  >
                    No matching results found.
                  </div>

                )}

              </div>

              {/* =================================================
                  OTHER BANK ATMS
              ================================================= */}

              <div className="mt-7">

                <h3
                  className="
                    text-[17px]
                    font-semibold
                    text-[#52606b]
                  "
                >
                  Other Bank ATMs
                </h3>

                <div
                  className="
                    mt-5
                    h-20
                    rounded-[18px]
                    border
                    border-[#e3e6e8]
                    bg-white/50
                  "
                />

              </div>

            </div>

          </div>

        </section>

      </section>

      <Footer />

    </main>
  );
}

/* ===============================================================
   MOBILE FEE ITEM
================================================================ */

function FeeItem({ label, value }) {
  return (
    <div className="bg-white p-4">

      <p
        className="
          text-[10px]
          font-bold
          uppercase
          leading-4
          tracking-wide
          text-gray-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-semibold
          text-[#52606b]
        "
      >
        {value}
      </p>

    </div>
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
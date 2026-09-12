"use client";

import {
  MessageSquareMore,
} from "lucide-react";

import { FaFacebookF, FaInstagram, FaChevronUp, FaSpeakap, FaFacebookMessenger, FaPlay, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoMegaphoneOutline } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#515c61] text-white">
      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1400px] px-8 py-7 sm:px-6 lg:px-8">
        {/* =====================================================
            TOP AREA
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1

            gap-10

            md:grid-cols-2

            lg:grid-cols-[270px_minmax(0,1fr)_335px]

            lg:gap-8
          "
        >
          {/* =================================================
              ZIRAAT FINANCE GROUP
          ================================================= */}

          <div className="relative">
            <div className="flex items-center gap-4">
              {/* Name */}

              <div
                className="
                  text-[16px]
                  font-bold
                  leading-[1.15]
                  text-white
                "
              >
                Ziraat Finance Group
              </div>
            </div>

            {/* Collapse icon */}

            <button
              type="button"
              aria-label="Collapse footer"
              className="
                absolute
                right-0
                top-[25px]
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                text-[#aab2b5]
                transition
                hover:text-white
              "
            >
              <FaChevronUp size={20} />
            </button>
          </div>

          {/* =================================================
              ANNOUNCEMENTS
          ================================================= */}

          <div>
            <h3
              className="
                mb-3
                border-b
                border-[#707a7e]
                pb-[10px]
                text-[16px]
                font-bold
              "
            >
              Announcements
            </h3>

            <button
              type="button"
              className="
                hidden
                lg:flex
                w-full
                items-start
                gap-3
                text-left
                text-[16px]
                leading-[1.35]
                text-[#f4f5f5]
                transition
                hover:text-white
              "
            >
              <IoMegaphoneOutline
                size={27}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0"
              />

              <span>
                Announcement Regarding Preventing the Use of Bank Accounts by
                Third Parties
              </span>
            </button>
          </div>

          {/* =================================================
              CONTACT US
          ================================================= */}

          <div>
            <h3
              className="
                mb-3
                border-b
                border-[#707a7e]
                pb-[10px]
                text-[16px]
                font-bold
              "
            >
              Contact us
            </h3>

            <div className="lg:flex hidden flex-col gap-[9px]">
              <a
                href="#"
                className="
                  text-[16px]
                  text-white
                  transition
                  hover:underline
                "
              >
                Branches & ATMs
              </a>

              <a
                href="#"
                className="
                  text-[16px]
                  text-white
                  transition
                  hover:underline
                "
              >
                Contact Form
              </a>

              <a
                href="#"
                className="
                  text-[16px]
                  text-white
                  transition
                  hover:underline
                "
              >
                Mobile Branches
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            LINKS + SOCIAL
        ===================================================== */}

        <div
          className="
            mt-10
            border-t
            border-[#697477]
            pt-7
          "
        >
          <div
            className="
              grid
              grid-cols-1

              gap-8

              lg:grid-cols-[minmax(0,1fr)_335px]

              lg:gap-8
            "
          >
            {/* =================================================
                LINKS
            ================================================= */}

            <div className="hidden lg:flex">
              <h3
                className="
                  mb-3
                  border-b
                  border-[#707a7e]
                  pb-[10px]
                  text-[16px]
                  font-bold
                "
              >
                Links
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-x-10
                  gap-y-[7px]

                  sm:grid-cols-2

                  lg:grid-cols-3
                "
              >
                {/* Column 1 */}

                <div className="flex flex-col gap-[7px]">
                  <a href="#" className="text-[16px] hover:underline">
                    Calculation Tools
                  </a>

                  <a href="#" className="text-[16px] hover:underline">
                    IBAN
                  </a>

                  <a href="#" className="text-[16px] hover:underline">
                    Properties and Vehicles for Sale
                  </a>
                </div>

                {/* Column 2 */}

                <div className="flex flex-col gap-[7px]">
                  <a href="#" className="text-[16px] hover:underline">
                    Contracts and Forms
                  </a>

                  <a href="#" className="text-[16px] hover:underline">
                    Statute of Limitations
                  </a>

                  <a href="#" className="text-[16px] hover:underline">
                    Security
                  </a>
                </div>

                {/* Column 3 */}

                <div className="flex flex-col gap-[7px]">
                  <a href="#" className="text-[16px] hover:underline">
                    Site Map
                  </a>

                  <a href="#" className="text-[16px] hover:underline">
                    Frequently Asked Questions
                  </a>
                </div>
              </div>
            </div>

            {/* =================================================
                FOLLOW US
            ================================================= */}

            <div>
              <h3
                className="
                  mb-4
                  text-[16px]
                  font-bold
                "
              >
                Follow us
              </h3>

              <div className="flex flex-wrap gap-4">
                {/* Facebook */}

                <a
                  href="#"
                  aria-label="Facebook"
                  className="
                    flex
                    h-[41px]
                    w-[41px]
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#e1e4e5]
                    text-[#e1e4e5]
                    transition
                    hover:bg-white
                    hover:text-[#515c61]
                  "
                >
                  <FaFacebookF size={19} fill="currentColor" />
                </a>

                {/* X */}

                <a
                  href="#"
                  aria-label="X"
                  className="
                    flex
                    h-[41px]
                    w-[41px]
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#e1e4e5]
                    text-[#e1e4e5]
                    transition
                    hover:bg-white
                    hover:text-[#515c61]
                  "
                >
                  <FaTwitter size={18} />
                </a>

                {/* Instagram */}

                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                    flex
                    h-[41px]
                    w-[41px]
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#e1e4e5]
                    text-[#e1e4e5]
                    transition
                    hover:bg-white
                    hover:text-[#515c61]
                  "
                >
                  <FaInstagram size={19} />
                </a>

                {/* YouTube */}

                <a
                  href="#"
                  aria-label="YouTube"
                  className="
                    flex
                    h-[41px]
                    w-[41px]
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#e1e4e5]
                    text-[#e1e4e5]
                    transition
                    hover:bg-white
                    hover:text-[#515c61]
                  "
                >
                  <FaPlay size={17} fill="currentColor" />
                </a>

                {/* LinkedIn */}

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="
                    flex
                    h-[41px]
                    w-[41px]
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#e1e4e5]
                    text-[#e1e4e5]
                    transition
                    hover:bg-white
                    hover:text-[#515c61]
                  "
                >
                  <FaLinkedinIn size={18} fill="currentColor" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM LINE
        ===================================================== */}

        <div
          className="
            mt-11
            border-t
            border-[#697477]
            pt-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* Copyright */}

            <div
              className="
                shrink-0
                text-[16px]
                text-white
              "
            >
              © 2026 - TC Ziraat Bankası AŞ
            </div>

            {/* Legal Links */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3

                lg:justify-end
              "
            >
              <a href="#" className="text-[16px] hover:underline">
                Protection of Personal Data
              </a>

              <a href="#" className="text-[16px] hover:underline">
                Information Society Services
              </a>

              <a href="#" className="text-[16px] hover:underline">
                Privacy
              </a>

              <a href="#" className="text-[16px] hover:underline">
                Legal Notice
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM RIGHT BANK INFORMATION
        ===================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            items-end
            text-right
            text-[12px]
            font-semibold
            text-[#e1e4e5]

            max-[700px]:items-start
            max-[700px]:text-left
          "
        >

          <div className="text-[18px] font-bold">08502200000</div>

          <div>www.ziraati-bank.vercel.app</div>
        </div>
      </div>
    </footer>
  );
};

"use client";

import {
  Armchair,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  MessageSquareMore,
  Umbrella,
} from "lucide-react";

const rates = [
  {
    name: "AMERİKAN DOLARI",
    buy: "46,2944",
    sell: "49,1128",
  },
  {
    name: "EURO",
    buy: "53,4811",
    sell: "56,7370",
  },
  {
    name: "A02 ALTIN (1000/1000)",
    buy: "6.396,401246",
    sell: "7.321,884215",
  },
  {
    name: "G02 GÜMÜŞ",
    buy: "93,424900",
    sell: "106,942369",
  },
];

const applications = [
  {
    name: (
      <>
        Personal
        <br />
        Loan
      </>
    ),
    icon: (
      <CircleDollarSign
        size={60}
        strokeWidth={1.6}
      />
    ),
  },
  {
    name: <>Bankkart</>,
    icon: (
      <CreditCard
        size={60}
        strokeWidth={1.6}
      />
    ),
  },
  {
    name: (
      <>
        Insurance
        <br />
        Products
      </>
    ),
    icon: (
      <Umbrella
        size={60}
        strokeWidth={1.6}
      />
    ),
  },
  {
    name: (
      <>
        Individual
        <br />
        Pension Plan
      </>
    ),
    icon: (
      <Armchair
        size={60}
        strokeWidth={1.6}
      />
    ),
  },
];

/* =========================================================
   PANEL TITLE
========================================================= */

function PanelTitle({ children, halfWidth }) {
  return (
    <h2
      className={`
        inline-block
        m-0
        pb-[7px]
        border-b-2
        border-black
        text-[17px]
        leading-[1.1]
        ${halfWidth ? 'w-1/2' : 'w-full'}
        font-bold
        text-black
      `}
    >
      {children}
    </h2>
  );
}

/* =========================================================
   AGRICULTURAL DATA
========================================================= */

function RatesPanel() {
  return (
    <section
      className="
        relative
        min-w-0
        min-h-fit
        lg:min-h-screen
        bg-white
        border-b
        border-gray-100
        xl:border-b-0
      "
    >
      <div
        className="
          w-full
          h-full
          px-[30px]
          py-6
          max-[700px]:px-5
          max-[390px]:px-[15px]
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-7
            mb-[50px]
            max-[700px]:mb-[35px]
          "
        >
          <PanelTitle>
            Agricultural Data
          </PanelTitle>

          <div
            className="
              pb-[7px]
              border-b-2
              border-gray-500
              text-[17px]
              w-full
              font-bold
              text-gray-500
              whitespace-nowrap
            "
          >
            Markets
          </div>
        </div>

        {/* Rates */}

        <div>
          {rates.map((rate) => (
            <div
              key={rate.name}
              className="
                pb-[19px]
                mb-[14px]
                border-b
                border-dashed
                border-gray-300
              "
            >
              {/* Currency */}

              <div
                className="
                  mb-[7px]
                  text-[14px]
                  tracking-[0.4px]
                  text-black
                "
              >
                {rate.name}
              </div>

              {/* Buy / Sell */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                  max-[390px]:gap-3
                "
              >
                <div>
                  <div
                    className="
                      mb-1
                      text-[12px]
                      tracking-[0.6px]
                    "
                  >
                    BANKA ALIŞ
                  </div>

                  <div
                    className="
                      text-[18px]
                      font-semibold
                      tracking-[0.3px]
                    "
                  >
                    {rate.buy}
                  </div>
                </div>

                <div>
                  <div
                    className="
                      mb-1
                      text-[12px]
                      tracking-[0.6px]
                    "
                  >
                    BANKA SATIŞ
                  </div>

                  <div
                    className="
                      text-[18px]
                      tracking-[0.3px]
                      font-semibold
                    "
                  >
                    {rate.sell}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link */}

        <button
          className="
            flex
            items-center
            gap-2
            p-0
            border-0
            bg-transparent
            text-[14px]
            text-black
            cursor-pointer
          "
        >
          <span className="text-[25px] leading-none">
            ›
          </span>

          Makroekonomik Analizler
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   DEPOSIT CALCULATOR
========================================================= */

function DepositCalculator() {
  return (
    <section
      className="
        relative
        min-w-0
        min-h-fit
        lg:min-h-screen
        bg-white
        border-b
        border-gray-100
        xl:border-b-0
        xl:border-l
        xl:border-gray-100

        bg-[linear-gradient(rgba(255,255,255,0.91),rgba(255,255,255,0.91)),url('/assets/bank-building-reference.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      <div
        className="
          w-full
          h-full
          px-[30px]
          py-6
          max-[700px]:px-5
          max-[390px]:px-[15px]
        "
      >
        {/* Calculator tabs */}

        <div
          className="
            grid
            grid-cols-2
            gap-5
            mb-[103px]
            max-[700px]:mb-10
          "
        >
          <PanelTitle>
            Deposit Calculator
          </PanelTitle>

          <div
            className="
              pb-[7px]
              border-b-2
              border-gray-500
              text-[17px]
              text-gray-500
              whitespace-nowrap
            "
          >
            Loan Calculator
          </div>
        </div>

        {/* Form */}

        <div className="grid gap-[17px]">

          {/* Currency */}

          <button
            className="
              w-full
              h-[43px]
              px-5
              flex
              items-center
              justify-between
              rounded-full
              border-2
              border-gray-500
              bg-white/40
              text-black
              cursor-pointer
            "
          >
            <span>TL</span>

            <ChevronDown size={19} />
          </button>

          {/* Slider + Days */}

          <div
            className="
              grid
              grid-cols-[minmax(0,1fr)_98px]
              gap-[30px]
              max-[390px]:gap-3
            "
          >
            {/* Slider */}

            <div
              className="
                relative
                w-full
                h-[43px]
                px-5
                flex
                items-center
                rounded-full
                border-2
                border-gray-500
                bg-white/40
                overflow-hidden
              "
            >
              {/* Line */}

              <span
                className="
                  absolute
                  left-5
                  right-[30px]
                  top-1/2
                  h-[3px]
                  -translate-y-1/2
                  bg-gray-400
                "
              />

              {/* Red circle */}

              <span
                className="
                  relative
                  z-10
                  block
                  w-[25px]
                  h-[25px]
                  shrink-0
                  rounded-full
                  bg-[#ed0016]
                "
              />
            </div>

            {/* Days */}

            <button
              className="
                h-[43px]
                px-4
                flex
                items-center
                justify-center
                rounded-full
                border-2
                border-gray-500
                bg-white/40
                text-black
                whitespace-nowrap
                cursor-pointer
              "
            >
              32 Day
            </button>
          </div>

          {/* Amount */}

          <div
            className="
              w-full
              h-[43px]
              px-5
              flex
              items-center
              justify-between
              rounded-full
              border-2
              border-gray-500
              bg-white/40
            "
          >
            <span className="text-gray-500">
              Amount
            </span>

            <strong className="text-black">
              10.000 TL
            </strong>
          </div>

          {/* Interest */}

          <div
            className="
              w-full
              h-[43px]
              px-5
              flex
              items-center
              justify-between
              rounded-full
              border-2
              border-gray-500
              bg-white/40
            "
          >
            <span className="text-gray-500">
              Interest rate
            </span>

            <strong className="text-black">
              31%
            </strong>
          </div>
        </div>

        {/* Result */}

        <div
          className="
            mt-[55px]
            text-center
          "
        >
          <div
            className="
              text-[14px]
              font-extrabold
            "
          >
            Maturity Amount
          </div>

          <div
            className="
              mt-1
              text-[22px]
              font-extrabold
            "
          >
            10,224.22 TL
          </div>
        </div>

        {/* Links */}

        <div
          className="
            grid
            gap-[13px]
            mt-[111px]
            max-[700px]:mt-[50px]
            max-[700px]:pb-5
          "
        >
          <button
            className="
              flex
              items-center
              gap-2
              p-0
              border-0
              bg-transparent
              text-[14px]
              text-black
              text-left
              cursor-pointer
            "
          >
            <span className="text-[25px] leading-none">
              ›
            </span>

            Get a Deposit Offer
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              p-0
              border-0
              bg-transparent
              text-[14px]
              text-black
              text-left
              cursor-pointer
            "
          >
            <span className="text-[25px] leading-none">
              ›
            </span>

            Other Calculation Tools
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   APPLICATIONS
========================================================= */

function Applications() {
  return (
    <section
      className="
        relative
        min-w-0
        min-h-fit
        lg:min-h-screen
        bg-white
        border-b
        border-gray-100
        xl:border-b-0
        xl:border-l
        xl:border-gray-100
      "
    >
      <div
        className="
          w-full
          h-full
          px-[30px]
          py-6
          max-[700px]:px-5
          max-[390px]:px-[15px]
        "
      >
        <PanelTitle halfWidth={true}>
          Applications
        </PanelTitle>

        {/* Application grid */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-[35px]
            gap-y-[95px]
            mt-[101px]

            max-[700px]:mt-10
            max-[700px]:gap-x-5
            max-[700px]:gap-y-[50px]
          "
        >
          {applications.map(
            (application, index) => (
              <button
                key={index}
                className="
                  p-0
                  border-0
                  bg-transparent
                  text-black
                  text-center
                  text-[12px]
                  lg:text-[14px]
                  font-bold
                  tracking-[3px]
                  leading-[1.1]
                  cursor-pointer

                  max-[390px]:tracking-[2px]
                "
              >
                <div
                  className="
                    h-[62px]
                    mb-[15px]
                    flex
                    font-normal
                    items-center
                    justify-center
                    text-[#ed0016]
                  "
                >
                  {application.icon}
                </div>

                <div>
                  {application.name}
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   NEAREST AGRICULTURAL
========================================================= */

function NearestAgricultural() {
  return (
    <section
      className="
        relative
        min-w-0
        min-h-fit
        lg:min-h-screen
        bg-white
        border-b
        border-gray-100
        xl:border-b-0
        xl:border-l
        xl:border-gray-100
        bg-[linear-gradient(rgba(255,255,255,0.82),rgba(255,255,255,0.82)),url('/assets/bank-building-reference.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      <div
        className="
          relative
          w-full
          h-full
          px-[30px]
          py-6
          max-[700px]:px-5
          max-[390px]:px-[15px]
        "
      >
        {/* Title */}

        <div
          className="
            mb-[174px]
            max-[700px]:mb-[42px]
          "
        >
          <PanelTitle>
            Nearest Agricultural
          </PanelTitle>
        </div>

        {/* Branch / ATM */}

        <div
          className="
            grid
            grid-cols-2
            gap-[30px]
            mb-[9px]

            max-[390px]:gap-3
          "
        >
          {/* Branch */}

          <button
            className="
              h-[45px]
              flex
              items-center
              justify-center
              gap-2.5
              rounded-full
              border-2
              border-[#4f5b61]
              bg-[#4f5b61]
              text-white
              text-[16px]
              font-extrabold
              cursor-pointer
            "
          >
            <span
              className="
                relative
                block
                w-5
                h-5
                rounded-full
                border-2
                border-gray-300
                bg-white
              "
            >
              <span
                className="
                  absolute
                  top-1/2
                  left-1/2
                  w-[7px]
                  h-[7px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#ed0016]
                "
              />
            </span>

            Branch
          </button>

          {/* ATM */}

          <button
            className="
              h-[45px]
              flex
              items-center
              justify-center
              gap-2.5
              rounded-full
              border-2
              border-gray-500
              bg-white/75
              text-black
              text-[16px]
              font-extrabold
              cursor-pointer
            "
          >
            <span
              className="
                block
                w-5
                h-5
                rounded-full
                border-2
                border-gray-300
                bg-white
              "
            />

            ATM
          </button>
        </div>

        {/* Search */}

        <div className="relative mt-2.5">
          <input
            type="text"
            placeholder="Branch and Address Search"
            className="
              w-full
              h-[42px]
              px-5
              pr-[50px]
              rounded-full
              border-2
              border-gray-500
              outline-none
              bg-white/80
              text-[14px]
              text-black

              placeholder:text-black

              focus:border-black
            "
          />

          <span
            className="
              absolute
              right-[17px]
              top-1/2
              -translate-y-1/2
              text-gray-400
              text-[25px]
            "
          >
            ⌕
          </span>
        </div>

        {/* City */}

        <div className="relative mt-2.5">
          <select
            defaultValue=""
            className="
              w-full
              h-[42px]
              px-5
              pr-[45px]
              appearance-none
              rounded-full
              border-2
              border-gray-500
              outline-none
              bg-white/80
              text-[14px]
              text-gray-500
              cursor-pointer

              focus:border-black
            "
          >
            <option
              value=""
              disabled
            >
              Select a city.
            </option>

            <option>
              Istanbul
            </option>

            <option>
              Ankara
            </option>

            <option>
              Izmir
            </option>
          </select>

          
        </div>

        {/* District */}

        <div className="relative mt-2.5">
          <select
            defaultValue=""
            className="
              w-full
              h-[42px]
              px-5
              pr-[45px]
              appearance-none
              rounded-full
              border-2
              border-gray-500
              outline-none
              bg-white/80
              text-[14px]
              text-gray-500
              cursor-pointer

              focus:border-black
            "
          >
            <option
              value=""
              disabled
            >
              Select District
            </option>

            <option>
              Çankaya
            </option>

            <option>
              Beşiktaş
            </option>

            <option>
              Kadıköy
            </option>
          </select>

          
        </div>

        {/* Search button */}

        <button
          className="
            w-full
            h-[49px]
            mt-[11px]
            rounded-full
            border-0
            bg-[#ed0016]
            text-white
            text-[16px]
            font-extrabold
            cursor-pointer

            hover:bg-[#d90014]
            active:scale-[0.99]
            transition
          "
        >
          ARA
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   HOME
========================================================= */

export const Services = () => {
  return (
    <main
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-white
      "
    >
      <div
        className="
          grid
          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-4

          w-full
          min-h-screen
        "
      >
        <RatesPanel />

        <DepositCalculator />

        <Applications />

        <NearestAgricultural />
      </div>
    </main>
  );
}
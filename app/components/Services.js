"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Armchair,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Umbrella,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const rates = [
  {
    name: "AMERİKAN DOLARI",
    code: "USD",
    buy: 46.2944,
    sell: 49.1128,
    trend: 1.42,
    flow: [38, 45, 42, 58, 51, 66, 61, 74, 70, 82],
  },
  {
    name: "EURO",
    code: "EUR",
    buy: 53.4811,
    sell: 56.737,
    trend: -0.68,
    flow: [78, 69, 73, 61, 65, 53, 58, 45, 49, 39],
  },
  {
    name: "TÜRK LİRASI",
    code: "TL",
    buy: 1,
    sell: 1,
    trend: 0.31,
    flow: [42, 49, 47, 55, 52, 60, 57, 64, 62, 70],
  },
  {
    name: "A02 ALTIN (1000/1000)",
    code: "ALTIN",
    buy: 6396.401246,
    sell: 7321.884215,
    trend: 0.91,
    flow: [35, 42, 49, 46, 55, 61, 58, 68, 72, 77],
  },
  {
    name: "G02 GÜMÜŞ",
    code: "GÜMÜŞ",
    buy: 93.4249,
    sell: 106.942369,
    trend: -0.22,
    flow: [68, 62, 65, 57, 60, 52, 55, 47, 50, 44],
  },
];

const turkeyApi =
  "https://api.openadmindata.org/api/v1/countries/tr.json";

const formatTRY = (value) =>
  new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));

const applications = [
  {
    name: (
      <>
        Personal
        <br />
        Loan
      </>
    ),
    icon: <CircleDollarSign size={60} strokeWidth={1.6} />,
  },
  {
    name: <>Bankkart</>,
    icon: <CreditCard size={60} strokeWidth={1.6} />,
  },
  {
    name: (
      <>
        Insurance
        <br />
        Products
      </>
    ),
    icon: <Umbrella size={60} strokeWidth={1.6} />,
  },
  {
    name: (
      <>
        Individual
        <br />
        Pension Plan
      </>
    ),
    icon: <Armchair size={60} strokeWidth={1.6} />,
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
        ${halfWidth ? "w-1/2" : "w-full"}
        font-bold
        text-black
      `}
    >
      {children}
    </h2>
  );
}

/* =========================================================
   AGRICULTURAL DATA / MARKETS
========================================================= */

function RatesPanel() {
  const [tab, setTab] = useState("data");

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
          <button
            type="button"
            onClick={() => setTab("data")}
            className={`
              pb-[7px]
              border-b-2
              text-[17px]
              font-bold
              text-left
              ${
                tab === "data"
                  ? "border-black text-black"
                  : "border-gray-500 text-gray-500"
              }
            `}
          >
            Agricultural Data
          </button>

          <button
            type="button"
            onClick={() => setTab("markets")}
            className={`
              pb-[7px]
              border-b-2
              text-[17px]
              w-full
              font-bold
              text-left
              whitespace-nowrap
              ${
                tab === "markets"
                  ? "border-black text-black"
                  : "border-gray-500 text-gray-500"
              }
            `}
          >
            Markets
          </button>
        </div>

        {/* Agricultural Data */}

        {tab === "data" ? (
          <>
            <div>
              {rates.slice(0, 4).map((rate) => (
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
                        {formatTRY(rate.buy)}
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
                        {formatTRY(rate.sell)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setTab("markets")}
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
          </>
        ) : (
          /* Markets */

          <div className="space-y-4">
            {rates.slice(0, 3).map((rate) => {
              const up = rate.trend >= 0;

              return (
                <div
                  key={rate.code}
                  className="
                    pb-4
                    border-b
                    border-dashed
                    border-gray-300
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[14px] tracking-[0.4px]">
                        {rate.name}
                      </div>

                      <div className="text-[11px] text-gray-500 mt-1">
                        {rate.code}/TRY
                      </div>
                    </div>

                    <div
                      className={`
                        flex
                        items-center
                        gap-1
                        text-[13px]
                        font-bold
                        ${
                          up
                            ? "text-green-600"
                            : "text-[#ed0016]"
                        }
                      `}
                    >
                      {up ? (
                        <TrendingUp size={17} />
                      ) : (
                        <TrendingDown size={17} />
                      )}

                      {up ? "+" : ""}
                      {rate.trend.toFixed(2)}%
                    </div>
                  </div>

                  {/* Market Flow */}

                  <div
                    className="
                      mt-3
                      h-[54px]
                      flex
                      items-end
                      gap-[3px]
                    "
                  >
                    REMOVED ME
                      />
                    ))}
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-5
                      mt-3
                    "
                  >
                    <div>
                      <div
                        className="
                          mb-1
                          text-[11px]
                          tracking-[0.5px]
                          text-gray-500
                        "
                      >
                        BANKA ALIŞ
                      </div>

                      <div className="text-[17px] font-semibold">
                        {rate.code === "TL"
                          ? "1,00"
                          : formatTRY(rate.buy)}
                      </div>
                    </div>

                    <div>
                      <div
                        className="
                          mb-1
                          text-[11px]
                          tracking-[0.5px]
                          text-gray-500
                        "
                      >
                        BANKA SATIŞ
                      </div>

                      <div className="text-[17px] font-semibold">
                        {rate.code === "TL"
                          ? "1,00"
                          : formatTRY(rate.sell)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="text-[11px] text-gray-500">
              Green indicates upward market flow; red indicates
              downward market flow.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   DEPOSIT / LOAN CALCULATOR
========================================================= */

function DepositCalculator() {
  const [mode, setMode] = useState("deposit");

  /* Deposit */

  const [currency, setCurrency] = useState("TL");
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(32);
  const [depositRate, setDepositRate] = useState(31);

  /* Loan */

  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanMonths, setLoanMonths] = useState(12);
  const [loanRate, setLoanRate] = useState(24);

  /* Deposit calculation */

  const maturity = useMemo(() => {
    const principal = Number(amount) || 0;
    const rate = Number(depositRate) || 0;

    return (
      principal +
      (principal * rate * days) / (100 * 365)
    );
  }, [amount, depositRate, days]);

  /* Loan calculation */

  const loan = useMemo(() => {
    const principal = Math.max(
      0,
      Number(loanAmount) || 0
    );

    const months = Math.max(
      1,
      Number(loanMonths) || 1
    );

    const monthlyRate =
      (Number(loanRate) || 0) / 100 / 12;

    if (!monthlyRate) {
      const monthly = principal / months;

      return {
        monthly,
        total: principal,
        interest: 0,
      };
    }

    const monthly =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const total = monthly * months;

    return {
      monthly,
      total,
      interest: total - principal,
    };
  }, [loanAmount, loanMonths, loanRate]);

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
          <button
            type="button"
            onClick={() => setMode("deposit")}
            className={`
              pb-[7px]
              border-b-2
              text-[17px]
              text-left
              ${
                mode === "deposit"
                  ? "border-black font-bold text-black"
                  : "border-gray-500 text-gray-500"
              }
            `}
          >
            Deposit Calculator
          </button>

          <button
            type="button"
            onClick={() => setMode("loan")}
            className={`
              pb-[7px]
              border-b-2
              text-[17px]
              text-left
              whitespace-nowrap
              ${
                mode === "loan"
                  ? "border-black font-bold text-black"
                  : "border-gray-500 text-gray-500"
              }
            `}
          >
            Loan Calculator
          </button>
        </div>

        {/* =====================================================
            DEPOSIT
        ===================================================== */}

        {mode === "deposit" ? (
          <>
            <div className="grid gap-[17px]">
              {/* Currency */}

              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value)
                  }
                  className="
                    w-full
                    h-[43px]
                    px-5
                    appearance-none
                    rounded-full
                    border-2
                    border-gray-500
                    bg-white/40
                    text-black
                    outline-none
                    cursor-pointer
                  "
                >
                  <option value="TL">TL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>

                <ChevronDown
                  size={19}
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                  "
                />
              </div>

              {/* Days */}

              <div
                className="
                  grid
                  grid-cols-[minmax(0,1fr)_98px]
                  gap-[30px]
                  max-[390px]:gap-3
                "
              >
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
                  <input
                    type="range"
                    min="7"
                    max="365"
                    value={days}
                    onChange={(e) =>
                      setDays(Number(e.target.value))
                    }
                    className="
                      relative
                      z-20
                      w-full
                      accent-[#ed0016]
                      cursor-pointer
                    "
                  />
                </div>

                <div
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
                  "
                >
                  {days} Day
                </div>
              </div>

              {/* Amount */}

              <label
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

                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  className="
                    w-1/2
                    bg-transparent
                    outline-none
                    text-right
                    font-bold
                    text-black
                  "
                />
              </label>

              {/* Interest */}

              <label
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

                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={depositRate}
                    onChange={(e) =>
                      setDepositRate(e.target.value)
                    }
                    className="
                      w-[75px]
                      bg-transparent
                      outline-none
                      text-right
                      font-bold
                      text-black
                    "
                  />

                  <span className="font-bold ml-1">
                    %
                  </span>
                </div>
              </label>
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
                {formatTRY(maturity)} {currency}
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
                type="button"
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
                type="button"
                onClick={() => setMode("loan")}
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
          </>
        ) : (
          /* ===================================================
             LOAN
          =================================================== */

          <>
            <div className="grid gap-[17px]">
              {/* Loan Amount */}

              <label
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
                  Loan Amount
                </span>

                <input
                  type="number"
                  min="0"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(e.target.value)
                  }
                  className="
                    w-1/2
                    bg-transparent
                    outline-none
                    text-right
                    font-bold
                    text-black
                  "
                />
              </label>

              {/* Loan Duration */}

              <div
                className="
                  grid
                  grid-cols-[minmax(0,1fr)_98px]
                  gap-[30px]
                  max-[390px]:gap-3
                "
              >
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
                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={loanMonths}
                    onChange={(e) =>
                      setLoanMonths(Number(e.target.value))
                    }
                    className="
                      relative
                      z-20
                      w-full
                      accent-[#ed0016]
                      cursor-pointer
                    "
                  />
                </div>

                <div
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
                  "
                >
                  {loanMonths} Month
                </div>
              </div>

              {/* Interest Rate */}

              <label
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

                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={loanRate}
                    onChange={(e) =>
                      setLoanRate(e.target.value)
                    }
                    className="
                      w-[75px]
                      bg-transparent
                      outline-none
                      text-right
                      font-bold
                      text-black
                    "
                  />

                  <span className="font-bold ml-1">
                    %
                  </span>
                </div>
              </label>
            </div>

            {/* Loan Result */}

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
                Monthly Payment
              </div>

              <div
                className="
                  mt-1
                  text-[22px]
                  font-extrabold
                "
              >
                {formatTRY(loan.monthly)} TL
              </div>

              <div
                className="
                  mt-2
                  text-[12px]
                  text-gray-500
                "
              >
                Total repayment:{" "}
                {formatTRY(loan.total)} TL
              </div>
            </div>

            <div
              className="
                grid
                gap-[13px]
                mt-[85px]
                max-[700px]:mt-[50px]
                max-[700px]:pb-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-[14px]
                "
              >
                <span className="text-gray-500">
                  Total interest
                </span>

                <strong>
                  {formatTRY(loan.interest)} TL
                </strong>
              </div>

              <button
                type="button"
                onClick={() => setMode("deposit")}
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

                Back to Deposit Calculator
              </button>
            </div>
          </>
        )}
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
                type="button"
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
  const [type, setType] = useState("branch");

  const [data, setData] = useState({
    province: [],
    district: [],
  });

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Load Turkey provinces and districts */

  useEffect(() => {
    let cancelled = false;

    fetch(turkeyApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Location data failed"
          );
        }

        return response.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData({
            province:
              json?.data?.province || [],
            district:
              json?.data?.district || [],
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData({
            province: [],
            district: [],
          });
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* Districts belonging to selected city */

  const districts = useMemo(() => {
    if (!city) {
      return [];
    }

    return data.district.filter(
      (districtItem) =>
        districtItem.parent_id === city
    );
  }, [city, data.district]);

  /* Search */

  const searchResults = useMemo(() => {
    const q = query
      .trim()
      .toLocaleLowerCase("tr-TR");

    const provinces = data.province.filter(
      (province) => {
        const cityMatches =
          !city || province.id === city;

        const textMatches =
          !q ||
          province.name_local
            .toLocaleLowerCase("tr-TR")
            .includes(q) ||
          province.name_en
            .toLocaleLowerCase("tr-TR")
            .includes(q);

        return cityMatches && textMatches;
      }
    );

    const districtResults = data.district.filter(
      (districtItem) => {
        const cityMatches =
          !city ||
          districtItem.parent_id === city;

        const districtMatches =
          !district ||
          districtItem.id === district;

        const textMatches =
          !q ||
          districtItem.name_local
            .toLocaleLowerCase("tr-TR")
            .includes(q) ||
          districtItem.name_en
            .toLocaleLowerCase("tr-TR")
            .includes(q) ||
          districtItem.parent_name_local
            ?.toLocaleLowerCase("tr-TR")
            .includes(q);

        return (
          cityMatches &&
          districtMatches &&
          textMatches
        );
      }
    );

    return [
      ...provinces.map((province) => ({
        id: province.id,
        city: province.name_local,
        district: "",
      })),

      ...districtResults.map(
        (districtItem) => ({
          id: districtItem.id,
          city: districtItem.parent_name_local,
          district:
            districtItem.name_local,
        })
      ),
    ].slice(0, 8);
  }, [
    city,
    district,
    query,
    data,
  ]);

  const search = () => {
    setResults(searchResults);
  };

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
            type="button"
            onClick={() => {
              setType("branch");
              setResults([]);
            }}
            className={`
              h-[45px]
              flex
              items-center
              justify-center
              gap-2.5
              rounded-full
              border-2
              text-[16px]
              font-extrabold
              cursor-pointer

              ${
                type === "branch"
                  ? "border-[#4f5b61] bg-[#4f5b61] text-white"
                  : "border-gray-500 bg-white/75 text-black"
              }
            `}
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
            type="button"
            onClick={() => {
              setType("atm");
              setResults([]);
            }}
            className={`
              h-[45px]
              flex
              items-center
              justify-center
              gap-2.5
              rounded-full
              border-2
              text-[16px]
              font-extrabold
              cursor-pointer

              ${
                type === "atm"
                  ? "border-[#4f5b61] bg-[#4f5b61] text-white"
                  : "border-gray-500 bg-white/75 text-black"
              }
            `}
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
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
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
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setDistrict("");
              setResults([]);
            }}
            disabled={loading}
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
              text-gray-700
              cursor-pointer
              focus:border-black
              disabled:opacity-60
            "
          >
            <option value="">
              {loading
                ? "Loading cities..."
                : "Select a city."}
            </option>

            {data.province.map((province) => (
              <option
                key={province.id}
                value={province.id}
              >
                {province.name_local}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              pointer-events-none
            "
          />
        </div>

        {/* District */}

        <div className="relative mt-2.5">
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setResults([]);
            }}
            disabled={
              !city || !districts.length
            }
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
              text-gray-700
              cursor-pointer
              focus:border-black
              disabled:opacity-60
            "
          >
            <option value="">
              Select District
            </option>

            {districts.map((districtItem) => (
              <option
                key={districtItem.id}
                value={districtItem.id}
              >
                {districtItem.name_local}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              pointer-events-none
            "
          />
        </div>

        {/* Search button */}

        <button
          type="button"
          onClick={search}
          disabled={loading}
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
            disabled:opacity-60
          "
        >
          ARA
        </button>

        {/* Search Results */}

        {results.length > 0 && (
          <div
            className="
              mt-3
              max-h-[190px]
              overflow-y-auto
              space-y-2
            "
          >
            {results.map((result) => (
              <button
                type="button"
                key={result.id}
                onClick={() =>
                  setQuery(
                    result.district
                      ? `${result.city}, ${result.district}`
                      : result.city
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  bg-white/90
                  p-3
                  text-left
                  hover:border-gray-500
                  transition
                "
              >
                <div
                  className="
                    text-[13px]
                    font-bold
                    text-black
                  "
                >
                  {type === "branch"
                    ? "Branch"
                    : "ATM"}{" "}
                  — {result.city}
                  {result.district
                    ? ` / ${result.district}`
                    : ""}
                </div>

                <div
                  className="
                    mt-1
                    text-[11px]
                    text-gray-500
                  "
                >
                  {result.district
                    ? `${result.district}, ${result.city}, Türkiye`
                    : `${result.city}, Türkiye`}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results */}

        {!loading &&
          (city || district || query) &&
          results.length === 0 && (
            <div
              className="
                mt-3
                text-center
                text-[12px]
                text-gray-500
              "
            >
              No matching{" "}
              {type === "branch"
                ? "branch"
                : "ATM"}{" "}
              area found. Try another city,
              district or address.
            </div>
          )}
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
        text-black
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
};

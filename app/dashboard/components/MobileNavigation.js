import {
  ArrowBigUpDash,
  ArrowUpRight,
  Bell,
    ChevronDown,
    ChevronRight,
    CreditCard,
    Eye,
    EyeOff,
    FileText,
    Filter,
    Home,
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

/*
|--------------------------------------------------------------------------
| Bottom mobile navigation
|--------------------------------------------------------------------------
*/

export const MobileNavigation = ({ tab }) => {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-gray-200
        bg-white
        lg:hidden
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[600px]
          grid-cols-5
          px-2
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <a
          href="/dashboard"
          className={`
                flex
                h-[62px]
                flex-col
                items-center
                justify-center
                gap-1
                text-[9px]
                font-semibold
                ${tab === "home" ? "text-[#e30613]" : "text-gray-400"}
              `}
        >
          <Home size={18} />
          <span>Home</span>
        </a>

        <a
          href="/dashboard/cards"
          className={`
                flex
                h-[62px]
                flex-col
                items-center
                justify-center
                gap-1
                text-[9px]
                font-semibold
                ${tab === "cards" ? "text-[#e30613]" : "text-gray-400"}
              `}
        >
          <CreditCard size={18} />
          <span>Cards</span>
        </a>

        <a
          href="/dashboard/local-transfer"
          className={`
                flex
                h-[62px]
                flex-col
                items-center
                justify-center
                gap-1
                text-[9px]
                font-semibold
                ${tab === "transfer" ? "text-[#e30613]" : "text-gray-400"}
              `}
        >
          <ArrowUpRight size={18} />
          <span>Transfer</span>
        </a>

        <a
          href="/dashboard/transactions-hist"
          className={`
                flex
                h-[62px]
                flex-col
                items-center
                justify-center
                gap-1
                text-[9px]
                font-semibold
                ${tab === "transactions" ? "text-[#e30613]" : "text-gray-400"}
              `}
        >
          <FileText size={18} />
          <span>Transactions</span>
        </a>

        <a
          href="/dashboard/settings"
          className={`
                flex
                h-[62px]
                flex-col
                items-center
                justify-center
                gap-1
                text-[9px]
                font-semibold
                ${tab === "settings" ? "text-[#e30613]" : "text-gray-400"}
              `}
        >
          <LayoutGrid size={18} />
          <span>More</span>
        </a>
      </div>
    </nav>
  );
}

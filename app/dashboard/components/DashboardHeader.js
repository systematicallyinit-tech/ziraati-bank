"use client";

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


export const DashboardHeader = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user } = useAuth();
  return (
    <header
      className="
            sticky
        top-0
        z-40
        h-[64px]
        border-b
        border-gray-200
        bg-white
          "
    >
      <div
        className="
                  mx-auto
                  flex
                  h-full
                  max-w-[1500px]
                  items-center
                  justify-between
                  px-4
        
                  sm:px-6
                  lg:px-8
                "
      >
        {/* Left */}

        <div className="flex items-center gap-3">
          {/* Mobile menu */}

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-gray-700
        
                      lg:hidden
                    "
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}

          <div className="flex items-center gap-2">
            <a
              href="/dashboard"
              className="flex items-center w-full justify-center lg:justify-start gap-3"
            >
              <Image
                src={"/icons/logo-en.png"}
                alt={"Ziraat Bank Logo"}
                loading="eager"
                width={100}
                height={100}
                className="h-7 w-auto lg:block"
              />
            </a>
          </div>
        </div>

        {/* Desktop search */}

        <div
          className="
                    hidden
                    w-[300px]
                    items-center
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    lg:flex
                  "
        >
          <Search size={17} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search"
            className="
                      h-10
                      w-full
                      bg-transparent
                      px-3
                      text-sm
                      outline-none
                      border-0
                    "
          />
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="/dashboard/settings"
            className="
                      relative
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-gray-600
                      hover:bg-gray-100
                      sm:hidden
                    "
          >
            <User size={20} />

            <span
              className="
                        absolute
                        right-2
                        top-2
                        h-2
                        w-2
                        rounded-full
                        bg-[#e30613]
                      "
            />
          </a>

          <button
            type="button"
            className="
                      hidden
                      items-center
                      gap-2
                      rounded-full
                      px-2
                      py-1
                      hover:bg-gray-100
                      sm:flex
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
                        bg-gray-200
                      "
            >
              <User size={18} />
            </span>

            <span className="text-sm font-semibold">{user.fullname}</span>

            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};


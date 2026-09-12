"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
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
    Landmark,
    LayoutGrid,
    LogOut,
    Menu,
    MoreHorizontal,
    PiggyBank,
    PlaneTakeoff,
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

/*
|--------------------------------------------------------------------------
| Sidebar mobile menu navigation
|--------------------------------------------------------------------------
*/

export const Sidebar = ({ open, setOpen, tab, tab2 }) => {
  const router = useRouter();
  const [isTransfer, setIsTransfer] =
      useState(false);

      const toggleMenu = () => {
                  setIsTransfer(!isTransfer)
              }
              const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to login page
        router.push("/login");

        // Refresh the Next.js router/cache
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[260px]
          bg-white
          shadow-xl
          transition-transform
          duration-300

          lg:sticky
          lg:top-[64px]
          lg:z-30
          lg:h-[calc(100vh-64px)]
          lg:shadow-none
          lg:translate-x-0

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Mobile logo */}

          <div
            className="
              flex
              h-[64px]
              items-center
              justify-between
              border-b
              border-gray-100
              px-5
              lg:hidden
            "
          >
            <a
              href="/dashboard"
              className="flex items-center w-full justify-start lg:justify-start gap-3"
            >
              <Image
                src={"/icons/logo-en.png"}
                alt={"Ziraat Bank Logo"}
                width={100}
                loading="eager"
                height={100}
                className="h-7 w-auto lg:block"
              />
            </a>

            <button onClick={() => setOpen(false)} className="text-gray-500">
              <X size={21} />
            </button>
          </div>

          {/* Navigation */}

          <nav className="flex-1 p-4">
            <p
              className="
                mb-3
                px-3
                text-[10px]
                font-bold
                uppercase
                tracking-widest
                text-gray-400
              "
            >
              Main menu
            </p>

            <div className="space-y-1">
              <a
                href="/dashboard"
                onClick={() => setOpen(false)}
                className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      font-semibold

                      ${
                        tab === "home"
                          ? "bg-[#e30613] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
              >
                <Home size={19} />

                <span>Dashboard</span>
              </a>

              <a
                href="/dashboard/cards"
                onClick={() => setOpen(false)}
                className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      font-semibold

                      ${
                        tab === "cards"
                          ? "bg-[#e30613] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
              >
                <CreditCard size={19} />

                <span>Cards</span>
              </a>

              <button
                type="button"
                onClick={toggleMenu}
                onMouseOver={toggleMenu}
                className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      font-semibold

                      ${
                        tab2 === "transfer"
                          ? "bg-[#e30613] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
              >
                <ArrowUpRight size={19} />

                <span>Transfer</span>
              </button>

              {isTransfer === true && (
                <div className="space-y-1 bg-gray-100 p-1 rounded-xl flex flex-col duration-500 ease-in-out">
                  <a
                    href="/dashboard/local-transfer"
                    onClick={() => setOpen(false)}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      font-semibold

                      ${
                        tab === "local"
                          ? "bg-[#fff] text-[#e30613]"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Landmark size={19} />

                    <span>Local Transfer</span>
                  </a>

                  <a
                    href="/dashboard/international-transfer"
                    onClick={() => setOpen(false)}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      font-semibold

                      ${
                        tab === "international"
                          ? "bg-[#fff] text-[#e30613]"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <PlaneTakeoff size={19} />

                    <span>International Transfer</span>
                  </a>
                </div>
              )}

              <a
                href="/dashboard/transactions-hist"
                onClick={() => setOpen(false)}
                className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      font-semibold

                      ${
                        tab === "transactions"
                          ? "bg-[#e30613] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
              >
                <FileText size={19} />

                <span>Transactions</span>
              </a>

              <a
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      font-semibold

                      ${
                        tab === "settings"
                          ? "bg-[#e30613] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
              >
                <Settings size={19} />

                <span>Settings</span>
              </a>
            </div>
          </nav>

          {/* Bottom */}

          <div className="border-t border-gray-100 p-4">
            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-semibold
                text-gray-600
                hover:bg-gray-100
              "
            >
              <LogOut size={19} />
              Sign out
            </button>

            <button
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-semibold
                text-gray-600
                hover:bg-gray-100
              "
            >
              v1.19.0
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
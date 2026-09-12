"use client"

import React, { useEffect, useState } from 'react'
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  CreditCard,
  Wallet,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  UserPlus,
  Send,
  Download,
  Upload,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Eye,
  CircleDollarSign,
  Landmark,
  PiggyBank,
  Activity,
  UserCheck,
  UserX,
  FileText,
  BarChart3,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const SideBar = ({ sidebarOpen }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(sidebarOpen);

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [loading, setLoading] = useState(false);

  const menuItems = [
          {
            name: "Dashboard",
            icon: LayoutDashboard,
            link: "/admin-panel",
          },
      
          {
            name: "Bank Accounts",
            icon: Landmark,
            link: "/admin-panel/user-accounts",
          },
      
          {
            name: "Transactions",
            icon: FileText,
            link: "/admin-panel/transactions",
          },
      
          {
            name: "New Transaction",
            icon: ArrowLeftRight,
            link: "/admin-panel/transactions/new",
          },
        ];

  const mobileMenuItems = [
    {
      name: "Home",
      icon: Home,
    },

    {
      name: "Users",
      icon: Users,
    },

    {
      name: "Transactions",
      icon: ArrowLeftRight,
    },

    {
      name: "Accounts",
      icon: Landmark,
    },

    {
      name: "More",
      icon: Menu,
    },
  ];

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
    <div>
      {/* =====================================================
                      MOBILE SIDEBAR OVERLAY
                  ===================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
                      SIDEBAR
                  ===================================================== */}

      <aside
        className={`
                fixed
                left-0
                top-0
                z-50
                flex
                h-screen
                w-[270px]
                flex-col
                border-r
                border-gray-100
                bg-white
                transition-transform
                duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
              `}
      >
        {/* LOGO */}

        <div className="flex h-[78px] items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e30613] text-lg font-bold text-white">
              Z
            </div>

            <div>
              <div className="text-[18px] font-extrabold tracking-tight text-gray-900">
                Ziraat Bank
              </div>

              <div className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Admin Panel
              </div>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
            Admin Menu
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active = activeMenu === item.name;

              return (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => {
                    setActiveMenu(item.name);

                    setSidebarOpen(false);
                  }}
                  className={`
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-left
                            text-sm
                            font-medium
                            transition
                            ${
                              active
                                ? "bg-[#e30613] text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }
                          `}
                >
                  <Icon size={19} />

                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* ADMIN PROFILE */}

        <div className="border-t border-gray-100 p-4">
          <div className="mb-2 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">
              AD
            </div>

            <div>
              <div className="text-xs font-bold text-gray-900">
                Administrator
              </div>

              <div className="text-[9px] text-gray-400">Super Admin</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};


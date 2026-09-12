"use client";

import { useState } from "react";
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

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  /*
   * ----------------------------------------------------
   * SAMPLE ADMIN DATA
   * Replace these values with your API/database data.
   * ----------------------------------------------------
   */

  const statistics = [
    {
      title: "Total Users",
      value: "12,584",
      change: "+12.5%",
      description: "from last month",
      icon: Users,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      trend: "up",
    },

    {
      title: "Total Transactions",
      value: "48,921",
      change: "+18.2%",
      description: "from last month",
      icon: ArrowLeftRight,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "up",
    },

    {
      title: "Transaction Volume",
      value: "$8,942,530",
      change: "+14.8%",
      description: "from last month",
      icon: CircleDollarSign,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      trend: "up",
    },

    {
      title: "Successful",
      value: "45,216",
      change: "92.4%",
      description: "success rate",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      trend: "up",
    },

    {
      title: "Pending",
      value: "2,184",
      change: "4.5%",
      description: "of transactions",
      icon: Clock3,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "neutral",
    },

    {
      title: "Failed",
      value: "1,521",
      change: "3.1%",
      description: "of transactions",
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      trend: "down",
    },

    {
      title: "Total Deposits",
      value: "$5,628,430",
      change: "+21.4%",
      description: "this month",
      icon: TrendingUp,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "up",
    },

    {
      title: "Total Withdrawals",
      value: "$3,314,820",
      change: "+9.7%",
      description: "this month",
      icon: TrendingDown,
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      trend: "down",
    },
  ];

  const recentUsers = [
    {
      name: "John Anderson",
      email: "john.anderson@example.com",
      date: "Aug 18, 2026",
      status: "Active",
      initials: "JA",
    },

    {
      name: "Maria Williams",
      email: "maria.williams@example.com",
      date: "Aug 18, 2026",
      status: "Active",
      initials: "MW",
    },

    {
      name: "David Miller",
      email: "david.miller@example.com",
      date: "Aug 17, 2026",
      status: "Pending",
      initials: "DM",
    },

    {
      name: "Sophia Brown",
      email: "sophia.brown@example.com",
      date: "Aug 17, 2026",
      status: "Active",
      initials: "SB",
    },

    {
      name: "James Wilson",
      email: "james.wilson@example.com",
      date: "Aug 16, 2026",
      status: "Suspended",
      initials: "JW",
    },
  ];

  const recentTransactions = [
    {
      id: "TRX-829431",
      user: "John Anderson",
      type: "Deposit",
      amount: "+$12,500.00",
      status: "Successful",
      date: "Aug 18, 2026",
    },

    {
      id: "TRX-829430",
      user: "Maria Williams",
      type: "Transfer",
      amount: "-$3,250.00",
      status: "Successful",
      date: "Aug 18, 2026",
    },

    {
      id: "TRX-829429",
      user: "David Miller",
      type: "Withdrawal",
      amount: "-$1,500.00",
      status: "Pending",
      date: "Aug 18, 2026",
    },

    {
      id: "TRX-829428",
      user: "Sophia Brown",
      type: "Deposit",
      amount: "+$8,400.00",
      status: "Successful",
      date: "Aug 17, 2026",
    },

    {
      id: "TRX-829427",
      user: "James Wilson",
      type: "Transfer",
      amount: "-$950.00",
      status: "Failed",
      date: "Aug 17, 2026",
    },
  ];

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
    <div className="min-h-screen bg-[#f6f7f9] text-gray-900">

      {/* =====================================================
          MOBILE SIDEBAR OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
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
          bg-white
          border-r
          border-gray-100
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* Logo */}

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
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
            Main Menu
          </div>

          <nav className="space-y-1">

            {menuItems.map(
              (item) => {

                const Icon = item.icon;

                const active =
                  activeMenu ===
                  item.name;

                return (
                  <a
                  href={item.link}
                    key={item.name}
                    onClick={() => {
                      setActiveMenu(
                        item.name
                      );

                      setSidebarOpen(
                        false
                      );
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

                    <Icon
                      size={19}
                      strokeWidth={
                        active
                          ? 2.4
                          : 2
                      }
                    />

                    <span>
                      {item.name}
                    </span>

                  </a>
                );
              }
            )}

          </nav>

        </div>

        {/* Sidebar Bottom */}

        <div className="border-t border-gray-100 p-4">

          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600">

            <LogOut size={19} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="min-h-screen lg:pl-[270px]">

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            {/* Mobile menu */}

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>

              <div className="text-[11px] font-medium text-gray-400">
                Administration
              </div>

              <h1 className="text-[18px] font-bold text-gray-900 sm:text-xl">
                Admin Dashboard
              </h1>

            </div>

          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            {/* Search */}

            <button className="hidden h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 sm:flex">
              <Search size={19} />
            </button>

            {/* Notification */}

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100">

              <Bell size={19} />

              <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white bg-[#e30613]" />

            </button>

            {/* Admin profile */}

            <div className="hidden items-center gap-3 sm:flex">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                AD
              </div>

              <div className="hidden xl:block">

                <div className="text-xs font-bold text-gray-900">
                  Administrator
                </div>

                <div className="text-[10px] text-gray-400">
                  Super Admin
                </div>

              </div>

              <ChevronDown
                size={16}
                className="text-gray-400"
              />

            </div>

          </div>

        </header>

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main className="px-4 pb-28 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pb-10">

          {/* Page heading */}

          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-400">

                <LayoutDashboard
                  size={14}
                />

                <span>
                  Dashboard
                </span>

              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Overview
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Monitor users, transactions and
                banking activities.
              </p>

            </div>

            <div className="flex gap-2">

              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 sm:flex-none">

                <FileText
                  size={16}
                />

                Reports

              </button>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e30613] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 sm:flex-none">

                <UserPlus
                  size={16}
                />

                Add User

              </button>

            </div>

          </div>

          {/* =================================================
              STATISTICS GRID
          ================================================= */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">

            {statistics.map(
              (stat) => {

                const Icon =
                  stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.025)] transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                  >

                    <div className="flex items-start justify-between gap-2">

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          ${stat.iconBg}
                          ${stat.iconColor}
                        `}
                      >

                        <Icon
                          size={20}
                        />

                      </div>

                      <button className="text-gray-300 hover:text-gray-500">
                        <MoreVertical
                          size={18}
                        />
                      </button>

                    </div>

                    <div className="mt-4">

                      <div className="text-[11px] font-medium text-gray-500 sm:text-xs">
                        {stat.title}
                      </div>

                      <div className="mt-1 break-words text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                        {stat.value}
                      </div>

                    </div>

                    <div className="mt-2 flex items-center gap-1 text-[9px] sm:text-[10px]">

                      {stat.trend ===
                        "up" && (
                        <TrendingUp
                          size={12}
                          className="text-green-500"
                        />
                      )}

                      {stat.trend ===
                        "down" && (
                        <TrendingDown
                          size={12}
                          className="text-red-500"
                        />
                      )}

                      <span
                        className={`
                          font-bold
                          ${
                            stat.trend ===
                            "up"
                              ? "text-green-600"
                              : stat.trend ===
                                "down"
                              ? "text-red-500"
                              : "text-orange-500"
                          }
                        `}
                      >
                        {stat.change}
                      </span>

                      <span className="text-gray-400">
                        {stat.description}
                      </span>

                    </div>

                  </div>
                );
              }
            )}

          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="mt-6">

            <div className="mb-3 flex items-center justify-between">

              <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                Quick Actions
              </h3>

              <span className="text-[10px] text-gray-400">
                Administration
              </span>

            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              <button className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.025)] transition hover:border-red-100 hover:shadow-md">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">

                  <UserPlus
                    size={19}
                  />

                </div>

                <div>

                  <div className="text-xs font-bold text-gray-900">
                    Add User
                  </div>

                  <div className="mt-0.5 text-[9px] text-gray-400">
                    Create account
                  </div>

                </div>

              </button>

              <button className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.025)] transition hover:border-blue-100 hover:shadow-md">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">

                  <Send
                    size={19}
                  />

                </div>

                <div>

                  <div className="text-xs font-bold text-gray-900">
                    Transactions
                  </div>

                  <div className="mt-0.5 text-[9px] text-gray-400">
                    Manage transfers
                  </div>

                </div>

              </button>

              <button className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.025)] transition hover:border-green-100 hover:shadow-md">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">

                  <Download
                    size={19}
                  />

                </div>

                <div>

                  <div className="text-xs font-bold text-gray-900">
                    Withdrawals
                  </div>

                  <div className="mt-0.5 text-[9px] text-gray-400">
                    Review requests
                  </div>

                </div>

              </button>

              <button className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.025)] hover:shadow-md">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">

                  <BarChart3
                    size={19}
                  />

                </div>

                <div>

                  <div className="text-xs font-bold text-gray-900">
                    Reports
                  </div>

                  <div className="mt-0.5 text-[9px] text-gray-400">
                    View analytics
                  </div>

                </div>

              </button>

            </div>

          </section>

          {/* =================================================
              CHART + ACCOUNT SUMMARY
          ================================================= */}

          <section className="mt-6 grid gap-5 lg:grid-cols-3">

            {/* Transaction Overview */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.025)] lg:col-span-2">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-sm font-bold text-gray-900">
                    Transaction Overview
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Transaction activity over
                    the last 7 months
                  </p>

                </div>

                <select
                  className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-[10px] font-medium text-gray-600 outline-none"
                  defaultValue="7"
                >

                  <option value="7">
                    Last 7 months
                  </option>

                  <option value="30">
                    Last 30 days
                  </option>

                  <option value="12">
                    Last year
                  </option>

                </select>

              </div>

              {/* Simple CSS chart */}

              <div className="mt-8">

                <div className="flex h-[190px] items-end gap-2 sm:gap-4">

                  {[
                    {
                      month: "Feb",
                      height: "45%",
                    },
                    {
                      month: "Mar",
                      height: "60%",
                    },
                    {
                      month: "Apr",
                      height: "52%",
                    },
                    {
                      month: "May",
                      height: "76%",
                    },
                    {
                      month: "Jun",
                      height: "65%",
                    },
                    {
                      month: "Jul",
                      height: "84%",
                    },
                    {
                      month: "Aug",
                      height: "94%",
                    },
                  ].map(
                    (item) => (
                      <div
                        key={
                          item.month
                        }
                        className="flex h-full flex-1 flex-col justify-end"
                      >

                        <div
                          className="w-full rounded-t-lg bg-[#e30613] transition hover:bg-red-700"
                          style={{
                            height:
                              item.height,
                          }}
                        />

                        <div className="pt-2 text-center text-[9px] text-gray-400">
                          {
                            item.month
                          }
                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              <div className="mt-5 flex flex-wrap gap-5 border-t border-gray-100 pt-4">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-[#e30613]" />

                  <span className="text-[10px] text-gray-500">
                    Transactions
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-gray-200" />

                  <span className="text-[10px] text-gray-500">
                    Previous period
                  </span>

                </div>

              </div>

            </div>

            {/* Financial Summary */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.025)]">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-sm font-bold text-gray-900">
                    Financial Summary
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Current account activity
                  </p>

                </div>

                <PiggyBank
                  size={20}
                  className="text-red-500"
                />

              </div>

              <div className="mt-6 space-y-5">

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-[10px] text-gray-500">
                      Deposits
                    </span>

                    <span className="text-xs font-bold text-gray-900">
                      $5.62M
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                    <div className="h-full w-[82%] rounded-full bg-green-500" />

                  </div>

                </div>

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-[10px] text-gray-500">
                      Withdrawals
                    </span>

                    <span className="text-xs font-bold text-gray-900">
                      $3.31M
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                    <div className="h-full w-[57%] rounded-full bg-red-500" />

                  </div>

                </div>

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-[10px] text-gray-500">
                      Transfers
                    </span>

                    <span className="text-xs font-bold text-gray-900">
                      $2.94M
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                    <div className="h-full w-[49%] rounded-full bg-blue-500" />

                  </div>

                </div>

              </div>

              <div className="mt-7 rounded-xl bg-gray-50 p-4">

                <div className="text-[9px] font-medium uppercase tracking-wider text-gray-400">
                  Net Movement
                </div>

                <div className="mt-1 text-xl font-extrabold text-gray-900">
                  +$2.31M
                </div>

                <div className="mt-1 flex items-center gap-1 text-[9px] font-semibold text-green-600">

                  <TrendingUp
                    size={11}
                  />

                  16.8% this month

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              RECENT USERS + TRANSACTIONS
          ================================================= */}

          <section className="mt-6 grid gap-5 xl:grid-cols-2">

            {/* Recent Users */}

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.025)]">

              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

                <div>

                  <h3 className="text-sm font-bold text-gray-900">
                    Recent Users
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Recently registered customers
                  </p>

                </div>

                <button className="text-[10px] font-bold text-[#e30613] hover:underline">
                  View All
                </button>

              </div>

              <div className="divide-y divide-gray-50">

                {recentUsers.map(
                  (user) => (
                    <div
                      key={
                        user.email
                      }
                      className="flex items-center justify-between gap-3 px-5 py-3.5"
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] font-bold text-red-600">
                          {
                            user.initials
                          }
                        </div>

                        <div className="min-w-0">

                          <div className="truncate text-xs font-bold text-gray-900">
                            {
                              user.name
                            }
                          </div>

                          <div className="truncate text-[9px] text-gray-400">
                            {
                              user.email
                            }
                          </div>

                        </div>

                      </div>

                      <div className="flex shrink-0 items-center gap-3">

                        <div className="hidden text-right sm:block">

                          <div className="text-[9px] text-gray-400">
                            Registered
                          </div>

                          <div className="text-[9px] font-medium text-gray-600">
                            {
                              user.date
                            }
                          </div>

                        </div>

                        <span
                          className={`
                            rounded-full
                            px-2
                            py-1
                            text-[8px]
                            font-bold

                            ${
                              user.status ===
                              "Active"
                                ? "bg-green-50 text-green-600"
                                : user.status ===
                                  "Pending"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-red-50 text-red-600"
                            }
                          `}
                        >
                          {
                            user.status
                          }
                        </span>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* Recent Transactions */}

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.025)]">

              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

                <div>

                  <h3 className="text-sm font-bold text-gray-900">
                    Recent Transactions
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Latest banking transactions
                  </p>

                </div>

                <button className="text-[10px] font-bold text-[#e30613] hover:underline">
                  View All
                </button>

              </div>

              <div className="divide-y divide-gray-50">

                {recentTransactions.map(
                  (transaction) => (
                    <div
                      key={
                        transaction.id
                      }
                      className="flex items-center justify-between gap-3 px-5 py-3.5"
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl

                            ${
                              transaction.type ===
                              "Deposit"
                                ? "bg-green-50 text-green-600"
                                : transaction.type ===
                                  "Withdrawal"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-blue-50 text-blue-600"
                            }
                          `}
                        >

                          {transaction.type ===
                            "Deposit" && (
                            <Upload
                              size={15}
                            />
                          )}

                          {transaction.type ===
                            "Withdrawal" && (
                            <Download
                              size={15}
                            />
                          )}

                          {transaction.type ===
                            "Transfer" && (
                            <Send
                              size={15}
                            />
                          )}

                        </div>

                        <div className="min-w-0">

                          <div className="truncate text-xs font-bold text-gray-900">
                            {
                              transaction.user
                            }
                          </div>

                          <div className="truncate text-[9px] text-gray-400">
                            {
                              transaction.id
                            }
                            {" • "}
                            {
                              transaction.type
                            }
                          </div>

                        </div>

                      </div>

                      <div className="shrink-0 text-right">

                        <div
                          className={`
                            text-xs
                            font-bold

                            ${
                              transaction.amount.startsWith(
                                "+"
                              )
                                ? "text-green-600"
                                : "text-gray-900"
                            }
                          `}
                        >
                          {
                            transaction.amount
                          }
                        </div>

                        <div className="mt-1">

                          <span
                            className={`
                              rounded-full
                              px-2
                              py-0.5
                              text-[8px]
                              font-bold

                              ${
                                transaction.status ===
                                "Successful"
                                  ? "bg-green-50 text-green-600"
                                  : transaction.status ===
                                    "Pending"
                                  ? "bg-orange-50 text-orange-600"
                                  : "bg-red-50 text-red-600"
                              }
                            `}
                          >
                            {
                              transaction.status
                            }
                          </span>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </section>

          {/* =================================================
              SYSTEM STATUS
          ================================================= */}

          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.025)]">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">

                  <Activity
                    size={20}
                  />

                </div>

                <div>

                  <h3 className="text-xs font-bold text-gray-900">
                    System Status
                  </h3>

                  <p className="mt-1 text-[9px] text-gray-400">
                    All banking services are operating normally.
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-[9px] font-medium text-gray-500">
                    Online Banking
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-[9px] font-medium text-gray-500">
                    Transactions
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-[9px] font-medium text-gray-500">
                    API
                  </span>

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>
    </div>
  );
}
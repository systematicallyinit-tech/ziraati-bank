"use client";

import { useMemo, useState, useEffect } from "react";
import axios from "axios";

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
  Landmark,
  FileText,
  Trash2,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  MoreVertical,
  Eye,
  Phone,
  Mail,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import LoadingScreen from "../loading";
import { useAuth } from '@/app/context/AuthContext';

export default function AdminUsersPage() {
  const { user } = useAuth();
  const adminID = user._id;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
        const [isError, setIsError] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Bank Accounts");

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [openMenu, setOpenMenu] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  useEffect(() => {

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setIsError(false);

      const res = await axios.get(
        "/api/auth/admin/getAllUsers/user?type=user",
        {
          withCredentials: true,
        }
      );

      console.log("Users response:", res.data);

      if (res.status === 200) {
        setUsers(res.data.data || []);
      }
    } catch (error) {
      console.error("Fetch users failed:", error);

      setErrorMessage(
        error.response?.data?.message ||
        "Failed to fetch users"
      );

      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  /*
   * --------------------------------------------------
   * SIDEBAR MENU
   * --------------------------------------------------
   */

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

  /*
   * --------------------------------------------------
   * FILTER USERS
   * --------------------------------------------------
   */

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

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        user.fullname.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.accountNumber.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Approved" && user.isVerified === true) ||
        (statusFilter === "Unapproved" && user.isVerified === false);

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  /*
   * --------------------------------------------------
   * PAGINATION
   * --------------------------------------------------
   */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * usersPerPage;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage,
  );

  /*
   * --------------------------------------------------
   * APPROVE / UNAPPROVE
   * --------------------------------------------------
   */

  const toggleApproval = async (_id) => {
    setLoading(true);
    try {
            const user = users.find((user) => user._id === _id);

            if (!user) return;

            const newVerificationStatus = !user.isVerified;

            const res = await axios.patch(
              `/api/auth/admin/getAllUsers/user?userId=${adminID}`,
              {
                userID: _id,
                isVerified: newVerificationStatus,
                type: "user",
              },
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (res.status === 200) {
              setIsError(false);
              window.location.reload();
            }
          } catch(err) {
            setErrorMessage("Error!");
            setIsError(true);
            setLoading(false);
          }
  };

  /*
   * --------------------------------------------------
   * DELETE USER
   * --------------------------------------------------
   */

  const deleteUser = async (_id) => {
    const user = users.find((item) => item._id === _id);

    if (!user) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.fullname}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.filter((item) => item._id !== _id)
    );

    setOpenMenu(null);

    try {
      setLoading(true);

      const res = await axios.delete(
        `/api/auth/admin/getAllUsers/user?id=${_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setIsError(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Delete user error:", err);

      setErrorMessage("Error!");
      setIsError(true);
      setLoading(false);
    }
  };

  /*
   * --------------------------------------------------
   * FORMAT MONEY
   * --------------------------------------------------
   */

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  /*
   * --------------------------------------------------
   * STATUS BADGE
   * --------------------------------------------------
   */

  const StatusBadge = ({ status }) => {
    if (status === true) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Approved
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Unapproved
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-gray-900">
      {/* ==================================================
          MOBILE SIDEBAR OVERLAY
      ================================================== */}

      {loading === true && (<LoadingScreen />)}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

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
            onClick={() => setSidebarOpen(false)}
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
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active = activeMenu === item.name;

              return (
                <a
                  href={item.link}
                  key={item.name}
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
                  <Icon size={19} strokeWidth={active ? 2.4 : 2} />

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

      {/* ==================================================
          MAIN AREA
      ================================================== */}

      <div className="min-h-screen lg:pl-[270px]">
        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <div className="text-[11px] font-medium text-gray-400">
                Administration
              </div>

              <h1 className="text-[18px] font-bold text-gray-900 sm:text-xl">
                Bank Accounts
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 sm:flex">
              <Search size={19} />
            </button>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100">
              <Bell size={19} />

              <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white bg-[#e30613]" />
            </button>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                AD
              </div>

              <div className="hidden xl:block">
                <div className="text-xs font-bold text-gray-900">
                  Administrator
                </div>

                <div className="text-[10px] text-gray-400">Super Admin</div>
              </div>

              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main className="px-4 pb-28 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pb-10">
          {/* Page Heading */}

          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-400">
                <Users size={14} />

                <span>Administration</span>

                <span>/</span>

                <span>Users</span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                All Users
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Manage customer accounts, balances and account approval status.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-bold text-gray-600 transition hover:bg-gray-50"
              >
                <RefreshCw size={15} />
                Refresh
              </button>
            </div>
          </div>

          {/* ==================================================
              STAT CARDS
          ================================================== */}

          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {/* Total */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.025)] sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users size={18} />
                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  TOTAL
                </span>
              </div>

              <div className="mt-4 text-xl font-extrabold text-gray-900 sm:text-2xl">
                {users.length}
              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                Registered users
              </div>
            </div>

            {/* Approved */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.025)] sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <UserCheck size={18} />
                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  APPROVED
                </span>
              </div>

              <div className="mt-4 text-xl font-extrabold text-gray-900 sm:text-2xl">
                {users.filter((user) => user.isVerified === true).length}
              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                Active accounts
              </div>
            </div>

            {/* Pending */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.025)] sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <ShieldCheck size={18} />
                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  PENDING
                </span>
              </div>

              <div className="mt-4 text-xl font-extrabold text-gray-900 sm:text-2xl">
                {users.filter((user) => user.isVerified === false).length}
              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                Awaiting review
              </div>
            </div>

            {/* Unapproved */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.025)] sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <UserX size={18} />
                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  UNAPPROVED
                </span>
              </div>

              <div className="mt-4 text-xl font-extrabold text-gray-900 sm:text-2xl">
                {users.filter((user) => user.isVerified === false).length}
              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                Restricted accounts
              </div>
            </div>
          </div>

          {/* ==================================================
              USERS TABLE CONTAINER
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
            {/* Table Header */}

            <div className="border-b border-gray-100 p-4 sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Customer Accounts
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-400">
                    {filteredUsers.length} users found
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  {/* Search */}

                  <div className="relative">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => {
                        setSearchTerm(event.target.value);

                        setCurrentPage(1);
                      }}
                      placeholder="Search users..."
                      className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 sm:w-[240px]"
                    />
                  </div>

                  {/* Status Filter */}

                  <div className="relative">
                    <Filter
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                      value={statusFilter}
                      onChange={(event) => {
                        setStatusFilter(event.target.value);

                        setCurrentPage(1);
                      }}
                      className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-9 text-xs font-medium text-gray-600 outline-none focus:border-red-500 focus:bg-white sm:w-[160px]"
                    >
                      <option value="All">All Status</option>

                      <option value="Approved">Approved</option>

                      <option value="Pending">Pending</option>

                      <option value="Unapproved">Unapproved</option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ==================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      User
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Contact
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Account Number
                    </th>

                    <th className="px-5 py-3 text-right text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Balance
                    </th>

                    <th className="px-5 py-3 text-center text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-5 py-3 text-center text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Approval
                    </th>

                    <th className="px-5 py-3 text-center text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-50 transition hover:bg-gray-50/70"
                    >
                      {/* User */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600">
                            {user.fullname
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-xs font-bold text-gray-900">
                              {user.fullname}
                            </div>

                            <div className="mt-0.5 text-[9px] text-gray-400">
                              {user._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                            <Mail size={12} className="text-gray-400" />

                            {user.email}
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                            <Phone size={12} />

                            {user.phone}
                          </div>
                        </div>
                      </td>

                      {/* Account Number */}

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 font-mono text-[10px] font-semibold text-gray-600">
                          {user.accountNumber}
                        </span>
                      </td>

                      {/* Balance */}

                      <td className="px-5 py-4 text-right">
                        <div className="text-xs font-extrabold text-gray-900">
                          {formatMoney(user.balance)}
                        </div>

                        <div className="mt-0.5 text-[9px] text-gray-400">
                          Available balance
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4 text-center">
                        <StatusBadge status={user.isVerified} />
                      </td>

                      {/* Approve */}

                      <td className="px-5 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleApproval(user._id)}
                            className={`
                                flex
                                h-8
                                items-center
                                gap-1.5
                                rounded-lg
                                px-3
                                text-[9px]
                                font-bold
                                transition

                                ${
                                  user.isVerified === true
                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                    : "bg-green-50 text-green-600 hover:bg-green-100"
                                }
                              `}
                          >
                            {user.isVerified === false ? (
                              <>
                                <XCircle size={13} />
                                Unapprove
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={13} />
                                Approve
                              </>
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="relative flex justify-center">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === user._id ? null : user._id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          >
                            <MoreVertical size={17} />
                          </button>

                          {openMenu === user._id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenu(null)}
                              />

                              <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl">
                                <button
                                  onClick={() => setOpenMenu(null)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                                >
                                  <Eye size={14} />
                                  View User
                                </button>

                                <button
                                  onClick={() => deleteUser(user._id)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-medium text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 size={14} />
                                  Delete User
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty */}

              {paginatedUsers.length === 0 && (
                <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                    <Users size={23} />
                  </div>

                  <div className="text-sm font-bold text-gray-700">
                    No users found
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    Try changing your search or filter.
                  </p>
                </div>
              )}
            </div>

            {/* ==================================================
                MOBILE / TABLET USER CARDS
            ================================================== */}

            <div className="divide-y divide-gray-100 lg:hidden">
              {paginatedUsers.map((user) => (
                <div key={user._id} className="p-4 sm:p-5">
                  {/* Top */}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600">
                        {user.fullname
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-gray-900">
                          {user.fullname}
                        </div>

                        <div className="mt-0.5 truncate text-[10px] text-gray-400">
                          {user._id}
                        </div>
                      </div>
                    </div>

                    <StatusBadge status={user.isVerified} />
                  </div>

                  {/* Details */}

                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3">
                    <div>
                      <div className="mb-1 text-[8px] font-bold uppercase tracking-wide text-gray-400">
                        Email
                      </div>

                      <div className="flex min-w-0 items-center gap-1.5">
                        <Mail size={12} className="shrink-0 text-gray-400" />

                        <span className="truncate text-[10px] font-medium text-gray-600">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 text-[8px] font-bold uppercase tracking-wide text-gray-400">
                        Phone
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="shrink-0 text-gray-400" />

                        <span className="truncate text-[10px] font-medium text-gray-600">
                          {user.phone}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 text-[8px] font-bold uppercase tracking-wide text-gray-400">
                        Account Number
                      </div>

                      <div className="truncate font-mono text-[10px] font-bold text-gray-700">
                        {user.accountNumber}
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 text-[8px] font-bold uppercase tracking-wide text-gray-400">
                        Balance
                      </div>

                      <div className="text-xs font-extrabold text-gray-900">
                        {formatMoney(user.balance)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => toggleApproval(user._id)}
                      className={`
                          flex
                          h-10
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-xl
                          text-[10px]
                          font-bold
                          transition

                          ${
                            user.isVerified === true
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          }
                        `}
                    >
                      {user.isVerified === true ? (
                        <>
                          <XCircle size={14} />
                          Unapprove
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={14} />
                          Approve
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                      aria-label="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {paginatedUsers.length === 0 && (
                <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                    <Users size={23} />
                  </div>

                  <div className="text-sm font-bold text-gray-700">
                    No users found
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    Try changing your search or filter.
                  </p>
                </div>
              )}
            </div>

            {/* ==================================================
                PAGINATION
            ================================================== */}

            <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="text-[10px] text-gray-400">
                Showing{" "}
                <span className="font-bold text-gray-600">
                  {filteredUsers.length === 0 ? 0 : startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-bold text-gray-600">
                  {Math.min(startIndex + usersPerPage, filteredUsers.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-600">
                  {filteredUsers.length}
                </span>{" "}
                users
              </div>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <button
                  disabled={safeCurrentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                </button>

                <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#e30613] px-2 text-[10px] font-bold text-white">
                  {safeCurrentPage}
                </div>

                <button
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

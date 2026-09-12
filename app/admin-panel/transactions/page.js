"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  MoreVertical,
  Eye,
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
} from "lucide-react";


export default function AdminTransactionsPage() {
  /*
   * =========================================================
   * SIDEBAR
   * =========================================================
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

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState("Transactions");

  /*
   * =========================================================
   * FILTERS
   * =========================================================
   */

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [directionFilter, setDirectionFilter] =
    useState("All");

  /*
   * =========================================================
   * MENU / PAGINATION
   * =========================================================
   */

  const [openMenu, setOpenMenu] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const usersPerPage = 8;

  /*
   * =========================================================
   * API STATE
   * =========================================================
   */

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(null);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  /*
   * =========================================================
   * AUTH HEADERS
   * =========================================================
   *
   * Change "token" below if your login system stores
   * the JWT using another localStorage key.
   *
   * Example:
   * localStorage.setItem("token", jwt)
   */

  const getAuthHeaders = useCallback(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("jwt")
        : null;

    return {
      "Content-Type":
        "application/json",

      ...(token
        ? {
            Authorization:
              `Bearer ${token}`,
          }
        : {}),
    };
  }, []);

  /*
   * =========================================================
   * FETCH ALL TRANSACTIONS
   * =========================================================
   */

  const fetchTransactions =
    useCallback(async () => {
      try {
        setLoading(true);

        setError("");

        const response =
          await fetch(
            "/api/auth/admin/transactions",
            {
              method: "GET",

              headers:
                getAuthHeaders(),

              cache: "no-store",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch transactions."
          );
        }

        setTransactions(
          Array.isArray(
            data.transactions
          )
            ? data.transactions
            : []
        );
      } catch (error) {
        console.error(
          "Fetch transactions error:",
          error
        );

        setError(
          error.message ||
            "Unable to load transactions."
        );
      } finally {
        setLoading(false);
      }
    }, [getAuthHeaders]);

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  /*
   * =========================================================
   * SIDEBAR MENU
   * =========================================================
   */

  /*
   * =========================================================
   * MOBILE NAVIGATION
   * =========================================================
   */

  const mobileMenuItems = [
    {
      name: "Home",
      icon: LayoutDashboard,
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

  /*
   * =========================================================
   * FORMAT MONEY
   * =========================================================
   */

  const formatMoney = (
    amount,
    currency = "USD"
  ) => {
    const numericAmount =
      Number(amount) || 0;

    try {
      return new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency:
            currency || "USD",

          minimumFractionDigits: 2,
        }
      ).format(numericAmount);
    } catch {
      return `${numericAmount.toFixed(
        2
      )} ${currency || "USD"}`;
    }
  };

  /*
   * =========================================================
   * SEARCH + FILTER
   * =========================================================
   */

  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (transaction) => {
          const search =
            searchTerm
              .toLowerCase()
              .trim();

          const userName =
            transaction.userId
              ?.fullname || "";

          const userEmail =
            transaction.userId
              ?.email || "";

          const receiverName =
            transaction.receiver
              ?.fullname || "";

          const receiverEmail =
            transaction.receiver
              ?.email || "";

          const transactionId =
            transaction.id || "";

          const account =
            transaction.account || "";

          const beneficiary =
            transaction.beneficiary ||
            "";

          const bank =
            transaction.bank || "";

          const description =
            transaction.description ||
            "";

          const type =
            transaction.type || "";

          const searchableText = [
            transactionId,
            userName,
            userEmail,
            receiverName,
            receiverEmail,
            account,
            beneficiary,
            bank,
            description,
            type,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !search ||
            searchableText.includes(
              search
            );

          const matchesStatus =
            statusFilter ===
              "All" ||
            transaction.status ===
              statusFilter;

          const matchesType =
            typeFilter === "All" ||
            transaction.type ===
              typeFilter;

          const matchesDirection =
            directionFilter ===
              "All" ||
            transaction.direction ===
              directionFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesType &&
            matchesDirection
          );
        }
      );
    }, [
      transactions,
      searchTerm,
      statusFilter,
      typeFilter,
      directionFilter,
    ]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTransactions.length /
        usersPerPage
    )
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const startIndex =
    (safeCurrentPage - 1) *
    usersPerPage;

  const paginatedTransactions =
    filteredTransactions.slice(
      startIndex,
      startIndex +
        usersPerPage
    );

  /*
   * =========================================================
   * KEEP PAGE VALID AFTER DELETE/FILTER
   * =========================================================
   */

  useEffect(() => {
    if (
      currentPage >
      totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  /*
   * =========================================================
   * APPROVE / UNAPPROVE
   * =========================================================
   */

  const toggleApproval =
    async (transaction) => {
      if (!transaction?._id) {
        return;
      }

      if (
        transaction.status ===
        "Failed"
      ) {
        return;
      }

      const isSuccessful =
        transaction.status ===
        "Successful";

      const action =
        isSuccessful
          ? "unapprove"
          : "approve";

      const actionText =
        isSuccessful
          ? "unapprove"
          : "approve";

      const confirmed =
        window.confirm(
          `Are you sure you want to ${actionText} transaction ${transaction.id}?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setActionLoading(
          transaction._id
        );

        setError("");

        setSuccessMessage("");

        setOpenMenu(null);

        const response =
          await fetch(
            "/api/auth/admin/transactions",
            {
              method: "PATCH",

              headers:
                getAuthHeaders(),

              body: JSON.stringify({
                action,

                transactionId:
                  transaction._id,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              `Failed to ${actionText} transaction.`
          );
        }

        /*
         * Only update the UI after
         * the API succeeds.
         */

        setTransactions(
          (current) =>
            current.map(
              (item) => {
                if (
                  item._id !==
                  transaction._id
                ) {
                  return item;
                }

                return {
                  ...item,

                  status:
                    action ===
                    "approve"
                      ? "Successful"
                      : "Pending",
                };
              }
            )
        );

        setSuccessMessage(
          data.message ||
            `Transaction ${actionText}d successfully.`
        );
      } catch (error) {
        console.error(
          "Approval error:",
          error
        );

        setError(
          error.message ||
            `Failed to ${actionText} transaction.`
        );
      } finally {
        setActionLoading(null);
      }
    };


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

  /*
   * =========================================================
   * DELETE TRANSACTION
   * =========================================================
   */

  const deleteTransaction =
    async (transactionId) => {
      const transaction =
        transactions.find(
          (item) =>
            item._id ===
            transactionId
        );

      if (!transaction) {
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to delete transaction ${transaction.id}?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setActionLoading(
          transactionId
        );

        setError("");

        setSuccessMessage("");

        setOpenMenu(null);

        const response =
          await fetch(
            "/api/auth/admin/transactions",
            {
              method: "DELETE",

              headers:
                getAuthHeaders(),

              body: JSON.stringify({
                transactionId,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to delete transaction."
          );
        }

        /*
         * Only remove it from the UI
         * after MongoDB confirms deletion.
         */

        setTransactions(
          (current) =>
            current.filter(
              (item) =>
                item._id !==
                transactionId
            )
        );

        setSuccessMessage(
          data.message ||
            "Transaction deleted successfully."
        );
      } catch (error) {
        console.error(
          "Delete transaction error:",
          error
        );

        setError(
          error.message ||
            "Failed to delete transaction."
        );
      } finally {
        setActionLoading(null);
      }
    };

  /*
   * =========================================================
   * TRANSACTION TYPE ICON
   * =========================================================
   */

  const TypeIcon = ({
    type,
  }) => {
    if (
      type === "Deposit"
    ) {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <ArrowDownLeft
            size={17}
          />
        </div>
      );
    }

    if (
      type === "Withdrawal"
    ) {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <ArrowUpRight
            size={17}
          />
        </div>
      );
    }

    if (
      type === "Transfer"
    ) {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ArrowLeftRight
            size={17}
          />
        </div>
      );
    }

    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
        <CreditCard
          size={17}
        />
      </div>
    );
  };

  /*
   * =========================================================
   * STATUS BADGE
   * =========================================================
   */

  const StatusBadge = ({
    status,
  }) => {
    if (
      status ===
      "Successful"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

          Successful
        </span>
      );
    }

    if (
      status === "Pending"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-orange-600">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

          Pending
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

        Failed
      </span>
    );
  };

  /*
   * =========================================================
   * DIRECTION BADGE
   * =========================================================
   */

  const DirectionBadge = ({
    direction,
  }) => {
    if (
      direction === "in"
    ) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-green-600">
          <ArrowDownLeft
            size={12}
          />

          In
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600">
        <ArrowUpRight
          size={12}
        />

        Out
      </span>
    );
  };

  /*
   * =========================================================
   * MAIN UI
   * =========================================================
   */

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

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="min-h-screen lg:pl-[270px]">

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setSidebarOpen(
                  true
                )
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
                Transactions
              </h1>

            </div>

          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            <button className="hidden h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500 sm:flex">
              <Search
                size={19}
              />
            </button>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
              <Bell
                size={19}
              />

              <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white bg-[#e30613]" />
            </button>

            <div className="hidden items-center gap-3 sm:flex">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                AD
              </div>

              <div className="hidden xl:block">

                <div className="text-xs font-bold">
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
            CONTENT
        =================================================== */}

        <main className="px-4 pb-28 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pb-10">

          {/* PAGE TITLE */}

          <div className="mb-6">

            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-400">

              <ArrowLeftRight
                size={14}
              />

              Administration

              <span>/</span>

              Transactions

            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              All Transactions
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Review, approve,
              unapprove and
              manage customer
              transactions.
            </p>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">

              <div className="flex items-center gap-2">

                <AlertCircle
                  size={16}
                />

                <span>
                  {error}
                </span>

              </div>

              <button
                onClick={
                  fetchTransactions
                }
                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-red-600 shadow-sm"
              >
                <RefreshCw
                  size={13}
                />

                Retry
              </button>

            </div>
          )}

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {successMessage && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-xs font-medium text-green-600">

              <CheckCircle2
                size={16}
              />

              {successMessage}

            </div>
          )}

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

            {/* TOTAL */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                  <CircleDollarSign
                    size={18}
                  />

                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  TOTAL
                </span>

              </div>

              <div className="mt-4 text-xl font-extrabold sm:text-2xl">
                {
                  transactions.length
                }
              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                All transactions
              </div>

            </div>

            {/* SUCCESSFUL */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">

                  <CheckCircle2
                    size={18}
                  />

                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  SUCCESSFUL
                </span>

              </div>

              <div className="mt-4 text-xl font-extrabold sm:text-2xl">

                {
                  transactions.filter(
                    (transaction) =>
                      transaction.status ===
                      "Successful"
                  ).length
                }

              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                Approved transactions
              </div>

            </div>

            {/* PENDING */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">

                  <Clock3
                    size={18}
                  />

                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  PENDING
                </span>

              </div>

              <div className="mt-4 text-xl font-extrabold sm:text-2xl">

                {
                  transactions.filter(
                    (transaction) =>
                      transaction.status ===
                      "Pending"
                  ).length
                }

              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                Awaiting approval
              </div>

            </div>

            {/* FAILED */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">

                  <AlertCircle
                    size={18}
                  />

                </div>

                <span className="text-[9px] font-bold text-gray-400">
                  FAILED
                </span>

              </div>

              <div className="mt-4 text-xl font-extrabold sm:text-2xl">

                {
                  transactions.filter(
                    (transaction) =>
                      transaction.status ===
                      "Failed"
                  ).length
                }

              </div>

              <div className="mt-1 text-[9px] text-gray-400">
                Failed transactions
              </div>

            </div>

          </div>

          {/* =================================================
              TRANSACTION SECTION
          ================================================= */}

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* FILTER HEADER */}

            <div className="border-b border-gray-100 p-4 sm:p-5">

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                <div>

                  <h3 className="text-sm font-bold text-gray-900">
                    Transaction Records
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-400">

                    {
                      filteredTransactions.length
                    }{" "}

                    transaction
                    records found

                  </p>

                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">

                  {/* SEARCH */}

                  <div className="relative sm:col-span-2 lg:col-span-1">

                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={
                        searchTerm
                      }
                      onChange={(
                        event
                      ) => {
                        setSearchTerm(
                          event.target
                            .value
                        );

                        setCurrentPage(
                          1
                        );
                      }}
                      placeholder="Search transactions..."
                      className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-[10px] outline-none focus:border-red-500 focus:bg-white sm:w-[220px]"
                    />

                  </div>

                  {/* TYPE */}

                  <div className="relative">

                    <select
                      value={
                        typeFilter
                      }
                      onChange={(
                        event
                      ) => {
                        setTypeFilter(
                          event.target
                            .value
                        );

                        setCurrentPage(
                          1
                        );
                      }}
                      className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 pr-8 text-[10px] font-medium text-gray-600 outline-none focus:border-red-500"
                    >

                      <option value="All">
                        All Types
                      </option>

                      <option value="Deposit">
                        Deposit
                      </option>

                      <option value="Withdrawal">
                        Withdrawal
                      </option>

                      <option value="Payment">
                        Payment
                      </option>

                      <option value="Transfer">
                        Transfer
                      </option>

                    </select>

                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                  </div>

                  {/* STATUS */}

                  <div className="relative">

                    <select
                      value={
                        statusFilter
                      }
                      onChange={(
                        event
                      ) => {
                        setStatusFilter(
                          event.target
                            .value
                        );

                        setCurrentPage(
                          1
                        );
                      }}
                      className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 pr-8 text-[10px] font-medium text-gray-600 outline-none focus:border-red-500"
                    >

                      <option value="All">
                        All Status
                      </option>

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Successful">
                        Successful
                      </option>

                      <option value="Failed">
                        Failed
                      </option>

                    </select>

                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                  </div>

                  {/* DIRECTION */}

                  <div className="relative">

                    <select
                      value={
                        directionFilter
                      }
                      onChange={(
                        event
                      ) => {
                        setDirectionFilter(
                          event.target
                            .value
                        );

                        setCurrentPage(
                          1
                        );
                      }}
                      className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 pr-8 text-[10px] font-medium text-gray-600 outline-none focus:border-red-500"
                    >

                      <option value="All">
                        All Directions
                      </option>

                      <option value="in">
                        Incoming
                      </option>

                      <option value="out">
                        Outgoing
                      </option>

                    </select>

                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full min-w-[1250px] border-collapse">

                <thead>

                  <tr className="border-b border-gray-100 bg-gray-50/70">

                    <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Transaction
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Account
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Beneficiary
                    </th>

                    <th className="px-5 py-3 text-right text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Amount
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

                  {/* LOADING */}

                  {loading ? (
                    <tr>

                      <td
                        colSpan={8}
                        className="px-5 py-20 text-center"
                      >

                        <div className="flex flex-col items-center justify-center">

                          <RefreshCw
                            size={28}
                            className="animate-spin text-[#e30613]"
                          />

                          <p className="mt-3 text-xs font-semibold text-gray-600">
                            Loading transactions...
                          </p>

                          <p className="mt-1 text-[10px] text-gray-400">
                            Fetching transaction records
                          </p>

                        </div>

                      </td>

                    </tr>
                  ) : paginatedTransactions.length ===
                    0 ? (
                    <tr>

                      <td
                        colSpan={8}
                        className="px-5 py-20 text-center"
                      >

                        <div className="flex flex-col items-center">

                          <ArrowLeftRight
                            size={32}
                            className="text-gray-300"
                          />

                          <p className="mt-3 text-sm font-bold text-gray-600">
                            No transactions found
                          </p>

                          <p className="mt-1 text-[10px] text-gray-400">
                            Try changing your search or filters.
                          </p>

                        </div>

                      </td>

                    </tr>
                  ) : (
                    paginatedTransactions.map(
                      (
                        transaction
                      ) => (
                        <tr
                          key={
                            transaction._id
                          }
                          className="border-b border-gray-50 transition hover:bg-gray-50/60"
                        >

                          {/* TRANSACTION */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <TypeIcon
                                type={
                                  transaction.type
                                }
                              />

                              <div>

                                <div className="text-[11px] font-bold text-gray-900">
                                  {
                                    transaction.type
                                  }
                                </div>

                                <div className="mt-0.5 font-mono text-[9px] text-gray-400">
                                  {
                                    transaction.id ||
                                    transaction._id
                                  }
                                </div>

                                <div className="mt-1 flex items-center gap-1 text-[8px] text-gray-400">

                                  <Clock3
                                    size={
                                      10
                                    }
                                  />

                                  {
                                    transaction.date ||
                                    "—"
                                  }

                                  {" • "}

                                  {
                                    transaction.time ||
                                    "—"
                                  }

                                </div>

                              </div>

                            </div>

                          </td>

                          {/* CUSTOMER */}

                          <td className="px-5 py-4">

                            <div>

                              <div className="text-[11px] font-bold text-gray-900">
                                {
                                  transaction
                                    .userId
                                    ?.fullname ||
                                  "Unknown Customer"
                                }
                              </div>

                              <div className="mt-1 text-[9px] text-gray-400">
                                {
                                  transaction
                                    .userId
                                    ?.email ||
                                  "No email"
                                }
                              </div>

                            </div>

                          </td>

                          {/* ACCOUNT */}

                          <td className="px-5 py-4">

                            <div>

                              <div className="font-mono text-[10px] font-bold text-gray-700">
                                {
                                  transaction.account ||
                                  "—"
                                }
                              </div>

                              <div className="mt-1 text-[9px] text-gray-400">
                                {
                                  transaction.bank ||
                                  "—"
                                }
                              </div>

                            </div>

                          </td>

                          {/* BENEFICIARY */}

                          <td className="max-w-[200px] px-5 py-4">

                            <div className="truncate text-[10px] font-semibold text-gray-700">
                              {
                                transaction.beneficiary ||
                                "—"
                              }
                            </div>

                            {transaction.receiver && (
                              <div className="mt-1 truncate text-[9px] text-blue-500">
                                Receiver:{" "}
                                {
                                  transaction
                                    .receiver
                                    ?.fullname
                                }
                              </div>
                            )}

                            <div className="mt-1 truncate text-[9px] text-gray-400">
                              {
                                transaction.description ||
                                "No description"
                              }
                            </div>

                          </td>

                          {/* AMOUNT */}

                          <td className="px-5 py-4 text-right">

                            <div
                              className={`
                                text-xs
                                font-extrabold
                                ${
                                  transaction.direction ===
                                  "in"
                                    ? "text-green-600"
                                    : "text-gray-900"
                                }
                              `}
                            >

                              {transaction.direction ===
                              "in"
                                ? "+"
                                : "-"}

                              {
                                formatMoney(
                                  transaction.amount,
                                  transaction.currency
                                )
                              }

                            </div>

                            <div className="mt-1 flex justify-end">

                              <DirectionBadge
                                direction={
                                  transaction.direction
                                }
                              />

                            </div>

                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4 text-center">

                            <StatusBadge
                              status={
                                transaction.status
                              }
                            />

                          </td>

                          {/* APPROVAL */}

                          <td className="px-5 py-4">

                            <div className="flex justify-center">

                              <button
                                onClick={() =>
                                  toggleApproval(
                                    transaction
                                  )
                                }
                                disabled={
                                  transaction.status ===
                                    "Failed" ||
                                  actionLoading ===
                                    transaction._id
                                }
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
                                  disabled:cursor-not-allowed
                                  disabled:opacity-40
                                  ${
                                    transaction.status ===
                                    "Successful"
                                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                                      : "bg-green-50 text-green-600 hover:bg-green-100"
                                  }
                                `}
                              >

                                {actionLoading ===
                                transaction._id ? (
                                  <>
                                    <RefreshCw
                                      size={
                                        13
                                      }
                                      className="animate-spin"
                                    />

                                    Processing...
                                  </>
                                ) : transaction.status ===
                                  "Successful" ? (
                                  <>
                                    <XCircle
                                      size={
                                        13
                                      }
                                    />

                                    Unapprove
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2
                                      size={
                                        13
                                      }
                                    />

                                    Approve
                                  </>
                                )}

                              </button>

                            </div>

                          </td>

                          {/* ACTION */}

                          <td className="px-5 py-4">

                            <div className="relative flex justify-center">

                              <button
                                onClick={() =>
                                  setOpenMenu(
                                    openMenu ===
                                      transaction._id
                                      ? null
                                      : transaction._id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                              >

                                <MoreVertical
                                  size={
                                    17
                                  }
                                />

                              </button>

                              {openMenu ===
                                transaction._id && (
                                <>

                                  <div
                                    className="fixed inset-0 z-10"
                                    onClick={() =>
                                      setOpenMenu(
                                        null
                                      )
                                    }
                                  />

                                  <div className="absolute right-0 top-9 z-20 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl">

                                    <button
                                      onClick={() =>
                                        setOpenMenu(
                                          null
                                        )
                                      }
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                                    >

                                      <Eye
                                        size={
                                          14
                                        }
                                      />

                                      View Transaction

                                    </button>

                                    <button
                                      onClick={() =>
                                        deleteTransaction(
                                          transaction._id
                                        )
                                      }
                                      disabled={
                                        actionLoading ===
                                        transaction._id
                                      }
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[10px] font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                      {actionLoading ===
                                      transaction._id ? (
                                        <RefreshCw
                                          size={
                                            14
                                          }
                                          className="animate-spin"
                                        />
                                      ) : (
                                        <Trash2
                                          size={
                                            14
                                          }
                                        />
                                      )}

                                      Delete Transaction

                                    </button>

                                  </div>

                                </>
                              )}

                            </div>

                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* =================================================
                MOBILE / TABLET
            ================================================= */}

            <div className="divide-y divide-gray-100 lg:hidden">

              {loading ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

                  <RefreshCw
                    size={28}
                    className="animate-spin text-[#e30613]"
                  />

                  <p className="mt-3 text-xs font-semibold text-gray-600">
                    Loading transactions...
                  </p>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Fetching transaction records
                  </p>

                </div>
              ) : paginatedTransactions.length ===
                0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

                  <ArrowLeftRight
                    size={30}
                    className="mb-3 text-gray-300"
                  />

                  <div className="text-sm font-bold text-gray-700">
                    No transactions found
                  </div>

                  <div className="mt-1 text-xs text-gray-400">
                    Try changing your search or filters.
                  </div>

                </div>
              ) : (
                paginatedTransactions.map(
                  (
                    transaction
                  ) => (
                    <div
                      key={
                        transaction._id
                      }
                      className="p-4 sm:p-5"
                    >

                      {/* TOP */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <TypeIcon
                            type={
                              transaction.type
                            }
                          />

                          <div className="min-w-0">

                            <div className="text-sm font-bold text-gray-900">
                              {
                                transaction.type
                              }
                            </div>

                            <div className="mt-0.5 font-mono text-[9px] text-gray-400">
                              {
                                transaction.id ||
                                transaction._id
                              }
                            </div>

                          </div>

                        </div>

                        <StatusBadge
                          status={
                            transaction.status
                          }
                        />

                      </div>

                      {/* AMOUNT */}

                      <div className="mt-4 rounded-xl bg-gray-50 p-3">

                        <div className="flex items-center justify-between">

                          <div>

                            <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                              Amount
                            </div>

                            <div
                              className={`
                                mt-1
                                text-lg
                                font-extrabold
                                ${
                                  transaction.direction ===
                                  "in"
                                    ? "text-green-600"
                                    : "text-gray-900"
                                }
                              `}
                            >

                              {transaction.direction ===
                              "in"
                                ? "+"
                                : "-"}

                              {
                                formatMoney(
                                  transaction.amount,
                                  transaction.currency
                                )
                              }

                            </div>

                          </div>

                          <DirectionBadge
                            direction={
                              transaction.direction
                            }
                          />

                        </div>

                      </div>

                      {/* INFORMATION */}

                      <div className="mt-3 grid grid-cols-2 gap-3">

                        {/* CUSTOMER */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Customer
                          </div>

                          <div className="mt-1 truncate text-[10px] font-bold text-gray-700">
                            {
                              transaction
                                .userId
                                ?.fullname ||
                              "Unknown"
                            }
                          </div>

                          <div className="mt-0.5 truncate text-[8px] text-gray-400">
                            {
                              transaction
                                .userId
                                ?.email ||
                              "No email"
                            }
                          </div>

                        </div>

                        {/* ACCOUNT */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Account
                          </div>

                          <div className="mt-1 font-mono text-[10px] font-bold text-gray-700">
                            {
                              transaction.account ||
                              "—"
                            }
                          </div>

                        </div>

                        {/* BENEFICIARY */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Beneficiary
                          </div>

                          <div className="mt-1 truncate text-[10px] font-semibold text-gray-700">
                            {
                              transaction.beneficiary ||
                              "—"
                            }
                          </div>

                        </div>

                        {/* RECEIVER */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Receiver
                          </div>

                          <div className="mt-1 truncate text-[10px] font-semibold text-gray-700">
                            {
                              transaction
                                .receiver
                                ?.fullname ||
                              "External / Not Found"
                            }
                          </div>

                          {transaction
                            .receiver
                            ?.accountNumber && (
                            <div className="mt-0.5 font-mono text-[8px] text-gray-400">
                              {
                                transaction
                                  .receiver
                                  .accountNumber
                              }
                            </div>
                          )}

                        </div>

                        {/* BANK */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Bank
                          </div>

                          <div className="mt-1 truncate text-[10px] text-gray-600">
                            {
                              transaction.bank ||
                              "—"
                            }
                          </div>

                        </div>

                        {/* DATE */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Date
                          </div>

                          <div className="mt-1 text-[10px] text-gray-600">
                            {
                              transaction.date ||
                              "—"
                            }
                          </div>

                        </div>

                        {/* TIME */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Time
                          </div>

                          <div className="mt-1 text-[10px] text-gray-600">
                            {
                              transaction.time ||
                              "—"
                            }
                          </div>

                        </div>

                        {/* CURRENCY */}

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Currency
                          </div>

                          <div className="mt-1 text-[10px] font-bold text-gray-600">
                            {
                              transaction.currency ||
                              "USD"
                            }
                          </div>

                        </div>

                      </div>

                      {/* DESCRIPTION */}

                      {transaction.description && (
                        <div className="mt-3 rounded-xl border border-gray-100 bg-white p-3">

                          <div className="text-[8px] font-bold uppercase tracking-wide text-gray-400">
                            Description
                          </div>

                          <div className="mt-1 text-[10px] leading-5 text-gray-600">
                            {
                              transaction.description
                            }
                          </div>

                        </div>
                      )}

                      {/* ACTIONS */}

                      <div className="mt-3 flex gap-2">

                        <button
                          disabled={
                            transaction.status ===
                              "Failed" ||
                            actionLoading ===
                              transaction._id
                          }
                          onClick={() =>
                            toggleApproval(
                              transaction
                            )
                          }
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
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            ${
                              transaction.status ===
                              "Successful"
                                ? "bg-red-50 text-red-600"
                                : "bg-green-50 text-green-600"
                            }
                          `}
                        >

                          {actionLoading ===
                          transaction._id ? (
                            <>
                              <RefreshCw
                                size={
                                  14
                                }
                                className="animate-spin"
                              />

                              Processing...
                            </>
                          ) : transaction.status ===
                            "Successful" ? (
                            <>
                              <XCircle
                                size={
                                  14
                                }
                              />

                              Unapprove
                            </>
                          ) : (
                            <>
                              <CheckCircle2
                                size={
                                  14
                                }
                              />

                              Approve
                            </>
                          )}

                        </button>

                        <button
                          onClick={() =>
                            deleteTransaction(
                              transaction._id
                            )
                          }
                          disabled={
                            actionLoading ===
                            transaction._id
                          }
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                          {actionLoading ===
                          transaction._id ? (
                            <RefreshCw
                              size={
                                16
                              }
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2
                              size={
                                16
                              }
                            />
                          )}

                        </button>

                      </div>

                    </div>
                  )
                )
              )}

            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

              <div className="text-[10px] text-gray-400">

                Showing{" "}

                <span className="font-bold text-gray-600">

                  {filteredTransactions.length ===
                  0
                    ? 0
                    : startIndex + 1}

                </span>

                {" "}to{" "}

                <span className="font-bold text-gray-600">

                  {Math.min(
                    startIndex +
                      usersPerPage,
                    filteredTransactions.length
                  )}

                </span>

                {" "}of{" "}

                <span className="font-bold text-gray-600">

                  {
                    filteredTransactions.length
                  }

                </span>

                {" "}transactions

              </div>

              <div className="flex items-center justify-end gap-2">

                <button
                  disabled={
                    safeCurrentPage <=
                    1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          1,
                          page - 1
                        )
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40"
                >

                  <ChevronLeft
                    size={15}
                  />

                </button>

                <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#e30613] px-2 text-[10px] font-bold text-white">

                  {
                    safeCurrentPage
                  }

                </div>

                <button
                  disabled={
                    safeCurrentPage >=
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          totalPages,
                          page + 1
                        )
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40"
                >

                  <ChevronRight
                    size={15}
                  />

                </button>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}
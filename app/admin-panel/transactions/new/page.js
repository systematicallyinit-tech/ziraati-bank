"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  Send,
  Download,
  Upload,
  ArrowRightLeft,
  UserRound,
  Building2,
  Hash,
  DollarSign,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Landmark,
  Home,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";

export default function AdminCustomerTransaction() {
    const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState("New Transaction");

    const [loading, setLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const [isError, setIsError] = useState(false);

  const [transactionType, setTransactionType] =
    useState("Transfer");

  const [submitted, setSubmitted] =
    useState(false);

  /*
   * ----------------------------------------------------
   * SIDEBAR MENU
   * ----------------------------------------------------
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
   * ----------------------------------------------------
   * MOBILE NAVIGATION
   * ----------------------------------------------------
   */

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

  /*
   * ----------------------------------------------------
   * TRANSACTION TYPES
   * ----------------------------------------------------
   */

  const transactionTypes = [
    {
      id: "Transfer",
      title: "Transfer",
      description:
        "Send money to a customer's account",
      icon: Send,
      activeClass:
        "border-blue-500 bg-blue-50 text-blue-600",
    },

    {
      id: "deposit",
      title: "Deposit",
      description:
        "Add money to a customer's account",
      icon: Upload,
      activeClass:
        "border-green-500 bg-green-50 text-green-600",
    },

    {
      id: "withdrawal",
      title: "Withdrawal",
      description:
        "Withdraw money from a customer's account",
      icon: Download,
      activeClass:
        "border-orange-500 bg-orange-50 text-orange-600",
    },
  ];

  /*
   * ----------------------------------------------------
   * VALIDATION
   * ----------------------------------------------------
   */

  const validationSchema =
    Yup.object({
      customer: Yup.string()
        .required(
          "Please select a customer"
        ),

      accountNumber: Yup.string()
        .required(
          "Account number is required"
        )
        .matches(
          /^[0-9A-Za-z-]{6,30}$/,
          "Enter a valid account number"
        ),

      amount: Yup.number()
        .typeError(
          "Amount must be a number"
        )
        .required(
          "Amount is required"
        )
        .positive(
          "Amount must be greater than zero"
        )
        .max(
          100000000,
          "Amount is too large"
        ),

      description: Yup.string()
        .max(
          500,
          "Description cannot exceed 500 characters"
        ),

      reference: Yup.string()
        .max(
          100,
          "Reference cannot exceed 100 characters"
        ),

      bankName:
        transactionType ===
        "Transfer"
          ? Yup.string().required(
              "Bank name is required"
            )
          : Yup.string(),

      routingNumber:
        transactionType ===
        "Transfer"
          ? Yup.string().required(
              "Routing number is required"
            )
          : Yup.string(),
    });

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
   * ----------------------------------------------------
   * SUBMIT
   * ----------------------------------------------------
   */

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      
        try {
                const res = await axios.post(
                  `/api/auth/users/transactions/new/trans?userId=${user._id}`,
                  {
                    type: transactionType,
                    description: values.description,
                    beneficiary: values.customer,
                    bank: values.bankName,
                    account: values.accountNumber,
                    amount: values.amount,
                  },
                  {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                  },
                );
        
                if (res.status === 201) {
                  setIsError(false);
                  setLoading(false);
                } else {
                  setErrorMessage(err.message);
                  setLoading(false);
                  setIsError(true);
                }
              } catch (err) {
                setErrorMessage(err.message);
                setLoading(false);
                setIsError(true);
              }

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 800)
      );

      setSubmitted(true);

      resetForm();

      setTimeout(() => {
        setSubmitted(false);
      }, 10000);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * ----------------------------------------------------
   * INITIAL VALUES
   * ----------------------------------------------------
   */

  const initialValues = {
    customer: "",
    accountNumber: "",
    bankName: "Ziraat Bank",
    routingNumber: "",
    amount: "",
    reference: "",
    description: "",
  };

  /*
   * ----------------------------------------------------
   * HELPER
   * ----------------------------------------------------
   */

  const getTransactionTitle = () => {
    if (transactionType === "Deposit") {
      return "Deposit Money";
    }

    if (
      transactionType === "Withdrawal"
    ) {
      return "Withdraw Money";
    }

    return "Transfer Money";
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-gray-900">
      {/* =================================================
          MOBILE SIDEBAR OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

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

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="min-h-screen lg:pl-[270px]">
        {/* =================================================
            HEADER
        ================================================= */}

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
                Ziraat Transactions
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

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="px-4 pb-28 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pb-10">
          {/* PAGE TITLE */}

          <div className="mb-6">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-400">
              <ArrowLeftRight size={14} />

              <span>Transactions</span>

              <span>/</span>

              <span>New Transaction</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {getTransactionTitle()}
            </h2>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
              Initiate a banking transaction on behalf of a customer. Select the
              transaction type below and provide the required information.
            </p>
          </div>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {submitted && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <div>
                <div className="text-sm font-bold text-green-800">
                  Transaction submitted
                </div>

                <div className="mt-1 text-xs text-green-700">
                  The transaction request has been submitted successfully.
                </div>
              </div>
            </div>
          )}

          {/* =================================================
              TRANSACTION TYPE SELECTOR
          ================================================= */}

          <section className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Transaction Type
                </h3>

                <p className="mt-1 text-[10px] text-gray-400">
                  Select the operation you want to perform.
                </p>
              </div>

              <ShieldCheck size={20} className="text-gray-300" />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {transactionTypes.map((type) => {
                const Icon = type.icon;

                const active = transactionType === type.title;

                return (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setTransactionType(type.title)}
                    className={`
                        relative
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        p-4
                        text-left
                        transition

                        ${
                          active
                            ? type.activeClass
                            : "border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50"
                        }
                      `}
                  >
                    <div
                      className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl

                          ${active ? "bg-white/80" : "bg-gray-50"}
                        `}
                    >
                      <Icon size={20} />
                    </div>

                    <div>
                      <div className="text-sm font-bold">{type.title}</div>

                      <div
                        className={`
                            mt-1
                            text-[10px]
                            leading-4

                            ${active ? "opacity-80" : "text-gray-400"}
                          `}
                      >
                        {type.description}
                      </div>
                    </div>

                    {active && (
                      <div className="absolute right-3 top-3">
                        <CheckCircle2 size={17} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* =================================================
              FORM + SUMMARY
          ================================================= */}

          <Formik
            key={transactionType}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                  {/* =========================================
                      FORM
                  ========================================= */}

                  <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
                    {/* Form Header */}

                    <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                          {transactionType === "Transfer" && (
                            <ArrowRightLeft size={19} />
                          )}

                          {transactionType === "Deposit" && (
                            <Upload size={19} />
                          )}

                          {transactionType === "Withdrawal" && (
                            <Download size={19} />
                          )}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-gray-900">
                            Customer & Transaction Details
                          </h3>

                          <p className="mt-1 text-[10px] text-gray-400">
                            Enter the transaction information below.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 p-5 sm:p-6">
                      {/* CUSTOMER */}

                      <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
                          Customer
                        </label>

                        <div className="relative">
                          <UserRound
                            size={17}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <Field
                            name="customer"
                            placeholder="Beneficiary name"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                          />
                        </div>

                        <ErrorMessage
                          name="customer"
                          component="div"
                          className="mt-1.5 text-[10px] font-medium text-red-500"
                        />
                      </div>

                      {/* ACCOUNT */}

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
                            Beneficiary Account Number
                          </label>

                          <div className="relative">
                            <Hash
                              size={17}
                              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <Field
                              name="accountNumber"
                              placeholder="Enter account number"
                              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            />
                          </div>

                          <ErrorMessage
                            name="accountNumber"
                            component="div"
                            className="mt-1.5 text-[10px] font-medium text-red-500"
                          />
                        </div>

                        {/* AMOUNT */}

                        <div>
                          <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
                            Amount
                          </label>

                          <div className="relative">
                            <DollarSign
                              size={17}
                              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <Field
                              name="amount"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-semibold text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            />
                          </div>

                          <ErrorMessage
                            name="amount"
                            component="div"
                            className="mt-1.5 text-[10px] font-medium text-red-500"
                          />
                        </div>
                      </div>

                      {/* TRANSFER-ONLY FIELDS */}

                      {transactionType === "Transfer" && (
                        <div className="grid gap-5 md:grid-cols-2">
                          {/* BANK NAME */}

                          <div>
                            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
                              Beneficiary Bank Name
                            </label>

                            <div className="relative">
                              <Building2
                                size={17}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              />

                              <Field
                                name="bankName"
                                placeholder="Enter bank name"
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                              />
                            </div>

                            <ErrorMessage
                              name="bankName"
                              component="div"
                              className="mt-1.5 text-[10px] font-medium text-red-500"
                            />
                          </div>

                          {/* ROUTING */}

                          <div>
                            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
                              Routing Number
                            </label>

                            <div className="relative">
                              <Hash
                                size={17}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              />

                              <Field
                                name="routingNumber"
                                placeholder="Enter routing number"
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                              />
                            </div>

                            <ErrorMessage
                              name="routingNumber"
                              component="div"
                              className="mt-1.5 text-[10px] font-medium text-red-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* REFERENCE */}

                      <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
                          Transaction Reference
                        </label>

                        <div className="relative">
                          <FileText
                            size={17}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <Field
                            name="reference"
                            placeholder="Optional transaction reference"
                            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                          />
                        </div>

                        <ErrorMessage
                          name="reference"
                          component="div"
                          className="mt-1.5 text-[10px] font-medium text-red-500"
                        />
                      </div>

                      {/* DESCRIPTION */}

                      <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
                          Description
                        </label>

                        <Field
                          as="textarea"
                          name="description"
                          rows="4"
                          placeholder="Enter a description for this transaction..."
                          className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        />

                        <ErrorMessage
                          name="description"
                          component="div"
                          className="mt-1.5 text-[10px] font-medium text-red-500"
                        />
                      </div>

                      {/* SECURITY NOTICE */}

                      <div className="flex gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
                        <AlertCircle
                          size={18}
                          className="mt-0.5 shrink-0 text-orange-500"
                        />

                        <div>
                          <div className="text-[11px] font-bold text-orange-800">
                            Admin transaction
                          </div>

                          <p className="mt-1 text-[10px] leading-4 text-orange-700">
                            This action will create a transaction on the
                            selected customer's account. Make sure all
                            information is correct before submitting.
                          </p>
                        </div>
                      </div>

                      {/* SUBMIT */}

                      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          className="h-12 rounded-xl border border-gray-200 bg-white px-6 text-xs font-bold text-gray-600 transition hover:bg-gray-50"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#e30613] px-7 text-xs font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Processing...
                            </>
                          ) : (
                            <>
                              {transactionType === "Transfer" && (
                                <Send size={16} />
                              )}

                              {transactionType === "Deposit" && (
                                <Download size={16} />
                              )}

                              {transactionType === "Withdrawal" && (
                                <Upload size={16} />
                              )}

                              {getTransactionTitle()}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* =========================================
                      TRANSACTION SUMMARY
                  ========================================= */}

                  <div className="space-y-5">
                    {/* Summary */}

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                          <ArrowLeftRight size={19} />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-gray-900">
                            Transaction Summary
                          </h3>

                          <p className="mt-1 text-[10px] text-gray-400">
                            Review the selected operation
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-500">
                            Type
                          </span>

                          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold capitalize text-red-600">
                            {transactionType}
                          </span>
                        </div>

                        <div className="h-px bg-gray-100" />

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-500">
                            Currency
                          </span>

                          <span className="text-xs font-bold text-gray-900">
                            USD
                          </span>
                        </div>

                        <div className="h-px bg-gray-100" />

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-500">
                            Processing
                          </span>

                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Immediate
                          </span>
                        </div>

                        <div className="h-px bg-gray-100" />

                        <div>
                          <div className="mb-2 text-[10px] text-gray-400">
                            Transaction Amount
                          </div>

                          <div className="text-2xl font-extrabold tracking-tight text-gray-900">
                            $0.00
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Admin Permission */}

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                          <ShieldCheck size={18} />
                        </div>

                        <div>
                          <div className="text-xs font-bold text-gray-900">
                            Admin Authorization
                          </div>

                          <p className="mt-1 text-[10px] leading-4 text-gray-500">
                            You are signed in as an authorized administrator.
                            All transaction activities should be recorded and
                            auditable.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account Information */}

                    <div className="rounded-2xl bg-gray-900 p-5 text-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
                      <div className="flex items-center gap-2">
                        <Landmark size={18} />

                        <span className="text-xs font-bold">
                          Admin Transaction Desk
                        </span>
                      </div>

                      <p className="mt-3 text-[10px] leading-5 text-gray-400">
                        Use this interface to manage authorized deposits,
                        withdrawals and transfers for customers.
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-[9px] font-semibold text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Secure transaction channel
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </main>
      </div>
    </div>
  );
}
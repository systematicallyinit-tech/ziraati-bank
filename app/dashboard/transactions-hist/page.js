"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  FileText,
  Filter,
  Home,
  LayoutGrid,
  LogOut,
  Menu,
  PiggyBank,
  Search,
  Settings,
  Wallet,
  X,
  User,
  Building2,
  CircleDollarSign,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useAuth } from '@/app/context/AuthContext';
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { MobileNavigation } from "../components/MobileNavigation";
import axios from "axios";
import LoadingScreen from "@/app/loading";

/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/

function StatusBadge({ status }) {
  const styles = {
    Successful: "bg-green-50 text-green-700 border-green-200",

    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",

    Failed: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full border
        px-2.5 py-1
        text-[9px] font-bold
        ${styles[status]}
      `}
    >
      <span
        className={`
          mr-1.5 h-1.5 w-1.5
          rounded-full

          ${
            status === "Successful"
              ? "bg-green-500"
              : status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
          }
        `}
      />

      {status}
    </span>
  );
}

/*
|--------------------------------------------------------------------------
| Transaction Type Icon
|--------------------------------------------------------------------------
*/

function TransactionIcon({ direction, type }) {
  return (
    <div
      className={`
        flex h-9 w-9 shrink-0
        items-center justify-center
        rounded-full

        ${
          direction === "in"
            ? "bg-green-50 text-green-600"
            : type === "Payment"
              ? "bg-orange-50 text-orange-600"
              : "bg-red-50 text-red-600"
        }
      `}
    >
      {direction === "in" ? (
        <ArrowDownLeft size={17} />
      ) : (
        <ArrowUpRight size={17} />
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Transaction Details Modal
|--------------------------------------------------------------------------
*/

function TransactionModal({ transaction, close }) {
  if (!transaction) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50 p-4
      "
    >
      <div
        className="
          w-full max-w-[500px]
          overflow-hidden
          rounded-[20px]
          bg-white shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            flex items-center
            justify-between
            border-b border-gray-100
            px-5 py-4
          "
        >
          <div>
            <p
              className="
                text-[10px] font-semibold
                text-gray-400
              "
            >
              Transaction details
            </p>

            <h3
              className="
                mt-1 text-[16px]
                font-extrabold text-gray-900
              "
            >
              {transaction.description}
            </h3>
          </div>

          <button
            onClick={close}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full bg-gray-100
              text-gray-600
              hover:bg-gray-200
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Details */}

        <div className="p-5">
          <div
            className="
              mb-5 flex items-center
              justify-between rounded-xl
              bg-gray-50 p-4
            "
          >
            <div className="flex items-center gap-3">
              <TransactionIcon
                direction={transaction.direction}
                type={transaction.type}
              />

              <div>
                <p
                  className="
                    text-[10px]
                    text-gray-400
                  "
                >
                  Amount
                </p>

                <p
                  className="
                    mt-1 text-[18px]
                    font-extrabold
                  "
                >
                  {"$"}
                  {transaction.amount.toLocaleString()}
                </p>
              </div>
            </div>

            <StatusBadge status={transaction.status} />
          </div>

          <div className="space-y-4">
            <DetailRow label="Transaction ID" value={transaction.id} />

            <DetailRow
              label="Date"
              value={`${transaction.date} • ${transaction.time}`}
            />

            <DetailRow
              label="Sender Details"
              value={`${transaction.senderFullname} | ${transaction.senderAccountNumber}`}
            />

            <DetailRow label="Recipient Name" value={transaction.beneficiary} />

            <DetailRow label="Recipient Bank" value={transaction.bank} />

            <DetailRow label="Recipient Account No." value={transaction.account} />

            <DetailRow label="Currency" value={transaction.currency} />
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            border-t border-gray-100
            bg-gray-50 px-5 py-4
          "
        >
          <button
            onClick={close}
            className="
              h-11 w-full rounded-full
              bg-[#e30613]
              text-[11px] font-extrabold
              text-white
              hover:bg-[#c90510]
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div
      className="
        flex items-start
        justify-between gap-4
        border-b border-gray-100
        pb-3 last:border-0
      "
    >
      <span
        className="
          text-[10px]
          font-semibold text-gray-400
        "
      >
        {label}
      </span>

      <span
        className="
          text-right text-[11px]
          font-bold text-gray-700
        "
      >
        {value}
      </span>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Mobile Transaction Card
|--------------------------------------------------------------------------
*/

function MobileTransactionCard({ transaction, onView }) {
  return (
    <div
      className="
        rounded-2xl
        border border-gray-200
        bg-white p-4
      "
    >
      {/* Top */}

      <div
        className="
          flex items-start
          justify-between gap-3
        "
      >
        <div className="flex min-w-0 gap-3">
          <TransactionIcon
            direction={transaction.direction}
            type={transaction.type}
          />

          <div className="min-w-0">
            <p
              className="
                truncate text-[12px]
                font-extrabold text-gray-800
              "
            >
              {transaction.description}
            </p>

            <p
              className="
                mt-1 truncate
                text-[10px] text-gray-400
              "
            >
              {transaction.beneficiary}
            </p>
          </div>
        </div>

        <StatusBadge status={transaction.status} />
      </div>

      {/* Middle */}

      <div
        className="
          mt-4 grid grid-cols-2
          gap-3 border-t
          border-gray-100 pt-3
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-semibold uppercase
              text-gray-400
            "
          >
            Date
          </p>

          <p
            className="
              mt-1 text-[10px]
              font-bold text-gray-700
            "
          >
            {transaction.date}
          </p>
        </div>

        <div>
          <p
            className="
              text-[9px]
              font-semibold uppercase
              text-gray-400
            "
          >
            Bank
          </p>

          <p
            className="
              mt-1 truncate
              text-[10px]
              font-bold text-gray-700
            "
          >
            {transaction.bank}
          </p>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          mt-3 flex items-center
          justify-between
          border-t border-gray-100
          pt-3
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-semibold text-gray-400
            "
          >
            Amount
          </p>

          <p
            className={`
              mt-1 text-[14px]
              font-extrabold

              ${
                transaction.direction === "in"
                  ? "text-green-600"
                  : "text-gray-900"
              }
            `}
          >
            {transaction.type === "Deposit"
              ? `+$${transaction.amount.toLocaleString()}.00`
              : `$${transaction.amount.toLocaleString()}.00`
            }
          </p>
        </div>

        <button
          onClick={() => onView(transaction)}
          className="
            flex h-9
            items-center gap-1.5
            rounded-full
            border border-gray-200
            px-3
            text-[10px]
            font-bold text-gray-600
            hover:bg-gray-50
          "
        >
          <Eye size={14} />
          Details
        </button>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Transaction History
|--------------------------------------------------------------------------
*/

function TransactionHistory() {
  // Fetched transactions
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
      const [isError, setIsError] = useState(false);
      const [transactions, setTransactions] = useState([]);

      useEffect(() => {
            if (!user?._id) return;
      
            const fetchData = async () => {
              try {
                setLoading(true);
      
                const res = await axios.get(
                  `/api/auth/users/transactions/tran?queryUserId=${user._id}`,
                );
      
                setTransactions(res.data.transactions || []);
                setIsError(false);
                setLoading(false);
              } catch (err) {
                console.error(err);
                setErrorMessage("Failed to load transactions");
                setIsError(true);
                setLoading(false);
              } 
            };
      
            fetchData();
          }, [user]);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  /*
  |--------------------------------------------------------------------------
  | Filtering
  |--------------------------------------------------------------------------
  */

  const filteredTransactions = transactions.filter((transaction) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      transaction.description.toLowerCase().includes(search) ||
      transaction.beneficiary.toLowerCase().includes(search) ||
      transaction.bank.toLowerCase().includes(search) ||
      transaction.id.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || transaction.status === statusFilter;

    const matchesType = typeFilter === "All" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const displayedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /*
  |--------------------------------------------------------------------------
  | Summary
  |--------------------------------------------------------------------------
  */

  const successful = transactions.filter(
    (item) => item.status === "Successful",
  ).length;

  const pending = transactions.filter(
    (item) => item.status === "Pending",
  ).length;

  const failed = transactions.filter((item) => item.status === "Failed").length;

  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* Page heading */}
      {loading === true && <LoadingScreen />}

      <div
        className="
          mb-6 flex flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              mb-2 flex items-center gap-2
              text-[10px] font-semibold
              text-gray-400
            "
          >
            <span>Payments</span>

            <ChevronRight size={13} />

            <span className="text-gray-600">Transaction History</span>
          </div>

          <h1
            className="
              text-[22px] font-extrabold
              text-gray-900
              sm:text-[26px]
            "
          >
            Transaction History
          </h1>

          <p
            className="
              mt-1 text-[11px]
              leading-relaxed
              text-gray-500
              sm:text-[12px]
            "
          >
            View and manage your recent bank transactions.
          </p>
        </div>

        <button
          type="button"
          className="
            flex h-10 w-fit
            items-center gap-2
            rounded-full
            bg-[#e30613]
            px-4
            text-[10px]
            font-extrabold
            text-white
            hover:bg-[#c90510]
          "
        >
          <Download size={15} />
          Export Transactions
        </button>
      </div>

      {/* Summary Cards */}

      <div
        className="
          mb-6 grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        "
      >
        {/* Successful */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-green-50
                text-green-600
              "
            >
              <ArrowDownLeft size={19} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  text-gray-400
                "
              >
                Successful
              </p>

              <p
                className="
                  mt-1 text-[18px]
                  font-extrabold
                "
              >
                {successful}
              </p>
            </div>
          </div>
        </div>

        {/* Pending */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-yellow-50
                text-yellow-600
              "
            >
              <RefreshCw size={19} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  text-gray-400
                "
              >
                Pending
              </p>

              <p
                className="
                  mt-1 text-[18px]
                  font-extrabold
                "
              >
                {pending}
              </p>
            </div>
          </div>
        </div>

        {/* Failed */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <AlertCircle size={19} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  text-gray-400
                "
              >
                Failed
              </p>

              <p
                className="
                  mt-1 text-[18px]
                  font-extrabold
                "
              >
                {failed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Transaction Card */}

      <div
        className="
          overflow-hidden
          rounded-[20px]
          border border-gray-200
          bg-white
          shadow-sm
        "
      >
        {/* Card Header */}

        <div
          className="
            border-b border-gray-100
            px-5 py-5
            sm:px-6
          "
        >
          <div
            className="
              flex flex-col gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
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
                Recent Transactions
              </h2>

              <p
                className="
                  mt-1 text-[10px]
                  text-gray-400
                "
              >
                Showing {filteredTransactions.length} transactions
              </p>
            </div>

            <div
              className="
                flex items-center gap-2
              "
            >
              <button
                type="button"
                onClick={resetFilters}
                className="
                  flex h-9
                  items-center gap-1.5
                  rounded-full
                  border border-gray-200
                  px-3
                  text-[9px]
                  font-bold
                  text-gray-600
                  hover:bg-gray-50
                "
              >
                <RefreshCw size={13} />
                Reset
              </button>
            </div>
          </div>

          {/* Filters */}

          <div
            className="
              mt-5 grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {/* Search */}

            <div
              className="
                relative
                sm:col-span-2
                lg:col-span-2
              "
            >
              <Search
                size={16}
                className="
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="
                  Search transaction, beneficiary or bank
                "
                className="
                  h-10 w-full
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  pl-9 pr-3
                  text-[10px]
                  outline-none
                  placeholder:text-gray-400
                  focus:border-[#e30613]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-red-100
                "
              />
            </div>

            {/* Status */}

            <div className="relative">
              <Filter
                size={14}
                className="
                  pointer-events-none
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="
                  h-10 w-full
                  appearance-none
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  pl-9 pr-8
                  text-[10px]
                  font-semibold
                  outline-none
                  focus:border-[#e30613]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-red-100
                "
              >
                <option value="All">All Statuses</option>

                <option value="Successful">Successful</option>

                <option value="Pending">Pending</option>

                <option value="Failed">Failed</option>
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />
            </div>

            {/* Type */}

            <div className="relative">
              <FileText
                size={14}
                className="
                  pointer-events-none
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="
                  h-10 w-full
                  appearance-none
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  pl-9 pr-8
                  text-[10px]
                  font-semibold
                  outline-none
                  focus:border-[#e30613]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-red-100
                "
              >
                <option value="All">All Types</option>

                <option value="Transfer">Transfer</option>

                <option value="Deposit">Deposit</option>

                <option value="Payment">Payment</option>
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            DESKTOP / TABLET TABLE
        ================================================== */}

        <div
          className="
            hidden overflow-x-auto
            md:block
          "
        >
          <table className="w-full min-w-[900px]">
            <thead>
              <tr
                className="
                  border-b border-gray-100
                  bg-gray-50/70
                "
              >
                <th
                  className="
                    px-5 py-3
                    text-left
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Transaction
                </th>

                <th
                  className="
                    px-4 py-3
                    text-left
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Beneficiary
                </th>

                <th
                  className="
                    px-4 py-3
                    text-left
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Bank
                </th>

                <th
                  className="
                    px-4 py-3
                    text-left
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Date
                </th>

                <th
                  className="
                    px-4 py-3
                    text-right
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Amount
                </th>

                <th
                  className="
                    px-4 py-3
                    text-center
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-5 py-3
                    text-right
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {displayedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="
                      border-b
                      border-gray-100
                      transition
                      hover:bg-gray-50/70
                    "
                >
                  {/* Transaction */}

                  <td className="px-5 py-4">
                    <div
                      className="
                          flex items-center
                          gap-3
                        "
                    >
                      <TransactionIcon
                        direction={transaction.direction}
                        type={transaction.type}
                      />

                      <div>
                        <p
                          className="
                              max-w-[190px]
                              truncate
                              text-[11px]
                              font-extrabold
                              text-gray-800
                            "
                        >
                          {transaction.description}
                        </p>

                        <p
                          className="
                              mt-1 text-[9px]
                              text-gray-400
                            "
                        >
                          {transaction.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Beneficiary */}

                  <td className="px-4 py-4">
                    <p
                      className="
                          text-[10px]
                          font-bold
                          text-gray-700
                        "
                    >
                      {transaction.beneficiary}
                    </p>

                    <p
                      className="
                          mt-1 text-[9px]
                          text-gray-400
                        "
                    >
                      {transaction.account}
                    </p>
                  </td>

                  {/* Bank */}

                  <td className="px-4 py-4">
                    <div
                      className="
                          flex items-center
                          gap-2
                        "
                    >
                      <Building2 size={14} className="text-gray-400" />

                      <span
                        className="
                            text-[10px]
                            font-semibold
                            text-gray-700
                          "
                      >
                        {transaction.bank}
                      </span>
                    </div>
                  </td>

                  {/* Date */}

                  <td className="px-4 py-4">
                    <p
                      className="
                          text-[10px]
                          font-bold
                          text-gray-700
                        "
                    >
                      {transaction.date}
                    </p>

                    <p
                      className="
                          mt-1 text-[9px]
                          text-gray-400
                        "
                    >
                      {transaction.time}
                    </p>
                  </td>

                  {/* Amount */}

                  <td className="px-4 py-4 text-right">
                    <p
                      className={`
                          text-[11px]
                          font-extrabold

                          ${
                            transaction.direction === "in"
                              ? "text-green-600"
                              : "text-gray-900"
                          }
                        `}
                    >
                      {transaction.amount}
                    </p>

                    <p
                      className="
                          mt-1 text-[8px]
                          text-gray-400
                        "
                    >
                      {transaction.currency}
                    </p>
                  </td>

                  {/* Status */}

                  <td className="px-4 py-4 text-center">
                    <StatusBadge status={transaction.status} />
                  </td>

                  {/* Action */}

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedTransaction(transaction)}
                      className="
                          inline-flex
                          h-8 w-8
                          items-center
                          justify-center
                          rounded-full
                          border border-gray-200
                          text-gray-500
                          hover:bg-gray-50
                          hover:text-[#e30613]
                        "
                      title="View transaction"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}

          {displayedTransactions.length === 0 && (
            <div
              className="
                flex min-h-[220px]
                flex-col items-center
                justify-center
                px-5 text-center
              "
            >
              <div
                className="
                  mb-3 flex h-12 w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-400
                "
              >
                <FileText size={21} />
              </div>

              <p
                className="
                  text-[12px]
                  font-extrabold
                  text-gray-700
                "
              >
                No transactions found
              </p>

              <p
                className="
                  mt-1 text-[10px]
                  text-gray-400
                "
              >
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* ==================================================
            MOBILE CARDS
        ================================================== */}

        <div
          className="
            space-y-3 p-4
            md:hidden
          "
        >
          {displayedTransactions.map((transaction) => (
            <MobileTransactionCard
              key={transaction.id}
              transaction={transaction}
              onView={setSelectedTransaction}
            />
          ))}

          {displayedTransactions.length === 0 && (
            <div
              className="
                flex min-h-[200px]
                flex-col items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  mb-3 flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-400
                "
              >
                <FileText size={21} />
              </div>

              <p
                className="
                  text-[12px]
                  font-extrabold
                  text-gray-700
                "
              >
                No transactions found
              </p>

              <p
                className="
                  mt-1 text-[10px]
                  text-gray-400
                "
              >
                Try changing your filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}

        <div
          className="
            flex flex-col gap-3
            border-t border-gray-100
            px-4 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          <p
            className="
              text-center text-[9px]
              text-gray-400
              sm:text-left
            "
          >
            Showing {filteredTransactions.length === 0 ? 0 : startIndex + 1}
            {" - "}
            {Math.min(
              startIndex + itemsPerPage,
              filteredTransactions.length,
            )}{" "}
            of {filteredTransactions.length}
          </p>

          <div
            className="
              flex items-center
              justify-center gap-1
            "
          >
            <button
              type="button"
              disabled={safeCurrentPage <= 1}
              onClick={() => setCurrentPage(safeCurrentPage - 1)}
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                border border-gray-200
                text-gray-500
                disabled:cursor-not-allowed
                disabled:opacity-40
                hover:bg-gray-50
              "
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from(
              {
                length: Math.max(totalPages, 1),
              },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`
                  flex h-8 w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-[10px]
                  font-bold

                  ${
                    page === safeCurrentPage
                      ? "bg-[#e30613] text-white"
                      : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={safeCurrentPage >= Math.max(totalPages, 1)}
              onClick={() => setCurrentPage(safeCurrentPage + 1)}
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                border border-gray-200
                text-gray-500
                disabled:cursor-not-allowed
                disabled:opacity-40
                hover:bg-gray-50
              "
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details */}

      <TransactionModal
        transaction={selectedTransaction}
        close={() => setSelectedTransaction(null)}
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default function TransactionHistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main
      className="
        min-h-screen
        bg-[#f5f6f7]
        text-gray-900
      "
    >
      {/* Header */}

      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className="
          mx-auto flex w-full
          max-w-[1500px]
        "
      >
        {/* Original Menu Slider */}

        <Sidebar tab={'transactions'} open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main */}

        <div
          className="
            min-w-0 flex-1
            pb-[85px]
            lg:pb-8
          "
        >
          <div
            className="
              mx-auto w-full
              max-w-[1250px]
              px-4 py-5
              sm:px-6 sm:py-7
              lg:px-8 lg:py-8
            "
          >
            <TransactionHistory />
          </div>
        </div>
      </div>

      {/* Original Mobile Bottom Navigation */}

      <MobileNavigation tab={'transactions'} />
    </main>
  );
}

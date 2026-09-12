"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Bell,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  LayoutGrid,
  LogOut,
  Menu,
  PiggyBank,
  Search,
  Settings,
  User,
  Wallet,
  X,
  ArrowLeft,
  Building2,
  MapPin,
  Hash,
  CircleDollarSign,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  User2,
  Landmark,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { DashboardHeader } from "../components/DashboardHeader";
import { MobileNavigation } from "../components/MobileNavigation";
import { Sidebar } from "../components/Sidebar";
import LoadingScreen from "@/app/loading";
import axios from "axios";
import { IoInformationCircleOutline } from "react-icons/io5";

/*
|--------------------------------------------------------------------------
| Reusable Form Input
|--------------------------------------------------------------------------
*/

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  formik,
  required = true,
}) {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-[12px]
          font-bold
          text-gray-700
        "
      >
        {label}

        {required && <span className="ml-1 text-[#e30613]">*</span>}
      </label>

      <div className="relative">
        <span
          className={`
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            ${hasError ? "text-red-500" : "text-gray-400"}
          `}
        >
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`
            h-[50px]
            w-full
            rounded-xl
            border
            bg-white
            pl-11
            pr-4
            text-[13px]
            text-gray-800
            outline-none
            transition

            placeholder:text-gray-400

            ${
              hasError
                ? "border-red-500 ring-2 ring-red-100"
                : "border-gray-200 focus:border-[#e30613] focus:ring-2 focus:ring-red-100"
            }
          `}
        />
      </div>

      {hasError && (
        <p
          className="
            mt-1.5
            flex
            items-center
            gap-1
            text-[10px]
            font-semibold
            text-red-500
          "
        >
          <AlertCircle size={12} />

          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Transfer Form
|--------------------------------------------------------------------------
*/

function LocalTransferForm() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      beneficiaryBankName: "",
      beneficiaryAccountNumber: "",
      beneficiaryBankAddress: "",
      amount: "",
      routingNumber: "",
      description: "",
      beneficiaryName: "",
    },

    validationSchema: Yup.object({
      beneficiaryBankName: Yup.string()
        .trim()
        .min(2, "Bank name must be at least 2 characters")
        .required("Beneficiary bank name is required"),

      beneficiaryName: Yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .required("Beneficiary name is required"),

      beneficiaryAccountNumber: Yup.string()
        .trim()
        .matches(/^[0-9]+$/, "Account number must contain only numbers")
        .min(6, "Account number is too short")
        .required("Beneficiary account number is required"),

      beneficiaryBankAddress: Yup.string()
        .trim()
        .min(5, "Please enter a valid bank address")
        .required("Beneficiary bank address is required"),

      amount: Yup.number()
        .typeError("Amount must be a valid number")
        .positive("Amount must be greater than zero")
        .required("Amount is required"),

      routingNumber: Yup.string()
        .trim()
        .matches(/^[0-9]+$/, "Routing number must contain only numbers")
        .min(6, "Routing number is too short")
        .required("Routing number is required"),

      description: Yup.string()
        .trim()
        .max(250, "Description cannot exceed 250 characters")
        .required("Description is required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      //setLoading(true);

      try {
        const res = await axios.post(
          `/api/auth/users/transactions/new/transfer?userId=${user._id}`,
          {
            type: "Transfer",
            description: values.description,
            beneficiary: values.beneficiaryName,
            bank: values.beneficiaryBankName,
            account: values.beneficiaryAccountNumber,
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

      setSubmitted(true);

      setSubmitting(false);

      resetForm();

      setTimeout(() => {
        setSubmitted(false);
      }, 20000);
    },
  });

  return (
    <div className="w-full">
      {loading === true && <LoadingScreen />}
      {/* Page heading */}

      <div
        className="
          mb-5
          flex
          flex-col
          gap-3

          sm:flex-row
          sm:items-center
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
              text-[11px]
              font-semibold
              text-gray-400
            "
          >
            <span>Transfers</span>

            <ChevronRight size={13} />

            <span className="text-gray-600">Local Transfer</span>
          </div>

          <h1
            className="
              text-[22px]
              font-extrabold
              text-gray-900

              sm:text-[26px]
            "
          >
            Local Money Transfer
          </h1>

          <p
            className="
              mt-1
              max-w-[650px]
              text-[11px]
              leading-relaxed
              text-gray-500

              sm:text-[12px]
            "
          >
            Transfer money to a beneficiary account using the information below.
          </p>
        </div>

        {/* Back button */}

        <a
          href="/dashboard"
          onClick={() => window.history.back()}
          className="
            flex
            h-10
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-gray-200
            bg-white
            px-4
            text-[11px]
            font-bold
            text-gray-600
            hover:bg-gray-50
          "
        >
          <ArrowLeft size={15} />
          Back
        </a>
      </div>

      {/* Success notification */}

      {submitted && (
        <div
          className="
            mb-5
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-green-200
            bg-green-50
            p-4
            text-green-700
          "
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />

          <div>
            <p
              className="
                text-[12px]
                font-extrabold
              "
            >
              Transfer request submitted
            </p>

            <p
              className="
                mt-1
                text-[10px]
              "
            >
              Your transfer information has been submitted successfully.
            </p>
          </div>
        </div>
      )}

      {/* Main form card */}

      <div
        className="
          overflow-hidden
          rounded-[20px]
          border
          border-gray-200
          bg-white
          shadow-sm
        "
      >
        {/* Red top bar */}

        <div
          className="
            bg-[#e30613]
            px-5
            py-5
            text-white

            sm:px-7
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/15
              "
            >
              <Wallet size={21} />
            </div>

            <div>
              <h2
                className="
                  text-[15px]
                  font-extrabold
                "
              >
                Beneficiary Transfer Details
              </h2>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-white/80
                "
              >
                Enter the recipient's banking information carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}

        <form
          onSubmit={formik.handleSubmit}
          className="
            p-5

            sm:p-7
          "
        >
          {/* Beneficiary information */}

          <div className="mb-6">
            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <Building2 size={17} className="text-[#e30613]" />

              <h3
                className="
                  text-[14px]
                  font-extrabold
                  text-gray-800
                "
              >
                Beneficiary Information
              </h3>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-5

                md:grid-cols-2
              "
            >
              {/* Bank Name */}

              <FormField
                label="Beneficiary Bank Name"
                name="beneficiaryBankName"
                placeholder="Enter beneficiary bank name"
                icon={<Landmark size={17} />}
                formik={formik}
              />

              {/* Account Number */}

              <FormField
                label="Beneficiary Account Number"
                name="beneficiaryAccountNumber"
                type="text"
                placeholder="Enter account number"
                icon={<Hash size={17} />}
                formik={formik}
              />

              {/* Name */}

              <FormField
                label="Beneficiary Name"
                name="beneficiaryName"
                placeholder="Enter beneficiary name"
                icon={<User2 size={17} />}
                formik={formik}
              />

              {/* Bank Address */}

              <div className="md:col-span-2">
                <FormField
                  label="Beneficiary Bank Address"
                  name="beneficiaryBankAddress"
                  placeholder="Enter beneficiary bank address"
                  icon={<MapPin size={17} />}
                  formik={formik}
                />
              </div>
            </div>
          </div>

          {/* Transfer information */}

          <div className="mb-6">
            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <CircleDollarSign size={17} className="text-[#e30613]" />

              <h3
                className="
                  text-[14px]
                  font-extrabold
                  text-gray-800
                "
              >
                Transfer Information
              </h3>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-5

                md:grid-cols-2
              "
            >
              {/* Amount */}

              <FormField
                label="Amount"
                name="amount"
                type="number"
                placeholder="0.00"
                icon={<CircleDollarSign size={17} />}
                formik={formik}
              />

              {/* Routing Number */}

              <FormField
                label="Routing Number"
                name="routingNumber"
                placeholder="Enter routing number"
                icon={<Hash size={17} />}
                formik={formik}
              />

              {/* Description */}

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="
                    mb-2
                    block
                    text-[12px]
                    font-bold
                    text-gray-700
                  "
                >
                  Description
                  <span className="ml-1 text-[#e30613]">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  maxLength={250}
                  placeholder="Enter transfer description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`
                    w-full
                    resize-none
                    rounded-xl
                    border
                    bg-white
                    px-4
                    py-3
                    text-[13px]
                    text-gray-800
                    outline-none
                    transition
                    placeholder:text-gray-400

                    ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500 ring-2 ring-red-100"
                        : "border-gray-200 focus:border-[#e30613] focus:ring-2 focus:ring-red-100"
                    }
                  `}
                />

                <div
                  className="
                    mt-1
                    flex
                    justify-between
                  "
                >
                  <div>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p
                          className="
                            flex
                            items-center
                            gap-1
                            text-[10px]
                            font-semibold
                            text-red-500
                          "
                        >
                          <AlertCircle size={12} />

                          {formik.errors.description}
                        </p>
                      )}
                  </div>

                  <span
                    className="
                      text-[9px]
                      text-gray-400
                    "
                  >
                    {formik.values.description.length}
                    /250
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notice */}

          {/* Success notification */}

          {submitted ? (
            <div
              className="
            mb-5
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-green-200
            bg-green-50
            p-4
            text-green-700
          "
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />

              <div>
                <p
                  className="
                text-[12px]
                font-extrabold
              "
                >
                  Transfer request submitted
                </p>

                <p
                  className="
                mt-1
                text-[10px]
              "
                >
                  Your transfer information has been submitted successfully.
                </p>
              </div>
            </div>
          ) : (
            <div
              className="
              mb-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-4
            "
            >
              <AlertCircle
                size={18}
                className="
                mt-0.5
                shrink-0
                text-gray-500
              "
              />

              <p
                className="
                text-[10px]
                leading-relaxed
                text-gray-500
              "
              >
                Please verify the beneficiary bank name, account number and
                routing number before submitting the transfer. Incorrect
                information may result in processing delays or failed transfers.
              </p>
            </div>
          )}

          {/* Buttons */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3

              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="
                h-[48px]
                rounded-full
                border
                border-gray-200
                bg-white
                px-7
                text-[12px]
                font-extrabold
                text-gray-600
                hover:bg-gray-50

                sm:min-w-[130px]
              "
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="
                flex
                h-[48px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#e30613]
                px-7
                text-[12px]
                font-extrabold
                text-white
                transition
                hover:bg-[#c90510]
                disabled:cursor-not-allowed
                disabled:opacity-60

                sm:min-w-[180px]
              "
            >
              {formik.isSubmitting ? "Processing..." : "Continue Transfer"}

              {!formik.isSubmitting && <ChevronRight size={16} />}
            </button>
          </div>
        </form>
      </div>

      {isError === true && (
        <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 justify-center bg-black/50 items-center loading-modal">
          <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
            <div className="flex justify-center items-center rounded-full p-2 dark:bg-isoDark bg-[#f4f4f5]">
              <IoInformationCircleOutline className="w-16 text-black dark:text-isoColor2 h-16" />
            </div>

            <h1 className="px-6 text-lg font-medium text-center md:font-semibold">
              Notice!
            </h1>

            <p className="text-xs text-center">{errorMessage}</p>

            <button
              type="button"
              onClick={() => setIsError(false)}
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
| Page
|--------------------------------------------------------------------------
*/

export default function TransferPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        {/* ORIGINAL MENU SLIDER */}

        <Sidebar tab={'local'} tab2={"transfer"} open={sidebarOpen} setOpen={setSidebarOpen} />

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
              max-w-[1100px]
              px-4
              py-5

              sm:px-6
              sm:py-7

              lg:px-8
              lg:py-8
            "
          >
            <LocalTransferForm />
          </div>
        </div>
      </div>

      {/* ORIGINAL MOBILE BOTTOM NAVIGATION */}

      <MobileNavigation tab={'transfer'} />
    </main>
  );
}

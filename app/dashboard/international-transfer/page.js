"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  FileText,
  Globe2,
  Hash,
  Home,
  Landmark,
  LayoutGrid,
  LogOut,
  MapPin,
  Menu,
  PiggyBank,
  Search,
  Settings,
  User,
  User2,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { MobileNavigation } from "../components/MobileNavigation";
import axios from "axios";

/*
|--------------------------------------------------------------------------
| Form Field
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
  const hasError =
    formik.touched[name] &&
    formik.errors[name];

  return (
    <div className="w-full">

      <label
        htmlFor={name}
        className="
          mb-2 block text-[12px]
          font-bold text-gray-700
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-[#e30613]">
            *
          </span>
        )}
      </label>

      <div className="relative">

        <span
          className={`
            pointer-events-none
            absolute left-4 top-1/2
            -translate-y-1/2

            ${
              hasError
                ? "text-red-500"
                : "text-gray-400"
            }
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
            h-[50px] w-full rounded-xl
            border bg-white pl-11 pr-4
            text-[13px] text-gray-800
            outline-none transition
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
            mt-1.5 flex items-center gap-1
            text-[10px] font-semibold text-red-500
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
| Select Field
|--------------------------------------------------------------------------
*/

function SelectField({
  label,
  name,
  formik,
  children,
}) {
  const hasError =
    formik.touched[name] &&
    formik.errors[name];

  return (
    <div className="w-full">

      <label
        htmlFor={name}
        className="
          mb-2 block text-[12px]
          font-bold text-gray-700
        "
      >
        {label}

        <span className="ml-1 text-[#e30613]">
          *
        </span>
      </label>

      <div className="relative">

        <Landmark
          size={17}
          className={`
            pointer-events-none
            absolute left-4 top-1/2
            z-10 -translate-y-1/2

            ${
              hasError
                ? "text-red-500"
                : "text-gray-400"
            }
          `}
        />

        <select
          id={name}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`
            h-[50px] w-full
            appearance-none rounded-xl
            border bg-white pl-11 pr-10
            text-[13px] text-gray-800
            outline-none transition

            ${
              hasError
                ? "border-red-500 ring-2 ring-red-100"
                : "border-gray-200 focus:border-[#e30613] focus:ring-2 focus:ring-red-100"
            }
          `}
        >
          <option value="">
            Select beneficiary bank country
          </option>

          {children}

        </select>

      </div>

      {hasError && (
        <p
          className="
            mt-1.5 flex items-center gap-1
            text-[10px] font-semibold text-red-500
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
| International Transfer Form
|--------------------------------------------------------------------------
*/

function InternationalTransferForm() {
  const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
  const [submitted, setSubmitted] =
    useState(false);

  const formik = useFormik({

    initialValues: {
      beneficiaryBankCountry: "",
      beneficiaryBankName: "",
      beneficiaryName: "",
      beneficiaryAccountNumber: "",
      beneficiaryBankAddress: "",
      amount: "",
      swiftCode: "",
      routingNumber: "",
      description: "",
    },

    validationSchema: Yup.object({

      beneficiaryBankCountry:
        Yup.string()
          .required(
            "Beneficiary bank country is required"
          ),

      beneficiaryBankName:
        Yup.string()
          .trim()
          .min(
            2,
            "Bank name must be at least 2 characters"
          )
          .required(
            "Beneficiary bank name is required"
          ),

          beneficiaryName:
        Yup.string()
          .trim()
          .min(
            2,
            "Name must be at least 2 characters"
          )
          .required(
            "Beneficiary name is required"
          ),

      beneficiaryAccountNumber:
        Yup.string()
          .trim()
          .min(
            6,
            "Account number / IBAN is too short"
          )
          .required(
            "Beneficiary account number / IBAN is required"
          ),

      beneficiaryBankAddress:
        Yup.string()
          .trim()
          .min(
            5,
            "Please enter a valid bank address"
          )
          .required(
            "Beneficiary bank address is required"
          ),

      amount:
        Yup.number()
          .typeError(
            "Amount must be a valid number"
          )
          .positive(
            "Amount must be greater than zero"
          )
          .required(
            "Amount is required"
          ),

      swiftCode:
        Yup.string()
          .trim()
          .matches(
            /^[A-Za-z0-9]+$/,
            "SWIFT code contains invalid characters"
          )
          .min(
            8,
            "SWIFT code must be at least 8 characters"
          )
          .max(
            11,
            "SWIFT code cannot exceed 11 characters"
          )
          .required(
            "SWIFT code is required"
          ),

      routingNumber:
        Yup.string()
          .trim()
          .matches(
            /^[0-9]+$/,
            "Routing number must contain only numbers"
          )
          .min(
            6,
            "Routing number is too short"
          )
          .required(
            "Routing number is required"
          ),

      description:
        Yup.string()
          .trim()
          .max(
            250,
            "Description cannot exceed 250 characters"
          )
          .required(
            "Description is required"
          ),
    }),

    onSubmit: async (
      values,
      {
        setSubmitting,
        resetForm,
      }
    ) => {

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
      {/* Breadcrumb */}

      <div
        className="
          mb-5 flex flex-col gap-3
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              mb-2 flex items-center gap-2
              text-[11px] font-semibold
              text-gray-400
            "
          >
            <span>Transfers</span>

            <ChevronRight size={13} />

            <span className="text-gray-600">International Transfer</span>
          </div>

          <h1
            className="
              text-[22px] font-extrabold
              text-gray-900 sm:text-[26px]
            "
          >
            International Money Transfer
          </h1>

          <p
            className="
              mt-1 max-w-[700px]
              text-[11px] leading-relaxed
              text-gray-500 sm:text-[12px]
            "
          >
            Send money internationally to a beneficiary bank account. Enter the
            beneficiary banking information carefully before continuing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            flex h-10 w-fit items-center gap-2
            rounded-full border border-gray-200
            bg-white px-4 text-[11px]
            font-bold text-gray-600
            hover:bg-gray-50
          "
        >
          <ArrowLeft size={15} />
          Back
        </button>
      </div>

      {/* Success */}

      {submitted && (
        <div
          className="
            mb-5 flex items-start gap-3
            rounded-xl border border-green-200
            bg-green-50 p-4 text-green-700
          "
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />

          <div>
            <p
              className="
                text-[12px] font-extrabold
              "
            >
              International transfer request submitted
            </p>

            <p
              className="
                mt-1 text-[10px]
              "
            >
              Your transfer information has been submitted successfully.
            </p>
          </div>
        </div>
      )}

      {/* Form Card */}

      <div
        className="
          overflow-hidden rounded-[20px]
          border border-gray-200
          bg-white shadow-sm
        "
      >
        {/* Card header */}

        <div
          className="
            bg-[#e30613] px-5 py-5
            text-white sm:px-7
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-full bg-white/15
              "
            >
              <Globe2 size={21} />
            </div>

            <div>
              <h2
                className="
                  text-[15px] font-extrabold
                "
              >
                International Transfer Details
              </h2>

              <p
                className="
                  mt-1 text-[10px]
                  text-white/80
                "
              >
                Provide the beneficiary's international banking details.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}

        <form onSubmit={formik.handleSubmit} className="p-5 sm:p-7">
          {/* Beneficiary section */}

          <div className="mb-7">
            <div
              className="
                mb-4 flex items-center gap-2
              "
            >
              <Globe2 size={17} className="text-[#e30613]" />

              <h3
                className="
                  text-[14px] font-extrabold
                  text-gray-800
                "
              >
                Beneficiary Bank Information
              </h3>
            </div>

            <div
              className="
                grid grid-cols-1 gap-5
                md:grid-cols-2
              "
            >
              {/* Country */}

              <SelectField
                label="Beneficiary Bank Country"
                name="beneficiaryBankCountry"
                formik={formik}
              >
                <option value="Ghana">Poland</option>

                <option value="United Kingdom">United Kingdom</option>

                <option value="United States">United States</option>

                <option value="Turkey">Turkey</option>

                <option value="Germany">Germany</option>

                <option value="France">France</option>

                <option value="Canada">Canada</option>

                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>

                <option value="South Africa">South Africa</option>

                <option value="Nigeria">Nigeria</option>
              </SelectField>

              {/* Bank Name */}

              <FormField
                label="Beneficiary Bank Name"
                name="beneficiaryBankName"
                placeholder="Enter beneficiary bank name"
                icon={<Building2 size={17} />}
                formik={formik}
              />

              {/* Account / IBAN */}

              <FormField
                label="Beneficiary Account Number / IBAN"
                name="beneficiaryAccountNumber"
                placeholder="Enter account number or IBAN"
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

              {/* SWIFT */}

              <FormField
                label="SWIFT / BIC Code"
                name="swiftCode"
                placeholder="Enter SWIFT / BIC code"
                icon={<Globe2 size={17} />}
                formik={formik}
              />

              {/* Bank address */}

              <div className="md:col-span-2">
                <FormField
                  label="Beneficiary Bank Address"
                  name="beneficiaryBankAddress"
                  placeholder="Enter full beneficiary bank address"
                  icon={<MapPin size={17} />}
                  formik={formik}
                />
              </div>
            </div>
          </div>

          {/* Transfer information */}

          <div className="mb-7">
            <div
              className="
                mb-4 flex items-center gap-2
              "
            >
              <CircleDollarSign size={17} className="text-[#e30613]" />

              <h3
                className="
                  text-[14px] font-extrabold
                  text-gray-800
                "
              >
                Transfer Information
              </h3>
            </div>

            <div
              className="
                grid grid-cols-1 gap-5
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

              {/* Routing */}

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
                    mb-2 block text-[12px]
                    font-bold text-gray-700
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
                    w-full resize-none
                    rounded-xl border
                    bg-white px-4 py-3
                    text-[13px] text-gray-800
                    outline-none transition
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
                    mt-1 flex justify-between
                  "
                >
                  <div>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p
                          className="
                            flex items-center gap-1
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
                      text-[9px] text-gray-400
                    "
                  >
                    {formik.values.description.length}
                    /250
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important notice */}
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
              mb-6 flex items-start gap-3
              rounded-xl border
              border-gray-200
              bg-gray-50 p-4
            "
            >
              <AlertCircle
                size={18}
                className="
                mt-0.5 shrink-0
                text-gray-500
              "
              />

              <div>
                <p
                  className="
                  text-[11px] font-bold
                  text-gray-700
                "
                >
                  Verify international transfer information
                </p>

                <p
                  className="
                  mt-1 text-[10px]
                  leading-relaxed
                  text-gray-500
                "
                >
                  Make sure the beneficiary's country, bank name, account number
                  or IBAN, SWIFT/BIC code, routing number and bank address are
                  correct before continuing.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}

          <div
            className="
              flex flex-col-reverse gap-3
              sm:flex-row sm:justify-end
            "
          >
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="
                h-[48px] rounded-full
                border border-gray-200
                bg-white px-7
                text-[12px] font-extrabold
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
                flex h-[48px]
                items-center justify-center
                gap-2 rounded-full
                bg-[#e30613] px-7
                text-[12px] font-extrabold
                text-white transition
                hover:bg-[#c90510]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:min-w-[190px]
              "
            >
              {formik.isSubmitting ? "Processing..." : "Continue Transfer"}

              {!formik.isSubmitting && <ChevronRight size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default function InternationalTransferPage() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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
          mx-auto flex w-full max-w-[1500px]
        "
      >
        {/* Original sidebar */}

        <Sidebar
          tab={"international"}
          tab2={"transfer"}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* Main content */}

        <div
          className="
            min-w-0 flex-1
            pb-[85px] lg:pb-8
          "
        >
          <div
            className="
              mx-auto w-full
              max-w-[1100px]
              px-4 py-5
              sm:px-6 sm:py-7
              lg:px-8 lg:py-8
            "
          >
            <InternationalTransferForm />
          </div>
        </div>
      </div>

      {/* Original mobile navigation */}

      <MobileNavigation tab={'tab'} />
    </main>
  );
}
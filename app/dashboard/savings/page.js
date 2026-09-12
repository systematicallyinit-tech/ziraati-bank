"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  Home,
  Info,
  LayoutGrid,
  Menu,
  PiggyBank,
  Plus,
  Repeat2,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  User,
  Wallet,
  X,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";

/*
|--------------------------------------------------------------------------
| DASHBOARD HEADER
|--------------------------------------------------------------------------
*/

function DashboardHeader({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <header
      className="
        sticky top-0 z-40
        h-[64px]
        border-b border-gray-200
        bg-white
      "
    >
      <div
        className="
          mx-auto flex h-full
          max-w-[1500px]
          items-center
          justify-between
          px-4 sm:px-6 lg:px-8
        "
      >

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-gray-700
              hover:bg-gray-100
              lg:hidden
            "
          >
            {sidebarOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          <div className="flex items-center gap-2">

            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-[#e30613]
                text-white
              "
            >
              <Wallet size={19} />
            </div>

            <span
              className="
                text-[18px]
                font-extrabold
                tracking-tight
                text-gray-900
              "
            >
              DemoBank
            </span>

          </div>

        </div>

        {/* SEARCH */}

        <div
          className="
            hidden w-[300px]
            items-center
            rounded-full
            border border-gray-200
            bg-gray-50
            px-4
            lg:flex
          "
        >
          <span className="text-gray-400">
            Search
          </span>
        </div>

        {/* RIGHT */}

        <div
          className="
            flex items-center
            gap-2 sm:gap-4
          "
        >

          <button
            type="button"
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-gray-600
              hover:bg-gray-100
            "
          >

            <Bell size={20} />

            <span
              className="
                absolute right-2 top-2
                h-2 w-2
                rounded-full
                bg-[#e30613]
              "
            />

          </button>

          <button
            type="button"
            className="
              hidden
              items-center gap-2
              rounded-full
              px-2 py-1
              hover:bg-gray-100
              sm:flex
            "
          >

            <span
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-gray-200
              "
            >
              <User size={18} />
            </span>

            <span
              className="
                text-sm
                font-semibold
              "
            >
              Gerald Luis
            </span>

            <ChevronDown size={16} />

          </button>

        </div>

      </div>
    </header>
  );
}

/*
|--------------------------------------------------------------------------
| SIDEBAR
|--------------------------------------------------------------------------
*/

function Sidebar({
  open,
  setOpen,
}) {
  const router = useRouter();

  const navigation = [
    {
      title: "Dashboard",
      icon: <Home size={19} />,
      href: "/dashboard",
    },
    {
      title: "Accounts",
      icon: <Wallet size={19} />,
      href: "#",
    },
    {
      title: "Cards",
      icon: <CreditCard size={19} />,
      href: "/dashboard/cards",
    },
    {
      title: "Transfers",
      icon: <ArrowUpRight size={19} />,
      href: "#",
    },
    {
      title: "Payments",
      icon: <ArrowDownLeft size={19} />,
      href: "#",
    },
    {
      title: "Smart Savings",
      icon: <PiggyBank size={19} />,
      href: "/dashboard/savings",
      active: true,
    },
  ];

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="
            fixed inset-0
            z-40
            bg-black/40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed left-0 top-0
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

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="flex h-full flex-col">

          <div
            className="
              flex h-[64px]
              items-center
              justify-between
              border-b
              border-gray-100
              px-5
              lg:hidden
            "
          >

            <span className="font-extrabold">
              DemoBank
            </span>

            <button
              onClick={() =>
                setOpen(false)
              }
              className="text-gray-500"
            >
              <X size={21} />
            </button>

          </div>

          <nav className="flex-1 p-4">

            <p
              className="
                mb-3 px-3
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

              {navigation.map(
                (item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {

                      if (
                        item.href !== "#"
                      ) {
                        router.push(
                          item.href
                        );
                      }

                      setOpen(false);
                    }}
                    className={`
                      flex w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3 py-3
                      text-left
                      text-sm
                      font-semibold
                      transition

                      ${
                        item.active
                          ? "bg-[#e30613] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >

                    {item.icon}

                    <span>
                      {item.title}
                    </span>

                  </button>
                )
              )}

            </div>

          </nav>

          <div
            className="
              border-t
              border-gray-100
              p-4
            "
          >

            <button
              type="button"
              className="
                flex w-full
                items-center gap-3
                rounded-xl
                px-3 py-3
                text-sm
                font-semibold
                text-gray-600
                hover:bg-gray-100
              "
            >
              <Settings size={19} />
              Settings
            </button>

            <button
              type="button"
              className="
                flex w-full
                items-center gap-3
                rounded-xl
                px-3 py-3
                text-sm
                font-semibold
                text-gray-600
                hover:bg-gray-100
              "
            >
              <LogOut size={19} />
              Sign out
            </button>

          </div>

        </div>

      </aside>
    </>
  );
}

/*
|--------------------------------------------------------------------------
| BALANCE CARD
|--------------------------------------------------------------------------
*/

function SavingsBalanceCard({
  mainBalance,
  savingsBalance,
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[24px]
        bg-gradient-to-br
        from-[#e30613]
        via-[#c9000d]
        to-[#870008]
        p-5
        text-white
        shadow-sm
        sm:p-7
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              text-white/70
            "
          >

            <PiggyBank size={15} />

            SMART SAVINGS

          </div>

          <p
            className="
              mt-4
              text-[10px]
              text-white/70
            "
          >
            Savings balance
          </p>

          <h2
            className="
              mt-1
              text-[28px]
              font-extrabold
              tracking-tight
              sm:text-[34px]
            "
          >
            €{savingsBalance.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
              }
            )}
          </h2>

        </div>

        <div
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-full
            bg-white/15
          "
        >
          <Sparkles size={20} />
        </div>

      </div>

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-3
        "
      >

        <div
          className="
            rounded-xl
            bg-black/10
            p-3
          "
        >

          <p
            className="
              text-[8px]
              text-white/60
            "
          >
            Main account
          </p>

          <p
            className="
              mt-1
              text-[12px]
              font-bold
            "
          >
            €{mainBalance.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>

        </div>

        <div
          className="
            rounded-xl
            bg-black/10
            p-3
          "
        >

          <p
            className="
              text-[8px]
              text-white/60
            "
          >
            Interest earned
          </p>

          <p
            className="
              mt-1
              text-[12px]
              font-bold
            "
          >
            €124.28
          </p>

        </div>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SAVING TYPE
|--------------------------------------------------------------------------
*/

function SavingTypeSelector({
  value,
  setFieldValue,
}) {
  const options = [
    {
      value: "one-time",
      title: "One-time",
      description:
        "Move money into savings once.",
      icon: <ArrowDownLeft size={18} />,
    },
    {
      value: "recurring",
      title: "Automatic",
      description:
        "Automatically save on a schedule.",
      icon: <Repeat2 size={18} />,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-3
        sm:grid-cols-2
      "
    >

      {options.map((option) => {

        const selected =
          value === option.value;

        return (
          <button
            type="button"
            key={option.value}
            onClick={() =>
              setFieldValue(
                "savingType",
                option.value
              )
            }
            className={`
              rounded-2xl
              border
              p-4
              text-left
              transition

              ${
                selected
                  ? "border-[#e30613] bg-red-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }
            `}
          >

            <div className="flex items-start gap-3">

              <span
                className={`
                  flex
                  h-10 w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl

                  ${
                    selected
                      ? "bg-[#e30613] text-white"
                      : "bg-gray-100 text-gray-500"
                  }
                `}
              >
                {option.icon}
              </span>

              <div>

                <p
                  className="
                    text-[11px]
                    font-extrabold
                    text-gray-800
                  "
                >
                  {option.title}
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    leading-relaxed
                    text-gray-400
                  "
                >
                  {option.description}
                </p>

              </div>

              {selected && (
                <span
                  className="
                    ml-auto
                    flex
                    h-5 w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-[#e30613]
                    text-white
                  "
                >
                  <Check size={12} />
                </span>
              )}

            </div>

          </button>
        );
      })}

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| FORM INPUT
|--------------------------------------------------------------------------
*/

function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  icon,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="
          mb-1.5
          block
          text-[9px]
          font-bold
          text-gray-500
        "
      >
        {label}
      </label>

      <div className="relative">

        <span
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        >
          {icon}
        </span>

        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="
            h-[45px]
            w-full
            rounded-xl
            border
            border-gray-200
            bg-white
            pl-10
            pr-3
            text-[11px]
            font-medium
            text-gray-800
            outline-none
            transition

            placeholder:text-gray-300

            focus:border-[#e30613]
            focus:ring-2
            focus:ring-red-100
          "
        />

      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="
          mt-1
          text-[8px]
          font-semibold
          text-red-500
        "
      />

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SELECT
|--------------------------------------------------------------------------
*/

function FormSelect({
  name,
  label,
  children,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="
          mb-1.5
          block
          text-[9px]
          font-bold
          text-gray-500
        "
      >
        {label}
      </label>

      <div className="relative">

        <Field
          as="select"
          id={name}
          name={name}
          className="
            h-[45px]
            w-full
            appearance-none
            rounded-xl
            border
            border-gray-200
            bg-white
            px-3
            pr-10
            text-[11px]
            font-medium
            text-gray-800
            outline-none

            focus:border-[#e30613]
            focus:ring-2
            focus:ring-red-100
          "
        >

          {children}

        </Field>

        <ChevronDown
          size={16}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="
          mt-1
          text-[8px]
          font-semibold
          text-red-500
        "
      />

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SAVINGS FORM
|--------------------------------------------------------------------------
*/

function SmartSavingForm({
  onSave,
  mainBalance,
}) {

  const validationSchema =
    Yup.object({
      savingType: Yup.string()
        .required(
          "Please select a saving type."
        ),

      amount: Yup.number()
        .typeError(
          "Enter a valid amount."
        )
        .positive(
          "Amount must be greater than zero."
        )
        .max(
          mainBalance,
          "Amount cannot exceed your main account balance."
        )
        .required(
          "Saving amount is required."
        ),

      goal: Yup.string()
        .required(
          "Please select a savings goal."
        ),

      frequency: Yup.string()
        .when("savingType", {
          is: "recurring",
          then: (schema) =>
            schema.required(
              "Select a saving frequency."
            ),
          otherwise: (schema) =>
            schema.notRequired(),
        }),

      startDate: Yup.date()
        .required(
          "Start date is required."
        ),
    });

  const initialValues = {
    savingType: "recurring",
    amount: "",
    goal: "",
    frequency: "monthly",
    startDate:
      new Date()
        .toISOString()
        .split("T")[0],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(
        values,
        {
          setSubmitting,
          resetForm,
        }
      ) => {

        onSave(values);

        setSubmitting(false);

        resetForm({
          values: {
            ...initialValues,
            savingType:
              values.savingType,
          },
        });
      }}
    >

      {({
        values,
        setFieldValue,
        isSubmitting,
      }) => (

        <Form>

          {/* SAVING TYPE */}

          <div>

            <div
              className="
                mb-3
                flex
                items-center
                justify-between
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
                  Create a Smart Saving
                </h2>

                <p
                  className="
                    mt-1
                    text-[9px]
                    text-gray-400
                  "
                >
                  Choose how you want to
                  build your savings.
                </p>

              </div>

              <Sparkles
                size={18}
                className="text-[#e30613]"
              />

            </div>

            <SavingTypeSelector
              value={values.savingType}
              setFieldValue={
                setFieldValue
              }
            />

          </div>

          {/* FORM FIELDS */}

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >

            <FormInput
              name="amount"
              label="Amount to Save"
              placeholder="Enter amount"
              type="number"
              icon={
                <Wallet size={15} />
              }
            />

            <FormSelect
              name="goal"
              label="Savings Goal"
            >

              <option value="">
                Select a goal
              </option>

              <option value="emergency">
                Emergency Fund
              </option>

              <option value="vacation">
                Vacation
              </option>

              <option value="home">
                Home Purchase
              </option>

              <option value="education">
                Education
              </option>

              <option value="car">
                Car
              </option>

              <option value="general">
                General Savings
              </option>

            </FormSelect>

            {values.savingType ===
              "recurring" && (
              <FormSelect
                name="frequency"
                label="Saving Frequency"
              >

                <option value="daily">
                  Every Day
                </option>

                <option value="weekly">
                  Every Week
                </option>

                <option value="biweekly">
                  Every 2 Weeks
                </option>

                <option value="monthly">
                  Every Month
                </option>

              </FormSelect>
            )}

            <FormInput
              name="startDate"
              label="Start Date"
              type="date"
              icon={
                <CalendarDays size={15} />
              }
            />

          </div>

          {/* INFORMATION */}

          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-xl
              bg-blue-50
              p-3
            "
          >

            <Info
              size={16}
              className="
                mt-0.5
                shrink-0
                text-blue-600
              "
            />

            <p
              className="
                text-[8px]
                leading-relaxed
                text-blue-700
              "
            >
              {values.savingType ===
              "recurring"
                ? "Your selected amount will automatically be deducted from your main account according to your chosen schedule and added to Smart Savings."
                : "The selected amount will be moved from your main account to Smart Savings immediately after confirmation."}
            </p>

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              mt-5
              flex
              h-[47px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#e30613]
              text-[10px]
              font-extrabold
              text-white
              shadow-sm
              transition
              hover:bg-[#c90510]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            <PiggyBank size={16} />

            {isSubmitting
              ? "Processing..."
              : "Start Smart Saving"}

          </button>

        </Form>

      )}

    </Formik>
  );
}

/*
|--------------------------------------------------------------------------
| QUICK ACTIONS
|--------------------------------------------------------------------------
*/

function QuickActions({
  onAdd,
  onWithdraw,
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-3
      "
    >

      <button
        type="button"
        onClick={onAdd}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          py-3
          text-[9px]
          font-bold
          text-gray-700
          transition
          hover:border-[#e30613]
          hover:text-[#e30613]
        "
      >

        <Plus size={15} />

        Add Money

      </button>

      <button
        type="button"
        onClick={onWithdraw}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          py-3
          text-[9px]
          font-bold
          text-gray-700
          transition
          hover:border-[#e30613]
          hover:text-[#e30613]
        "
      >

        <ArrowUpRight size={15} />

        Withdraw

      </button>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SAVINGS GOALS
|--------------------------------------------------------------------------
*/

function SavingsGoals() {

  const goals = [
    {
      title: "Emergency Fund",
      current: 4200,
      target: 10000,
      icon: <ShieldCheck size={17} />,
    },
    {
      title: "Holiday",
      current: 2350,
      target: 5000,
      icon: <Target size={17} />,
    },
    {
      title: "New Car",
      current: 7800,
      target: 20000,
      icon: <Wallet size={17} />,
    },
  ];

  return (
    <section
      className="
        rounded-[22px]
        border
        border-gray-200
        bg-white
        p-5
        sm:p-7
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
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
            Savings Goals
          </h2>

          <p
            className="
              mt-1
              text-[9px]
              text-gray-400
            "
          >
            Track your progress toward
            your financial goals.
          </p>

        </div>

        <Target
          size={18}
          className="text-[#e30613]"
        />

      </div>

      <div
        className="
          mt-5
          space-y-5
        "
      >

        {goals.map((goal) => {

          const percentage =
            Math.min(
              100,
              (goal.current /
                goal.target) *
                100
            );

          return (
            <div key={goal.title}>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      flex
                      h-8 w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      text-[#e30613]
                    "
                  >
                    {goal.icon}
                  </span>

                  <div>

                    <p
                      className="
                        text-[9px]
                        font-extrabold
                        text-gray-700
                      "
                    >
                      {goal.title}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[8px]
                        text-gray-400
                      "
                    >
                      €{goal.current.toLocaleString()}
                      {" "}
                      / €{goal.target.toLocaleString()}
                    </p>

                  </div>

                </div>

                <span
                  className="
                    text-[9px]
                    font-bold
                    text-gray-600
                  "
                >
                  {Math.round(
                    percentage
                  )}
                  %
                </span>

              </div>

              <div
                className="
                  mt-2
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-gray-100
                "
              >

                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#e30613]
                    transition-all
                  "
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| RECENT ACTIVITY
|--------------------------------------------------------------------------
*/

function RecentSavingActivity({
  transactions,
}) {
  return (
    <section
      className="
        rounded-[22px]
        border
        border-gray-200
        bg-white
        p-5
        sm:p-7
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
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
            Saving Activity
          </h2>

          <p
            className="
              mt-1
              text-[9px]
              text-gray-400
            "
          >
            Recent movements in your
            Smart Savings account.
          </p>

        </div>

        <Clock3
          size={17}
          className="text-gray-400"
        />

      </div>

      <div className="mt-5">

        {transactions.length === 0 ? (
          <div
            className="
              rounded-xl
              bg-gray-50
              p-5
              text-center
              text-[9px]
              text-gray-400
            "
          >
            No saving transactions yet.
          </div>
        ) : (
          <div className="space-y-3">

            {transactions.map(
              (transaction) => (

                <div
                  key={transaction.id}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-100
                    p-3
                  "
                >

                  <span
                    className={`
                      flex
                      h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full

                      ${
                        transaction.type ===
                        "deposit"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }
                    `}
                  >

                    {transaction.type ===
                    "deposit" ? (
                      <ArrowDownLeft
                        size={16}
                      />
                    ) : (
                      <ArrowUpRight
                        size={16}
                      />
                    )}

                  </span>

                  <div className="min-w-0 flex-1">

                    <p
                      className="
                        truncate
                        text-[9px]
                        font-extrabold
                        text-gray-700
                      "
                    >
                      {transaction.title}
                    </p>

                    <p
                      className="
                        mt-1
                        text-[8px]
                        text-gray-400
                      "
                    >
                      {transaction.date}
                    </p>

                  </div>

                  <span
                    className={`
                      text-[9px]
                      font-extrabold

                      ${
                        transaction.type ===
                        "deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    `}
                  >

                    {transaction.type ===
                    "deposit"
                      ? "+"
                      : "-"}
                    €{transaction.amount.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}

                  </span>

                </div>

              )
            )}

          </div>
        )}

      </div>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| ADD / WITHDRAW MODAL
|--------------------------------------------------------------------------
*/

function MoneyActionModal({
  mode,
  onClose,
  onConfirm,
}) {

  const validationSchema =
    Yup.object({
      amount: Yup.number()
        .typeError(
          "Enter a valid amount."
        )
        .positive(
          "Amount must be greater than zero."
        )
        .required(
          "Amount is required."
        ),
    });

  return (
    <div
      className="
        fixed inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-[430px]
          rounded-[24px]
          bg-white
          p-5
          shadow-2xl
          sm:p-7
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
          "
        >

          <div>

            <div
              className="
                flex
                h-10 w-10
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-[#e30613]
              "
            >

              {mode === "add" ? (
                <Plus size={19} />
              ) : (
                <ArrowUpRight size={19} />
              )}

            </div>

            <h2
              className="
                mt-4
                text-[16px]
                font-extrabold
                text-gray-800
              "
            >
              {mode === "add"
                ? "Add Money"
                : "Withdraw Money"}
            </h2>

            <p
              className="
                mt-1
                text-[9px]
                text-gray-400
              "
            >
              {mode === "add"
                ? "Move money from your main account into Smart Savings."
                : "Move money from Smart Savings back to your main account."}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400"
          >
            <X size={20} />
          </button>

        </div>

        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={
            validationSchema
          }
          onSubmit={(
            values,
            {
              setSubmitting,
            }
          ) => {

            onConfirm(
              Number(values.amount)
            );

            setSubmitting(false);
          }}
        >

          {({
            isSubmitting,
          }) => (

            <Form className="mt-6">

              <FormInput
                name="amount"
                label="Amount"
                placeholder="Enter amount"
                type="number"
                icon={
                  <Wallet size={15} />
                }
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  mt-5
                  h-[45px]
                  w-full
                  rounded-full
                  bg-[#e30613]
                  text-[10px]
                  font-extrabold
                  text-white
                  disabled:opacity-60
                "
              >

                {isSubmitting
                  ? "Processing..."
                  : mode === "add"
                  ? "Add to Savings"
                  : "Withdraw to Main Account"}

              </button>

            </Form>

          )}

        </Formik>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| MOBILE BOTTOM NAVIGATION
|--------------------------------------------------------------------------
*/

function MobileNavigation() {

  const router = useRouter();

  const items = [
    {
      label: "Home",
      icon: <Home size={18} />,
      href: "/dashboard",
    },
    {
      label: "Accounts",
      icon: <Wallet size={18} />,
      href: "#",
    },
    {
      label: "Cards",
      icon: <CreditCard size={18} />,
      href: "/dashboard/cards",
    },
    {
      label: "Savings",
      icon: <PiggyBank size={18} />,
      href: "/dashboard/savings",
      active: true,
    },
    {
      label: "More",
      icon: <LayoutGrid size={18} />,
      href: "#",
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-gray-200
        bg-white
        lg:hidden
      "
    >

      <div
        className="
          mx-auto
          grid
          max-w-[600px]
          grid-cols-5
          px-2
          pb-[env(safe-area-inset-bottom)]
        "
      >

        {items.map((item) => (

          <button
            key={item.label}
            type="button"
            onClick={() => {

              if (
                item.href !== "#"
              ) {
                router.push(
                  item.href
                );
              }

            }}
            className={`
              flex
              h-[62px]
              flex-col
              items-center
              justify-center
              gap-1
              text-[9px]
              font-semibold

              ${
                item.active
                  ? "text-[#e30613]"
                  : "text-gray-400"
              }
            `}
          >

            {item.icon}

            <span>
              {item.label}
            </span>

          </button>

        ))}

      </div>

    </nav>
  );
}

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function SmartSavingsPage() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | DEMO ACCOUNT BALANCES
  |--------------------------------------------------------------------------
  |
  | Replace these values with data returned
  | from your database/API.
  |
  */

  const [mainBalance, setMainBalance] =
    useState(12540.75);

  const [savingsBalance, setSavingsBalance] =
    useState(8240.5);

  const [transactions, setTransactions] =
    useState([
      {
        id: 1,
        type: "deposit",
        title: "Monthly Smart Saving",
        amount: 500,
        date: "12 Aug 2026",
      },
      {
        id: 2,
        type: "deposit",
        title: "Smart Savings Transfer",
        amount: 250,
        date: "01 Aug 2026",
      },
      {
        id: 3,
        type: "withdraw",
        title: "Transfer to Main Account",
        amount: 150,
        date: "28 Jul 2026",
      },
    ]);

  const [modalMode, setModalMode] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | CREATE SMART SAVING
  |--------------------------------------------------------------------------
  */

  const handleCreateSaving = (
    values
  ) => {

    const amount =
      Number(values.amount);

    /*
      IMPORTANT:

      This is currently frontend demo
      logic.

      In your real banking application,
      call your secure API here.

      Example:

      await fetch(
        "/api/savings/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      The server should perform
      the actual database transaction.
    */

    if (
      amount <= 0 ||
      amount > mainBalance
    ) {
      return;
    }

    setMainBalance(
      (balance) =>
        balance - amount
    );

    setSavingsBalance(
      (balance) =>
        balance + amount
    );

    setTransactions(
      (previous) => [
        {
          id:
            Date.now(),
          type: "deposit",
          title:
            values.savingType ===
            "recurring"
              ? "Smart Saving Setup"
              : "One-time Smart Saving",
          amount,
          date:
            new Date().toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),
        },
        ...previous,
      ]
    );
  };

  /*
  |--------------------------------------------------------------------------
  | ADD MONEY
  |--------------------------------------------------------------------------
  */

  const handleAddMoney = (
    amount
  ) => {

    if (
      amount <= 0 ||
      amount > mainBalance
    ) {
      return;
    }

    setMainBalance(
      (balance) =>
        balance - amount
    );

    setSavingsBalance(
      (balance) =>
        balance + amount
    );

    setTransactions(
      (previous) => [
        {
          id:
            Date.now(),
          type: "deposit",
          title:
            "Manual Savings Deposit",
          amount,
          date:
            new Date().toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),
        },
        ...previous,
      ]
    );

    setModalMode(null);
  };

  /*
  |--------------------------------------------------------------------------
  | WITHDRAW MONEY
  |--------------------------------------------------------------------------
  */

  const handleWithdraw = (
    amount
  ) => {

    if (
      amount <= 0 ||
      amount > savingsBalance
    ) {
      return;
    }

    setSavingsBalance(
      (balance) =>
        balance - amount
    );

    setMainBalance(
      (balance) =>
        balance + amount
    );

    setTransactions(
      (previous) => [
        {
          id:
            Date.now(),
          type: "withdraw",
          title:
            "Transfer to Main Account",
          amount,
          date:
            new Date().toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),
        },
        ...previous,
      ]
    );

    setModalMode(null);
  };

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
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1500px]
        "
      >

        {/* SIDEBAR */}

        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* CONTENT */}

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
              max-w-[1250px]
              px-4
              py-5
              sm:px-6
              sm:py-7
              lg:px-8
              lg:py-8
            "
          >

            {/* BREADCRUMB */}

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                text-gray-400
              "
            >

              <span>
                Dashboard
              </span>

              <ChevronRight size={12} />

              <span className="text-gray-600">
                Smart Savings
              </span>

            </div>

            {/* TITLE */}

            <div
              className="
                mb-6
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <h1
                    className="
                      text-[23px]
                      font-extrabold
                      text-gray-900
                      sm:text-[27px]
                    "
                  >
                    Smart Savings
                  </h1>

                  <span
                    className="
                      rounded-full
                      bg-red-50
                      px-2.5
                      py-1
                      text-[8px]
                      font-extrabold
                      text-[#e30613]
                    "
                  >
                    SMART
                  </span>

                </div>

                <p
                  className="
                    mt-1
                    max-w-[620px]
                    text-[10px]
                    leading-relaxed
                    text-gray-500
                    sm:text-[11px]
                  "
                >
                  Build your savings automatically
                  while keeping complete control
                  over your money.
                </p>

              </div>

            </div>

            {/* TOP GRID */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[minmax(0,1fr)_390px]
              "
            >

              {/* LEFT */}

              <div className="space-y-6">

                <SavingsBalanceCard
                  mainBalance={
                    mainBalance
                  }
                  savingsBalance={
                    savingsBalance
                  }
                />

                <section
                  className="
                    rounded-[22px]
                    border
                    border-gray-200
                    bg-white
                    p-5
                    sm:p-7
                  "
                >

                  <SmartSavingForm
                    mainBalance={
                      mainBalance
                    }
                    onSave={
                      handleCreateSaving
                    }
                  />

                </section>

              </div>

              {/* RIGHT */}

              <div className="space-y-6">

                <section
                  className="
                    rounded-[22px]
                    border
                    border-gray-200
                    bg-white
                    p-5
                    sm:p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
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
                        Quick Actions
                      </h2>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          text-gray-400
                        "
                      >
                        Move money in or out
                        of savings.
                      </p>

                    </div>

                    <Wallet
                      size={18}
                      className="text-gray-400"
                    />

                  </div>

                  <div className="mt-5">

                    <QuickActions
                      onAdd={() =>
                        setModalMode(
                          "add"
                        )
                      }
                      onWithdraw={() =>
                        setModalMode(
                          "withdraw"
                        )
                      }
                    />

                  </div>

                </section>

                <SavingsGoals />

              </div>

            </div>

            {/* ACTIVITY */}

            <div className="mt-6">

              <RecentSavingActivity
                transactions={
                  transactions
                }
              />

            </div>

            {/* SECURITY NOTICE */}

            <div
              className="
                mt-6
                flex
                items-start
                gap-3
                rounded-[18px]
                border
                border-gray-200
                bg-white
                p-4
              "
            >

              <span
                className="
                  flex
                  h-9 w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  text-green-600
                "
              >
                <ShieldCheck
                  size={17}
                />
              </span>

              <div>

                <p
                  className="
                    text-[9px]
                    font-extrabold
                    text-gray-700
                  "
                >
                  Your money is protected
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    leading-relaxed
                    text-gray-400
                  "
                >
                  Smart Savings transfers are
                  processed securely. Your
                  savings balance remains linked
                  to your main bank account.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MOBILE NAVIGATION */}

      <MobileNavigation />

      {/* MONEY MODAL */}

      {modalMode && (
        <MoneyActionModal
          mode={modalMode}
          onClose={() =>
            setModalMode(null)
          }
          onConfirm={
            modalMode === "add"
              ? handleAddMoney
              : handleWithdraw
          }
        />
      )}

    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Bell,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  KeyRound,
  LayoutGrid,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Pencil,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { MobileNavigation } from "../components/MobileNavigation";
import { IoInformationCircleOutline } from "react-icons/io5";

let avatar;
/*
|--------------------------------------------------------------------------
| PROFILE HEADER
|--------------------------------------------------------------------------
*/

function ProfileHeader() {
  const [photo, setPhoto] = useState(null);
  const { user } = useAuth();

  const handlePhotoChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);
      avatar = URL.createObjectURL(file) || "avatar.png";

    setPhoto(imageUrl);
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-gray-200
        bg-white
      "
    >

      {/* COVER */}

      <div
        className="
          h-[115px]
          bg-gradient-to-r
          from-[#e30613]
          via-[#c7000b]
          to-[#850008]
          sm:h-[145px]
        "
      />

      {/* PROFILE AREA */}

      <div
        className="
          relative
          px-5
          pb-5
          sm:px-7
          sm:pb-7
        "
      >

        {/* AVATAR */}

        <div
          className="
            absolute
            -top-[48px]
            left-5
            sm:left-7
          "
        >

          <div
            className="
              relative
              flex
              h-[92px] w-[92px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-4
              border-white
              bg-gray-100
              shadow-md
              sm:h-[105px]
              sm:w-[105px]
            "
          >

            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="
                  h-full w-full
                  object-cover
                "
              />
            ) : (
              <User
                size={43}
                className="text-gray-400"
              />
            )}

          </div>

          {/* PHOTO BUTTON */}

          <label
            className="
              absolute
              bottom-0
              right-0
              flex
              h-8 w-8
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-[#e30613]
              text-white
              shadow
            "
          >

            <Camera size={14} />

            <input
              type="file"
              accept="image/*"
              onChange={
                handlePhotoChange
              }
              className="hidden"
            />

          </label>

        </div>

        {/* NAME */}

        <div
          className="
            pt-[58px]
            sm:pt-[65px]
          "
        >

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <h1
                className="
                  text-[21px]
                  font-extrabold
                  text-gray-900
                "
              >
                {user.fullname}
              </h1>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-gray-400
                "
              >
                Premium Banking Customer
              </p>

            </div>

            <span
              className="
                flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                bg-green-50
                px-3
                py-1.5
                text-[9px]
                font-bold
                text-green-600
              "
            >

              <Check size={12} />

              Account Verified

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT
|--------------------------------------------------------------------------
*/

function ProfileInput({
  label,
  value,
  onChange,
  icon,
  type = "text",
  disabled = false,
}) {
  return (
    <div>

      <label
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

        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-[44px]
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

            ${
              disabled
                ? "cursor-not-allowed bg-gray-50 text-gray-400"
                : "focus:border-[#e30613] focus:ring-2 focus:ring-red-100"
            }
          `}
        />

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PERSONAL INFORMATION
|--------------------------------------------------------------------------
*/

function PersonalInformation() {
  const { user } = useAuth();
  user.img = avatar;

  const [form, setForm] =
    useState(user);

  const [saved, setSaved] =
    useState(false);

  const updateField = (
    field,
    value
  ) => {

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const saveChanges = async () => {

      //Replace this with your API request.

      await fetch("/api/auth/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

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

      {/* TITLE */}

      <div
        className="
          mb-6
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
            Personal Information
          </h2>

          <p
            className="
              mt-1
              text-[9px]
              leading-relaxed
              text-gray-400
            "
          >
            Update your personal and
            contact information.
          </p>

        </div>

        <Pencil
          size={17}
          className="text-gray-400"
        />

      </div>

      {/* FORM */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
        "
      >

        <ProfileInput
          label="Full Name"
          value={form.fullname}
          onChange={(event) =>
            updateField(
              "fullname",
              event.target.value
            )
          }
          icon={<User size={15} />}
        />

        <ProfileInput
          label="Email Address"
          value={form.email}
          onChange={(event) =>
            updateField(
              "email",
              event.target.value
            )
          }
          icon={<Mail size={15} />}
          type="email"
        />

        <ProfileInput
          label="Phone Number"
          value={form.phone}
          onChange={(event) =>
            updateField(
              "phone",
              event.target.value
            )
          }
          icon={<Phone size={15} />}
        />

      </div>

      {/* SAVE */}

      <div
        className="
          mt-6
          flex
          flex-col-reverse
          gap-3
          border-t
          border-gray-100
          pt-5
          sm:flex-row
          sm:items-center
          sm:justify-end
        "
      >

        {saved && (
          <span
            className="
              flex
              items-center
              gap-1.5
              text-[9px]
              font-bold
              text-green-600
            "
          >

            <Check size={13} />

            Changes saved successfully

          </span>
        )}

        <button
          type="button"
          onClick={saveChanges}
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#e30613]
            px-5
            text-[10px]
            font-extrabold
            text-white
            shadow-sm
            transition
            hover:bg-[#c90510]
          "
        >

          <Save size={14} />

          Save Changes

        </button>

      </div>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| SECURITY SETTINGS
|--------------------------------------------------------------------------
*/

function SecuritySettings() {

  const [isToggled, setIsToggled] = useState(false);

  const [twoFactor, setTwoFactor] =
    useState(true);

  const [loginAlerts, setLoginAlerts] =
    useState(true);

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

      <div>

        <h2
          className="
            text-[14px]
            font-extrabold
            text-gray-800
          "
        >
          Security Settings
        </h2>

        <p
          className="
            mt-1
            text-[9px]
            text-gray-400
          "
        >
          Protect your bank account
          and manage login security.
        </p>

      </div>

      <div
        className="
          mt-5
          space-y-3
        "
      >

        {/* PASSWORD */}

        <button
          type="button"
          onClick={() => setIsToggled(true)}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-gray-100
            p-3
            text-left
            hover:bg-gray-50
          "
        >

          <span
            className="
              flex
              h-10 w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-[#e30613]
            "
          >
            <KeyRound size={18} />
          </span>

          <span>

            <span
              className="
                block
                text-[10px]
                font-extrabold
                text-gray-700
              "
            >
              Change Password
            </span>

            <span
              className="
                mt-1
                block
                text-[8px]
                text-gray-400
              "
            >
              Update your account password
            </span>

          </span>

          <ChevronRight
            size={15}
            className="
              ml-auto
              text-gray-300
            "
          />

        </button>

        {/* 2FA */}

        <SecurityToggle
          icon={<ShieldCheck size={18} />}
          title="Two-Factor Authentication"
          description="Add an extra layer of security"
          enabled={twoFactor}
          onChange={() =>
            setTwoFactor(!twoFactor)
          }
        />

        {/* LOGIN ALERT */}

        <SecurityToggle
          icon={<Bell size={18} />}
          title="Login Alerts"
          description="Receive alerts for new logins"
          enabled={loginAlerts}
          onChange={() =>
            setLoginAlerts(!loginAlerts)
          }
        />

      </div>

      {isToggled === true && (
              <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 justify-center bg-black/50 items-center loading-modal">
                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                  <div className="flex justify-center items-center rounded-full p-2 dark:bg-isoDark bg-[#f4f4f5]">
                    <IoInformationCircleOutline className="w-16 text-black dark:text-isoColor2 h-16" />
                  </div>
      
                  <h1 className="px-6 text-lg font-medium text-center md:font-semibold">
                    Notice!
                  </h1>
      
                  <p className="text-xs text-center">
                    This feature is not yet available for this account. Ziraat Bank
                    operating team will notify you as soon as it becomes functional.
                    Thank you.
                  </p>
      
                  <button
                    type="button"
                    onClick={() => setIsToggled(false)}
                    className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| SECURITY TOGGLE
|--------------------------------------------------------------------------
*/

function SecurityToggle({
  icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div
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
        className="
          flex
          h-10 w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-gray-100
          text-gray-600
        "
      >
        {icon}
      </span>

      <div className="min-w-0">

        <p
          className="
            text-[10px]
            font-extrabold
            text-gray-700
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[8px]
            text-gray-400
          "
        >
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={onChange}
        className={`
          relative
          ml-auto
          h-6
          w-11
          shrink-0
          rounded-full
          transition

          ${
            enabled
              ? "bg-[#e30613]"
              : "bg-gray-300"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow
            transition

            ${
              enabled
                ? "left-6"
                : "left-1"
            }
          `}
        />

      </button>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| BANK ACCOUNT INFORMATION
|--------------------------------------------------------------------------
*/

function BankAccountInformation() {
  const { user } = useAuth();
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

      <div>

        <h2
          className="
            text-[14px]
            font-extrabold
            text-gray-800
          "
        >
          Bank Account Information
        </h2>

        <p
          className="
            mt-1
            text-[9px]
            text-gray-400
          "
        >
          Your banking identification
          information.
        </p>

      </div>

      <div
        className="
          mt-5
          space-y-3
        "
      >

        <InfoRow
          label="Customer ID"
          value="CUS-98451273"
        />

        <InfoRow
          label="Account Number"
          value={user.accountNumber}
        />

        <InfoRow
          label="Account Type"
          value="Premium Savings Account"
        />

        <InfoRow
          label="Account Status"
          value="Active"
          active
        />

      </div>

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

        <ShieldCheck
          size={17}
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
          Your account information is
          protected and should never be
          shared with anyone.
        </p>

      </div>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| INFORMATION ROW
|--------------------------------------------------------------------------
*/

function InfoRow({
  label,
  value,
  active = false,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        bg-gray-50
        px-3
        py-3
      "
    >

      <span
        className="
          text-[9px]
          font-semibold
          text-gray-400
        "
      >
        {label}
      </span>

      <span
        className={`
          text-right
          text-[9px]
          font-bold

          ${
            active
              ? "text-green-600"
              : "text-gray-700"
          }
        `}
      >
        {value}
      </span>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PREFERENCES
|--------------------------------------------------------------------------
*/

function Preferences() {

  const [language, setLanguage] =
    useState("English");

  const [currency, setCurrency] =
    useState("EUR");

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

      <h2
        className="
          text-[14px]
          font-extrabold
          text-gray-800
        "
      >
        Preferences
      </h2>

      <p
        className="
          mt-1
          text-[9px]
          text-gray-400
        "
      >
        Customize your banking experience.
      </p>

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
        "
      >

        {/* LANGUAGE */}

        <div>

          <label
            className="
              mb-1.5
              block
              text-[9px]
              font-bold
              text-gray-500
            "
          >
            Preferred Language
          </label>

          <div className="relative">

            <select
              value={language}
              onChange={(event) =>
                setLanguage(
                  event.target.value
                )
              }
              className="
                h-[44px]
                w-full
                appearance-none
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                pr-10
                text-[10px]
                font-semibold
                text-gray-700
                outline-none
                focus:border-[#e30613]
              "
            >

              <option>
                English
              </option>

              <option>
                French
              </option>

              <option>
                German
              </option>

              <option>
                Turkish
              </option>

              <option>
                Spanish
              </option>

            </select>

            <ChevronDown
              size={15}
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

        </div>

        {/* CURRENCY */}

        <div>

          <label
            className="
              mb-1.5
              block
              text-[9px]
              font-bold
              text-gray-500
            "
          >
            Default Currency
          </label>

          <div className="relative">

            <select
              value={currency}
              onChange={(event) =>
                setCurrency(
                  event.target.value
                )
              }
              className="
                h-[44px]
                w-full
                appearance-none
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                pr-10
                text-[10px]
                font-semibold
                text-gray-700
                outline-none
                focus:border-[#e30613]
              "
            >

              <option>
                EUR
              </option>

              <option>
                USD
              </option>

              <option>
                GBP
              </option>

              <option>
                GHS
              </option>

            </select>

            <ChevronDown
              size={15}
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

        </div>

      </div>

    </section>
  );
}

/*
|--------------------------------------------------------------------------
| PROFILE CONTENT
|--------------------------------------------------------------------------
*/

function ProfileSettingsContent() {
  const { user } = useAuth();


  return (
    <div className="w-full">

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
          Profile Settings
        </span>

      </div>

      {/* PAGE TITLE */}

      <div className="mb-6">

        <h1
          className="
            text-[23px]
            font-extrabold
            text-gray-900
            sm:text-[27px]
          "
        >
          Profile Settings
        </h1>

        <p
          className="
            mt-1
            max-w-[600px]
            text-[10px]
            leading-relaxed
            text-gray-500
            sm:text-[11px]
          "
        >
          Manage your personal information,
          banking details, security and
          account preferences.
        </p>

      </div>

      {/* PROFILE */}

      <ProfileHeader />

      {/* MAIN SETTINGS GRID */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,1fr)_350px]
        "
      >

        {/* LEFT */}

        <div className="space-y-6">

          <PersonalInformation />

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <SecuritySettings />

          <BankAccountInformation />

        </div>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default function ProfileSettingsPage() {

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

        {/* SIDEBAR */}

        <Sidebar
        tab={"settings"}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* MAIN */}

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

            <ProfileSettingsContent />

          </div>

        </div>

      </div>

      {/* MOBILE BOTTOM NAV */}

      <MobileNavigation tab={'settings'} />

    </main>
  );
}
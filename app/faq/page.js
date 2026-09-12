"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  MessageSquare,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Search,
  LucideMessageSquareMore,
} from "lucide-react";
import Image from "next/image";

export default function FrequentlyAskedQuestionsPage() {
  /*
  |--------------------------------------------------------------------------
  | ACTIVE TAB
  |--------------------------------------------------------------------------
  */

  const [activeTab, setActiveTab] = useState("general");

  /*
  |--------------------------------------------------------------------------
  | OPEN FAQ
  |--------------------------------------------------------------------------
  */

  const [openQuestion, setOpenQuestion] = useState({
    general: 0,
    individual: null,
    corporate: null,
    security: null,
  });

  /*
  |--------------------------------------------------------------------------
  | MOBILE MENU
  |--------------------------------------------------------------------------
  */

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | FAQ DATA
  |--------------------------------------------------------------------------
  */

  const faqData = {
    general: {
      label: "General",

      questions: [
        {
          question:
            "I can’t see all the information panels on the homepage. What can I do to see them all?",

          answer:
            "The information panels continue downwards. You can view additional panels by scrolling with your mouse wheel, using the up and down arrow keys on your keyboard, or dragging and dropping with your mouse.",
        },

        {
          question:
            "Can I personalize the homepage? Where can I change the information panels?",

          answer:
            "Depending on the features available in your internet banking service, information panels can be customized from the homepage settings. Look for the personalization or settings option and follow the instructions displayed on the screen.",
        },

        {
          question:
            "I can’t find the operation I’m looking for. What should I do?",

          answer:
            "Use the navigation menus or search functionality to locate the service you need. If you still cannot find the operation, review the relevant help section or contact customer support for assistance.",
        },

        {
          question:
            "From which addresses can I access Internet Banking?",

          answer:
            "Always access Internet Banking through your bank's official website or official application. Avoid accessing your account through links received in unexpected emails, text messages, or social media messages.",
        },

        {
          question:
            "What should I do if the Internet Banking page does not load correctly?",

          answer:
            "Check your internet connection and refresh the page. You can also clear your browser cache or try an updated browser. If the issue continues, contact customer support.",
        },

        {
          question:
            "Can I use Internet Banking from a mobile device?",

          answer:
            "Yes. Internet banking services can generally be accessed through compatible mobile browsers or the bank's official mobile application. Always use the official application downloaded from a trusted app store.",
        },

        {
          question:
            "How can I contact customer support?",

          answer:
            "Use the official customer service channels displayed on the bank's website or inside the official banking application. Never provide your password, PIN, or one-time security codes to someone who contacts you unexpectedly.",
        },
      ],
    },

    individual: {
      label: "Individual Transactions",

      questions: [
        {
          question:
            "How can I check my account balance?",

          answer:
            "After securely signing in to Internet Banking, your available accounts and balances can be viewed from the accounts or dashboard section.",
        },

        {
          question:
            "How can I view my recent transactions?",

          answer:
            "Open the relevant account and select the transaction history or account activity section. You can normally review recent account movements and transaction details there.",
        },

        {
          question:
            "How can I transfer money to another account?",

          answer:
            "Sign in to Internet Banking, select the transfer or payments section, enter the required recipient and transaction information, review the details carefully, and authorize the transaction using the available security method.",
        },

        {
          question:
            "Can I schedule a future payment?",

          answer:
            "If scheduled payments are supported for the selected transaction type, you can choose a future execution date while creating the payment. Always review the date and amount before confirming.",
        },

        {
          question:
            "What should I do if I entered incorrect transfer information?",

          answer:
            "Contact the bank as soon as possible using an official customer service channel. Depending on the transaction status and type, the bank may be able to provide assistance.",
        },

        {
          question:
            "How can I download or review my account statements?",

          answer:
            "Open the account or statement section in Internet Banking and select the appropriate date range. Available statement formats and download options may vary by service.",
        },

        {
          question:
            "Why was my transaction declined?",

          answer:
            "Transactions may be declined for several reasons, including insufficient available funds, transaction limits, incorrect information, security checks, or service restrictions. Review the displayed notification and contact the bank if necessary.",
        },
      ],
    },

    corporate: {
      label: "Corporate Transactions",

      questions: [
        {
          question:
            "How can a company access corporate Internet Banking?",

          answer:
            "Corporate customers should use the official corporate banking access page and authenticate using the credentials and security methods provided by the bank.",
        },

        {
          question:
            "Can a company have multiple authorized users?",

          answer:
            "Corporate banking services may support multiple authorized users with different permissions. The available roles and authorization structure depend on the corporate banking arrangement.",
        },

        {
          question:
            "What is an approval workflow?",

          answer:
            "An approval workflow allows transactions created by one authorized user to be reviewed and approved by another authorized user before execution. The exact workflow depends on the company's banking setup.",
        },

        {
          question:
            "Can corporate users have different transaction limits?",

          answer:
            "Corporate banking arrangements may support different transaction and authorization limits depending on the permissions assigned to individual users and the company's agreement with the bank.",
        },

        {
          question:
            "How can I add or remove a corporate banking user?",

          answer:
            "Corporate user administration should be performed through the authorized company administrator or the bank's official corporate banking support process.",
        },

        {
          question:
            "How can I view corporate account transactions?",

          answer:
            "After signing in, select the relevant company account and open the transaction or account activity section. Depending on your permissions, you may also be able to export transaction information.",
        },

        {
          question:
            "What should I do if a corporate transaction requires urgent attention?",

          answer:
            "Review the transaction status in the official corporate banking platform and contact the bank's authorized corporate support channel if additional assistance is required.",
        },
      ],
    },

    security: {
      label: "Password and Security",

      questions: [
        {
          question:
            "What should I do if I forget my Internet Banking password?",

          answer:
            "Use the official password recovery or reset process provided on the Internet Banking login page. Follow the identity verification instructions carefully and never share your password or security codes with another person.",
        },

        {
          question:
            "How can I protect my Internet Banking password?",

          answer:
            "Use a strong, unique password and never share it with anyone. Avoid writing passwords where others can see them and do not reuse your banking password on other websites.",
        },

        {
          question:
            "What is a one-time password or verification code?",

          answer:
            "A one-time password or verification code is a temporary security credential used to confirm certain actions or login attempts. Never disclose a security code to someone who contacts you unexpectedly.",
        },

        {
          question:
            "What should I do if I receive a suspicious banking message?",

          answer:
            "Do not click suspicious links, open unexpected attachments, or provide your banking credentials. Instead, contact the bank through an official website, application, or customer service channel.",
        },

        {
          question:
            "How can I recognize a phishing attempt?",

          answer:
            "Be cautious of messages requesting passwords, PINs, card information, or security codes, especially when they create urgency or contain unexpected links. Access banking services by entering the official website address yourself or using the official application.",
        },

        {
          question:
            "What should I do if I think someone has accessed my account?",

          answer:
            "Contact the bank immediately through an official channel and follow its security instructions. If you can safely access your account, review recent activity and change your credentials using the official security process.",
        },

        {
          question:
            "Should I use Internet Banking on a public computer?",

          answer:
            "Avoid accessing sensitive banking services from public or shared computers whenever possible. Use a trusted device and network, keep your operating system and browser updated, and always sign out when you finish.",
        },

        {
          question:
            "Why does Internet Banking sometimes ask me to verify my identity again?",

          answer:
            "Additional verification can be required as a security measure, particularly for sensitive actions, unusual activity, new devices, or changes to account settings.",
        },
      ],
    },
  };

  /*
  |--------------------------------------------------------------------------
  | TAB LIST
  |--------------------------------------------------------------------------
  */

  const tabs = [
    {
      id: "general",
      label: "General",
    },
    {
      id: "individual",
      label: "Individual Transactions",
    },
    {
      id: "corporate",
      label: "Corporate Transactions",
    },
    {
      id: "security",
      label: "Password and Security",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | SWITCH TAB
  |--------------------------------------------------------------------------
  */

  const switchTab = (tabId) => {
    setActiveTab(tabId);

    setOpenQuestion((previous) => ({
      ...previous,
      [tabId]: null,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE FAQ
  |--------------------------------------------------------------------------
  */

  const toggleQuestion = (index) => {
    setOpenQuestion((previous) => ({
      ...previous,
      [activeTab]:
        previous[activeTab] === index
          ? null
          : index,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | NEXT TAB
  |--------------------------------------------------------------------------
  */

  const nextTab = () => {
    const currentIndex = tabs.findIndex(
      (tab) => tab.id === activeTab
    );

    const nextIndex =
      (currentIndex + 1) % tabs.length;

    switchTab(tabs[nextIndex].id);
  };

  /*
  |--------------------------------------------------------------------------
  | PREVIOUS TAB
  |--------------------------------------------------------------------------
  */

  const previousTab = () => {
    const currentIndex = tabs.findIndex(
      (tab) => tab.id === activeTab
    );

    const previousIndex =
      (currentIndex - 1 + tabs.length) %
      tabs.length;

    switchTab(tabs[previousIndex].id);
  };

  /*
  |--------------------------------------------------------------------------
  | CURRENT FAQ
  |--------------------------------------------------------------------------
  */

  const currentFaq = faqData[activeTab];

  return (
    <main className="min-h-screen bg-white">
      {/* =========================================================
          TOP RED BAR
      ========================================================= */}

      <div className="h-[6px] w-full bg-[#e30613]" />

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="relative z-50 bg-white">
        {/* TOP NAVIGATION */}

        <div className="hidden h-[36px] items-center justify-end bg-[#e30613] px-8 md:flex">
          <nav className="flex h-full items-center gap-7">
            <button
              type="button"
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-75
              "
            >
              Security
            </button>

            <button
              type="button"
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-75
              "
            >
              Help
            </button>

            <button
              type="button"
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-75
              "
            >
              Frequently Asked Questions
            </button>

            <button
              type="button"
              className="
                text-[12px]
                font-bold
                uppercase
                text-white
                transition
                hover:opacity-75
              "
            >
              English
            </button>
          </nav>
        </div>

        {/* MAIN HEADER */}

        <div
          className="
            flex
            min-h-[76px]
            items-center
            justify-between
            border-b
            border-[#eeeeee]
            bg-white
            px-5
            sm:px-8
            lg:px-[64px]
          "
        >
          {/* LOGO */}

          <a
            href="/"
            className="flex items-center w-full justify-center lg:justify-start gap-3"
          >
            <Image
              src={"/icons/logo-en.png"}
              alt={"Ziraat Bank Logo"}
              width={100}
              height={100}
              className="h-11 w-auto lg:block"
            />
          </a>

          {/* DESKTOP CUSTOMER SERVICE */}

          <div className="hidden items-center gap-3 md:flex">
            <div
              className="
                flex
                h-[54px]
                w-[54px]
                items-center
                justify-center
                rounded-full
                border-[4px]
                border-[#4b5960]
                text-center
                text-[11px]
                font-bold
                leading-[12px]
                text-[#4b5960]
              "
            >
              0850
              <br />
              220
              <br />
              00 00
            </div>

            <div>
              <p
                className="
                  text-[12px]
                  font-bold
                  text-[#4b5960]
                "
              >
                Customer Contact
                <br />
                Center
              </p>

              <p
                className="
                  mt-1
                  text-[8px]
                  text-[#777]
                "
              >
                www.ziraati-bank.vercel.app
              </p>
            </div>
          </div>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-md
              text-[#202027]
              md:hidden
            "
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* =======================================================
            MOBILE NAVIGATION
        ======================================================= */}

        {mobileMenuOpen && (
          <div
            className="
              border-b
              border-[#ddd]
              bg-white
              px-5
              py-4
              shadow-lg
              md:hidden
            "
          >
            <div className="space-y-1">
              {[
                "Security",
                "Help",
                "Frequently Asked Questions",
                "English",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-[#eeeeee]
                    px-2
                    py-3
                    text-left
                    text-[13px]
                    font-semibold
                    text-[#333]
                  "
                >
                  {item}

                  <ChevronRight size={16} className="text-[#999]" />
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          FAQ HERO / CONTENT
      ========================================================= */}

      <section
        className="
          relative
          min-h-[calc(100vh-118px)]
          overflow-hidden
          bg-[#ed071a]
        "
      >
        {/* =======================================================
            DECORATIVE BACKGROUND PATTERN
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.22]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                135deg,
                transparent 0%,
                transparent 35%,
                rgba(130,0,15,0.65) 35%,
                rgba(130,0,15,0.65) 39%,
                transparent 39%,
                transparent 49%,
                rgba(130,0,15,0.45) 49%,
                rgba(130,0,15,0.45) 53%,
                transparent 53%
              ),
              linear-gradient(
                45deg,
                transparent 0%,
                transparent 48%,
                rgba(255,255,255,0.08) 48%,
                rgba(255,255,255,0.08) 51%,
                transparent 51%
              )
            `,
            backgroundSize: "540px 540px, 380px 380px",
          }}
        />

        {/* SECOND DECORATIVE PATTERN */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-100px]
            top-[-80px]
            h-[500px]
            w-[500px]
            rotate-[45deg]
            border-[40px]
            border-[#c90015]/30
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[-180px]
            bottom-[-120px]
            h-[500px]
            w-[500px]
            rotate-[45deg]
            border-[35px]
            border-[#c90015]/30
          "
        />

        {/* =======================================================
            HERO INNER
        ======================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1250px]
            px-5
            pb-12
            pt-8
            sm:px-8
            lg:px-0
          "
        >
          {/* =====================================================
              PAGE TITLE
          ===================================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              text-white
            "
          >
            <a href="/"><Home size={21} strokeWidth={2} /></a>

            <ChevronRight size={22} strokeWidth={2} />

            <h1
              className="
                text-[25px]
                font-normal
                uppercase
                tracking-[-0.5px]
                sm:text-[27px]
                md:text-[29px]
              "
            >
              Frequently Asked Questions
            </h1>
          </div>

          {/* =====================================================
              TABS
          ===================================================== */}

          <div
            className="
              mt-7
              flex
              items-center
            "
          >
            {/* LEFT ARROW */}

            <button
              type="button"
              onClick={previousTab}
              aria-label="Previous FAQ category"
              className="
                mr-1
                hidden
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-black/10
                text-white
                transition
                hover:bg-black/20
                lg:flex
              "
            >
              <ChevronLeft size={20} />
            </button>

            {/* TAB SCROLLER */}

            <div
              className="
                scrollbar-hide
                flex
                min-w-0
                flex-1
                overflow-x-auto
              "
            >
              <div
                className="
                  flex
                  min-w-max
                  items-end
                  gap-0
                "
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => switchTab(tab.id)}
                      className={`
                        relative
                        whitespace-nowrap
                        px-5
                        py-3
                        text-[16px]
                        font-semibold
                        transition-all
                        duration-200
                        sm:px-6
                        sm:text-[17px]
                        ${
                          isActive
                            ? "text-[#111]"
                            : "text-white/55 hover:text-white"
                        }
                      `}
                    >
                      {tab.label}

                      {isActive && (
                        <span
                          className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            h-[2px]
                            bg-white
                          "
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT ARROW */}

            <button
              type="button"
              onClick={nextTab}
              aria-label="Next FAQ category"
              className="
                ml-1
                hidden
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-black/10
                text-white
                transition
                hover:bg-black/20
                lg:flex
              "
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* =====================================================
              FAQ CARD
          ===================================================== */}

          <div
            className="
              mt-7
              overflow-hidden
              rounded-[15px]
              bg-[#fce7e9]
              shadow-[0_8px_30px_rgba(90,0,0,0.12)]
            "
          >
            {/* ===================================================
                CATEGORY TITLE
            =================================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/70
                px-5
                py-4
                sm:px-8
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/60
                    text-[#d70718]
                  "
                >
                  {activeTab === "security" ? (
                    <ShieldCheck size={20} />
                  ) : (
                    <Search size={19} />
                  )}
                </div>

                <span
                  className="
                    text-[14px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#444]
                  "
                >
                  {currentFaq.label}
                </span>
              </div>

              <span
                className="
                  text-[12px]
                  text-[#777]
                "
              >
                {currentFaq.questions.length} questions
              </span>
            </div>

            {/* ===================================================
                QUESTIONS
            =================================================== */}

            <div>
              {currentFaq.questions.map((item, index) => {
                const isOpen = openQuestion[activeTab] === index;

                return (
                  <div
                    key={`${activeTab}-${index}`}
                    className="
                        border-b
                        border-white
                        last:border-b-0
                      "
                  >
                    {/* QUESTION */}

                    <button
                      type="button"
                      onClick={() => toggleQuestion(index)}
                      aria-expanded={isOpen}
                      className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-5
                          px-5
                          py-5
                          text-left
                          transition-colors
                          duration-200
                          sm:px-8
                          sm:py-[21px]
                          ${
                            isOpen
                              ? "bg-[#fbe1e4]"
                              : "bg-transparent hover:bg-white/25"
                          }
                        `}
                    >
                      <span
                        className="
                            text-[15px]
                            font-semibold
                            leading-[1.5]
                            text-[#4b555b]
                            sm:text-[16px]
                          "
                      >
                        {item.question}
                      </span>

                      <span
                        className={`
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            text-[#4c565b]
                            transition-transform
                            duration-300
                            ${isOpen ? "rotate-180" : ""}
                          `}
                      >
                        <ChevronDown size={23} strokeWidth={1.8} />
                      </span>
                    </button>

                    {/* ANSWER */}

                    <div
                      className={`
                          grid
                          transition-[grid-template-rows]
                          duration-300
                          ease-in-out
                          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                        `}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="
                              border-t
                              border-white/70
                              bg-[#f9dfe2]
                              px-5
                              pb-6
                              pt-5
                              sm:px-8
                            "
                        >
                          <p
                            className="
                                max-w-[1080px]
                                text-[14px]
                                leading-[1.65]
                                text-[#454b4f]
                                sm:text-[15px]
                              "
                          >
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              BOTTOM HELP AREA
          ===================================================== */}

          <div
            className="
              mt-7
              flex
              flex-col
              items-start
              justify-between
              gap-4
              rounded-[12px]
              bg-black/10
              px-5
              py-5
              sm:flex-row
              sm:items-center
              sm:px-7
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#e30613]
                "
              >
                <Phone size={18} />
              </div>

              <div>
                <p
                  className="
                    text-[14px]
                    font-semibold
                    text-white
                  "
                >
                  Need more help?
                </p>

                <p
                  className="
                    mt-1
                    text-[12px]
                    text-white/75
                  "
                >
                  Contact the bank through an official customer service channel.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="
                flex
                min-h-[42px]
                items-center
                justify-center
                rounded-full
                bg-white
                px-6
                text-[13px]
                font-bold
                text-[#d90718]
                transition
                hover:bg-[#f5f5f5]
              "
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
                      FLOATING SUPPORT BUTTON
                  ======================================================== */}

      <button
        href="/support"
        aria-label="Customer support"
        className="
                              fixed
                              bottom-6
                              right-5
                              z-40
                              w-[78px]
                              h-[78px]
                              p-0
                              grid
                              place-items-center
                              rounded-full
                              border-[7px]
                              border-gray-500/45
                              bg-white/90
                              cursor-pointer
                              transition
                              hover:scale-105
                              max-[700px]:right-5
                              max-[700px]:bottom-[25px]
                            "
      >
        <span
          className="
                                w-[51px]
                                h-[51px]
                                grid
                                place-items-center
                                rounded-full
                                bg-[#ed0016]
                                text-white
                              "
        >
          <LucideMessageSquareMore size={27} strokeWidth={2} />
        </span>
      </button>
    </main>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  ExternalLink,
  Facebook,
  FileText,
  Heart,
  Info,
  Instagram,
  Menu,
  PiggyBank,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  WalletCards,
  X,
  Youtube,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| ZIRAAT BANKASI - BİREYSEL EMEKLİLİK
|--------------------------------------------------------------------------
| Next.js 16
| JavaScript
| TailwindCSS inline classes
| Responsive
|--------------------------------------------------------------------------
*/

const advantages = [
  {
    icon: ShieldCheck,
    title: "%20 Devlet Katkısı",
    text: "Yatırdığınız her tutarın %20 devlet katkısı avantajıyla değerlendirilmesine katkı sağlar.",
  },
  {
    icon: WalletCards,
    title: "Düzenli Katkı Payı",
    text: "Tercihinize göre katkı payınız hesabınızdan veya kredi kartınızdan düzenli olarak tahsil edilebilir.",
  },
  {
    icon: PiggyBank,
    title: "Ek Katkı Payı",
    text: "Düzenli ödemelerinizin yanında istediğiniz zaman belirlediğiniz tutarda ek katkı payı ödeyebilirsiniz.",
  },
  {
    icon: RefreshCw,
    title: "Planınızı Değiştirin",
    text: "Emeklilik planınızı yılda 4 kez değiştirebilir, fon dağılımınızı ise yılda 12 kez güncelleyebilirsiniz.",
  },
  {
    icon: Clock3,
    title: "Esnek Ödeme",
    text: "Katkı payı ödemelerinizi aylık, 3 aylık, 6 aylık veya yıllık olarak tercih edebilirsiniz.",
  },
  {
    icon: Heart,
    title: "Yaşam Kulüpleri",
    text: "Türkiye Hayat Emeklilik tarafından BES müşterilerine sunulan Yaşam Kulüpleri ayrıcalıklarından yararlanabilirsiniz.",
  },
];

const faqItems = [
  {
    question: "Bireysel Emeklilik Sistemi nedir?",
    answer:
      "Bireysel Emeklilik Sistemi, emeklilik döneminde ek birikim oluşturmak amacıyla düzenli veya isteğe bağlı katkı paylarıyla uzun vadeli tasarruf yapmanızı sağlayan özel emeklilik sistemidir.",
  },
  {
    question: "BES'e nasıl katılabilirim?",
    answer:
      "Ziraat Bankası'nın güncel sayfasında belirtildiği üzere, Ziraat Mobil uygulamasındaki Bireysel Emeklilik Başvuru seçeneği üzerinden uygun planlara başvuru yapabilirsiniz.",
  },
  {
    question: "Katkı payımı ne sıklıkla ödeyebilirim?",
    answer:
      "Katkı payı ödeme sıklığınızı aylık, 3 aylık, 6 aylık veya yıllık seçeneklerden tercih edebilirsiniz.",
  },
  {
    question: "Fon dağılımımı değiştirebilir miyim?",
    answer:
      "Mevcut sayfadaki bilgilere göre fon dağılımınızı yılda 12 kez değiştirebilirsiniz.",
  },
  {
    question: "Emeklilik planımı değiştirebilir miyim?",
    answer:
      "Mevcut sayfadaki bilgilere göre emeklilik planınızı yılda 4 kez değiştirebilirsiniz.",
  },
  {
    question: "Dijital BES planında giriş aidatı var mı?",
    answer:
      "Ziraat Bankası'nın mevcut sayfasında dijitalden satılan BES planında peşin giriş aidatı alınmadığı belirtilmektedir.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="min-h-screen bg-white text-[#333333]">
      {/* ======================================================
          TOP BAR
      ====================================================== */}

      <div className="hidden border-b border-[#eeeeee] bg-[#fafafa] lg:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-end gap-7 px-8 text-[11px] text-[#666666]">
          <Link
            href="#"
            className="transition hover:text-[#e30613]"
          >
            Opi
          </Link>

          <Link
            href="#"
            className="transition hover:text-[#e30613]"
          >
            Kartlar
          </Link>

          <Link
            href="#"
            className="transition hover:text-[#e30613]"
          >
            ENGLISH
          </Link>
        </div>
      </div>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#e8e8e8] bg-white">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center px-4 sm:px-6 lg:px-10">
          {/* ZIRAAT LOGO */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <ZiraatLogo />

            <div className="hidden sm:block">
              <div className="text-[16px] font-bold leading-none tracking-tight text-[#333]">
                ZİRAAT
              </div>

              <div className="mt-1 text-[8px] font-semibold tracking-[0.32em] text-[#777]">
                BANKASI
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav className="ml-10 hidden h-full items-center gap-7 xl:flex">
            <MainNavItem
              title="Bireysel"
              active
            />

            <MainNavItem title="Ticari" />

            <MainNavItem title="Kurumsal" />

            <MainNavItem title="Bankamız Hakkında" />

            <MainNavItem title="Yatırımcı İlişkileri" />

            <MainNavItem title="Dijital Bankacılık" />

            <MainNavItem title="Kampanyalar" />
          </nav>

          {/* RIGHT ACTIONS */}

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="hidden h-10 rounded-md border border-[#e30613] px-4 text-[11px] font-semibold text-[#e30613] transition hover:bg-[#e30613] hover:text-white sm:block"
            >
              İnternet Şubesi
            </button>

            <button
              type="button"
              className="hidden h-10 rounded-md bg-[#e30613] px-5 text-[11px] font-semibold text-white transition hover:bg-[#c80510] sm:block"
            >
              Müşteri Ol
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#dddddd] xl:hidden"
            >
              <Menu className="h-5 w-5 text-[#444]" />
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 xl:hidden">
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-[390px] overflow-y-auto bg-white shadow-2xl">
            <div className="flex h-[76px] items-center justify-between border-b border-[#eeeeee] px-5">
              <div className="font-semibold text-[#333]">
                Menü
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              {[
                "Bireysel",
                "Ticari",
                "Kurumsal",
                "Bankamız Hakkında",
                "Yatırımcı İlişkileri",
                "Dijital Bankacılık",
                "Kampanyalar",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  className="flex w-full items-center justify-between border-b border-[#eeeeee] py-5 text-left text-sm font-medium text-[#444]"
                >
                  {item}

                  <ChevronRight className="h-4 w-4 text-[#999]" />
                </button>
              ))}

              <div className="mt-7 grid gap-3">
                <button
                  type="button"
                  className="h-12 rounded-md border border-[#e30613] text-sm font-semibold text-[#e30613]"
                >
                  İnternet Şubesi
                </button>

                <button
                  type="button"
                  className="h-12 rounded-md bg-[#e30613] text-sm font-semibold text-white"
                >
                  Müşteri Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          BREADCRUMB
      ====================================================== */}

      <section className="border-b border-[#eeeeee] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-4 text-[11px] text-[#777] sm:px-6 lg:px-10">
          <Link
            href="/"
            className="transition hover:text-[#e30613]"
          >
            Ana Sayfa
          </Link>

          <span className="mx-2 text-[#bbbbbb]">
            /
          </span>

          <span>Bireysel</span>

          <span className="mx-2 text-[#bbbbbb]">
            /
          </span>

          <span>Sigorta & Emeklilik</span>

          <span className="mx-2 text-[#bbbbbb]">
            /
          </span>

          <span className="font-medium text-[#444]">
            Bireysel Emeklilik
          </span>
        </div>
      </section>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#e30613]">
        {/* Decorative rings */}

        <div className="pointer-events-none absolute -right-32 -top-36 h-[470px] w-[470px] rounded-full border-[70px] border-white/10" />

        <div className="pointer-events-none absolute -bottom-44 left-[40%] h-[420px] w-[420px] rounded-full border-[55px] border-white/10" />

        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_0.95fr]">
          {/* HERO COPY */}

          <div className="relative z-10 px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur">
              <PiggyBank className="h-4 w-4" />

              BİREYSEL EMEKLİLİK
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[58px]">
              Geleceğiniz için
              <br />
              bugünden birikim
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
              Bireysel Emeklilik Sistemine katılarak düzenli birikim
              yapmaya başlayın. Yatırım tercihinize göre faizli veya
              faizsiz fon alternatifleri arasından seçim yapabilirsiniz.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex h-12 items-center justify-center gap-2 rounded-md bg-white px-7 text-sm font-semibold text-[#e30613] transition hover:bg-[#f4f4f4]"
              >
                BES Başvurusu
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="flex h-12 items-center justify-center gap-2 rounded-md border border-white/50 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Planları İncele
              </button>
            </div>

            {/* Hero mini points */}

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
              <HeroMini
                value="%20"
                label="Devlet Katkısı"
              />

              <HeroMini
                value="12"
                label="Fon Değişikliği"
              />

              <HeroMini
                value="4"
                label="Plan Değişikliği"
              />
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="relative min-h-[390px] overflow-hidden lg:min-h-[520px]">
            {/* Main illustration */}

            <div className="absolute left-[12%] top-[15%] h-[290px] w-[390px] rotate-[-3deg] rounded-[28px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md sm:left-[16%] sm:h-[320px] sm:w-[450px]">
              {/* Laptop screen */}

              <div className="absolute left-8 right-8 top-8 h-[175px] rounded-xl border border-white/20 bg-[#ffffff]/95 p-4 shadow-lg sm:h-[195px]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-semibold text-[#555]">
                      BİRİKİMİM
                    </div>

                    <div className="mt-2 text-xl font-bold text-[#333]">
                      ₺248.750
                    </div>
                  </div>

                  <div className="rounded-md bg-[#fff1f2] px-2 py-1 text-[8px] font-semibold text-[#e30613]">
                    + %20
                  </div>
                </div>

                {/* fake graph */}

                <div className="mt-5 flex h-[70px] items-end gap-2">
                  {[35, 45, 30, 60, 48, 75, 65, 90, 78].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-sm bg-[#e30613]"
                        style={{
                          height: `${height}%`,
                          opacity:
                            0.35 + index * 0.07,
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Laptop base */}

              <div className="absolute bottom-[-18px] left-[13%] right-[13%] h-8 rounded-b-[25px] bg-white/75 shadow-lg" />

              {/* Coin jar */}

              <div className="absolute -bottom-10 -right-10 flex h-32 w-32 items-center justify-center rounded-[28px] bg-white shadow-2xl sm:h-36 sm:w-36">
                <PiggyBank className="h-16 w-16 text-[#e30613]" />

                <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7b900] text-xs font-bold text-white shadow-lg">
                  ₺
                </div>
              </div>

              {/* Coin */}

              <div className="absolute -left-6 -top-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
                <div className="text-xl font-bold text-[#e30613]">
                  ₺
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          MAIN INTRO
      ====================================================== */}

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e30613]">
              Bireysel Emeklilik
            </span>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#333] sm:text-4xl">
              Bireysel Emeklilik Sistemine Katılmak Artık Çok Kolay!
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#666] sm:text-base">
              Yatırım tercihinize göre faizli/faizsiz fon alternatifleri
              içeren ve düşük katkı payı tutarı avantajı sunan planlara
              Ziraat Mobil uygulamasında yer alan Bireysel Emeklilik
              Başvuru seçeneğinden ulaşabilir, birikim yapmaya
              başlayabilirsiniz.
            </p>

            <button
              type="button"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-md bg-[#e30613] px-7 text-sm font-semibold text-white transition hover:bg-[#c80510]"
            >
              Ziraat Mobil'den Başvur
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================
          ADVANTAGES
      ====================================================== */}

      <section className="bg-[#f7f7f7] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e30613]">
              BES Avantajları
            </span>

            <h2 className="mt-3 text-3xl font-semibold text-[#333]">
              Avantajları Nelerdir?
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-[#e5e5e5] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e30613]/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.07)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1f2] transition group-hover:bg-[#e30613]">
                    <Icon className="h-6 w-6 text-[#e30613] transition group-hover:text-white" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-[#333]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#777]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          STATE CONTRIBUTION
      ====================================================== */}

      <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-3xl bg-[#e30613]">
          <div className="relative grid lg:grid-cols-[1fr_390px]">
            {/* Decorative */}

            <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full border-[60px] border-white/10" />

            <div className="relative z-10 p-8 sm:p-10 lg:p-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                Devlet Katkısı
              </span>

              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Birikiminize devlet katkısıyla destek
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85">
                BES kapsamında yaptığınız katkı payları için mevcut
                devlet katkısı uygulamasından yararlanabilirsiniz.
                Ayrıntılı koşullar ve hak ediş kuralları için güncel
                mevzuat ve ilgili emeklilik şirketinin bilgilendirmelerini
                inceleyiniz.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-md bg-white px-7 text-sm font-semibold text-[#e30613] hover:bg-[#f5f5f5]"
                >
                  Detaylı Bilgi
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-7 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Fonları İncele
                </button>
              </div>
            </div>

            {/* %20 DISPLAY */}

            <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden">
              <div className="absolute h-[300px] w-[300px] rounded-full border-[45px] border-white/10" />

              <div className="relative flex h-[190px] w-[190px] flex-col items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur">
                <span className="text-6xl font-bold tracking-tight text-white">
                  %20
                </span>

                <span className="mt-2 text-sm font-medium text-white/80">
                  Devlet Katkısı
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PLAN FEATURES
      ====================================================== */}

      <section className="bg-[#f7f7f7] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e30613]">
                Plan Bilgileri
              </span>

              <h2 className="mt-3 text-3xl font-semibold text-[#333] sm:text-4xl">
                Plan Özellikleri Nelerdir?
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#666]">
                Size uygun birikim planını seçerken ödeme sıklığı,
                yatırım tercihleri ve plan özelliklerini birlikte
                değerlendirebilirsiniz.
              </p>

              <button
                type="button"
                className="mt-7 flex h-12 items-center gap-2 rounded-md border border-[#e30613] px-6 text-sm font-semibold text-[#e30613] transition hover:bg-[#e30613] hover:text-white"
              >
                BES Planlarını İncele
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PlanCard
                icon={CreditCard}
                title="Peşin Giriş Aidatı"
                text="Dijitalden satılan BES Planında peşin giriş aidatı alınmamaktadır."
              />

              <PlanCard
                icon={WalletCards}
                title="Esnek Katkı Payı"
                text="Katkı payı ödemelerinizi farklı dönem seçenekleriyle planlayabilirsiniz."
              />

              <PlanCard
                icon={RefreshCw}
                title="Fon Dağılımı"
                text="Fon dağılımınızı yılda 12 kez değiştirebilirsiniz."
              />

              <PlanCard
                icon={FileText}
                title="Emeklilik Planı"
                text="Emeklilik planınızı yılda 4 kez değiştirme imkanınız bulunur."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PAYMENT FREQUENCY
      ====================================================== */}

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e30613]">
              Ödeme Seçenekleri
            </span>

            <h2 className="mt-3 text-3xl font-semibold text-[#333]">
              Size Uygun Ödeme Sıklığını Seçin
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#777]">
              Katkı payı ödemelerinizi tercihlerinize göre farklı dönemlerde
              gerçekleştirebilirsiniz.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Aylık",
                icon: Clock3,
              },
              {
                title: "3 Aylık",
                icon: CalendarIcon,
              },
              {
                title: "6 Aylık",
                icon: CalendarIcon,
              },
              {
                title: "Yıllık",
                icon: CalendarIcon,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-[#e5e5e5] bg-white p-6 text-center transition hover:-translate-y-1 hover:border-[#e30613]/30 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1f2]">
                    <Icon className="h-6 w-6 text-[#e30613]" />
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-[#333]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#888]">
                    Katkı payı ödeme seçeneği
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          LINKS / DOCUMENTS
      ====================================================== */}

      <section className="border-y border-[#eeeeee] bg-[#fafafa] px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-5 md:grid-cols-2">
            <ResourceCard
              icon={FileText}
              title="BES Planları"
              description="BES planları hakkında detaylı bilgi almak için ilgili emeklilik şirketinin bilgilendirme sayfasını inceleyebilirsiniz."
              button="Detaylı Bilgi"
            />

            <ResourceCard
              icon={ShieldCheck}
              title="Fon Bilgileri"
              description="Fon seçenekleri ve yatırım tercihleri hakkında daha fazla bilgi edinin."
              button="Fon Bilgilerini İncele"
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          FAQ
      ====================================================== */}

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e30613]">
              Yardım
            </span>

            <h2 className="mt-3 text-3xl font-semibold text-[#333]">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-[#e3e3e3]">
            {faqItems.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[#eeeeee] last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
                  >
                    <span className="text-sm font-semibold text-[#444]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#e30613] transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-7">
                      <p className="text-sm leading-7 text-[#777]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          DIGITAL BANKING CTA
      ====================================================== */}

      <section className="bg-[#f7f7f7] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1fr_360px]">
            <div className="p-8 sm:p-10 lg:p-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e30613]">
                Dijital Bankacılık
              </span>

              <h2 className="mt-3 text-3xl font-semibold text-[#333]">
                Başvurması Kolay, Kullanması Kolay
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#777]">
                Dijitalin Kolayı Ziraat'te! Ziraat Mobil üzerinden
                Bireysel Emeklilik başvuru seçeneklerine ulaşabilirsiniz.
              </p>

              <button
                type="button"
                className="mt-7 flex h-12 items-center gap-2 rounded-md bg-[#e30613] px-7 text-sm font-semibold text-white transition hover:bg-[#c80510]"
              >
                Ziraat Mobil'i Keşfet
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-[#e30613]">
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border-[45px] border-white/10" />

              <div className="absolute -bottom-24 -left-10 h-[280px] w-[280px] rounded-full border-[40px] border-white/10" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-2xl">
                <Smartphone className="h-16 w-16 text-[#e30613]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#333333] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}

            <div>
              <div className="flex items-center gap-3">
                <ZiraatLogo />

                <div>
                  <div className="text-base font-bold">
                    ZİRAAT
                  </div>

                  <div className="text-[8px] tracking-[0.3em] text-gray-400">
                    BANKASI
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-xs text-xs leading-6 text-gray-400">
                Başvurması kolay, kullanması kolay. Dijitalin Kolayı
                Ziraat'te!
              </p>
            </div>

            <FooterColumn
              title="Ziraat Finans Grubu"
              links={[
                "Yurt İçi İştirakler",
                "Yurt İçi Diğer İştirakler",
                "Yurtdışı İştirak Bankaları ve Şubeleri",
              ]}
            />

            <FooterColumn
              title="Linkler"
              links={[
                "Hesaplama Araçları",
                "Sözleşme ve Formlar",
                "Site Haritası",
                "IBAN",
                "Zaman Aşımı",
                "Sıkça Sorulanlar",
              ]}
            />

            <FooterColumn
              title="Bize Ulaşın"
              links={[
                "Şube & ATM'ler",
                "İletişim Formu",
                "Mobil Şubeler",
                "Güvenlik",
              ]}
            />
          </div>

          {/* Social */}

          <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">
                Bizi Takip Edin
              </span>

              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Youtube} />
            </div>

            <div className="flex flex-wrap gap-5 text-[10px] text-gray-500">
              <span>Kişisel Verilerin Korunması</span>
              <span>Bilgi Toplumu Hizmetleri</span>
              <span>Gizlilik</span>
              <span>Yasal Uyarı</span>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6 text-[10px] text-gray-500">
            © {new Date().getFullYear()} - T.C. Ziraat Bankası AŞ
          </div>
        </div>
      </footer>

      {/* ======================================================
          FLOATING HELP
      ====================================================== */}

      <button
        type="button"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#e30613] text-white shadow-xl transition hover:scale-105 hover:bg-[#c80510]"
      >
        <Info className="h-6 w-6" />
      </button>
    </main>
  );
}

/* ============================================================
   ZIRAAT LOGO
============================================================ */

function ZiraatLogo() {
  return (
    <div className="relative h-12 w-12 shrink-0">
      {/* red leaf */}

      <div className="absolute left-[20px] top-[3px] h-8 w-3.5 rotate-[-32deg] rounded-[100%] bg-[#e30613]" />

      <div className="absolute left-[16px] top-[13px] h-7 w-3 rotate-[22deg] rounded-[100%] bg-[#e30613]" />

      <div className="absolute left-[25px] top-[22px] h-5 w-2.5 rotate-[54deg] rounded-[100%] bg-[#e30613]" />
    </div>
  );
}

/* ============================================================
   NAV ITEM
============================================================ */

function MainNavItem({ title, active = false }) {
  return (
    <button
      type="button"
      className={`flex h-full items-center gap-1 border-b-2 text-[12px] font-medium transition ${
        active
          ? "border-[#e30613] text-[#e30613]"
          : "border-transparent text-[#555] hover:text-[#e30613]"
      }`}
    >
      {title}

      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

/* ============================================================
   HERO MINI
============================================================ */

function HeroMini({ value, label }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
      <div className="text-xl font-bold text-white">
        {value}
      </div>

      <div className="mt-1 text-[9px] text-white/65">
        {label}
      </div>
    </div>
  );
}

/* ============================================================
   PLAN CARD
============================================================ */

function PlanCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 transition hover:border-[#e30613]/30 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff1f2]">
        <Icon className="h-5 w-5 text-[#e30613]" />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-[#333]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-[#777]">
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   RESOURCE CARD
============================================================ */

function ResourceCard({
  icon: Icon,
  title,
  description,
  button,
}) {
  return (
    <div className="group rounded-xl border border-[#e4e4e4] bg-white p-6 transition hover:-translate-y-1 hover:border-[#e30613]/30 hover:shadow-lg sm:p-7">
      <div className="flex items-start gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff1f2]">
          <Icon className="h-6 w-6 text-[#e30613]" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-[#333]">
            {title}
          </h3>

          <p className="mt-2 text-xs leading-6 text-[#777]">
            {description}
          </p>

          <button
            type="button"
            className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#e30613]"
          >
            {button}

            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FOOTER COLUMN
============================================================ */

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            className="block text-xs text-gray-400 transition hover:text-white"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SOCIAL ICON
============================================================ */

function SocialIcon({ icon: Icon }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#e30613] hover:bg-[#e30613] hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

/* ============================================================
   SIMPLE CALENDAR ICON
============================================================ */

function CalendarIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
      />

      <path d="M16 2v4M8 2v4M3 10h18" />

      <path d="M8 14h2M14 14h2M8 18h2M14 18h2" />
    </svg>
  );
}

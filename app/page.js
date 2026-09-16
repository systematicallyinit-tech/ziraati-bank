import { HomepageHero } from "./components/HomepageHero";
import { Services } from "./components/Services";
import { Footer } from "./components/Footer"

export default function Home() {
  return (
    <div className="bg-white dark:bg-isoDark w-full h-full text-black dark:text-white min-h-screen relative font-[family-name:var(--font-geist-sans)]">
      <HomepageHero />
      <Services />
      <Footer />
    </div>
  );
}

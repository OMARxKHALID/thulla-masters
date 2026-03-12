import { getSettings } from "@/lib/services/settings";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/marketing/Hero";
import GameRules from "@/components/marketing/GameRules";
import Footer from "@/components/shared/Footer";

export default async function Home() {
  const data = await getSettings();

  return (
    <main className="min-h-screen relative overflow-x-hidden flex flex-col">
      <Navbar />
      <Hero apkUrl={data.apkDownloadUrl} />
      <GameRules buySellUrl={data.buySellUrl} />
      <Footer socials={data.socialLinks} className="mt-auto" />
    </main>
  );
}


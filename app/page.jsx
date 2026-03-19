import { getSettings } from "@/lib/services/settings";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/marketing/Hero";
import GameRules from "@/components/marketing/GameRules";
import Footer from "@/components/shared/Footer";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function HomeContent() {
  const data = await getSettings();

  if (data.redirectUrl) {
    redirect(data.redirectUrl);
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <Navbar />
      <Hero apkUrl={data.apkDownloadUrl} />
      <GameRules buySellUrl={data.buySellUrl} />
      <Footer socials={data.socialLinks} className="mt-auto" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden flex flex-col pt-2">
      <Suspense fallback={null}>
        <HomeContent />
      </Suspense>
    </main>
  );
}

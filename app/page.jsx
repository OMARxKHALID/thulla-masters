import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/marketing/Hero";
import GameRules from "@/components/marketing/GameRules";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <GameRules />
      <Footer />
    </main>
  );
}

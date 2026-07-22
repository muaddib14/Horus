import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Demo from "@/components/Demo";
import Process from "@/components/Process";
import Features from "@/components/Features";
import PriceCompare from "@/components/PriceCompare";
import SkillsCTA from "@/components/SkillsCTA";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker />
      <Demo />
      <Process />
      <Features />
      <PriceCompare />
      <SkillsCTA />
      <Footer />
      <RevealObserver />
    </main>
  );
}

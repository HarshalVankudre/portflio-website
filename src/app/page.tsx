import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import WorkList from "@/components/home/WorkList";
import Capabilities from "@/components/home/Capabilities";
import AboutTeaser from "@/components/home/AboutTeaser";
import ContactSection from "@/components/home/ContactSection";
import ScrollRail from "@/components/effects/ScrollRail";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative min-h-screen outline-none">
        <Hero />
        <WorkList />
        <Capabilities />
        <AboutTeaser />
        <ContactSection />
        <ScrollRail />
      </main>

      <Footer />

      {/* AI Chatbot */}
      <ChatBot />
    </>
  );
}

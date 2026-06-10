import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import WorkList from "@/components/home/WorkList";
import AboutTeaser from "@/components/home/AboutTeaser";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative min-h-screen outline-none">
        <Hero />
        <WorkList />
        <AboutTeaser />
        <ContactSection />
      </main>

      <Footer />

      {/* AI Chatbot */}
      <ChatBot />
    </>
  );
}

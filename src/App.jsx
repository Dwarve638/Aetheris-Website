import Starscape from './components/Starscape';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';

export default function App() {
  return (
    <div className="relative min-h-screen bg-brand-black overflow-x-hidden">
      {/* Fixed background layers */}
      <Starscape />
      <ScrollProgress />
      <SocialSidebar />

      {/* Fixed top-left corner logo */}
      <img
        src="/corner-logo.png"
        alt="Aetheris"
        className="fixed top-4 left-4 z-50 w-auto pointer-events-none select-none"
        style={{ filter: 'drop-shadow(0 0 10px rgba(30,144,255,0.45))', height: 'clamp(70px, 9vw, 115px)' }}
      />

      {/* Page content */}
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

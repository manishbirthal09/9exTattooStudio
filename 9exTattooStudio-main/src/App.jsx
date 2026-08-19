import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import StickyCTA from './components/StickyCTA.jsx';
import ExitIntentPopup from './components/ExitIntentPopup.jsx';

import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import DestinyConsultation from './pages/DestinyConsultation.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Achievements from './pages/Achievements.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import LocationPage from './pages/Locationpage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-ink/20 border-t-ink rounded-full animate-spin" />
          <p className="text-sm text-ink/50">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 pb-20 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/destiny-consultation" element={<DestinyConsultation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/locations/:slug" element={<LocationPage />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyCTA />
      <ExitIntentPopup />
    </div>
  );
}





import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';

// Layout & Navigation Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import QuoteRequestPopup from './components/QuoteRequestPopup';

// Website Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Elevation3D from './pages/Elevation3D';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  // Helper to render current page component
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} onOpenConsultation={() => setConsultationOpen(true)} />;
      case 'about':
        return <About />;
      case 'services':
        return <Services onOpenConsultation={() => setConsultationOpen(true)} />;
      case 'projects':
        return <Projects onOpenConsultation={() => setConsultationOpen(true)} />;
      case 'elevation':
        return <Elevation3D />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setCurrentPage={setCurrentPage} onOpenConsultation={() => setConsultationOpen(true)} />;
    }
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Sticky Header Navigation */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Main Pages with Animating Transitions */}
      <main className="flex-grow flex flex-col w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex-grow flex flex-col w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer & Floatings (Hidden on Admin screen to avoid design clashes) */}
      {!isAdminPage && (
        <>
          <Footer 
            setCurrentPage={setCurrentPage} 
            onOpenConsultation={() => setConsultationOpen(true)} 
          />
          <WhatsAppButton />
          <ScrollToTop />
        </>
      )}

      {/* Consultation Quote popup */}
      <QuoteRequestPopup 
        isOpen={consultationOpen} 
        onClose={() => setConsultationOpen(false)} 
      />
    </div>
  );
}

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MessagesSection from "@/components/MessagesSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import CrystalsSection from "@/components/CrystalsSection";
import PortalSection from "@/components/PortalSection";
import MusicPlayer from "@/components/MusicPlayer";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showPortal, setShowPortal] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handleAllCrystalsActivated = () => {
    setShowPortal(true);
    // Scroll suave para o portal
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {!hasEntered && (
          <SplashScreen onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {hasEntered && (
        <div className="overflow-x-hidden">
          <HeroSection />
          <MessagesSection />
          <PhotoGallerySection />
          <CrystalsSection onAllActivated={handleAllCrystalsActivated} />
          <PortalSection isVisible={showPortal} />
          <MusicPlayer />
        </div>
      )}
    </>
  );
};

export default Index;

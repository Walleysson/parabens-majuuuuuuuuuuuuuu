import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, PartyPopper, Star, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Confetti from "./Confetti";
import { birthdayConfig } from "@/config/birthday-config";

interface PortalSectionProps {
  isVisible: boolean;
}

const PortalSection = ({ isVisible }: PortalSectionProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [clickedHearts, setClickedHearts] = useState<number[]>([]);
  const [celebrating, setCelebrating] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [explosions, setExplosions] = useState<Array<{id: number, x: number, y: number}>>([]);

  const messages = [
    birthdayConfig.messages.portal.title,
    ...birthdayConfig.messages.portal.paragraphs,
  ];

  const celebrationMessages = [
    "Mensagem teste",
"Mensagem teste",
    "Mensagem teste",
    "Mensagem teste"
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleCelebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);
    
    // Flash inicial
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);

    // Criar explosões de partículas
    const newExplosions = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 30,
      y: 50 + (Math.random() - 0.5) * 30,
    }));
    setExplosions(newExplosions);

    // Sequência de fases de celebração
    setTimeout(() => setCelebrationPhase(1), 500);
    setTimeout(() => setCelebrationPhase(2), 1500);
    setTimeout(() => setCelebrationPhase(3), 2500);
    
    // Finalizar celebração
    setTimeout(() => {
      setShowConfetti(false);
      setCelebrating(false);
      setCelebrationPhase(0);
      setExplosions([]);
    }, 6000);
  };

  const handleHeartClick = (id: number) => {
    if (!clickedHearts.includes(id)) {
      setClickedHearts([...clickedHearts, id]);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background mágico animado */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, hsl(340 82% 75%), hsl(280 50% 85%))",
                "linear-gradient(135deg, hsl(280 50% 85%), hsl(45 100% 70%))",
                "linear-gradient(135deg, hsl(45 100% 70%), hsl(340 82% 75%))",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Ondas de energia quando hover */}
          <AnimatePresence>
            {hoveredElement && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{
                      width: ["0px", "800px"],
                      height: ["0px", "800px"],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Partículas brilhantes - Sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                  scale: 0,
                }}
                animate={{
                  y: -100,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                <Sparkles className="text-white" size={Math.random() * 20 + 10} />
              </motion.div>
            ))}
          </div>

          {/* Partículas - Estrelas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: 360,
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 7 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 7,
                  ease: "linear",
                }}
              >
                <Star 
                  className="text-yellow-200" 
                  size={Math.random() * 15 + 10} 
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </div>

          {/* Corações flutuantes interativos */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.button
                key={`heart-${i}`}
                className="absolute cursor-pointer"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                }}
                animate={{
                  y: -100,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: "linear",
                }}
                onClick={() => handleHeartClick(i)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              >
                <Heart
                  className={clickedHearts.includes(i) ? "text-red-400" : "text-pink-300"}
                  size={Math.random() * 20 + 20}
                  fill={clickedHearts.includes(i) ? "currentColor" : "none"}
                />
              </motion.button>
            ))}
          </div>

          {/* Portal central */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 1.5,
              }}
            >
              {/* Círculos do portal */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-4 border-white/30"
                  animate={{
                    scale: [1 + i * 0.1, 1.2 + i * 0.1, 1 + i * 0.1],
                    rotate: 360,
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    width: `${120 + i * 20}%`,
                    height: `${120 + i * 20}%`,
                    left: `${-10 - i * 10}%`,
                    top: `${-10 - i * 10}%`,
                  }}
                />
              ))}

              {/* Conteúdo do portal */}
              <motion.div
                className="relative glass-effect rounded-3xl p-12 text-center backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                onMouseEnter={() => setHoveredElement("portal")}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {/* Ícone central animado */}
                <motion.div
                  className="relative mb-8"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Heart className="text-white mx-auto" size={80} fill="white" />
                  </motion.div>
                  
                  {/* Corações orbitando */}
                  {[0, 120, 240].map((angle, i) => (
                    <motion.div
                      key={`orbit-${i}`}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        originX: "50%",
                        originY: "50%",
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "linear",
                      }}
                    >
                      <Heart
                        className="text-pink-200"
                        size={20}
                        fill="currentColor"
                        style={{
                          transform: `translate(-50%, -50%) translateY(-60px) rotate(${angle}deg)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mensagens progressivas */}
                <div className="min-h-[300px] flex flex-col justify-center space-y-6">
                  <AnimatePresence mode="wait">
                    {messages.slice(0, messageIndex + 1).map((message, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          delay: 0.2,
                        }}
                      >
                        {i === 0 ? (
                          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                            {message}
                          </h2>
                        ) : (
                          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            {message}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Botões de ação */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 relative"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: messageIndex >= messages.length - 1 ? 1 : 0,
                    scale: messageIndex >= messages.length - 1 ? 1 : 0 
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20 
                  }}
                >
                  <motion.div
                    whileHover={{ scale: celebrating ? 1 : 1.05 }}
                    whileTap={{ scale: celebrating ? 1 : 0.95 }}
                    animate={celebrating ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: celebrating ? Infinity : 0,
                    }}
                  >
                    <Button
                      onClick={handleCelebrate}
                      disabled={celebrating}
                      className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-2xl shadow-xl relative overflow-hidden group disabled:opacity-100"
                      size="lg"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400"
                        animate={celebrating ? {
                          opacity: [0.2, 0.6, 0.2],
                          scale: [1, 1.5, 1],
                        } : {
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: celebrating ? Infinity : 0,
                        }}
                      />
                      <span className="relative z-10 flex items-center">
                        <PartyPopper className="mr-2" />
                        {celebrating ? "Celebrando! ✨" : "Celebrar! 🎊"}
                      </span>
                    </Button>
                  </motion.div>

                  {/* Explosões de partículas ao redor do botão */}
                  <AnimatePresence>
                    {explosions.map((explosion) => (
                      <motion.div
                        key={explosion.id}
                        className="absolute pointer-events-none"
                        style={{
                          left: `${explosion.x}%`,
                          top: `${explosion.y}%`,
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1.5, 2],
                          opacity: [1, 0.6, 0],
                          x: [0, (Math.random() - 0.5) * 200],
                          y: [0, (Math.random() - 0.5) * 200],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                      >
                        {[Sparkles, Star, Heart][Math.floor(Math.random() * 3)] === Sparkles ? (
                          <Sparkles className="text-yellow-300" size={32} />
                        ) : [Sparkles, Star, Heart][Math.floor(Math.random() * 3)] === Star ? (
                          <Star className="text-pink-300" size={32} fill="currentColor" />
                        ) : (
                          <Heart className="text-red-300" size={32} fill="currentColor" />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Mensagem de celebração */}
                <AnimatePresence>
                  {celebrating && celebrationPhase > 0 && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <motion.div
                        className="text-6xl md:text-8xl font-black text-white text-center"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                        }}
                        style={{
                          textShadow: "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,192,203,0.6)",
                        }}
                      >
                        {celebrationMessages[celebrationPhase - 1]}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Brilhos decorativos */}
                <div className="absolute -top-6 -right-6">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles className="text-gold" size={48} />
                  </motion.div>
                </div>

                <div className="absolute -bottom-6 -left-6">
                  <motion.div
                    animate={{
                      rotate: -360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  >
                    <Sparkles className="text-white" size={48} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Mensagens especiais Sabrina Carpenter */}
            <motion.div
              className="text-center mt-12 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.div
                className="flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <Music className="text-white/80" />
                <p className="text-white/90 text-xl italic font-medium">
                  "A vida é 'short n' sweet', então aproveite cada momento!" 💕
                </p>
                <Music className="text-white/80" />
              </motion.div>

              <motion.p
                className="text-white/80 text-lg"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                "I'm working late, 'cause I'm a singer" 🎤✨
              </motion.p>

              {/* Cards com mais frases */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
              >
                {[
                  { text: "Please, please, please... seja sempre essa pessoa maravilhosa! 🌟", icon: Star },
                  { text: "Feather light moments... mas memórias pesadas de amor! 💖", icon: Heart },
                ].map((quote, i) => (
                  <motion.div
                    key={i}
                    className="glass-effect p-6 rounded-2xl backdrop-blur-md"
                    whileHover={{
                      scale: 1.05,
                      rotate: i % 2 === 0 ? 2 : -2,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <quote.icon className="text-white mx-auto mb-2" size={24} fill="white" />
                    <p className="text-white/90 text-sm italic">
                      {quote.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {showConfetti && <Confetti />}
          
          {/* Flash de luz ao celebrar */}
          <AnimatePresence>
            {showFlash && (
              <motion.div
                className="absolute inset-0 bg-white pointer-events-none z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default PortalSection;

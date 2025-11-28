import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Music, Mic2 } from "lucide-react";
import { birthdayConfig } from "@/config/birthday-config";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-sweet">
      {/* Sparkles decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Sparkles className="text-primary" size={16} />
          </motion.div>
        ))}
      </div>

      {/* Corações flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [100, -100],
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.7,
            }}
          >
            <Heart className="text-secondary fill-secondary" size={24} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Nome principal */}
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-6 text-gradient-magic"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {birthdayConfig.messages.hero.greeting}
          </motion.h1>

          {/* Nome do aniversariante */}
          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-6 text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {birthdayConfig.name}!
          </motion.h2>

          {/* Subtítulo inspirado */}
          <motion.p
            className="text-2xl md:text-3xl text-primary font-light mb-8 italic"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {birthdayConfig.messages.hero.subtitle}
          </motion.p>

          {/* Elementos característicos da Sabrina */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {/* Círculo central com elementos musicais */}
            <div className="w-80 h-80 md:w-96 md:h-96 mx-auto relative">
              {/* Quote da Sabrina */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="glass-effect rounded-full w-full h-full border-4 border-primary shadow-2xl flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Music className="text-primary mb-4" size={60} />
                  </motion.div>
                  <p className="text-2xl md:text-3xl font-bold text-gradient-magic mb-2">
                    Short n' Sweet
                  </p>
                  <p className="text-lg text-muted-foreground italic">
                    "Life is short & sweet"
                  </p>
                </div>
              </motion.div>
              
              {/* Corações orbitando */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`orbit-heart-${i}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      left: `${Math.cos((i * Math.PI) / 3) * 200}px`,
                      top: `${Math.sin((i * Math.PI) / 3) * 200}px`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Heart className="text-secondary fill-secondary" size={28} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Ícones característicos flutuando */}
            <motion.div
              className="absolute -top-8 -right-8"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <div className="glass-effect rounded-full p-4 border-2 border-gold">
                <Mic2 className="text-gold" size={32} />
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-8 -left-8"
              animate={{
                y: [0, 20, 0],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <div className="glass-effect rounded-full p-4 border-2 border-secondary">
                <Star className="text-secondary fill-secondary" size={32} />
              </div>
            </motion.div>
            
            <motion.div
              className="absolute top-1/2 -right-12"
              animate={{
                x: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              <Sparkles className="text-primary" size={40} />
            </motion.div>
          </motion.div>

          {/* Call to action */}
          <motion.p
            className="mt-12 text-lg text-muted-foreground flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >

          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

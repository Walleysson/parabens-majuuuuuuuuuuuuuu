import { motion } from "framer-motion";
import { useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { birthdayConfig } from "@/config/birthday-config";

interface Crystal {
  id: number;
  name: string;
  wish: string;
  color: string;
}

const crystals: Crystal[] = birthdayConfig.messages.wishes.map((wish, index) => ({
  id: index + 1,
  name: wish.title,
  wish: wish.text,
  color: ["from-pink-400 to-rose-400", "from-purple-400 to-indigo-400", "from-yellow-300 to-amber-400"][index] || "from-pink-400 to-rose-400",
}));

interface CrystalsSectionProps {
  onAllActivated: () => void;
}

const CrystalsSection = ({ onAllActivated }: CrystalsSectionProps) => {
  const [activatedCrystals, setActivatedCrystals] = useState<number[]>([]);
  const { toast } = useToast();

  const handleCrystalClick = (crystal: Crystal) => {
    if (activatedCrystals.includes(crystal.id)) return;

    setActivatedCrystals((prev) => {
      const newActivated = [...prev, crystal.id];
      
      toast({
        title: crystal.name + " Ativado! ✨",
        description: crystal.wish,
        duration: 5000,
      });

      if (newActivated.length === crystals.length) {
        setTimeout(() => {
          onAllActivated();
        }, 1000);
      }

      return newActivated;
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-sweet relative overflow-hidden">
      {/* Partículas mágicas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-magic mb-4">
            Os Três Cristais Mágicos
          </h2>
          <p className="text-xl text-muted-foreground italic">
            Clique em cada cristal para ativar seus desejos de aniversário
          </p>
          <p className="text-sm text-primary mt-2">
            {activatedCrystals.length} / {crystals.length} ativados
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {crystals.map((crystal, index) => {
            const isActivated = activatedCrystals.includes(crystal.id);
            
            return (
              <motion.div
                key={crystal.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <motion.button
                  className={`relative group cursor-pointer focus:outline-none ${
                    isActivated ? "pointer-events-none" : ""
                  }`}
                  onClick={() => handleCrystalClick(crystal)}
                  whileHover={!isActivated ? { scale: 1.1 } : {}}
                  whileTap={!isActivated ? { scale: 0.95 } : {}}
                >
                  {/* Glow effect */}
                  {isActivated && (
                    <motion.div
                      className="absolute inset-0 rounded-full blur-2xl opacity-70"
                      animate={{
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${crystal.color}`} />
                    </motion.div>
                  )}

                  {/* Crystal */}
                  <div
                    className={`relative w-32 h-32 rounded-3xl glass-effect flex items-center justify-center
                      ${isActivated ? "bg-gradient-to-br " + crystal.color : "bg-white/50"}
                      transform transition-all duration-300
                      ${!isActivated && "group-hover:rotate-12"}
                    `}
                  >
                    <Gem
                      className={`${
                        isActivated ? "text-white" : "text-muted-foreground"
                      } transition-colors`}
                      size={64}
                    />
                  </div>

                  {/* Sparkles ao redor quando ativado */}
                  {isActivated && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            x: Math.cos((i * Math.PI) / 3) * 80,
                            y: Math.sin((i * Math.PI) / 3) * 80,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          <Sparkles className="text-gold" size={20} />
                        </motion.div>
                      ))}
                    </>
                  )}
                </motion.button>

                <motion.h3
                  className={`mt-6 text-2xl font-bold text-center ${
                    isActivated ? "text-gradient-magic" : "text-muted-foreground"
                  }`}
                  animate={isActivated ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {crystal.name}
                </motion.h3>

                {isActivated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-sm text-foreground/80 italic px-4">
                      {crystal.wish}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CrystalsSection;

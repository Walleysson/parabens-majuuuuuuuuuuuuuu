import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen = ({ onEnter }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center space-y-8 px-4">
        {/* Coração animado */}
        <motion.div
          className="flex justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-24 h-24 text-pink-500 fill-pink-400" />
        </motion.div>

        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-magic">
            Feliz Aniversário! 
          </h1>
          <p className="text-lg text-muted-foreground">
            
          </p>
        </motion.div>

        {/* Botão de entrada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={onEnter}
            className="relative overflow-hidden group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Entrar na Festa
              <Sparkles className="w-5 h-5" />
            </span>
          </Button>
        </motion.div>

        {/* Partículas flutuantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-6 h-6 text-pink-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SplashScreen;

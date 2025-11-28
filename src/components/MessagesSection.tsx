import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Star, Sparkles } from "lucide-react";

const messages = [
  {
    title: "Nonsense 💋",
    text: "Que você viva momentos tão especiais que não façam sentido de tão perfeitos! Porque a vida é feita de pequenos momentos mágicos ",
    icon: Heart,
    color: "primary",
  },
  {
    title: "Feather 🪶",
    text: "Leve como uma pluma, forte como o vento! Que você seja livre para voar alto e alcançar todos os seus sonhos",
    icon: Star,
    color: "gold",
  },
  {
    title: "Espresso ☕",
    text: "Você é viciante como um espresso! Que sua energia e alegria contagiem todos ao seu redor sempre ",
    icon: Sparkles,
    color: "secondary",
  },
];

const MessageCard = ({ message, index }: { message: typeof messages[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = message.icon;

  return (
    <motion.div
      ref={ref}
      className="glass-effect rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
      initial={{ 
        opacity: 0, 
        x: index % 2 === 0 ? -100 : 100,
        rotate: index % 2 === 0 ? -5 : 5,
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0,
        rotate: 0,
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ 
        scale: 1.05,
        rotate: index % 2 === 0 ? 2 : -2,
      }}
    >
      <motion.div
        className={`inline-block p-4 rounded-2xl bg-${message.color} mb-4`}
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon className="text-white" size={32} />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gradient-magic mb-4">
        {message.title}
      </h3>
      
      <p className="text-lg text-foreground leading-relaxed">
        {message.text}
      </p>

      {/* Brilhos decorativos */}
      <div className="mt-6 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const MessagesSection = () => {
  return (
    <section className="py-20 px-4 bg-pearl relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-portal mb-4">
            Mensagens Pra Você
          </h2>
          <p className="text-xl text-muted-foreground italic">
            
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {messages.map((message, index) => (
            <MessageCard key={index} message={message} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessagesSection;

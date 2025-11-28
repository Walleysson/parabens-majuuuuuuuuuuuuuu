import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Camera, Sparkles } from "lucide-react";
import { useState } from "react";
import { birthdayConfig } from "@/config/birthday-config";

interface Photo {
  id: number;
  src: string;
  caption: string;
  date?: string;
}

const PhotoGallerySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Carregar fotos da configuração
  const photos: Photo[] = birthdayConfig.photos.map((photo, index) => ({
    id: index + 1,
    src: `/photos/${photo.filename}`,
    caption: photo.caption,
    date: photo.date,
  }));

  // Fallback para placeholder se a foto não existir
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background com gradiente */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-pink-50/30 to-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
            }}
            animate={{
              y: window.innerHeight + 50,
              x: Math.random() * window.innerWidth,
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Sparkles
              className="text-pink-300/30"
              size={Math.random() * 20 + 10}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título da seção */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera className="text-primary mx-auto" size={48} />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Memórias Especiais 
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Momentos que guardamos no coração para sempre
          </p>
        </motion.div>

        {/* Grid de fotos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              onClick={() => setSelectedPhoto(photo)}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Container da foto */}
              <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Imagem */}
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />

                {/* Overlay com gradiente */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === photo.id ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold text-lg mb-1">{photo.caption}</p>
                  {photo.date && (
                    <p className="text-sm text-white/80">{photo.date}</p>
                  )}
                </div>

                {/* Coração animado no hover */}
                <AnimatePresence>
                  {hoveredId === photo.id && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Heart
                        className="text-pink-400"
                        size={32}
                        fill="currentColor"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Brilho decorativo */}
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <Sparkles className="text-yellow-300" size={24} />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Modal de foto em tamanho grande */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-xl hover:scale-110 transition-transform z-10"
              >
                <X className="text-gray-800" size={24} />
              </button>

              {/* Imagem grande */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[80vh] object-contain bg-gray-900"
                  onError={handleImageError}
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {selectedPhoto.caption}
                  </h3>
                  {selectedPhoto.date && (
                    <p className="text-white/80">{selectedPhoto.date}</p>
                  )}
                </div>

                {/* Corações decorativos */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <Heart
                      className="text-pink-400/30"
                      size={20}
                      fill="currentColor"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallerySection;

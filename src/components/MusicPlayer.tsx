import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, X, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const MusicPlayer = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Inicia a música automaticamente com volume reduzido
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log("Autoplay bloqueado:", err));
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Áudio invisível que toca automaticamente */}
      <audio
        ref={audioRef}
        loop
        src="/birthday-music.mp3"
      />

      {/* Botão flutuante para abrir player */}
      {!showPlayer && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full glass-effect border-2 border-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          onClick={() => setShowPlayer(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ rotate: 360 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Music className="text-primary" size={28} />
          </motion.div>
        </motion.button>
      )}

      {/* Player de controle */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 glass-effect rounded-3xl p-6 shadow-2xl border-2 border-primary w-80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative space-y-4">
              {/* Botão fechar */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0 z-10"
                onClick={() => setShowPlayer(false)}
              >
                <X className="text-muted-foreground" size={16} />
              </Button>

              {/* Título */}
              <div className="text-center pr-6">
                <p className="text-sm font-bold text-gradient-magic">
                  Parabéns
                </p>
                <p className="text-xs text-muted-foreground">
                  
                </p>
              </div>

              {/* Barra de progresso */}
              <div className="space-y-1">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={handleProgressChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controles principais */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={skipBackward}
                  className="rounded-full hover:bg-primary/10"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="rounded-full w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" fill="white" />
                  ) : (
                    <Play className="w-5 h-5" fill="white" />
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={skipForward}
                  className="rounded-full hover:bg-primary/10"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              {/* Controle de volume */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {volume}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;

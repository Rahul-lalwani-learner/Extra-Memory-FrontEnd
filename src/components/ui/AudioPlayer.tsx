
import { useState, useRef, useEffect } from 'react';

interface CustomAudioPlayerProps {
  src: string;
}

export function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleError = (e: ErrorEvent) => {
      console.error("Error loading audio:", e);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError as EventListener);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError as EventListener);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audio.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const whilePlaying = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
    animationRef.current = requestAnimationFrame(whilePlaying);

    // Auto-stop animation when audio ends
    if (audio.currentTime >= audio.duration) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsPlaying(false);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-sm p-3">
      {/* Hidden native audio element */}
      {src ? (
        <audio ref={audioRef} src={src} preload="metadata" />
      ) : (
        <div className="text-center text-red-500 mb-2">Audio source not available</div>
      )}
      
      <div className="flex items-center">
        {/* Play/Pause button */}
        <button 
          onClick={togglePlayPause}
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 focus:outline-none ${isPlaying ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          disabled={!src}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        {/* Time display */}
        <div className="text-xs text-gray-500 w-16">
          {formatTime(currentTime)}
        </div>
        
        {/* Time slider */}
        <div className="flex-grow mx-2">
          <input 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={currentTime} 
            step="0.01"
            onChange={handleTimeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
        
        {/* Duration display */}
        <div className="text-xs text-gray-500 w-16 text-right">
          {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const VideoPlayer = ({ src, poster, onEnded, className }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isControlsVisible, setIsControlsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const controlsTimeoutRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setIsLoading(false);
        };
        const handleEnded = () => {
            setIsPlaying(false);
            if (onEnded) onEnded();
        };
        const handleWaiting = () => setIsLoading(true);
        const handlePlaying = () => setIsLoading(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('playing', handlePlaying);
        };
    }, [onEnded]);

    useEffect(() => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isControlsVisible) {
            controlsTimeoutRef.current = setTimeout(() => {
                if (!isPlaying) return;
                setIsControlsVisible(false);
            }, 3000);
        }
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, [isControlsVisible, isPlaying]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        isPlaying ? videoRef.current.pause() : videoRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (value) => {
        const newVolume = value[0];
        if (!videoRef.current) return;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
    };

    const handleSeek = (value) => {
        const newTime = value[0];
        if (!videoRef.current) return;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const skipForward = () => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration);
    };

    const skipBackward = () => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    };

    const toggleFullscreen = () => {
        const videoContainer = videoRef.current?.parentElement;
        if (!videoContainer) return;
        document.fullscreenElement ? document.exitFullscreen() : videoContainer.requestFullscreen();
    };

    return (
        <div
            className={cn("video-container group", className)}
            onMouseEnter={() => setIsControlsVisible(true)}
            onMouseLeave={() => !isPlaying && setIsControlsVisible(false)}
            onMouseMove={() => setIsControlsVisible(true)}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
            )}

            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                onClick={togglePlay}
                preload="metadata"
            />

            {!isPlaying && (
                <button onClick={togglePlay} className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 z-10">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-scale-in">
                        <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                </button>
            )}

            <div className={cn("video-controls transition-opacity duration-300 z-20", isControlsVisible || !isPlaying ? "opacity-100" : "opacity-0")}>
                <div className="w-full mb-4">
                    <Slider value={[currentTime]} min={0} max={duration || 100} step={0.01} onValueChange={handleSeek} className="cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={togglePlay} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                            {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                        </button>
                        <button onClick={skipBackward} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                            <SkipBack className="h-5 w-5 text-white" />
                        </button>
                        <button onClick={skipForward} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                            <SkipForward className="h-5 w-5 text-white" />
                        </button>
                        <span className="text-white text-sm ml-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleMute}>{isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}</button>
                        <button onClick={toggleFullscreen} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                            <Maximize className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;

import React, { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import ReactPlayer from "react-player";
import { ShortString } from '../utils/ShortString.jsx';

function MusicPlayer({
  selectedTrack,
  isPlaying,
  setIsPlaying,
  setSelectedTrack,
  tracks,
}) {
  const [currentTrack, setCurrentTrack] = useState(null);

  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef(null);

  useEffect(() => {
    if (selectedTrack) {
      const trackIndex = tracks.findIndex(
        (track) => track._id === selectedTrack._id
      );
      setCurrentTrack(trackIndex);
      setIsPlaying(true);
    }
  }, [selectedTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const nextTrackIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrackIndex);
    setSelectedTrack(tracks[nextTrackIndex]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    const prevTrackIndex = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prevTrackIndex);
    setSelectedTrack(tracks[prevTrackIndex]);
    setIsPlaying(true);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(tracks[currentTrack].startTime);
    }
  }, [currentTrack]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (currentTrack === null) {
    return null;
  }

  // ShortString
  return (
    <div className="sticky bottom-0 bg-B3 text-white p-2 sm:p-4">
  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
    {/* Left side: Cover image and music title */}
    <div className="flex items-center w-full sm:w-auto">
      <img src={tracks[currentTrack].thumbnailUrl} alt="Cover" className="h-8 w-8 mr-2 sm:mr-4" />
      <div className="flex-grow sm:flex-grow-0">
        <div className="text-sm sm:text-md">{ShortString(tracks[currentTrack].title, 20)}</div>
        <div className="text-xs sm:text-sm">{tracks[currentTrack].singers}</div>
      </div>
    </div>

    {/* Center: Controllers */}
    <div className="flex flex-col items-center w-full sm:w-auto">
      <div className='flex gap-4 sm:gap-2 mb-2'>
        <button onClick={handlePrevTrack}>
          <FaStepBackward className="text-lg sm:text-xl" />
        </button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <FaPause className="text-lg sm:text-xl" /> : <FaPlay className="text-lg sm:text-xl" />}
        </button>
        <button onClick={handleNextTrack}>
          <FaStepForward className="text-lg sm:text-xl" />
        </button>
      </div>
      <div className="flex items-center w-full">
        <span className="text-xs sm:text-sm">{formatTime(played * tracks[currentTrack].endTime)}</span>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={(e) => playerRef.current.seekTo(parseFloat(e.target.value))}
          className="w-full mx-2 sm:mx-4 h-1 accent-white appearance-gray-500 bg-gray-500 rounded-full"
        />
        <span className="text-xs sm:text-sm">{tracks[currentTrack].duration}</span>
      </div>
    </div>

    {/* Right side: Volume control */}
    <div className="flex items-center w-full sm:w-auto mt-2 sm:mt-0">
      <span className="mr-2 text-sm">Volume</span>
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-full sm:w-32 h-1 accent-white appearance-gray-500 bg-gray-500 rounded-full"
      />
    </div>
  </div>

  <ReactPlayer
    ref={playerRef}
    url={tracks[currentTrack].url}
    playing={isPlaying}
    volume={volume}
    controls={false}
    width="0"
    height="0"
    onProgress={handleProgress}
    onEnded={handleNextTrack}
    config={{
      youtube: {
        playerVars: {
          start: tracks[currentTrack].startTime,
          end: tracks[currentTrack].endTime,
        },
      },
    }}
  />
</div>
  );
}

export default MusicPlayer;

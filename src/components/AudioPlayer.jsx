import React, { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const toggleLoop = () => {
    const audio = audioRef.current;
    audio.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  return (
    <div className='p-6 rounded-2xl shadow-xl bg-white max-w-md mx-auto'>
      <audio ref={audioRef} src={src} preload='auto' />

      <div className='mb-4'>
        <div
          className='h-2 bg-gray-300 rounded-full cursor-pointer'
          onClick={handleProgressClick}
        >
          <div
            className='h-2 bg-blue-500 rounded-full'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className='flex justify-center space-x-4'>
        <button
          onClick={() => audioRef.current.play()}
          className='px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600'
        >
          Play
        </button>
        <button
          onClick={() => audioRef.current.pause()}
          className='px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600'
        >
          Pause
        </button>
        <button
          onClick={toggleLoop}
          className={`px-4 py-2 rounded-xl text-white ${
            isLooping ? "bg-purple-600" : "bg-purple-400"
          } hover:bg-purple-700`}
        >
          {isLooping ? "Looping" : "Loop Off"}
        </button>
      </div>

      <div className='mt-4'>
        <label className='block text-gray-600 mb-1'>Volume</label>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={volume}
          onChange={handleVolumeChange}
          className='w-full'
        />
      </div>
    </div>
  );
};

export default AudioPlayer;

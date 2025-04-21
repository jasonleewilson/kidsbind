import React, { useRef, useEffect, useState } from "react";

const AudioPlayerWithVisualizer = ({ playlist }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    setAudioCtx(audioContext);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 1.5;
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      audioContext.close();
    };
  }, [currentTrack.src]);

  const handlePlay = () => {
    audioRef.current.play();
    if (audioCtx?.state === "suspended") {
      audioCtx.resume();
    }
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleLoopToggle = () => {
    const looping = !isLooping;
    setIsLooping(looping);
    audioRef.current.loop = looping;
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
  };

  const handleNext = () => {
    const newIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(newIndex);
    setTimeout(() => {
      if (audioCtx?.state === "suspended") audioCtx.resume();
      audioRef.current.play();
    }, 100); // small delay to ensure DOM updates
  };

  const handlePrevious = () => {
    const newIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(newIndex);
    setTimeout(() => {
      if (audioCtx?.state === "suspended") audioCtx.resume();
      audioRef.current.play();
    }, 100);
  };

  return (
    <div className='p-6 rounded-2xl shadow-xl bg-white max-w-xl mx-auto'>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className='w-full mb-4 rounded-xl border border-gray-300'
      />

      <h2 className='text-lg font-semibold text-center mb-4'>
        {currentTrack.name}
      </h2>

      <div className='flex justify-center space-x-4 mb-4'>
        <button
          onClick={handlePrevious}
          className='px-3 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500'
        >
          ⏮️ Prev
        </button>
        <button
          onClick={handlePlay}
          className='px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600'
        >
          ▶️ Play
        </button>
        <button
          onClick={handlePause}
          className='px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600'
        >
          ⏸️ Pause
        </button>
        <button
          onClick={handleNext}
          className='px-3 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500'
        >
          ⏭️ Next
        </button>
        <button
          onClick={handleLoopToggle}
          className={`px-4 py-2 rounded-xl text-white ${
            isLooping ? "bg-purple-600" : "bg-purple-400"
          } hover:bg-purple-700`}
        >
          {isLooping ? "Looping" : "Loop Off"}
        </button>
      </div>

      <div className='mt-2'>
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

      <audio ref={audioRef} src={currentTrack.src} preload='auto' hidden />
    </div>
  );
};

export default AudioPlayerWithVisualizer;

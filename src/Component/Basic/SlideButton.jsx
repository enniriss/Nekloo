import React, { useRef, useState, useEffect } from 'react';

const SlideButton = ({ onSuccess, disabled = false }) => {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

  const handleStart = (e) => {
  if (disabled) return;
  if (e.type === 'mousedown') {
    e.preventDefault();
  }
  setDragging(true);
};


  const handleMove = (e) => {
    if (!dragging || disabled) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width - 56); // 56 = slider width
    setOffsetX(x);
  };

  const handleEnd = () => {
    if (!dragging) return;
    const track = trackRef.current;
    const success = offsetX >= (track.offsetWidth - 60);
    setDragging(false);

    if (success) {
      setOffsetX(track.offsetWidth - 56);
      setTimeout(() => {
        onSuccess?.();
        setOffsetX(0);
      }, 300);
    } else {
      setOffsetX(0);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragging, offsetX]);

  return (
    <div
      ref={trackRef}
      className={`relative w-full h-14 rounded-full bg-gray-100 border border-gray-300 overflow-hidden select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium transition-opacity duration-200"
        style={{ opacity: 1 - offsetX / (trackRef.current?.offsetWidth || 1) }}
      >
        Glisser pour continuer
      </div>

      <div className="absolute top-0 left-0 h-full w-14 rounded-full bg-white border border-gray-400 shadow-md flex items-center justify-center text-xl text-gray-600 transition-transform duration-100" style={{ transform: `translateX(${offsetX}px)` }}>→</div>
    </div>
  );
};

export default SlideButton;
// src/components/User/AudioControls.jsx
import React from 'react';

const AudioControls = ({ isSpeaking, handleReadChapter, handleStopReading, handleContinueReading }) => {
  return (
    <div className="audio-buttons">
      <button
        className={`chapter-btn chapter-btn-secondary ${isSpeaking ? 'fixed-audio-btn' : ''}`}
        onClick={isSpeaking ? handleStopReading : handleReadChapter}
      >
        {isSpeaking ? "Dừng nghe" : "Nghe truyện"}
      </button>
      {!isSpeaking && (
        <button
          className="chapter-btn chapter-btn-secondary fixed-audio-btn"
          onClick={handleContinueReading}
        >
          Nghe tiếp
        </button>
      )}
    </div>
  );
};

export default AudioControls;

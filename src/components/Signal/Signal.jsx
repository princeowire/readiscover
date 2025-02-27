import React, { useState, useEffect } from "react";
import "./signal.css"; // Import external CSS

const Signal = () => {
  const text = "Readiscover";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 200); // Typing speed

      return () => clearTimeout(typingTimeout);
    } else {
      setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 2000); // Delay before restarting
    }
  }, [index]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Cursor blink

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="typing-container">
      <svg viewBox="0 0 500 50" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="50" fontSize="40" fontFamily="Arial" fill="black">
          {displayText}
          {showCursor && <tspan className="cursor">|</tspan>}
        </text>
      </svg>
    </div>
  );
};

export default Signal;

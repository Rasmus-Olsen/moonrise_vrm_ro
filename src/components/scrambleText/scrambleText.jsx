"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({
  text,
  speed = 50,
  duration = 1000,
  className = ""
}) {
  const [displayed, setDisplayed] = useState("");
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= duration) {
        setDisplayed(text);
        clearInterval(interval);
        return;
      }

      const progress = elapsed / duration;
      const revealedLength = Math.floor(progress * text.length);

      let scrambled = text
        .split("")
        .map((char, i) => (i < revealedLength ? char : randomChar()))
        .join("");

      setDisplayed(scrambled);
    }, speed);

    // Start fade out efter 5 sekunder
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);

      // Fjern teksten helt efter fade out animation (fx 1 sekund)
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [text, speed, duration]);

  if (!visible) return null;

  return (
    <span
      className={`${className} transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ display: "inline-block" }}
    >
      {displayed}
    </span>
  );
}

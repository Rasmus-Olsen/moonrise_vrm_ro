"use client";
import { useRef } from "react";

export default function Button({ children = "Button", buttonStyle = "btn-one" }) {
  const btnRef = useRef(null);

  const handleMouseEnter = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    btnRef.current.style.setProperty("--x", `${x}%`);
    btnRef.current.style.setProperty("--y", `${y}%`);
  };

  return (
    <div
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      className={`relative overflow-hidden border rounded-full px-9 py-3 cursor-pointer group inline-block ${buttonStyle === 'btn-one' ? 'border-black text-black' : 'border-white text-white'}`}
      style={{
        position: "relative",
        "--x": "50%",
        "--y": "50%"
      }}
    >
      <span className={`relative z-10 transition-colors duration-300 ${buttonStyle === 'btn-one' ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
        {children}
      </span>
      <span
        className={`absolute top-0 left-0 w-full h-full rounded-full transition-transform duration-300 scale-0 group-hover:scale-100 z-0 ${buttonStyle === 'btn-one' ? 'bg-black' : 'bg-white'}`}
        style={{
          transformOrigin: "var(--x) var(--y)"
        }}
      ></span>
    </div>
  );
}

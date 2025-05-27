"use client";
import { useRef, useState } from "react";

export default function Button({
  children = "Button",
  buttonStyle = "btn-one",
  type = "button",
  disabled = false,
  ...props
}) {
  const btnRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    btnRef.current.style.setProperty("--x", `${x}%`);
    btnRef.current.style.setProperty("--y", `${y}%`);
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    btnRef.current.style.setProperty("--leave-x", `${x}%`);
    btnRef.current.style.setProperty("--leave-y", `${y}%`);
    setIsHovered(false);
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={disabled ? undefined : handleMouseEnter}
      onMouseLeave={disabled ? undefined : handleMouseLeave}
      type={type}
      disabled={disabled}
      className={`relative overflow-hidden border rounded-full px-9 py-3 group inline-block ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${
        buttonStyle === "btn-one"
          ? "border-black text-black"
          : "border-white text-white"
      }`}
      style={{
        position: "relative",
        "--x": "50%",
        "--y": "50%",
        "--leave-x": "50%",
        "--leave-y": "50%"
      }}
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${
          buttonStyle === "btn-one"
            ? "group-hover:text-white"
            : "group-hover:text-black"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 z-0 ${
          buttonStyle === "btn-one" ? "bg-black" : "bg-white"
        }`}
        style={{
          transform: isHovered ? "scale(1)" : "scale(0)",
          opacity: isHovered ? 1 : 0,
          transformOrigin: isHovered
            ? "var(--x) var(--y)"
            : "var(--leave-x) var(--leave-y)",
          transitionProperty: "transform, opacity"
        }}
      ></span>
    </button>
  );
}

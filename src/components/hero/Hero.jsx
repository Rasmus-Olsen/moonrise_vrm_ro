"use client";

import TranslatedText from "@/components/translatedText/TranslatedText";
import AnimatedCharacters from "../animatedCharacters/animatedCharacters";
import { usePathname } from "next/navigation";

export default function Hero({
  backgroundSrc,
  title,
  text,
  buttonText,
  buttonLink,
  overlayOpacity = 0.4,
  height = "h-screen",
}) {
  const pathname = usePathname();
  const isHome = pathname === "/"; // Kun forsiden

  const isVideo = backgroundSrc?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className={`relative w-full ${height}`}>
      {isVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={backgroundSrc}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundSrc})` }}
        />
      )}

      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-8">
        <h1
          style={{ fontSize: "4rem", marginTop: "4rem" }}
          className={`font-bold ${
            text || (buttonText && buttonLink) ? "mb-4" : ""
          }`}
        >
          {isHome ? (
            <AnimatedCharacters text={title} />
          ) : (
            <TranslatedText>{title}</TranslatedText>
          )}
        </h1>

        {text && (
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            <TranslatedText>{text}</TranslatedText>
          </p>
        )}

        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-block bg-white text-black px-8 py-3 rounded-full 
                     font-semibold hover:bg-opacity-90 transition-all duration-300
                     transform hover:scale-105"
          >
            <TranslatedText>{buttonText}</TranslatedText>
          </a>
        )}
      </div>
    </div>
  );
}

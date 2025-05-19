"use client";

import TranslatedText from "@/components/translatedText/TranslatedText";
import AnimatedCharacters from "../animatedCharacters/animatedCharacters";

export default function Hero({
  backgroundSrc,
  title,
  text,
  buttonText,
  buttonLink,
  overlayOpacity = 0.4,
  height = "h-screen" // Default er fuld skærmhøjde, men kan overskrives
}) {
  // Automatisk detekter om det er video baseret på filendelsen
  const isVideo = backgroundSrc?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className={`relative w-full ${height}`}>
      {/* Baggrund - automatisk vælg mellem billede og video */}
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

      {/* Mørk overlay for bedre læsbarhed */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Indhold container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-8">
        {/* Title - kun margin-bottom hvis der er mere indhold */}
        <h1
          style={{ fontSize: "4rem" }}
          className={`font-bold ${
            text || (buttonText && buttonLink) ? "mb-4" : ""
          }`}
        >
          <AnimatedCharacters text={title} />
        </h1>

        {/* Text */}
        {text && (
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            <TranslatedText>{text}</TranslatedText>
          </p>
        )}

        {/* Button - vises kun hvis både buttonText og buttonLink er angivet */}
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

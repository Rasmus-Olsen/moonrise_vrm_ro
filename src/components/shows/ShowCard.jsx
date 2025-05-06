"use client";

import TranslatedText from "@/components/translatedText/TranslatedText";

const ShowCard = ({ image, title, description, date, adresse }) => {
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(date).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    adresse
  )}`;

  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        {image ? (
          <img src={image} alt={title} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-sm">
              <TranslatedText>Intet billede</TranslatedText>
            </span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-base font-semibold text-white mb-2">
          <TranslatedText>{title}</TranslatedText>
        </h3>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-blue-400/80">
            <TranslatedText>{formattedDate} - {formattedTime}</TranslatedText>
          </span>
        </div>
        <p style={{ fontSize: "14px" }}>
          <TranslatedText>{description}</TranslatedText>
        </p>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center text-sm">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400/60 bg-blue-400/10 px-2 py-0.5 rounded hover:bg-blue-400/20 hover:text-blue-400/80 transition-all duration-200 flex items-center space-x-1"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z" />
              </svg>
              <span>
                <TranslatedText>{adresse}</TranslatedText>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;

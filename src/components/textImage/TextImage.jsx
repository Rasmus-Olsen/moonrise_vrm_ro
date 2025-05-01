import React from "react";
import Image from "next/image";
import Link from "next/link";
import TranslatedText from '../translatedText/TranslatedText';

const TextImage = ({
  title,
  text1,
  text2,
  text3,
  text4,
  imageUrl,
  imagePosition = "left",
  buttonText,
  buttonLink,
}) => {
  const textContent = (
    <div className="flex flex-col space-y-4 justify-center h-full">
      <h2 className="text-4xl font-bold text-white">
        <TranslatedText>{title}</TranslatedText>
      </h2>
      {text1 && (
        <p className="text-lg text-white">
          <TranslatedText>{text1}</TranslatedText>
        </p>
      )}
      {text2 && (
        <p className="text-lg text-white">
          <TranslatedText>{text2}</TranslatedText>
        </p>
      )}
      {text3 && (
        <p className="text-lg text-white">
          <TranslatedText>{text3}</TranslatedText>
        </p>
      )}
      {text4 && (
        <p className="text-lg text-white">
          <TranslatedText>{text4}</TranslatedText>
        </p>
      )}
      {buttonText && buttonLink && (
        <Link href={buttonLink}>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <TranslatedText>{buttonText}</TranslatedText>
          </button>
        </Link>
      )}
    </div>
  );

  const imageContent = (
    <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-0">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 md:items-stretch md:min-h-[400px]">
      {imagePosition === 'left' ? (
        <>
          {imageContent}
          <div className="w-full md:w-1/2">{textContent}</div>
        </>
      ) : (
        <>
          <div className="w-full md:w-1/2">{textContent}</div>
          {imageContent}
        </>
      )}
    </div>
  );
};

export default TextImage;

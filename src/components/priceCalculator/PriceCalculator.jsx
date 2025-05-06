"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TranslatedText from "@/components/translatedText/TranslatedText";

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    price: 125000
  });

  const [droneCount, setDroneCount] = useState(50);

  // Beregn antal droner baseret på pris
  useEffect(() => {
    const price = formData.price;
    if (price <= 125000) setDroneCount(50);
    else if (price <= 200000) setDroneCount(100);
    else if (price <= 300000) setDroneCount(150);
    else if (price <= 400000) setDroneCount(200);
    else setDroneCount(250);
  }, [formData.price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Her kan vi sende data til backend
    console.log("Form submitted:", formData);
  };

  const formatPrice = (price) => {
    const formattedNumber = new Intl.NumberFormat("da-DK").format(price >= 500000 ? 500000 : price);
    return price >= 500000 ? `${formattedNumber} kr. +` : `${formattedNumber} kr.`;
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8">
          <TranslatedText>Priser</TranslatedText>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          <TranslatedText>
            Hos Moonrise kan du vælge dit budget for showet, og på baggrund af dine ønsker sender vi et
            skræddersyet tilbud. På den måde sikrer vi, at du får den bedste løsning til netop dit arrangement.
          </TranslatedText>
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square">
              <Image
                src={`/assets/images/drone-${droneCount}.png`}
                alt={<TranslatedText>{`Visualisering af ${droneCount} droner`}</TranslatedText>}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2">
                  <TranslatedText>Navn</TranslatedText>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                  aria-label={<TranslatedText>Indtast dit navn</TranslatedText>}
                />
              </div>

              <div>
                <label className="block mb-2">
                  <TranslatedText>Email</TranslatedText>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                  aria-label={<TranslatedText>Indtast din email</TranslatedText>}
                />
              </div>

              <div>
                <label className="block mb-2">
                  <TranslatedText>Budget</TranslatedText>
                </label>
                <input
                  type="range"
                  min="125000"
                  max="500000"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                  aria-label={<TranslatedText>Vælg dit budget</TranslatedText>}
                />
                <div className="text-2xl font-bold text-center mt-4">
                  {formatPrice(formData.price)}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition-colors"
              >
                <TranslatedText>Få tilsendt tilbud</TranslatedText>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;

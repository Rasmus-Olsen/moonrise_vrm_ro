"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TranslatedText from "@/components/translatedText/TranslatedText";
import { savePrice } from '@/lib/supabase';

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    price: 125000,
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [droneCount, setDroneCount] = useState(50);
  const FIXED_COST = 10000;

  // Opdater droneCount når prisen ændres
  useEffect(() => {
    const price = formData.price;
    if (price <= 200000) setDroneCount(50);
    else if (price <= 275000) setDroneCount(100);
    else if (price <= 350000) setDroneCount(150);
    else if (price <= 425000) setDroneCount(200);
    else setDroneCount(250);
  }, [formData.price]);

  const handlePriceChange = (newPrice) => {
    setFormData((prev) => ({ ...prev, price: newPrice }));
  };

  const formatPrice = (price) => {
    const formattedNumber = new Intl.NumberFormat("da-DK").format(
      price >= 500000 ? 500000 : price
    );
    return price >= 500000
      ? `${formattedNumber} kr. +`
      : `${formattedNumber} kr.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Send PDF via API
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          droneCount,
          fixedCost: FIXED_COST,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || "error sending quote");
      }

      // Gem i Supabase
      await savePrice(
        formData.name,
        formData.email,
        formData.price.toString(),
        formData.newsletter
      );

      // Nulstil form
      setFormData({
        name: "",
        email: "",
        price: 125000,
        newsletter: false,
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8">
          <TranslatedText>Priser</TranslatedText>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          <TranslatedText>
            Hos Moonrise kan du vælge dit budget for showet, og på baggrund af
            dine ønsker sender vi et skræddersyet tilbud. På den måde sikrer vi,
            at du får den bedste løsning til netop dit arrangement.
          </TranslatedText>
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square">
              <Image
                src={`/assets/images/drone-${droneCount}.png`}
                alt={
                  <TranslatedText>{`Visualisering af ${droneCount} droner`}</TranslatedText>
                }
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
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                  disabled={isSubmitting}
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                  disabled={isSubmitting}
                  aria-label={
                    <TranslatedText>Indtast din email</TranslatedText>
                  }
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
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                  disabled={isSubmitting}
                  aria-label={<TranslatedText>Vælg dit budget</TranslatedText>}
                />
                <div className="text-2xl font-bold text-center mt-4">
                  {formatPrice(formData.price)}
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      setFormData({ ...formData, newsletter: e.target.checked })
                    }
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-700 bg-gray-800 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  <span>
                    <TranslatedText>Ja tak til nyhedsbrev</TranslatedText>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                disabled={isSubmitting}
              >
                <TranslatedText>
                  {isSubmitting ? "Sender..." : "Send tilbud"}
                </TranslatedText>
              </button>

              {/* Vis status besked */}
              {submitStatus && (
                <p
                  className={`mt-4 text-center text-lg font-medium ${
                    submitStatus === "error" ? "text-red-500" : "text-blue-400"
                  } !text-opacity-100`}
                  style={{
                    color: submitStatus === "error" ? "#ef4444" : "#60a5fa",
                  }}
                >
                  <TranslatedText>
                    {submitStatus === "error"
                      ? "Der skete en fejl - prøv igen"
                      : "Tak! Vi har sendt tilbuddet til din mail"}
                  </TranslatedText>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;

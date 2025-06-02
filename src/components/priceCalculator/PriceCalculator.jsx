"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TranslatedText from "@/components/translatedText/TranslatedText";
import { savePrice } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

const PriceCalculator = () => {
  const btnRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { currentLang } = useLanguage();

  const handleMouseEnter = (e) => {
    if (isSubmitting) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    btnRef.current.style.setProperty("--x", `${x}%`);
    btnRef.current.style.setProperty("--y", `${y}%`);
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (isSubmitting) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    btnRef.current.style.setProperty("--leave-x", `${x}%`);
    btnRef.current.style.setProperty("--leave-y", `${y}%`);
    setIsHovered(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    price: 125000,
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Navn er påkrævet";
    } else if (formData.name.length < 2) {
      newErrors.name = "Navn skal være mindst 2 tegn";
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email er påkrævet";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ugyldig email adresse";
    }

    // Validate price
    if (formData.price < 125000 || formData.price > 500000) {
      const currency = currentLang === 'en' ? 'DKK' : 'kr.';
      const min = new Intl.NumberFormat('da-DK').format(125000);
      const max = new Intl.NumberFormat('da-DK').format(500000);
      newErrors.price = currentLang === 'en'
        ? `Price must be between ${min} ${currency} and ${max} ${currency}`
        : `Pris skal være mellem ${min} ${currency} og ${max} ${currency}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [droneCount, setDroneCount] = useState(50);
  const FIXED_COST = 10000;

  // Fjern status besked efter 5 sekunder
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

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
    const currency = currentLang === 'en' ? 'DKK' : 'kr.';
    const formattedNumber = new Intl.NumberFormat('da-DK').format(
      price >= 500000 ? 500000 : price
    );
    return price >= 500000
      ? `${formattedNumber} ${currency} +`
      : `${formattedNumber} ${currency}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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
          language: currentLang, // Tilføj det aktuelle sprog
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
    <div className="bg-black text-white py-10">
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
                src={`/assets/images/drone-${droneCount}.webp`}
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
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  onBlur={() => {
                    if (!formData.name.trim()) {
                      setErrors({ ...errors, name: "Navn er påkrævet" });
                    } else if (formData.name.length < 2) {
                      setErrors({
                        ...errors,
                        name: "Navn skal være mindst 2 tegn",
                      });
                    }
                  }}
                  className={`w-full px-4 py-2 rounded bg-gray-800 border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } focus:border-blue-500 focus:outline-none`}
                  required
                  disabled={isSubmitting}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-label={<TranslatedText>Indtast dit navn</TranslatedText>}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    <TranslatedText>{errors.name}</TranslatedText>
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">
                  <TranslatedText>Email</TranslatedText>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                  onBlur={() => {
                    const emailRegex =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!formData.email.trim()) {
                      setErrors({ ...errors, email: "Email er påkrævet" });
                    } else if (!emailRegex.test(formData.email)) {
                      setErrors({ ...errors, email: "Ugyldig email adresse" });
                    }
                  }}
                  className={`w-full px-4 py-2 rounded bg-gray-800 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } focus:border-blue-500 focus:outline-none`}
                  required
                  disabled={isSubmitting}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-label={
                    <TranslatedText>Indtast din email</TranslatedText>
                  }
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    <TranslatedText>{errors.email}</TranslatedText>
                  </p>
                )}
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
                ref={btnRef}
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full relative overflow-hidden border border-white text-white py-2 px-4 rounded-lg group disabled:opacity-50"
                style={{
                  "--x": "50%",
                  "--y": "50%",
                  "--leave-x": "50%",
                  "--leave-y": "50%",
                }}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  <TranslatedText>
                    {isSubmitting ? "Sender..." : "Send tilbud"}
                  </TranslatedText>
                </span>
                <span
                  className="absolute top-0 left-0 w-full h-full bg-white transition-all duration-300 rounded-lg z-0"
                  style={{
                    transform: isHovered ? "scale(1)" : "scale(0)",
                    opacity: isHovered ? 1 : 0,
                    transformOrigin: isHovered
                      ? "var(--x) var(--y)"
                      : "var(--leave-x) var(--leave-y)",
                  }}
                ></span>
              </button>

              {/* Status besked container med fast højde */}
              <div className="h-16 relative">
                {submitStatus && (
                  <p
                    className={`absolute inset-0 flex items-center justify-center text-lg font-medium ${
                      submitStatus === "error"
                        ? "text-red-500"
                        : "text-blue-400"
                    }`}
                  >
                    <TranslatedText>
                      {submitStatus === "error"
                        ? "Der skete en fejl - prøv igen"
                        : "Tak! Vi har sendt tilbuddet til din mail"}
                    </TranslatedText>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;

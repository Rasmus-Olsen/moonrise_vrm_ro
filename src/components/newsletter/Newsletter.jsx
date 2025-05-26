"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TranslatedText from "@/components/translatedText/TranslatedText";
import Button from "@/components/button/Button";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { saveNewsletter } from "@/lib/supabase";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Fjern status besked efter 5 sekunder
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus("");

    // Validate email
    if (!email.trim()) {
      setErrors({ email: "Email er påkrævet" });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Ugyldig email adresse" });
      return;
    }

    setIsSubmitting(true);

    const result = await saveNewsletter(email);
    setStatus(result.status);
    setEmail(""); // Altid nulstil email feltet
    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Kort sektion */}
          <div className="flex-1 order-2 md:order-1">
            <div className="relative h-[300px] w-full grayscale">
              <Image
                src="/assets/images/iframe.webp"
                alt="Moonrise location"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Kontakt og nyhedsbrev sektion */}
          <div className="flex-1 flex flex-col justify-between order-1 md:order-2">
            {/* Kontakt information */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-white">
                  <TranslatedText>Moonrise Aps</TranslatedText>
                </p>
                <p className="text-white">
                  <TranslatedText>Jernholmen 2 2650</TranslatedText>
                </p>
                <p className="text-white">
                  <TranslatedText>Hvidovre Danmark</TranslatedText>
                </p>
              </div>

              <div className="space-y-2">
                <a
                  href="tel:+4512345678"
                  className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
                >
                  <FaPhone className="text-[#CAE7EC]" />
                  +45 12 34 56 78
                </a>
                <a
                  href="mailto:hello@moonrise.dk"
                  className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
                >
                  <FaEnvelope className="text-[#CAE7EC]" />
                  hello@moonrise.dk
                </a>
              </div>
            </div>

            {/* Nyhedsbrev og sociale medier */}
            <div>
              {/* Nyhedsbrev formular */}
              <div className="space-y-4">
                <p className="text-white mb-2">
                  <TranslatedText>Tilmeld dig nyhedsbrevet</TranslatedText>
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="flex items-stretch gap-2">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({});
                        }}
                        onBlur={() => {
                          if (!email.trim()) {
                            setErrors({ email: "Email er påkrævet" });
                          } else if (!validateEmail(email)) {
                            setErrors({ email: "Ugyldig email adresse" });
                          }
                        }}
                        placeholder="Email"
                        required
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full bg-white rounded-md px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--blue)] transition-colors ${errors.email ? 'border-2 border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                          <TranslatedText>{errors.email}</TranslatedText>
                        </p>
                      )}
                    </div>
                    <div className="rounded-md overflow-hidden">
                      <Button
                        buttonStyle="btn-two"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <TranslatedText>
                          {isSubmitting ? "Tilmelder..." : "Tilmeld mig!"}
                        </TranslatedText>
                      </Button>
                    </div>
                  </div>
                  {/* Status besked container med fast højde */}
                  <div className="h-8 relative">
                    {status && (
                      <p
                        className={`absolute inset-0 flex items-center text-sm font-medium ${
                          status === "success"
                            ? "text-green-400"
                            : "text-[--blue]"
                        }`}
                      >
                        <TranslatedText>
                          {status === "success"
                            ? "Tak! Du er nu tilmeldt vores nyhedsbrev"
                            : "Du er allerede tilmeldt vores nyhedsbrev"}
                        </TranslatedText>
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Sociale medier links */}
              <div className="flex gap-4">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/assets/images/insta.webp"
                    alt="Instagram"
                    width={32}
                    height={32}
                  />
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/assets/images/facebook.webp"
                    alt="Facebook"
                    width={32}
                    height={32}
                  />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/assets/images/linkedIn.webp"
                    alt="LinkedIn"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

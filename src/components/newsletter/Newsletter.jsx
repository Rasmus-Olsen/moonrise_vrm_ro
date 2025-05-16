"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TranslatedText from "@/components/translatedText/TranslatedText";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { saveNewsletter } from "@/lib/supabase";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const result = await saveNewsletter(email);
    setStatus(result.status);

    if (result.status === 'success') {
      setEmail("");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Kort sektion */}
          <div className="flex-1">
            <div className="relative h-[300px] w-full grayscale">
              <Image
                src="/assets/images/iframe.png"
                alt="Moonrise location"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Kontakt og nyhedsbrev sektion */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-white"><TranslatedText>Moonrise Aps</TranslatedText></p>
                <p className="text-white"><TranslatedText>Jernholmen 2 2650</TranslatedText></p>
                <p className="text-white"><TranslatedText>Hvidovre Danmark</TranslatedText></p>
              </div>

              <div className="space-y-2">
                <a href="tel:+4512345678" className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors">
                  <FaPhone className="text-[#CAE7EC]" />
                  +45 12 34 56 78
                </a>
                <a href="mailto:hello@moonrise.dk" className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors">
                  <FaEnvelope className="text-[#CAE7EC]" />
                  hello@moonrise.dk
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white"><TranslatedText>Tilmeld dig nyhedsbrevet</TranslatedText></p>
              <form onSubmit={handleSubmit} className="flex items-stretch gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="flex-1 bg-white rounded-md px-4 py-2 text-gray-900 placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="bg-[#CAE7EC] text-gray-900 px-4 py-2 rounded-md hover:bg-[#B8D8DE] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <TranslatedText>Tilmeld mig!</TranslatedText>
                </button>
              </form>
            </div>

            <div className="flex gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/assets/images/insta.png"
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
                  src="/assets/images/facebook.png"
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
                  src="/assets/images/linkedIn.png"
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
  );
};

export default Newsletter;

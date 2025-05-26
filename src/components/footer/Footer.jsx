"use client";

import Image from "next/image";
import Link from "next/link";
import TranslatedText from "@/components/translatedText/TranslatedText";

export default function Footer() {
  return (
    <footer className="py-6 mt-16">
      <div className="container grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-3 md:gap-16">
        <div className="space-y-4">
          <h3 className="mb-4 text-xl">
            <TranslatedText>Oplysninger</TranslatedText>
          </h3>
          <div className="space-y-2">
            <p className="mb-0 font-bold">Moonrise ApS</p>
            <p className="mb-0">Jernholmen 2, 2650 Hvidovre</p>
            <Link
              href="tel:+4540271737"
              className="block transition-opacity hover:opacity-80"
            >
              +45 40 27 17 37
            </Link>
            <Link
              href="mailto:hello@moonrise.dk"
              className="block transition-opacity hover:opacity-80"
            >
              hello@moonrise.dk
            </Link>
          </div>
        </div>

        {/* Adresse/Kort */}
        <div className="space-y-4">
          <h3 className="mb-4 text-xl">
            <TranslatedText>Adresse</TranslatedText>
          </h3>
          <div className="relative h-[300px] w-full grayscale">
            <Image
              src="/assets/images/iframe.webp"
              alt="Moonrise location"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Social links */}
        <div className="space-y-4">
          <h3 className="mb-4 text-xl">
            <TranslatedText>Social links</TranslatedText>
          </h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.instagram.com/moonrise.dk/"
              target="_blank"
              className="transition-opacity hover:opacity-80"
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
              className="transition-opacity hover:opacity-80"
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
              className="transition-opacity hover:opacity-80"
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

      <div className="container px-4 mx-auto mt-4">
        <p className="text-sm opacity-80">
          All rights reserved Moonrise ApS {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

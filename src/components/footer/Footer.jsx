"use client";

import Image from "next/image";
import Link from "next/link";
import TranslatedText from "@/components/translatedText/TranslatedText";

export default function Footer() {
  return (
    <footer className="py-6 my-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 px-4">
        <div className="space-y-4">
          <h3 className="text-xl mb-4">
            <TranslatedText>Oplysninger</TranslatedText>
          </h3>
          <div className="space-y-2">
            <p className="font-bold mb-0">Moonrise ApS</p>
            <p className="mb-0">Jernholmen 2 2650</p>
            <p>Hvidovre Danmark</p>
            <a
              href="tel:+4512345678"
              className="block hover:opacity-80 transition-opacity"
            >
              +45 12 34 56 78
            </a>
            <a
              href="mailto:hello@moonrise.dk"
              className="block hover:opacity-80 transition-opacity"
            >
              hello@moonrise.dk
            </a>
          </div>
        </div>

        {/* Adresse/Kort */}
        <div className="space-y-4">
          <h3 className="text-xl mb-4">
            <TranslatedText>Adresse</TranslatedText>
          </h3>
          <div className="relative h-[300px] w-full grayscale">
            <Image
              src="/assets/images/iframe.png"
              alt="Moonrise location"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Social links */}
        <div className="space-y-4">
          <h3 className="text-xl mb-4">
            <TranslatedText>Social links</TranslatedText>
          </h3>
          <div className="flex space-x-4">
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

      <div className="container mx-auto px-4 mt-4">
        <p className="text-sm opacity-80">
          All rights reserved Moonrise ApS {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

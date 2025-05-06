"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitch from "@/components/languageSwitcher/LanguageSwitch";
import TranslatedText from "@/components/translatedText/TranslatedText";
import BurgerMenu from "./BurgerMenu";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { path: "/pages/shows", label: "Shows" },
    { path: "/pages/service", label: "Service" },
    { path: "/pages/prices", label: "Priser" },
    { path: "/pages/contact", label: "Kontakt" },
  ];

  return (
    <nav className="relative z-50">
      <div className="container mx-auto">
        {/* Desktop and Mobile Header */}
        <div className="flex justify-between items-center p-4">
          <Link
            href="/"
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            Moonrise
          </Link>

          {/* Burger Menu Button - Only visible on mobile */}
          <BurgerMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`hover:opacity-80 transition-opacity ${
                  pathname === route.path ? "opacity-100" : "opacity-80"
                }`}
              >
                <TranslatedText>{route.label}</TranslatedText>
              </Link>
            ))}
            <div className="border-l border-opacity-20 pl-6">
              <LanguageSwitch />
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Absolute positioned */}
        <div
          className={`
            absolute left-0 right-0 w-full bg-[var(--background)]
            transition-all duration-300 ease-in-out md:hidden
            ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          <div className="flex flex-col items-center space-y-6 py-4 pb-8">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`text-lg hover:opacity-80 transition-opacity ${
                  pathname === route.path ? "opacity-100" : "opacity-80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <TranslatedText>{route.label}</TranslatedText>
              </Link>
            ))}
            <div className="pt-4">
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

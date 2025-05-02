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
    <nav className="p-4">
      <div className="container mx-auto">
        {/* Desktop and Mobile Header */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
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

        {/* Mobile Navigation - Only visible when menu is open */}
        <div className={`${isOpen ? 'flex' : 'hidden'} md:hidden flex-col items-center space-y-4 pt-4`}>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`hover:opacity-80 transition-opacity ${
                pathname === route.path ? "opacity-100" : "opacity-80"
              }`}
              onClick={() => setIsOpen(false)} // Close menu when clicking a link
            >
              <TranslatedText>{route.label}</TranslatedText>
            </Link>
          ))}
          <div className="pt-4">
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}

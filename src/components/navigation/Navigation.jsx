"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitch from "@/components/languageSwitcher/LanguageSwitch";
import TranslatedText from "@/components/translatedText/TranslatedText";
import BurgerMenu from "./BurgerMenu";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const routes = [
    { path: "/pages/prices", label: "Priser" },
    { path: "/pages/service", label: "Service" },
    { path: "/pages/contact", label: "Kontakt" },
    { path: "/pages/shows", label: "Shows" }
  ];

  useEffect(() => {
    if (pathname !== "/") {
      // Hvis vi ikke er på forsiden, vis navigationen direkte
      setVisible(true);
    }
  }, [pathname]);

  return (
    <nav
      id="main-nav"
      className={`
        fixed top-0 left-0 w-full z-50 bg-[var(--background)]
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
      `}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center md:px-0 p-4">
          <Link
            href="/"
            className={`text-2xl font-bold relative group transition-colors ${
              pathname === "/" ? "text-[var(--blue)]" : ""
            } hover:text-[var(--navy)]`}
          >
            <TranslatedText>Moonrise</TranslatedText>
          </Link>

          <BurgerMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

          <div className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`relative group transition-all ${
                  pathname === route.path ? "text-[var(--blue)]" : ""
                }`}
              >
                <span className="group-hover:text-[var(--blue)] transition-colors">
                  <TranslatedText>{route.label}</TranslatedText>
                </span>
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--blue)] transform origin-left transition-transform duration-300 ${
                    pathname === route.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}
            <div className="border-l border-opacity-20 pl-6 border-white"> 
              <LanguageSwitch />
            </div>
          </div>
        </div>

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
                className={`text-lg relative group hover:text-[var(--blue)] transition-colors ${
                  pathname === route.path ? "opacity-100" : "opacity-80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="group-hover:text-[var(--blue)] transition-colors">
                  <TranslatedText>{route.label}</TranslatedText>
                </span>
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--blue)] transform origin-left transition-transform duration-300 ${
                    pathname === route.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
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

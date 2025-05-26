"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaComments,
  FaPencilRuler,
  FaClipboardCheck,
  FaPlay
} from "react-icons/fa";
import Process from "@/components/process/Process";

// Lazy load components
const TextImageSlider = dynamic(
  () => import("@/components/textImageSlider/TextImageSlider"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-700 h-[400px] rounded-lg"></div>
    )
  }
);
const TranslatedText = dynamic(() =>
  import("@/components/translatedText/TranslatedText")
);
const Stats = dynamic(() => import("@/components/stats/Stats"), {
  loading: () => (
    <div className="animate-pulse bg-gray-700 h-[300px] rounded-lg"></div>
  )
});
const Button = dynamic(() => import("@/components/button/Button"));

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef([]);

  useEffect(() => {
    const navShown = { current: false };

    const showNav = () => {
      if (navShown.current) return;
      navShown.current = true;

      const nav = document.getElementById("main-nav");
      if (nav) {
        gsap.to(nav, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        });
      }

      window.removeEventListener("scroll", handleScroll);
    };

    const handleScroll = () => showNav();

    const timer = setTimeout(showNav, 3000);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Kør animation når elementet er synligt
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 2,
              ease: "power3.out"
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    // Sæt initial position og observer på alle sektioner
    sectionRef.current.forEach((section) => {
      if (section) {
        gsap.set(section, {
          x: -200,
          opacity: 0
        });
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero
        backgroundSrc="/assets/movies/moonrise_long.mp4"
        overlayOpacity={0}
        height="h-[400px] lg:h-[80vh]"
        title="Velkommen til Moonrise"
      />
      <div className="container mx-auto px-4 md:px-0 py-6 space-y-16">
        <TextImageSlider
          title="Hvad er et dronelysshow?"
          text1="Forestil dig en stjerneklar aften, hvor himlen fyldes med lys, mønstre og farver - alt sammen skabt af vores innovative drone lysshow. En aften hvor du oplever noget særligt, som du husker lang tid efter. Dette er vores mission hos Moonrise."
          text2="Moonrise er den første danske virksomhed certificeret til at udføre drone lysshows. Vi kombinerer teknologi og underholdning for at skabe spektakulære og mindeværdige oplevelser. Med mere end 20 års erfaring inden for liveevents og scenekunst. Hertil 10 års professionel erfaring med droner er vi jeres betroede partner til innovative og bæredygtige drone lysshows."
          text3="Vil du høre mere om mulighederne med et drone lysshow?"
          images={["/assets/images/drone-legion.webp"]}
          sliderPosition="right"
          overlayOpacity={0}
        />
      </div>
      <div className="w-full bg-black py-16">
        <div
          className="container mx-auto px-4 md:px-8"
          ref={(el) => (sectionRef.current[0] = el)}
        >
          <h2 className="text-center mb-4">
            <TranslatedText>
              Hvor mange droner skal der til et show?
            </TranslatedText>
          </h2>
          <p className="text-center mb-8 text-gray-300">
            <TranslatedText>
              Antal droner afhænger af showets størrelse, kompleksitet og ønsket
              budget.
            </TranslatedText>
            <br />
            <TranslatedText>
              Vi hjælper med at visualisere det nødvendige antal til det
              konkrete behov og budget.
            </TranslatedText>
            <br />
            <TranslatedText>
              Eksemplerne herunder giver et indbryk af forskellene:
            </TranslatedText>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[50, 100, 150, 200, 250].map((count) => (
              <div key={count} className="flex flex-col items-center grid-item">
                <div className="relative w-full aspect-video mb-2">
                  <img
                    src={`/assets/images/drone-${count}.webp`}
                    alt={`${count} droner`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center font-semibold">
                  <TranslatedText>{count} droner</TranslatedText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-0 py-6 space-y-16">
        <TextImageSlider
          title="Prisstruktur hos Moonrise"
          text1="Hos Moonrise er der forskel på prisen afhængigt af, om kunden vælger et prelavet droneshow eller et skræddersyet  show. Prelaved shows er færdigudviklede koncepter, hvor animationer, lyssætning og sekvenser allerede er planlagt. De kan tilpasses en smule med eksempelvis farver og branding, men kræver mindre udviklingstid og godkendelsesarbejde - og er derfor en mere prisvenlig løsning."
          text2="Custom shows er derimod specialudviklede efter kundens ønsker og behov. Her designes hele showet fra bunden med unikke animationer, storytelling og koreografi."
          text3="Det kræver mere kreativt arbejde, flere godkendelsesprocesser og tekniske tests, hvilket gør custom shows markant dyrere end de færdige koncepter."
          images={["/assets/images/drone-mand.webp"]}

          sliderPosition="right"
          overlayOpacity={0}
          buttonText="Kontakt os"
          buttonLink="pages/contact"
          buttonStyle="btn-two"
        />
      </div>

      <Stats
        title="Moonrise i tal"
        items={[
          {
            title: "Flere deltagere",
            value: 65,
            suffix: "%",
            description: "Stigning i begivenhedsdeltagelse"
          },
          {
            title: "Støj reduktion",
            value: 90,
            suffix: "%",
            description: "Sammenlignet med traditionelt fyrværkeri"
          },
          {
            title: "Mindre CO₂-udledning",
            value: 60,
            suffix: "%",
            description: "Reduktion af CO2-fodaftryk"
          },
          {
            title: "Mindre affald",
            value: 500,
            suffix: "kg",
            description: "I forhold til mellemstore fyrværkeri shows"
          }
        ]}
      />

      <Process
        title="Din rejse mod et lysshow"
        description="Fra første kontakt til færdigt show - her er vores proces."
        items={[
          {
            icon: FaMapMarkerAlt,
            title: "Site Authorization & Assessment",
            description:
              "Vi indhenter tilladelser og vurderer lokationen, så showet kan afvikles sikkert og lovligt."
          },
          {
            icon: FaComments,
            title: "Story Board Consultation",
            description:
              "Vi drøfter dine idéer og behov og skaber en tydelig vision, som matcher dit event perfekt."
          },
          {
            icon: FaPencilRuler,
            title: "Design & Planning",
            description:
              "Vi udvikler et visuelt storyboard og tilpasser showets design, lys og timing til dine ønsker."
          },
          {
            icon: FaClipboardCheck,
            title: "Pre-Flight Run-Through",
            description:
              "Hele showet testes i en generalprøve, hvor vi finjusterer detaljer og sikrer, alt fungerer."
          },
          {
            icon: FaPlay,
            title: "Show Time",
            description:
              "Dronerne går i luften! Du læner dig tilbage og nyder et uforglemmeligt og unikt lysshow."
          }
        ]}
      />

<div
        className="container mt-16 mx-auto px-4"
        ref={(el) => (sectionRef.current[1] = el)}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="mb-8">
            <TranslatedText>
              Teknisk baggrund og erfaring hos Moonrise
            </TranslatedText>
          </h2>
          <div className="space-y-6">
            <p>
              <TranslatedText>
                Moonrise bygger på en solid teknisk baggrund gennem deres
                tilknytning til SimpleCreations – en virksomhed med over 15 års
                erfaring inden for teater- og eventproduktion. SimpleCreations
                har en prisvindende baggrund i teknisk teaterdesign og
                balancerer teknologi og design i deres projekter. Denne erfaring
                omfatter blandt andet udlejning af professionelt kameraudstyr og
                tekniske løsninger til film- og eventbranchen.
              </TranslatedText>
            </p>
            <p>
              <TranslatedText>
                Teamet bag Moonrise har arbejdet intensivt med teknik, udstyr og
                produktion i flere år, hvilket giver dem en solid forståelse for
                både det kreative og det tekniske aspekt af at levere store
                visuelle oplevelser. Denne erfaring gør Moonrise i stand til at
                kombinere avanceret droneteknologi med sikkerhed, kvalitet og
                høj professionalisme i deres lysdroneshow.
              </TranslatedText>
            </p>
            <p>
              <TranslatedText>
                Deres tekniske ekspertise sikrer, at hvert show er gennemført
                med præcision og kreativitet, hvilket giver kunderne en unik og
                mindeværdig oplevelse.
              </TranslatedText>
            </p>
          </div>

          <Link href="/pages/contact" className="mt-6 inline-block">
            <Button buttonStyle="btn-two">
              <TranslatedText>Læs mere her</TranslatedText>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

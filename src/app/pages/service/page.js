"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import {
  FaMapMarkerAlt,
  FaComments,
  FaPencilRuler,
  FaClipboardCheck,
  FaPlay
} from "react-icons/fa";

// Lazy load components
const TranslatedText = dynamic(() =>
  import("@/components/translatedText/TranslatedText")
);
const TextImageSlider = dynamic(
  () => import("@/components/textImageSlider/TextImageSlider"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-700 h-[400px] rounded-lg"></div>
    )
  }
);
const Stats = dynamic(() => import("@/components/stats/Stats"), {
  loading: () => (
    <div className="animate-pulse bg-gray-700 h-[300px] rounded-lg"></div>
  )
});
const Process = dynamic(() => import("@/components/process/Process"), {
  loading: () => (
    <div className="animate-pulse bg-gray-700 h-[400px] rounded-lg"></div>
  )
});

export default function Service() {
  return (
    <>
      <Hero
        backgroundSrc="/assets/images/om-moonrise.webp"
        title="Service"
        overlayOpacity={0}
        height="h-[50vh]"
      />

      <div className="container mx-auto px-4 md:px-0 py-6 space-y-16">
        <TextImageSlider
          title="Første godkendte droneshow-udbyder i Danmark"
          text1="Moonrise er stolte af at være de første i Danmark, der har opnået officiel godkendelse til at afholde professionelle droneshows.
At få tilladelse til at gennemføre lysdroneshows kræver, at man lever op til strenge krav om sikkerhed, teknologi og koordinering, hvilket understreger vores seriøsitet og tekniske ekspertise."
          text2="Denne godkendelse betyder, at vi kan tilbyde unikke visuelle oplevelser, som er fuldt lovlige og gennemføres med størst muligt hensyn til både publikum, omgivelser og myndighedernes regler.
Vores erfaring med tekniske produktioner gennem SimpleCreations, kombineret med en dyb forståelse for sikkerhed og avanceret dronestyring, gør os i stand til at levere spektakulære shows, der både imponerer og skaber tryghed."
          text3="Hos Moonrise arbejder vi hele tiden på at udvikle vores shows og løfte standarden for, hvad et droneshow kan være i Danmark – både kreativt, teknisk og miljømæssigt."
          text4=""
          images={["/assets/images/drone-legion.webp"]}
          sliderPosition="right"
        />

        <TextImageSlider
          title="Vælg mellem Prelavet eller Custom Droneshow"
          text1="Hos Moonrise tilbyder vi to typer droneshows, så vi kan matche både jeres ønsker og budget."
          text2="Prelavet Show: Vores prelavede shows er færdigudviklede opsætninger, hvor koreografi og lysdesign allerede er planlagt. Disse shows kan tilpasses med enkelte elementer som farver eller logoer, men kræver minimal udviklingstid og er derfor en mere prisvenlig løsning – perfekt, hvis I ønsker en hurtig og effektiv booking."
          text3="Custom Show: Ønsker I en helt unik oplevelse, skaber vi et custom droneshow, designet specifikt til jeres arrangement. Her udvikler vi figurer, animationer og storytelling fra bunden baseret på jeres ideer, brand eller tema. Et custom show giver fuld kreativ frihed, men kræver mere planlægning, udvikling og godkendelse – og derfor også en højere pris."
          text4="Uanset hvad I vælger, arbejder vi tæt sammen med jer for at sikre, at showet skaber præcis den oplevelse, I ønsker."
          sliderPosition="left"
          images={["/assets/images/render-1.webp", "/assets/images/render-2.webp", "/assets/images/render-3.webp"]}
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

      <div className="container mx-auto px-4 md:px-0 py-6 space-y-16">
        <TextImageSlider
          title="Første godkendte droneshow-udbyder i Danmark"
          text1="Moonrise er stolte af at være de første i Danmark, der har opnået officiel godkendelse til at afholde professionelle droneshows.
At få tilladelse til at gennemføre lysdroneshows kræver, at man lever op til strenge krav om sikkerhed, teknologi og koordinering, hvilket understreger vores seriøsitet og tekniske ekspertise."
          text2="Denne godkendelse betyder, at vi kan tilbyde unikke visuelle oplevelser, som er fuldt lovlige og gennemføres med størst muligt hensyn til både publikum, omgivelser og myndighedernes regler.
Vores erfaring med tekniske produktioner gennem SimpleCreations, kombineret med en dyb forståelse for sikkerhed og avanceret dronestyring, gør os i stand til at levere spektakulære shows, der både imponerer og skaber tryghed."
          text3="Hos Moonrise arbejder vi hele tiden på at udvikle vores shows og løfte standarden for, hvad et droneshow kan være i Danmark – både kreativt, teknisk og miljømæssigt."
          text4=""
          images={[
            "/assets/images/certifikat.webp",
            "/assets/images/drone-mand.webp",
            "/assets/images/drone-legion.webp",
            "/assets/images/om-moonrise.webp",
            "/assets/images/contact.webp"
          ]}
          sliderPosition="right"
        />
      </div>
    </>
  );
}

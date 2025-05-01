'use client';

import TextImageSlider from "@/components/textImageSlider/TextImageSlider";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 space-y-16">
      <TextImageSlider
        title="Om Moonrise"
        text1="Moonrise er Danmarks første godkendte udbyder af lysdroneshows - en ny, bæredygtig og spektakulær måde at skabe visuelle oplevelser på. Vi kombinerer avanceret teknologi med kreativt design for at levere shows, der forvandler nattehimlen til levende fortællinger i lys og bevægelse."
        text2="Bag Moonrise står et team med stærk teknisk baggrund og mange års erfaring fra event- og filmbranchen gennem SimpleCreations. Vi forstår både det praktiske, det æstetiske og det tekniske, og vi går aldrig på kompromis med sikkerhed eller kvalitet."
        text3="Uanset om du ønsker et færdigudviklet show eller en specialdesignet løsning, arbejder vi tæt sammen med dig for at skabe en oplevelse, der passer perfekt til dit arrangement - og som dine gæster aldrig glemmer."
        text4="Vil du vide mere, se tidligere projekter eller høre om mulighederne? Så er du altid velkommen til at kontakte os – vi står klar til at hjælpe."
        images={["/assets/images/testimage.jpg"]}
        sliderPosition="left"
      />
      
      <TextImageSlider
        title="Vores Projekter"
        text1="Se nogle af vores seneste drone shows og projekter. Hver show er skræddersyet til kundens ønsker og behov."
        text2="Vi kan skabe alt fra simple mønstre til komplekse animationer og fortællinger på himlen."
        text3="Kontakt os for at høre mere om mulighederne for dit næste event."
        sliderPosition="right"
        images={[
          "/assets/images/testimage.jpg",
          "/assets/images/testimage2.png",
          "/assets/images/testimage.jpg",
          "/assets/images/testimage2.png"
        ]}
      />
    </div>
  );
}
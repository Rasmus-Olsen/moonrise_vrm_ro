'use client'

import Hero from '@/components/hero/Hero'
import TranslatedText from '@/components/translatedText/TranslatedText'
import TextImageSlider from '@/components/textImageSlider/TextImageSlider'
import Stats from '@/components/stats/Stats'
import Process from '@/components/process/Process'
import { FaMapMarkerAlt, FaComments, FaPencilRuler } from 'react-icons/fa'

export default function Service () {
  return (
    <>
      <Hero
        backgroundSrc='/assets/images/testimage.jpg'
        title='Service'
        overlayOpacity={0.5}
        height='h-[40vh]'
      />

      <div className='container mx-auto px-4 md:px-8 py-16 space-y-16'>
        <TextImageSlider
          title='Første godkendte droneshow-udbyder i Danmark'
          text1='Moonrise er stolte af at være de første i Danmark, der har opnået officiel godkendelse til at afholde professionelle droneshows.
At få tilladelse til at gennemføre lysdroneshows kræver, at man lever op til strenge krav om sikkerhed, teknologi og koordinering, hvilket understreger vores seriøsitet og tekniske ekspertise.'
          text2='Denne godkendelse betyder, at vi kan tilbyde unikke visuelle oplevelser, som er fuldt lovlige og gennemføres med størst muligt hensyn til både publikum, omgivelser og myndighedernes regler.
Vores erfaring med tekniske produktioner gennem SimpleCreations, kombineret med en dyb forståelse for sikkerhed og avanceret dronestyring, gør os i stand til at levere spektakulære shows, der både imponerer og skaber tryghed.'
          text3='Hos Moonrise arbejder vi hele tiden på at udvikle vores shows og løfte standarden for, hvad et droneshow kan være i Danmark – både kreativt, teknisk og miljømæssigt.'
          text4=''
          images={['/assets/images/testimage.jpg']}
          sliderPosition='right'
        />

        <TextImageSlider
          title='Vælg mellem Prelavet eller Custom Droneshow'
          text1='Hos Moonrise tilbyder vi to typer droneshows, så vi kan matche både jeres ønsker og budget.'
          text2='Prelavet Show:'
          text3='Vores prelavede shows er færdigudviklede opsætninger, hvor koreografi og lysdesign allerede er planlagt. Disse shows kan tilpasses med enkelte elementer som farver eller logoer, men kræver minimal udviklingstid og er derfor en mere prisvenlig løsning – perfekt, hvis I ønsker en hurtig og effektiv booking.'
          text4='Custom Show:'
          text5='Ønsker I en helt unik oplevelse, skaber vi et custom droneshow, designet specifikt til jeres arrangement. Her udvikler vi figurer, animationer og storytelling fra bunden baseret på jeres ideer, brand eller tema. Et custom show giver fuld kreativ frihed, men kræver mere planlægning, udvikling og godkendelse – og derfor også en højere pris.'
          text6='Uanset hvad I vælger, arbejder vi tæt sammen med jer for at sikre, at showet skaber præcis den oplevelse, I ønsker.'
          sliderPosition='left'
          images={['/assets/images/testimage.jpg']}
        />
      </div>

      <Stats
        title='Moonrise i tal'
        items={[
          {
            title: 'Flere deltagere',
            value: 65,
            suffix: '%',
            description: 'Stigning i begivenhedsdeltagelse'
          },
          {
            title: 'Støj reduktion',
            value: 90,
            suffix: '%',
            description: 'Sammenlignet med traditionelt fyrværkeri'
          },
          {
            title: 'Mindre CO₂-udledning',
            value: 60,
            suffix: '%',
            description: 'Reduktion af CO2-fodaftryk'
          },
          {
            title: 'Mindre affald',
            value: 500,
            suffix: 'kg',
            description: 'I forhold til mellemstore fyrværkeri shows'
          }
        ]}
      />

      <Process
        title='Sådan arbejder vi'
        items={[
          {
            icon: FaMapMarkerAlt,
            title: 'Site Authorization & Assessment',
            description:
              'Vi sikrer de nødvendige tilladelser og vurderer lokationen for sikkerhed'
          },
          {
            icon: FaComments,
            title: 'Story Board Consultation',
            description:
              'Vi diskuterer din vision og eventets krav med vores ekspertteam'
          },
          {
            icon: FaPencilRuler,
            title: 'Design & Planning',
            description:
              'Sammen skaber vi et skræddersyet droneshow tilpasset di'
          }
        ]}
      />
    </>
  )
}

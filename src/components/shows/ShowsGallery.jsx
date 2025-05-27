"use client";

import { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import TranslatedText from "@/components/translatedText/TranslatedText";

const ShowsGallery = ({ shows }) => {
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [pastShows, setPastShows] = useState([]);

  useEffect(() => {
    const now = new Date();

    // Sortér shows baseret på dato
    const upcoming = shows
      .filter((show) => new Date(show.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const past = shows
      .filter((show) => new Date(show.date) <= now)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Nyeste først

    setUpcomingShows(upcoming);
    setPastShows(past);
  }, [shows]);

  const renderShowsGrid = (shows, emptyMessage) => {
    if (!shows || shows.length === 0) {
      return (
        <p className="text-gray-400 text-center">
          <TranslatedText>{emptyMessage}</TranslatedText>
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shows.map((show) => (
          <ShowCard
            key={show.id || show.title}
            image={show.image}
            title={show.title}
            description={show.description}
            date={show.date}
            adresse={show.adresse}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Kommende shows */}
      <div className="py-10 bg-[var(--grey)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">
            <TranslatedText>Kommende shows</TranslatedText>
          </h2>
          {renderShowsGrid(
            upcomingShows,
            <TranslatedText>Ingen kommende shows planlagt</TranslatedText>
          )}
        </div>
      </div>

      {/* Tidligere shows */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">
            <TranslatedText>Tidligere shows</TranslatedText>
          </h2>
          {renderShowsGrid(
            pastShows,
            <TranslatedText>Ingen tidligere shows at vise</TranslatedText>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowsGallery;

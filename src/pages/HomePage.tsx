import React from 'react';
import { Hero } from '../components/home/Hero';
import { SuggestedQuestions } from '../components/home/SuggestedQuestions';
import { CausalThreadSection } from '../components/home/CausalThreadSection';
import { MapTimeExplorer } from '../components/home/MapTimeExplorer';
import { PeoplePolicyPlace } from '../components/home/PeoplePolicyPlace';
import { ThenNow } from '../components/home/ThenNow';
import { AudienceModes } from '../components/home/AudienceModes';
import { SourceShelf } from '../components/home/SourceShelf';
import { EditorialSpotlight } from '../components/home/EditorialSpotlight';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main id="main-content">
      <Hero onNavigate={onNavigate} />
      <SuggestedQuestions onNavigate={onNavigate} />
      <CausalThreadSection onNavigate={onNavigate} />
      <ThenNow onNavigate={onNavigate} />
      <MapTimeExplorer onNavigate={onNavigate} />
      <PeoplePolicyPlace onNavigate={onNavigate} />
      <AudienceModes onNavigate={onNavigate} />
      <EditorialSpotlight onNavigate={onNavigate} />
      <SourceShelf onNavigate={onNavigate} />
    </main>
  );
}

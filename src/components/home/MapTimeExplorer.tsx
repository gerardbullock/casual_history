import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface MapTimeExplorerProps {
  onNavigate: (page: string) => void;
}

const eras = [
  { id: 'reconstruction', label: 'Reconstruction', years: '1865–1877', color: '#b45309' },
  { id: 'jim-crow', label: 'Jim Crow', years: '1877–1965', color: '#a31515' },
  { id: 'civil-rights', label: 'Civil Rights', years: '1954–1972', color: '#1a4a8a' },
  { id: 'post-civil-rights', label: 'Post–Civil Rights', years: '1972–2000', color: '#16803d' },
  { id: 'contemporary', label: 'Contemporary', years: '2000–Today', color: '#4a4a44' },
];

const eraEvents: Record<string, Array<{ year: string; title: string; theme: string; slug: string }>> = {
  reconstruction: [
    { year: '1865', title: '13th Amendment — Abolition with an exception', theme: 'Criminal Justice', slug: 'convict-leasing-to-mass-incarceration' },
    { year: '1868', title: '14th Amendment — Equal protection codified', theme: 'Civil Rights', slug: 'reconstruction-to-voting-rights' },
    { year: '1870', title: '15th Amendment — Black men gain the vote', theme: 'Political Power', slug: 'reconstruction-to-voting-rights' },
    { year: '1877', title: 'Compromise of 1877 — Federal troops withdraw', theme: 'Political Power', slug: 'reconstruction-to-voting-rights' },
  ],
  'jim-crow': [
    { year: '1896', title: 'Plessy v. Ferguson — "Separate but equal"', theme: 'Education', slug: 'school-segregation-to-education-gap' },
    { year: '1921', title: 'Tulsa Race Massacre — Black Wall Street destroyed', theme: 'Economics', slug: 'tulsa-massacre-to-economic-exclusion' },
    { year: '1934', title: 'National Housing Act — Redlining begins', theme: 'Housing', slug: 'redlining-to-wealth-gap' },
    { year: '1944', title: 'GI Bill — White veterans build equity; Black veterans excluded', theme: 'Housing', slug: 'redlining-to-wealth-gap' },
  ],
  'civil-rights': [
    { year: '1954', title: 'Brown v. Board — Segregation declared unconstitutional', theme: 'Education', slug: 'school-segregation-to-education-gap' },
    { year: '1964', title: 'Civil Rights Act — Discrimination banned in public life', theme: 'Civil Rights', slug: 'reconstruction-to-voting-rights' },
    { year: '1965', title: 'Voting Rights Act — Federal oversight of elections', theme: 'Political Power', slug: 'reconstruction-to-voting-rights' },
    { year: '1968', title: 'Fair Housing Act — Housing discrimination banned', theme: 'Housing', slug: 'redlining-to-wealth-gap' },
  ],
  'post-civil-rights': [
    { year: '1971', title: 'Nixon\'s "War on Drugs" — Mass incarceration begins', theme: 'Criminal Justice', slug: 'convict-leasing-to-mass-incarceration' },
    { year: '1986', title: 'Anti-Drug Abuse Act — Crack/powder disparity codified', theme: 'Criminal Justice', slug: 'convict-leasing-to-mass-incarceration' },
    { year: '1988', title: 'Fair Housing Amendments Act strengthens enforcement', theme: 'Housing', slug: 'redlining-to-wealth-gap' },
    { year: '1994', title: 'Violent Crime Control Act — Prison population surges', theme: 'Criminal Justice', slug: 'convict-leasing-to-mass-incarceration' },
  ],
  contemporary: [
    { year: '2005', title: 'Hurricane Katrina exposes infrastructure racism', theme: 'Housing', slug: 'redlining-to-wealth-gap' },
    { year: '2013', title: 'Shelby County v. Holder — VRA gutted', theme: 'Political Power', slug: 'reconstruction-to-voting-rights' },
    { year: '2020', title: 'COVID-19 — Black mortality at 1.7x white rate', theme: 'Health', slug: 'medical-racism-to-health-disparities' },
    { year: '2024', title: 'Wealth gap persists: $171K median disparity', theme: 'Economics', slug: 'redlining-to-wealth-gap' },
  ],
};

const themeColors: Record<string, string> = {
  'Criminal Justice': '#a31515',
  Housing: '#b45309',
  'Political Power': '#1a4a8a',
  Health: '#16803d',
  Education: '#7c3aed',
  Economics: '#92400e',
  'Civil Rights': '#1a4a8a',
};

const keyPlaces = [
  { name: 'Selma, AL', description: 'Bloody Sunday, 1965', x: 62, y: 68 },
  { name: 'Tulsa, OK', description: 'Race Massacre, 1921', x: 48, y: 52 },
  { name: 'Montgomery, AL', description: 'Bus Boycott, 1955', x: 63, y: 72 },
  { name: 'Chicago, IL', description: 'Great Migration hub', x: 62, y: 38 },
  { name: 'Birmingham, AL', description: '1963 Bombings', x: 63, y: 68 },
  { name: 'Harlem, NY', description: 'Harlem Renaissance', x: 82, y: 30 },
  { name: 'Ferguson, MO', description: 'Police killing, 2014', x: 56, y: 45 },
  { name: 'Jackson, MS', description: 'Civil Rights movement', x: 57, y: 68 },
];

export function MapTimeExplorer({ onNavigate }: MapTimeExplorerProps) {
  const [activeEra, setActiveEra] = useState('civil-rights');

  const currentEra = eras.find(e => e.id === activeEra)!;
  const events = eraEvents[activeEra] || [];

  return (
    <section
      aria-labelledby="map-heading"
      className="py-24"
      style={{ background: 'var(--bg-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">Maps &amp; Timelines</p>
            <h2
              id="map-heading"
              className="font-serif text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              History in Time and Place
            </h2>
          </div>
          <button
            onClick={() => onNavigate('maps')}
            className="inline-flex items-center gap-2 text-sm font-medium shrink-0"
            style={{ color: 'var(--accent-thread)' }}
          >
            Full maps &amp; timelines <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Era timeline */}
          <div>
            {/* Era selector */}
            <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Historical eras">
              {eras.map(era => (
                <button
                  key={era.id}
                  role="tab"
                  aria-selected={activeEra === era.id}
                  onClick={() => setActiveEra(era.id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded transition-all duration-200"
                  style={{
                    background: activeEra === era.id ? era.color : 'var(--bg-surface)',
                    color: activeEra === era.id ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${activeEra === era.id ? era.color : 'var(--border-default)'}`,
                  }}
                >
                  {era.label}
                  <span
                    className="ml-1.5 opacity-70 font-normal text-xs"
                  >
                    {era.years}
                  </span>
                </button>
              ))}
            </div>

            {/* Events list */}
            <div role="tabpanel" aria-label={`Events in ${currentEra.label}`}>
              <div className="relative pl-6">
                <div className="timeline-line" aria-hidden="true" />
                <div className="space-y-1">
                  {events.map((event, i) => {
                    const color = themeColors[event.theme] || 'var(--accent-thread)';
                    return (
                      <button
                        key={i}
                        onClick={() => onNavigate(`thread/${event.slug}`)}
                        className="w-full text-left group flex gap-4 py-4"
                      >
                        {/* Dot */}
                        <div
                          className="absolute left-[0.9rem] w-3 h-3 rounded-full border-2 bg-white z-10 transition-transform group-hover:scale-125"
                          style={{
                            borderColor: currentEra.color,
                            top: `${4 + i * 68}px`,
                          }}
                          aria-hidden="true"
                        />

                        {/* Year */}
                        <span
                          className="font-mono font-bold text-sm w-12 flex-shrink-0"
                          style={{ color: currentEra.color }}
                        >
                          {event.year}
                        </span>

                        {/* Content */}
                        <div className="flex-1">
                          <p
                            className="font-medium text-sm leading-snug mb-1 group-hover:underline"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {event.title}
                          </p>
                          <span
                            className="tag text-xs"
                            style={{ background: `${color}12`, color, borderColor: `${color}22` }}
                          >
                            {event.theme}
                          </span>
                        </div>

                        <ArrowRight
                          size={12}
                          className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--text-muted)' }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Schematic map */}
          <div
            className="rounded-lg overflow-hidden relative"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              minHeight: '400px',
            }}
          >
            {/* Map header */}
            <div
              className="px-5 py-4 border-b flex items-center justify-between"
              style={{ borderColor: 'var(--border-default)' }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Key Places
                </p>
                <p className="font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
                  Sites of Historical Significance
                </p>
              </div>
              <button
                onClick={() => onNavigate('maps')}
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: 'var(--accent-thread)' }}
              >
                Full map <ArrowRight size={10} />
              </button>
            </div>

            {/* Schematic US map */}
            <div className="relative p-6" style={{ minHeight: '320px' }}>
              {/* Background US silhouette (simplified SVG) */}
              <svg
                viewBox="0 0 400 260"
                className="w-full opacity-10 absolute inset-6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M50,80 L60,60 L100,50 L150,40 L200,35 L250,38 L300,42 L350,50 L370,70 L360,100 L340,120 L320,140 L300,160 L280,170 L260,180 L240,175 L220,185 L200,190 L180,185 L160,180 L140,170 L120,160 L100,150 L80,140 L60,120 L50,100 Z"
                  fill="var(--text-primary)"
                />
              </svg>

              {/* Place markers */}
              {keyPlaces.map((place, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${place.x}%`,
                    top: `${place.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="group relative cursor-pointer"
                    title={`${place.name}: ${place.description}`}
                  >
                    <div
                      className="w-3 h-3 rounded-full border-2 transition-transform group-hover:scale-150"
                      style={{
                        background: 'var(--accent-thread)',
                        borderColor: 'var(--bg-surface)',
                        boxShadow: '0 0 0 3px rgba(163,21,21,0.25)',
                      }}
                    />
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                      style={{ minWidth: '140px' }}
                    >
                      <div
                        className="rounded px-2.5 py-1.5 text-xs"
                        style={{
                          background: 'var(--bg-inverse)',
                          color: 'var(--text-inverse)',
                          boxShadow: 'var(--shadow-lg)',
                        }}
                      >
                        <p className="font-bold">{place.name}</p>
                        <p className="opacity-70">{place.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div
                className="absolute bottom-4 right-4 flex items-center gap-2 text-xs rounded px-3 py-2"
                style={{
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-default)',
                }}
              >
                <MapPin size={10} style={{ color: 'var(--accent-thread)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Historical site</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

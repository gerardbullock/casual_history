import React, { useState } from 'react';
import { User, FileText, MapPin, ArrowRight } from 'lucide-react';
import { featuredPeople } from '../../data/people';

interface PeoplePolicyPlaceProps {
  onNavigate: (page: string) => void;
}

const policies = [
  {
    id: 'pol1',
    slug: 'national-housing-act-1934',
    title: 'National Housing Act',
    year: 1934,
    type: 'Federal Law',
    summary: 'Created the Federal Housing Administration and Home Owners\' Loan Corporation. Enabled mass-scale redlining by coding neighborhoods by race.',
    theme: 'Housing',
  },
  {
    id: 'pol2',
    slug: 'gi-bill-1944',
    title: 'Servicemen\'s Readjustment Act',
    year: 1944,
    type: 'Federal Law',
    summary: 'Offered veterans low-cost mortgages and college tuition. Administered locally through segregated institutions, it overwhelmingly benefited white veterans.',
    theme: 'Housing',
  },
  {
    id: 'pol3',
    slug: 'anti-drug-abuse-act-1986',
    title: 'Anti-Drug Abuse Act',
    year: 1986,
    type: 'Federal Law',
    summary: 'Established the 100-to-1 sentencing disparity between crack and powder cocaine, triggering mass incarceration of Black communities for two decades.',
    theme: 'Criminal Justice',
  },
  {
    id: 'pol4',
    slug: 'shelby-county-v-holder-2013',
    title: 'Shelby County v. Holder',
    year: 2013,
    type: 'Supreme Court',
    summary: 'Struck down the preclearance formula of the Voting Rights Act, immediately enabling new wave of voter suppression legislation in previously covered states.',
    theme: 'Political Power',
  },
];

const places = [
  {
    id: 'pl1',
    slug: 'greenwood-district-tulsa',
    name: 'Greenwood District',
    location: 'Tulsa, Oklahoma',
    period: '1906–1921',
    significance: 'Prosperous Black neighborhood known as "Black Wall Street." Destroyed in the 1921 Tulsa Race Massacre — the worst act of racial violence in U.S. history.',
    theme: 'Economics',
  },
  {
    id: 'pl2',
    slug: 'edmund-pettus-bridge',
    name: 'Edmund Pettus Bridge',
    location: 'Selma, Alabama',
    period: '1965',
    significance: 'Site of "Bloody Sunday" (March 7, 1965), where state troopers attacked peaceful voting rights marchers, catalyzing passage of the Voting Rights Act.',
    theme: 'Political Power',
  },
  {
    id: 'pl3',
    slug: 'chicago-south-side',
    name: 'South Side, Chicago',
    location: 'Chicago, Illinois',
    period: '1920s–Present',
    significance: 'Destination of Great Migration. Shaped by restrictive covenants, urban renewal demolition, and concentrated poverty policies that inform present-day disinvestment.',
    theme: 'Housing',
  },
  {
    id: 'pl4',
    slug: 'tuskegee-alabama',
    name: 'Tuskegee, Alabama',
    location: 'Macon County, Alabama',
    period: '1932–1972',
    significance: 'Site of the 40-year U.S. Public Health Service syphilis study that withheld treatment from 399 Black men. Foundational to documented medical distrust.',
    theme: 'Health',
  },
];

const tabs = [
  { id: 'people', label: 'People', icon: User },
  { id: 'policies', label: 'Policies', icon: FileText },
  { id: 'places', label: 'Places', icon: MapPin },
];

export function PeoplePolicyPlace({ onNavigate }: PeoplePolicyPlaceProps) {
  const [activeTab, setActiveTab] = useState<'people' | 'policies' | 'places'>('people');

  return (
    <section
      aria-labelledby="ppp-heading"
      className="py-24"
      style={{ background: 'var(--bg-surface-2)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">The Archive</p>
            <h2
              id="ppp-heading"
              className="font-serif text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              People, Policies, Places
            </h2>
          </div>
          <button
            onClick={() => onNavigate('encyclopedia')}
            className="inline-flex items-center gap-2 text-sm font-medium shrink-0"
            style={{ color: 'var(--accent-thread)' }}
          >
            View Encyclopedia <ArrowRight size={14} />
          </button>
        </div>

        {/* Tab bar */}
        <div
          className="flex gap-1 mb-8 p-1 rounded-lg w-fit"
          role="tablist"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
        >
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200"
                style={{
                  background: activeTab === tab.id ? 'var(--bg-inverse)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
                }}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div role="tabpanel" aria-label={`${activeTab} entries`}>
          {activeTab === 'people' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPeople.map(person => (
                <button
                  key={person.id}
                  onClick={() => onNavigate(`person/${person.slug}`)}
                  className="card card-lift text-left p-5 flex gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-serif font-bold text-white"
                    style={{ background: 'var(--bg-inverse)' }}
                  >
                    {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-serif font-bold text-base leading-snug mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {person.name}
                    </p>
                    <p
                      className="text-xs mb-2 truncate"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {person.birth_year}
                      {person.death_year ? `–${person.death_year}` : '–'} · {person.era}
                    </p>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {person.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {policies.map(policy => (
                <button
                  key={policy.id}
                  onClick={() => onNavigate(`policy/${policy.slug}`)}
                  className="card card-lift text-left p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="tag mb-2 inline-block">{policy.type}</span>
                      <h3
                        className="font-serif text-lg font-bold"
                        style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                      >
                        {policy.title}
                      </h3>
                    </div>
                    <span
                      className="font-mono font-bold text-lg flex-shrink-0"
                      style={{ color: 'var(--accent-thread)' }}
                    >
                      {policy.year}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
                    {policy.summary}
                  </p>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'places' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {places.map(place => (
                <button
                  key={place.id}
                  onClick={() => onNavigate(`place/${place.slug}`)}
                  className="card card-lift text-left p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: 'var(--bg-surface-3)' }}
                    >
                      <MapPin size={14} style={{ color: 'var(--accent-thread)' }} />
                    </div>
                    <div>
                      <h3
                        className="font-serif text-lg font-bold leading-snug"
                        style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                      >
                        {place.name}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {place.location} · {place.period}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
                    {place.significance}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

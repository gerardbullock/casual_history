import React, { useState } from 'react';
import { Search, ArrowRight, ChevronRight, User, FileText, MapPin, Calendar } from 'lucide-react';
import { featuredPeople } from '../data/people';

interface EncyclopediaPageProps {
  onNavigate: (page: string) => void;
}

const eras = ['All Eras', 'Pre-Civil War', 'Reconstruction', 'Jim Crow', 'Civil Rights', 'Post-Civil Rights', 'Contemporary'];
const categories = ['All', 'People', 'Events', 'Policies', 'Places', 'Concepts'];

const encyclopediaEntries = [
  { id: 'e1', title: 'Reconstruction', category: 'Event', era: 'Reconstruction', year: '1865–1877', summary: 'The period following the Civil War during which federal efforts were made to restructure the South, extend rights to Black Americans, and rebuild the nation.' },
  { id: 'e2', title: 'Black Codes', category: 'Policy', era: 'Reconstruction', year: '1865–1866', summary: 'Laws passed by Southern states after the Civil War to restrict the rights and movements of formerly enslaved Black people and maintain white supremacy.' },
  { id: 'e3', title: 'Plessy v. Ferguson', category: 'Event', era: 'Jim Crow', year: '1896', summary: 'Supreme Court ruling that established the doctrine of "separate but equal," providing constitutional backing for racial segregation for nearly 60 years.' },
  { id: 'e4', title: 'The Great Migration', category: 'Event', era: 'Jim Crow', year: '1910–1970', summary: 'The movement of approximately six million Black Americans from the rural South to cities in the North, Midwest, and West in search of work and to escape Jim Crow.' },
  { id: 'e5', title: 'Redlining', category: 'Concept', era: 'Jim Crow', year: '1934–1968', summary: 'The systematic denial of services — including mortgages and insurance — to residents of racially determined areas, institutionalized by federal housing agencies.' },
  { id: 'e6', title: 'Brown v. Board of Education', category: 'Event', era: 'Civil Rights', year: '1954', summary: 'Landmark Supreme Court decision declaring racial segregation in public schools unconstitutional, overturning Plessy v. Ferguson after 58 years.' },
  { id: 'e7', title: 'Voting Rights Act of 1965', category: 'Policy', era: 'Civil Rights', year: '1965', summary: 'Federal legislation prohibiting discriminatory voting practices and requiring federal preclearance for election law changes in jurisdictions with histories of discrimination.' },
  { id: 'e8', title: 'Tulsa Race Massacre', category: 'Event', era: 'Jim Crow', year: '1921', summary: 'The destruction of the Greenwood District of Tulsa, Oklahoma — the prosperous "Black Wall Street" — by white mobs over two days, killing hundreds.' },
  { id: 'e9', title: 'Mass Incarceration', category: 'Concept', era: 'Contemporary', year: '1970s–Present', summary: 'The dramatic increase in the incarceration rate in the United States beginning in the 1970s, marked by extreme racial disparities in who is imprisoned.' },
  { id: 'e10', title: 'Tuskegee Syphilis Study', category: 'Event', era: 'Jim Crow', year: '1932–1972', summary: 'A 40-year U.S. Public Health Service study in which treatment was deliberately withheld from 399 Black men with syphilis.' },
  { id: 'e11', title: 'Shelby County v. Holder', category: 'Event', era: 'Contemporary', year: '2013', summary: 'Supreme Court decision that struck down the preclearance coverage formula of the Voting Rights Act, immediately enabling new voting restrictions in previously covered states.' },
  { id: 'e12', title: 'Convict Leasing', category: 'Concept', era: 'Reconstruction', year: '1865–1930s', summary: 'A system of penal labor under which state governments leased imprisoned persons to private parties, effectively re-enslaving thousands of Black men after emancipation.' },
];

const categoryIcons: Record<string, React.ElementType> = {
  Event: Calendar,
  Policy: FileText,
  Person: User,
  Place: MapPin,
  Concept: BookOpenIcon,
};

function BookOpenIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

const catColors: Record<string, string> = {
  Event: '#1a4a8a',
  Policy: '#a31515',
  Person: '#16803d',
  Place: '#b45309',
  Concept: '#4a4a44',
};

export function EncyclopediaPage({ onNavigate }: EncyclopediaPageProps) {
  const [query, setQuery] = useState('');
  const [activeEra, setActiveEra] = useState('All Eras');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = encyclopediaEntries.filter(e => {
    const matchesQuery = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.summary.toLowerCase().includes(query.toLowerCase());
    const matchesEra = activeEra === 'All Eras' || e.era === activeEra;
    const matchesCat = activeCategory === 'All' || e.category === activeCategory;
    return matchesQuery && matchesEra && matchesCat;
  });

  return (
    <main id="main-content" className="pt-24 pb-24" style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <div className="py-16" style={{ background: 'var(--bg-surface-2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <ChevronRight size={10} />
            <span style={{ color: 'var(--text-primary)' }}>Encyclopedia</span>
          </nav>
          <p className="section-label mb-3">Reference</p>
          <h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Encyclopedia
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
            600+ entries on people, events, policies, places, and concepts. Every entry links to causal threads and primary sources.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-lg">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search the encyclopedia…"
              className="w-full pl-10 pr-4 py-2.5 rounded border text-sm"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
              aria-label="Search encyclopedia"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Era</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by era">
              {eras.map(era => (
                <button
                  key={era}
                  onClick={() => setActiveEra(era)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                  style={{
                    background: activeEra === era ? 'var(--bg-inverse)' : 'var(--bg-surface)',
                    color: activeEra === era ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    border: `1px solid ${activeEra === era ? 'var(--bg-inverse)' : 'var(--border-default)'}`,
                  }}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Category</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                  style={{
                    background: activeCategory === cat ? (catColors[cat] || 'var(--bg-inverse)') : 'var(--bg-surface)',
                    color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${activeCategory === cat ? (catColors[cat] || 'var(--bg-inverse)') : 'var(--border-default)'}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          {filtered.length} of {encyclopediaEntries.length} entries
        </p>

        {/* Entries grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(entry => {
            const color = catColors[entry.category] || '#666';
            return (
              <button
                key={entry.id}
                className="card card-lift text-left p-5 flex flex-col gap-3 group"
                onClick={() => onNavigate(`entry/${entry.id}`)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="tag"
                    style={{ background: `${color}15`, color, borderColor: `${color}25` }}
                  >
                    {entry.category}
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    {entry.year}
                  </span>
                </div>
                <h3
                  className="font-serif font-bold text-base leading-snug group-hover:underline"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {entry.title}
                </h3>
                <p
                  className="text-xs leading-relaxed line-clamp-3 flex-1"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
                >
                  {entry.summary}
                </p>
                <span
                  className="text-xs font-medium flex items-center gap-1"
                  style={{ color }}
                >
                  Read entry <ArrowRight size={10} />
                </span>
              </button>
            );
          })}
        </div>

        {/* People section */}
        <section aria-labelledby="enc-people-heading" className="mt-16">
          <h2
            id="enc-people-heading"
            className="font-serif text-2xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            People
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPeople.map(person => (
              <button
                key={person.id}
                onClick={() => onNavigate(`person/${person.slug}`)}
                className="card card-lift text-left p-5 flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-serif font-bold text-base text-white"
                  style={{ background: 'var(--bg-inverse)' }}
                >
                  {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {person.name}
                  </p>
                  <p className="text-xs mt-0.5 mb-2" style={{ color: 'var(--text-muted)' }}>
                    {person.birth_year}{person.death_year ? `–${person.death_year}` : ''} · {person.era}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{person.role}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

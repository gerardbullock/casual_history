import React, { useState } from 'react';
import { Search, ArrowRight, ChevronRight } from 'lucide-react';
import { allThreads } from '../data/threads';
import { featuredPeople } from '../data/people';
import { featuredSources } from '../data/sources';

interface SearchPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
}

type ResultType = 'thread' | 'person' | 'source';

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  subtitle: string;
  slug: string;
  tag: string;
  color: string;
}

const suggestedSearches = [
  'redlining',
  'voting rights',
  'mass incarceration',
  'GI Bill',
  'convict leasing',
  'school segregation',
  'Ida B. Wells',
  'Thurgood Marshall',
  'HOLC maps',
];

function buildResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  allThreads.forEach(t => {
    if (
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q) ||
      t.theme.toLowerCase().includes(q)
    ) {
      results.push({
        id: t.id,
        type: 'thread',
        title: t.title,
        subtitle: t.subtitle,
        slug: `thread/${t.slug}`,
        tag: t.theme,
        color: '#a31515',
      });
    }
  });

  featuredPeople.forEach(p => {
    if (
      p.name.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.era.toLowerCase().includes(q)
    ) {
      results.push({
        id: p.id,
        type: 'person',
        title: p.name,
        subtitle: `${p.role} · ${p.era}`,
        slug: `person/${p.slug}`,
        tag: 'Person',
        color: '#16803d',
      });
    }
  });

  featuredSources.forEach(s => {
    if (
      s.title.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    ) {
      results.push({
        id: s.id,
        type: 'source',
        title: s.title,
        subtitle: `${s.author}${s.year ? ` · ${s.year}` : ''} · ${s.source_type}`,
        slug: 'sources',
        tag: 'Source',
        color: '#b45309',
      });
    }
  });

  return results;
}

export function SearchPage({ onNavigate, initialQuery = '' }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const results = buildResults(query);

  return (
    <main id="main-content" className="pt-24 pb-24" style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <div className="py-16" style={{ background: 'var(--bg-surface-2)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <ChevronRight size={10} />
            <span style={{ color: 'var(--text-primary)' }}>Search</span>
          </nav>

          <h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-8"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Search the Archive
          </h1>

          {/* Search input */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search threads, people, places, policies, events…"
              className="w-full pl-12 pr-4 py-4 rounded-lg border text-base focus:outline-none focus:ring-2"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
              aria-label="Search query"
              autoFocus
            />
          </div>

          {/* Suggested searches */}
          {!query && (
            <div className="mt-6">
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Try searching for:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 rounded text-sm transition-colors"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget.style.borderColor = 'var(--accent-thread)');
                      (e.currentTarget.style.color = 'var(--accent-thread)');
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget.style.borderColor = 'var(--border-default)');
                      (e.currentTarget.style.color = 'var(--text-secondary)');
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        {query && (
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            {results.length > 0
              ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
              : `No results for "${query}"`}
          </p>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map(result => (
              <button
                key={result.id}
                onClick={() => onNavigate(result.slug)}
                className="card w-full text-left p-5 flex items-start gap-4 group"
                style={{ transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }}
              >
                <div
                  className="w-2 rounded-full flex-shrink-0 self-stretch"
                  style={{ background: result.color, minHeight: '3rem' }}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="tag"
                      style={{
                        background: `${result.color}15`,
                        color: result.color,
                        borderColor: `${result.color}25`,
                      }}
                    >
                      {result.tag}
                    </span>
                  </div>
                  <h2
                    className="font-serif text-lg font-bold mb-1 group-hover:underline"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {result.title}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
                    {result.subtitle}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--text-muted)' }}
                />
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              No results found
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Try a broader search term, or browse by theme.
            </p>
            <button
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--accent-thread)' }}
            >
              Browse all content <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

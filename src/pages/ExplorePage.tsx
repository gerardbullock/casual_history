import React, { useState } from 'react';
import { Search, Filter, ArrowRight, ChevronRight } from 'lucide-react';
import { allThreads } from '../data/threads';
import { featuredPeople } from '../data/people';

interface ExplorePageProps {
  onNavigate: (page: string) => void;
}

const themes = ['All', 'Housing & Wealth', 'Criminal Justice', 'Political Power', 'Health & Medicine', 'Education', 'Economics'];

const themeColors: Record<string, string> = {
  'Housing & Wealth': '#b45309',
  'Criminal Justice': '#a31515',
  'Political Power': '#1a4a8a',
  'Health & Medicine': '#16803d',
  Education: '#7c3aed',
  Economics: '#92400e',
  'Housing': '#b45309',
};

export function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [activeTheme, setActiveTheme] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = allThreads.filter(t => {
    const matchesTheme = activeTheme === 'All' || t.theme.includes(activeTheme.split(' ')[0]);
    const matchesQuery = !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.summary.toLowerCase().includes(query.toLowerCase());
    return matchesTheme && matchesQuery;
  });

  return (
    <main id="main-content" className="pt-24 pb-24" style={{ background: 'var(--bg-page)' }}>
      {/* Page header */}
      <div className="py-16" style={{ background: 'var(--bg-surface-2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <ChevronRight size={10} />
            <span style={{ color: 'var(--text-primary)' }}>Explore</span>
          </nav>
          <p className="section-label mb-3">The Full Archive</p>
          <h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Explore
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
            Browse all causal threads, encyclopedia entries, people, and places.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search threads, people, events…"
              className="w-full pl-10 pr-4 py-2.5 rounded border text-sm"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
              aria-label="Search the archive"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by theme">
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                style={{
                  background: activeTheme === theme ? (themeColors[theme] || 'var(--bg-inverse)') : 'var(--bg-surface)',
                  color: activeTheme === theme ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${activeTheme === theme ? (themeColors[theme] || 'var(--bg-inverse)') : 'var(--border-default)'}`,
                }}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Showing {filtered.length} thread{filtered.length !== 1 ? 's' : ''}
          {query && ` matching "${query}"`}
          {activeTheme !== 'All' && ` in ${activeTheme}`}
        </p>

        {/* Threads grid */}
        <section aria-labelledby="threads-list-heading">
          <h2 id="threads-list-heading" className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Causal Threads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {filtered.map(thread => {
              const color = themeColors[thread.theme] || 'var(--accent-thread)';
              return (
                <button
                  key={thread.id}
                  onClick={() => onNavigate(`thread/${thread.slug}`)}
                  className="card card-lift text-left p-6 flex flex-col gap-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="tag"
                      style={{ background: `${color}15`, color, borderColor: `${color}25` }}
                    >
                      {thread.theme}
                    </span>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {thread.period_start}
                    </span>
                  </div>
                  <h3
                    className="font-serif text-lg font-bold leading-snug group-hover:underline"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {thread.title}
                  </h3>
                  <p className="text-sm line-clamp-3" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
                    {thread.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {thread.nodes.length} nodes
                    </span>
                    <span className="flex-1" />
                    <span className="text-xs font-medium flex items-center gap-1" style={{ color }}>
                      Read <ArrowRight size={10} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* People section */}
        <section aria-labelledby="people-list-heading">
          <h2 id="people-list-heading" className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            People
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredPeople.map(person => (
              <button
                key={person.id}
                onClick={() => onNavigate(`person/${person.slug}`)}
                className="card card-lift text-center p-4"
              >
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-serif font-bold text-lg text-white"
                  style={{ background: 'var(--bg-inverse)' }}
                >
                  {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <p className="font-serif font-bold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {person.name}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {person.era}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

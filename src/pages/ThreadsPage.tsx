import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { allThreads } from '../data/threads';

interface ThreadsPageProps {
  onNavigate: (page: string) => void;
}

const themes = ['All Themes', 'Housing & Wealth', 'Criminal Justice', 'Political Power', 'Health & Medicine', 'Education'];
const themeColors: Record<string, string> = {
  'Housing & Wealth': '#b45309',
  'Housing': '#b45309',
  'Criminal Justice': '#a31515',
  'Political Power': '#1a4a8a',
  'Health & Medicine': '#16803d',
  Education: '#7c3aed',
  Economics: '#92400e',
};

export function ThreadsPage({ onNavigate }: ThreadsPageProps) {
  const [activeTheme, setActiveTheme] = useState('All Themes');

  const filtered = allThreads.filter(t =>
    activeTheme === 'All Themes' || t.theme.includes(activeTheme.split(' ')[0])
  );

  return (
    <main id="main-content" className="pt-24 pb-24" style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <div className="py-16" style={{ background: 'var(--bg-inverse)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--text-inverse-muted)' }}>
            <button onClick={() => onNavigate('home')} className="hover:underline" style={{ color: 'var(--text-inverse-muted)' }}>Home</button>
            <ChevronRight size={10} />
            <span style={{ color: 'var(--text-inverse)' }}>Threads</span>
          </nav>
          <p className="section-label mb-3" style={{ color: 'var(--accent-thread)' }}>Causal Threads</p>
          <h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-inverse)', letterSpacing: '-0.03em' }}
          >
            Follow the Chain
          </h1>
          <p
            className="text-lg max-w-xl"
            style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}
          >
            Each thread traces a documented historical cause to a measurable present-day outcome.
            Not opinion. A chain of evidence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        {/* Theme filters */}
        <div
          className="flex flex-wrap gap-2 mb-12 pb-6 border-b"
          role="group"
          aria-label="Filter threads by theme"
          style={{ borderColor: 'var(--border-default)' }}
        >
          {themes.map(theme => {
            const color = themeColors[theme.split(' ')[0]] || 'var(--text-primary)';
            return (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className="px-4 py-2 rounded font-medium text-sm transition-all duration-200"
                style={{
                  background: activeTheme === theme
                    ? (theme === 'All Themes' ? 'var(--bg-inverse)' : `${color}`)
                    : 'var(--bg-surface)',
                  color: activeTheme === theme ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${activeTheme === theme ? (theme === 'All Themes' ? 'var(--bg-inverse)' : color) : 'var(--border-default)'}`,
                }}
              >
                {theme}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          {filtered.length} thread{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Thread cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((thread, i) => {
            const color = themeColors[thread.theme] || 'var(--accent-thread)';
            return (
              <button
                key={thread.id}
                onClick={() => onNavigate(`thread/${thread.slug}`)}
                className="card card-lift text-left flex flex-col overflow-hidden group"
              >
                {/* Color band */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: color }}
                  aria-hidden="true"
                />

                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span
                      className="tag"
                      style={{ background: `${color}15`, color, borderColor: `${color}25` }}
                    >
                      {thread.theme}
                    </span>
                    <span className="font-mono text-xs font-bold" style={{ color }}>
                      {thread.period_start}→
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-serif text-xl font-bold leading-snug group-hover:underline"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
                  >
                    {thread.title}
                  </h2>

                  {/* Subtitle */}
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
                  >
                    {thread.subtitle}
                  </p>

                  {/* Footer */}
                  <div
                    className="pt-4 border-t flex items-center justify-between"
                    style={{ borderColor: 'var(--border-default)' }}
                  >
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {thread.nodes.length > 0 ? `${thread.nodes.length} nodes` : 'In progress'}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                      style={{ color }}
                    >
                      Follow thread <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

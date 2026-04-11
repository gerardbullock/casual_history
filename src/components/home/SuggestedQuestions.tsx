import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { discoverySuggestions } from '../../data/sources';

interface SuggestedQuestionsProps {
  onNavigate: (page: string) => void;
}

const themeColors: Record<string, string> = {
  Housing: '#b45309',
  'Criminal Justice': '#a31515',
  'Political Power': '#1a4a8a',
  Health: '#16803d',
  Education: '#7c3aed',
  Economics: '#92400e',
};

export function SuggestedQuestions({ onNavigate }: SuggestedQuestionsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="questions-heading"
      className="py-20"
      style={{ background: 'var(--bg-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">Start Here</p>
            <h2
              id="questions-heading"
              className="font-serif text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              What do you want to understand?
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-2 text-sm font-medium shrink-0 transition-colors"
            style={{ color: 'var(--accent-thread)' }}
          >
            <Search size={14} />
            Browse all questions
          </button>
        </div>

        {/* Question grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {discoverySuggestions.map((item, i) => {
            const color = themeColors[item.theme] || 'var(--accent-thread)';
            return (
              <button
                key={item.slug}
                onClick={() => onNavigate(`thread/${item.slug}`)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="card card-lift text-left p-6 flex flex-col gap-4 group"
                aria-label={`Explore: ${item.question}`}
              >
                {/* Theme badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="tag"
                    style={{
                      background: `${color}15`,
                      color,
                      borderColor: `${color}25`,
                    }}
                  >
                    {item.theme}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {item.era}
                  </span>
                </div>

                {/* Question */}
                <p
                  className="font-serif text-lg font-semibold leading-snug flex-1"
                  style={{
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.question}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {item.node_count} causal nodes
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium transition-all duration-200"
                    style={{
                      color,
                      transform: hovered === i ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    Follow thread <ArrowRight size={12} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

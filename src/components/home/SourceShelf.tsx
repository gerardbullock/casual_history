import React from 'react';
import { BookOpen, Archive, Film, FileText, ArrowRight } from 'lucide-react';
import { featuredSources } from '../../data/sources';

interface SourceShelfProps {
  onNavigate: (page: string) => void;
}

const typeIcons = {
  book: BookOpen,
  archive: Archive,
  documentary: Film,
  article: FileText,
  report: FileText,
};

const typeLabels = {
  book: 'Book',
  archive: 'Primary Source',
  documentary: 'Documentary',
  article: 'Article',
  report: 'Report',
};

export function SourceShelf({ onNavigate }: SourceShelfProps) {
  return (
    <section
      aria-labelledby="sources-heading"
      className="py-24"
      style={{ background: 'var(--bg-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">Primary & Secondary Sources</p>
            <h2
              id="sources-heading"
              className="font-serif text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              The Source Shelf
            </h2>
            <p
              className="mt-3 max-w-xl"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
            >
              Every claim on this platform traces to a source. These are the foundational texts,
              government records, and archival materials behind the causal threads.
            </p>
          </div>
          <button
            onClick={() => onNavigate('sources')}
            className="inline-flex items-center gap-2 text-sm font-medium shrink-0"
            style={{ color: 'var(--accent-thread)' }}
          >
            View all sources <ArrowRight size={14} />
          </button>
        </div>

        {/* Shelf grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSources.map(source => {
            const Icon = typeIcons[source.source_type] || BookOpen;
            return (
              <div
                key={source.id}
                className="card p-6 flex gap-4"
              >
                {/* Icon spine */}
                <div
                  className="w-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--accent-thread)' }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={12} style={{ color: 'var(--text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {typeLabels[source.source_type]}
                    </span>
                    {source.year && (
                      <>
                        <span style={{ color: 'var(--text-muted)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{source.year}</span>
                      </>
                    )}
                  </div>

                  <h3
                    className="font-serif text-base font-bold mb-1 leading-snug"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {source.title}
                  </h3>

                  {source.author && (
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                      {source.author}
                    </p>
                  )}

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
                  >
                    {source.description}
                  </p>

                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs font-medium"
                      style={{ color: 'var(--accent-thread)' }}
                      aria-label={`View source: ${source.title} (opens in new tab)`}
                    >
                      View source <ArrowRight size={10} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

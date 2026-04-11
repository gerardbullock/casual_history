import React from 'react';
import { BookOpen, GraduationCap, Users, Search, ArrowRight } from 'lucide-react';

interface AudienceModesProps {
  onNavigate: (page: string) => void;
}

const modes = [
  {
    id: 'general',
    icon: BookOpen,
    label: 'General Readers',
    headline: 'Understand the news in context',
    description: 'Start with a question you\'ve had about race, inequality, or American history. Follow the causal thread at your own pace. Every entry links to the source.',
    actions: [
      { label: 'Start with a question', page: 'explore' },
      { label: 'Then → Now issues', page: 'today' },
    ],
    color: '#b45309',
  },
  {
    id: 'students',
    icon: GraduationCap,
    label: 'Students',
    headline: 'Evidence-based, source-cited history',
    description: 'Research essays, class discussions, or personal learning. Every claim links to primary sources, government data, or peer-reviewed scholarship.',
    actions: [
      { label: 'Browse by theme', page: 'threads' },
      { label: 'Source shelf', page: 'sources' },
    ],
    color: '#1a4a8a',
  },
  {
    id: 'educators',
    icon: Users,
    label: 'Educators',
    headline: 'Ready-made for the classroom',
    description: 'Standards-aligned discussion guides, document sets, and causal thread activities for middle school, high school, and college courses.',
    actions: [
      { label: 'Teaching resources', page: 'teaching' },
      { label: 'Discussion guides', page: 'teaching-guides' },
    ],
    color: '#a31515',
  },
  {
    id: 'researchers',
    icon: Search,
    label: 'Researchers',
    headline: 'Structured data, full citations',
    description: 'Search across 600+ encyclopedia entries, primary source documents, and causal threads. Each entry includes methodology notes and full bibliographic data.',
    actions: [
      { label: 'Search the archive', page: 'search' },
      { label: 'Methodology', page: 'methodology' },
    ],
    color: '#16803d',
  },
];

export function AudienceModes({ onNavigate }: AudienceModesProps) {
  return (
    <section
      aria-labelledby="audience-heading"
      className="py-24"
      style={{ background: 'var(--bg-inverse)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="section-label mb-3" style={{ color: 'var(--accent-thread)' }}>
            How You Learn Here
          </p>
          <h2
            id="audience-heading"
            className="font-serif text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-inverse)', letterSpacing: '-0.02em' }}
          >
            Built for every kind of learner
          </h2>
          <p style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}>
            Whether you're a curious reader, a high school student, an educator building curriculum,
            or a researcher — this platform has a path for you.
          </p>
        </div>

        {/* Mode cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modes.map(mode => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className="rounded-lg p-6 flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded flex items-center justify-center mb-5"
                  style={{ background: `${mode.color}22`, border: `1px solid ${mode.color}44` }}
                >
                  <Icon size={18} style={{ color: mode.color }} />
                </div>

                {/* Label */}
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-3"
                  style={{ color: mode.color }}
                >
                  {mode.label}
                </div>

                {/* Headline */}
                <h3
                  className="font-serif text-lg font-bold mb-3 leading-snug"
                  style={{ color: 'var(--text-inverse)', letterSpacing: '-0.01em' }}
                >
                  {mode.headline}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-6 flex-1"
                  style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}
                >
                  {mode.description}
                </p>

                {/* Actions */}
                <div className="space-y-2">
                  {mode.actions.map(action => (
                    <button
                      key={action.page}
                      onClick={() => onNavigate(action.page)}
                      className="w-full text-left inline-flex items-center justify-between gap-2 text-sm font-medium transition-colors duration-150 py-1"
                      style={{ color: mode.color }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.8')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                    >
                      {action.label}
                      <ArrowRight size={12} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

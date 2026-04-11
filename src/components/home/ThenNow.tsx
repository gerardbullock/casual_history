import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { thenNowIssues } from '../../data/sources';

interface ThenNowProps {
  onNavigate: (page: string) => void;
}

const themeColors: Record<string, string> = {
  'Criminal Justice': '#a31515',
  Housing: '#b45309',
  'Political Power': '#1a4a8a',
  Health: '#16803d',
};

export function ThenNow({ onNavigate }: ThenNowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-labelledby="then-now-heading"
      className="py-24"
      style={{ background: 'var(--bg-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: explanation */}
          <div>
            <p className="section-label mb-3">Then &rarr; Now</p>
            <h2
              id="then-now-heading"
              className="font-serif text-3xl sm:text-4xl font-bold mb-6"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              History doesn't end. It transforms.
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
            >
              The same structures reappear across generations — not as coincidence,
              but as adaptations. Each Then→Now pair shows one documented example of historical
              pattern and its contemporary counterpart.
            </p>

            {/* Issue selector */}
            <div className="space-y-2" role="tablist" aria-label="Then to Now issues">
              {thenNowIssues.map((item, i) => {
                const color = themeColors[item.theme] || 'var(--accent-thread)';
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={activeIndex === i}
                    onClick={() => setActiveIndex(i)}
                    className="w-full text-left px-4 py-3 rounded flex items-center justify-between gap-4 transition-all duration-200"
                    style={{
                      background: activeIndex === i ? `${color}10` : 'transparent',
                      border: `1px solid ${activeIndex === i ? `${color}30` : 'var(--border-default)'}`,
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="tag text-xs"
                          style={{ background: `${color}15`, color, borderColor: `${color}25` }}
                        >
                          {item.theme}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {item.then.year}
                        </span>
                      </div>
                      <p
                        className="font-medium text-sm"
                        style={{ color: activeIndex === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                      >
                        {item.then.title} → {item.now.title}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      style={{
                        color,
                        transform: activeIndex === i ? 'rotate(90deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: detail panel */}
          <div role="tabpanel">
            {thenNowIssues[activeIndex] && (() => {
              const item = thenNowIssues[activeIndex];
              const color = themeColors[item.theme] || 'var(--accent-thread)';
              return (
                <div
                  className="rounded-lg overflow-hidden"
                  style={{
                    border: '1px solid var(--border-default)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  {/* Then panel */}
                  <div
                    className="p-8"
                    style={{ background: 'var(--bg-inverse)' }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
                        style={{ background: 'var(--accent-thread)', color: 'white' }}
                      >
                        Then
                      </span>
                      <span
                        className="font-mono text-sm font-semibold"
                        style={{ color: 'var(--text-inverse-muted)' }}
                      >
                        {item.then.year}
                      </span>
                    </div>
                    <h3
                      className="font-serif text-2xl font-bold mb-3"
                      style={{ color: 'var(--text-inverse)', letterSpacing: '-0.02em' }}
                    >
                      {item.then.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}
                    >
                      {item.then.description}
                    </p>
                  </div>

                  {/* Connector */}
                  <div
                    className="flex items-center justify-center py-4"
                    style={{
                      background: `linear-gradient(to bottom, var(--bg-inverse), ${color}15)`,
                    }}
                    aria-hidden="true"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-px w-12" style={{ background: color }} />
                      <div
                        className="px-3 py-1 rounded text-xs font-bold tracking-widest uppercase"
                        style={{ background: color, color: 'white' }}
                      >
                        Causal Link
                      </div>
                      <div className="h-px w-12" style={{ background: color }} />
                    </div>
                  </div>

                  {/* Now panel */}
                  <div
                    className="p-8"
                    style={{ background: `${color}08` }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
                        style={{ background: color, color: 'white' }}
                      >
                        Now
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Present Day
                      </span>
                    </div>
                    <h3
                      className="font-serif text-2xl font-bold mb-3"
                      style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
                    >
                      {item.now.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
                    >
                      {item.now.description}
                    </p>
                    <button
                      onClick={() => onNavigate(`thread/${item.thread_slug}`)}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                      style={{ color }}
                    >
                      Follow the full thread <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

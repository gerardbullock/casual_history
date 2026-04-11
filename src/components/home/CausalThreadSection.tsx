import React, { useState } from 'react';
import { ArrowRight, ArrowDown, ChevronRight } from 'lucide-react';
import { featuredThreads } from '../../data/threads';
import { Thread, ThreadNode } from '../../types';

interface CausalThreadSectionProps {
  onNavigate: (page: string) => void;
}

const nodeTypeLabels: Record<string, string> = {
  event: 'Event',
  policy: 'Policy',
  person: 'Person',
  place: 'Place',
  outcome: 'Present Day',
};

const nodeTypeColors: Record<string, string> = {
  event: '#b45309',
  policy: '#1a4a8a',
  person: '#16803d',
  place: '#7c3aed',
  outcome: '#a31515',
};

function NodeDot({ type }: { type: string }) {
  const color = nodeTypeColors[type] || '#666';
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-3 h-3 rounded-full border-2 z-10 relative"
        style={{ background: color, borderColor: color }}
        aria-hidden="true"
      />
    </div>
  );
}

function ThreadNodeCard({ node, isLast }: { node: ThreadNode; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const color = nodeTypeColors[node.node_type] || '#666';

  return (
    <div className="relative flex gap-4">
      {/* Timeline stem */}
      <div className="flex flex-col items-center">
        <NodeDot type={node.node_type} />
        {!isLast && (
          <div
            className="w-px flex-1 mt-1 min-h-8"
            style={{ background: 'var(--border-default)' }}
            aria-hidden="true"
          />
        )}
        {isLast && (
          <div className="mt-1" aria-hidden="true">
            <ArrowDown size={12} style={{ color: 'var(--accent-thread)' }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pb-6 flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="tag"
            style={{
              background: `${color}15`,
              color,
              borderColor: `${color}25`,
            }}
          >
            {nodeTypeLabels[node.node_type]}
          </span>
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {node.year_label}
          </span>
        </div>

        <button
          className="w-full text-left group"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <h4
            className="font-serif text-lg font-semibold mb-2 group-hover:underline"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            {node.title}
          </h4>
        </button>

        <p
          className="text-sm leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-serif-text)',
            maxHeight: expanded ? '200px' : '60px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}
        >
          {node.body}
        </p>

        {node.body.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-xs font-medium"
            style={{ color: 'var(--accent-thread)' }}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}

export function CausalThreadSection({ onNavigate }: CausalThreadSectionProps) {
  const [activeThread, setActiveThread] = useState<Thread>(featuredThreads[0]);

  return (
    <section
      aria-labelledby="threads-heading"
      className="py-24"
      style={{ background: 'var(--bg-surface-2)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="section-label mb-3">Signature Feature</p>
          <h2
            id="threads-heading"
            className="font-serif text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Causal Threads
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
            Each thread traces a documented historical chain — from an originating policy, event, or condition
            to a measurable present-day outcome. Not opinion. Not overview. A chain of evidence.
          </p>
        </div>

        {/* Thread selector tabs */}
        <div
          className="flex flex-wrap gap-2 mb-12 pb-4 border-b"
          role="tablist"
          aria-label="Select a causal thread"
          style={{ borderColor: 'var(--border-default)' }}
        >
          {featuredThreads.map(thread => (
            <button
              key={thread.id}
              role="tab"
              aria-selected={activeThread.id === thread.id}
              onClick={() => setActiveThread(thread)}
              className="px-4 py-2 rounded text-sm font-medium transition-all duration-200"
              style={{
                background: activeThread.id === thread.id ? 'var(--accent-thread)' : 'var(--bg-surface)',
                color: activeThread.id === thread.id ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${activeThread.id === thread.id ? 'var(--accent-thread)' : 'var(--border-default)'}`,
              }}
            >
              {thread.theme}
            </button>
          ))}
        </div>

        {/* Main thread view */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Thread info */}
          <div className="lg:col-span-2">
            <div
              className="sticky top-24 p-6 rounded-lg"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Period badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold mb-4"
                style={{
                  background: 'var(--accent-thread)',
                  color: 'white',
                }}
              >
                {activeThread.period_start}
                <ArrowRight size={10} />
                Present
              </div>

              <h3
                className="font-serif text-2xl font-bold mb-3"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
              >
                {activeThread.title}
              </h3>

              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
              >
                {activeThread.subtitle}
              </p>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
              >
                {activeThread.summary}
              </p>

              {/* Metadata */}
              <div className="space-y-2 mb-6 pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--text-muted)' }}>Theme</span>
                  <span className="tag tag-thread">{activeThread.theme}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--text-muted)' }}>Causal nodes</span>
                  <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {activeThread.nodes.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--text-muted)' }}>Audience</span>
                  <span className="font-medium capitalize" style={{ color: 'var(--text-secondary)' }}>
                    {activeThread.difficulty}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate(`thread/${activeThread.slug}`)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded font-semibold text-sm transition-all duration-200"
                style={{ background: 'var(--accent-thread)', color: 'white' }}
              >
                Read Full Thread <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div
            className="lg:col-span-3"
            role="tabpanel"
            aria-label={`Causal nodes for: ${activeThread.title}`}
          >
            {activeThread.nodes.map((node, i) => (
              <ThreadNodeCard
                key={node.id}
                node={node}
                isLast={i === activeThread.nodes.length - 1}
              />
            ))}
          </div>
        </div>

        {/* All threads CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate('threads')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm border transition-all duration-200"
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
            }}
            onMouseEnter={e => {
              (e.currentTarget.style.borderColor = 'var(--accent-thread)');
              (e.currentTarget.style.color = 'var(--accent-thread)');
            }}
            onMouseLeave={e => {
              (e.currentTarget.style.borderColor = 'var(--border-default)');
              (e.currentTarget.style.color = 'var(--text-primary)');
            }}
          >
            Explore all {featuredThreads.length + 3} threads <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

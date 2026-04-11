import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, Share2, BookOpen, ChevronRight } from 'lucide-react';
import { allThreads } from '../data/threads';
import { Thread, ThreadNode } from '../types';
import { featuredSources } from '../data/sources';

interface ThreadPageProps {
  slug: string;
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

function BreadcrumbNav({ thread, onNavigate }: { thread: Thread; onNavigate: (p: string) => void }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
      <button onClick={() => onNavigate('home')} className="hover:underline" style={{ color: 'var(--text-muted)' }}>Home</button>
      <ChevronRight size={10} />
      <button onClick={() => onNavigate('threads')} className="hover:underline" style={{ color: 'var(--text-muted)' }}>Threads</button>
      <ChevronRight size={10} />
      <span style={{ color: 'var(--text-secondary)' }}>{thread.theme}</span>
      <ChevronRight size={10} />
      <span className="truncate max-w-48" style={{ color: 'var(--text-primary)' }}>{thread.title}</span>
    </nav>
  );
}

function FullNodeCard({ node, isLast, index }: { node: ThreadNode; isLast: boolean; index: number }) {
  const color = nodeTypeColors[node.node_type] || '#666';
  return (
    <div className="relative flex gap-6 group">
      {/* Left timeline */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm z-10"
          style={{
            background: 'var(--bg-surface)',
            borderColor: color,
            color,
          }}
          aria-hidden="true"
        >
          {index + 1}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-2 min-h-12"
            style={{ background: `linear-gradient(to bottom, ${color}40, var(--border-default))` }}
            aria-hidden="true"
          />
        )}
        {isLast && (
          <div className="mt-2" aria-hidden="true">
            <ArrowDown size={16} style={{ color }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="flex-1 pb-12 rounded-lg p-6 mb-2"
        style={{
          background: 'var(--bg-surface)',
          border: `1px solid ${color}22`,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Node header */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="tag"
            style={{ background: `${color}15`, color, borderColor: `${color}25` }}
          >
            {nodeTypeLabels[node.node_type]}
          </span>
          <span
            className="font-mono font-bold text-sm"
            style={{ color }}
          >
            {node.year_label}
          </span>
        </div>

        <h3
          className="font-serif text-xl sm:text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          {node.title}
        </h3>

        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
        >
          {node.body}
        </p>

        {/* Causal connector */}
        {!isLast && (
          <div
            className="mt-6 pt-4 border-t flex items-center gap-2"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>This leads to</span>
            <ArrowRight size={12} style={{ color: 'var(--accent-thread)' }} />
          </div>
        )}

        {isLast && (
          <div
            className="mt-6 pt-4 border-t"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold"
              style={{ background: 'var(--accent-thread)', color: 'white' }}
            >
              Present-Day Outcome
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ThreadPage({ slug, onNavigate }: ThreadPageProps) {
  const thread = allThreads.find(t => t.slug === slug) || allThreads[0];
  const relatedThreads = allThreads.filter(t => t.id !== thread.id && t.theme === thread.theme).slice(0, 2);
  const otherThreads = allThreads.filter(t => t.id !== thread.id).slice(0, 3);

  return (
    <main id="main-content" className="pt-24 pb-24" style={{ background: 'var(--bg-page)' }}>
      {/* Hero band */}
      <div className="py-16" style={{ background: 'var(--bg-inverse)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <BreadcrumbNav thread={thread} onNavigate={onNavigate} />

          <div className="flex items-center gap-3 mb-6">
            <span className="tag tag-thread">{thread.theme}</span>
            <span className="text-xs" style={{ color: 'var(--text-inverse-muted)' }}>
              {thread.period_start}–Present
            </span>
            <span className="text-xs" style={{ color: 'var(--text-inverse-muted)' }}>
              · {thread.nodes.length} nodes
            </span>
          </div>

          <h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-inverse)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            {thread.title}
          </h1>

          <p
            className="text-lg mb-8"
            style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}
          >
            {thread.subtitle}
          </p>

          <p
            className="text-base leading-relaxed max-w-2xl mb-8"
            style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}
          >
            {thread.summary}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('threads')}
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--text-inverse-muted)' }}
            >
              <ArrowLeft size={14} /> All Threads
            </button>
            <button
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--text-inverse-muted)' }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: thread.title, url: window.location.href });
                }
              }}
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Thread content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16">
        {/* Chain intro */}
        <div
          className="mb-12 p-5 rounded-lg flex items-start gap-4"
          style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-default)' }}
        >
          <div
            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'var(--accent-thread)' }}
          >
            <ArrowDown size={12} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Reading the chain
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
              Each node below represents a documented cause or effect. Numbered steps flow chronologically
              from historical origin to present-day outcome. Click "Read more" to expand any node.
            </p>
          </div>
        </div>

        {/* Nodes */}
        {thread.nodes.length > 0 ? (
          thread.nodes.map((node, i) => (
            <FullNodeCard
              key={node.id}
              node={node}
              isLast={i === thread.nodes.length - 1}
              index={i}
            />
          ))
        ) : (
          <div
            className="text-center py-16 rounded-lg"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
          >
            <p className="font-serif text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Full thread coming soon
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              This thread is currently in editorial review. Check back soon.
            </p>
          </div>
        )}

        {/* Sources section */}
        <div
          className="mt-16 pt-8 border-t"
          style={{ borderColor: 'var(--border-default)' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={16} style={{ color: 'var(--text-muted)' }} />
            <h2 className="font-serif text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Sources &amp; Further Reading
            </h2>
          </div>
          <div className="space-y-3">
            {featuredSources.slice(0, 3).map(source => (
              <div
                key={source.id}
                className="flex gap-3 p-4 rounded"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ background: 'var(--accent-thread)' }}
                />
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    {source.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {source.author}{source.year ? `, ${source.year}` : ''} · {source.source_type}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('sources')}
            className="mt-4 text-sm font-medium inline-flex items-center gap-1"
            style={{ color: 'var(--accent-thread)' }}
          >
            View all sources <ArrowRight size={12} />
          </button>
        </div>

        {/* Related threads */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <h2 className="font-serif text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            More Threads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(relatedThreads.length > 0 ? relatedThreads : otherThreads.slice(0, 2)).map(t => (
              <button
                key={t.id}
                onClick={() => onNavigate(`thread/${t.slug}`)}
                className="card card-lift text-left p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag tag-thread">{t.theme}</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t.period_start}–Present
                  </span>
                </div>
                <h3
                  className="font-serif text-base font-bold mb-2"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {t.title}
                </h3>
                <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {t.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

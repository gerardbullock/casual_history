import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const rotatingQuestions = [
  'Why does the racial wealth gap still exist?',
  'How did redlining shape your city?',
  'What is mass incarceration\'s historical root?',
  'Why can\'t the Voting Rights Act stop suppression?',
  'How did the GI Bill skip Black veterans?',
  'What created the school-to-prison pipeline?',
];

export function Hero({ onNavigate }: HeroProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setQuestionIndex(i => (i + 1) % rotatingQuestions.length);
        setFading(false);
      }, 400);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--bg-inverse)' }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            rgba(255,255,255,0.3) 39px,
            rgba(255,255,255,0.3) 40px
          ), repeating-linear-gradient(
            90deg,
            transparent,
            transparent 39px,
            rgba(255,255,255,0.3) 39px,
            rgba(255,255,255,0.3) 40px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: 'var(--accent-thread)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Category label */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="h-px w-12"
              style={{ background: 'var(--accent-thread)' }}
              aria-hidden="true"
            />
            <span className="section-label text-xs tracking-widest">
              Black History &amp; Present-Day America
            </span>
          </div>

          {/* Main headline */}
          <h1
            id="hero-heading"
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-8"
            style={{ color: 'var(--text-inverse)', letterSpacing: '-0.03em' }}
          >
            Understand
            <br />
            the chain,
            <br />
            <em className="not-italic" style={{ color: 'var(--accent-thread)' }}>
              not just the event.
            </em>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}
          >
            Follow causal threads connecting Black history — its people, policies, places, and events —
            to the conditions shaping America today. Evidence-based. Source-cited. Built for everyone.
          </p>

          {/* Rotating question */}
          <div
            className="mb-10 pl-5 border-l-2"
            style={{ borderColor: 'var(--accent-thread)' }}
            aria-live="polite"
            aria-label="Featured question"
          >
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-inverse-muted)' }}
            >
              Start with a question
            </p>
            <p
              className="font-serif text-2xl sm:text-3xl font-semibold transition-opacity duration-400"
              style={{
                color: 'var(--text-inverse)',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.4s ease',
                letterSpacing: '-0.02em',
              }}
            >
              {rotatingQuestions[questionIndex]}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('threads')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all duration-200 group"
              style={{
                background: 'var(--accent-thread)',
                color: 'white',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Follow a Thread
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm border transition-all duration-200"
              style={{
                background: 'transparent',
                color: 'var(--text-inverse)',
                border: '1px solid rgba(255,255,255,0.20)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Explore the Archive
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="mt-20 pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-8"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {[
            { num: '24', label: 'Causal Threads' },
            { num: '600+', label: 'Encyclopedia Entries' },
            { num: '150+', label: 'Primary Sources' },
            { num: '1619–Today', label: 'Timeline Span' },
          ].map(stat => (
            <div key={stat.label}>
              <div
                className="font-serif text-3xl font-bold mb-1"
                style={{ color: 'var(--text-inverse)' }}
              >
                {stat.num}
              </div>
              <div className="text-xs tracking-wide uppercase" style={{ color: 'var(--text-inverse-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll to main content"
        style={{ color: 'var(--text-inverse-muted)' }}
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}

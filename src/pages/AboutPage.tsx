import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const principles = [
    {
      number: '01',
      title: 'Causality over chronicle',
      body: 'We are not a timeline. We are not an encyclopedia. We trace documented causal chains: the specific mechanisms by which historical decisions produced present conditions.',
    },
    {
      number: '02',
      title: 'Evidence, not argument',
      body: 'Every claim on this platform links to a primary source, government dataset, court record, or peer-reviewed study. We do not editorialize beyond what the sources support.',
    },
    {
      number: '03',
      title: 'Public and free',
      body: 'This platform is free to use, share, and build upon under CC BY-NC-SA 4.0. History belongs to everyone. Knowledge about systemic inequity is not a premium product.',
    },
    {
      number: '04',
      title: 'Context is not politics',
      body: 'Explaining why disparities exist is not advocacy — it is analysis. We present documented historical causes; what readers do with that knowledge is up to them.',
    },
  ];

  return (
    <main id="main-content" className="pt-24 pb-24" style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <div className="py-20" style={{ background: 'var(--bg-inverse)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--text-inverse-muted)' }}>
            <button onClick={() => onNavigate('home')} className="hover:underline" style={{ color: 'var(--text-inverse-muted)' }}>Home</button>
            <ChevronRight size={10} />
            <span style={{ color: 'var(--text-inverse)' }}>About</span>
          </nav>

          <h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-inverse)', letterSpacing: '-0.03em' }}
          >
            About Causal History
          </h1>

          <p
            className="text-xl leading-relaxed"
            style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}
          >
            Causal History is a public-facing digital history platform that explains how Black history
            connects to present-day America through documented causal threads linking people, policies,
            places, events, and modern outcomes.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16">
        {/* Mission */}
        <section aria-labelledby="mission-heading" className="mb-20">
          <p className="section-label mb-3">Our Mission</p>
          <h2
            id="mission-heading"
            className="font-serif text-3xl font-bold mb-6"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Fill the gap between encyclopedia and analysis
          </h2>
          <div className="space-y-4" style={{ fontFamily: 'var(--font-serif-text)', color: 'var(--text-secondary)' }}>
            <p className="text-base leading-relaxed">
              There is no shortage of good historical information about Black American history. What is harder
              to find is structured, sourced, accessible analysis of how that history causally connects to
              the present. Why is the wealth gap so large? Why is mass incarceration so racially skewed?
              Why does school segregation persist 70 years after <em>Brown v. Board</em>?
            </p>
            <p className="text-base leading-relaxed">
              The answers exist in scholarship, government data, and court records. Causal History structures
              them into navigable, readable causal threads — not editorials, not lecture notes, but documented
              chains of evidence.
            </p>
            <p className="text-base leading-relaxed">
              Our core promise: <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Understand the chain, not just the event.</strong>
            </p>
          </div>
        </section>

        {/* Principles */}
        <section aria-labelledby="principles-heading" className="mb-20">
          <p className="section-label mb-3">Editorial Principles</p>
          <h2
            id="principles-heading"
            className="font-serif text-3xl font-bold mb-10"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            How we work
          </h2>
          <div className="space-y-8">
            {principles.map(p => (
              <div key={p.number} className="flex gap-6">
                <div
                  className="font-mono text-3xl font-bold leading-none flex-shrink-0 w-12"
                  style={{ color: 'var(--accent-thread)', opacity: 0.4 }}
                  aria-hidden="true"
                >
                  {p.number}
                </div>
                <div>
                  <h3
                    className="font-serif text-xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audience */}
        <section aria-labelledby="audience-heading" className="mb-20">
          <p className="section-label mb-3">Audiences</p>
          <h2
            id="audience-heading"
            className="font-serif text-3xl font-bold mb-6"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Who this is for
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
            Causal History serves four primary audiences with distinct needs: general readers seeking context
            for current events, students writing research papers or seeking deeper understanding, educators
            building curriculum, and researchers seeking structured primary source access.
          </p>
          <button
            onClick={() => onNavigate('learn')}
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: 'var(--accent-thread)' }}
          >
            Choose your learning path <ArrowRight size={14} />
          </button>
        </section>

        {/* CTA */}
        <div
          className="p-8 rounded-lg text-center"
          style={{ background: 'var(--bg-inverse)' }}
        >
          <h2
            className="font-serif text-2xl font-bold mb-3"
            style={{ color: 'var(--text-inverse)' }}
          >
            Start with a thread
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-inverse-muted)', fontFamily: 'var(--font-serif-text)' }}>
            The best way to understand what Causal History does is to follow one thread from beginning to end.
          </p>
          <button
            onClick={() => onNavigate('threads')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm"
            style={{ background: 'var(--accent-thread)', color: 'white' }}
          >
            Browse all threads <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </main>
  );
}

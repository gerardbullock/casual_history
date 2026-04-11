import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface EditorialSpotlightProps {
  onNavigate: (page: string) => void;
}

const spotlightFeature = {
  category: 'Editorial',
  date: 'April 2026',
  title: 'The 1968 Fair Housing Act Was a Victory. So Why Are American Cities Still Segregated?',
  subtitle: 'Fifty-six years after Congress banned housing discrimination, the median Black family holds $171,000 less in home equity than the median white family. Following the causal chain explains why.',
  slug: 'redlining-to-wealth-gap',
  readTime: '18 min read',
  image: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?w=1200&h=600&fit=crop',
};

const secondaryFeatures = [
  {
    category: 'Thread',
    title: 'How Convict Leasing Became Mass Incarceration',
    slug: 'convict-leasing-to-mass-incarceration',
    readTime: '22 min',
    image: 'https://images.pexels.com/photos/1111317/pexels-photo-1111317.jpeg?w=600&h=400&fit=crop',
  },
  {
    category: 'Person',
    title: 'Ida B. Wells: The Journalist Who Made Lynching a National Crisis',
    slug: 'person/ida-b-wells',
    readTime: '12 min',
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?w=600&h=400&fit=crop',
  },
  {
    category: 'Then → Now',
    title: 'Poll Taxes and Voter ID Laws: The Same Barrier, Different Name',
    slug: 'reconstruction-to-voting-rights',
    readTime: '9 min',
    image: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?w=600&h=400&fit=crop',
  },
];

export function EditorialSpotlight({ onNavigate }: EditorialSpotlightProps) {
  return (
    <section
      aria-labelledby="spotlight-heading"
      className="py-24"
      style={{ background: 'var(--bg-surface-2)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="section-label mb-3">Editorial</p>
            <h2
              id="spotlight-heading"
              className="font-serif text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              Spotlight
            </h2>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--accent-thread)' }}
          >
            All features <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main feature */}
          <button
            className="lg:col-span-2 card card-lift overflow-hidden text-left group"
            onClick={() => onNavigate(`thread/${spotlightFeature.slug}`)}
          >
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={spotlightFeature.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(12,10,9,0.85) 0%, rgba(12,10,9,0.2) 60%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-2 py-0.5 text-xs font-bold tracking-widest uppercase rounded"
                    style={{ background: 'var(--accent-thread)', color: 'white' }}
                  >
                    {spotlightFeature.category}
                  </span>
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <Clock size={10} />
                    {spotlightFeature.readTime}
                  </span>
                </div>
                <h3
                  className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {spotlightFeature.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}
              >
                {spotlightFeature.subtitle}
              </p>
              <span
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: 'var(--accent-thread)' }}
              >
                Read the full thread <ArrowRight size={14} />
              </span>
            </div>
          </button>

          {/* Secondary features */}
          <div className="space-y-4">
            {secondaryFeatures.map(feature => (
              <button
                key={feature.slug}
                className="card card-lift overflow-hidden text-left group w-full flex gap-4"
                onClick={() => onNavigate(feature.slug)}
              >
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
                  <img
                    src={feature.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag">{feature.category}</span>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                      <Clock size={9} />
                      {feature.readTime}
                    </span>
                  </div>
                  <h3
                    className="font-serif text-sm font-bold leading-snug"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {feature.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

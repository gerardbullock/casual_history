import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const columns = [
    {
      label: 'Explore',
      links: [
        { label: 'Causal Threads', page: 'threads' },
        { label: 'Encyclopedia', page: 'encyclopedia' },
        { label: 'Maps & Timelines', page: 'maps' },
        { label: 'People', page: 'people' },
        { label: 'Policies', page: 'policies' },
        { label: 'Places', page: 'places' },
      ],
    },
    {
      label: 'Themes',
      links: [
        { label: 'Housing & Wealth', page: 'thread-housing' },
        { label: 'Criminal Justice', page: 'thread-justice' },
        { label: 'Political Power', page: 'thread-politics' },
        { label: 'Health & Medicine', page: 'thread-health' },
        { label: 'Education', page: 'thread-education' },
        { label: 'Labor & Economics', page: 'thread-labor' },
      ],
    },
    {
      label: 'Learn',
      links: [
        { label: 'General Readers', page: 'learn-general' },
        { label: 'Students', page: 'learn-students' },
        { label: 'Educators', page: 'learn-educators' },
        { label: 'Teaching Resources', page: 'teaching' },
        { label: 'Today\'s Issues', page: 'today' },
        { label: 'Source Shelf', page: 'sources' },
      ],
    },
    {
      label: 'About',
      links: [
        { label: 'Our Mission', page: 'about' },
        { label: 'Editorial Standards', page: 'editorial' },
        { label: 'Contributors', page: 'contributors' },
        { label: 'Methodology', page: 'methodology' },
        { label: 'Accessibility', page: 'accessibility' },
        { label: 'Contact', page: 'contact' },
      ],
    },
  ];

  return (
    <footer
      role="contentinfo"
      className="mt-24 pt-16 pb-10 border-t"
      style={{
        background: 'var(--bg-inverse)',
        borderColor: 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-4"
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-thread)' }}
              >
                <span className="font-serif text-white font-bold text-sm select-none">CH</span>
              </div>
              <span className="font-serif font-bold text-base" style={{ color: 'var(--text-inverse)' }}>
                Causal History
              </span>
            </button>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-inverse-muted)' }}>
              Understand the chain, not just the event. A public platform connecting Black history to present-day America.
            </p>
            <span className="section-label" style={{ color: 'var(--accent-thread)' }}>
              Free &amp; Open Access
            </span>
          </div>

          {/* Nav columns */}
          {columns.map(col => (
            <div key={col.label}>
              <h3
                className="section-label mb-4"
                style={{ color: 'var(--text-inverse-muted)' }}
              >
                {col.label}
              </h3>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.page}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-sm transition-colors hover:text-white text-left"
                      style={{ color: 'var(--text-inverse-muted)' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t mb-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'var(--text-inverse-muted)' }}>
          <p>
            &copy; {new Date().getFullYear()} Causal History. Content published under{' '}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white inline-flex items-center gap-1"
            >
              CC BY-NC-SA 4.0 <ExternalLink size={10} />
            </a>
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => onNavigate('accessibility')} className="hover:text-white transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

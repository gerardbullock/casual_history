import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ThreadPage } from './pages/ThreadPage';
import { ThreadsPage } from './pages/ThreadsPage';
import { ExplorePage } from './pages/ExplorePage';
import { EncyclopediaPage } from './pages/EncyclopediaPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';

type Page = string;

function GenericPage({ title, onNavigate }: { title: string; onNavigate: (p: string) => void }) {
  return (
    <main id="main-content" className="pt-32 pb-24 min-h-screen" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center py-24">
        <h1
          className="font-serif text-4xl font-bold mb-4"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
        >
          {title}
        </h1>
        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-text)' }}>
          This section is being built. Check back soon, or explore what's available now.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm"
          style={{ background: 'var(--accent-thread)', color: 'white' }}
        >
          Return Home
        </button>
      </div>
    </main>
  );
}

function getPageTitle(page: Page): string {
  const titles: Record<string, string> = {
    maps: 'Maps & Timelines',
    today: 'Today\'s Issues',
    teaching: 'Teaching Resources',
    sources: 'Source Shelf',
    learn: 'Learning Paths',
    'learn-general': 'For General Readers',
    'learn-students': 'For Students',
    'learn-educators': 'For Educators',
    'learn-researchers': 'For Researchers',
    'teaching-guides': 'Discussion Guides',
    methodology: 'Methodology',
    contributors: 'Contributors',
    editorial: 'Editorial Standards',
    accessibility: 'Accessibility',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms of Use',
    people: 'People',
    policies: 'Policies',
    places: 'Places',
  };
  return titles[page] || page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    if (currentPage === 'home') return <HomePage onNavigate={navigate} />;
    if (currentPage === 'threads') return <ThreadsPage onNavigate={navigate} />;
    if (currentPage.startsWith('thread/')) {
      const slug = currentPage.replace('thread/', '');
      return <ThreadPage slug={slug} onNavigate={navigate} />;
    }
    if (currentPage === 'explore') return <ExplorePage onNavigate={navigate} />;
    if (currentPage === 'encyclopedia') return <EncyclopediaPage onNavigate={navigate} />;
    if (currentPage === 'search') return <SearchPage onNavigate={navigate} />;
    if (currentPage === 'about') return <AboutPage onNavigate={navigate} />;
    return <GenericPage title={getPageTitle(currentPage)} onNavigate={navigate} />;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Skip navigation link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        currentPage={currentPage}
        onNavigate={navigate}
      />

      {renderPage()}

      {currentPage !== 'home' && <Footer onNavigate={navigate} />}
      {currentPage === 'home' && <Footer onNavigate={navigate} />}
    </div>
  );
}

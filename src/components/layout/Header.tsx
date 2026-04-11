import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { Theme } from '../../types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { label: 'Explore', page: 'explore' },
  {
    label: 'Threads',
    page: 'threads',
    children: [
      { label: 'All Threads', page: 'threads' },
      { label: 'Housing & Wealth', page: 'thread-housing' },
      { label: 'Criminal Justice', page: 'thread-justice' },
      { label: 'Political Power', page: 'thread-politics' },
      { label: 'Health & Medicine', page: 'thread-health' },
      { label: 'Education', page: 'thread-education' },
    ],
  },
  { label: 'Encyclopedia', page: 'encyclopedia' },
  { label: 'Maps & Timelines', page: 'maps' },
  {
    label: 'Learn',
    page: 'learn',
    children: [
      { label: 'General Readers', page: 'learn-general' },
      { label: 'Students', page: 'learn-students' },
      { label: 'Educators', page: 'learn-educators' },
      { label: 'Researchers', page: 'learn-researchers' },
    ],
  },
  { label: 'Today', page: 'today' },
];

export function Header({ theme, onToggleTheme, currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header
      ref={headerRef}
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-md'
          : ''
      }`}
      style={{
        background: scrolled
          ? 'var(--bg-surface)'
          : 'var(--bg-page)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-default)' : 'var(--border-subtle)'}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
            aria-label="Causal History — return to homepage"
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent-thread)' }}
            >
              <span className="font-serif text-white font-bold text-sm leading-none select-none">CH</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span
                className="font-serif font-bold text-base tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Causal History
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}
              >
                Understand the chain
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map(item => (
              <div
                key={item.page}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.page)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => !item.children && handleNav(item.page)}
                  aria-expanded={item.children ? activeDropdown === item.page : undefined}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors duration-150 ${
                    currentPage === item.page || currentPage.startsWith(item.page)
                      ? ''
                      : 'hover:bg-[var(--bg-surface-2)]'
                  }`}
                  style={{
                    color: currentPage === item.page || currentPage.startsWith(item.page)
                      ? 'var(--accent-thread)'
                      : 'var(--text-secondary)',
                  }}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-150 ${activeDropdown === item.page ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {item.children && activeDropdown === item.page && (
                  <div
                    role="menu"
                    className="absolute top-full left-0 mt-1 py-1 w-52 rounded-md shadow-lg z-50"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-default)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {item.children.map(child => (
                      <button
                        key={child.page}
                        role="menuitem"
                        onClick={() => handleNav(child.page)}
                        className="w-full text-left px-4 py-2 text-sm transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--bg-surface-2)'}
                        onMouseLeave={e => (e.target as HTMLElement).style.background = 'transparent'}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <form
                onSubmit={e => { e.preventDefault(); handleNav('search'); setSearchOpen(false); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search people, events, threads…"
                  aria-label="Search the archive"
                  className="w-64 px-3 py-1.5 rounded text-sm border focus:outline-none"
                  style={{
                    background: 'var(--bg-surface-2)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="p-1.5 rounded"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="p-2 rounded transition-colors hover:bg-[var(--bg-surface-2)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Search size={18} />
              </button>
            )}

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded transition-colors hover:bg-[var(--bg-surface-2)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded transition-colors hover:bg-[var(--bg-surface-2)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden border-t"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map(item => (
              <div key={item.page}>
                <button
                  onClick={() => handleNav(item.page)}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  className="w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors"
                  style={{
                    color: currentPage === item.page ? 'var(--accent-thread)' : 'var(--text-secondary)',
                    background: currentPage === item.page ? 'var(--bg-surface-2)' : 'transparent',
                  }}
                >
                  {item.label}
                </button>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map(child => (
                      <button
                        key={child.page}
                        onClick={() => handleNav(child.page)}
                        className="w-full text-left px-3 py-1.5 rounded text-xs transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
              <button
                onClick={() => handleNav('about')}
                className="px-3 py-2 text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                About
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

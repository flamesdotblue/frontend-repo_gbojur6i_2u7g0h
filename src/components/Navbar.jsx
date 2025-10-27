import React from 'react';
import { Sprout, Globe, User } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
];

export default function Navbar({ lang, setLang, t }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight">AgroSense</span>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="#weather" className="hover:text-gray-900 transition">{t('nav.weather')}</a>
            <a href="#farming" className="hover:text-gray-900 transition">{t('nav.farming')}</a>
            <a href="#features" className="hover:text-gray-900 transition">{t('nav.features')}</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <label className="sr-only" htmlFor="lang-select">Language</label>
              <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 shadow-sm">
                <Globe className="h-4 w-4" />
                <select
                  id="lang-select"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent focus:outline-none"
                  aria-label="Language selector"
                >
                  {LANGS.map(l => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-emerald-700 focus:outline-none">
              <User className="h-4 w-4" />
              <span>{t('nav.login')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

import React from 'react';

export default function Footer({ t }) {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} AgroSense — {t('footer.rights')}</p>
        <div className="text-xs text-gray-500">
          {t('footer.disclaimer')}
        </div>
      </div>
    </footer>
  );
}

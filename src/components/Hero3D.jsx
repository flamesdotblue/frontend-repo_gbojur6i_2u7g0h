import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D({ t }) {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              AgroSense — {t('hero.title')}
            </h1>
            <p className="mt-3 text-gray-600 max-w-prose">
              {t('hero.subtitle')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#weather" className="inline-flex rounded-lg bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700">
                {t('hero.cta')}
              </a>
              <a href="#features" className="inline-flex rounded-lg bg-white px-5 py-3 text-emerald-700 font-medium shadow border border-emerald-200 hover:bg-emerald-50">
                {t('nav.features')}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

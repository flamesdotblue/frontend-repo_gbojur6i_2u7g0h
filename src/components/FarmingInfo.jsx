import React from 'react';
import { Sprout, MapPin, ShoppingBag, Users } from 'lucide-react';

export default function FarmingInfo({ t }) {
  return (
    <section id="farming" className="bg-gradient-to-b from-white to-emerald-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t('farming.title')}</h2>
            <p className="text-sm text-gray-600 mt-1">{t('farming.subtitle')}</p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{t('farming.locationHint')}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5" id="features">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Sprout className="h-5 w-5 text-emerald-600" />
              <h3 className="font-medium">{t('features.pestDetector.title')}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t('features.pestDetector.desc')}</p>
            <span className="inline-flex text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 px-2 py-1">{t('common.comingSoon')}</span>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
              <h3 className="font-medium">{t('features.marketplace.title')}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t('features.marketplace.desc')}</p>
            <span className="inline-flex text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 px-2 py-1">{t('common.comingSoon')}</span>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <h3 className="font-medium">{t('features.labor.title')}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t('features.labor.desc')}</p>
            <span className="inline-flex text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 px-2 py-1">{t('common.comingSoon')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

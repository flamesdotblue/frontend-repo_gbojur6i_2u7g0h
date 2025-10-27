import React, { useEffect, useState } from 'react';
import { Cloud, MapPin, Wind, Droplets, Thermometer, MessageCircle } from 'lucide-react';

const OWM_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const WAPI_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

export default function WeatherDashboard({ t }) {
  const [city, setCity] = useState('Pune');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [provider, setProvider] = useState(WAPI_KEY ? 'weatherapi' : 'openweather');

  const fetchWeather = async (q) => {
    try {
      setLoading(true);
      setError('');
      setData(null);

      if (WAPI_KEY) {
        // WeatherAPI
        const url = `https://api.weatherapi.com/v1/current.json?key=${WAPI_KEY}&q=${encodeURIComponent(q)}&aqi=no`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const json = await res.json();
        // Normalize to a common shape
        setData({
          name: json?.location?.name,
          desc: json?.current?.condition?.text,
          temp: json?.current?.temp_c,
          feels_like: json?.current?.feelslike_c,
          wind: json?.current?.wind_kph,
          humidity: json?.current?.humidity,
          units: { temp: '°C', wind: 'kph' },
        });
        setProvider('weatherapi');
      } else if (OWM_KEY) {
        // OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${OWM_KEY}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const json = await res.json();
        setData({
          name: json?.name,
          desc: json?.weather?.[0]?.description,
          temp: json?.main?.temp,
          feels_like: json?.main?.feels_like,
          wind: json?.wind?.speed,
          humidity: json?.main?.humidity,
          units: { temp: '°C', wind: 'm/s' },
        });
        setProvider('openweather');
      } else {
        throw new Error('No API key');
      }
    } catch (e) {
      setError(t('weather.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (WAPI_KEY || OWM_KEY) {
      fetchWeather(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const missingKeyMsg = WAPI_KEY
    ? ''
    : OWM_KEY
    ? ''
    : `${t('weather.missingKey')} You can also use VITE_WEATHERAPI_KEY for WeatherAPI.`;

  return (
    <section id="weather" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t('weather.title')}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{data?.name || city}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t('weather.inputPlaceholder')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                onClick={() => fetchWeather(city)}
                disabled={!(WAPI_KEY || OWM_KEY) || loading}
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium shadow hover:bg-emerald-700 disabled:opacity-60"
              >
                {loading ? t('weather.loading') : t('weather.check')}
              </button>
            </div>

            {missingKeyMsg && (
              <div className="mb-4 rounded-md bg-amber-50 text-amber-800 p-3 text-sm">
                {missingKeyMsg}
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-md bg-rose-50 text-rose-700 p-3 text-sm">
                {error}
              </div>
            )}

            {data && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-200 p-5 bg-gradient-to-br from-emerald-50 to-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Cloud className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-medium">{t('weather.current')}</h3>
                  </div>
                  <div className="text-5xl font-semibold tracking-tight">
                    {Math.round(data.temp)}{data.units.temp}
                  </div>
                  <div className="text-gray-600 capitalize">{data.desc}</div>
                  <div className="mt-2 text-xs text-gray-500">Provider: {provider === 'weatherapi' ? 'WeatherAPI' : 'OpenWeatherMap'}</div>
                </div>

                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <Thermometer className="h-5 w-5 mx-auto text-gray-700" />
                      <div className="mt-1 text-sm text-gray-500">{t('weather.feels')}</div>
                      <div className="font-medium">{Math.round(data.feels_like)}{data.units.temp}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <Wind className="h-5 w-5 mx-auto text-gray-700" />
                      <div className="mt-1 text-sm text-gray-500">{t('weather.wind')}</div>
                      <div className="font-medium">{Math.round(data.wind)} {data.units.wind}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <Droplets className="h-5 w-5 mx-auto text-gray-700" />
                      <div className="mt-1 text-sm text-gray-500">{t('weather.humidity')}</div>
                      <div className="font-medium">{Math.round(data.humidity)}%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold">{t('chat.title')}</h3>
            <p className="text-sm text-gray-600 mt-1">{t('chat.subtitle')}</p>
          </div>
          <div className="p-6">
            <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center">
              <MessageCircle className="h-8 w-8 text-gray-400 mx-auto" />
              <p className="mt-2 text-sm text-gray-500">{t('chat.placeholder')}</p>
              <button disabled className="mt-3 inline-flex items-center rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700">
                {t('chat.comingSoon')}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import WeatherDashboard from './components/WeatherDashboard';
import FarmingInfo from './components/FarmingInfo';
import Footer from './components/Footer';

const STRINGS = {
  en: {
    nav: { weather: 'Weather', farming: 'Farming', features: 'Features', login: 'Login' },
    hero: {
      title: 'Smart Farming Assistant',
      subtitle: 'Make data-driven decisions with live weather, local insights, and AI tools built for farmers.',
      cta: 'Get Started',
    },
    weather: {
      title: 'Live Weather',
      inputPlaceholder: 'Enter city (e.g., Pune)',
      check: 'Check Weather',
      loading: 'Loading...',
      error: 'Unable to fetch weather. Try a different city.',
      missingKey: 'Add VITE_OPENWEATHER_API_KEY in your environment to enable live weather.',
      current: 'Current Conditions',
      feels: 'Feels Like',
      wind: 'Wind',
      humidity: 'Humidity',
    },
    chat: {
      title: 'AI Chat Assistant',
      subtitle: 'Ask agronomy questions, get tips and recommendations.',
      placeholder: 'AI chat is coming soon.',
      comingSoon: 'Coming Soon',
    },
    farming: {
      title: 'Location-based Farming Info',
      subtitle: 'View crop suggestions, sowing windows, and irrigation advice for your region.',
      locationHint: 'Personalized by your location',
    },
    features: {
      pestDetector: { title: 'Pest Detector', desc: 'Identify pests and get treatment guidance using computer vision.' },
      marketplace: { title: 'Marketplace', desc: 'Discover inputs and sell produce directly to buyers.' },
      labor: { title: 'Labor Connect', desc: 'Find skilled farm labor and nearby experts.' },
    },
    footer: {
      rights: 'All rights reserved.',
      disclaimer: 'Built for demonstration. Not a substitute for professional agronomy advice.',
    },
    common: { comingSoon: 'Coming Soon' },
  },
  hi: {
    nav: { weather: 'मौसम', farming: 'खेती', features: 'फ़ीचर्स', login: 'लॉगिन' },
    hero: {
      title: 'स्मार्ट खेती सहायक',
      subtitle: 'लाइव मौसम, स्थानीय जानकारी और AI टूल्स के साथ बेहतर निर्णय लें।',
      cta: 'शुरू करें',
    },
    weather: {
      title: 'लाइव मौसम',
      inputPlaceholder: 'शहर दर्ज करें (जैसे पुणे)',
      check: 'मौसम देखें',
      loading: 'लोड हो रहा है...',
      error: 'मौसम लोड नहीं हो सका। कृपया दूसरा शहर आज़माएँ।',
      missingKey: 'लाइव मौसम के लिए VITE_OPENWEATHER_API_KEY जोड़ें।',
      current: 'वर्तमान स्थिति',
      feels: 'महसूस होता है',
      wind: 'हवा',
      humidity: 'नमी',
    },
    chat: {
      title: 'AI चैट सहायक',
      subtitle: 'खेती से जुड़े सवाल पूछें और सुझाव पाएं।',
      placeholder: 'AI चैट जल्द ही उपलब्ध होगा।',
      comingSoon: 'जल्द आ रहा है',
    },
    farming: {
      title: 'स्थान आधारित खेती जानकारी',
      subtitle: 'आपके क्षेत्र के लिए फसल सुझाव, बुवाई समय और सिंचाई सलाह।',
      locationHint: 'आपके स्थान के आधार पर',
    },
    features: {
      pestDetector: { title: 'कीट पहचान', desc: 'कंप्यूटर विज़न से कीट पहचानें और उपचार सुझाव पाएं।' },
      marketplace: { title: 'मार्केटप्लेस', desc: 'कृषि इनपुट्स और उत्पादों की खरीद-बिक्री।' },
      labor: { title: 'श्रमिक कनेक्ट', desc: 'कुशल श्रमिक और नज़दीकी विशेषज्ञ खोजें।' },
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित।',
      disclaimer: 'डेमो हेतु निर्मित। पेशेवर कृषि सलाह का विकल्प नहीं।',
    },
    common: { comingSoon: 'जल्द आ रहा है' },
  },
  mr: {
    nav: { weather: 'हवामान', farming: 'शेती', features: 'सुविधा', login: 'लॉगिन' },
    hero: {
      title: 'स्मार्ट शेती सहाय्यक',
      subtitle: 'लाईव्ह हवामान, स्थानिक माहिती आणि AI साधनांसह निर्णय घ्या.',
      cta: 'सुरू करा',
    },
    weather: {
      title: 'लाईव्ह हवामान',
      inputPlaceholder: 'शहर लिहा (उदा. पुणे)',
      check: 'हवामान पहा',
      loading: 'लोड होत आहे...',
      error: 'हवामान मिळत नाही. दुसरे शहर वापरा.',
      missingKey: 'लाईव्ह हवामानासाठी VITE_OPENWEATHER_API_KEY जोडा.',
      current: 'सध्याची स्थिती',
      feels: 'जसे वाटते',
      wind: 'वारा',
      humidity: 'आर्द्रता',
    },
    chat: {
      title: 'AI चॅट सहाय्यक',
      subtitle: 'शेतीविषयक प्रश्न विचारा आणि सल्ला घ्या.',
      placeholder: 'AI चॅट लवकरच उपलब्ध होईल.',
      comingSoon: 'लवकरच येत आहे',
    },
    farming: {
      title: 'स्थानाधारित शेती माहिती',
      subtitle: 'तुमच्या भागासाठी पिके, पेरणी व सिंचन सल्ला.',
      locationHint: 'तुमच्या स्थानानुसार',
    },
    features: {
      pestDetector: { title: 'קिड नियंत्रण', desc: 'कंप्यूटर व्हिजनने किड ओळखा आणि उपाय.' },
      marketplace: { title: 'बाजारपेठ', desc: 'शेती इनपुट व उत्पादनांची खरेदी-विक्री.' },
      labor: { title: 'मजूर संपर्क', desc: 'कुशल मजूर व तज्ञ शोधा.' },
    },
    footer: {
      rights: 'सर्व हक्क राखीव.',
      disclaimer: 'डेमो साठी. व्यावसायिक कृषी सल्ल्याचा पर्याय नाही.',
    },
    common: { comingSoon: 'लवकरच येत आहे' },
  },
};

export default function App() {
  const [lang, setLang] = useState('en');
  const dict = useMemo(() => STRINGS[lang] || STRINGS.en, [lang]);
  const t = (key) => key.split('.').reduce((o, k) => (o ? o[k] : key), dict);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main>
        <Hero3D t={t} />
        <WeatherDashboard t={t} />
        <FarmingInfo t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}

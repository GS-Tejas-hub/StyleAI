import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import CategorySelection from './views/CategorySelection';
import UploadFlow from './views/UploadFlow';
import Processing from './views/Processing';
import Results from './views/Results';
import HowItWorks from './views/HowItWorks';
import Gallery from './views/Gallery';
import Pricing from './views/Pricing';
import AboutUs from './views/AboutUs';
import SignIn from './views/SignIn';

import { generateHairstyle, generateOutfit } from './lib/api';

function App() {
  const [view, setView] = useState('home');
  const [gender, setGender] = useState(null);
  const [category, setCategory] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [results, setResults] = useState([]);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setView('category');
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setView('upload');
  };

  const handleUploadComplete = async (images) => {
    setUploadedImages(images);
    setView('processing');

    // Trigger API call
    try {
      const data = category === 'hairstyle'
        ? await generateHairstyle(images, gender)
        : await generateOutfit(images.full, gender);
      setResults(data);
    } catch (error) {
      console.error("Generation failed", error);
      // Handle error state
    }
  };

  const handleProcessingComplete = () => {
    setView('results');
  };

  const handleBack = () => {
    if (view === 'category') setView('home');
    if (view === 'upload') setView('category');
    if (view === 'results') {
      setView('home');
      setGender(null);
      setCategory(null);
      setUploadedImages(null);
      setResults([]);
    }
  };

  const handleHome = () => {
    setView('home');
    setGender(null);
    setCategory(null);
    setUploadedImages(null);
    setResults([]);
  };

  const handleNavigate = (page) => {
    setView(page);
    setGender(null);
    setCategory(null);
    setUploadedImages(null);
    setResults([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      <Header onHome={handleHome} onNavigate={handleNavigate} />

      <main className="flex-grow relative">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        {view === 'home' && (
          <Home onSelectGender={handleGenderSelect} />
        )}

        {view === 'category' && (
          <CategorySelection
            gender={gender}
            onSelectCategory={handleCategorySelect}
            onBack={handleBack}
          />
        )}

        {view === 'upload' && (
          <UploadFlow
            category={category}
            onUploadComplete={handleUploadComplete}
            onBack={handleBack}
          />
        )}

        {view === 'processing' && (
          <Processing onComplete={handleProcessingComplete} />
        )}

        {view === 'results' && (
          <Results
            category={category}
            results={results}
            onBack={handleBack}
          />
        )}

        {view === 'how-it-works' && <HowItWorks />}
        {view === 'gallery' && <Gallery />}
        {view === 'pricing' && <Pricing />}
        {view === 'about' && <AboutUs />}
        {view === 'signin' && <SignIn />}
      </main>

      <Footer />
    </div>
  );
}

export default App;

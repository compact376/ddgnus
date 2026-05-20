import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Payments from './pages/Payments';
import SoulBodyWellness from './pages/programs/SoulBodyWellness';
import Publications from './pages/programs/Publications';
import GlobalIslamicResearchEthical from './pages/programs/GlobalIslamicResearchEthical';
import ScoutingMovement from './pages/programs/ScoutingMovement';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/programs/soul-body-wellness" element={<SoulBodyWellness />} />
        <Route path="/programs/publications" element={<Publications />} />
        <Route path="/programs/global-islamic-research-ethical" element={<GlobalIslamicResearchEthical />} />
        <Route path="/programs/scouting-movement" element={<ScoutingMovement />} />
      </Routes>
    </BrowserRouter>
  );
}

import React, { useEffect } from 'react';
import { HomeHero } from '../components/HomeHero';
import { HomeResearch } from '../components/HomeResearch';
import { HomeProject } from '../components/HomeProject';
import { HomeSupport } from '../components/HomeSupport';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-[#060a08] overflow-hidden">
      {/* 01 — INICIO / HERO */}
      <HomeHero />

      {/* 02 — INVESTIGACIÓN */}
      <HomeResearch />

      {/* 03 — EL PROYECTO */}
      <HomeProject />

      {/* 04 — TIENDA / DONACIONES */}
      <HomeSupport />
    </main>
  );
};

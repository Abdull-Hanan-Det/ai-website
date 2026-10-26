/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { WorkProcessSection } from './components/WorkProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DeploymentModal } from './components/DeploymentModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('AI Agents');
  const [deployModalOpen, setDeployModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'projects', 'skills', 'process', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id === 'process' ? 'skills' : id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHireMeClick = () => {
    setSelectedProjectType('Custom AI Automation Consultation');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] flex flex-col selection:bg-[#6366F1]/30 selection:text-white">
      <Navbar activeSection={activeSection} onHireMeClick={handleHireMeClick} />

      <main className="flex-grow">
        <HeroSection onSelectServiceForContact={setSelectedProjectType} />
        <AboutSection onOpenDeployModal={() => setDeployModalOpen(true)} />
        <ServicesSection onSelectService={setSelectedProjectType} />
        <ProjectsSection onSelectProjectInquiry={setSelectedProjectType} />
        <SkillsSection />
        <WorkProcessSection />
        <ContactSection preselectedProjectType={selectedProjectType} />
      </main>

      <Footer onOpenDeployModal={() => setDeployModalOpen(true)} />

      <DeploymentModal
        isOpen={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
      />
    </div>
  );
}

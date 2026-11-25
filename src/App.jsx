import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SolarHubHero from './components/SolarHubHero';
import EquipmentSection from './components/EquipmentSection';
import PricingSection from './components/PricingSection';
import ProjectsSection from './components/ProjectsSection';
import FaqSection from './components/FaqSection';
import FooterAndLeadForm from './components/FooterAndLeadForm';
import FloatingActionsAndModal from './components/FloatingActionsAndModal';
import { trackLeadEvent } from './utils/solarUtils';

export default function App() {
  const [selectedPackageName, setSelectedPackageName] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? '' : current));
    }, 4500);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectComboPackage = useCallback(
    (pkg) => {
      setSelectedPackageName(pkg.name);
      showToast(`Đã chọn "${pkg.shortTitle}" — Điền SĐT để nhận báo giá.`);
      scrollToSection('lead-form');
    },
    [scrollToSection, showToast]
  );

  const handleInspectEquipment = useCallback(
    (categoryName) => {
      setSelectedPackageName(`Tư vấn thiết bị chính hãng: ${categoryName}`);
      scrollToSection('lead-form');
    },
    [scrollToSection]
  );

  const handleRequestSimilarProject = useCallback(
    (projectTitle) => {
      setSelectedPackageName(`Tư vấn mẫu: ${projectTitle}`);
      showToast(`Đã chọn mẫu "${projectTitle}"`);
      scrollToSection('lead-form');
    },
    [scrollToSection, showToast]
  );

  const handleLeadSubmission = useCallback(
    (leadPayload) => {
      trackLeadEvent(leadPayload);
      setSubmittedLead(leadPayload);
      showToast('Đã gửi yêu cầu! Kỹ sư Ninh Bình sẽ liên hệ qua Zalo trong 5 phút.');
    },
    [showToast]
  );

  return (
    <div className="min-h-screen flex flex-col text-[#18181B]">
      {/* 1. Floating Pill Navigation Header */}
      <Header
        onNavigate={scrollToSection}
        onRequestSurvey={() => scrollToSection('lead-form')}
      />

      <main className="flex-1">
        {/* 2. Architectural Solar Hub (Hero + 3D Isometric House + 4-Column Interactive Bento + Inline Lead Bar) */}
        <SolarHubHero
          onSubmitHubLead={handleLeadSubmission}
          onNavigate={scrollToSection}
        />

        {/* 3. Tier-1 Equipment Showcase (Frosted Warm-Glass Bento Spec Cards) */}
        <EquipmentSection onInspectWarranty={handleInspectEquipment} />

        {/* 4. Turnkey Packages (3 Minimalist Architectural Cards) */}
        <PricingSection onSelectPackage={handleSelectComboPackage} />

        {/* 5. Real Projects in Ninh Binh */}
        <ProjectsSection onRequestSimilar={handleRequestSimilarProject} />

        {/* 6. Northern Vietnam FAQ */}
        <FaqSection />
      </main>

      {/* 7. Warm Glass Bottom Lead Form & Footer */}
      <FooterAndLeadForm
        selectedPackageName={selectedPackageName}
        onClearSelectedPackage={() => setSelectedPackageName('')}
        onSubmitBottomLead={handleLeadSubmission}
        onNavigate={scrollToSection}
      />

      {/* Floating Zalo, Mobile Frosted Sticky Bar & Thank-You Modal */}
      <FloatingActionsAndModal
        onNavigateCalculator={() => scrollToSection('calculator')}
        submittedLead={submittedLead}
        onCloseModal={() => setSubmittedLead(null)}
        toastMessage={toastMessage}
      />
    </div>
  );
}

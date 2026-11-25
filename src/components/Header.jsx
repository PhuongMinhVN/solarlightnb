import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

function SunRayLogo() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9 shrink-0"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="12" fill="#18181B" />
      <circle cx="18" cy="18" r="5.5" fill="url(#sunCoreGrad)" />
      <g stroke="url(#sunCoreGrad)" strokeWidth="2" strokeLinecap="round">
        <line x1="18" y1="6.5" x2="18" y2="9.5" />
        <line x1="18" y1="26.5" x2="18" y2="29.5" />
        <line x1="6.5" y1="18" x2="9.5" y2="18" />
        <line x1="26.5" y1="18" x2="29.5" y2="18" />
        <line x1="9.9" y1="9.9" x2="12" y2="12" />
        <line x1="24" y1="24" x2="26.1" y2="26.1" />
        <line x1="26.1" y1="9.9" x2="24" y2="12" />
        <line x1="12" y1="24" x2="9.9" y2="26.1" />
      </g>
      <defs>
        <linearGradient id="sunCoreGrad" x1="8" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5E1A" />
          <stop offset="0.55" stopColor="#FF8A00" />
          <stop offset="1" stopColor="#FFC700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Header({ onNavigate, onRequestSurvey }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navTabs = [
    { id: 'overview', label: 'Tổng Quan', target: 'overview' },
    { id: 'calculator', label: 'Tính Tiền Điện', target: 'calculator' },
    { id: 'pricing', label: 'Gói Lắp Đặt', target: 'pricing' },
    { id: 'projects', label: 'Công Trình Thực Tế', target: 'projects' },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    setMobileOpen(false);
    if (tab.target === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(tab.target);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full pt-3 sm:pt-4 pb-2">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Minimalist Sun-Ray Brand Mark */}
        <button
          type="button"
          onClick={() => handleTabClick(navTabs[0])}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <SunRayLogo />
          <div>
            <span className="block font-extrabold text-sm sm:text-base tracking-tight text-[#18181B]">
              SolarLight
            </span>
            <span className="block text-[11px] font-medium text-[#71717A] leading-none mt-0.5">
              Ninh Bình · PMVN Technology
            </span>
          </div>
        </button>

        {/* Center: Floating Glass Pill Navigation */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center rounded-full bg-white/60 backdrop-blur-md border border-white/85 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white shadow-sm'
                    : 'text-[#52525B] hover:text-[#18181B] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Action Pill CTA */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={onRequestSurvey}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#18181B] hover:bg-[#27272A] text-white text-xs sm:text-sm font-semibold shadow-[0_8px_24px_rgba(24,24,27,0.14)] transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>Khảo Sát Miễn Phí</span>
            <ArrowUpRight className="w-4 h-4 text-[#FFC700]" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onRequestSurvey}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#18181B] text-white text-xs font-semibold cursor-pointer"
          >
            <span>Khảo Sát</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFC700]" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Mở menu"
            className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md border border-white/85 flex items-center justify-center text-[#18181B] cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Glass Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bento-glass-strong rounded-[24px] p-3 space-y-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white'
                      : 'text-[#18181B] hover:bg-white/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

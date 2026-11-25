import React, { useState } from 'react';
import {
  ArrowUpRight,
  Zap,
  Leaf,
  BatteryCharging,
  MapPin,
  Sun,
} from 'lucide-react';
import { calculateSolarMetrics, formatVND, formatNumber } from '../utils/solarUtils';
import { QUICK_BILL_PRESETS, ROOF_TYPES, NINH_BINH_DISTRICTS } from '../data/solarData';

const MIN_BILL = 1000000;
const MAX_BILL = 30000000;
const STEP_BILL = 500000;

/**
 * Widget 2 SVG: Semicircular Speedometer Radial Tick Gauge
 */
function SemicircularPowerGauge({ kwp }) {
  const totalTicks = 25;
  // Map 3 kWp..30+ kWp smoothly onto 25 ticks so typical residential (3-15kWp) looks expressive
  const ratio = Math.min(1, Math.max(0.18, Math.log10(kwp + 1) / Math.log10(76)));
  const activeCount = Math.round(ratio * totalTicks);

  const cx = 110;
  const cy = 100;
  const rInner = 64;
  const rOuter = 82;

  const ticks = Array.from({ length: totalTicks }, (_, i) => {
    const t = i / (totalTicks - 1);
    const angleRad = Math.PI * (1 - t); // Left (180deg) -> Right (0deg)
    const x1 = cx + rInner * Math.cos(angleRad);
    const y1 = cy - rInner * Math.sin(angleRad);
    const x2 = cx + rOuter * Math.cos(angleRad);
    const y2 = cy - rOuter * Math.sin(angleRad);
    const isActive = i < activeCount;

    // Smooth interpolation from #FF5E1A -> #FF8A00 -> #FFC700
    let stroke = '#E4E2DC';
    if (isActive) {
      if (t < 0.35) stroke = '#FF5E1A';
      else if (t < 0.7) stroke = '#FF8A00';
      else stroke = '#FFC700';
    }

    return { x1, y1, x2, y2, stroke, isActive };
  });

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg viewBox="0 0 220 120" className="w-full max-w-[220px] overflow-visible">
        {ticks.map((tick, idx) => (
          <line
            key={idx}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.stroke}
            strokeWidth={tick.isActive ? 4.2 : 3.2}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        ))}
      </svg>
      <div className="-mt-12 text-center">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-extrabold tracking-tight text-[#18181B] tabular-nums">
            {kwp}
          </span>
          <span className="text-sm font-bold text-[#71717A]">kWp</span>
        </div>
        <span className="text-[11px] font-medium text-[#71717A]">
          Cấu hình chuẩn Ninh Bình
        </span>
      </div>
    </div>
  );
}

/**
 * Widget 3 SVG: Dual Arc Energy Balance (Solar Generated vs EVN Consumed)
 */
function DualEnergyArc({ solarKwh, consumedKwh }) {
  const maxRef = Math.max(solarKwh, consumedKwh, 1);
  const solarRatio = Math.min(1, solarKwh / maxRef);
  const consumedRatio = Math.min(1, consumedKwh / maxRef);

  const outerR = 54;
  const innerR = 40;
  const outerLen = Math.PI * outerR;
  const innerLen = Math.PI * innerR;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 144 82" className="w-full max-w-[164px] overflow-visible">
        <defs>
          <linearGradient id="dualSolarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5E1A" />
            <stop offset="55%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#FFC700" />
          </linearGradient>
        </defs>

        {/* Outer Track: Solar Output */}
        <path
          d="M 18 72 A 54 54 0 0 1 126 72"
          fill="none"
          stroke="#E5E3DD"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 18 72 A 54 54 0 0 1 126 72"
          fill="none"
          stroke="url(#dualSolarGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={outerLen}
          strokeDashoffset={outerLen * (1 - solarRatio)}
          className="transition-all duration-500 ease-out"
        />

        {/* Inner Track: Consumption */}
        <path
          d="M 32 72 A 40 40 0 0 1 112 72"
          fill="none"
          stroke="#ECEAE4"
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <path
          d="M 32 72 A 40 40 0 0 1 112 72"
          fill="none"
          stroke="#18181B"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeDasharray={innerLen}
          strokeDashoffset={innerLen * (1 - consumedRatio * 0.92)}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      <div className="w-full grid grid-cols-2 gap-2 mt-2 text-center">
        <div className="rounded-2xl bg-white/75 border border-white/90 px-2.5 py-2">
          <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-[#71717A]">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700]" />
            Tạo ra
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-[#18181B] tabular-nums mt-0.5">
            {formatNumber(solarKwh)} kWh
          </p>
        </div>

        <div className="rounded-2xl bg-white/75 border border-white/90 px-2.5 py-2">
          <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-[#71717A]">
            <span className="w-2 h-2 rounded-full bg-[#18181B]" />
            Tiêu thụ
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-[#18181B] tabular-nums mt-0.5">
            {formatNumber(consumedKwh)} kWh
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SolarHubHero({ onSubmitHubLead, onNavigate }) {
  const [monthlyBill, setMonthlyBill] = useState(5000000);
  const [selectedRoof, setSelectedRoof] = useState(ROOF_TYPES[0].label);
  const [imgLoaded, setImgLoaded] = useState(true);

  // Inline 3-input Lead Capture Bar
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(NINH_BINH_DISTRICTS[0]);
  const [formError, setFormError] = useState('');

  const metrics = calculateSolarMetrics(monthlyBill);
  const sliderPercent = ((monthlyBill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  // Payback bar fill percentage (shorter payback => fuller golden efficiency capsule)
  const roiEfficiencyPercent = Math.min(94, Math.max(68, Math.round((5.2 - Number(metrics.paybackYears)) * 38)));

  const handleHubSubmit = (e) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const cleanedPhone = phone.replace(/\s+/g, '');

    if (!trimmedName) {
      setFormError('Vui lòng nhập họ tên để kỹ sư tiện liên hệ.');
      return;
    }
    if (!/^(0|\+84)[0-9]{8,10}$/.test(cleanedPhone)) {
      setFormError('Vui lòng nhập số điện thoại / Zalo hợp lệ (10 số).');
      return;
    }

    setFormError('');
    onSubmitHubLead({
      fullName: trimmedName,
      phone: cleanedPhone,
      district,
      roofType: selectedRoof,
      monthlyBill: metrics.monthlyBill,
      recommendedKwp: metrics.recommendedKwp,
      estimatedValue: metrics.estimatedCost,
      monthlySavings: metrics.monthlySavings,
      selectedPackage: `Hệ thống đề xuất ${metrics.recommendedKwp} kWp (${selectedRoof})`,
      source: 'solar_hub_bento_calculator',
    });

    setFullName('');
    setPhone('');
  };

  return (
    <section id="overview" className="relative pt-4 sm:pt-6 pb-8 md:pb-10 overflow-hidden">
      {/* Warm Subtle Ambient Sun Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-[12%] w-[460px] h-[460px] rounded-full bg-gradient-to-br from-[#FFC700]/16 via-[#FF8A00]/10 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[45%] -left-24 w-[380px] h-[380px] rounded-full bg-white/60 blur-3xl"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* TOP HERO CANVAS: Editorial Title Block + 3D Isometric Architectural Solar House */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6 sm:mb-8">
          {/* Left Editorial Title Block */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/65 backdrop-blur-md border border-white/85 text-xs font-semibold text-[#52525B] shadow-[0_4px_16px_rgb(0,0,0,0.03)]">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700] animate-live-dot" />
              <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>Hoa Lư · Tam Điệp · Gia Viễn · Yên Khánh · Kim Sơn</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-[#18181B] leading-[1.06]">
              Điện Mặt Trời{' '}
              <span className="block bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#E69B00] bg-clip-text text-transparent">
                Ninh Bình
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-[17px] text-[#71717A] leading-relaxed max-w-md">
              Giải pháp năng lượng thông minh cho biệt thự, homestay &amp; nhà xưởng. Giảm tới{' '}
              <strong className="text-[#18181B] font-bold">85% hóa đơn điện</strong> hàng tháng.
            </p>

            {/* Minimal Quick Metrics Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('calculator')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white font-semibold text-sm shadow-[0_10px_28px_rgba(255,115,29,0.28)] hover:brightness-105 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Tính Tiền Tiết Kiệm</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-white/90 text-[#18181B] font-semibold text-sm shadow-[0_8px_24px_rgb(0,0,0,0.04)] transition-all cursor-pointer"
              >
                <span>Gói Lắp Đặt</span>
              </button>
            </div>
          </div>

          {/* Right Centerpiece: 3D Isometric Architectural Solar Villa + Floating Telemetry Badges */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full max-w-[640px] mx-auto">
              {/* Soft blended container for 3D Isometric Solar Villa */}
              <div className="relative rounded-[36px] overflow-hidden">
                {imgLoaded ? (
                  <img
                    src="/solar-villa-3d.jpg"
                    alt="Mô hình biệt thự kiến trúc hiện đại lắp điện mặt trời Ninh Bình"
                    onError={() => setImgLoaded(false)}
                    className="w-full h-auto max-h-[410px] object-contain mx-auto select-none drop-shadow-[0_24px_40px_rgba(24,24,27,0.09)] [mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,#000_72%,transparent_100%)]"
                  />
                ) : (
                  <div className="h-[320px] rounded-[32px] bento-glass flex items-center justify-center">
                    <Sun className="w-16 h-16 text-[#FF8A00]" />
                  </div>
                )}
              </div>

              {/* Floating Live Telemetry Pill 1 (Top-Left) */}
              <div className="absolute top-3 left-2 sm:top-6 sm:left-4 bento-glass-strong rounded-full px-3.5 py-2 flex items-center gap-2 animate-gentle-float">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700] animate-live-dot" />
                <div className="leading-tight">
                  <span className="block text-[10px] font-medium text-[#71717A]">Trạng thái</span>
                  <span className="block text-xs font-bold text-[#18181B]">Đang hòa lưới</span>
                </div>
              </div>

              {/* Floating Live Telemetry Pill 2 (Top-Right) */}
              <div className="hidden sm:flex absolute top-6 right-4 bento-glass-strong rounded-full px-3.5 py-2 items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-[#FF8A00]" />
                <div className="leading-tight">
                  <span className="block text-[10px] font-medium text-[#71717A]">Pin Hybrid</span>
                  <span className="block text-xs font-bold text-[#18181B] tabular-nums">94% đầy</span>
                </div>
              </div>

              {/* Floating Live Telemetry Pill 3 (Bottom-Right — Synced Live with Slider!) */}
              <div className="absolute bottom-3 right-2 sm:bottom-6 sm:right-4 bento-glass-strong rounded-full px-4 py-2.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] flex items-center justify-center text-white shadow-sm">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[10px] font-medium text-[#71717A]">Sản lượng ước tính</span>
                  <span className="block text-xs sm:text-sm font-extrabold text-[#18181B] tabular-nums">
                    {metrics.dailyKwh} kWh/ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-COLUMN INTERACTIVE BENTO TELEMETRY & CALCULATOR DASHBOARD */}
        <div
          id="calculator"
          className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {/* WIDGET 1: Interactive Monthly Bill Slider & Live Monthly Savings */}
          <div className="bento-glass rounded-[28px] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#71717A]">Tiết kiệm / tháng</span>
                <span className="w-8 h-8 rounded-full bg-white/75 border border-white/90 flex items-center justify-center text-[#18181B]">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <div className="mt-3">
                <p className="text-3xl font-extrabold tracking-tight text-[#18181B] tabular-nums">
                  {formatVND(metrics.monthlySavings)}
                </p>
                <p className="mt-1 text-xs font-medium text-[#71717A] tabular-nums">
                  Hóa đơn EVN hiện tại:{' '}
                  <strong className="text-[#18181B]">{formatVND(monthlyBill)}</strong>
                </p>
              </div>

              {/* Sleek Solar-Orange Slider */}
              <div className="mt-5">
                <input
                  type="range"
                  min={MIN_BILL}
                  max={MAX_BILL}
                  step={STEP_BILL}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  aria-label="Chọn hóa đơn tiền điện mỗi tháng"
                  className="w-full solar-amber-slider"
                  style={{
                    background: `linear-gradient(to right, #FF5E1A 0%, #FF8A00 ${sliderPercent * 0.65}%, #FFC700 ${sliderPercent}%, #E5E3DD ${sliderPercent}%, #E5E3DD 100%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#71717A] mt-1.5 tabular-nums">
                  <span>1Tr</span>
                  <span>15Tr</span>
                  <span>30Tr</span>
                </div>
              </div>
            </div>

            {/* Quick Preset Pills + Compact Roof Selector */}
            <div className="mt-4 space-y-2.5">
              <div className="grid grid-cols-4 gap-1.5">
                {QUICK_BILL_PRESETS.map((preset) => {
                  const isActive = monthlyBill === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setMonthlyBill(preset.value)}
                      className={`py-1.5 rounded-full text-xs font-bold tabular-nums transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white shadow-sm'
                          : 'bg-white/75 text-[#52525B] hover:bg-white border border-white/90'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-black/[0.04]">
                {ROOF_TYPES.map((roof) => {
                  const active = selectedRoof === roof.label;
                  return (
                    <button
                      key={roof.id}
                      type="button"
                      onClick={() => setSelectedRoof(roof.label)}
                      className={`py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-white text-[#18181B] shadow-2xs'
                          : 'text-[#71717A] hover:text-[#18181B]'
                      }`}
                    >
                      {roof.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* WIDGET 2: Semicircular Radial Dial — Recommended System Output (kWp) */}
          <div className="bento-glass rounded-[28px] p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#71717A]">Công suất đề xuất</span>
              <span className="w-8 h-8 rounded-full bg-white/75 border border-white/90 flex items-center justify-center text-[#18181B]">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <div className="my-2">
              <SemicircularPowerGauge kwp={metrics.recommendedKwp} />
            </div>

            <div className="rounded-2xl bg-white/75 border border-white/90 px-3.5 py-2.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#71717A]">Đầu tư tham khảo</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#18181B] tabular-nums">
                {formatVND(metrics.estimatedCost)}
              </span>
            </div>
          </div>

          {/* WIDGET 3: Dual Arc Energy Balance & Roof Area */}
          <div className="bento-glass rounded-[28px] p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#71717A]">Cân bằng điện / tháng</span>
              <span className="w-8 h-8 rounded-full bg-white/75 border border-white/90 flex items-center justify-center text-[#18181B]">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <div className="my-2">
              <DualEnergyArc
                solarKwh={metrics.solarMonthlyKwh}
                consumedKwh={metrics.monthlyKwh}
              />
            </div>

            <div className="mt-3 rounded-2xl bg-white/75 border border-white/90 px-3.5 py-2.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#71717A]">Diện tích mái ({selectedRoof})</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#18181B] tabular-nums">
                {formatNumber(metrics.roofArea)} m²
              </span>
            </div>
          </div>

          {/* WIDGET 4: Capsule Battery & ROI Progress Pill + CO2 Reduction */}
          <div className="bento-glass rounded-[28px] p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#71717A]">Hoàn vốn &amp; Môi trường</span>
              <span className="w-8 h-8 rounded-full bg-white/75 border border-white/90 flex items-center justify-center text-[#18181B]">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Capsule Progress Bar */}
            <div className="my-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-extrabold tracking-tight text-[#18181B] tabular-nums">
                  {metrics.paybackYears}{' '}
                  <span className="text-sm font-bold text-[#71717A]">năm</span>
                </span>
                <span className="text-[11px] font-bold text-[#FF5E1A] bg-[#FF8A00]/12 px-2.5 py-0.5 rounded-full">
                  Dùng 25+ năm
                </span>
              </div>

              {/* Sculpted Capsule Battery Track */}
              <div className="relative h-10 w-full rounded-full bg-[#E8E6E0] p-1.5 border border-white/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] flex items-center justify-end pr-3 transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${roiEfficiencyPercent}%` }}
                >
                  <span className="text-[11px] font-extrabold text-white tabular-nums">
                    ROI Cao
                  </span>
                </div>
              </div>
            </div>

            {/* Yearly Savings + CO2 Saved */}
            <div className="space-y-2">
              <div className="rounded-2xl bg-white/75 border border-white/90 px-3.5 py-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#71717A]">Tiết kiệm / năm</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#18181B] tabular-nums">
                  {formatVND(metrics.yearlySavings)}
                </span>
              </div>
              <div className="rounded-2xl bg-white/75 border border-white/90 px-3.5 py-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#71717A] flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  CO₂ giảm thải
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-700 tabular-nums">
                  {formatNumber(metrics.co2SavedYearlyKg)} kg/năm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INLINE GLASS LEAD CAPTURE BAR (Directly beneath the 4-Column Bento Grid) */}
        <form
          onSubmit={handleHubSubmit}
          className="mt-5 bento-glass-strong rounded-[28px] p-4 sm:p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            <div className="md:col-span-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Họ và tên của bạn"
                aria-label="Họ và tên"
                className="w-full h-full px-4 py-3.5 rounded-full bg-white/85 border border-black/[0.06] text-sm text-[#18181B] placeholder:text-[#71717A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div className="md:col-span-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại / Zalo"
                aria-label="Số điện thoại hoặc Zalo"
                className="w-full h-full px-4 py-3.5 rounded-full bg-white/85 border border-black/[0.06] text-sm text-[#18181B] tabular-nums placeholder:text-[#71717A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                aria-label="Khu vực tại Ninh Bình"
                className="w-full h-full px-4 py-3.5 rounded-full bg-white/85 border border-black/[0.06] text-sm font-medium text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              >
                {NINH_BINH_DISTRICTS.map((area) => (
                  <option key={area} value={area}>
                    {area} — Ninh Bình
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full h-full inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full bg-[#18181B] hover:bg-gradient-to-r hover:from-[#FF5E1A] hover:via-[#FF8A00] hover:to-[#FFC700] text-white font-bold text-sm shadow-[0_10px_24px_rgba(24,24,27,0.16)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <span className="tabular-nums">
                  Nhận Báo Giá Hệ {metrics.recommendedKwp} kWp Ngay
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>

          {formError && (
            <p className="mt-2.5 pl-4 text-xs font-semibold text-rose-600">{formError}</p>
          )}
        </form>
      </div>
    </section>
  );
}

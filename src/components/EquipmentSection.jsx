import React from 'react';
import { ArrowUpRight, Sun, Cpu, BatteryCharging, ShieldCheck } from 'lucide-react';
import { EQUIPMENT_BENTO } from '../data/solarData';

export default function EquipmentSection({ onInspectWarranty }) {
  const [panels, inverter, battery] = EQUIPMENT_BENTO;

  return (
    <section id="warranty" className="scroll-mt-24 py-6 md:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Unified Architectural Bento Shell */}
        <div className="bg-[#EFECE6]/70 border border-black/[0.06] rounded-[32px] p-5 md:p-7">
          {/* Sleek Compact Module Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700]" />
                Phần cứng Tier-1 Toàn Cầu
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B]">
                Thiết Bị Chính Hãng
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 border border-white text-xs font-semibold text-[#52525B] self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>CO/CQ chính ngạch · Quét QR hãng</span>
            </div>
          </div>

          {/* 12-Column Interlocking Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* LEFT (5 Cols): Oversized Feature Card — Tấm Pin Quang Điện */}
            <div className="lg:col-span-5 group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white/95 via-white/85 to-[#FFF1DB]/90 border border-white shadow-[0_8px_28px_rgb(0,0,0,0.04)] p-6 flex flex-col justify-between">
              {/* Subtle Solar Corner Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-14 -right-14 w-48 h-48 rounded-full bg-gradient-to-tr from-[#FF5E1A]/18 via-[#FF8A00]/12 to-transparent blur-2xl"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white flex items-center justify-center shadow-sm">
                    <Sun className="w-5 h-5" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onInspectWarranty && onInspectWarranty(panels.category)}
                    aria-label={`Tìm hiểu ${panels.category}`}
                    className="w-9 h-9 rounded-full bg-white/90 border border-black/[0.06] flex items-center justify-center text-[#18181B] group-hover:bg-[#18181B] group-hover:text-white transition-all cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#18181B] tracking-tight">
                  {panels.category}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#71717A]">{panels.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {panels.brands.map((brand) => (
                    <span
                      key={brand}
                      className="px-3 py-1 rounded-full bg-white border border-black/[0.06] text-xs font-bold text-[#18181B]"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bold Oversized KPI Row */}
              <div className="relative mt-7 pt-5 border-t border-black/[0.06] grid grid-cols-2 gap-3">
                {panels.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl bg-white/85 border border-white p-4"
                  >
                    <p className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#E69B00] bg-clip-text text-transparent tabular-nums">
                      {m.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#52525B]">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT (7 Cols): Two Stacked Horizontal Compact Cards */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Top Horizontal Card: Biến Tần Hybrid */}
              <div className="flex-1 group rounded-[24px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_28px_rgb(0,0,0,0.04)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-white/95 transition-all">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#F4F2ED] border border-black/[0.05] flex items-center justify-center text-[#FF8A00] shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#18181B] tracking-tight">
                        {inverter.category}
                      </h3>
                      <p className="text-xs text-[#71717A]">{inverter.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {inverter.brands.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 py-1 rounded-full bg-[#F4F2ED] border border-black/[0.05] text-xs font-bold text-[#18181B]"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compact Right Metrics + Corner Arrow */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="grid grid-cols-2 gap-2.5 flex-1 sm:flex-initial">
                    {inverter.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl bg-[#F4F2ED]/85 border border-white px-4 py-3 min-w-[116px]"
                      >
                        <p className="text-xl sm:text-2xl font-extrabold text-[#18181B] tabular-nums tracking-tight">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium text-[#71717A] leading-tight">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onInspectWarranty && onInspectWarranty(inverter.category)}
                    aria-label={`Tìm hiểu ${inverter.category}`}
                    className="hidden sm:flex w-9 h-9 rounded-full bg-[#F4F2ED] border border-black/[0.05] items-center justify-center text-[#18181B] group-hover:bg-[#18181B] group-hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Horizontal Card: Pin Lưu Trữ Lithium */}
              <div className="flex-1 group rounded-[24px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_28px_rgb(0,0,0,0.04)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-white/95 transition-all">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#F4F2ED] border border-black/[0.05] flex items-center justify-center text-[#FF8A00] shrink-0">
                      <BatteryCharging className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#18181B] tracking-tight">
                        {battery.category}
                      </h3>
                      <p className="text-xs text-[#71717A]">{battery.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {battery.brands.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 py-1 rounded-full bg-[#F4F2ED] border border-black/[0.05] text-xs font-bold text-[#18181B]"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compact Right Metrics + Corner Arrow */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="grid grid-cols-2 gap-2.5 flex-1 sm:flex-initial">
                    {battery.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl bg-[#F4F2ED]/85 border border-white px-4 py-3 min-w-[116px]"
                      >
                        <p className="text-xl sm:text-2xl font-extrabold text-[#18181B] tabular-nums tracking-tight">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium text-[#71717A] leading-tight">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onInspectWarranty && onInspectWarranty(battery.category)}
                    aria-label={`Tìm hiểu ${battery.category}`}
                    className="hidden sm:flex w-9 h-9 rounded-full bg-[#F4F2ED] border border-black/[0.05] items-center justify-center text-[#18181B] group-hover:bg-[#18181B] group-hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

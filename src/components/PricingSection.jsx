import React from 'react';
import { ArrowUpRight, Check, Flame } from 'lucide-react';
import { COMBO_PACKAGES } from '../data/solarData';
import { formatVND } from '../utils/solarUtils';

export default function PricingSection({ onSelectPackage }) {
  return (
    <section id="pricing" className="scroll-mt-24 py-6 md:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* High-Contrast Deep Charcoal Architectural Anchor */}
        <div className="relative overflow-hidden bg-[#141416] text-white rounded-[32px] p-6 md:p-10 shadow-[0_24px_60px_rgba(20,20,22,0.16)]">
          {/* Subtle Warm Solar Backlight Glow behind center card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[260px] rounded-full bg-gradient-to-b from-[#FF7A00]/20 via-[#FF5E1A]/8 to-transparent blur-3xl"
          />

          {/* Compact High-Contrast Module Header */}
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700]" />
                Báo giá trọn gói minh bạch
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Gói Lắp Đặt Phổ Biến Tại Ninh Bình
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm">
              Đã bao gồm vật tư Tier-1, khung giàn chống bão, tủ điện an toàn &amp; lắp đặt hoàn thiện tận nơi.
            </p>
          </div>

          {/* 3 Balanced Columns */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {COMBO_PACKAGES.map((pkg) => {
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-[24px] p-6 flex flex-col justify-between transition-all ${
                    isPopular
                      ? 'bg-white/[0.06] ring-1 ring-[#FF7A00] shadow-[0_0_40px_rgba(255,122,0,0.15)]'
                      : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.05]'
                  }`}
                >
                  {/* Crisp Solar Orange Top Glow Bar on Popular Card */}
                  {isPopular && (
                    <div
                      aria-hidden="true"
                      className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
                    />
                  )}

                  <div>
                    {/* Top Row: Badge + Spec Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          isPopular
                            ? 'bg-gradient-to-r from-[#FF5E1A] via-[#FF7A00] to-[#FFC700] text-white shadow-sm'
                            : 'bg-white/10 text-zinc-300'
                        }`}
                      >
                        {isPopular && <Flame className="w-3.5 h-3.5 fill-white" />}
                        <span>{pkg.badge}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-zinc-400 tabular-nums">
                        Mái {pkg.roofNeeded}
                      </span>
                    </div>

                    {/* Title & Audience */}
                    <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 min-h-[2.25rem] leading-relaxed">
                      {pkg.targetAudience}
                    </p>

                    {/* Price Block */}
                    <div className="mt-4 pb-4 border-b border-white/10">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={`text-3xl font-extrabold tabular-nums tracking-tight ${
                            isPopular
                              ? 'bg-gradient-to-r from-white via-[#FFE4B5] to-[#FFC700] bg-clip-text text-transparent'
                              : 'text-white'
                          }`}
                        >
                          {formatVND(pkg.price)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400 tabular-nums">
                        Sản lượng ~{pkg.monthlyOutput}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="mt-4 mb-6 space-y-2.5">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300">
                          <span
                            className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isPopular
                                ? 'bg-[#FF7A00]/20 text-[#FF8A00]'
                                : 'bg-white/10 text-zinc-300'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full inline-flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-full font-bold text-sm transition-all cursor-pointer active:scale-[0.98] ${
                      isPopular
                        ? 'bg-gradient-to-r from-[#FF5E1A] via-[#FF7A00] to-[#FFC700] text-white shadow-[0_10px_28px_rgba(255,122,0,0.32)] hover:brightness-110'
                        : 'bg-white text-[#141416] hover:bg-zinc-200'
                    }`}
                  >
                    <span>Chọn Gói Này</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

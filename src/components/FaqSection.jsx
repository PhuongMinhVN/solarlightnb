import React, { useState } from 'react';
import { Plus, Minus, PhoneCall, MessageCircle, ArrowUpRight } from 'lucide-react';
import { NORTHERN_FAQS, CONTACT_INFO } from '../data/solarData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 py-6 md:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Unified Architectural Bento Shell */}
        <div className="bg-[#EFECE6]/70 border border-black/[0.06] rounded-[32px] p-5 md:p-7">
          {/* 12-Column Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT (4 Cols): Sticky Title + Reassurance + Direct Zalo/Hotline Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700]" />
                  Hỏi đáp kỹ thuật miền Bắc
                </span>
                <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B]">
                  Giải Đáp Thắc Mắc
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  Minh bạch mọi câu hỏi về nắng mùa đông Ninh Bình, chế độ chạy độc lập khi cúp điện và thủ tục lắp đặt mới nhất.
                </p>
              </div>

              {/* Compact Direct Zalo / Hotline Contact Card */}
              <div className="rounded-[22px] bg-white/85 backdrop-blur-xl border border-white p-4 shadow-[0_8px_24px_rgb(0,0,0,0.03)] space-y-3">
                <div>
                  <p className="text-xs font-bold text-[#18181B]">Cần kỹ sư tư vấn trực tiếp?</p>
                  <p className="text-[11px] text-[#71717A] mt-0.5">
                    Hỗ trợ kỹ thuật tại Ninh Bình · Phản hồi trong 5 phút.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={CONTACT_INFO.hotlineRaw ? `tel:${CONTACT_INFO.hotlineRaw}` : '#lead-form'}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-bold transition-colors tabular-nums"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#FFC700]" />
                    <span>{CONTACT_INFO.hotlineRaw ? CONTACT_INFO.hotlineDisplay : 'Gọi Tư Vấn'}</span>
                  </a>
                  <a
                    href={CONTACT_INFO.zaloUrl}
                    target={CONTACT_INFO.zaloUrl.startsWith('http') ? '_blank' : undefined}
                    rel={CONTACT_INFO.zaloUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white text-xs font-bold hover:brightness-105 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Zalo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT (8 Cols): Single Unified White Glass Accordion Container */}
            <div className="lg:col-span-8 rounded-[24px] bg-white/85 backdrop-blur-xl border border-white shadow-[0_8px_28px_rgb(0,0,0,0.04)] divide-y divide-black/5 overflow-hidden">
              {NORTHERN_FAQS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-black/[0.015] transition-colors cursor-pointer"
                    >
                      <span className="text-sm sm:text-[15px] font-bold text-[#18181B]">
                        {item.question}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isOpen
                            ? 'bg-gradient-to-r from-[#FF5E1A] to-[#FFC700] text-white'
                            : 'bg-[#F4F2ED] text-[#52525B]'
                        }`}
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-[#52525B] leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

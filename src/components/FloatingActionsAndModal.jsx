import React from 'react';
import {
  PhoneCall,
  Calculator,
  MessageCircle,
  CheckCircle2,
  X,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { formatVND } from '../utils/solarUtils';
import { CONTACT_INFO } from '../data/solarData';

export default function FloatingActionsAndModal({
  onNavigateCalculator,
  submittedLead,
  onCloseModal,
  toastMessage,
}) {
  return (
    <>
      {/* Warm Frosted Glass Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 z-50 max-w-sm bento-glass-strong rounded-full px-4 py-3 flex items-center gap-3"
        >
          <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </span>
          <p className="text-xs sm:text-sm font-semibold text-[#18181B] pr-1">{toastMessage}</p>
        </div>
      )}

      {/* Floating Zalo Pill (Bottom-Right) */}
      <a
        href={CONTACT_INFO.zaloUrl}
        target={CONTACT_INFO.zaloUrl.startsWith('http') ? '_blank' : undefined}
        rel={CONTACT_INFO.zaloUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label="Chat tư vấn qua Zalo"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2"
      >
        <span className="hidden md:inline-block px-3.5 py-2 rounded-full bento-glass-strong text-xs font-bold text-[#18181B] opacity-0 group-hover:opacity-100 transition-opacity">
          Chat Kỹ Sư Zalo
        </span>
        <div className="w-13 h-13 rounded-full bg-[#18181B] hover:bg-gradient-to-br hover:from-[#FF5E1A] hover:via-[#FF8A00] hover:to-[#FFC700] text-white shadow-[0_10px_28px_rgba(24,24,27,0.22)] flex flex-col items-center justify-center leading-none transition-all hover:scale-105">
          <MessageCircle className="w-4 h-4" />
          <span className="text-[9px] font-bold mt-0.5">Zalo</span>
        </div>
      </a>

      {/* Mobile Sticky Bottom Bar (Warm Frosted Glass) */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-40 bento-glass-strong rounded-full p-1.5 shadow-[0_12px_32px_rgba(24,24,27,0.12)]">
        <div className="grid grid-cols-2 gap-1.5">
          <a
            href={CONTACT_INFO.hotlineRaw ? `tel:${CONTACT_INFO.hotlineRaw}` : '#lead-form'}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-[#18181B] text-white font-bold text-xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#FFC700]" />
            <span>Gọi Tư Vấn</span>
          </a>
          <button
            type="button"
            onClick={onNavigateCalculator}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white font-bold text-xs cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Tính Tiền Điện</span>
          </button>
        </div>
      </div>

      {/* Warm Glass Thank-You Modal */}
      {submittedLead && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/35 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md rounded-[32px] bg-[#FAF9F6] border border-white p-7 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={onCloseModal}
              aria-label="Đóng thông báo"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-[#71717A] hover:text-[#18181B] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5E1A] via-[#FF8A00] to-[#FFC700] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#18181B] tracking-tight">
                Đã tiếp nhận yêu cầu!
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A] mt-2 leading-relaxed">
                Cảm ơn <strong className="text-[#18181B]">{submittedLead.fullName}</strong>. Kỹ sư{' '}
                <strong className="text-[#18181B]">PMVN Technology</strong> sẽ gửi báo giá qua Zalo trong 5 phút.
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-white border border-black/[0.05] p-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-[#71717A]">SĐT / Zalo:</span>
                <span className="font-bold text-[#18181B] tabular-nums">
                  {submittedLead.phone}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#71717A]">Khu vực:</span>
                <span className="font-semibold text-[#18181B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" />
                  {submittedLead.district}
                </span>
              </div>
              <div className="pt-2 border-t border-black/[0.05]">
                <span className="text-[#71717A] block">Cấu hình quan tâm:</span>
                <span className="font-bold text-[#FF5E1A] block mt-0.5">
                  {submittedLead.selectedPackage}
                </span>
              </div>
              {submittedLead.estimatedValue > 0 && (
                <div className="flex justify-between gap-2 pt-1">
                  <span className="text-[#71717A]">Dự toán tham khảo:</span>
                  <span className="font-extrabold text-[#18181B] tabular-nums">
                    {formatVND(submittedLead.estimatedValue)}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <a
                href={CONTACT_INFO.zaloUrl}
                target={CONTACT_INFO.zaloUrl.startsWith('http') ? '_blank' : undefined}
                rel={CONTACT_INFO.zaloUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-[#18181B] text-white font-bold text-sm"
              >
                <span>Mở Zalo</span>
                <ArrowUpRight className="w-4 h-4 text-[#FFC700]" />
              </a>
              <button
                type="button"
                onClick={onCloseModal}
                className="py-3 px-4 rounded-full bg-white border border-black/[0.08] text-[#18181B] font-bold text-sm cursor-pointer"
              >
                Hoàn Tất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

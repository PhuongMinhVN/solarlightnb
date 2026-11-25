import React, { useState, useEffect } from 'react';
import { ArrowUpRight, PhoneCall, MapPin, Clock, Check } from 'lucide-react';
import { NINH_BINH_DISTRICTS, COMBO_PACKAGES, CONTACT_INFO } from '../data/solarData';

export default function FooterAndLeadForm({
  selectedPackageName,
  onClearSelectedPackage,
  onSubmitBottomLead,
  onNavigate,
}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(NINH_BINH_DISTRICTS[0]);
  const [packageChoice, setPackageChoice] = useState(
    selectedPackageName || 'Khảo sát tận nơi miễn phí theo thực tế mái nhà'
  );
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedPackageName) {
      setPackageChoice(selectedPackageName);
    }
  }, [selectedPackageName]);

  const packageOptions = [
    'Khảo sát tận nơi miễn phí theo thực tế mái nhà',
    ...COMBO_PACKAGES.map((p) => p.name),
    'Hệ công suất lớn Khách sạn / Nhà xưởng (>20 kWp)',
  ];

  const mergedOptions = packageOptions.includes(packageChoice)
    ? packageOptions
    : [packageChoice, ...packageOptions];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const cleanedPhone = phone.replace(/\s+/g, '');

    if (!trimmedName) {
      setErrorMsg('Vui lòng nhập họ tên của bạn.');
      return;
    }
    if (!/^(0|\+84)[0-9]{8,10}$/.test(cleanedPhone)) {
      setErrorMsg('Vui lòng nhập số điện thoại / Zalo hợp lệ.');
      return;
    }

    const matchedCombo = COMBO_PACKAGES.find((p) => p.name === packageChoice);
    setErrorMsg('');

    onSubmitBottomLead({
      fullName: trimmedName,
      phone: cleanedPhone,
      district,
      selectedPackage: packageChoice,
      estimatedValue: matchedCombo ? matchedCombo.price : 85000000,
      source: 'footer_registration_form',
    });

    setFullName('');
    setPhone('');
    if (onClearSelectedPackage) onClearSelectedPackage();
  };

  return (
    <footer className="pt-6 pb-24 sm:pb-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-5">
        {/* Final Consultation Split Bento Module */}
        <div
          id="lead-form"
          className="scroll-mt-24 bg-[#EFECE6]/70 border border-black/[0.06] rounded-[32px] p-5 md:p-7"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Left Pitch (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700]" />
                Khảo sát 3D miễn phí tại Ninh Bình
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B] leading-[1.15]">
                Đặt Lịch Khảo Sát &amp; Nhận{' '}
                <span className="bg-gradient-to-r from-[#FF5E1A] via-[#FF8A00] to-[#E69B00] bg-clip-text text-transparent">
                  Báo Giá Trọn Gói
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                Kỹ sư PMVN Technology trực tiếp khảo sát mái nhà bằng Flycam và gửi bản mô phỏng sản lượng chi tiết qua Zalo trong 5 phút.
              </p>

              <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#18181B]">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700] text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Miễn phí vận chuyển &amp; lắp đặt toàn tỉnh Ninh Bình</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700] text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Tặng bảo dưỡng &amp; vệ sinh tấm pin năm đầu tiên</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF5E1A] to-[#FFC700] text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Đầy đủ CO/CQ chính hãng &amp; xuất hóa đơn VAT</span>
                </div>
              </div>
            </div>

            {/* Right Unified White Glass Form (7 Cols) */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="rounded-[24px] bg-white/85 backdrop-blur-xl border border-white p-5 sm:p-6 shadow-[0_8px_28px_rgb(0,0,0,0.04)] space-y-3.5"
              >
                {selectedPackageName && (
                  <div className="rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00]/25 px-3.5 py-2 text-xs font-bold text-[#C2410C]">
                    Đang chọn: {selectedPackageName}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#71717A] mb-1">
                      Gói giải pháp quan tâm
                    </label>
                    <select
                      value={packageChoice}
                      onChange={(e) => setPackageChoice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F2ED]/85 border border-black/[0.06] text-xs sm:text-sm font-semibold text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                    >
                      {mergedOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#71717A] mb-1">
                      Khu vực tại Ninh Bình
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F2ED]/85 border border-black/[0.06] text-xs sm:text-sm font-medium text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                    >
                      {NINH_BINH_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d} — Ninh Bình
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#71717A] mb-1">
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nhập họ tên..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F2ED]/85 border border-black/[0.06] text-sm text-[#18181B] placeholder:text-[#71717A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#71717A] mb-1">
                      Số điện thoại / Zalo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại / Zalo..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F2ED]/85 border border-black/[0.06] text-sm text-[#18181B] tabular-nums placeholder:text-[#71717A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs font-semibold text-rose-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-full bg-[#18181B] hover:bg-gradient-to-r hover:from-[#FF5E1A] hover:via-[#FF8A00] hover:to-[#FFC700] text-white font-bold text-sm shadow-[0_10px_24px_rgba(24,24,27,0.16)] transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Gửi Yêu Cầu Khảo Sát Miễn Phí</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tight Architectural Footer Bar */}
        <div className="bg-[#EFECE6]/70 border border-black/[0.06] rounded-[28px] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-5 border-b border-black/[0.06] items-start">
            <div className="md:col-span-5 space-y-1.5">
              <p className="font-extrabold text-sm sm:text-base text-[#18181B] tracking-tight">
                {CONTACT_INFO.brandName} · <span className="text-[#71717A] font-semibold">PMVN Technology</span>
              </p>
              <p className="text-xs text-[#71717A] leading-relaxed max-w-sm">
                Giải pháp Điện Mặt Trời Hòa Lưới &amp; Lưu Trữ Hybrid trọn gói cho biệt thự, homestay và nhà xưởng tại Ninh Bình.
              </p>
            </div>

            <div className="md:col-span-4 space-y-1.5 text-xs text-[#52525B]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A00] shrink-0 mt-0.5" />
                <span>Khu vực triển khai: <strong className="text-[#18181B]">{CONTACT_INFO.address}</strong></span>
              </p>
              {CONTACT_INFO.hotlineRaw ? (
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                  <a
                    href={`tel:${CONTACT_INFO.hotlineRaw}`}
                    className="font-bold text-[#18181B] tabular-nums hover:text-[#FF5E1A]"
                  >
                    {CONTACT_INFO.hotlineDisplay}
                  </a>
                </p>
              ) : (
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                  <button
                    type="button"
                    onClick={() => onNavigate('lead-form')}
                    className="font-semibold text-[#18181B] hover:text-[#FF5E1A] cursor-pointer"
                  >
                    Đăng ký nhận tư vấn &amp; báo giá trực tuyến →
                  </button>
                </p>
              )}
              {CONTACT_INFO.workingHours && (
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
                  <span>{CONTACT_INFO.workingHours}</span>
                </p>
              )}
            </div>

            <div className="md:col-span-3 flex flex-wrap md:justify-end gap-x-4 gap-y-1.5 text-xs font-semibold text-[#52525B]">
              <button type="button" onClick={() => onNavigate('calculator')} className="hover:text-[#18181B] cursor-pointer">
                Tính tiền điện
              </button>
              <button type="button" onClick={() => onNavigate('warranty')} className="hover:text-[#18181B] cursor-pointer">
                Thiết bị
              </button>
              <button type="button" onClick={() => onNavigate('pricing')} className="hover:text-[#18181B] cursor-pointer">
                Gói lắp đặt
              </button>
              <button type="button" onClick={() => onNavigate('projects')} className="hover:text-[#18181B] cursor-pointer">
                Công trình
              </button>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#71717A]">
            <p>© {new Date().getFullYear()} {CONTACT_INFO.brandName} · Triển khai bởi PMVN Technology.</p>
            <p>Meta Pixel Lead Tracking Ready</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const vndFormatter = new Intl.NumberFormat('vi-VN');

export function formatVND(amount) {
  return `${vndFormatter.format(Math.round(amount))}đ`;
}

export function formatNumber(value) {
  return vndFormatter.format(Math.round(value));
}

/**
 * Tính toán tài chính & năng lượng Điện Mặt Trời tại Ninh Bình
 * - Giá điện bậc cao TB: 3.000đ/kWh
 * - Sản lượng trung bình Ninh Bình: ~110 kWh/kWp/tháng
 * - Suất đầu tư tham khảo: 11.500.000đ/kWp
 * - Hệ số phát thải lưới điện Việt Nam: ~0.6766 kg CO2/kWh
 */
export function calculateSolarMetrics(monthlyBill) {
  const safeBill = Math.round(Number(monthlyBill) || 0);
  const monthlyKwh = Math.round(safeBill / 3000);
  const recommendedKwp = Math.max(3, Math.ceil((monthlyKwh * 0.8) / 110));
  const solarMonthlyKwh = recommendedKwp * 110;
  const dailyKwh = Number((solarMonthlyKwh / 30).toFixed(1));
  const roofArea = recommendedKwp * 5;
  const monthlySavings = Math.round(safeBill * 0.8);
  const yearlySavings = monthlySavings * 12;
  const estimatedCost = recommendedKwp * 11500000;
  const paybackYears = (estimatedCost / yearlySavings).toFixed(1);
  const co2SavedYearlyKg = Math.round(solarMonthlyKwh * 12 * 0.6766);

  return {
    monthlyBill: safeBill,
    monthlyKwh,
    recommendedKwp,
    solarMonthlyKwh,
    dailyKwh,
    roofArea,
    monthlySavings,
    yearlySavings,
    estimatedCost,
    paybackYears,
    co2SavedYearlyKg,
  };
}

/**
 * Ghi nhận sự kiện chuyển đổi Lead (sẵn sàng gắn Meta Pixel fbq & GTM dataLayer)
 */
export function trackLeadEvent(leadData = {}) {
  const payload = {
    event: 'Lead',
    content_name: leadData.selectedPackage || `Hệ ${leadData.recommendedKwp || ''} kWp`,
    content_category: 'Solar_Installation_NinhBinh',
    currency: 'VND',
    value: leadData.estimatedValue || 0,
    customer_area: leadData.district || 'Ninh Bình',
    roof_type: leadData.roofType || 'Mái tiêu chuẩn',
    source_section: leadData.source || 'solar_hub',
    partner: 'PMVN Technology',
    timestamp: new Date().toISOString(),
  };

  console.log('[PMVN Solar Hub - Lead Tracked]:', {
    ...payload,
    leadContact: {
      fullName: leadData.fullName,
      phone: leadData.phone,
    },
  });

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: payload.content_name,
      content_category: payload.content_category,
      value: payload.value,
      currency: 'VND',
    });
  }

  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  return payload;
}

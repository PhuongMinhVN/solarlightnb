export const CONTACT_INFO = {
  brandName: 'SolarLight',
  address: 'Ninh Bình',
  hotlineDisplay: '',
  hotlineRaw: '',
  zaloUrl: '#lead-form',
  workingHours: '',
};

export const QUICK_BILL_PRESETS = [
  { label: '3Tr', value: 3000000 },
  { label: '5Tr', value: 5000000 },
  { label: '10Tr', value: 10000000 },
  { label: '20Tr', value: 20000000 },
];

export const ROOF_TYPES = [
  { id: 'concrete', label: 'Mái bằng' },
  { id: 'metal', label: 'Mái tôn' },
  { id: 'tile', label: 'Mái ngói' },
];

export const NINH_BINH_DISTRICTS = [
  'TP. Hoa Lư',
  'TP. Tam Điệp',
  'Huyện Gia Viễn',
  'Huyện Yên Khánh',
  'Huyện Kim Sơn',
  'Huyện Nho Quan',
  'Huyện Yên Mô',
  'Khu vực lân cận',
];

export const EQUIPMENT_BENTO = [
  {
    id: 'panels',
    category: 'Tấm Pin Quang Điện',
    subtitle: 'N-Type TOPCon hai mặt kính Tier-1',
    brands: ['LONGi', 'Jinko', 'Canadian'],
    metrics: [
      { value: '22.8%', label: 'Hiệu suất quang năng' },
      { value: '25 Năm', label: 'Bảo hành hiệu suất' },
    ],
  },
  {
    id: 'inverter',
    category: 'Biến Tần Hybrid',
    subtitle: 'Bám tải tự động & Giám sát thông minh',
    brands: ['Deye', 'Luxpower', 'Huawei'],
    metrics: [
      { value: 'IP66', label: 'Chống nồm ẩm miền Bắc' },
      { value: '<10ms', label: 'Chuyển mạch UPS' },
    ],
  },
  {
    id: 'battery',
    category: 'Pin Lưu Trữ Lithium',
    subtitle: 'Cell LiFePO4 BMS an toàn tuyệt đối',
    brands: ['Gigabox', 'SVE'],
    metrics: [
      { value: '6.000+', label: 'Chu kỳ sạc xả' },
      { value: 'LiFePO4', label: 'An toàn chống cháy nổ' },
    ],
  },
];

export const COMBO_PACKAGES = [
  {
    id: 'combo-5kwp',
    name: 'Gói 5 kWp Hòa Lưới Bám Tải',
    shortTitle: '5 kWp Hòa Lưới Bám Tải',
    badge: 'Gia Đình Tiêu Chuẩn',
    targetAudience: 'Dành cho nhà dùng điện 2 – 3.5 triệu/tháng',
    price: 55000000,
    monthlyOutput: '550 kWh/tháng',
    roofNeeded: '25 m²',
    popular: false,
    features: [
      '9–10 tấm pin LONGi / Jinko N-Type 580Wp',
      'Biến tần hòa lưới Deye / Luxpower 5kW',
      'Khung giàn nhôm Anodized & tủ điện chống sét',
      'Giám sát sản lượng trực tiếp trên điện thoại',
    ],
  },
  {
    id: 'combo-8kwp-hybrid',
    name: 'Gói 8 kWp Hybrid Có Lưu Trữ',
    shortTitle: '8 kWp Hybrid Có Lưu Trữ',
    badge: 'Phổ Biến Nhất Ninh Bình',
    targetAudience: 'Dùng điện 4 – 6 triệu/tháng · Mất điện vẫn dùng ban đêm',
    price: 105000000,
    monthlyOutput: '900 kWh/tháng',
    roofNeeded: '40 m²',
    popular: true,
    features: [
      '14 tấm pin Tier-1 hai mặt kính hiệu suất 22.8%',
      'Biến tần Hybrid Deye / Luxpower 8kW (UPS <10ms)',
      'Pin Lithium Gigabox / SVE 10.24 kWh chống cháy nổ',
      'Vận hành điều hòa & sinh hoạt cả khi mất điện lưới',
    ],
  },
  {
    id: 'combo-15kwp-3phase',
    name: 'Gói 15 kWp 3 Pha Kinh Doanh',
    shortTitle: '15 kWp Điện Áp 3 Pha',
    badge: 'Homestay / Xưởng',
    targetAudience: 'Homestay, khách sạn, xưởng dùng 8 – 15 triệu/tháng',
    price: 165000000,
    monthlyOutput: '1.700 kWh/tháng',
    roofNeeded: '75 m²',
    popular: false,
    features: [
      '26 tấm pin N-Type TOPCon chống suy hao PID',
      'Biến tần 3 pha Huawei / Deye 15kW chịu tải lớn',
      'Tủ bảo vệ công nghiệp & hệ tiếp địa an toàn',
      'Trọn gói hồ sơ thông báo điện lực & bảo dưỡng',
    ],
  },
];

export const NINH_BINH_PROJECTS = [
  {
    id: 'proj-hoalu',
    title: 'Biệt thự Hoa Lư',
    spec: '8 kWp Hybrid',
    location: 'P. Đông Thành, TP. Hoa Lư',
    monthlySaved: '4.3Tr/tháng',
    roofType: 'Mái bằng bê tông',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=960&q=80',
  },
  {
    id: 'proj-trangan',
    title: 'Homestay Tràng An',
    spec: '15 kWp 3 Pha',
    location: 'Khu du lịch Tràng An',
    monthlySaved: '9.8Tr/tháng',
    roofType: 'Mái ngói sinh thái',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=960&q=80',
  },
  {
    id: 'proj-tamdiep',
    title: 'Xưởng Tam Điệp',
    spec: '30 kWp Công nghiệp',
    location: 'P. Bắc Sơn, TP. Tam Điệp',
    monthlySaved: '17.5Tr/tháng',
    roofType: 'Mái tôn nhà xưởng',
    image:
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=960&q=80',
  },
  {
    id: 'proj-yenkhanh',
    title: 'Biệt thự Yên Khánh',
    spec: '10 kWp Hybrid',
    location: 'TT. Yên Ninh, Yên Khánh',
    monthlySaved: '5.6Tr/tháng',
    roofType: 'Mái ngói Nhật',
    image:
      'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=960&q=80',
  },
];

export const NORTHERN_FAQS = [
  {
    question: 'Mùa đông miền Bắc ít nắng thì hệ thống có ra điện không?',
    answer:
      'CÓ. Tấm pin N-Type hai mặt kính hấp thụ bức xạ ánh sáng (quang năng), không phụ thuộc độ nóng. Ngày âm u mùa đông tại Ninh Bình vẫn phát 35%–55% công suất; tính bình quân năm đạt 1.250–1.350 kWh/kWp/năm, hoàn vốn chỉ sau 3.5–4 năm.',
  },
  {
    question: 'Mất điện lưới thì điện mặt trời có dùng được không?',
    answer:
      'Với gói Hòa Lưới Bám Tải, hệ thống tự ngắt để bảo vệ lưới. Với gói Hybrid Có Lưu Trữ (pin Lithium Gigabox / SVE), hệ thống tự động chuyển nguồn UPS trong <10ms giúp điều hòa, WiFi và thiết bị thiết yếu chạy liên tục cả đêm.',
  },
  {
    question: 'Thủ tục lắp đặt mất bao lâu và có cần xin phép điện lực không?',
    answer:
      'Theo Nghị định 135/2024/NĐ-CP, hệ thống tự sản tự tiêu dưới 100 kWp (không phát ngược lên lưới) được miễn giấy phép hoạt động điện lực. Đội ngũ kỹ sư PMVN thi công trọn gói chỉ 1–2 ngày và hỗ trợ toàn bộ hồ sơ thông báo.',
  },
  {
    question: 'Lắp đặt trên mái ngói, mái tôn có sợ thấm dột khi mưa bão?',
    answer:
      'Tuyệt đối không. Toàn bộ khung nhôm Anodized AL6005-T5 và móc ngói Inox 304 kèm đệm cao su EPDM lão hóa 25 năm được tính toán chịu gió bão cấp 12–13 tại Ninh Bình, bảo hành chống thấm dột trọn gói.',
  },
];

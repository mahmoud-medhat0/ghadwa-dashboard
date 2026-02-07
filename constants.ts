
import { Chef, MenuItem, Order, Box, PromoCode, ContactSettings, Partner } from './types';

export const MENU_CATEGORIES = ["الكل", "مشويات", "محاشي", "طواجن", "أكل شعبي", "حلويات"];

export const INITIAL_CHEFS: Chef[] = [
  {
    id: 1,
    name: "ماما فاطمة",
    specialty: "محاشي وممبار",
    rating: 4.9,
    reviews: 120,
    orders: "1.2k",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=500",
    bio: "خبرة 30 سنة في عمايل المحشي والممبار، الطعم اللي يرجعك لبيت العيلة.",
    cover: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2574&auto=format&fit=crop",
    isOpen: true,
    workingHours: "12 م - 11 م",
    deliveryTime: "60-90 دقيقة",
    badges: ["الأكثر طلباً 🏆", "سريعة التحضير ⚡"]
  },
  {
    id: 2,
    name: "شيف حسن",
    specialty: "طواجن ومشويات",
    rating: 4.8,
    reviews: 95,
    orders: "850",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=500",
    bio: "أحلى طواجن فخار معمولة على أصولها، وتتبيلات سرية للمشويات.",
    cover: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop",
    isOpen: true,
    workingHours: "1 م - 12 ص",
    deliveryTime: "45-60 دقيقة",
    badges: ["مشويات أصلية 🔥"]
  },
  {
    id: 3,
    name: "الست أميرة",
    specialty: "معجنات وفطائر",
    rating: 4.9,
    reviews: 150,
    orders: "2k",
    img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&q=80&w=500",
    bio: "فطير مشلتت بالسمنة البلدي وبيتزا بيتي هشة وطرية.",
    cover: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2670&auto=format&fit=crop",
    isOpen: false,
    workingHours: "9 ص - 5 م",
    deliveryTime: "60 دقيقة",
    badges: ["توب شيف 🌟", "عجين بيتي 🥯"]
  }
];

const getDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
};

const getFutureDate = (hours: number) => {
    const d = new Date();
    d.setHours(d.getHours() + hours);
    return d.toISOString();
};

export const INITIAL_ORDERS: Order[] = [
    { 
        id: 1023, 
        customer: "أحمد علي", 
        phone: "01012345678", 
        address: "المعادي، شارع 9", 
        date: getDate(0), 
        total: 450, 
        status: "pending", 
        items: "نص تيس مندي",
        itemsDetails: [{ id: 501, name: "نص تيس مندي", price: 450, quantity: 1, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2535&auto=format&fit=crop", chef: "شيف حسن" }]
    }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
    { id: 501, name: "نص تيس مندي", price: 850, category: "مشويات", categoryId: 'lunch', chef: "شيف حسن", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2535&auto=format&fit=crop", rating: 4.9, time: "120 د" },
    { id: 502, name: "كيلو كفتة حاتي", price: 320, category: "مشويات", categoryId: 'lunch', chef: "شيف حسن", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2070&auto=format&fit=crop", rating: 4.7, time: "45 د" },
    { id: 503, name: "فراخ مشوية على الفحم", price: 190, category: "مشويات", categoryId: 'lunch', chef: "ماما فاطمة", img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop", rating: 4.8, time: "60 د" }
];

export const INITIAL_OFFERS: MenuItem[] = [
  { 
      id: 201, 
      name: "عرض العيلة (محشي + بط)", 
      chef: "ماما فاطمة", 
      oldPrice: 850, 
      price: 650, 
      img: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2070&auto=format&fit=crop", 
      discount: "25%",
      expiryDate: getFutureDate(12)
  },
  { 
      id: 202, 
      name: "بوكس التوفير (مكرونة + بانيه)", 
      chef: "الست أميرة", 
      oldPrice: 200, 
      price: 150, 
      img: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=2070&auto=format&fit=crop", 
      discount: "25%",
      expiryDate: getFutureDate(48)
  }
];

export const INITIAL_BOXES: Box[] = [
  {
    id: 801,
    name: "بوكس الفطار المصري",
    category: "فطار",
    categoryId: 'breakfast',
    price: 180,
    chef: "غدوة",
    serves: "4 أفراد",
    items: ["فول بالزيت الحار", "طعمية بيتي", "جبنة بالطماطم", "بيض مدحرج", "بتنجان مخلل", "عيش بلدي"],
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=2574&auto=format&fit=crop",
    color: "from-yellow-500 to-amber-600",
    accent: "bg-yellow-50 text-yellow-700",
    badge: "فطار ملوكي 👑"
  },
  {
    id: 803,
    name: "بوكس الغداء التوفير",
    category: "غداء",
    categoryId: 'lunch',
    price: 350,
    chef: "غدوة",
    serves: "3 أفراد",
    items: ["صينية مكرونة بشاميل", "نص فرخة محمرة", "شوربة لسان عصفور", "سلطة خضراء"],
    img: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=2070&auto=format&fit=crop",
    color: "from-orange-500 to-red-600",
    accent: "bg-orange-50 text-orange-700",
    badge: "أكثر مبيعاً 🔥"
  }
];

export const INITIAL_BEST_SELLERS: MenuItem[] = [
    { id: 301, name: "محشي مشكل", chef: "ماما فاطمة", price: 150, category: "محاشي", desc: "باذنجان، كوسة، وفلفل بخلطة الرز السرية والبهارات.", img: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=2070&auto=format&fit=crop" },
    { id: 302, name: "مكرونة بشاميل", chef: "شيف حسن", price: 120, category: "طواجن", desc: "مكرونة قلم مع لحمة مفرومة بلدي وصوص بشاميل غني.", img: "https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=2574&auto=format&fit=crop" }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  { id: 1, code: "SAVE20", value: 20, type: 'percentage', createdAt: "2024-01-01" },
  { id: 2, code: "WELCOME50", value: 50, type: 'fixed', createdAt: "2024-01-01" },
  { id: 3, code: "DISCOUNT10", value: 10, type: 'percentage', createdAt: "2024-01-01" }
];

export const INITIAL_CONTACT_SETTINGS: ContactSettings = {
  phone: "0109318581",
  whatsapp: "201109318581",
  email: "ghadwa444@gmail.com",
  address: "المعادي، القاهرة، مصر",
  facebookUrl: "https://facebook.com/ghadwa",
  instagramUrl: "https://instagram.com/ghadwa",
  tiktokUrl: "https://tiktok.com/@ghadwa",
  linkedinUrl: "https://linkedin.com/company/ghadwa",
  breakfastMenuUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=1000",
  lunchMenuUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000",
  cartThreshold: 500
};

export const INITIAL_PARTNERS: Partner[] = [
  { id: 1, name: "فودافون كاش", logo: "https://seeklogo.com/images/V/vodafone-cash-logo-9436A7851A-seeklogo.com.png" },
  { id: 2, name: "بنك مصر", logo: "https://seeklogo.com/images/B/banque-misr-logo-4A1C9A14C3-seeklogo.com.png" },
  { id: 3, name: "مرسول", logo: "https://mrsool.co/assets/images/logo.png" }
];


import { Chef, MenuItem, Order, Box, PromoCode, ContactSettings, Partner, Category } from './types';

export const MOCK_CHEFS: Chef[] = [
    {
        id: 1,
        name: "الشيف منال",
        specialty: "أكل مصري أصيل",
        rating: 4.8,
        reviews: 120,
        orders: "500+",
        img: "https://img.freepik.com/free-photo/portrait-female-chef-kitchen_23-2148006612.jpg",
        bio: "خبرة 20 سنة في المطبخ المصري، محاشي وطواجن لا يعلى عليها.",
        cover: "https://img.freepik.com/free-photo/ingredients-cooking-bg_1220-4497.jpg",
        isOpen: true,
        workingHours: "10 ص - 10 م",
        deliveryTime: "60 دقيقة",
        badges: ["مميز", "سريع"]
    },
    {
        id: 2,
        name: "الشيف فاطمة",
        specialty: "حلويات شرقية",
        rating: 4.9,
        reviews: 95,
        orders: "300+",
        img: "https://img.freepik.com/free-photo/pleased-young-female-cook-wearing-chef-uniform-holding-bowl-whisk_141793-34988.jpg",
        bio: "متخصصة في الحلويات الشرقية والغربية، تورت وجاتوهات لكل المناسبات.",
        cover: "https://img.freepik.com/free-photo/top-view-delicious-dessert_23-2148821980.jpg",
        isOpen: true,
        workingHours: "9 ص - 9 م",
        deliveryTime: "45 دقيقة",
        badges: ["حلويات"]
    }
];

export const MOCK_CATEGORIES: Category[] = [
    { id: 1, name: "مشويات", icon: "fa-fire" },
    { id: 2, name: "محاشي", icon: "fa-leaf" },
    { id: 3, name: "حلويات", icon: "fa-birthday-cake" },
    { id: 4, name: "طواجن", icon: "fa-bowl-food" }
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: "محشي مشكل",
        price: 150,
        category: "محاشي",
        chef: "الشيف منال",
        img: "https://img.freepik.com/free-photo/dolma-stuffed-grape-leaves-traditional-turkish-food_114579-2469.jpg",
        rating: 4.8,
        time: "60 دقيقة",
        desc: "تشكيلة محاشي (كرنب، ورق عنب، كوسة، باذنجان) بخلطة سرية.",
        orderCount: 50
    },
    {
        id: 2,
        name: "كفتة مشوية",
        price: 200,
        category: "مشويات",
        chef: "الشيف منال",
        img: "https://img.freepik.com/free-photo/grilled-ground-meat-kebab-with-onion-tomato_140725-4509.jpg",
        rating: 4.7,
        time: "45 دقيقة",
        desc: "كفتة بلدي مشوية على الفحم مع سلطة طحينة.",
        orderCount: 80
    }
];

export const MOCK_OFFERS: MenuItem[] = [
    {
        id: 3,
        name: "عرض العيلة (محاشي + فراخ)",
        price: 350,
        oldPrice: 450,
        discount: "22%",
        category: "عروض",
        chef: "الشيف منال",
        img: "https://img.freepik.com/free-photo/high-angle-tasty-feast-composition_23-2148821981.jpg",
        rating: 4.9,
        time: "70 دقيقة",
        desc: "وجبة عائلية تكفي 4 أفراد.",
        expiryDate: "2026-02-01"
    }
];

export const MOCK_BOXES: Box[] = [
    {
        id: 1,
        name: "بوكس التوفير",
        price: 120,
        chef: "الشيف منال",
        serves: "2 أفراد",
        items: ["ربع فرخة", "رز معمر", "سلطة"],
        img: "https://img.freepik.com/free-photo/lunch-box-with-healthy-food_23-2148530914.jpg",
        badge: "الأكثر طلباً",
        category: "بوكسات"
    }
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 101,
        customer: "أحمد محمد",
        phone: "01000000000",
        address: "القاهرة، مدينة نصر",
        date: "2026-01-20",
        total: 350,
        status: "pending",
        items: "محشي مشكل, كفتة مشوية",
        itemsDetails: []
    },
    {
        id: 102,
        customer: "سارة علي",
        phone: "01111111111",
        address: "الجيزة، الدقي",
        date: "2026-01-19",
        total: 150,
        status: "completed",
        items: "محشي مشكل",
        itemsDetails: []
    }
];

export const MOCK_PARTNERS: Partner[] = [
    { id: 1, name: "سوبر ماركت السلام", logo: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png" }
];

export const MOCK_PROMO_CODES: PromoCode[] = [
    { id: 1, code: "WELCOME50", value: 50, type: "fixed", createdAt: "2026-01-01" }
];

export const MOCK_SETTINGS: ContactSettings = {
    phone: "01012345678",
    whatsapp: "01012345678",
    email: "contact@ghadwa.com",
    address: "القاهرة، مصر",
    facebookUrl: "#",
    instagramUrl: "#",
    tiktokUrl: "#",
    cartThreshold: 500,
    rewardMessage: "مبروك! ليك خصم 10% على طلبك الجاي."
};

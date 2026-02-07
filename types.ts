
export interface Review {
    id: number;
    itemId: number;
    rating: number;
    comment: string;
    date: string;
    customerName: string;
}

export interface Category {
    id: number;
    name: string;
    icon?: string;
    createdAt?: string;
}

export interface Chef {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    orders: string;
    img: string;
    bio: string;
    cover: string;
    isOpen: boolean;
    workingHours: string;
    deliveryTime: string;
    badges: string[];
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    category?: string;
    categoryId?: string;
    chef?: string;
    img: string;
    rating?: number;
    time?: string;
    desc?: string;
    description?: string;
    oldPrice?: number;
    discount?: string;
    chefImg?: string;
    orderCount?: number;
    reviewsList?: Review[];
    expiryDate?: string;
    tags?: string[];
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface Order {
    id: number;
    customer: string;
    phone: string;
    address: string;
    date: string;
    total: number;
    status: string;
    items: string;
    itemsDetails: CartItem[];
}

export interface Box {
    id: number;
    name: string;
    category?: string;
    categoryId?: string;
    price: number;
    chef: string;
    serves: string;
    items: string[];
    img: string;
    color?: string;
    accent?: string;
    badge?: string;
}

export interface PromoCode {
    id: number;
    code: string;
    value: number;
    type: 'percentage' | 'fixed';
    createdAt?: string;
}

export interface CheckoutForm {
    name: string;
    phone: string;
    address: string;
    notes: string;
    promoCode?: string;
    discountApplied?: number;
}

export interface ContactSettings {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    facebookUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
    linkedinUrl?: string;
    logoUrl?: string;
    breakfastMenuUrl?: string;
    lunchMenuUrl?: string;
    cartThreshold?: number;
    rewardMessage?: string;
}

export interface Partner {
    id: number;
    name: string;
    logo: string;
}

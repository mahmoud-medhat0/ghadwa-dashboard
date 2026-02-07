-- =============================================
-- Ghadwa Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CHEFS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS chefs (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    specialty TEXT,
    rating NUMERIC DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    orders TEXT DEFAULT '0',
    img TEXT,
    cover TEXT,
    is_open BOOLEAN DEFAULT TRUE,
    working_hours TEXT,
    delivery_time TEXT,
    badges TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- MENU ITEMS TABLE (Meals)
-- =============================================
CREATE TABLE IF NOT EXISTS menu_items (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT,
    chef TEXT,
    img TEXT,
    rating NUMERIC DEFAULT 5.0,
    time TEXT,
    order_count INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- OFFERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS offers (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    old_price NUMERIC,
    discount TEXT,
    category TEXT DEFAULT 'عروض',
    chef TEXT,
    img TEXT,
    rating NUMERIC DEFAULT 5.0,
    time TEXT,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- BOXES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS boxes (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    chef TEXT,
    serves TEXT,
    items TEXT[] DEFAULT '{}',
    img TEXT,
    color TEXT,
    accent TEXT,
    badge TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    customer TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending',
    items TEXT,
    items_details JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PARTNERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS partners (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PROMO CODES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS promo_codes (
    id BIGSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    value NUMERIC NOT NULL,
    type TEXT DEFAULT 'fixed' CHECK (type IN ('fixed', 'percentage')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SITE SETTINGS TABLE (Single Row)
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id BIGSERIAL PRIMARY KEY,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    address TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    tiktok_url TEXT,
    linkedin_url TEXT,
    logo_url TEXT,
    breakfast_menu_url TEXT,
    lunch_menu_url TEXT,
    cart_threshold NUMERIC DEFAULT 500,
    reward_message TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS) - Basic Public Read
-- =============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE chefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for now, without auth)
CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON chefs FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON offers FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON boxes FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON partners FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON promo_codes FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON orders FOR SELECT USING (true);

-- Allow public insert/update/delete (for admin demo - should be secured later)
CREATE POLICY "Allow public insert" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON categories FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON chefs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON chefs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON chefs FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON menu_items FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON menu_items FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON offers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON offers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON offers FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON boxes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON boxes FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON boxes FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON orders FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON orders FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON partners FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON promo_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON promo_codes FOR DELETE USING (true);

CREATE POLICY "Allow public insert" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON site_settings FOR UPDATE USING (true);

-- =============================================
-- STORAGE BUCKET FOR IMAGES
-- Run this in SQL Editor too
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('public-images', 'public-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to storage bucket
CREATE POLICY "Allow public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'public-images');
CREATE POLICY "Allow public insert storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'public-images');
CREATE POLICY "Allow public delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'public-images');

-- =============================================
-- Seed Data for Ghadwa
-- Run this AFTER the schema SQL
-- =============================================

-- Categories
INSERT INTO categories (name, icon) VALUES
('مشويات', 'fa-fire'),
('محاشي', 'fa-leaf'),
('حلويات', 'fa-birthday-cake'),
('طواجن', 'fa-bowl-food');

-- Chefs
INSERT INTO chefs (name, specialty, rating, reviews, orders, img, bio, cover, is_open, working_hours, delivery_time, badges) VALUES
('الشيف منال', 'أكل مصري أصيل', 4.8, 120, '500+', 'https://img.freepik.com/free-photo/portrait-female-chef-kitchen_23-2148006612.jpg', 'خبرة 20 سنة في المطبخ المصري، محاشي وطواجن لا يعلى عليها.', 'https://img.freepik.com/free-photo/ingredients-cooking-bg_1220-4497.jpg', true, '10 ص - 10 م', '60 دقيقة', '{"مميز", "سريع"}'),
('الشيف فاطمة', 'حلويات شرقية', 4.9, 95, '300+', 'https://img.freepik.com/free-photo/pleased-young-female-cook-wearing-chef-uniform-holding-bowl-whisk_141793-34988.jpg', 'متخصصة في الحلويات الشرقية والغربية، تورت وجاتوهات لكل المناسبات.', 'https://img.freepik.com/free-photo/top-view-delicious-dessert_23-2148821980.jpg', true, '9 ص - 9 م', '45 دقيقة', '{"حلويات"}');

-- Menu Items
INSERT INTO menu_items (name, price, category, chef, img, rating, time, description) VALUES
('محشي مشكل', 150, 'محاشي', 'الشيف منال', 'https://img.freepik.com/free-photo/dolma-stuffed-grape-leaves-traditional-turkish-food_114579-2469.jpg', 4.8, '60 دقيقة', 'تشكيلة محاشي (كرنب، ورق عنب، كوسة، باذنجان) بخلطة سرية.'),
('كفتة مشوية', 200, 'مشويات', 'الشيف منال', 'https://img.freepik.com/free-photo/grilled-ground-meat-kebab-with-onion-tomato_140725-4509.jpg', 4.7, '45 دقيقة', 'كفتة بلدي مشوية على الفحم مع سلطة طحينة.');

-- Offers
INSERT INTO offers (name, price, old_price, discount, category, chef, img, rating, time, description, expiry_date) VALUES
('عرض العيلة (محاشي + فراخ)', 350, 450, '22%', 'عروض', 'الشيف منال', 'https://img.freepik.com/free-photo/high-angle-tasty-feast-composition_23-2148821981.jpg', 4.9, '70 دقيقة', 'وجبة عائلية تكفي 4 أفراد.', '2026-02-01');

-- Boxes
INSERT INTO boxes (name, price, chef, serves, items, img, badge, category) VALUES
('بوكس التوفير', 120, 'الشيف منال', '2 أفراد', '{"ربع فرخة", "رز معمر", "سلطة"}', 'https://img.freepik.com/free-photo/lunch-box-with-healthy-food_23-2148530914.jpg', 'الأكثر طلباً', 'بوكسات');

-- Partners
INSERT INTO partners (name, logo) VALUES
('سوبر ماركت السلام', 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png');

-- Promo Codes
INSERT INTO promo_codes (code, value, type) VALUES
('WELCOME50', 50, 'fixed');

-- Site Settings (single row)
INSERT INTO site_settings (phone, whatsapp, email, address, facebook_url, instagram_url, tiktok_url, cart_threshold, reward_message) VALUES
('01012345678', '01012345678', 'contact@ghadwa.com', 'القاهرة، مصر', '#', '#', '#', 500, 'مبروك! ليك خصم 10% على طلبك الجاي.');

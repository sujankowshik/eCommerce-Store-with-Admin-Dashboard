-- Seed data for eCommerce store

-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Electronics', 'electronics', 'Latest gadgets and electronic devices', '/placeholder.svg?height=200&width=300'),
('Clothing', 'clothing', 'Fashion and apparel for all ages', '/placeholder.svg?height=200&width=300'),
('Home & Garden', 'home-garden', 'Everything for your home and garden', '/placeholder.svg?height=200&width=300'),
('Sports', 'sports', 'Sports equipment and fitness gear', '/placeholder.svg?height=200&width=300'),
('Books', 'books', 'Books and educational materials', '/placeholder.svg?height=200&width=300'),
('Food & Beverages', 'food-beverages', 'Gourmet food and beverages', '/placeholder.svg?height=200&width=300');

-- Insert sample products
INSERT INTO products (name, slug, description, price, original_price, category_id, stock_quantity, status, images, rating, review_count) 
SELECT 
    'Wireless Bluetooth Headphones',
    'wireless-bluetooth-headphones',
    'Premium quality wireless headphones with noise cancellation and long battery life.',
    79.99,
    99.99,
    c.id,
    45,
    'active',
    ARRAY['/placeholder.svg?height=300&width=300'],
    4.5,
    128
FROM categories c WHERE c.slug = 'electronics';

INSERT INTO products (name, slug, description, price, category_id, stock_quantity, status, images, rating, review_count) 
SELECT 
    'Premium Cotton T-Shirt',
    'premium-cotton-t-shirt',
    'Comfortable and stylish cotton t-shirt made from organic materials.',
    29.99,
    c.id,
    120,
    'active',
    ARRAY['/placeholder.svg?height=300&width=300'],
    4.8,
    89
FROM categories c WHERE c.slug = 'clothing';

INSERT INTO products (name, slug, description, price, original_price, category_id, stock_quantity, status, images, rating, review_count) 
SELECT 
    'Smart Fitness Watch',
    'smart-fitness-watch',
    'Advanced fitness tracking with heart rate monitor and GPS.',
    199.99,
    249.99,
    c.id,
    0,
    'out_of_stock',
    ARRAY['/placeholder.svg?height=300&width=300'],
    4.6,
    203
FROM categories c WHERE c.slug = 'electronics';

INSERT INTO products (name, slug, description, price, category_id, stock_quantity, status, images, rating, review_count) 
SELECT 
    'Organic Coffee Beans',
    'organic-coffee-beans',
    'Premium organic coffee beans sourced from sustainable farms.',
    24.99,
    c.id,
    78,
    'active',
    ARRAY['/placeholder.svg?height=300&width=300'],
    4.9,
    156
FROM categories c WHERE c.slug = 'food-beverages';

-- Insert admin user
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@shophub.com', '$2b$10$example_hash', 'Admin User', 'admin');

-- Insert sample customer
INSERT INTO users (email, password_hash, name, role) VALUES
('customer@example.com', '$2b$10$example_hash', 'John Doe', 'user');

-- Insert sample orders
INSERT INTO orders (user_id, status, total_amount, shipping_cost, tax_amount, payment_method, payment_status, shipping_address, billing_address)
SELECT 
    u.id,
    'delivered',
    109.98,
    9.99,
    8.80,
    'stripe',
    'paid',
    '{"firstName": "John", "lastName": "Doe", "address": "123 Main St", "city": "New York", "state": "NY", "zipCode": "10001"}',
    '{"firstName": "John", "lastName": "Doe", "address": "123 Main St", "city": "New York", "state": "NY", "zipCode": "10001"}'
FROM users u WHERE u.email = 'customer@example.com';

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price)
SELECT 
    o.id,
    p.id,
    1,
    79.99
FROM orders o, products p 
WHERE p.slug = 'wireless-bluetooth-headphones'
AND o.status = 'delivered';

INSERT INTO order_items (order_id, product_id, quantity, price)
SELECT 
    o.id,
    p.id,
    1,
    29.99
FROM orders o, products p 
WHERE p.slug = 'premium-cotton-t-shirt'
AND o.status = 'delivered';

-- Insert sample reviews
INSERT INTO reviews (user_id, product_id, rating, comment)
SELECT 
    u.id,
    p.id,
    5,
    'Excellent sound quality and comfortable to wear for long periods!'
FROM users u, products p 
WHERE u.email = 'customer@example.com' 
AND p.slug = 'wireless-bluetooth-headphones';

INSERT INTO reviews (user_id, product_id, rating, comment)
SELECT 
    u.id,
    p.id,
    5,
    'Great quality shirt, very comfortable and fits perfectly.'
FROM users u, products p 
WHERE u.email = 'customer@example.com' 
AND p.slug = 'premium-cotton-t-shirt';

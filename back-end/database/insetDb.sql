use web_shop;
-- Bảng country (Không có phụ thuộc)
INSERT INTO country (country_name)
VALUES
('United States'), ('Canada'), ('United Kingdom'), ('France'), ('Germany');

-- Bảng category (Không có phụ thuộc)
INSERT INTO category (id, name)
VALUES
(1, 'Clothing'), (2, 'Shoes'), (3, 'Accessories'), (4, 'Electronics'), (5, 'Home Appliances');

-- Bảng variation (Không có phụ thuộc)
INSERT INTO variation (category_id, name)
VALUES
(1, 'Size'), (2, 'Color'), (3, 'Material'), (4, 'Brand'), (5, 'Power');

-- Bảng payment_type (Không có phụ thuộc)
INSERT INTO payment_type (value)
VALUES
(1), (2), (3), (4), (5);

-- Bảng site_user (Không có phụ thuộc)
INSERT INTO site_user (email, password, role, phone_number)
VALUES
('admin@example.com', 'admin','admin', '123456789'),
('user1@example.com', 'password123','user', '123456789'),
('user2@example.com', 'password456','user', '987654321'),
('user3@example.com', 'password789','user', '555555555'),
('user4@example.com', 'password101','user', '111222333'),
('user5@example.com', 'password111','user', '999888777');

-- Bảng shipping_method (Không có phụ thuộc)
INSERT INTO shipping_method (name, price)
VALUES
('Standard Shipping', 10.00), ('Express Shipping', 20.00), ('Overnight Shipping', 30.00), ('Two-Day Shipping', 15.00), ('Pickup', 0.00);

-- Bảng order_status (Không có phụ thuộc)
INSERT INTO order_status (status)
VALUES
('Pending'), ('Confirmed'), ('Shipped'), ('Delivered'), ('Cancelled');

-- Bảng address (Phụ thuộc vào country)
INSERT INTO address (unit_number, street_number, address_line1, address_line2, city, region, postal_code, country_id)
VALUES
('Unit 1', '10', 'Street A', 'Block B', 'City 1', 'Region 1', '10000', 1),
('Unit 2', '20', 'Street B', 'Block C', 'City 2', 'Region 2', '20000', 2),
('Unit 3', '30', 'Street C', 'Block D', 'City 3', 'Region 3', '30000', 3),
('Unit 4', '40', 'Street D', 'Block E', 'City 4', 'Region 4', '40000', 2),
('Unit 5', '50', 'Street E', 'Block F', 'City 5', 'Region 5', '50000', 5);

-- Bảng promotion (Không có phụ thuộc)
INSERT INTO promotion (name, description, discount, start_date, end_date)
VALUES
('Holiday Sale', 'Up to 50% off on selected items', 50.00, '2024-10-01 00:00:00', '2024-10-31 23:59:59'),
('Summer Discount', 'Discount on summer collections', 30.00, '2024-07-01 00:00:00', '2024-07-31 23:59:59'),
('Black Friday', 'Black Friday promotion', 70.00, '2024-11-25 00:00:00', '2024-11-30 23:59:59'),
('New Year Sale', 'New Year special discounts', 40.00, '2025-01-01 00:00:00', '2025-01-07 23:59:59'),
('Clearance Sale', 'Clearance sale for the end of season', 60.00, '2024-12-01 00:00:00', '2024-12-31 23:59:59');

-- Bảng product (Phụ thuộc vào category)
INSERT INTO product (name, description, product_image, category_id)
VALUES
('T-shirt', 'Comfortable cotton t-shirt', 'tshirt.jpg', 1),
('Running Shoes', 'Lightweight running shoes', 'runningshoes.jpg', 2),
('Watch', 'Smart watch with health tracking', 'watch.jpg', 3),
('Laptop', 'High-performance laptop', 'laptop.jpg', 4),
('Microwave', 'Energy-efficient microwave', 'microwave.jpg', 5);

-- Bảng product_item (Phụ thuộc vào product)
INSERT INTO product_item (product_id, SKU, qty_in_stock, price, product_image)
VALUES
(1, 'TSHIRT001', 100, 19.99, 'tshirt001.jpg'),
(2, 'SHOE001', 50, 59.99, 'shoe001.jpg'),
(3, 'WATCH001', 30, 199.99, 'watch001.jpg'),
(4, 'LAPTOP001', 20, 999.99, 'laptop001.jpg'),
(5, 'MICROWAVE001', 10, 150.99, 'microwave001.jpg');

-- Bảng variation_option (Phụ thuộc vào variation)
INSERT INTO variation_option (variation_id, value)
VALUES
(1, 'Small'), (1, 'Medium'), (2, 'Red'), (2, 'Blue'), (3, 'Cotton');

-- Bảng product_configuration (Phụ thuộc vào product_item và variation_option)
INSERT INTO product_configuration (product_item_id, variation_option_id)
VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5);

-- Bảng promotion_category (Phụ thuộc vào promotion và category)
INSERT INTO promotion_category (promotion_id, category_id)
VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5);

-- Bảng product_category (Phụ thuộc vào product và category)
INSERT INTO product_category (product_id, parent_category_id, category_name)
VALUES
(1, 1, 'Clothing'), (2, 2, 'Shoes'), (3, 3, 'Accessories'), (4, 4, 'Electronics'), (5, 5, 'Home Appliances');

-- Bảng shopping_cart (Phụ thuộc vào site_user)
INSERT INTO shopping_cart (user_id)
VALUES
(1), (2), (3), (4), (5);

-- Bảng shopping_cart_item (Phụ thuộc vào shopping_cart và product_item)
INSERT INTO shopping_cart_item (cart_id, product_item_id)
VALUES
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5);

-- Bảng user_payment_method (Phụ thuộc vào site_user và payment_type)
INSERT INTO user_payment_method (user_id, payment_type_id, provider, account_number, expiry_date, is_default)
VALUES
(1, 1, 'VISA', '123456789', '2025-12-31', true),
(2, 2, 'MasterCard', '987654321', '2026-01-31', false),
(3, 1, 'PayPal', '555555555', '2024-11-30', true),
(4, 2, 'AMEX', '111122223', '2026-02-28', false),
(5, 1, 'Discover', '999999999', '2025-10-31', true);

-- Bảng shop_order (Phụ thuộc vào site_user, payment_type và address)
INSERT INTO shop_order (user_id, order_date, payment_method_id, shipping_address_id, shipping_method_id, order_total, order_status_id)
VALUES
(1, '2024-10-01 00:00:00', 1, 1, 1, 100.00, 1),  -- Giả sử shipping_method_id = 1
(2, '2024-10-02 00:00:00', 2, 2, 2, 200.00, 2),  -- Giả sử shipping_method_id = 2
(3, '2024-10-03 00:00:00', 3, 3, 1, 300.00, 3),  -- Giả sử shipping_method_id = 1
(4, '2024-10-04 00:00:00', 4, 4, 2, 400.00, 4),  -- Giả sử shipping_method_id = 2
(5, '2024-10-05 00:00:00', 5, 5, 1, 500.00, 5);  -- Giả sử shipping_method_id = 1

-- Bảng order_line (Phụ thuộc vào shop_order và product)
INSERT INTO order_line (order_id, product_item_id, quantity, price)
VALUES
(1, 1, 1, 19.99),
(2, 2, 2, 59.99),
(3, 3, 1, 199.99),
(4, 4, 1, 999.99),
(5, 5, 1, 150.99);

-- Bảng user_address (Phụ thuộc vào site_user và address)
INSERT INTO user_address (user_id, address_id, is_default)
VALUES
(1, 1, true),  -- Địa chỉ đầu tiên
(2, 2, false), -- Địa chỉ thứ hai
(3, 3, true),  -- Địa chỉ thứ ba
(4, 4, false), -- Địa chỉ thứ tư
(5, 5, true);  -- Địa chỉ thứ năm

-- Bảng review (Phụ thuộc vào product và site_user)
INSERT INTO user_review (product_id, user_id, comment, rating_value)
VALUES
(1, 1, 'Great product!', 5),
(2, 2, 'Very good quality!', 4),
(3, 3, 'Highly recommend!', 5),
(4, 4, 'Satisfactory', 3),
(5, 2, 'Not as expected', 2);

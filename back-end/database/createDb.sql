DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Bảng promotion
CREATE TABLE IF NOT EXISTS promotion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  discount_rate DECIMAL(10, 2) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL
);

-- Bảng product_category
CREATE TABLE IF NOT EXISTS product_category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parent_category_id INT NOT NULL,
  category_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (parent_category_id) REFERENCES product_category(id)
);

-- Bảng promotion_category
CREATE TABLE IF NOT EXISTS promotion_category (
  promotion_id INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (promotion_id) REFERENCES promotion(id),
  FOREIGN KEY (category_id) REFERENCES product_category(id),
  primary key (promotion_id, category_id)
);

-- Bảng product
CREATE TABLE IF NOT EXISTS product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  product_image VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES product_category(id)
);

-- Bảng product_item
CREATE TABLE IF NOT EXISTS product_item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  SKU VARCHAR(100) NOT NULL,
  qty_in_stock INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  product_image VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Bảng variation
CREATE TABLE IF NOT EXISTS variation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES product_category(id)
);

-- Bảng variation_option
CREATE TABLE IF NOT EXISTS variation_option (
  id INT AUTO_INCREMENT PRIMARY KEY,
  variation_id INT NOT NULL,
  value VARCHAR(100) NOT NULL,
  FOREIGN KEY (variation_id) REFERENCES variation(id)
);

-- Bảng site_user
CREATE TABLE IF NOT EXISTS site_user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  phone_number VARCHAR(100) NOT NULL
);

-- Bảng country
CREATE TABLE IF NOT EXISTS country (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_name VARCHAR(100) NOT NULL
);

-- Bảng address
CREATE TABLE IF NOT EXISTS address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_number VARCHAR(100) NOT NULL,
  street_number VARCHAR(100) NOT NULL,
  address_line1 VARCHAR(100) NOT NULL,
  address_line2 VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  postal_code VARCHAR(100) NOT NULL,
  country_id INT NOT NULL,
  FOREIGN KEY (country_id) REFERENCES country(id)
);

-- Bảng user_address
CREATE TABLE IF NOT EXISTS user_address (
  user_id INT NOT NULL,
  address_id INT NOT NULL,
  is_default BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES site_user(id),
  FOREIGN KEY (address_id) REFERENCES address(id)
);

-- Bảng product_configuration
CREATE TABLE IF NOT EXISTS product_configuration (
  product_item_id INT NOT NULL,
  variation_option_id INT NOT NULL,
  FOREIGN KEY (product_item_id) REFERENCES product_item(id),
  FOREIGN KEY (variation_option_id) REFERENCES variation_option(id)
);

-- Bảng shopping_cart
CREATE TABLE IF NOT EXISTS shopping_cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES site_user(id)
);

-- Bảng shopping_cart_item
CREATE TABLE IF NOT EXISTS shopping_cart_item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_item_id INT NOT NULL,
  qty INT NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES shopping_cart(id),
  FOREIGN KEY (product_item_id) REFERENCES product_item(id)
);

-- Bảng shipping_method
CREATE TABLE IF NOT EXISTS shipping_method (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Bảng order_status
CREATE TABLE IF NOT EXISTS order_status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(100) NOT NULL
);

-- Bảng payment_type
CREATE TABLE IF NOT EXISTS payment_type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  value INT NOT NULL
);

-- Bảng user_payment_method
CREATE TABLE IF NOT EXISTS user_payment_method (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  payment_type_id INT NOT NULL,
  provider VARCHAR(100) NOT NULL,
  account_number VARCHAR(100) NOT NULL,
  expiry_date TIMESTAMP NOT NULL,
  is_default BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES site_user(id),
  FOREIGN KEY (payment_type_id) REFERENCES payment_type(id)
);

-- Bảng shop_order
CREATE TABLE IF NOT EXISTS shop_order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_date TIMESTAMP NOT NULL,
  payment_method_id INT NOT NULL,
  shipping_address_id INT NOT NULL,
  shipping_method_id INT NOT NULL,
  order_total DECIMAL(10, 2) NOT NULL,
  order_status_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES site_user(id),
  FOREIGN KEY (payment_method_id) REFERENCES user_payment_method(id),
  FOREIGN KEY (shipping_address_id) REFERENCES address(id),
  FOREIGN KEY (shipping_method_id) REFERENCES shipping_method(id),
  FOREIGN KEY (order_status_id) REFERENCES order_status(id)
);

-- Bảng order_line
CREATE TABLE IF NOT EXISTS order_line (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES shop_order(id),
  FOREIGN KEY (product_item_id) REFERENCES product_item(id)
);

-- Bảng user_review
CREATE TABLE IF NOT EXISTS user_review (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_product_id INT NOT NULL,
  comment TEXT NOT NULL,
  rating_value INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES site_user(id),
  FOREIGN KEY (order_product_id) REFERENCES order_line(id)
);



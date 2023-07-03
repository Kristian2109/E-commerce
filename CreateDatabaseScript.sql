create database ecommerce;
use ecommerce;

create table roles (
	id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    role_name VARCHAR(255)
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE countries (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE addresses (
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    city VARCHAR(255),
    country_id INT NOT NULL,
    postal_code VARCHAR(255),
    street_name VARCHAR(255),
    street_number VARCHAR(255),
    FOREIGN KEY (country_id)
        REFERENCES countries (id)
);

CREATE TABLE customer_addresses (
    customer_id INT NOT NULL,
    address_id INT NOT NULL,
    address_number INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (id),
    FOREIGN KEY (address_id) REFERENCES addresses (id),
    PRIMARY KEY (customer_id, address_id)
);

CREATE TABLE promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(1000),
    discount_rate DECIMAL(5 , 2 ) CHECK (discount_rate >= 0
        AND discount_rate <= 100),
    start_date DATETIME,
    end_date DATETIME,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    promotion_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (promotion_id) REFERENCES promotions(id)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10 , 2 ) NOT NULL,
    promotion_id INT,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    in_stock INT,
    FOREIGN KEY (category_id)
        REFERENCES categories (id),
	FOREIGN KEY (promotion_id)
        REFERENCES promotions (id)
);

CREATE TABLE card_products (
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (customer_id)
        REFERENCES customers (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id),
    PRIMARY KEY (customer_id , product_id)
);

CREATE TABLE order_status (
	id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(30)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    primary_product_id INT NOT NULL,
    customer_id INT NOT NULL,
    status INT NOT NULL,
    total_amount DECIMAL(10 , 2 ) NOT NULL,
    address_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (customer_id)
        REFERENCES customers (id),
    FOREIGN KEY (primary_product_id)
        REFERENCES products (id),
	FOREIGN KEY (address_id)
        REFERENCES addresses (id),
	FOREIGN KEY (status)
        REFERENCES order_status (id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    is_primary_product BOOLEAN NOT NULL,
    FOREIGN KEY (order_id)
        REFERENCES orders (id),
    FOREIGN KEY (product_id)
        REFERENCES products (id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    rating INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (product_id)
        REFERENCES products (id),
    FOREIGN KEY (customer_id)
        REFERENCES customers (id)
);

CREATE TABLE image_types (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(32)
);

CREATE TABLE images (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    image_type INT NOT NULL,
    product_id INT,
    category_id INT,
    promotion_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

insert into roles (role_name) values
("administrator"),
("moderator"),
("user");

insert into countries (name) values 
("Romania"),
("Bulgaria");

INSERT INTO image_types (type_name) values
("product_image"),
("category_image"),
("promotion_image");
create database ORDERS;

use ORDERS;

CREATE TABLE orders (
    order_id VARCHAR(50) PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    NIC VARCHAR(20) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
);

-- Insert sample data into the orders table
INSERT INTO orders (order_id, amount, currency, NIC, first_name, last_name, email, phone, address, city, country)
VALUES 
('Order001', 1000.00, 'LKR', '123456789V', 'Saman', 'Perera', 'saman@example.com', '0771234567', 'No. 1, Galle Road', 'Colombo', 'Sri Lanka'),
('Order002', 1500.50, 'LKR', '987654321V', 'Kamal', 'Silva', 'kamal@example.com', '0777654321', 'No. 2, Kandy Road', 'Kandy', 'Sri Lanka'),
('Order003', 2000.75, 'LKR', '135792468V', 'Nimal', 'Fernando', 'nimal@example.com', '0778765432', 'No. 3, Main Street', 'Galle', 'Sri Lanka');

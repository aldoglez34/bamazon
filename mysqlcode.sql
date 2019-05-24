DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Catcher in the Rye", "Books", 15.50, 10), 
("Harry Potter and the Chamber of Secrets", "Books", 20.00, 15), 
("The Hobbit", "Books", 18.99, 20), 
("Logitech Mouse", "IT Accessories", 49.99, 20), 
("HyperX Mechanical Keyboard", "IT Accessories", 88.99, 20), 
("Captain America Action Figure", "Toys", 29.99, 20), 
("Microsoft Windows 10", "Operative System", 108, 20), 
("Blue Shirt", "Men's Shop", 50.50, 20), 
("Pink Shoes", "Girl's Fashion", 74.99, 20)

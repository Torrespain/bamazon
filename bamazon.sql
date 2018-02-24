DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NULL,
	department_name VARCHAR(50) NULL,
	price INTEGER(10) NULL,
	stock_quantity INTEGER(10) NULL,
	PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ghostek soDrop 2 Headphones", "Electronics", 69.95, 10), 
	("Beats Solo3  Headphones", "Electronics",199.99, 8), 
	("Beats Studio3 Wirelesss", "Electronics", 279.99, 13), 
	("Sony Noise Cancelling Headphones WH1000XM2", "Electronics", 348.00, 7), 
	("Sennheiser Momentum 2.0 Wireless", "Electronics", 389.00, 3), 
	("Acer Predator Helios 300", "Electronics", 1049.00, 3), 
	("Sonos PLAYBAR TV Soundbar", "Electronics", 1398.00, 2), 
	("LG Electronics 84LM9600 84-Inch Cinema 3D 4K", "Electronics", 29804.99, 1),
	("Saucony Men's Peregrine 7 ", "Apparel", 67.48, 5),  
	("Seiko Men's SNK807 Seiko 5 Automatic", "Apparel", 72.37, 13),  
	("Rolex Oyster Perpetual Day-Date Ice Blue ", "Apparel", 59995.00, 1);


	

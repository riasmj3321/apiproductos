INSERT INTO productos (name, cost, sale, description, stock) VALUES (
	'Iphone 15 pro max',
	4000000,
	5000000,
	'Almacenamiento de 512gb',
	10
);

UPDATE productos
	SET name = 'Zapatillas puma',
	cost = 150000,
	sale = 200000,
	description = 'las mejoras zapatillas deportivas',
	stock = 10	
	WHERE id = 6;


SELECT * FROM productos;

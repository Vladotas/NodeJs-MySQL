CREATE DATABASE database_Vapebro;

Use database_Vapebro;

--Tabla de usuarios
Create TABLE users(
    id INT(11) NOT NULL,
    username varchar(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
);

--Tabla de productos
Create TABLE productos(
    id INT (11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE productos
    ADD PRIMARY KEY (id);

ALTER TABLE productos
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

    DESCRIBE productos;

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

    DESCRIBE users;
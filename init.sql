CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    secret_note TEXT
);

INSERT INTO users (username, password, secret_note) VALUES 
('admin', 'p@ssword123', 'СЕКРЕТ: Сервер будет обновлен в пятницу.'),
('lyuda', 'love123', 'Заметка: Купить хлеб и молоко.');

-- Таблица для отзывов
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    author TEXT,
    content TEXT
);

INSERT INTO comments (author, content) VALUES ('Админ', 'Добро пожаловать в гостевую книгу!');
const express = require('express');
const { Pool } = require('pg');
const app = express();

// Настройки подключения к базе (те же, что в docker-compose)
const pool = new Pool({
  user: 'admin',
  host: '127.0.0.1', // Прямой IPv4 адрес
  database: 'security_demo',
  password: 'password123',
  port: 5433,
  // Добавим этот параметр, чтобы избежать проблем с SSL
  ssl: false 
});

app.use(express.json());

// Уязвимый роут для поиска пользователя по ID
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    // Это классическая SQL-инъекция через конкатенацию строк!
    const query = "SELECT * FROM users WHERE id = " + userId;
    
    console.log("Выполняю SQL запрос:", query); // Для наглядности в консоли
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
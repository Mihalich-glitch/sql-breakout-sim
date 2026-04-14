const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost', // Берем из окружения или localhost
  database: process.env.DB_NAME || 'security_demo',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5433,
});

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/**
 * Роут для получения пользователя
 * Демонстрирует разницу между уязвимым и безопасным подходом
 */
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const isSafe = req.query.safe === 'true'; // Флаг из фронтенда

  let queryText;
  
  try {
    if (isSafe) {
      // ✅ БЕЗОПАСНЫЙ ПОДХОД: Параметризованный запрос
      // Мы передаем данные ОТДЕЛЬНО от команды SQL
      queryText = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(queryText, [userId]);
      
      res.json({
        data: result.rows,
        executedQuery: queryText,
        protected: true
      });
    } else {
      // ❌ УЯЗВИМЫЙ ПОДХОД: Конкатенация (склейка) строк
      // Пользовательский ввод становится частью команды SQL
      queryText = `SELECT * FROM users WHERE id = ${userId}`;
      const result = await pool.query(queryText);
      
      res.json({
        data: result.rows,
        executedQuery: queryText,
        protected: false
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Ошибка базы данных: " + err.message,
      executedQuery: queryText,
      protected: isSafe
    });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`
  🚀 Симулятор запущен!
  🔗 Адрес: http://localhost:${port}
  🛡️ Режим защиты доступен через интерфейс
  `);
});
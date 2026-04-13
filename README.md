🛡️ Vulnerability Lab: SQL-injection & XSS Simulator
Учебная лаборатория с открытым исходным кодом, созданная для демонстрации критических уязвимостей веб-приложений. Проект позволяет на практике увидеть, как ошибки в фильтрации данных приводят к компрометации базы данных (SQLi) и выполнению произвольного кода на стороне клиента (XSS).

🛠 Технологический стек
Runtime: Node.js (Express)

Database: PostgreSQL 15 (Alpine)

Containerization: Docker & Docker Compose

Frontend: HTML5, CSS3, Vanilla JavaScript

🚀 Быстрый запуск (Installation)
1. Предварительные требования
Убедитесь, что у вас установлены:

Docker и Docker Compose

Node.js (v18 или выше)

2. Клонирование и настройка
Bash
# Клонируйте репозиторий
git clone https://github.com/ВАШ_ЛОГИН/PROJECT_NAME.git
cd PROJECT_NAME

# Установите зависимости Node.js
npm install
3. Запуск инфраструктуры
Поднимите базу данных в изолированном контейнере:

Bash
docker-compose up -d
4. Инициализация базы данных
Заполните базу тестовыми данными (создание таблиц и пользователей):

Bash
docker exec -i vuln_db psql -U admin -d security_demo < init.sql
5. Запуск сервера
Bash
node index.js
После запуска приложение будет доступно по адресу: http://localhost:3000

👨‍💻 Сценарии для тестирования
💉 SQL Injection (Уязвимый поиск)
Используйте поле поиска на главной странице для тестирования следующих векторов атак:

Обход логики: 1 OR 1=1 — получение всех записей из таблицы пользователей.

Сбор системных данных: 1 UNION SELECT 1, current_user, 'pass', version() — вывод версии базы данных и имени текущего пользователя.

Разведка структуры: 1 UNION SELECT 1, table_name, 'col', 'data' FROM information_schema.tables WHERE table_schema = 'public' — просмотр списка всех таблиц в базе.

📜 XSS (Cross-Site Scripting) — В разработке
Демонстрация внедрения и исполнения JavaScript-кода через формы ввода.

🔒 Как это исправлено? (Defense)
В проекте демонстрируется защита с использованием параметризованных запросов (Prepared Statements). Это разделяет логику SQL-запроса от пользовательских данных.

Уязвимый код (String Concatenation):

JavaScript
const query = `SELECT * FROM users WHERE id = ${userId}`;
Безопасный код (Parameterized Query):

JavaScript
const query = 'SELECT * FROM users WHERE id = $1';
const result = await pool.query(query, [userId]);
⚠️ Disclaimer
Данный проект создан исключительно в образовательных целях. Попытки проведения атак на ресурсы, на которые у вас нет явного разрешения владельца, являются незаконными. Пользователь несет полную ответственность за использование полученных знаний.
# NPCIRS

<h2>Тестовое задание React</h2>

### Обзор
* Стек технологий

**Стек технологий**
<ul>
    <li>React</li>
    <li>Express</li>
    <li>PostgreSQL</li>
    <li>Sequelize</li>
</ul>

- Серверная часть:
    - Старт (терминал):
        - cd server
        - npm i

    - Настройка конфига базы данных
        - Переходим в - server/db/config/database.json и настраиваем конфиг под себя
        - "development": {
            "username": "логин",
            "password": "пароль",
            "database": "npcirs",
            "host": "127.0.0.1",
            "dialect": "postgres"
        },

    - Сборка базы данных (терминал):
        - npx sequelize db:create
        - npx sequelize db:migrate

    - Заполняем базу данных (терминал)
        - cd db
        - node dbSeeder.js

    - Запуск проекта
        - cd .. (/server)
        - npm run dev

- Клиентская часть:
    - Старт (терминал):
        - cd client
        - npm i
        - npm start

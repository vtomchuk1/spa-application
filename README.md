# spa-application
створення spa-додатку на тестове завдання

Використані технології
Laravel, React

Невиконаний функціонал
- валідація тегів в тексті допису
- захист від XSS
- розбиття повідомлень по 25 на 1 сторінку
- зменьшення розмірів картинки при перебільшенні розмірів

Запуск проекту
- в папці custom-api-back виконати команду 'composer install'
- налаштувати підключення до бази /custom-api-back/config/database.php
- виконати команду 'php artisan migrate'
- в папці custom-api-front виконати команду 'npm install && npm start'

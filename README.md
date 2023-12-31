# movies-explorer-api
Это учебный backend проект. Представляет собой REST API с функционалом:
  - авторизацией и регистрацией пользователя,
  - добавление, удаление фильма, возврат добавленных фильмов авторизованным пользователем.

### Реализованы следующие роуты:
  - незащищенные авторизацией:
    - POST /signup создаёт пользователя с переданными в теле email, password и name
    - POST /signin проверяет переданные в теле почту и пароль и возвращает JWT, который хранится в cookies
    - POST /signout очищает cookies от JWT

  - защищенные авторизацией:
    - GET /users/me возвращает информацию о пользователе (email и имя)
    - PATCH /users/me обновляет информацию о пользователе (email и имя)
    - GET /movies возвращает все сохранённые текущим пользователем фильмы
    - POST /movies создаёт фильм с переданными данными
    - DELETE /movies/_id удаляет сохранённый фильм по id

## Технологии
- [Node.js](https://nodejs.org/ru)
- [mongoDB](https://www.mongodb.com/)
- [express.js](https://expressjs.com/ru/)
- [mongoose](https://mongoosejs.com/)
- [celebrate](https://www.npmjs.com/package/celebrate)

## Разработка

### Установка зависимостей
Для установки зависимостей выполните команду:
```sh
$ npm i
```

### Запуск Development сервера
Чтобы запустить сервер для разработки выполните команду:
```sh
npm run dev
```

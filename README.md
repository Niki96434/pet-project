# Personal task-manager

v1.0.0-beta

## 📖 Описание проекта
На данный момент проект представляет собой **CRUD-приложение** для работы со списком задач.  
Основной функционал:
- Создание, чтение, обновление и удаление задач.
- Авторизация пользователей.
- Drag-and-drop канбан.
- Темная тема

### Планы на будущие версии:
- На данный момент новые функции не планируются.
---

## 🛠 Инструментарий

| Инструмент | Назначение в проекте |
|------------|----------------------|
| **TypeScript** | Типизация кода на клиенте и сервере для повышения надёжности. |
| **React 19** | Библиотека для построения пользовательского интерфейса. |
| **Vite** | Сборка фронтенда (быстрая разработка и оптимизированный билд). |
| **Express** | Бэкенд-фреймворк для создания REST API. |
| **Postgres** | Асинхронная отказоустойчивая база данных (используется через библиотеку `node-postgres`). |
| **React Router** | Переадресация на разные страницы согласно SPA. |
| **Zustand** | Управление состоянием на клиенте (глобальные сторы). |
| **TanStack Query** | Работа с серверным состоянием (кэширование, синхронизация данных). |
| **Docker** | Контейнеризация приложения для простоты развёртывания. |
| **React Hook Form** | Управление формами и валидация на клиенте. |
| **Chakra UI** | Библиотека компонентов для стилизации интерфейса. |

---

## 🧱 Архитектура (FSD)
Проект организован согласно **Feature-Sliced Design**:
---

## 🚀 Гайд по запуску

### Шаги для запуска
1. Клонируйте репозиторий:
```
   https://github.com/Niki96434/https://github.com/Niki96434/for-timiryazev-center.git
```
2. Запуск фронтенда:
```
   cd frontend
   npm install
   npm run dev
```
3. Переход в директорию server и установка зависимостей:
```
cd server
npm install
```
4. Создание файла .env
```
cd server/
touch .env
```
5. В файле .env создаем секреты для access и refresh токенов, домен источника(клиента), порт, на котором запущен сервер и данные для подключения к БД PostgreSQL
```
PORT=3000
CORS_ORIGIN=http://localhost:5173
REFRESH_TOKEN_SECRET=your_refresh_token
ACCESS_TOKEN_SECRET=your_access_token
PGUSER=your_user
PGDATABASE=your_db
PGPASSWORD=your_psw
PGHOST=localhost
PGPORT=5432
```
6. Запуск бэкенда: 
```
npm run dev
```

<details>
  <summary>Посмотреть скриншоты интерфейса</summary>
  
  ### Регистрация
  <img src="./images/login-form.png" width="600"/>

  ### Главная страница с задачами с разными темами
  <img src="./images/light_theme_screen.png" width="600"/>
  <img src="./images/dark_theme_screen.png" width="600"/>

  ### Формы редактирования и добавления задач
  <img src="./images/edit-task-form.png" width="600"/>
  <img src="./images/add-task-form.png" width="600"/>
  
  ### Обработка ошибок
  <img src="./images/error-login.png" width="600"/>
  <img src="./images/error-login-2.png" width="600"/>
  <img src="./images/error-form.png" width="600"/>

</details>

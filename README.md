# WebAPI приложение с AJAX

## Что такое AJAX?
**AJAX** (Asynchronous JavaScript and XML) - технология, позволяющая веб-страницам обмениваться данными с сервером без перезагрузки страницы.

## Как AJAX используется в этом проекте:

### 1. Получение данных (GET запрос)
```javascript
// Загрузка списка пользователей
async function loadUsers() {
    const response = await fetch('https://localhost:7000/api/users');
    const users = await response.json();
    displayUsers(users); // Отображение данных на странице
}
```

### 2. Отправка данных (POST запрос)
```javascript
// Добавление нового пользователя
async function addUser(user) {
    const response = await fetch('https://localhost:7000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    loadUsers(); // Обновление списка после добавления
}
```

### 3. Преимущества AJAX в этом проекте:
- Нет перезагрузки страницы при добавлении пользователя
- Мгновенное обновление списка пользователей
- Асинхронная работа - пользователь может продолжать взаимодействовать с интерфейсом

Бэкенд и фронтенд обмениваются данными в формате JSON через HTTP API.

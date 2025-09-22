// Базовый URL API (измени на свой, если порт другой)
const API_URL = 'https://localhost:44394/api/users';

// DOM элементы
const userForm = document.getElementById('userForm');
const usersList = document.getElementById('usersList');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');

// Загрузка пользователей при загрузке страницы
document.addEventListener('DOMContentLoaded', loadUsers);

// Обработчик отправки формы
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = {
        name: userNameInput.value.trim(),
        email: userEmailInput.value.trim()
    };
    
    if (user.name && user.email) {
        await addUser(user);
        userForm.reset();
    }
});

// Функция загрузки пользователей
async function loadUsers() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        showError('Ошибка загрузки пользователей: ' + error.message);
    }
}

// Функция добавления нового пользователя
async function addUser(user) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Перезагружаем список пользователей
        loadUsers();
    } catch (error) {
        showError('Ошибка добавления пользователя: ' + error.message);
    }
}

// Отображение пользователей
function displayUsers(users) {
    if (users.length === 0) {
        usersList.innerHTML = '<p>Пользователей нет</p>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="user-card">
            <h3>${escapeHtml(user.name)}</h3>
            <p>ID: ${user.id}</p>
            <p>Email: ${escapeHtml(user.email)}</p>
        </div>
    `).join('');
}

// Показать загрузку
function showLoading() {
    usersList.innerHTML = '<p class="loading">Загрузка...</p>';
}

// Показать ошибку
function showError(message) {
    usersList.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
}

// Функция для экранирования HTML (защита от XSS)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '<',
        '>': '>',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
// Данные питомцев
const pets = [
    { id: 1, name: 'Бублик', type: 'dog', age: 24, breed: 'Лабрадор', description: 'Добрый и ласковый мальчик, обожает играть в мяч.', character: 'Дружелюбный, энергичный, послушный', image: '🐕' },
    { id: 2, name: 'Луна', type: 'dog', age: 36, breed: 'Хаски', description: 'Красивая девочка с голубыми глазами.', character: 'Активная, умная, независимая', image: '🐕' },
    { id: 3, name: 'Макс', type: 'dog', age: 12, breed: 'Немецкая овчарка', description: 'Молодой и энергичный пес.', character: 'Верный, умный, защитник', image: '🐕' },
    { id: 4, name: 'Рекс', type: 'dog', age: 48, breed: 'Бульдог', description: 'Спокойный и добрый старичок.', character: 'Спокойный, ласковый, верный', image: '🐕' },
    { id: 5, name: 'Мурка', type: 'cat', age: 18, breed: 'Британская короткошерстная', description: 'Красивая серая кошечка с зелеными глазами.', character: 'Ласковая, спокойная, независимая', image: '🐱' },
    { id: 6, name: 'Барсик', type: 'cat', age: 24, breed: 'Рыжий табби', description: 'Веселый и игривый кот.', character: 'Игривый, ласковый, общительный', image: '🐱' },
    { id: 7, name: 'Снежка', type: 'cat', age: 12, breed: 'Белая персидская', description: 'Нежная белая кошечка.', character: 'Нежная, спокойная, ласковая', image: '🐱' },
    { id: 8, name: 'Тигра', type: 'cat', age: 6, breed: 'Полосатый табби', description: 'Молодая и энергичная кошечка.', character: 'Энергичная, любопытная, игривая', image: '🐱' }
];

// Загрузка питомцев
function loadPets(type, gridId, ageFilter = '') {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    let filtered = pets.filter(p => p.type === type);

    if (ageFilter) {
        filtered = filtered.filter(p => {
            if (ageFilter === 'young') return p.age < 24;
            if (ageFilter === 'adult') return p.age >= 24 && p.age < 60;
            if (ageFilter === 'senior') return p.age >= 60;
            return true;
        });
    }

    grid.innerHTML = filtered.map(pet => `
        <article class="pet-card" onclick="goToPet(${pet.id})">
            <div class="icon" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">${pet.image}</div>
            <h3>${pet.name}</h3>
            <p class="breed">${pet.breed}</p>
            <p>🎂 ${pet.age} мес.</p>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Узнать больше</button>
        </article>
    `).join('');
}

// Переход на страницу питомца
function goToPet(id) {
    window.location.href = `pet.html?id=${id}`;
}

// Загрузка деталей питомца
function loadPetDetail(id) {
    const pet = pets.find(p => p.id == id);
    if (!pet) {
        document.getElementById('pet-detail').innerHTML = '<p>Питомец не найден</p>';
        return;
    }

    // Breadcrumbs
    const breadcrumbs = document.getElementById('breadcrumbs');
    const typeText = pet.type === 'dog' ? 'Собаки' : 'Кошки';
    const typeUrl = pet.type === 'dog' ? 'dogs.html' : 'cats.html';
    breadcrumbs.innerHTML = `
        <a href="index.html">Главная</a> / 
        <a href="${typeUrl}">${typeText}</a> / 
        <span>${pet.name}</span>
    `;

    // Детали
    const detail = document.getElementById('pet-detail');
    detail.innerHTML = `
        <div class="pet-detail">
            <div style="font-size: 10rem; text-align: center; line-height: 1;">${pet.image}</div>
            <div class="pet-info">
                <h1>${pet.name}</h1>
                <p class="breed">${pet.breed}</p>
                <div style="background: #eff3ea; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <p><strong>🎂 Возраст:</strong> ${pet.age} месяцев</p>
                    <p><strong>📝 Описание:</strong> ${pet.description}</p>
                </div>
                <div>
                    <strong>Характер:</strong>
                    <div class="characteristics">
                        ${pet.character.split(', ').map(c => `<span class="tag">${c}</span>`).join('')}
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 1rem;">❤️ Хочу помочь этому питомцу</button>
                <a href="help.html" class="btn btn-secondary" style="width: 100%; margin-top: 0.5rem; padding: 1rem; text-align: center; display: block;">Узнать как помочь</a>
            </div>
        </div>
    `;
}

// Загрузка избранных питомцев на главной
document.addEventListener('DOMContentLoaded', function() {
    const featuredGrid = document.getElementById('featured-pets');
    if (featuredGrid) {
        const featured = pets.slice(0, 4);
        featuredGrid.innerHTML = featured.map(pet => `
            <article class="pet-card" onclick="goToPet(${pet.id})">
                <div class="icon" style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">${pet.image}</div>
                <h3>${pet.name}</h3>
                <p class="breed">${pet.breed}</p>
                <p>🎂 ${pet.age} мес.</p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Узнать больше</button>
            </article>
        `).join('');
    }
});

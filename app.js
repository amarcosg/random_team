class RandomTeamGenerator {
    constructor() {
        this.people = [];
        this.pinnedPeople = new Set();
        this.limit = 5;
        this.currentTeam = [];

        this.initializeElements();
        this.attachEventListeners();
        this.loadFromLocalStorage();
        this.render();
    }

    initializeElements() {
        this.personInput = document.getElementById('personInput');
        this.addPersonBtn = document.getElementById('addPersonBtn');
        this.limitInput = document.getElementById('limitInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.peopleList = document.getElementById('peopleList');
        this.resultList = document.getElementById('resultList');
        this.resultMessage = document.getElementById('resultMessage');
        this.loadFileBtn = document.getElementById('loadFileBtn');
        this.fileInfo = document.getElementById('fileInfo');
    }

    attachEventListeners() {
        this.addPersonBtn.addEventListener('click', () => this.addPerson());
        this.personInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addPerson();
        });
        this.limitInput.addEventListener('change', (e) => this.setLimit(e.target.value));
        this.generateBtn.addEventListener('click', () => this.generateTeam());
        this.loadFileBtn.addEventListener('click', () => this.loadFromFile());
    }

    addPerson() {
        const name = this.personInput.value.trim();

        if (!name) {
            alert('Por favor, ingresa un nombre');
            return;
        }

        if (this.people.includes(name)) {
            alert('Esta persona ya está en la lista');
            return;
        }

        this.people.push(name);
        this.personInput.value = '';
        this.personInput.focus();
        this.saveToLocalStorage();
        this.render();
    }

    removePerson(name) {
        this.people = this.people.filter(p => p !== name);
        this.pinnedPeople.delete(name);

        // Si la persona estaba en el equipo generado, la eliminamos también
        this.currentTeam = this.currentTeam.filter(p => p !== name);

        this.saveToLocalStorage();
        this.render();
    }

    togglePin(name) {
        if (this.pinnedPeople.has(name)) {
            this.pinnedPeople.delete(name);
        } else {
            this.pinnedPeople.add(name);
        }
        this.saveToLocalStorage();
        this.render();
    }

    setLimit(value) {
        this.limit = Math.max(1, parseInt(value) || 1);
        this.limitInput.value = this.limit;
        this.saveToLocalStorage();
    }

    generateTeam() {
        if (this.people.length === 0) {
            alert('Agrega al menos una persona a la lista');
            return;
        }

        const pinnedArray = Array.from(this.pinnedPeople);

        if (pinnedArray.length > this.limit) {
            alert(`Has fijado ${pinnedArray.length} personas, pero el límite es ${this.limit}. Aumenta el límite o reduce las personas fijadas.`);
            return;
        }

        if (this.limit > this.people.length) {
            alert(`El límite (${this.limit}) no puede ser mayor que el número de personas disponibles (${this.people.length})`);
            return;
        }

        // Empezar con las personas fijadas
        this.currentTeam = [...pinnedArray];

        // Obtener personas no fijadas
        const unpinnedPeople = this.people.filter(p => !this.pinnedPeople.has(p));

        // Calcular cuántas personas adicionales necesitamos
        const remainingSlots = this.limit - this.currentTeam.length;

        // Seleccionar aleatoriamente de las personas no fijadas
        const shuffled = this.shuffleArray([...unpinnedPeople]);
        const selected = shuffled.slice(0, remainingSlots);

        this.currentTeam = [...this.currentTeam, ...selected];

        // Mezclar el orden final para que las personas fijadas no estén siempre al principio
        this.currentTeam = this.shuffleArray(this.currentTeam);

        this.renderResults();
    }

    rerollPerson(name) {
        // No permitir reroll de personas fijadas
        if (this.pinnedPeople.has(name)) {
            return;
        }

        // Obtener personas que no están en el equipo actual y no están fijadas
        const availablePeople = this.people.filter(p =>
            !this.currentTeam.includes(p) && !this.pinnedPeople.has(p)
        );

        if (availablePeople.length === 0) {
            alert('No hay más personas disponibles para reemplazar');
            return;
        }

        // Seleccionar una persona aleatoria de las disponibles
        const randomIndex = Math.floor(Math.random() * availablePeople.length);
        const newPerson = availablePeople[randomIndex];

        // Reemplazar la persona en el equipo
        const index = this.currentTeam.indexOf(name);
        this.currentTeam[index] = newPerson;

        this.renderResults();
    }

    async loadFromFile() {
        try {
            this.fileInfo.textContent = 'Cargando...';
            this.fileInfo.className = 'file-info';

            // Fetch del archivo personas.txt desde el repo
            const response = await fetch('personas.txt');

            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo personas.txt');
            }

            const text = await response.text();

            // Dividir por líneas y limpiar
            const names = text
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            if (names.length === 0) {
                throw new Error('El archivo está vacío');
            }

            // Agregar las personas que no existan ya
            let addedCount = 0;
            names.forEach(name => {
                if (!this.people.includes(name)) {
                    this.people.push(name);
                    addedCount++;
                }
            });

            this.saveToLocalStorage();
            this.render();

            // Mostrar mensaje de éxito
            if (addedCount > 0) {
                this.fileInfo.textContent = `✓ Se agregaron ${addedCount} personas desde el archivo`;
                this.fileInfo.className = 'file-info success';
            } else {
                this.fileInfo.textContent = 'Todas las personas del archivo ya estaban en la lista';
                this.fileInfo.className = 'file-info';
            }

            // Limpiar el mensaje después de 5 segundos
            setTimeout(() => {
                this.fileInfo.textContent = '';
                this.fileInfo.className = 'file-info';
            }, 5000);

        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            this.fileInfo.textContent = `✗ Error: ${error.message}`;
            this.fileInfo.className = 'file-info error';

            // Limpiar el mensaje de error después de 5 segundos
            setTimeout(() => {
                this.fileInfo.textContent = '';
                this.fileInfo.className = 'file-info';
            }, 5000);
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    render() {
        // Renderizar lista de personas
        this.peopleList.innerHTML = '';

        if (this.people.length === 0) {
            this.peopleList.innerHTML = '<li style="grid-column: 1/-1; text-align: center; color: #999;">No hay personas en la lista. Agrega algunas personas para comenzar.</li>';
        } else {
            this.people.forEach(person => {
                const li = document.createElement('li');

                const isPinned = this.pinnedPeople.has(person);

                li.innerHTML = `
                    <span class="person-name">${person}</span>
                    <div class="person-actions">
                        <button class="pin-btn ${isPinned ? 'pinned' : ''}" data-name="${person}">
                            ${isPinned ? '📌 Fijado' : '📍 Fijar'}
                        </button>
                        <button class="remove-btn" data-name="${person}">🗑️</button>
                    </div>
                `;

                this.peopleList.appendChild(li);
            });

            // Agregar event listeners a los botones
            this.peopleList.querySelectorAll('.pin-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.togglePin(e.target.closest('.pin-btn').dataset.name);
                });
            });

            this.peopleList.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (confirm('¿Estás seguro de que quieres eliminar esta persona?')) {
                        this.removePerson(e.target.closest('.remove-btn').dataset.name);
                    }
                });
            });
        }

        // Actualizar estado del botón generar
        this.generateBtn.disabled = this.people.length === 0;
    }

    renderResults() {
        this.resultList.innerHTML = '';

        if (this.currentTeam.length === 0) {
            this.resultMessage.classList.add('empty');
            return;
        }

        this.resultMessage.classList.remove('empty');
        this.resultMessage.textContent = `Equipo generado: ${this.currentTeam.length} de ${this.limit} personas`;

        this.currentTeam.forEach(person => {
            const li = document.createElement('li');
            const isPinned = this.pinnedPeople.has(person);

            if (isPinned) {
                li.classList.add('pinned');
            }

            li.innerHTML = `
                <span class="result-person-name">
                    ${isPinned ? '<span class="pinned-badge">📌 Fijado</span>' : ''}
                    ${person}
                </span>
                ${!isPinned ? `<button class="reroll-btn" data-name="${person}">🔄 Rerollear</button>` : ''}
            `;

            this.resultList.appendChild(li);
        });

        // Agregar event listeners a los botones de reroll
        this.resultList.querySelectorAll('.reroll-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.rerollPerson(e.target.closest('.reroll-btn').dataset.name);
            });
        });
    }

    saveToLocalStorage() {
        const data = {
            people: this.people,
            pinnedPeople: Array.from(this.pinnedPeople),
            limit: this.limit
        };
        localStorage.setItem('randomTeamData', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('randomTeamData');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.people = data.people || [];
                this.pinnedPeople = new Set(data.pinnedPeople || []);
                this.limit = data.limit || 5;
                this.limitInput.value = this.limit;
            } catch (e) {
                console.error('Error loading data from localStorage:', e);
            }
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new RandomTeamGenerator();
});

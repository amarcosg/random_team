class RandomTeamGenerator {
    constructor() {
        // Datos por defecto
        this.defaultPeople = [
            { name: 'María García', role: 'Técnico' },
            { name: 'Juan Martínez', role: 'Funcional' },
            { name: 'Ana López', role: 'Técnico' },
            { name: 'Carlos Rodríguez', role: 'Funcional' },
            { name: 'Laura Fernández', role: 'Técnico' },
            { name: 'Pedro Sánchez', role: 'Técnico' },
            { name: 'Carmen Díaz', role: 'Funcional' },
            { name: 'Miguel Torres', role: 'Técnico' },
            { name: 'Isabel Ruiz', role: 'Funcional' },
            { name: 'Francisco Jiménez', role: 'Técnico' },
            { name: 'Elena Moreno', role: 'Funcional' },
            { name: 'David Álvarez', role: 'Técnico' },
            { name: 'Sara Romero', role: 'Funcional' },
            { name: 'Antonio Navarro', role: 'Técnico' },
            { name: 'Lucía Gutiérrez', role: 'Funcional' }
        ];

        this.people = [];
        this.pinnedPeople = new Set();
        this.limit = 5;
        this.techLimit = 3;
        this.funcLimit = 2;
        this.currentTeam = [];

        this.initializeElements();
        this.attachEventListeners();
        this.loadFromLocalStorage();
        this.render();
    }

    initializeElements() {
        this.personInput = document.getElementById('personInput');
        this.roleSelect = document.getElementById('roleSelect');
        this.addPersonBtn = document.getElementById('addPersonBtn');
        this.limitInput = document.getElementById('limitInput');
        this.techLimitInput = document.getElementById('techLimitInput');
        this.funcLimitInput = document.getElementById('funcLimitInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.peopleList = document.getElementById('peopleList');
        this.resultList = document.getElementById('resultList');
        this.resultMessage = document.getElementById('resultMessage');
        this.fileInfo = document.getElementById('fileInfo');
        this.resetBtn = document.getElementById('resetBtn');
    }

    attachEventListeners() {
        this.addPersonBtn.addEventListener('click', () => this.addPerson());
        this.personInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addPerson();
        });
        this.limitInput.addEventListener('change', (e) => this.setLimit(e.target.value));
        this.techLimitInput.addEventListener('change', (e) => this.setTechLimit(e.target.value));
        this.funcLimitInput.addEventListener('change', (e) => this.setFuncLimit(e.target.value));
        this.generateBtn.addEventListener('click', () => this.generateTeam());
        this.resetBtn.addEventListener('click', () => this.resetData());
    }

    addPerson() {
        const name = this.personInput.value.trim();
        const role = this.roleSelect.value;

        if (!name) {
            alert('Por favor, ingresa un nombre');
            return;
        }

        if (this.people.find(p => p.name === name)) {
            alert('Esta persona ya está en la lista');
            return;
        }

        this.people.push({ name, role });
        this.personInput.value = '';
        this.personInput.focus();
        this.saveToLocalStorage();
        this.render();
    }

    removePerson(name) {
        this.people = this.people.filter(p => p.name !== name);
        this.pinnedPeople.delete(name);

        // Si la persona estaba en el equipo generado, la eliminamos también
        this.currentTeam = this.currentTeam.filter(p => p.name !== name);

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

    setTechLimit(value) {
        this.techLimit = Math.max(0, parseInt(value) || 0);
        this.techLimitInput.value = this.techLimit;
        this.saveToLocalStorage();
    }

    setFuncLimit(value) {
        this.funcLimit = Math.max(0, parseInt(value) || 0);
        this.funcLimitInput.value = this.funcLimit;
        this.saveToLocalStorage();
    }

    generateTeam() {
        if (this.people.length === 0) {
            alert('Agrega al menos una persona a la lista');
            return;
        }

        // Validar que los límites de roles no excedan el límite total
        if (this.techLimit + this.funcLimit > this.limit) {
            alert(`La suma de límites de técnicos (${this.techLimit}) y funcionales (${this.funcLimit}) no puede exceder el límite total (${this.limit})`);
            return;
        }

        const pinnedArray = Array.from(this.pinnedPeople).map(name =>
            this.people.find(p => p.name === name)
        );

        if (pinnedArray.length > this.limit) {
            alert(`Has fijado ${pinnedArray.length} personas, pero el límite es ${this.limit}. Aumenta el límite o reduce las personas fijadas.`);
            return;
        }

        if (this.limit > this.people.length) {
            alert(`El límite (${this.limit}) no puede ser mayor que el número de personas disponibles (${this.people.length})`);
            return;
        }

        // Contar cuántos técnicos y funcionales hay fijados
        const pinnedTechs = pinnedArray.filter(p => p.role === 'Técnico').length;
        const pinnedFuncs = pinnedArray.filter(p => p.role === 'Funcional').length;

        if (pinnedTechs > this.techLimit) {
            alert(`Has fijado ${pinnedTechs} técnicos, pero el límite es ${this.techLimit}`);
            return;
        }

        if (pinnedFuncs > this.funcLimit) {
            alert(`Has fijado ${pinnedFuncs} funcionales, pero el límite es ${this.funcLimit}`);
            return;
        }

        // Empezar con las personas fijadas
        this.currentTeam = [...pinnedArray];

        // Obtener personas no fijadas por rol
        const unpinnedTechs = this.people.filter(p =>
            p.role === 'Técnico' && !this.pinnedPeople.has(p.name)
        );
        const unpinnedFuncs = this.people.filter(p =>
            p.role === 'Funcional' && !this.pinnedPeople.has(p.name)
        );

        // Calcular cuántos técnicos y funcionales adicionales necesitamos
        const techsNeeded = this.techLimit - pinnedTechs;
        const funcsNeeded = this.funcLimit - pinnedFuncs;

        // Seleccionar técnicos aleatorios
        const shuffledTechs = this.shuffleArray([...unpinnedTechs]);
        const selectedTechs = shuffledTechs.slice(0, techsNeeded);

        // Seleccionar funcionales aleatorios
        const shuffledFuncs = this.shuffleArray([...unpinnedFuncs]);
        const selectedFuncs = shuffledFuncs.slice(0, funcsNeeded);

        // Agregar al equipo
        this.currentTeam = [...this.currentTeam, ...selectedTechs, ...selectedFuncs];

        // Si no llegamos al límite total, completar con cualquier rol disponible
        const remainingSlots = this.limit - this.currentTeam.length;
        if (remainingSlots > 0) {
            const allUnselected = this.people.filter(p =>
                !this.currentTeam.find(t => t.name === p.name)
            );
            const shuffledRemaining = this.shuffleArray(allUnselected);
            const additional = shuffledRemaining.slice(0, remainingSlots);
            this.currentTeam = [...this.currentTeam, ...additional];
        }

        // Mezclar el orden final
        this.currentTeam = this.shuffleArray(this.currentTeam);

        this.renderResults();
    }

    rerollPerson(name) {
        // No permitir reroll de personas fijadas
        if (this.pinnedPeople.has(name)) {
            return;
        }

        const personToReplace = this.currentTeam.find(p => p.name === name);
        const roleToReplace = personToReplace.role;

        // Obtener personas del mismo rol que no están en el equipo actual
        const availablePeople = this.people.filter(p =>
            p.role === roleToReplace &&
            !this.currentTeam.find(t => t.name === p.name) &&
            !this.pinnedPeople.has(p.name)
        );

        if (availablePeople.length === 0) {
            alert(`No hay más personas con rol ${roleToReplace} disponibles para reemplazar`);
            return;
        }

        // Seleccionar una persona aleatoria de las disponibles
        const randomIndex = Math.floor(Math.random() * availablePeople.length);
        const newPerson = availablePeople[randomIndex];

        // Reemplazar la persona en el equipo
        const index = this.currentTeam.findIndex(p => p.name === name);
        this.currentTeam[index] = newPerson;

        this.renderResults();
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
            this.peopleList.innerHTML = '<li style="grid-column: 1/-1; text-align: center; color: #999;">No hay personas en la lista. Se cargarán automáticamente al refrescar.</li>';
        } else {
            this.people.forEach(person => {
                const li = document.createElement('li');

                const isPinned = this.pinnedPeople.has(person.name);
                const roleColor = person.role === 'Técnico' ? '#2196F3' : '#FF9800';
                const roleBadge = `<span style="background: ${roleColor}; color: white; padding: 3px 8px; border-radius: 5px; font-size: 12px; margin-right: 10px;">${person.role}</span>`;

                li.innerHTML = `
                    <span class="person-name">${roleBadge}${person.name}</span>
                    <div class="person-actions">
                        <button class="pin-btn ${isPinned ? 'pinned' : ''}" data-name="${person.name}">
                            ${isPinned ? '📌 Fijado' : '📍 Fijar'}
                        </button>
                        <button class="remove-btn" data-name="${person.name}">🗑️</button>
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

        const techCount = this.currentTeam.filter(p => p.role === 'Técnico').length;
        const funcCount = this.currentTeam.filter(p => p.role === 'Funcional').length;

        this.resultMessage.classList.remove('empty');
        this.resultMessage.textContent = `Equipo generado: ${this.currentTeam.length} personas (${techCount} técnicos, ${funcCount} funcionales)`;

        this.currentTeam.forEach(person => {
            const li = document.createElement('li');
            const isPinned = this.pinnedPeople.has(person.name);
            const roleColor = person.role === 'Técnico' ? '#2196F3' : '#FF9800';

            if (isPinned) {
                li.classList.add('pinned');
            }

            const roleBadge = `<span style="background: ${roleColor}; color: white; padding: 3px 8px; border-radius: 5px; font-size: 12px; margin-right: 5px;">${person.role}</span>`;

            li.innerHTML = `
                <span class="result-person-name">
                    ${isPinned ? '<span class="pinned-badge">📌 Fijado</span>' : ''}
                    ${roleBadge}
                    ${person.name}
                </span>
                ${!isPinned ? `<button class="reroll-btn" data-name="${person.name}">🔄 Rerollear</button>` : ''}
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

    resetData() {
        if (confirm('¿Estás seguro? Esto eliminará todos los datos y cargará las 15 personas por defecto.')) {
            // Limpiar localStorage
            localStorage.removeItem('randomTeamData');

            // Resetear estado
            this.people = [];
            this.pinnedPeople = new Set();
            this.currentTeam = [];
            this.limit = 5;
            this.techLimit = 3;
            this.funcLimit = 2;

            // Actualizar inputs
            this.limitInput.value = this.limit;
            this.techLimitInput.value = this.techLimit;
            this.funcLimitInput.value = this.funcLimit;

            // Cargar datos por defecto
            this.loadDefaultPeople();

            // Renderizar
            this.render();
            this.renderResults();
        }
    }

    saveToLocalStorage() {
        const data = {
            people: this.people,
            pinnedPeople: Array.from(this.pinnedPeople),
            limit: this.limit,
            techLimit: this.techLimit,
            funcLimit: this.funcLimit
        };
        localStorage.setItem('randomTeamData', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('randomTeamData');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.people = data.people || [];

                // Validar que los datos tengan la estructura correcta (objetos con name y role)
                const hasValidStructure = this.people.length === 0 ||
                    (this.people[0] && typeof this.people[0] === 'object' && 'role' in this.people[0]);

                if (!hasValidStructure) {
                    // Datos antiguos sin roles, limpiar y cargar por defecto
                    console.log('Datos antiguos detectados, cargando datos por defecto...');
                    this.loadDefaultPeople();
                    return;
                }

                this.pinnedPeople = new Set(data.pinnedPeople || []);
                this.limit = data.limit || 5;
                this.techLimit = data.techLimit !== undefined ? data.techLimit : 3;
                this.funcLimit = data.funcLimit !== undefined ? data.funcLimit : 2;
                this.limitInput.value = this.limit;
                this.techLimitInput.value = this.techLimit;
                this.funcLimitInput.value = this.funcLimit;

                // Si no hay personas cargadas, cargar los datos por defecto
                if (this.people.length === 0) {
                    this.loadDefaultPeople();
                }
            } catch (e) {
                console.error('Error loading data from localStorage:', e);
                this.loadDefaultPeople();
            }
        } else {
            // Primera vez, cargar datos por defecto
            this.loadDefaultPeople();
        }
    }

    loadDefaultPeople() {
        this.people = [...this.defaultPeople];
        this.saveToLocalStorage();
        this.fileInfo.textContent = '✓ Se cargaron 15 personas por defecto';
        this.fileInfo.className = 'file-info success';

        // Limpiar el mensaje después de 5 segundos
        setTimeout(() => {
            this.fileInfo.textContent = '';
            this.fileInfo.className = 'file-info';
        }, 5000);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new RandomTeamGenerator();
});

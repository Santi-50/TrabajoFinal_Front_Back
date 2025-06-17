document.addEventListener("DOMContentLoaded", function() {
    const calendario = document.getElementById("calendario");
    const mes = document.getElementById("meses");
    const anterior = document.getElementById("ant");
    const siguiente = document.getElementById("sig");
    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem("events")) || {};

    function renderCalendar() {
        calendario.innerHTML = "";
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        mes.textContent = `${new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate)}`;

        let Dia = new Date(year, month, 1).getDay();
        let DiaMes = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < Dia; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "day";
            emptyCell.style.visibility = "hidden";
            calendario.appendChild(emptyCell);
        }

        for (let i = 1; i <= DiaMes; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.textContent = i;
            day.onclick = () => addEvent(i);
            calendario.appendChild(day);
            displayEvents(i, day);
        }
    }

    function addEvent(day) {
        const eventText = prompt(`Agregar evento para el día ${day}:`);
        if (eventText) {
            if (!events[day]) events[day] = [];
            events[day].push(eventText);
            localStorage.setItem("events", JSON.stringify(events));
            renderCalendar();
        }
    }

    function displayEvents(day, dayElement) {
        dayElement.innerHTML = `<strong>${day}</strong>`;
        if (events[day]) {
            events[day].forEach((eventText, index) => {
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";
                eventDiv.textContent = eventText;
                eventDiv.onclick = () => editEvent(day, index);
                dayElement.appendChild(eventDiv);
            });
        }
    }

    function editEvent(day, index) {
        const newText = prompt(`Editar evento para el día ${day}:`, events[day][index]);
        if (newText) {
            events[day][index] = newText;
            localStorage.setItem("events", JSON.stringify(events));
            renderCalendar();
        } else {
            const confirmDelete = confirm("¿Quieres eliminar este evento?");
            if (confirmDelete) {
                events[day].splice(index, 1);
                if (events[day].length === 0) delete events[day]; // Si no quedan eventos, eliminar el día
                localStorage.setItem("events", JSON.stringify(events));
                renderCalendar();
            }
        }
    }

    anterior.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    });

    siguiente.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    });

    renderCalendar();
});
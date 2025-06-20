document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem("events")) || {};

    function renderCalendar() {
        calendar.innerHTML = "";
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        monthYear.textContent = `${new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate)}`;

        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "day";
            emptyCell.style.visibility = "hidden";
            calendar.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.textContent = i;
            day.onclick = () => addEvent(i);
            calendar.appendChild(day);
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

    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }

    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }

    renderCalendar();

    function eliminarActividad() {
    const id = prompt("Ingresa el ID o nombre de la actividad a eliminar:");

    if (!id) {
        alert("No se ingresó ninguna actividad.");
        return;
    }

    // Aquí depende de cómo tengas las actividades.
    // Suponiendo que están en un array llamado `actividades`:
    const index = actividades.findIndex(act => act.id === id || act.nombre === id);

    if (index !== -1) {
        actividades.splice(index, 1);
        alert("Actividad eliminada.");
        renderizarCalendario(); // Vuelve a pintar el calendario
    } else {
        alert("Actividad no encontrada.");
    }
}
})

  
 




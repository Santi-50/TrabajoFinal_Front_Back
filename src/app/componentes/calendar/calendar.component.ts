import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface CalendarEvent {
  title: string;
  time: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  selectedDate: Date | null = null;

  events: { [key: string]: CalendarEvent | null } = {};

  editTitle = '';
  editTime = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents(); // ✅ Carga eventos del backend al iniciar
  }

  // 🔄 Carga eventos desde el backend
  loadEvents(): void {
    const mesStr = this.currentDate.getMonth() === 6 ? 'julio' : 'agosto'; // 6 = julio
    const mesNum = this.currentDate.getMonth(); // 6 o 7
    this.http.get<any[]>(`http://localhost:3000/api/calendario/${mesStr}`)
      .subscribe(data => {
        this.events = {}; // Limpiar eventos antes de cargar
        data.forEach(evt => {
          const dia = evt.dia;
          const fecha = new Date(this.year, mesNum, dia);
          const key = fecha.toDateString();
          this.events[key] = {
            title: evt.actividad,
            time: evt.horario || evt.hora || ''
          };
        });
      });
  }

  get month(): number {
    return this.currentDate.getMonth();
  }

  get year(): number {
    return this.currentDate.getFullYear();
  }

  daysInMonth(): Date[] {
    const date = new Date(this.year, this.month, 1);
    const days = [];
    while (date.getMonth() === this.month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  prevMonth(): void {
    this.currentDate = new Date(this.year, this.month - 1, 1);
    this.selectedDate = null;
    this.loadEvents(); // 🔁 recarga eventos del mes anterior
  }

  nextMonth(): void {
    this.currentDate = new Date(this.year, this.month + 1, 1);
    this.selectedDate = null;
    this.loadEvents(); // 🔁 recarga eventos del mes siguiente
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    const key = date.toDateString();
    const event = this.events[key];
    if (event) {
      this.editTitle = event.title;
      this.editTime = event.time;
    } else {
      this.editTitle = '';
      this.editTime = '';
    }
  }

  addOrUpdateEvent(): void {
    if (!this.selectedDate) return;
    if (this.editTitle.trim() === '') {
      alert('La actividad no puede estar vacía');
      return;
    }

    const key = this.selectedDate.toDateString();
    const dia = this.selectedDate.getDate();
    const mes = this.month === 6 ? 'julio' : 'agosto';

    const evento = {
      actividad: this.editTitle,
      horario: this.editTime,
      dia: dia
    };

    if (this.eventExists()) {
      // PATCH si ya hay evento
      this.http.patch(`http://localhost:3000/api/calendario/${mes}/${dia}`, evento)
        .subscribe(() => this.loadEvents());
    } else {
      // POST si es nuevo
      this.http.post(`http://localhost:3000/api/calendario/${mes}`, evento)
        .subscribe(() => this.loadEvents());
    }

    this.events[key] = {
      title: this.editTitle,
      time: this.editTime,
    };
  }

  deleteEvent(): void {
    if (!this.selectedDate) return;
    const dia = this.selectedDate.getDate();
    const mes = this.month === 6 ? 'julio' : 'agosto';

    this.http.delete(`http://localhost:3000/api/calendario/${mes}/${dia}`)
      .subscribe(() => this.loadEvents());

    const key = this.selectedDate.toDateString();
    delete this.events[key];
    this.editTitle = '';
    this.editTime = '';
  }

  eventExists(): boolean {
    if (!this.selectedDate) return false;
    return !!this.events[this.selectedDate.toDateString()];
  }

  getEvent(date: Date): CalendarEvent | null {
    return this.events[date.toDateString()] || null;
  }
}

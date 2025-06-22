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
    this.loadEvents(); 
  }


  loadEvents(): void {
  const mes = this.currentDate.getMonth() === 6 ? 'julio' : 'agosto';
  this.http.get<any[]>(`http://localhost:3000/api/calendario/${mes}`)
    .subscribe(data => {
      this.events = {}; 
      data.forEach(evt => {
        const fecha = new Date(this.year, evt.mes - 1, evt.dia); 
        const key = fecha.toDateString();
        this.events[key] = {
          title: evt.title || evt.actividad,
          time: evt.time || evt.hora || evt.horario || ''
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
    this.loadEvents(); 
  }

  nextMonth(): void {
    this.currentDate = new Date(this.year, this.month + 1, 1);
    this.selectedDate = null;
    this.loadEvents(); 
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

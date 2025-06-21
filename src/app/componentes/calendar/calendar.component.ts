import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CalendarEvent {
  title: string;
  time: string; // "HH:mm"
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  currentDate = new Date();
  selectedDate: Date | null = null;

  // Un solo evento por día
  events: { [key: string]: CalendarEvent | null } = {};

  editTitle = '';
  editTime = '';

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
  }

  nextMonth(): void {
    this.currentDate = new Date(this.year, this.month + 1, 1);
    this.selectedDate = null;
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

    const key = this.selectedDate.toDateString();
    if (this.editTitle.trim() === '') {
      alert('La actividad no puede estar vacía');
      return;
    }
    this.events[key] = {
      title: this.editTitle,
      time: this.editTime,
    };
  }

  deleteEvent(): void {
    if (!this.selectedDate) return;

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



export class Inicio{}
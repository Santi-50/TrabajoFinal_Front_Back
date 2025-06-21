import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  title: string;
}

@Component({
  selector: 'app-calendar',
  imports: [ CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentDate = new Date();
  selectedDate: Date | null = null;
  events: { [key: string]: CalendarEvent[] } = {};

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
  }

  nextMonth(): void {
    this.currentDate = new Date(this.year, this.month + 1, 1);
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  addEvent(title: string): void {
    if (!this.selectedDate) return;
    const key = this.selectedDate.toDateString();
    if (!this.events[key]) this.events[key] = [];
    this.events[key].push({ title });
  }

  getEvents(date: Date): CalendarEvent[] {
    return this.events[date.toDateString()] || [];
  }

  updateEvent(): void {
  if (!this.selectedDate) return;
  const key = this.selectedDate.toDateString();
  const eventos = this.events[key];
  if (eventos && eventos.length > 0) {
    eventos[0].title += ' (actualizado)';
  }
}

deleteEvent(): void {
  if (!this.selectedDate) return;
  const key = this.selectedDate.toDateString();
  delete this.events[key];
}

}

export class Inicio{}
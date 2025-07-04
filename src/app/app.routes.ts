import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./componentes/calendar/calendar.component').then(m => m.CalendarComponent)
    }
];

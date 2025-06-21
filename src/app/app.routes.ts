import { Routes } from '@angular/router';
import { Inicio } from './componentes/calendar/calendar.component';

export const routes: Routes = [
    {path:'', loadComponent: () => import('./componentes/calendar/calendar.component').then(m => Inicio)}
];

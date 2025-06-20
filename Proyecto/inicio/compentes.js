import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
  alertas: any[] = [];
  alertaActual: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarAlertas();
  }
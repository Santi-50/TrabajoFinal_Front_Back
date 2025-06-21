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
    this.cargarAlertas(); // ✔️ Ya existe
  }

  cargarAlertas(): void {
    this.http.get<any[]>('http://localhost:3000/api/calendario/alertas')
      .subscribe(data => {
        this.alertas = data.map(alerta => ({
          ...alerta,
          mostrada: false
        }));
        this.iniciarVerificacion();
      });
  }

  iniciarVerificacion(): void {
    setInterval(() => {
      const ahora = new Date();

      for (let alerta of this.alertas) {
        const fechaAlerta = new Date(alerta.fechaAlerta);

        if (
          Math.abs(ahora.getTime() - fechaAlerta.getTime()) < 15000 &&
          !alerta.mostrada
        ) {
          this.alertaActual = alerta;
          alerta.mostrada = true;

          setTimeout(() => {
            this.alertaActual = null;
          }, 10000);
        }
      }
    }, 5000);
  }
}

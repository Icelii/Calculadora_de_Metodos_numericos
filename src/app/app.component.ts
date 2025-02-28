import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import EulerMejoradoComponent from './euler-mejorado/euler-mejorado.component';
import RungeKuttaComponent from './runge-kutta/runge-kutta.component';
import NewtonRaphsonComponent from './newton-raphson/newton-raphson.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, EulerMejoradoComponent, RungeKuttaComponent, NewtonRaphsonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calculadora-de-Metodos';
  hiddenButtons:boolean = false;
  returnButton:boolean = false;

  componenteActual: string = '';
  resultados: { i:number, x:number; y:number }[] = [];

  cargarComponente(componente: string) {
    this.hiddenButtons = true;
    this.returnButton = true;
    this.componenteActual = componente;
    this.resultados = [];
  }

  mostrarResultados(resultados: { i:number, x:number; y:number }[]) {
    this.resultados = resultados;
  }

  returnOption(){
    this.componenteActual = '';
    this.hiddenButtons = false;
    this.returnButton = false;
    this.resultados = [];
  }
}

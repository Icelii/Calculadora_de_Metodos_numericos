import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-runge-kutta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './runge-kutta.component.html',
  styleUrl: './runge-kutta.component.css',
})
export default class RungeKuttaComponent {
  @Output() returnButtonChange = new EventEmitter<boolean>();

  regresarAlMenu(){
    this.returnButtonChange.emit(false);
  }

  rkFunc:string = '';
  rkX0:number = 0;
  rkY0:number = 0;
  rkH:number = 0;
  rkPasos:number = 0;
  resultados: { i:number , x:number; y:number }[] = [];

  ngOnInit() {}

  calcularRungeKutta() {

    if (!this.rkFunc || this.rkX0 === null || this.rkY0 === null || this.rkH === null || this.rkPasos === null) {
      alert('Por favor, completa todos los campos antes de calcular.');
      return;
    }

    const rkFunction = this.rkFunc.toLowerCase();
    const x0 = this.rkX0;
    const y0 = this.rkY0;
    const h = this.rkH;
    const pasos = this.rkPasos;

    let x = x0;
    let y = y0;

    this.resultados = [];

    for (let i = 0; i < pasos; i++) {
      const k1 = this.evaluarFuncion(rkFunction, x, y);
      const k2 = this.evaluarFuncion(rkFunction, x + h / 2, y + (h / 2) * k1);
      const k3 = this.evaluarFuncion(rkFunction, x + h / 2, y + (h / 2) * k2);
      const k4 = this.evaluarFuncion(rkFunction, x + h, y + h * k3);
      y = y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      x = x + h;
      this.resultados.push({ i:i+1, x: math.round(x, 4), y: math.round(y, 4) });
    }
  }

  evaluarFuncion(func: string, x: number, y: number) {
    return math.evaluate(func, { x, y });
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-runge-kutta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './runge-kutta.component.html',
  styleUrl: './runge-kutta.component.css',
})
export default class RungeKuttaComponent {
  constructor(private FormBuilder: FormBuilder) {}

  @Output() resultadosCalculados = new EventEmitter<{ i:number, x:number; y:number }[]>();

  rkFunc: string = '';
  rkX0: number = 0;
  rkY0: number = 0;
  rkH: number = 0;
  rkPasos: number = 0;

  ngOnInit() {}

  calcularRungeKutta() {
    const x0 = this.rkX0;
    const y0 = this.rkY0;
    const h = this.rkH;
    const pasos = this.rkPasos;

    let x = x0;
    let y = y0;

    const resultados: { i:number , x:number; y:number }[] = [{ i:0, x, y }];

    for (let i = 1; i <= pasos; i++) {
      const k1 = this.evaluarFuncion(this.rkFunc, x, y);
      const k2 = this.evaluarFuncion(this.rkFunc, x + h / 2, y + (h / 2) * k1);
      const k3 = this.evaluarFuncion(this.rkFunc, x + h / 2, y + (h / 2) * k2);
      const k4 = this.evaluarFuncion(this.rkFunc, x + h, y + h * k3);
      y = y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      x = x + h;
      resultados.push({ i, x:math.round(x,4), y:math.round(y, 4) });
    }

    this.resultadosCalculados.emit(resultados);
  }

  evaluarFuncion(func: string, x: number, y: number) {
    return math.evaluate(func, { x, y });
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-newton-raphson',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newton-raphson.component.html',
  styleUrl: './newton-raphson.component.css',
})
export default class NewtonRaphsonComponent {
  constructor(private FormBuilder: FormBuilder) {}

  @Output() resultadosCalculados = new EventEmitter<{ i:number, x:number; y:number }[]>();

  nrFunc: string = '';
  nrDerivFunc: string = '';
  nrX0: number = 0;
  nrTol: number = 0;
  nrMaxIter: number = 0;

  ngOnInit() {}

  calcularNewtonRaphson() {
    if (!this.nrFunc || !this.nrDerivFunc || this.nrTol <= 0 || this.nrMaxIter <= 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    let x0 = this.nrX0;
    const resultados: { i:number, x:number; y:number }[] = [];

    for (let i = 0; i < this.nrMaxIter; i++) {
      const f = this.evaluarFuncion(this.nrFunc, x0, 0);
      const fPrime = this.evaluarFuncion(this.nrDerivFunc, x0, 0);

      if (math.abs(fPrime) < this.nrTol) {
        resultados.push({ i, x: x0, y: x0 });
        break;
      }

      const x1 = x0 - f / fPrime;
      resultados.push({ i, x: x1, y: x1 });

      if (math.abs(x1 - x0) < this.nrTol) {
        break;
      }

      x0 = x1;
    }

    this.resultadosCalculados.emit(resultados);
  }

  evaluarFuncion(func: string, x: number, y: number) {
    return math.evaluate(func, { x, y });
  }
}

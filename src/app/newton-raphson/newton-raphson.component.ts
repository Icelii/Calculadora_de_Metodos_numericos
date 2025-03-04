import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-newton-raphson',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newton-raphson.component.html',
  styleUrls: ['./newton-raphson.component.css'],
})
export default class NewtonRaphsonComponent {
  @Output() returnButtonChange = new EventEmitter<boolean>();

  regresarAlMenu() {
    this.returnButtonChange.emit(false);
  }

  nrFunc: string = '';
  nrX0: number = 0;
  nrTol: number = 0;
  resultados: { i: number; x: number; fx: number; fPrime: number; x1: number }[] = [];

  ngOnInit() {}

  calcularNewtonRaphson() {
    if (!this.nrFunc || this.nrFunc.trim() === '') {
      alert('Por favor, ingresa una función válida.');
      return;
    }

    if (isNaN(this.nrX0)) {
      alert('Por favor, ingresa un valor numérico válido para x0.');
      return;
    }

    if (this.nrTol <= 0) {
      alert('La tolerancia debe ser un valor mayor que cero.');
      return;
    }

    const nrFunction = this.nrFunc.toLowerCase();
    let nrDerivFunc: string;

    try {
      nrDerivFunc = math.derivative(nrFunction, 'x').toString();
    } catch (error) {
      alert('Hubo un error al derivar la función. Verifica si la función está bien escrita.');
      return;
    }

    let x0 = this.nrX0;
    let xPrev = x0;
    this.resultados = [];
    let i = 0;
    const maxIterations = 100;

    while (i < maxIterations) {
      let f: number, fPrime: number;

      try {
        f = this.evaluarFuncion(nrFunction, x0);
        fPrime = this.evaluarFuncion(nrDerivFunc, x0);
      } catch (error) {
        alert('Error al evaluar la función o su derivada. Verifica que la función esté correctamente ingresada.');
        return;
      }

      if (math.abs(fPrime) < this.nrTol) {
        alert('La derivada es demasiado pequeña, el método no converge.');
        break;
      }

      const x1 = x0 - f / fPrime;

      if (isNaN(x1) || !isFinite(x1)) {
        alert('Error: El valor calculado de x1 no es válido.');
        break;
      }

      this.resultados.push({
        i: i,
        x: this.redondear(x0),
        fx: this.redondear(f),
        fPrime: this.redondear(fPrime),
        x1: this.redondear(x1),
      });

      if (math.abs(f) < this.nrTol || math.abs(x1 - xPrev) < this.nrTol) {
        //alert('Convergencia alcanzada.');
        break;
      }

      xPrev = x0;
      x0 = x1;
      i++;
    }

    if (i >= maxIterations) {
      alert('El número máximo de iteraciones se ha alcanzado sin converger.');
    }
  }

  evaluarFuncion(func: string, x: number) {
    return math.evaluate(func, { x });
  }

  redondear(valor: number): number {
    return parseFloat(valor.toFixed(4));
  }
}

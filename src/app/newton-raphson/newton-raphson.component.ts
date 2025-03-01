import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-newton-raphson',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newton-raphson.component.html',
  styleUrl: './newton-raphson.component.css',
})
export default class NewtonRaphsonComponent {
  @Output() returnButtonChange = new EventEmitter<boolean>();

  regresarAlMenu(){
    this.returnButtonChange.emit(false);
  }

  nrFunc: string = '';
  nrDerivFunc: string = '';
  nrX0:number = 0;
  nrTol:number = 0;
  nrMaxIter:number = 0;
  resultados: { i:number, x:number, fx:number, fPrime:number, x1:number }[] = []; 

  ngOnInit() {}

  calcularNewtonRaphson() {
    if (!this.nrFunc || !this.nrDerivFunc || this.nrTol <= 0 || this.nrMaxIter <= 0) {
      alert('Por favor, completa todos los campos antes de calcular.');
      return;
    }

    const nrFunction = this.nrFunc.toLowerCase();
    let x0 = this.nrX0;
    this.resultados = []; 

    for (let i = 0; i < this.nrMaxIter; i++) {
      const f = this.evaluarFuncion(nrFunction, x0);
      const fPrime = this.evaluarFuncion(nrFunction, x0);
      
      if (math.abs(fPrime) < this.nrTol) {
        alert('La derivada es demasiado pequeña, el método no converge.');
        break;
      }

      const x1 = x0 - f / fPrime;

      this.resultados.push({ 
        i: i+1, 
        x: math.round(x0, 4), 
        fx: math.round(f, 4),
        fPrime: math.round(fPrime, 4),
        x1: math.round(x1, 4)
      });

      if (math.abs(f) < this.nrTol) {
        break;
      }

      if (math.abs(x1 - x0) < this.nrTol) {
        break;
      }

      x0 = x1;
    }
  }

  evaluarFuncion(func: string, x: number) {
    return math.evaluate(func, { x });
  }
}

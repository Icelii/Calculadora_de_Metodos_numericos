import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-euler-mejorado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './euler-mejorado.component.html',
  styleUrl: './euler-mejorado.component.css',
})
export default class EulerMejoradoComponent {
  @Output() returnButtonChange = new EventEmitter<boolean>();

  regresarAlMenu(){
    this.returnButtonChange.emit(false);
  }

  eulerFunc:string = '';
  eulerX0:number = 0;
  eulerY0:number = 0;
  eulerH:number = 0;
  eulerPasos:number = 0;
  resultados: { i:number, x:number, k1:number, k2:number, yNext:number}[] = [];

  calcularEulerMejorado() {

    if(!this.eulerFunc || this.eulerH <= 0 || this.eulerPasos <= 0){
      alert('Por favor, completa todos los campos antes de calcular.');
      return;
    }

    if (isNaN(this.eulerX0) || isNaN(this.eulerY0) || isNaN(this.eulerH) || isNaN(this.eulerPasos)) {
      alert('Por favor, ingresa valores numéricos en todos los campos.');
      return;
    }

    if (!Number.isInteger(this.eulerPasos) || this.eulerPasos <= 0) {
      alert('El número de pasos debe ser un entero positivo.');
      return;
    }
  
    if (this.eulerH > 10) {
      alert('El valor de h es demasiado grande. Intenta con un número menor.');
      return;
    }

    try {
      math.evaluate(this.eulerFunc, { x: 1, y: 1 });
    } catch (error: any) {
      alert(`La función ingresada no es válida.`);
      return;
    }

    this.resultados = []; 

    const eFunc = this.eulerFunc.toLowerCase();
    const x0 = this.eulerX0;
    const y0 = this.eulerY0;
    const h = this.eulerH;
    const pasos = this.eulerPasos;

    let x = x0;
    let y = y0;

    for (let i = 0; i < pasos; i++) {
      const k1 = this.evaluarFuncion(eFunc, x, y);
      const k2 = this.evaluarFuncion(eFunc, x + h, y + h * k1);
      const yNext = y + (h / 2) * (k1 + k2);

      this.resultados.push({ 
        i:i, 
        x:this.redondear(x),
        k1:this.redondear(k1),
        k2:this.redondear(k2), 
        yNext:this.redondear(yNext)
      });

      x = x + h;
      y = yNext;
    }
  }

  evaluarFuncion(func:string, x:number, y:number): number{
    return math.evaluate(func, { x, y });
  }

  redondear(valor:number): number{
    return parseFloat(valor.toFixed(4));
  }
}

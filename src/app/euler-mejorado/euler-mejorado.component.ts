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
  resultados: { i:number, x:number; y:number, k1:number, k2:number, yNext:number}[] = [];

  ngOnInit() {}

  calcularEulerMejorado() {

    if(!this.eulerFunc || this.eulerH <= 0 || this.eulerPasos <= 0){
      alert('Por favor, completa todos los campos antes de calcular.');
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
      x = x + h;
      y = yNext;

      this.resultados.push({ 
        i:i+1, 
        x:math.round(x, 4), 
        y:math.round(y, 4),
        k1: math.round(k1, 4), 
        k2: math.round(k2, 4), 
        yNext: math.round(yNext, 4)
      });
    }
  }

  evaluarFuncion(func: string, x: number, y: number): number{
    return math.evaluate(func, { x, y });
  }
}

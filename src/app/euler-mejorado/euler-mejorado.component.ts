import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-euler-mejorado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './euler-mejorado.component.html',
  styleUrl: './euler-mejorado.component.css',
})
export default class EulerMejoradoComponent {
  constructor(private FormBuilder: FormBuilder) {}

  @Output() resultadosCalculados = new EventEmitter<{ i:number, x:number; y:number }[]>();

  eulerFunc:string = '';
  eulerX0:number = 0;
  eulerY0:number = 0;
  eulerH:number = 0;
  eulerPasos:number = 0;

  ngOnInit() {}

  calcularEulerMejorado() {

    if(!this.eulerFunc || this.eulerH <= 0 || this.eulerPasos <= 0){
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const x0 = this.eulerX0;
    const y0 = this.eulerY0;
    const h = this.eulerH;
    const pasos = this.eulerPasos;

    let x = x0;
    let y = y0;

    const resultados: { i:number, x:number; y:number }[] = [{ i:0, x, y}];

    for (let i = 1; i <= pasos; i++) {
      const k1 = this.evaluarFuncion(this.eulerFunc, x, y);
      const k2 = this.evaluarFuncion(this.eulerFunc, x + h, y + h * k1);
      y = y + (h / 2) * (k1 + k2);
      x = x + h;

      resultados.push({ i, x:math.round(x, 4), y:math.round(y, 4) });
    }

    this.resultadosCalculados.emit(resultados);
  }

  evaluarFuncion(func: string, x: number, y: number): number{
    return math.evaluate(func, { x, y });
  }
}

# 🧮 Calculadora de Métodos Numéricos

Aplicación web para resolver problemas de métodos numéricos de forma rápida e interactiva. Desarrollada con [Angular](https://angular.io/) 17 y desplegada en Firebase Hosting.

🔗 **Demo en vivo:** [calculadora-de-metodos-a45ed.web.app](https://calculadora-de-metodos-a45ed.web.app/)

![Vista previa de la calculadora](https://iceliiprojects.s3.us-west-004.backblazeb2.com/CALCULADORA.png)

---

## 📚 Métodos incluidos

| Método | Uso | Fórmula |
|---|---|---|
| **Euler mejorado** (Heun) | Ecuaciones diferenciales de primer orden con valor inicial | `y*ₙ₊₁ = yₙ + h·f(xₙ, yₙ)`<br>`yₙ₊₁ = yₙ + (h/2)·[f(xₙ, yₙ) + f(xₙ₊₁, y*ₙ₊₁)]` |
| **Runge-Kutta (4.° orden)** | Ecuaciones diferenciales de primer orden con mayor precisión | `yₙ₊₁ = yₙ + (h/6)·(k₁ + 2k₂ + 2k₃ + k₄)` |
| **Newton-Raphson** | Búsqueda de raíces de una función | `xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)` |

Donde, para Runge-Kutta de 4.° orden:

```
k₁ = f(xₙ, yₙ)
k₂ = f(xₙ + h/2, yₙ + (h/2)·k₁)
k₃ = f(xₙ + h/2, yₙ + (h/2)·k₂)
k₄ = f(xₙ + h,   yₙ + h·k₃)
```

---

## 🛠️ Tecnologías

- [Angular](https://angular.io/) 17 (Angular CLI 17.3.12)
- TypeScript
- Firebase Hosting

---

## 🚀 Instalación y ejecución local

### Requisitos previos

- [Node.js](https://nodejs.org/) 18.13 o superior (o 20.9+)
- npm (incluido con Node.js)
- Angular CLI (opcional, para usar `ng` globalmente):
  ```bash
  npm install -g @angular/cli
  ```

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Icelii/Calculadora_de_Metodos_numericos.git
cd Calculadora_de_Metodos_numericos

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
ng serve
```

Abre [http://localhost:4200/](http://localhost:4200/) en tu navegador. La aplicación se recarga automáticamente al modificar los archivos.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `ng serve` | Inicia el servidor de desarrollo |
| `ng build` | Genera la compilación de producción en `dist/` |
| `ng test` | Ejecuta las pruebas unitarias con [Karma](https://karma-runner.github.io) |
| `ng generate component nombre` | Crea un nuevo componente (también `directive`, `pipe`, `service`, `class`, `guard`, `interface`, `enum`, `module`) |

---

## ☁️ Despliegue

El proyecto se publica en Firebase Hosting:

```bash
ng build
firebase deploy
```

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── euler-mejorado/     # Método de Euler mejorado
│   ├── runge-kutta/        # Método de Runge-Kutta de 4.° orden
│   ├── newton-raphson/     # Método de Newton-Raphson
│   └── ...
├── assets/
└── index.html
```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👤 Autor

Hecho por **Icelii** · [GitHub](https://github.com/Icelii)

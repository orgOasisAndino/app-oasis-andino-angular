import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pomabamba',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './pomabamba.component.html',
  styleUrl: './pomabamba.component.css'
})
export class PomabambaComponent {
  mostrarSeccion: boolean;

  constructor() {
    // Define la lógica para determinar si mostrar la sección
    this.mostrarSeccion = this.determinarSiMostrarSeccion();
  }

  determinarSiMostrarSeccion(): boolean {
    // Aquí puedes poner la lógica que necesites
    // Por ejemplo, podrías basarlo en el tamaño de la ventana
    const width = window.innerWidth;
    return width >= 768; // Por ejemplo, muestra solo en pantallas md o más grandes
  }
}

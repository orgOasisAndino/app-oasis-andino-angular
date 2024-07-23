import { Component, Input,Output, EventEmitter} from '@angular/core';
import {Room} from '@shared/models/room.model'

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  @Input({required:true}) room!:Room;

  @Output() seleccionar = new EventEmitter();
  

  seleccionarHabitacion() {
    this.seleccionar.emit(this.room);
  
  }
}

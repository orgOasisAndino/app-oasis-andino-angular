import { Component, WritableSignal, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Room } from '@shared/models/room.model';
import { RoomService } from '@shared/services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface PeriodicElement {
  roomId: number;
  number: string;
  floor: number;
  description: string;
  ability: number;
  pricePerNight: number;
  pricePerMonth: number;
}


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-rooms-a',
  standalone: true,
  imports: [MatTableModule,FormsModule,CommonModule],
  templateUrl: './rooms-a.component.html',
  styleUrl: './rooms-a.component.css'
})
export class RoomsAComponent {

  rooms:WritableSignal<Room[]>=signal<Room[]>([]);

  showAddRoomForm: boolean = false;
  newRoom: Partial<Room> = {
    number:'',
    floor:undefined,
    description: '',
    ability:undefined,
    pricePerNight:undefined,
    pricePerMonth:undefined,
  };

  private roomService=inject(RoomService);

  displayedColumns: string[] = ['roomId', 'number', 'floor', 'description', 'ability', 'pricePerNight', 'pricePerMonth', 'acciones'];

  ngOnInit()
  {
    this.roomService.getRooms()
    .subscribe({
      next:(rooms)=>{
        this.rooms.set(rooms);
      },
      error:()=>{

      }
    });

  }

  get dataSource() {
    return this.rooms();
  }

// Métodos para editar y eliminar
editRoom(room: Room) {
  // Implementa la lógica para editar el usuario
  console.log('Edit user:', room);
}

deleteRoom(room: Room) {
  console.log('Delete user:', room);
  this.roomService.deleteRoom(room.roomId).subscribe({
    next: () => {
      // Filtrar el usuario eliminado de la lista
      this.rooms.set(this.rooms().filter(u => u.roomId !== room.roomId));
      console.log(`User with ID ${room.roomId} deleted`);
    },
    error: (err) => {
      console.error('Error deleting user:', err);
    }
  });
}

toggleAddRoomForm() {
  this.showAddRoomForm = !this.showAddRoomForm;
}

addRoom() {
  // Convierte newUser a User antes de enviarlo al servicio
  const roomToSave: Room = {
    ...this.newRoom,
    roomId: 0, // Este campo se ignorará en el backend
  } as Room;

  this.roomService.saveRoom(roomToSave).subscribe({
    next: (room: Room) => {
      this.rooms.set([...this.rooms(), room]);
      this.newRoom = {
        number:'',
        floor:undefined,
        description: '',
        ability:undefined,
        pricePerNight:undefined,
        pricePerMonth:undefined,
      };
      this.showAddRoomForm = false;
      console.log('Room created:', room);
    },
    error: (err) => {
      console.error('Error creating room:', err);
    }
  });
}


}

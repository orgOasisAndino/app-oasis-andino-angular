import { Component, inject, signal } from '@angular/core';
import { RoomComponent } from '../../../rooms/components/room/room.component';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RoomComponent,CommonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  rooms=signal<Room[]>([]);

  private roomService=inject(RoomService);

  /*ngOnInit()
  {
    this.roomService.getRooms()
    .subscribe({
      next:(rooms)=>{
        this.rooms.set(rooms);
      },
      error:()=>{

      }
    })
  }*/

    buscarDisponibilidad() {
      this.roomService.getRooms()
        .subscribe({
          next: (rooms) => {
            this.rooms.set(rooms);
          },
          error: (error) => {
            console.error('Error al obtener las habitaciones:', error);
          }
        });
    }

}

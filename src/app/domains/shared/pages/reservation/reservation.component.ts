import { Component, inject, signal } from '@angular/core';
import { RoomComponent } from '../../../rooms/components/room/room.component';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ReservationService } from '@shared/services/reservation.service';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RoomComponent,CommonModule,RouterLinkWithHref],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  preTotal=0;

  objRecolector:any={
    startDate: '',
    endDate:'',
    roomId:0,
    precioT:0,
  }
  mostrarDetalles = false;//

  rooms=signal<Room[]>([]);

  aux=signal<Room>({
  roomId: 0,
  number: 'string',
  floor: 0,
  description: 'string',
  ability: 0,
  pricePerNight: 0,
  pricePerMonth: 0,
  });

  fechaI='';
  fechaF='';

  private roomService=inject(RoomService);
  private reservationService=inject(ReservationService);

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
      const fechaInicio = (document.getElementById('fechaInicio') as HTMLInputElement).value;
      const fechaFin = (document.getElementById('fechaFin') as HTMLInputElement).value;

      this.fechaI=fechaInicio;
      this.fechaF=fechaFin;

      this.objRecolector.startDate=fechaInicio;
      this.objRecolector.endDate=fechaFin;

    this.roomService.getAvailableRooms(fechaInicio, fechaFin)
      .subscribe({
        next: (rooms) => {
          this.rooms.set(rooms);
        },
        error: (error) => {
          console.error('Error al obtener las habitaciones:', error);
        }
      });
    }

    seleccionarHabitacion(room:Room) {
      this.mostrarDetalles = true;
      this.aux.set(room);
      this.objRecolector.roomId=room.roomId;
      let nD=10;
      this.preTotal=(nD*room.pricePerNight);
      this.objRecolector.precioT=this.preTotal;

    }

    regresar() {
      this.mostrarDetalles = false;
    }

    onConfirmReservation()
    {
        this.reservationService.setReservationData(this.objRecolector);

    }
}

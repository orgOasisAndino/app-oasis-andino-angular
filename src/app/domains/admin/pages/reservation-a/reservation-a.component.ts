import { Component, WritableSignal, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Reservation } from '@shared/models/revervation.model';
import { ReservationService } from '@shared/services/reservation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export interface PeriodicElement {
  reservationId:                 number;
    startDate:                     Date;
    endDate:                       Date;
    totalPrice:                    number;
    state:                         string;
    confirmation:                  boolean;
    userId:                        number;
    roomId:                        number;
}



/**
 * @title Styling columns using their auto-generated column names
 */

@Component({
  selector: 'app-reservation-a',
  standalone: true,
  imports: [MatTableModule,FormsModule,CommonModule],
  templateUrl: './reservation-a.component.html',
  styleUrl: './reservation-a.component.css'
})
export class ReservationAComponent {

  reservations:WritableSignal<Reservation[]>=signal<Reservation[]>([]);

  showAddReservationForm: boolean = false;
  newReservation: Partial<Reservation> = {
    startDate:new Date(),
    endDate:new Date(),
    totalPrice: undefined,
    state:'',
    confirmation:undefined,
    userId:undefined,
    roomId:undefined,
  };

  private reservationService=inject(ReservationService);

  displayedColumns: string[] = ['reservationId', 'startDate', 'endDate', 'totalPrice', 'state', 'confirmation', 'userId', 'roomId', 'acciones'];
  ngOnInit()
  {
    this.reservationService.getReservations()
    .subscribe({
      next:(reservations)=>{
        this.reservations.set(reservations);
      },
      error:()=>{

      }
    });

  }

  get dataSource() {
    return this.reservations();
  }


// Métodos para editar y eliminar
editReservation(reservation: Reservation) {
  // Implementa la lógica para editar el usuario
  console.log('Edit user:', reservation);
}

deleteReservation(reservation: Reservation) {
  console.log('Delete user:', reservation);
  this.reservationService.deleteReservation(reservation.reservationId).subscribe({
    next: () => {
      // Filtrar el usuario eliminado de la lista
      this.reservations.set(this.reservations().filter(u => u.reservationId !== reservation.reservationId));
      console.log(`Reservation with ID ${reservation.reservationId} deleted`);
    },
    error: (err) => {
      console.error('Error deleting user:', err);
    }
  });
}

//

toggleAddReservationForm() {
  this.showAddReservationForm = !this.showAddReservationForm;
}

addUser() {
  // Convierte newUser a User antes de enviarlo al servicio
  const reservationToSave: Reservation = {
    ...this.newReservation,
    reservationId: 0, // Este campo se ignorará en el backend
    startDate: new Date(this.newReservation.startDate || new Date()),
    endDate: new Date(this.newReservation.endDate || new Date())
  } as Reservation;

  this.reservationService.saveReservation(reservationToSave).subscribe({
    next: (reservation: Reservation) => {
      this.reservations.set([...this.reservations(), reservation]);
      this.newReservation = {
        startDate:new Date(),
        endDate:new Date(),
        totalPrice: undefined,
        state:'',
        confirmation:undefined,
        userId:undefined,
        roomId:undefined,
      };
      this.showAddReservationForm = false;
      console.log('Reservation created:', reservation);
    },
    error: (err) => {
      console.error('Error creating reservation:', err);
    }
  });
}

}

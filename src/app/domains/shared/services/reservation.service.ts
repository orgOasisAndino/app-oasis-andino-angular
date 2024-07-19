import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '@shared/models/revervation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private http=inject(HttpClient);

  constructor() { }


  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/reservation/all');
    //return this.http.get<Reservation[]>('http://localhost:8080/oasis-andino/api/reservation/all');
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/reservation/id/${id}`);
    //return this.http.get<Reservation>(`http://localhost:8080/oasis-andino/api/reservation/id/${id}`);
  }

  saveReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>('https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/reservation/save', reservation);
    //return this.http.post<Reservation>('http://localhost:8080/oasis-andino/api/reservation/save', reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/reservation/delete/${id}`);
    //return this.http.delete<void>(`http://localhost:8080/oasis-andino/api/reservation/delete/${id}`);
  }
}

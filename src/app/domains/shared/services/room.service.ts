import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private http=inject(HttpClient);

  constructor() { }


  getRooms():Observable<Room[]> {
    return this.http.get<Room[]>('http://localhost:8080/oasis-andino/api/room/all');
    //return this.http.get<Room[]>('https://oasis-andino-backend-fi6jg5aela-uc.a.run.app/oasis-andino/api/room/all')
  }

  getAvailableRooms(fechaInicio: string, fechaFin: string): Observable<Room[]> {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<Room[]>('http://localhost:8080/oasis-andino/api/room/disponibles', { params });
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`http://localhost:8080/oasis-andino/api/room/id/${id}`);
  }

  saveRoom(room: Room): Observable<Room> {
    return this.http.post<Room>('http://localhost:8080/oasis-andino/api/room/save', room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/oasis-andino/api/room/delete/${id}`);
  }
}

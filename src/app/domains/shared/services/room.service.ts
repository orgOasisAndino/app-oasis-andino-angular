import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private http=inject(HttpClient);

  constructor() { }


  getRooms()
  {
    return this.http.get<Room[]>('http://localhost:8080/oasis-andino/api/room/all')
  }
}

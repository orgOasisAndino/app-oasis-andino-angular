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
    //return this.http.get<Room[]>('http://localhost:8080/oasis-andino/api/room/all')
    return this.http.get<Room[]>('https://oasis-andino-backend-fi6jg5aela-uc.a.run.app/oasis-andino/api/room/all')
  }
}

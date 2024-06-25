import { Component, inject, signal } from '@angular/core';
import { Room } from '../../../shared/models/room.model';
import { RoomService } from '@shared/services/room.service';
import { RoomComponent } from '../../components/room/room.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RoomComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  rooms=signal<Room[]>([]);

  private roomService=inject(RoomService);

  ngOnInit()
  {
    this.roomService.getRooms()
    .subscribe({
      next:(rooms)=>{
        this.rooms.set(rooms);
      },
      error:()=>{

      }
    })
  }

}

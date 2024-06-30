import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'
import { Request } from '@shared/models/request.model';
import { RequestsService } from '@shared/services/requests.service';

export interface PeriodicElement {
    requestsId: number;
    name:       string;
    email:      string;
    message:    string;
    date:       Date;
    state:      string;
}



/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
  selector: 'app-requests-a',
  standalone: true,
  imports: [MatTableModule, FormsModule, CommonModule],
  templateUrl: './requests-a.component.html',
  styleUrl: './requests-a.component.css'
})
export class RequestsAComponent {


  requests: WritableSignal<Request[]> = signal<Request[]>([]);

  showAddRequestForm: boolean = false;
  newRequest: Partial<Request> = {
    name:       '',
    email:      '',
    message:    '',
    date:       new Date(),
    state:      '',
  };

  private requestService=inject(RequestsService);

  displayedColumns: string[] = ['requestsId', 'name', 'email', 'message', 'date', 'state', 'acciones'];

  ngOnInit()
  {
    this.requestService.getRequests()
    .subscribe({
      next:(request)=>{
        this.requests.set(request);
         
      },
      error:()=>{

      }
    })
  }
  // Getter para dataSource que devuelve los datos de la señal users
  get dataSource() {
    return this.requests();
  }


  // Métodos para editar y eliminar
  editRequests(requests: Request) {
    // Implementa la lógica para editar el usuario
    console.log('Edit requests:', requests);
  }

  deleteRequests(requests: Request) {
    console.log('Delete Request:', requests);
    this.requestService.deleteRequest(requests.requestsId).subscribe({
      next: () => {
        // Filtrar el usuario eliminado de la lista
        this.requests.set(this.requests().filter(u => u.requestsId !== requests.requestsId));
        console.log(`User with ID ${requests.requestsId} deleted`);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }


  //

  toggleAddRequestsForm() {
    this.showAddRequestForm = !this.showAddRequestForm;
  }

  addRequest() {
    // Convierte newUser a User antes de enviarlo al servicio
    const requestToSave: Request = {
      ...this.newRequest,
      requestsId: 0, // Este campo se ignorará en el backend
      date: new Date(this.newRequest.date || new Date())
    } as Request;

    this.requestService.saveRequest(requestToSave).subscribe({
      next: (request: Request) => {
        this.requests.set([...this.requests(), request]);
        this.newRequest = {
          name:       '',
          email:      '',
          message:    '',
          date:       new Date(),
          state:      '',
        };
        this.showAddRequestForm = false;
        console.log('User created:', request);
      },
      error: (err) => {
        console.error('Error creating request:', err);
      }
    });
  }
  

}

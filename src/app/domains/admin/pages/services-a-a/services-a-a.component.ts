import { Component, WritableSignal, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AditionalService } from '@shared/models/aditionalservice.model';
import { AdicionalService } from '@shared/services/adicional.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PeriodicElement {
  additionalServiceId: number;
  description:         string;
  price:               number;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-services-a-a',
  standalone: true,
  imports: [MatTableModule,CommonModule,FormsModule],
  templateUrl: './services-a-a.component.html',
  styleUrl: './services-a-a.component.css'
})
export class ServicesAAComponent {


  serviceAditionals: WritableSignal<AditionalService[]> = signal<AditionalService[]>([]);

  showAddServiceAditionalForm: boolean = false;
  newServiceAditional: Partial<AditionalService> = {
    //additionalServiceId: undefined,
    description:         '',
    price:               undefined,
  };

  private ServiceAditionalService =inject(AdicionalService);


  displayedColumns: string[] = ['additionalServiceId', 'description', 'price', 'acciones'];
  
  ngOnInit()
  {
    this.ServiceAditionalService.getAditionalServices()
    .subscribe({
      next:(services)=>{
        this.serviceAditionals.set(services);
         
      },
      error:()=>{

      }
    })
  }
  // Getter para dataSource que devuelve los datos de la señal users
  get dataSource() {
    return this.serviceAditionals();
  }


  // Métodos para editar y eliminar
  editAditionalService(aditionalService: AditionalService) {
    // Implementa la lógica para editar el usuario
    console.log('Edit user:', aditionalService);
  }

  deleteAditionalService(aditionalService: AditionalService) {
    console.log('Delete aditionalService:', aditionalService);
    this.ServiceAditionalService.deleteAditionalService(aditionalService.additionalServiceId).subscribe({
      next: () => {
        // Filtrar el usuario eliminado de la lista
        this.serviceAditionals.set(this.serviceAditionals().filter(u => u.additionalServiceId !== aditionalService.additionalServiceId));
        console.log(`User with ID ${aditionalService.additionalServiceId} deleted`);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }


  //

  toggleServiceAditionalUserForm() {
    this.showAddServiceAditionalForm = !this.showAddServiceAditionalForm;
  }

  addServiceAditional() {
    // Convierte newUser a User antes de enviarlo al servicio
    const aditionalToSave: AditionalService = {
      ...this.newServiceAditional,
      additionalServiceId: 0, // Este campo se ignorará en el backend
      
    } as AditionalService;

    this.ServiceAditionalService.saveAditionalService(aditionalToSave).subscribe({
      next: (service: AditionalService) => {
        this.serviceAditionals.set([...this.serviceAditionals(), service]);
        this.newServiceAditional = {
          //additionalServiceId: undefined,
          description:         '',
          price:               undefined,
        };
        this.showAddServiceAditionalForm = false;
        console.log('Service Aditonal created:', service);
      },
      error: (err) => {
        console.error('Error creating Service Aditional:', err);
      }
    });
  }




}

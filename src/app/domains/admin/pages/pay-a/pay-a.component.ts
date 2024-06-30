import {AfterViewInit, Component, ViewChild, WritableSignal, inject, signal} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Pay } from '@shared/models/pay.model';
import { PayService } from '@shared/services/pay.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


export interface PeriodicElement {
    payId:         number;
    paymentDate:   Date;
    amount:        number;
    paymentMethod: string;
    reservationId: number;
}




@Component({
  selector: 'app-pay-a',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,CommonModule,FormsModule],
  templateUrl: './pay-a.component.html',
  styleUrl: './pay-a.component.css'
})
export class PayAComponent implements AfterViewInit{

  pays:WritableSignal<Pay[]>=signal<Pay[]>([]);

  showAddPayForm: boolean = false;

  newPay:Partial<Pay>={
    
    paymentDate:   new Date,
    amount:        undefined,
    paymentMethod: '',
    reservationId: undefined,
  }

  private payService=inject(PayService);


  displayedColumns: string[] = ['payId', 'paymentDate', 'amount', 'paymentMethod', 'reservationId', 'acciones'];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit()
  {
    this.payService.getPays()
    .subscribe({
      next:(pays)=>{
        this.pays.set(pays);
      },
      error:()=>{

      }
    });

  }

  
  get dataSource() {
    return new MatTableDataSource<PeriodicElement>(this.pays()) ;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  // Métodos para editar y eliminar
editPay(pay: Pay) {
  // Implementa la lógica para editar el usuario
  console.log('Edit Pay:', pay);
}

deletePay(pay: Pay) {
  console.log('Delete user:', pay);
  this.payService.deletePay(pay.payId).subscribe({
    next: () => {
      // Filtrar el usuario eliminado de la lista
      this.pays.set(this.pays().filter(u => u.payId !== pay.payId));
      console.log(`User with ID ${pay.payId} deleted`);
    },
    error: (err) => {
      console.error('Error deleting user:', err);
    }
  });
}



toggleAddPayForm() {
  this.showAddPayForm = !this.showAddPayForm;
}

addPay() {
  // Convierte newUser a User antes de enviarlo al servicio
  const payToSave: Pay = {
    ...this.newPay,
    roomId: 0, // Este campo se ignorará en el backend
    paymentDate:new Date(this.newPay.paymentDate || new Date())
  } as Pay;

  this.payService.savePay(payToSave).subscribe({
    next: (pay: Pay) => {
      this.pays.set([...this.pays(), pay]);
      this.newPay = {
    
        paymentDate:   new Date,
        amount:        undefined,
        paymentMethod: '',
        reservationId: undefined,
      };
      this.showAddPayForm = false;
      console.log('Pay created:', pay);
    },
    error: (err) => {
      console.error('Error creating Pay:', err);
    }
  });
}

}

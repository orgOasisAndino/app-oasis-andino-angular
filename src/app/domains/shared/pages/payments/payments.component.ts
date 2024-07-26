import { Component, inject, OnInit,ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '@shared/services/reservation.service';
import { UsersService } from '@shared/services/users.service';
import { User } from '@shared/models/user.model';
import { Reservation } from '@shared/models/revervation.model';
import { RouterLinkWithHref } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule,RouterLinkWithHref,ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})

export class PaymentsComponent implements OnInit {
  myForm: FormGroup;
  contactForm: FormGroup;

  paymentMessageText: string = ''; // Nueva variable para almacenar el mensaje de pago


  newUser: Partial<User> = {
    name: 'preReserva',
    email: 'pre@gmail.com',
    password: '1234',
    registrationdate: new Date(),
  };

  objAlmacen: any = {
    //objeto con los datos para la reverva
    startDate: '',
    endDate: '',
    roomId: 0,
    precioT: 0,
  };

  ngOnInit() {
    this.objAlmacen = this.reservationService.getReservationData();
    console.log(this.objAlmacen);
    this.generateRandomMessage(); // Genera el mensaje cuando el componente se inicializa
  }
  generateRandomMessage() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.paymentMessageText = result; // Almacena el mensaje generado
  }

  newReservation: Partial<Reservation> = {
    startDate: new Date(),
    endDate: new Date(),
    totalPrice: undefined,
    state: 'pendiente',
    confirmation: false,
    userId: undefined,
    roomId: undefined,
  };

  modalVisible: string | null = null;
  selectedPaymentMethod: string | null = null;
  thirdPartVisible: string | null = null;
  currentSection: string = 'contact';
  contactDataVisible: boolean = false;
  confirmationVisible: boolean = false;

  reservationService = inject(ReservationService);
  userService = inject(UsersService);

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }
  openModal(modalId: string) {
    this.modalVisible = modalId;
    this.currentSection = 'contact';
  }

  closeModal() {
    this.modalVisible = null;
    this.selectedPaymentMethod = null;
    this.thirdPartVisible = null;
    this.currentSection = 'contact';
    this.contactDataVisible = false;
    this.confirmationVisible = false;
  }


  validatorFormGoToSection() {
    if (this.myForm.valid) {
      this.contactDataVisible = true;
    } else {
      alert('Por favor, completa todos los campos de contacto.');
    }
  }

  goToSection1(section: string) {///para yape y plin
    if (section === 'paymentInstructions' && this.contactForm.valid) {
      this.currentSection = section;
    } else if (section !== 'paymentInstructions') {
      this.currentSection = section;
    } else {
      alert('Por favor, completa todos los campos de contacto.');
    }
  }


  copyToClipboard() {
    navigator.clipboard
      .writeText(this.paymentMessageText)
      .then(() => {
        alert('Texto copiado');
      })
      .catch((err) => {
        console.error('Error al copiar el texto: ', err);
      });
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  resetPaymentMethod() {
    this.selectedPaymentMethod = null;
    this.thirdPartVisible = null;
    this.contactDataVisible = false;
  }

  showThirdPart(method: string) {
    this.thirdPartVisible = method;
  }
  showConfirmation() {
    this.confirmationVisible = true;
  }

  addUser() {
    // Convierte newUser a User antes de enviarlo al servicio
    const userToSave: User = {
      ...this.newUser,
      userid: 0, // Este campo se ignorará en el backend
      registrationdate: new Date(this.newUser.registrationdate || new Date()),
    } as User;

    this.userService.saveUser(userToSave).subscribe({
      next: (user: User) => {
        this.newReservation.userId = user.userid;

        this.newUser = {
          name: '',
          email: '',
          password: '',
          registrationdate: new Date(),
        };
        console.log('User created:', user);
      },
      error: (err) => {
        console.error('Error creating user:', err);
      },
    });
    this.newReservation.roomId = this.objAlmacen.roomId;

    let fechai = String(this.objAlmacen.startDate);
    let fechaf = String(this.objAlmacen.endDate);
    this.newReservation.startDate = new Date(fechai);
    this.newReservation.endDate = new Date(fechaf);
    this.newReservation.totalPrice = this.objAlmacen.precioT;
    console.log(this.newReservation + 'holaa');
  }

  addReservation() {
    // Convierte newUser a User antes de enviarlo al servicio
    const reservationToSave: Reservation = {
      ...this.newReservation,
      reservationId: 0, // Este campo se ignorará en el backend
    } as Reservation;

    this.reservationService.saveReservation(reservationToSave).subscribe({
      next: (reservation: Reservation) => {
        this.newReservation = {
          startDate: new Date(),
          endDate: new Date(),
          totalPrice: undefined,
          state: '',
          confirmation: undefined,
          userId: undefined,
          roomId: undefined,
        };
        this.objAlmacen = {
          startDate: '',
          endDate: '',
          roomId: 0,
          precioT: 0,
        };

        console.log('Reservation created:', reservation);
      },
      error: (err) => {
        console.error('Error creating reservation:', err);

      },
    });
  }

  addAndCrate() {
    this.addUser();
    this.addReservation();
  }

  handleContactContinue() {
    this.addUser();
    this.goToSection1('paymentInstructions');
  }

  handlePaymentContinue() {
    this.addReservation();
    this.goToSection1('confirmation');
  }


  //bn bcp

  addUserAndContinue(){
    this.addUser();
    this.validatorFormGoToSection();
  }

  registerAndClose(){
    this.addReservation();
    this.showConfirmation();
  }
}

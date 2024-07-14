import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  modalVisible: string | null = null;
  selectedPaymentMethod: string | null = null;
  thirdPartVisible: string | null = null;

  openModal(modalId: string) {
    this.modalVisible = modalId;
  }

  closeModal() {
    this.modalVisible = null;
    this.selectedPaymentMethod = null;
    this.thirdPartVisible = null;
  }

  copyToClipboard() {
    const textToCopy = document.getElementById('paymentMessage')!.textContent!;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Texto copiado');
    }).catch(err => {
      console.error('Error al copiar el texto: ', err);
    });
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  resetPaymentMethod() {
    this.selectedPaymentMethod = null;
    this.thirdPartVisible = null;
  }

  showThirdPart(method: string) {
    this.thirdPartVisible = method;
  }

}

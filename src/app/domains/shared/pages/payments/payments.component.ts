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

  openModal(modalId: string) {
    this.modalVisible = modalId;
  }

  closeModal() {
    this.modalVisible = null;
  }

  copyToClipboard() {
    const textToCopy = document.getElementById('paymentMessage')!.textContent!;
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Texto copiado: ' + textToCopy);
  }
}

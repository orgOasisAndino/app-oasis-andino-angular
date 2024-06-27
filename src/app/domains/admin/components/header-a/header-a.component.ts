import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header-a',
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterLinkWithHref],
  templateUrl: './header-a.component.html',
  styleUrl: './header-a.component.css'
})
export class HeaderAComponent {


  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}

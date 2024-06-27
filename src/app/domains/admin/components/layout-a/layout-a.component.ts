import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAComponent } from '../header-a/header-a.component';

@Component({
  selector: 'app-layout-a',
  standalone: true,
  imports: [RouterModule,HeaderAComponent],
  templateUrl: './layout-a.component.html',
  styleUrl: './layout-a.component.css'
})
export class LayoutAComponent {

}

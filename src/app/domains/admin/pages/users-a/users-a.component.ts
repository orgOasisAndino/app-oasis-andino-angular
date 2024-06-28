import { Component, WritableSignal, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { User } from '@shared/models/user.model';
import { UsersService } from '@shared/services/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  userid:number
  name: string;
  email: string;
  password: string;
  registrationdate: Date;
}



@Component({
  selector: 'app-users-a',
  standalone: true,
  imports: [MatTableModule,FormsModule,CommonModule],
  templateUrl: './users-a.component.html',
  styleUrl: './users-a.component.css'
})
export class UsersAComponent {

  users: WritableSignal<User[]> = signal<User[]>([]);

  showAddUserForm: boolean = false;
  newUser: Partial<User> = {
    name: '',
    email: '',
    password: '',
    registrationdate: new Date()
  };

  private userService=inject(UsersService);

  displayedColumns: string[] = ['demo-userid', 'demo-name', 'demo-email', 'demo-password', 'demo-registrationdate', 'acciones'];
  //dataSource = this.users;


  ngOnInit()
  {
    this.userService.getUsers()
    .subscribe({
      next:(users)=>{
        this.users.set(users);
         
      },
      error:()=>{

      }
    })
  }
  // Getter para dataSource que devuelve los datos de la señal users
  get dataSource() {
    return this.users();
  }


  // Métodos para editar y eliminar
  editUser(user: User) {
    // Implementa la lógica para editar el usuario
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    console.log('Delete user:', user);
    this.userService.deleteUser(user.userid).subscribe({
      next: () => {
        // Filtrar el usuario eliminado de la lista
        this.users.set(this.users().filter(u => u.userid !== user.userid));
        console.log(`User with ID ${user.userid} deleted`);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }


  //

  toggleAddUserForm() {
    this.showAddUserForm = !this.showAddUserForm;
  }

  addUser() {
    // Convierte newUser a User antes de enviarlo al servicio
    const userToSave: User = {
      ...this.newUser,
      userid: 0, // Este campo se ignorará en el backend
      registrationdate: new Date(this.newUser.registrationdate || new Date())
    } as User;

    this.userService.saveUser(userToSave).subscribe({
      next: (user: User) => {
        this.users.set([...this.users(), user]);
        this.newUser = { name: '', email: '', password: '', registrationdate: new Date() };
        this.showAddUserForm = false;
        console.log('User created:', user);
      },
      error: (err) => {
        console.error('Error creating user:', err);
      }
    });
  }
}

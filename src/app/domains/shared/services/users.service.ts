import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http=inject(HttpClient)

  constructor() { }

  getUsers(): Observable<User[]> {
    //return this.http.get<User[]>('http://localhost:8080/oasis-andino/api/user/all');
    //https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/user/all
    return this.http.get<User[]>('https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/user/all');
  }

  getUser(id: number): Observable<User> {
    //return this.http.get<User>(`http://localhost:8080/oasis-andino/api/user/id/${id}`);
    return this.http.get<User>(`https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/user/id/${id}`);
  }

  saveUser(user: User): Observable<User> {
    //return this.http.post<User>('http://localhost:8080/oasis-andino/api/user/save', user);
    return this.http.post<User>('https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/user/save', user);
  }

  deleteUser(id: number): Observable<void> {
    //return this.http.delete<void>(`http://localhost:8080/oasis-andino/api/user/delete/${id}`);
    return this.http.delete<void>(`https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/user/delete/${id}`);
  }
}

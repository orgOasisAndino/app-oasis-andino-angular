import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '@shared/models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private http=inject(HttpClient);

  constructor() { }


  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>('http://localhost:8080/oasis-andino/api/contact/all');
  }

  getRequest(id: number): Observable<Request> {
    return this.http.get<Request>(`http://localhost:8080/oasis-andino/api/contact/id/${id}`);
  }

  saveRequest(request: Request): Observable<Request> {
    return this.http.post<Request>('http://localhost:8080/oasis-andino/api/contact/save', request);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/oasis-andino/api/contact/delete/${id}`);
  }
}

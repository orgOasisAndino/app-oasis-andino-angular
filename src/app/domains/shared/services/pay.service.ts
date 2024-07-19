import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pay } from '@shared/models/pay.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PayService {

  private http=inject(HttpClient);
  constructor() { }


  getPays(): Observable<Pay[]> {
    return this.http.get<Pay[]>('https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/pay/all');
    //return this.http.get<Pay[]>('http://localhost:8080/oasis-andino/api/pay/all');
  }

  getPay(id: number): Observable<Pay> {
    return this.http.get<Pay>(`https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/pay/id/${id}`);
    //return this.http.get<Pay>(`http://localhost:8080/oasis-andino/api/pay/id/${id}`);
  }

  savePay(pay: Pay): Observable<Pay> {
    return this.http.post<Pay>('https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/pay/save', pay);
    //return this.http.post<Pay>('http://localhost:8080/oasis-andino/api/pay/save', pay);
  }

  deletePay(id: number): Observable<void> {
    return this.http.delete<void>(`https://free-api-fi6jg5aela-uc.a.run.app/oasis-andino/api/pay/delete/${id}`);
    //return this.http.delete<void>(`http://localhost:8080/oasis-andino/api/pay/delete/${id}`);
  }
}

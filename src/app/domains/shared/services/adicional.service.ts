import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AditionalService } from '@shared/models/aditionalservice.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

  private http=inject(HttpClient);

  constructor() { }


  getAditionalServices(): Observable<AditionalService[]> {
    return this.http.get<AditionalService[]>('http://localhost:8080/oasis-andino/api/additional/all');
  }

  getAditionalService(id: number): Observable<AditionalService> {
    return this.http.get<AditionalService>(`http://localhost:8080/oasis-andino/api/additional/id/${id}`);
  }

  saveAditionalService(aditionalservice: AditionalService): Observable<AditionalService> {
    return this.http.post<AditionalService>('http://localhost:8080/oasis-andino/api/additional/save', aditionalservice);
  }

  deleteAditionalService(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/oasis-andino/api/additional/delete/${id}`);
  }
}

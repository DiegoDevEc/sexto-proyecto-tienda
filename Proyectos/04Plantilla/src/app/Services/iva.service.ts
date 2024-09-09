import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iiva } from '../Interfaces/iva';

@Injectable({
  providedIn: 'root'
})
export class IvaService {
  apiurl = 'http://localhost/sexto/Proyectos/03MVC/controllers/iva.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<Iiva[]> {
    return this.lector.get<Iiva[]>(this.apiurl + 'todos');
  }

  uno(idUnidad: number): Observable<Iiva> {
    const formData = new FormData();
    formData.append('idUnidad', idUnidad.toString());
    return this.lector.post<Iiva>(this.apiurl + 'uno', formData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class reportesService {
  constructor(private http: HttpClient) {}
  postCliente(data: any) {
    return this.http.post<any>('http://ec2-3-94-86-0.compute-1.amazonaws.com:8080/api/clientes', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getCliente() {
    return this.http.get<any>('http://ec2-3-94-86-0.compute-1.amazonaws.com:8080/api/clientes').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
}

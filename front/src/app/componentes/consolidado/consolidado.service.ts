import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class ConsolidadoService {
    constructor(private http: HttpClient) {}
    
    getCiudades() {
      return this.http.get<any>('http://ec2-3-94-86-0.compute-1.amazonaws.com:8080/api/consolidados/').pipe(
        map((res: any) => {
          return res;
        })
      );
    }
    getVentas(data:any) {
        return this.http.get<any>('http://ec2-3-94-86-0.compute-1.amazonaws.com:8080/api/ventas/'+data).pipe(
          map((res: any) => {
            return res;
          })
        );
      }
  }
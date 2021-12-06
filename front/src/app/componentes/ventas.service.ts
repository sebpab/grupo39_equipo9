import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  constructor(private http: HttpClient) { }
  getCliente(cedula:any) {
    return this.http.get<any>('http://localhost:8080/api/clientes/'+cedula).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getProducto(codigoproducto:any) {
    return this.http.get<any>('http://localhost:8080/api/productos/codigo/'+codigoproducto).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  postVenta(data: any) {
    return this.http.post<any>('http://localhost:8080/api/ventas', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  postConsolidado(data: any) {
    return this.http.post<any>('http://localhost:8080/api/consolidado', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}

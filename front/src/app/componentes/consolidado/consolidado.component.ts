import { Component, OnInit } from '@angular/core';
import { ConsolidadoService } from './consolidado.service';
import { consolidadoModel } from './consolidado.model';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements OnInit {
  ventaModelObj: consolidadoModel = new consolidadoModel();
  constructor(private api: ConsolidadoService) { 
  }
  cantidadBogota: number = 0;
  cantidadMedellin: number = 0;
  cantidadCali: number = 0;
  totalBogota: number = 0;
  totalMedellin: number = 0;
  totalCali: number = 0;
  ngOnInit(): void {
    this.getAllCiudades();
  }


  getAllCiudades(){

    this.api.getCiudades().subscribe(
      
      (res) => {
        var bogota: any = [];
        for (let objeto = 0; objeto < res.length; objeto++) {
          if (res[objeto].codigociudad == 1) {
            bogota.push(res[objeto]);
          }
        }
        this.cantidadBogota= bogota.length;
        
        
        for (let ventaBogota = 0; ventaBogota < bogota.length; ventaBogota++) {
          this.api.getVentas(bogota[ventaBogota].codigoventa).subscribe(
            (res) => {
              this.totalBogota += parseInt(res.valorventa);
            },
            (err) => {
              alert('Error');
            }
          );
        }
        var medellin: any = [];
        for (let objeto = 0; objeto < res.length; objeto++) {
          if (res[objeto].codigociudad == 2) {
            medellin.push(res[objeto]);
          }
        }
        this.cantidadMedellin = medellin.length;
        
        for (let ventaMedellin = 0; ventaMedellin < medellin.length; ventaMedellin++) {
          this.api.getVentas(medellin[ventaMedellin].codigoventa).subscribe(
            (res) => {
              this.totalMedellin += parseInt(res.valorventa);
            },
            (err) => {
              alert('Error');
            }
          );
        }

        var cali: any = [];
        for (let objeto = 0; objeto < res.length; objeto++) {
          if (res[objeto].codigociudad == 3) {
            cali.push(res[objeto]);
          }
        }
        this.cantidadCali = cali.length;

        for (let ventaCali = 0; ventaCali < cali.length; ventaCali++) {
          this.api.getVentas(cali[ventaCali].codigoventa).subscribe(
            (res) => {
              this.totalCali += parseInt(res.valorventa);
            },
            (err) => {
              alert('Error');
            }
          );
        }
      },
      (err) => {
        alert('Error');
      }
    );
  } 
}

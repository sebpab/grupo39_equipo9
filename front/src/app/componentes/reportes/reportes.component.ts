import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
//import { clienteModel } from '../clientes/clientes.model';
import { reportesModel } from './reportes.model';
import { reportesService } from './reportes.service';
import { HttpClient } from '@angular/common/http';
import { clienteModel } from '../clientes/clientes.model';
import { ventasModel } from '../ventas/ventas.model';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  formValue_2!: FormGroup;
  reportesModelObj: reportesModel = new reportesModel();
  clienteData!: any;
  displayTable_clientes: any = 0;
  displayTable_ventasClnts: any = 0;

   //variable receptora de documentos
   res: any;
   res2: any;
  
  
   //variable contenedora de contenidos
   contenido: any;
   contenido2: any;

   //url api get
   urlapiGET: string = "http://localhost:8080/api/ventas";
   urlapiGET2: string = "http://localhost:8080/api/clientes";

   totalventasreporte: any;

   totalesventas: number[] = [];

   


  constructor(private formbuilder: FormBuilder, private api: reportesService, private objetohttp: HttpClient, private clientehttp: HttpClient) 
  { }

  ngOnInit(): void {
    /* this.formValue_2 = this.formbuilder.group({
       cedula: [''],
       nombrecompleto: [''],
       direccion: [''],
       telefono: [''],
       correo: [''],
     });
     this.getAllClientes();*/
     this.displayTable_clientes = 0;
     this.displayTable_ventasClnts = 0;

     
  
  } 

  getAllClientes() {
    this.displayTable_ventasClnts = 0;
    this.api.getCliente().subscribe((res) => {
      this.clienteData = res;
    });
    this.displayTable_clientes = 1;
  }

  getAllVentasClientes() {
    this.displayTable_clientes = 0;
    this.totalventasreporte = "";
    this.totalesventas = [];
  
    


    this.res = this.objetohttp.get(this.urlapiGET);
    this.res.subscribe((datos: any[]) => {
      this.contenido = datos;
      console.log(this.contenido);     

    });

    this.res2 = this.objetohttp.get(this.urlapiGET2);
    this.res2.subscribe((datos2: any[]) => {
      this.contenido2 = datos2;
      console.log(this.contenido2);     
      
    });

    this.displayTable_ventasClnts = 1;
    

    for (let i of this.contenido){

      console.log(i.valorventa);
      
      this.totalesventas.push(i.valorventa);
      
    }

    console.log(this.totalesventas);

    let sum = this.totalesventas.reduce((a, b) => a + b, 0);
    
    console.log(sum);

    this.totalventasreporte = sum;

    sum = 0;

    console.log(this.totalventasreporte);
    
  }

    
    
  }




 








import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { clienteModel } from '../clientes/clientes.model';
import { reportesModel } from './reportes.model';
import { reportesService } from './reportes.service';

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
  constructor(private formbuilder: FormBuilder, private api: reportesService) 
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
   
    this.displayTable_ventasClnts = 1;
  }



}


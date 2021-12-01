import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VentasService } from '../ventas.service';
import { ventasModel } from './ventas.model';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  formValue!: FormGroup;
  formValueProductos!: FormGroup;
  ventaModelObj: ventasModel = new ventasModel();
  clienteData!: any;
  productoData!: any;
  constructor(private formbuilder: FormBuilder, private api: VentasService) { }

  ngOnInit(): void
   {
    this.formValue = this.formbuilder.group({
      cedula: [''],
      nombrecompleto: [''],
      direccion: [''],
      telefono: [''],
      correo: [''],
    });
    this.formValueProductos = this.formbuilder.group({
      codigoproducto1: [''],
      codigoproducto2: [''],
      codigoproducto3: [''],
    })
    /*
    let botonesConsultar: NodeListOf<Element>;
    botonesConsultar = document.querySelectorAll("#submitProducto");
    for(let i = 1; i <= botonesConsultar.length; i++) {
      let botonesConsultarClass: NodeListOf<Element>;
      document.querySelector(".btnProducto"+ i)?.addEventListener("click",()=>{
        this.enviarProducto(i);
      }); 
    }*/
  } 
  enviarCedula(){
    this.ventaModelObj.cedula = this.formValue.value.cedula;
    this.api.getCliente(this.ventaModelObj.cedula).subscribe((res)=>{
      this.clienteData = res;
      console.log(this.clienteData);
    });
  }
  enviarProducto1(){
    console.log("hola1");
    this.ventaModelObj.codigoproducto1 = this.formValueProductos.value.codigoproducto1;
    this.api.getProducto(this.ventaModelObj.codigoproducto1).subscribe((res)=>{
    this.productoData = res;
    });
    }
  enviarProducto2(){
    console.log("hola2");
    this.ventaModelObj.codigoproducto2 = this.formValueProductos.value.codigoproducto2;
    this.api.getProducto(this.ventaModelObj.codigoproducto2).subscribe((res)=>{
    this.productoData = res;
    });
    }
  enviarProducto3(){
    console.log("hola3");
    this.ventaModelObj.codigoproducto3 = this.formValueProductos.value.codigoproducto3;
    this.api.getProducto(this.ventaModelObj.codigoproducto3).subscribe((res)=>{
    this.productoData = res;
    });
  }
  /*
  enviarProducto(i:any){
    //let codigoConsulta : NodeListOf<Element>;
    //codigoConsulta = document.querySelectorAll("codigoProducto"+i); 
    //console.log(codigoConsulta);
    var boton: string;
    boton = "c"+i;
    this.ventaModelObj.codigoproducto = this.formValueProductos.value.boton;
    this.api.getProducto(this.ventaModelObj.codigoproducto).subscribe((res)=>{
      this.productoData = res;
      console.log(this.productoData);
    });
  }*/
 
}


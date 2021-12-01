import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  
  formProductos:FormGroup = new FormGroup({
      codigoproducto1: new FormControl(''),
      nombreProducto1: new FormControl(''),
      codigoproducto2: new FormControl(''),
      nombreProducto2: new FormControl(''),
      codigoproducto3: new FormControl(''),
      nombreProducto3: new FormControl(''),
      valorProducto1: new FormControl(''),
      valorProducto2: new FormControl(''),
      valorProducto3: new FormControl(''),
      valortotalProducto1: new FormControl(''),
      valortotalProducto2: new FormControl(''),
      valortotalProducto3: new FormControl(''),
  });
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
      nombreproducto: [''],
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
    this.ventaModelObj.codigoproducto1 = this.formProductos.value.codigoproducto1;
    this.api.getProducto(this.ventaModelObj.codigoproducto1).subscribe((res)=>{
      this.productoData = res;
      //this.formValueProductos.value.nombreproducto = this.productoData[0].nombreproducto;
      this.formProductos.patchValue({
        nombreProducto1: this.productoData[0].nombreproducto,
      });
    });
  }
  enviarProducto2(){
    this.ventaModelObj.codigoproducto2 = this.formProductos.value.codigoproducto2;
    this.api.getProducto(this.ventaModelObj.codigoproducto2).subscribe((res)=>{
      this.productoData = res;
      this.formProductos.patchValue({
        nombreProducto2: this.productoData[0].nombreproducto,
      });
    });
  }
  enviarProducto3(){
    this.ventaModelObj.codigoproducto3 = this.formProductos.value.codigoproducto3;
    this.api.getProducto(this.ventaModelObj.codigoproducto3).subscribe((res)=>{
      this.productoData = res;
      this.formProductos.patchValue({
        nombreProducto3: this.productoData[0].nombreproducto,
      });
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


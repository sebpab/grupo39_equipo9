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
  costoUnitario1: any = 0;
  costoUnitario2: any = 0;
  costoUnitario3: any = 0;
  
  formProductos:FormGroup = new FormGroup({
      codigoproducto1: new FormControl(''),
      nombreProducto1: new FormControl(''),
      codigoproducto2: new FormControl(''),
      nombreProducto2: new FormControl(''),
      codigoproducto3: new FormControl(''),
      nombreProducto3: new FormControl(''),
      valortotalProducto1: new FormControl(''),
      valortotalProducto2: new FormControl(''),
      valortotalProducto3: new FormControl(''),
      cantidadProducto1: new FormControl(''),
      cantidadProducto2: new FormControl(''),
      cantidadProducto3: new FormControl(''),
  });
  formClientes:FormGroup = new FormGroup({
      cedulaCliente: new FormControl(''),
      nombreCliente: new FormControl(''),
      telefonoCliente: new FormControl(''),
      direccionCliente: new FormControl(''),
      correoCliente: new FormControl(''),
  });
  formVentas:FormGroup = new FormGroup({
      sumaTotalProductos: new FormControl(''),
      ivaVenta: new FormControl(''),
      costoFinal: new FormControl(''),
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
    

  }
  
  enviarCedula(){
    this.ventaModelObj.cedula = this.formClientes.value.cedulaCliente;
    this.api.getCliente(this.ventaModelObj.cedula).subscribe((res)=>{
      this.clienteData = res;
      console.log(res);
      this.formClientes.patchValue({
        nombreCliente: this.clienteData.nombrecompleto,
        telefonoCliente: this.clienteData.telefono,
        direccionCliente: this.clienteData.direccion,
        correoCliente: this.clienteData.correo,
      });
    });
  }  
  
  enviarProducto1(){
    this.ventaModelObj.codigoproducto1 = this.formProductos.value.codigoproducto1;
    this.api.getProducto(this.ventaModelObj.codigoproducto1).subscribe((res)=>{
      this.productoData = res;
      this.costoUnitario1 = this.productoData[0].precioventa;
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
      this.costoUnitario2 = this.productoData[0].precioventa;
      this.formProductos.patchValue({
        nombreProducto2: this.productoData[0].nombreproducto,
      });
    });
  }
  enviarProducto3(){
    this.ventaModelObj.codigoproducto3 = this.formProductos.value.codigoproducto3;
    this.api.getProducto(this.ventaModelObj.codigoproducto3).subscribe((res)=>{
      this.productoData = res;
      this.costoUnitario3 = this.productoData[0].precioventa;
      this.formProductos.patchValue({
        nombreProducto3: this.productoData[0].nombreproducto,
      });
    }); 
  }
  calcularValorProductos(){
    this.ventaModelObj.valorproducto1 = this.formProductos.value.cantidadProducto1;
    this.ventaModelObj.valorproducto2 = this.formProductos.value.cantidadProducto2;
    this.ventaModelObj.valorproducto3 = this.formProductos.value.cantidadProducto3;
    this.formProductos.patchValue({
      valortotalProducto1: parseInt(this.ventaModelObj.valorproducto1) * this.costoUnitario1,
      valortotalProducto2: parseInt(this.ventaModelObj.valorproducto2) * this.costoUnitario2,
      valortotalProducto3: parseInt(this.ventaModelObj.valorproducto3) * this.costoUnitario3,
    });
  }
  calcularValorTotalVenta(){
    this.ventaModelObj.valorTotalProducto1 = this.formProductos.value.valortotalProducto1;
    this.ventaModelObj.valorTotalProducto2 = this.formProductos.value.valortotalProducto2;
    this.ventaModelObj.valorTotalProducto3 = this.formProductos.value.valortotalProducto3;
    let sumaTP = this.ventaModelObj.valorTotalProducto1 + this.ventaModelObj.valorTotalProducto2 + this.ventaModelObj.valorTotalProducto3;
    let iva = (parseInt(sumaTP)*0.19).toFixed(0);
    this.formVentas.patchValue({
      sumaTotalProductos: sumaTP,
      ivaVenta: iva,
      costoFinal: parseInt(sumaTP) + parseInt(iva),
    });
  }
}


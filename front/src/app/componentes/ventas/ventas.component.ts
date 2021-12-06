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
  selectCiudad: string = "";
  valorCiudad: string = "";
  formProductos: FormGroup = new FormGroup({
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
  formClientes: FormGroup = new FormGroup({
    cedulaCliente: new FormControl(''),
    nombreCliente: new FormControl(''),
    telefonoCliente: new FormControl(''),
    direccionCliente: new FormControl(''),
    correoCliente: new FormControl(''),
    consecutivoVenta: new FormControl(''),
    codigoCiudad: new FormControl(''),
    ciudad: new FormControl(''),
  });
  formVentas: FormGroup = new FormGroup({
    sumaTotalProductos: new FormControl(''),
    ivaVenta: new FormControl(''),
    costoFinal: new FormControl(''),
  });
  constructor(private formbuilder: FormBuilder, private api: VentasService) { }

  ngOnInit(): void { }

  enviarCedula() {
    this.ventaModelObj.cedula = this.formClientes.value.cedulaCliente;
    this.api.getCliente(this.ventaModelObj.cedula).subscribe((res) => {
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

  enviarProducto1() {
    this.ventaModelObj.codigoproducto1 = this.formProductos.value.codigoproducto1;
    this.api.getProducto(this.ventaModelObj.codigoproducto1).subscribe((res) => {
      this.productoData = res;
      this.costoUnitario1 = this.productoData[0].precioventa;
      //this.formValueProductos.value.nombreproducto = this.productoData[0].nombreproducto;
      this.formProductos.patchValue({
        nombreProducto1: this.productoData[0].nombreproducto,
      });
    });
  }
  enviarProducto2() {
    this.ventaModelObj.codigoproducto2 = this.formProductos.value.codigoproducto2;
    this.api.getProducto(this.ventaModelObj.codigoproducto2).subscribe((res) => {
      this.productoData = res;
      this.costoUnitario2 = this.productoData[0].precioventa;
      this.formProductos.patchValue({
        nombreProducto2: this.productoData[0].nombreproducto,
      });
    });
  }
  enviarProducto3() {
    this.ventaModelObj.codigoproducto3 = this.formProductos.value.codigoproducto3;
    this.api.getProducto(this.ventaModelObj.codigoproducto3).subscribe((res) => {
      this.productoData = res;
      this.costoUnitario3 = this.productoData[0].precioventa;
      this.formProductos.patchValue({
        nombreProducto3: this.productoData[0].nombreproducto,
      });
    });
  }
  calcularValorProductos() {
    this.ventaModelObj.valorproducto1 = this.formProductos.value.cantidadProducto1;
    this.ventaModelObj.valorproducto2 = this.formProductos.value.cantidadProducto2;
    this.ventaModelObj.valorproducto3 = this.formProductos.value.cantidadProducto3;
    this.formProductos.patchValue({
      valortotalProducto1: parseInt(this.ventaModelObj.valorproducto1) * this.costoUnitario1,
      valortotalProducto2: parseInt(this.ventaModelObj.valorproducto2) * this.costoUnitario2,
      valortotalProducto3: parseInt(this.ventaModelObj.valorproducto3) * this.costoUnitario3,
    });
  }
  calcularValorTotalVenta() {
    this.ventaModelObj.valorTotalProducto1 = this.formProductos.value.valortotalProducto1;
    this.ventaModelObj.valorTotalProducto2 = this.formProductos.value.valortotalProducto2;
    this.ventaModelObj.valorTotalProducto3 = this.formProductos.value.valortotalProducto3;
    let sumaTP = this.ventaModelObj.valorTotalProducto1 + this.ventaModelObj.valorTotalProducto2 + this.ventaModelObj.valorTotalProducto3;
    let iva = (parseInt(sumaTP) * 0.19).toFixed(0);
    this.formVentas.patchValue({
      sumaTotalProductos: sumaTP,
      ivaVenta: iva,
      costoFinal: parseInt(sumaTP) + parseInt(iva),
    });
  }

  postConsolidado(codigociudad:any, ciudad:any, codigoventa:any) {
    console.log(codigociudad + " " + ciudad + " " + codigoventa);
    this.api.postConsolidado(
      {
      "codigociudad": codigociudad,
      "ciudad": ciudad,
      "codigoventa": codigoventa
    }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        alert('Error');
      }
    );
  }

  postVentasDetails() {
    this.ventaModelObj.cedula = this.formClientes.value.cedulaCliente;
    this.ventaModelObj.codigoventa = this.formClientes.value.consecutivoVenta;
    this.ventaModelObj.codigoproducto1 = this.formProductos.value.codigoproducto1;
    this.ventaModelObj.codigoproducto2 = this.formProductos.value.codigoproducto2;
    this.ventaModelObj.codigoproducto3 = this.formProductos.value.codigoproducto3;
    this.ventaModelObj.sumaTotal = this.formVentas.value.sumaTotalProductos;
    this.ventaModelObj.ivaVenta = this.formVentas.value.ivaVenta;
    this.ventaModelObj.costoFinal = this.formVentas.value.costoFinal;
    this.ventaModelObj.valorTotalProducto1 = this.formProductos.value.valortotalProducto1;
    this.ventaModelObj.valorTotalProducto2 = this.formProductos.value.valortotalProducto2;
    this.ventaModelObj.valorTotalProducto3 = this.formProductos.value.valortotalProducto3;
    this.ventaModelObj.cantidadProducto1 = this.formProductos.value.cantidadProducto1;
    this.ventaModelObj.cantidadProducto2 = this.formProductos.value.cantidadProducto2;
    this.ventaModelObj.cantidadProducto3 = this.formProductos.value.cantidadProducto3;
    this.ventaModelObj.codigociudad = this.selectCiudad;

    if (this.ventaModelObj.codigociudad == "1") {
      this.valorCiudad = 'Bogotá';
      this.postConsolidado(this.ventaModelObj.codigociudad, this.valorCiudad, this.ventaModelObj.codigoventa);
    }
    else{
      if (this.ventaModelObj.codigociudad == "2") {
        this.valorCiudad = 'Medellín';
        this.postConsolidado(this.ventaModelObj.codigociudad, this.valorCiudad, this.ventaModelObj.codigoventa);
      }
      else {
        if (this.ventaModelObj.codigociudad == "3") {
          this.valorCiudad = 'Cali';
          this.postConsolidado(this.ventaModelObj.codigociudad, this.valorCiudad, this.ventaModelObj.codigoventa);
        }
      }
    }
    let sumaTP = this.ventaModelObj.valorTotalProducto1 + this.ventaModelObj.valorTotalProducto2 + this.ventaModelObj.valorTotalProducto3;
    let iva = (parseInt(sumaTP) * 0.19).toFixed(0);
    let ivap1 = (parseInt(this.ventaModelObj.valorTotalProducto1) * 0.19).toFixed(0);
    let valorVentaP1 = (parseInt(ivap1) + parseInt(this.ventaModelObj.valorTotalProducto1));
    let ivap2 = (parseInt(this.ventaModelObj.valorTotalProducto2) * 0.19).toFixed(0);
    let valorVentaP2 = (parseInt(ivap2) + parseInt(this.ventaModelObj.valorTotalProducto2));
    let ivap3 = (parseInt(this.ventaModelObj.valorTotalProducto3) * 0.19).toFixed(0);
    let valorVentaP3 = (parseInt(ivap3) + parseInt(this.ventaModelObj.valorTotalProducto3));

    this.api.postVenta(
      {
        "cedulacliente": this.ventaModelObj.cedula,
        "codigoventa": this.ventaModelObj.codigoventa,
        "detalleventa": [
          {
            "cantidadproducto": this.ventaModelObj.cantidadProducto1,
            "codigoproducto": this.ventaModelObj.codigoproducto1,
            "valoriva": ivap1,
            "valortotal": this.ventaModelObj.valorTotalProducto1,
            "valorventa": valorVentaP1
          },
          {
            "cantidadproducto": this.ventaModelObj.cantidadProducto2,
            "codigoproducto": this.ventaModelObj.codigoproducto2,
            "valoriva": ivap2,
            "valortotal": this.ventaModelObj.valorTotalProducto2,
            "valorventa": valorVentaP2
          },
          {
            "cantidadproducto": this.ventaModelObj.cantidadProducto3,
            "codigoproducto": this.ventaModelObj.codigoproducto3,
            "valoriva": ivap3,
            "valortotal": this.ventaModelObj.valorTotalProducto3,
            "valorventa": valorVentaP3
          }
        ],
        "ivaventa": iva,
        "totalventa": sumaTP,
        "valorventa": (parseInt(sumaTP) + parseInt(iva))
      }

    ).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        alert('Error');
      }
    )
  }
}


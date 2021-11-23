import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { clienteModel } from './clientes.model';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  formValue!: FormGroup;
  clienteModelObj: clienteModel = new clienteModel();
  clienteData!: any;
  constructor(private formbuilder: FormBuilder, private api: ClientesService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      cedula: [''],
      nombrecompleto: [''],
      direccion: [''],
      telefono: [''],
      correo: [''],
    });
    this.getAllClientes();
  }

  postClienteDetails() {
    this.clienteModelObj.cedula = this.formValue.value.cedula;
    this.clienteModelObj.nombrecompleto = this.formValue.value.nombrecompleto;
    this.clienteModelObj.direccion = this.formValue.value.direccion;
    this.clienteModelObj.telefono = this.formValue.value.telefono;
    this.clienteModelObj.correo = this.formValue.value.correo;

    this.api.postCliente(this.clienteModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Cliente añadido exitosamente');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllClientes();
      },
      (err) => {
        alert('Error');
      }
    );
  }

  getAllClientes() {
    this.api.getCliente().subscribe((res) => {
      this.clienteData = res;
    });
  }

  deleteCliente(row: any) {
    this.api.deleteCliente(row.cedula).subscribe((res) => {
      alert('Cliente eliminado');
      this.getAllClientes();
    });
  }
  onEdit(row: any) {
    this.clienteModelObj.cedula = row.cedula;
    this.formValue.controls['cedula'].setValue(row.cedula);
    this.formValue.controls['nombrecompleto'].setValue(row.nombrecompleto);
    this.formValue.controls['direccion'].setValue(row.direccion);
    this.formValue.controls['telefono'].setValue(row.telefono);
    this.formValue.controls['correo'].setValue(row.correo);
  }
  updateClienteDetail() {
    this.clienteModelObj.cedula = this.formValue.value.cedula;
    this.clienteModelObj.nombrecompleto = this.formValue.value.nombrecompleto;
    this.clienteModelObj.direccion = this.formValue.value.direccion;
    this.clienteModelObj.telefono = this.formValue.value.telefono;
    this.clienteModelObj.correo = this.formValue.value.correo;
    this.api
      .updateCliente(this.clienteModelObj, this.clienteModelObj.cedula)
      .subscribe((res) => {
        alert('Actualizacion exitosa');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();

        this.getAllClientes();
      });
  }
}

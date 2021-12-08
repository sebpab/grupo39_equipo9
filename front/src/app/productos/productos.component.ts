
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  constructor(private objetohttp: HttpClient, private fileUploadService: FileUploadService) { }

  //variable receptora de documentos
  res: any;
  //variable contenedora de contenidos
  contenido: any;
  //url api get
  urlapiGET: string = "http://ec2-3-94-86-0.compute-1.amazonaws.com:8080/api/productos";

  ngOnInit(): void {

    this.res = this.objetohttp.get(this.urlapiGET);

    this.res.subscribe((datos: any[]) => {
      this.contenido = datos;
      console.log(this.contenido);      
    });

  }

  file!: File;

  resultados: any;

  cargado: boolean = false;
  
  onChange(event: any) {
    this.objetohttp.delete("http://localhost:8080/api/productos").subscribe(data => {
      console.log(data);
    });
    this.file = event.target.files[0];
  }

async onUpload() {
  console.log(this.file);
  this.cargado = true;
  this.resultados = await this.fileUploadService.upload(this.file);
  console.log(this.resultados);
}

refrescar(){
  window.location.reload();
}


}
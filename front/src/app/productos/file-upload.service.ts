import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosComponent } from './productos.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

 // API url
 baseApiUrl = "http://localhost:8080/api/productos";

 //inicializando objeto http
 constructor(private http: HttpClient) { }

 //variable auxiliar que almacena resultados de cada envio
 resultados = Array();

 //variable que notifica procesamiento del archivo

 procesado: boolean = false;

 // Retorna un objeto observable


 upload(file: any): Promise<any[]> {
   return new Promise<any[]>((resolve, reject) => {
     //leyendo el contenido

     if(file!=""){      
      console.log("ya tengo el archivo");
      console.log(file);
     }

     var reader = new FileReader();
     reader.readAsText(file);

     console.log(reader);

     

     reader.onloadend = (e) => {

       let lines = reader.result as string;

       console.log(lines);

       let separados = lines.split("\n");

       console.log(separados);

       for (let lineaactual of separados) {

        if (lineaactual===""){

          continue;
        }
        
         lineaactual.replace(";", ",");

         console.log(lineaactual);
         
         let columnas = lineaactual.split(";", 6);

 

         console.log(columnas);

           this.http.post(
           this.baseApiUrl,

           
           {
              codigoproducto: columnas[0],
              ivacompra: columnas[1],
              nitproveedor: columnas[2],
              nombreproducto: columnas[3],
              preciocompra: columnas[4],
              precioventa: columnas[5]

           },
           { observe: 'response' }).subscribe(
             (response: any) => {
               let resaux = [];
               resaux[0] = response.status;
               this.resultados.push(resaux);
             }
           );
           this.procesado=true;
           console.log("registro procesado: "+this.procesado);

           
       }
       console.log(this.resultados);
       resolve(this.resultados);
     };
     reader.readAsText(file);

     
   });

}




}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiendasgenericas';


 

  entrada1:String = "";
  entrada2:String = "";
  mensaje:String = "";



  validacion(){

   

    if ((this.entrada1 === 'admininicial')&&(this.entrada2 === 'admin123456'))  {
      this.mensaje = "Acceso Autorizado.  Bienvenid@!";
      
    } else {
      this.mensaje = "Usuario o contraseña errados.  Intente de nuevo.";      
    }

  
  }
 

  


 
  
}

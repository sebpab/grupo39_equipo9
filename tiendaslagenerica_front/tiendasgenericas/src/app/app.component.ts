import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiendasgenericas';

  user_correcto:string="admininicial";
  pass_correcto:string="admin123456";

  user:string="";
  pass:string="";

  correcto:string="";

  comparar(){

    if(this.user===this.user_correcto){
      this.correcto="autorizado";
      if(this.pass===this.pass_correcto){
        this.correcto="autorizado";
      }else{
        this.correcto="noautorizado";
      }
    }else{
      this.correcto="noautorizado";
    }

  }
 


 
  
}

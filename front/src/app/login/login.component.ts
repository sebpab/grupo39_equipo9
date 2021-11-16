import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


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
        this.router.navigate(['/productos'])

      }else{
        this.correcto="noautorizado";
      }
    }else{
      this.correcto="noautorizado";
    }

  

}

}

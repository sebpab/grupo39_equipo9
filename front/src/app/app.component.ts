import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartShop';
  state: number = 0;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      //console.log(this.router.url)
      //console.log(val)
      if (this.router.url != "/login") {
        this.state = 1;
      } else {
        this.state = 0;
      }
    });
  }
}

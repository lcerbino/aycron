import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aycrom user manager';

  constructor(private router: Router) {
  }
  logout() {
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('password', '');
    this.router.navigate(["/login"]);
  }


}




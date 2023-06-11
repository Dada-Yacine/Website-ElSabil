import { Component } from '@angular/core';
import { S2Service } from 'src/app/ms1/services/s2.service';
@Component({
  selector: 'app-atop-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class ATopNavComponent {
  constructor(private s2Service: S2Service) { }

  logout() {
    // Call the logout method of your S2Service to remove the token from localStorage
    this.s2Service.removeToken();
  }
}

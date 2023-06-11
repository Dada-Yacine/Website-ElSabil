import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ms1/models/user.model';
import { S2Service } from 'src/app/ms1/services/s2.service';
import { UserService } from 'src/app/ms1/services/user.service';

@Component({
  selector: 'app-ttop-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TTopNavComponent implements OnInit {
  user!: User;
  userId!: number;
  profilePictureUrl: string = "";
 
  constructor(private login:UserService,private s2:S2Service) {
  
   
   }
   idU=Number(this.s2.getUserId());
  
  ngOnInit(): void {
    this.login.getUsers(this.idU).subscribe(

    (data) => {
      this.user = data as User;


    });
      console.log('User:', this.user);
      this.userId = Number(this.s2.getUserId());; // Set the user ID here
      this.login.getProfilePicture(this.userId).subscribe(blob => {
        this.profilePictureUrl = URL.createObjectURL(blob);
      }, error => {
        console.error('Error loading profile picture:', error);
      });
      


    
}

}

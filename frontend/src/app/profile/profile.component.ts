import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../ms1/services/user.service';
import { Addresse, User } from '../ms1/models/user.model';
import { NgbModal, NgbModule, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { S2Service } from '../ms1/services/s2.service';

const myString = 'hello';
const myObservable = of(myString);

myObservable.subscribe(value => console.log(value));



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit {
  idU!:number;
  user!: User;
  dialog: any;
  //userId: any;
  user1: any = {};
  timestamp!: number;

  editingPhone = false;
  newPhone: string = '';
  userId!: number;

  editingAddress = false;
  profilePicture!: string;



  newAddress: any = {
    rue: '',
    ville: '',
    wilaya: '',
  };
  closeResult!: string;
  profilePictureUrl: string = ""; // The URL of the profile picture to display
  selectedFile!: File ;



  constructor(private http: HttpClient,private modalService: NgbModal,private userService: UserService,private router:Router ,private login:UserService,  private route: ActivatedRoute,private authservice:S2Service){
   

  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.idU= Number(this.authservice.getUserId());

    this.login.getUsers(this.idU).subscribe(

      (data) => {
        this.user = data as User;


      });
        console.log('User:', this.user);
        this.userId = Number(this.authservice.getUserId());; // Set the user ID here
        this.userService.getProfilePicture(this.userId).subscribe(blob => {
          this.profilePictureUrl = URL.createObjectURL(blob);
        }, error => {
          console.error('Error loading profile picture:', error);
        });


  }

  showPasswordForm = false;


showChangePasswordForm() {
  this.showPasswordForm = true;
}

  modifiermotpasse(){
    this.router.navigate(["/changermotpasse"]);
  }
  editPhone() {
    this.editingPhone = true;
    this.newPhone = this.user.numeroTelephone;
  }
  cancelPhone() {
    this.editingPhone = false;
  }
savePhone() {
  this.userService.updateUserPhone(this.userId, this.newPhone).subscribe(() => {
    this.user.numeroTelephone = this.newPhone;
    this.editingPhone = false;
  });
}


editAddress() {
  this.editingAddress = true;
  this.newAddress.wilaya = this.user.adresse.wilaya;
  this.newAddress.ville = this.user.adresse.ville;
  this.newAddress.rue = this.user.adresse.rue;
}

saveAddress() {
  this.userService.updateUserAddress(this.userId, this.newAddress).subscribe(() => {
    this.user.adresse = this.newAddress;
    this.editingAddress = false;
  });
}


onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0] as File;
}


/*onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}*/


cancelAddress() {
  this.editingAddress = false;
}
/*onFileSelected(event: any) {
  this.userService.selectedFile = event.target.files[0];
}*/
onUpload(): void {
  const selectedFile = this.selectedFile;
 /* if (!selectedFile) {
    console.error('No file selected.');
    return;
  }*/

  // Replace with the actual user ID
  this.userService.uploadProfilePicture(this.userId, selectedFile).subscribe(
    (reason)=>{console.log(reason)}
  );
}



}













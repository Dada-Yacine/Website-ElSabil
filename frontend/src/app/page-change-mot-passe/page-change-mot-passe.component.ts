import { Component, Inject,  EventEmitter, Output, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../ms1/services/user.service';
import { User } from '../ms1/models/user.model';





@Component({
  selector: 'app-page-change-mot-passe',
  templateUrl: './page-change-mot-passe.component.html',
  styleUrls: ['./page-change-mot-passe.component.css']
})
export class PageChangeMotPasseComponent implements OnInit {
  passwordForm!: FormGroup;
  passwordMismatch = false;
  userId: number=1;
  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  profilePictureUrl: string = "";
  idU:number=1;
  user!: User;
  dialog: any;
  //userId: any;




  newAddress: any = {
    rue: '',
    ville: '',
    wilaya: '',
  };
  closeResult!: string;
 f!:FormGroup;



 // The URL of the profile picture to display




  constructor(
    private userService: UserService,private login:UserService,private fb: FormBuilder
  ) {
    this.f = this.fb.group({
      newPassword: [''],
      confirmPassword: ['']
    });
   }


    ngOnInit(): void {

      this.login.getUsers(this.idU).subscribe(

        (data) => {
          this.user = data as User;


        });
          console.log('User:', this.user);
          this.userId = 1; // Set the user ID here
          this.userService.getProfilePicture(this.userId).subscribe(blob => {
            this.profilePictureUrl = URL.createObjectURL(blob);
          }, error => {
            console.error('Error loading profile picture:', error);
          });
          this.passwordForm = this.fb.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
          }, { validator: this.passwordMatchValidator });

  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  isConfirmPasswordTouched(): boolean {
    const confirmPassword = this.passwordForm.get('confirmPassword');
    return confirmPassword ? confirmPassword.touched : false;
  }


  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
    }

    this.userService.updatePassword(this.userId,this.oldPassword, this.newPassword)
      .subscribe(
        () => console.log('Password changed successfully'),

        error =>  console.error('Error changing password', error)
      );
      this.passwordForm.reset();
  }




  }



  /*updatePasswordForm: FormGroup;
  userId: number | undefined;
  oldPassword: string | undefined ;
  newPassword: string | undefined ; // Define the newPassword property here
  confirmPassword: string | undefined;
  user!: User;



  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.checkPasswords });
  }
  ngOnInit(): void {
    this.userId=this.userService.getCurrentUserId();
  }
  checkPasswords(group: FormGroup) {
    const password = group.controls['newPassword'].value;
    const confirmPassword = group.controls['confirmNewPassword'].value;

    return password === confirmPassword ? null : { notSame: true };
  }
  onSubmit() {
    if (this.updatePasswordForm.invalid) {
      return;
    }
    const userId = this.userService.getCurrentUserId();

    const oldPassword = this.updatePasswordForm.controls['oldPassword'].value;
    const newPassword = this.updatePasswordForm.controls['newPassword'].value;
    this.userService.updatePassword(oldPassword, newPassword).subscribe(
      () => {
        alert('Password updated successfully');
        this.updatePasswordForm.reset();
      },
      (error) => {
        alert('Error updating password: ' + error.message);
      }
    );
  }
  private confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['confirmPassword']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }*/




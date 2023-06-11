import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { S2Service } from '../ms1/services/s2.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit{
  resetPasswordForm!: FormGroup;
  token!: string;
  error!: string;
  success!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private S2service: S2Service
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.router.navigate(['/login']);
      }
    });
  }

  resetPassword(): void {
    const newPassword = this.resetPasswordForm.controls['password'].value;
    const confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value;

    if (newPassword !== confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.S2service.resetPassword(this.token, newPassword).subscribe(
      data => {
        this.success = data.message;
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }

}

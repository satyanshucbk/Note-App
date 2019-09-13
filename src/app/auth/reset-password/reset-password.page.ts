import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../_helper/must-match.validator';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetPassForm: FormGroup;
  submitted = false;
  resetPassData: any;

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  constructor(public router: Router,
              private authService: AuthService,
              public formBuilder: FormBuilder,
              private location: Location,
              public alertController: AlertController) { }

          public back(): void {
            this.location.back();
          }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['', Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.resetPassForm.controls; }

  async updatePassword() {
    this.submitted = true;
    this.resetPassData = {
  
    'password': this.resetPassForm.value.password,
    'confirmPassword': this.resetPassForm.value.confirmPassword
   }
   // stop here if form is invalid
   if (this.resetPassForm.invalid) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Please enter correct details.',
      buttons: ['OK']
    });

    await alert.present();
  }
  else{

    localStorage.setItem("resetPassData", JSON.stringify(this.resetPassData) );
    console.log(JSON.parse(localStorage.getItem("resetPassData")));
    this.router.navigate(['login']);
    }
  }

  public onPasswordToggle(type:string): void {
    if(type=='confirmPassword'){
     this.showConfirmPassword = !this.showConfirmPassword;
    }else{
    this.showPassword = !this.showPassword;
    }
  }

}

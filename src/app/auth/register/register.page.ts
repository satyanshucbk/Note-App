import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../_helper/must-match.validator';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  userData: any;

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  
  constructor(public router: Router, public formBuilder: FormBuilder,public alertController: AlertController,
              public toastController: ToastController) 
  { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(12), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
  

  async signUp() {
    this.submitted = true;
    this.userData = {
    'userName': this.registerForm.value.userName,
    'email': this.registerForm.value.email,
    'password': this.registerForm.value.password,
    'confirmPassword': this.registerForm.value.confirmPassword
   }

  // stop here if form is invalid
    if (this.registerForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Please enter your correct details.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    else{

      localStorage.setItem("userData", JSON.stringify(this.userData) );
      console.log(JSON.parse(localStorage.getItem("userData")));
      const toast = await this.toastController.create({
        message: 'Your account has created successfully.',
        color:'dark',
        duration: 1000
      });
      toast.present();
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

  goToLogin() {
    this.router.navigate(['login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotForm: FormGroup;
  emailData: any;
  
  error_message = {
    'email': [
      {type: 'required', message: '*email is required'},
      { type: 'pattern', message: '*please enter a valid email address.'}
    ],
  }
  
  constructor(public formBuilder: FormBuilder, 
              public router: Router,
              private authService: AuthService,
              private location: Location,
              public alertController: AlertController,
              public toastController: ToastController) { 
    
    this.forgotForm = this.formBuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  public back(): void {
    this.location.back();
  }

  ngOnInit() {
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  async sendCode() {
    this.emailData =  {
      'email': this.forgotForm.value.email,
    }
    

    if (this.forgotForm.invalid){
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Please fill the correct details.',
        buttons: ['OK']
      });
  
      await alert.present();
     
    }else{
      localStorage.setItem("emailVerification", JSON.stringify(this.emailData));
      console.log(JSON.parse(localStorage.getItem("emailVerification")));
      const toast = await this.toastController.create({
        message: 'OTP has successfully delivered on your email id.',
        color:'dark',
        duration: 1000
      });
      toast.present();
      this.router.navigate(['email-verification']);
    }
  }

}

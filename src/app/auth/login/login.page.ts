import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginData: any;
  public showPassword: boolean = false;

  error_message = {
    'email': [
      {type: 'required', message: '*email is required'},
      // {type: 'minlength', message: '*email must be longer or equal than 6 characters.'},
      // {type: 'maxlength', message: '*email must be lower or equal to 25 characters.'},
      { type: 'pattern', message: '*please enter a valid email address.'}
    ],
    'password': [
      {type: 'required', message: '*password is required'},
      // {type: 'minlength', message: '*password must be longer or equal than 6 characters.'},
      // {type: 'maxlength', message: '*password must be lower or equal to 12 characters.'},
     { type: 'pattern', message: '*password must contain numbers,uppercase and lowercase characters & do not use whitespace.'}
    ]
  }

  constructor(public router: Router, 
              public formBuilder: FormBuilder,
              public alertController: AlertController
              ) {
                this.loginForm = this.formBuilder.group({
                  email: new FormControl('',Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])),
                  password: new FormControl('',Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(12),
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
                  ]))
                })
               }

  ngOnInit() {
  }

  async login() {

    this.loginData = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }

    if (this.loginForm.invalid){
      
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Please enter your correct details.',
        buttons: ['OK']
      });
  
      await alert.present();
    }else{
      
      localStorage.setItem("loginData", JSON.stringify(this.loginData));
      console.log(JSON.parse(localStorage.getItem("loginData")));
      this.router.navigate(['note-list']);
    }
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  register() {
    this.router.navigate(['register']);
  }



}

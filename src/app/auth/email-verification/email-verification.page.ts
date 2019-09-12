import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {

  constructor(public router: Router,
              private authService: AuthService,
              private location: Location) { }

      public back(): void {
        this.location.back();
      }

      moveFocus(nextElement) {
        nextElement.focus();
      }

      
  ngOnInit() {
  }

  verifyCode() {
    this.router.navigate(['reset-password']);
  }

}

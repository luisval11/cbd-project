import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User('', '', '', '', '', null);
  loginError = null;

  constructor(private snackBar: MatSnackBar, private loginService: LoginService,
              public router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    if (this.cookieService.get('auth_token') !== '') {
      this.loginService.getPrincipal()
        .then (user => {
            this.user = Object.assign(user);
            this.router.navigate(['/user/library']);
        });
    }
  }

  log_in(): void {
    this.loginError = null;
    console.log(this.user);
    this.loginService.storeToken(this.user)
      .then(res => {
          this.router.navigate(['/user/library']);
      }).catch(error => {
        if (error.status === 401) {
          this.loginError = error.status;
        }
      });
  }


}

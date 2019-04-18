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

  // @ts-ignore
  user: User = new User();
  loginError = null;
  logged: boolean;

  constructor(private snackBar: MatSnackBar, private loginService: LoginService,
              public router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    if (this.cookieService.get('auth_token') !== '') {
      this.logged = true;
      this.loginService.getPrincipal()
        .then (user => {
            this.router.navigate(['/']);
            this.user = Object.assign(user);
        });
    } else {
      this.logged = false;
    }
  }

  log_in(): void {
    this.loginError = null;
    this.loginService.storeToken(this.user)
      .then(res => {
        this.loginService.eventEmitter.subscribe(principal => {
          this.logged = true;
          this.snackBar.open('Log in succesfully', 'Close', {
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.router.navigate(['/']);
        });
      }).catch(error => {
        if (error.status === 401) {
          this.loginError = error.status;
        }
      });
  }


}

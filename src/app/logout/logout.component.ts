import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  log_out() {
    this.loginService.logout()
      .then(res => {
        this.snackBar.open('Log out succesfully', 'Close', {
          duration: 10000,
        });
        this.router.navigate(['/login']);
      });
  }

}

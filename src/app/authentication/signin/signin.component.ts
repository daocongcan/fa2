import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../../api/models/user';
import swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  user: User = new User();

  encrypted = "";
  decrypted ="";
  key="dfmsecret";
  
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.hide();
    
  }

  onLogin(): void {

    // Encrypted password 
    this.encrypted = CryptoJS.AES.encrypt(this.user.password, this.key).toString();

    this.auth.login(this.user.name_user, this.encrypted)
      .subscribe(
        data => {
          // console.clear();
          // console.log('User is logged in');
          this.router.navigate(['/gw']);
        },
        error => {
          console.log('Login failed');
          swal('Oops...', 'Username or password is wrong', 'error');
        }
      );
    // localStorage.setItem('token', 'abc');
    this.router.navigate(['/gw']);
  }
}

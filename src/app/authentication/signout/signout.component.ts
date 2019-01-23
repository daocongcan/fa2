import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.router.navigate(['/']);
    
    

  }

}

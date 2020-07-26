import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loginStatus$:Observable<boolean>;
  UserName$:Observable<string>;
  username:String= JSON.stringify(this.UserName$);
  constructor(private service:UserService,private router:Router) { }

  ngOnInit() {
    this.loginStatus$ = this.service.isLoggedIn;
    this.UserName$ = this.service.currentName;

  }
  onLogout(){
    //remove the token from local storage
    localStorage.removeItem('message');

    this.service.logout();
    this.router.navigateByUrl('');//redirect to the home page when logged out
  }

}

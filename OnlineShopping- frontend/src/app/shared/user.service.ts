import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

loginStatus = new BehaviorSubject<boolean>(false);
private UserName = new BehaviorSubject<string>(localStorage.getItem('fullname'.toString()));


  constructor(private fb:FormBuilder,private http:HttpClient) { }
readonly BaseURI = 'http://localhost:50153/api';

  formModel = this.fb.group({

    FullName:['',Validators.required],
    Email:['',Validators.email],
    Address_Line1:['',Validators.required],
    Address_Line2:['',Validators.required],
    State:['',Validators.required],
    PostalCode:['',Validators.required],

    Passwords:this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['',Validators.required]
    },{validator:this.comparePasswords})
  });
  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
  }
}
register(){
  var body = {

    FullName:this.formModel.value.FullName,
    Email:this.formModel.value.Email,
    Address_Line1:this.formModel.value.Address_Line1,
    Address_Line2:this.formModel.value.Address_Line2,
    State:this.formModel.value.State,
    PostalCode:this.formModel.value.PostalCode,
    Password:this.formModel.value.Passwords.Password,

  };

  return this.http.post(this.BaseURI+'/user/Register',body);
}
login(formData){

  return this.http.post(this.BaseURI+'/user/Login',formData);
}
logout(){
//use to remove logout button from nav-bar
  this.loginStatus.next(false);
  console.log('Logged out successfully');
}
get isLoggedIn(){
  return this.loginStatus.asObservable();
}
get currentName(){
  return this.UserName.asObservable();
}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formModel={
  Email:'',
  Password:''
}
  constructor(private service:UserService,private router: Router,private toastr:ToastrService) { }
  userDetails;
  ngOnInit() {
    //avoid to go to the user/login page when user has already login
    if(localStorage.getItem('message') !=null)
      this.router.navigateByUrl('/checkout');
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(

    (res:any)=>{
      if(res.status==1){
        localStorage.setItem('message',res.message);
        this.router.navigateByUrl('/checkout');
        this.toastr.success('Login successful !');
        this.service.loginStatus.next(true);
        }
      else {
        this.toastr.error('Login failed');
        this.router.navigateByUrl('/user/login');
      }
    },
    err=>{
      console.log(err);
    }

    );

  }

}

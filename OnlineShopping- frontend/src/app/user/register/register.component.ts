import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { error } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{

if(res.status==1){
this.service.formModel.reset();
this.toastr.success('New user added !','Registration successful');
this.router.navigateByUrl('user/login');
this.service.loginStatus.next(true);
}
else {
  this.toastr.error("user already exists!",'Registration failed');
}
      },
      err=>{
        console.log(err);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
user:any;
  constructor(private service:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    let user=localStorage.getItem('data');
    console.log(user);
  }

}

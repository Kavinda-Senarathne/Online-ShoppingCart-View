import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  data:any;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params)=>{
      console.log(params);
      this.data = JSON.parse(params.data);
    });

  }
  onBack(){
    this.router.navigate(['/']);
  }

}

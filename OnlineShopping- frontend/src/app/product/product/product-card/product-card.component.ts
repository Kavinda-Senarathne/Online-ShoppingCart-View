import { Component, OnInit,Input } from '@angular/core';
import { IProduct } from 'src/app/product/product/IProduct';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() property : IProduct
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }
  fetchData(){
    let data:any = this.property;
  this.router.navigate(['productdetails'],{
    queryParams:{data:JSON.stringify(data)}
  });
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import {IProduct} from 'src/app/product/product/IProduct';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

properties: [];

constructor(private service:ProductService,private http:HttpClient) { }

  ngOnInit() {

    return this.service.getAllProducts().toPromise().then(
    data => {
      console.log(data);
      this.properties = data['data'];
    });

}
}

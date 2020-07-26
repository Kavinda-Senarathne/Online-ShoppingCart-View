import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs';
import { IProduct } from 'src/app/product/product/IProduct';
import {map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  readonly BaseURI = 'http://localhost:50153/api';
  getAllProducts()
  {
    return this.http.get(this.BaseURI+'/product/GetProducts');
  }
  
}

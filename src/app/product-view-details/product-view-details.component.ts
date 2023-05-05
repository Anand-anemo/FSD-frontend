import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectProductIndex=0;

  product: Product;

  constructor(private activatedRoute: ActivatedRoute , private router:Router){

  }
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index){
    this.selectProductIndex = index;
  }

   buyProduct(productId){
    this.router.navigate(['/buyProduct' , {isSingleProductCheckout: true, id: productId}]);

   }
  
  



}

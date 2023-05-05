import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductButton = false;

  showTable = false;

  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['ProductId', 'Product Name', 'Description', 'Discount Price', 'Actual Price', 'Delete'];
  constructor(private productService: ProductService) {

  }
  ngOnInit(): void {
    this.getAllProducts();

  }
  public getAllProducts() {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber).subscribe(
      (resp: Product[]) => {
        console.log(resp);

        resp.forEach(product => this.productDetails.push(product));
        this.showTable = true;

        if (resp.length == 12) {
          this.showLoadMoreProductButton = true;
        } else {
          this.showLoadMoreProductButton = false;
        }



      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }

  deleteProduct(productId) {

    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    );


  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

}

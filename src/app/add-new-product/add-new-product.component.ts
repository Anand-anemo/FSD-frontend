import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product:Product={
    productId:null,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }
constructor(private productService: ProductService , private sanitizer: DomSanitizer){}
  
  ngOnInit(): void {
    
  }
  addProduct(productForm: NgForm){

    const productFormData = this.prepareFormData(this.product);


    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
      productForm.reset();
      this.product.productImages = [];
      },
      (error : HttpErrorResponse)=> {
        console.log(error);
      }
    );
    

  }
  prepareFormData(product: Product): FormData{
    const formData = new FormData();
    formData.append('product' , new Blob([JSON.stringify(product)], {type: 'application/json'}));
   
    for(var i=0; i< this.product.productImages.length;i++){
      formData.append('imageFile', product.productImages[i].file,
      product.productImages[i].file.name
      );
    }

    return formData;

  }
  onFileSelected(event){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle:FileHandle={

        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )


      }
      this.product.productImages.push(fileHandle);
    }

  }

  public removeImages(i:number){
    this.product.productImages.splice(i,1);
  }

}

import { Injectable } from '@angular/core';
import { Product } from './model/product.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from './services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve <Product[]> {

  constructor(private productServcice: ProductService,
    private imageProcessingService: ImageProcessingService) { }

      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {

        
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productServcice.getProductDetails(isSingleProductCheckout, id)
    .pipe(
      map(
        (x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))
      )
    );

      }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit
{
    product?: Product;
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService)
    {
    }
    ngOnInit(): void
    {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getById(id).subscribe((res) =>
        {this.product = res;});
    }
}
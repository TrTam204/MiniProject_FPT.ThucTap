import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit
{
    products: Product[] = [];
    constructor(private productService: ProductService){}
    ngOnInit(): void
    {this.loadData();}
    loadData()
    {
        this.productService.getAll().subscribe((res) =>
        {
            console.log('Products API response:', res);
            this.products = Array.isArray(res) ? res : [];
        });
    }
} 
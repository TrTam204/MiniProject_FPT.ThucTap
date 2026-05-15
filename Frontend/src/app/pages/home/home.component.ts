import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ChipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit
{
    filteredProducts: Product[] = [];
    categories: Category[] = [];
    products: Product[] = [];
    constructor(
        private productService: ProductService,
        private router: Router,
        private categoryService: CategoryService)
        {
        }
    ngOnInit(): void
    {this.loadData();}
    loadData()
    {
        this.categoryService.getAll().subscribe((res) =>
        {
            console.log('Categories API response:', res);
            this.categories = Array.isArray(res) ? res : [];
        });

        this.productService.getAll().subscribe((res) =>
        {
            console.log('Products API response:', res);
            this.products = Array.isArray(res) ? res : [];
        this.filteredProducts = this.products;
        });
    }

    selectCategory(categoryId: number): void
    {
        this.filteredProducts = this.products.filter(
            product => product.categoryId === categoryId
        );
        window.scrollTo({
            top: 350,
            behavior: 'smooth'
        });
    }
    goToDetail(id: number): void
    {this.router.navigate(['/product-detail', id]);}
}   
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private service: ProductService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.service.getAll().subscribe((res) => {
      console.log('Products API response:', res);
      this.products = Array.isArray(res) ? res : [];
    }); 
}
  delete(id: number): void
{
    if (confirm('Are you sure you want to delete this product?'))
    { this.service.delete(id).subscribe(() =>
        { this.loadData();});
    }
}
}

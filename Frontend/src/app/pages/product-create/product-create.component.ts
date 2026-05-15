import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})

export class ProductCreateComponent
{ form!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: ProductService
    )
    {this.form = this.fb.group({
          name: ['', Validators.required],
          description: [''],
          sellprice: [0, [Validators.required, Validators.min(0)]],
          importprice: [0, [Validators.required, Validators.min(0)]],
          quantity: [0, [Validators.required, Validators.min(0)]],
          categoryId: [null, Validators.required],
          ImageUrl: ['']
        });
    }
    onFileSelected(event: Event): void
    {const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0)
    {return;}
    const file = input.files[0];
    this.form.patchValue({
    ImageUrl: '/assets/' + file.name
    });
    }
    cancel(): void
    {this.router.navigate(['/product']);}
    submit(): void
    {const payload: Product =
        {
            id: 0,
            name: this.form.value.name ?? '',
            sellPrice: Number(this.form.value.sellprice ?? 0),
            importPrice: Number(this.form.value.importprice ?? 0),
            quantity: Number(this.form.value.quantity ?? 0),
            imageUrl: this.form.value.ImageUrl ?? '',
            description: this.form.value.description ?? '',
            categoryId: Number(this.form.value.categoryId ?? 0)
        };
        this.service.create(payload).subscribe(() =>
        {this.router.navigate(['/product']);});
    }
}
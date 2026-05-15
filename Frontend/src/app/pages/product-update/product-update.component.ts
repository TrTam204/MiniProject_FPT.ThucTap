import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})

export class ProductUpdateComponent implements OnInit
{form!: FormGroup;
    id!: number;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductService
    )
    { this.form = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            sellprice: [0, [Validators.required, Validators.min(0)]],
            importprice: [0, [Validators.required, Validators.min(0)]],
            quantity: [0, [Validators.required, Validators.min(0)]],
            categoryId: [null, Validators.required],
            ImageUrl: ['']
        });
    }
    ngOnInit(): void
    { this.id =
      Number(this.route.snapshot.paramMap.get('id'));
      this.service.getById(this.id)
      .subscribe((product: Product) =>
      { this.form.patchValue({
            name: product.name,
            description: product.description,
            sellprice: product.sellPrice,
            importprice: product.importPrice,
            quantity: product.quantity,
            categoryId: product.categoryId,
            ImageUrl: product.imageUrl
            });
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
      id: this.id,
      name: this.form.value.name ?? '',
      sellPrice: Number(this.form.value.sellprice ?? 0),
      importPrice: Number(this.form.value.importprice ?? 0),
      quantity: Number(this.form.value.quantity ?? 0),
      imageUrl: this.form.value.ImageUrl ?? '',
      description: this.form.value.description ?? '',
      categoryId: Number(this.form.value.categoryId ?? 0)
        };
        this.service.update(this.id, payload)
        .subscribe(() =>
        {this.router.navigate(['/products']);});
    }
}
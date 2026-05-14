import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
export const routes: Routes = [
{path: '', component : HomeComponent},
{path: 'product', component: ProductsComponent,
    children:[
    {path:'', component: ProductsComponent},
    {path: 'add', component: ProductFormComponent},
    {path: 'edit/:id', component: ProductFormComponent}
]
},
{path:'product-detail/:id', component: ProductDetailComponent},
{path:'cart', component: CartComponent},
{path:'product-form', component: ProductFormComponent},
{path:'product-form/:id', component: ProductFormComponent},
{path:'user-info', component: UserInfoComponent,
    children:[
        {path: '', component: UserInfoComponent},
        {path: 'edit', component: UserInfoComponent},
        {path: 'edit/:id', component: UserInfoComponent},
        {path: 'add', component: UserInfoComponent}
    ]},
{path: '**', redirectTo: 'Not Found'}

];

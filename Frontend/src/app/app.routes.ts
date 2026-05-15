import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
export const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch: 'full'},
{path: 'home', component : HomeComponent},
{path: 'product', component: ProductsComponent},
{path: 'product/add', component: ProductCreateComponent},
{path: 'product/edit/:id', component: ProductUpdateComponent},
{path:'product-detail/:id', component: ProductDetailComponent},
{path:'cart', component: CartComponent},
{path:'product-create', component: ProductCreateComponent},
{path:'product-update/:id', component: ProductUpdateComponent},
{path:'user-info', component: UserInfoComponent,
    children:[
        {path: '', component: UserInfoComponent},
        {path: 'edit', component: UserInfoComponent},
        {path: 'edit/:id', component: UserInfoComponent},
        {path: 'add', component: UserInfoComponent}
    ]},
{path: '**', redirectTo: 'home'}

];

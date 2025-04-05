import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { CreateStockReactiveComponent } from './stock/create-stock-reactive/create-stock-reactive.component';

const routes: Routes = [
  { path: 'user/login', component: LoginComponent }, // Sửa route
  { path: 'user/register', component: RegisterComponent },
  {
    path: 'stocks',
    children: [
      { path: 'list', component: StockListComponent }, // Thêm route mới
      { path: 'create', component: CreateStockReactiveComponent },
      { path: ':id', component: StockDetailsComponent }
    ]
  },
  { path: '', redirectTo: '/user/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
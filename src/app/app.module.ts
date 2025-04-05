import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routes.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { CreateStockReactiveComponent } from './stock/create-stock-reactive/create-stock-reactive.component';

@NgModule({
    declarations: [

    ],
    imports: [
        AppComponent,
        BrowserModule,
        AppRoutingModule,
        LoginComponent,
        RegisterComponent,
        StockListComponent,
        StockDetailsComponent,
        CreateStockReactiveComponent,
    ],
    providers: [],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,  // Import HttpClientModule here
        AppComponent
    ],
    providers: [],
    // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule { }

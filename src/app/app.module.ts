import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { CustomersComponent } from './customers/customers.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateOrderComponent,
    SalesSummaryComponent,
    CustomersComponent,
    RepositoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

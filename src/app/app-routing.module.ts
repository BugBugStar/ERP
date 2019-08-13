import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { RepositoryComponent } from './repository/repository.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'repository', component: RepositoryComponent },
  { path: 'sales-summary', component: SalesSummaryComponent },
  { path: 'order_detail', component: OrderDetailComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

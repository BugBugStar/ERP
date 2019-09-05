import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { CustomersComponent } from './customers/customers.component';
import { RepositoryComponent } from './repository/repository.component';
import { InputTableComponent } from './input-table/input-table.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
import { SalersComponent } from './salers/salers.component';
import { CompanysComponent } from './companys/companys.component';
import { CompanyBaseInfoComponent } from './company-base-info/company-base-info.component';

/* 配置 angular i18n */
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CreateOrderComponent,
        SalesSummaryComponent,
        CustomersComponent,
        RepositoryComponent,
        InputTableComponent,
        OrderDetailComponent,
        RepositoryDetailComponent,
        SalersComponent,
        CompanysComponent,
        CompanyBaseInfoComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        /* 导入 ng-zorro-antd 模块 */
        NgZorroAntdModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

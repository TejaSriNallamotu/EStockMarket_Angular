import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule } from './companies-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddStockComponent } from './addStock.component';
import { AddCompanyComponent } from './addCompany.component';
import { StockFilterPipe } from '../_helpers/StockFilterPipe';
import { CompanyFilterPipe } from '../_helpers/CompanyFilterPipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CompaniesRoutingModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
         ListComponent,
         CompanyFilterPipe,
         StockFilterPipe,
         AddStockComponent,
         AddCompanyComponent
    ]
})
export class UsersModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './addCompany.component';
import { AddStockComponent } from './addStock.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';

// import { LayoutComponent } from './layout.component';
// import { ListComponent } from './list.component';
// import { AddEditComponent } from './add-edit.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            // { path: 'add', component: AddEditComponent },
            { path: 'addStock/:id', component: AddStockComponent },
            { path: 'addCompany', component: AddCompanyComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule { }
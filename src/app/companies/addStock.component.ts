import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services';
import { MarketService } from '../_services/market.service';


@Component({ templateUrl: 'addStock.component.html' })
export class AddStockComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    price:number;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private marketService: MarketService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.form = this.formBuilder.group({
            price: ['', Validators.required],
            id:"",
            companyCode:this.id,
            CreatedOn:new Date()
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSave() {

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

            this.createStock();
            this.loading=true;  
    }

    private createStock() {
        setTimeout(() =>
        {
        this.marketService.createStock(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Stock added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['.', { relativeTo: this.route }]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        )
        },1000);
    }

}
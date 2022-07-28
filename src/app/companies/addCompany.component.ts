import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { MarketService } from '../_services/market.service';


@Component({ templateUrl: 'addCompany.component.html' })
export class AddCompanyComponent implements OnInit {
    form: FormGroup;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private marketService: MarketService,
        private alertService: AlertService
    ) {}

    ngOnInit() {    
        this.form = this.formBuilder.group({
            id:"",
            Code:['', Validators.required],
            Name:['', Validators.required],
            Ceo:['', Validators.required],
            TurnOver:['', Validators.required],
            Website:['', Validators.required],
            Exchange:['', Validators.required]
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

        this.loading = true;
        this.createCompany();
    }

    private createCompany() {
        setTimeout(() => 
        this.marketService.createCompany(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Company added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['.', { relativeTo: this.route }]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            })
        ,2000);
      
            
    }

}
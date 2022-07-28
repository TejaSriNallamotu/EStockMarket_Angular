import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { MarketService } from '../_services/market.service';


@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    
    companies: any;
    stocks:any;
    stockDisplay:boolean;
    companyCode: string;
    dateDiff:boolean;
    maxValue:number=0;
    minValue:number=0;
    avgValue:number=0;
    startDate = moment.utc().local().format('YYYY-MM-DDTHH:mm:ss');
    endDate = moment.utc().local().format('YYYY-MM-DDTHH:mm:ss');
    constructor(private marketService: MarketService,
        private alertService: AlertService) 
    {
    }

    ngOnInit() {
        this.getCompanies();
        this.getAllStocks();        
    }

    ngAfterViewInit(): void {
        // this.getCompanies();
        this.getAllStocks();
    }

    validateDateTime(){
        this.dateDiff= moment(this.startDate).isAfter(moment(this.endDate));
    }

    getCompanies(){
        setTimeout(() =>  this.marketService.getAll()
        .pipe(first())
        .subscribe(companies => this.companies = companies),2000);
    }

    getAllStocks(){
        setTimeout(() => this.marketService.getAllStocks()
        .pipe(first())
        .subscribe(stocks => {this.stocks = stocks;}),4000);
    }

    GetStocks(companyCode:any, startDate:any, endDate:any){
        this.stockDisplay=true;
        setTimeout(() => 
        this.marketService.getStocksByCode(companyCode,startDate,endDate)
        .pipe(first())
        .subscribe(stocks => 
            {
                this.stocks = stocks;
                if(this.stocks.length>0)
                {
                    this.maxValue = Number(Math.max.apply(null, this.stocks.map(item => item.price)).toFixed(2));
                    this.minValue = Number(Math.min.apply(null, this.stocks.map(item => item.price)).toFixed(2));
                    let getAverage = arr => {
                        let reducer = (total, currentValue) => total + currentValue;
                        let sum = arr.reduce(reducer)
                        return sum / arr.length;
                    };
                    let prices = this.stocks.map(stock => stock.price);
                    this.avgValue = Number(getAverage(prices).toFixed(2));
                }
            })        
        , 2000);
       
    }
    

    deleteCompany(companyCode:any)
    { 
        const company = this.companies.find(x => x.code === companyCode);
        setTimeout(() => {
            this.marketService.deleteStock(companyCode)
            .pipe(first())
            .subscribe(() =>{});
            setTimeout(() => {this.getAllStocks() },1000);;
            this.marketService.deleteCompany(companyCode)
                .subscribe(() => {
                    this.companies = this.companies.filter(x => x.code !== companyCode) 
                });
                this.minValue=0;
                this.maxValue=0;
                this.avgValue=0;
                company.isDeleting = true;
        },2000);
        // setTimeout(() => 
        // {
        //     // this.getAllStocks();
           
        // },2000);
    }
}
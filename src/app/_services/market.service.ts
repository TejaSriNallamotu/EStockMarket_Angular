import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { Company } from '../_models/company';
import { Stock } from '../_models/stock';

@Injectable({ providedIn: 'root' })
export class MarketService {
    private userSubject: BehaviorSubject<User>;
    public company: Observable<Company>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }


    getAll() {
        return this.http.get<Company[]>(`${environment.apiUrl}/Market/Company/getall`);
    }

    getAllStocks() {
        return this.http.get<Stock[]>(`${environment.apiUrl}/Market/Stock/getall`);
    }

    getStocksByCode(companycode,startdate,enddate) {
        return this.http.get<Stock[]>(`${environment.apiUrl}/Market/Stock/getStockDetails/${companycode}/${startdate}/${enddate}`);
    }

    createStock(stock: Stock){
        return this.http.post(`${environment.apiUrl}/Market/Stock/add/${stock.companyCode}`,stock);
    }

    createCompany(company: Company){
        return this.http.post(`${environment.apiUrl}/Market/Company/register`,company);
    }

    deleteCompany(companyCode: string) {
        return this.http.delete(`${environment.apiUrl}/Market/Company/delete/${companyCode}`)
            .pipe(map(x => {  return x;  }));
    }

    deleteStock(companyCode: string) {
        return this.http.delete(`${environment.apiUrl}/Market/Stock/delete/${companyCode}`)
            .pipe(map(x => {  return x;  }));
    }
}
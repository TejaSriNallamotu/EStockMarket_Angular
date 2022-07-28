import { Pipe, PipeTransform } from "@angular/core";
import { Stock } from "../_models/stock";

@Pipe({
    name: 'stockfilter'
})
export class StockFilterPipe implements PipeTransform {
    transform(value: Stock[], args?: any): any {
        if(!args)
         return value;
        return value.filter(
                item => item.companyCode.toLowerCase().indexOf(args.toLowerCase()) > -1
            );
    
    }
}


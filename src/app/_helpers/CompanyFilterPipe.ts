import { Pipe, PipeTransform } from "@angular/core";
import { Company } from "../_models/company";

@Pipe({
    name: 'companyfilter'
})
export class CompanyFilterPipe implements PipeTransform {
    transform(value: Company[], args?: any): any {
        if(!args)
         return value;
        return value.filter(
                item => item.code.toLowerCase().indexOf(args.toLowerCase()) > -1
            );
    
    }
}


import { Pipe, PipeTransform } from '@angular/core';
import { NgxPipeUtils } from './ngx-spanish-pipe.utils';

@Pipe({
    name: 'NgxNumberEsPipe'
})
export class SpanishDecimalPipe implements PipeTransform {
    constructor(public utils: NgxPipeUtils) { }

    transform(val: any, decimals: number): string {
        val = parseFloat(val.toString());
        if (val !== undefined && val !== null) {
            decimals = decimals || decimals === 0 ? decimals : 2;
            if (isNaN(val)) {
                return val;
            } else {
                val = val.toLocaleString('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
                if (val.includes(',')) {
                    val = this.utils.convertMillarWithDecimalToSpanish(val);
                } else {
                    val = this.utils.convertMillarToSpanish(val);
                }
                return val;
            }
        } else {
            return '';
        }
    }
}

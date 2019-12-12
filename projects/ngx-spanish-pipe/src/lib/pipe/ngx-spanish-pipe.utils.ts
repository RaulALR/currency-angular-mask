import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NgxPipeUtils {
    constructor() { }
    public convertMillarToSpanish(val: any) {
        if (val.length === 4) {
            const splitVal = val.split('');
            splitVal.splice(1, 0, '.');
            val = '';
            splitVal.forEach(element => {
                val += element;
            });
        }
        return val;
    }

    public convertMillarWithDecimalToSpanish(val: any) {
        const splitVal = val.split(',');
        if (splitVal[0].length === 4) {
            let naturalNum = splitVal[0];
            splitVal[0] = '';
            naturalNum = naturalNum.split('');
            naturalNum.splice(1, 0, '.');
            naturalNum.forEach(element => {
                splitVal[0] += element;
            });
            val = `${splitVal[0]},${splitVal[1]}`;
        }
        return val;
    }

}

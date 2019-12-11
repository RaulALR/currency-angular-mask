import { Injectable, ElementRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NgxCurrencyService {

    constructor() { }

    public onInputAction(event: Event, fromPaste: boolean): boolean {
        const el: HTMLInputElement = event.target as HTMLInputElement;
        if (fromPaste) {
            el.value = el.value.trim();
        }
        return false;
    }

    public onFocusAction(event: Event, decimalLength: number) {
        const el: HTMLInputElement = event.target as HTMLInputElement;
        let value = el.value;
        if (value) {
            if (value.includes('.')) {
                value = value.replace(/\./g, '');
            }

            value = this.deleteDecimal(value);
            // value = this.formatStringToDecimalNumber(value, decimalLength);
        }
        return value;
    }
    public onBlurAction(el: ElementRef, decimalLength) {
        if (el.nativeElement.value) {
            if (this.isNegative(el.nativeElement.value)) {
                const num = el.nativeElement.value.substring(1, el.nativeElement.value.length);
                el.nativeElement.value =
                    `-${this.formatStringToDecimalNumber(this.checkStartOfNumber(num), decimalLength)}`;
            } else {
                el.nativeElement.value =
                    this.formatStringToDecimalNumber(this.checkStartOfNumber(el.nativeElement.value), decimalLength);
            }
            el.nativeElement.value = this.deleteDecimal(el.nativeElement.value);
        }
    }

    private checkStartOfNumber(value) {
        let transformedValue = value.toString();
        if (transformedValue.indexOf('.') === 0 || (transformedValue.indexOf('-') === 0 && transformedValue.indexOf('.') === 1)) {
            const tempValue = [transformedValue.slice(0, transformedValue.indexOf('.')), '0',
            transformedValue.slice(transformedValue.indexOf('.'))].join('');
            transformedValue = tempValue.replace('.', ',');
        }
        if (transformedValue.indexOf(',') === 0 || (transformedValue.indexOf('-') === 0 && transformedValue.indexOf(',') === 1)) {
            transformedValue[transformedValue.indexOf(',')] = 0;
        }
        return transformedValue;
    }


    public isNegative(num: any) {
        if (num.includes('-')) {
            return true;
        } else {
            return false;
        }
    }

    public formatStringToDecimalNumber(cadena, decimal) {
        return this.miles(this.formatStringToDecimalNumberComplex(cadena), decimal);
    }

    // tslint:disable-next-line:cognitive-complexity
    private formatStringToDecimalNumberComplex(cadena) {
        let contador = 0;
        let limpia = cadena;
        while (limpia.indexOf(',') !== -1 || limpia.indexOf('.') !== -1) {
            if (limpia.indexOf(',') !== -1 && limpia.indexOf('.') !== -1) {
                if (limpia.indexOf('.') < limpia.indexOf(',')) {
                    limpia = limpia.substring(limpia.indexOf('.') + 1, limpia.length);
                } else if (limpia.indexOf(',') < limpia.indexOf('.')) {
                    limpia = limpia.substring(limpia.indexOf(',') + 1, limpia.length);
                }
            } else if (limpia.indexOf(',') !== -1) {
                limpia = limpia.substring(limpia.indexOf(',') + 1, limpia.length);
            } else if (limpia.indexOf('.') !== -1) {
                limpia = limpia.substring(limpia.indexOf('.') + 1, limpia.length);
            }
            contador++;
        }

        limpia = cadena;
        while (contador > 1) {
            if (limpia.indexOf(',') !== -1 && limpia.indexOf('.') !== -1) {
                if (limpia.indexOf('.') < limpia.indexOf(',')) {
                    limpia =
                        limpia.substring(0, limpia.indexOf('.')) +
                        limpia.substring(limpia.indexOf('.') + 1, limpia.length);
                } else if (limpia.indexOf(',') < limpia.indexOf('.')) {
                    limpia =
                        limpia.substring(0, limpia.indexOf(',')) +
                        limpia.substring(limpia.indexOf(',') + 1, limpia.length);
                }
            } else if (limpia.indexOf(',') !== -1) {
                limpia =
                    limpia.substring(0, limpia.indexOf(',')) + limpia.substring(limpia.indexOf(',') + 1, limpia.length);
            } else if (limpia.indexOf('.') !== -1) {
                limpia =
                    limpia.substring(0, limpia.indexOf('.')) + limpia.substring(limpia.indexOf('.') + 1, limpia.length);
            }
            contador--;
        }
        cadena = limpia;

        cadena = cadena.replace(',', '.');
        if (cadena.charAt(0) === '.') {
            cadena = '0' + cadena;
        }
        if (isNaN(parseFloat(cadena))) {
            return '0';
        }

        return cadena;
    }

    private miles(cadena, d) {
        const ix = cadena.indexOf('.');
        let aux, cambio;
        if (ix >= 0) {
            if (cadena.length > ix + 1 + d) {
                cadena = cadena.substring(0, ix + 1 + d);
            }
            cadena = cadena.replace('.', ',');
            aux = cadena.substring(0, ix);
            cambio = '';
            while (aux.length > 3) {
                cambio = '.' + aux.substring(aux.length - 3, aux.length) + cambio;
                aux = aux.substring(0, aux.length - 3);
            }
            cambio = aux + cambio + cadena.substring(ix, cadena.length);
        } else {
            aux = cadena;
            cambio = '';
            while (aux.length > 3) {
                cambio = '.' + aux.substring(aux.length - 3, aux.length) + cambio;
                aux = aux.substring(0, aux.length - 3);
            }
            cambio = aux + cambio + this.calculateDecimal(d);
        }
        cadena = cambio;
        return cadena;
    }

    public calculateDecimal(decimal) {
        let cadenaDecimal = decimal ? ',' : '';
        for (let i = 0; i < decimal; i++) {
            cadenaDecimal += '0';
        }
        return cadenaDecimal;
    }

    private deleteDecimal(value) {
        if (value.includes(',')) {
            const aux = value.split(',')[1].length;
            if (aux === 0) {
                value = value.replace(',', '');
            }
        }
        return value;
    }
}

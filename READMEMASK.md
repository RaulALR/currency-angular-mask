# Ngx currency mask
## Introduction

Install the generator: 

```sh
    npm install ngx-currency-mask
```

ngx-currency-mask is a directive that tansforms a number without dot and commas to spanish format (1000000 => 1.000.000)

## Usage

The module thtat contains the currency mask is this: `NgxCurrencyMaskModule`. And it is used as follows: 

```html
<input NgxCurrencyMask [options]="options"/>
```

This directive has one input option and it has this structure:

```typescript
export interface ICurrencyConfig {
    decimalLength?: number; // Maximum decimal size
    numberLength?: number; // Maximum number size
    isAutocalc?: boolean; // It is used when the input is disabled
}
```
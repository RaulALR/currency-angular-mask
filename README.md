# Ngx spanish pipe
## Installation

Install the generator:

```sh
    npm install ngx-spanish-pipe
```

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxSpanishPipeModule } from 'ngx-spanish-pipe';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpModule, NgxSpanishPipeModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

It contains a pipe that tansforms a number without dot and commas to spanish format (1000000 => 1.000.000).

## Usage

The module thtat contains the currency mask is this: `NgxSpanishPipeModule`. And it is used as follows:

```html
<td>{{number | NgxNumberEsPipe:'number of decimals'}}</td>
```

# Ngx currency mask
## Introduction

Install the generator: 

```sh
    npm install ngx-currency-angular-mask
```

ngx-currency-angular-mask is a directive that tansforms a number without dot and commas to spanish format (1000000 => 1.000.000)

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

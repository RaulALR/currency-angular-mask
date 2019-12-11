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
<td>{{number | bnpNumberEsPipe:'number of decimals'}}</td>
```


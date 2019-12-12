import { SpanishDecimalPipe } from './ngx-spanish-pipe.pipe';
import { NgModule } from '@angular/core';
import { NgxPipeUtils } from './ngx-spanish-pipe.utils';

@NgModule({
    exports: [SpanishDecimalPipe],
    declarations: [SpanishDecimalPipe],
    providers: [NgxPipeUtils]
})
export class NgxSpanishPipeModule {}

import { OnInit, Input, Directive, OnDestroy, ElementRef } from '@angular/core';
import { NgxCurrencyService } from './ngx-currency-angular-mask.service';
import { fromEvent, Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ICurrencyConfig } from '../interface/ICurrencyConfig';

@Directive({
    selector: '[NgxCurrencyMask]',
    providers: [NgxCurrencyService]
})
export class NgxCurrencyDirective implements OnInit, OnDestroy {
    @Input()
    public mask;

    @Input()
    public options: ICurrencyConfig = {
        decimalLength: 2,
        numberLength: 8,
        isAutocalc: false
    };

    // Event observables
    private onInput$: Observable<Event>;
    private onBlur$: Observable<Event>;
    private onFocus$: Observable<Event>;
    private onKeyUp$: Observable<Event>;
    private onPaste$: Observable<Event>;

    // Event subscription
    private onInputSubscription: Subscription;
    private onBlurSubscription: Subscription;
    private onFocusSubscription: Subscription;
    private onKeyUpSubscription: Subscription;
    private onPasteSubscription: Subscription;

    // Subjects
    private fromPasteSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private htmlValue: string;

    constructor(
        public currencyService: NgxCurrencyService,
        public el: ElementRef
    ) {
    }

    private createEventsObservables() {
        this.onInput$ = fromEvent(this.el.nativeElement, 'input');
        this.onBlur$ = fromEvent(this.el.nativeElement, 'blur');
        this.onFocus$ = fromEvent(this.el.nativeElement, 'click');
        this.onKeyUp$ = fromEvent(this.el.nativeElement, 'keyup');
        this.onPaste$ = fromEvent(this.el.nativeElement, 'paste');
    }

    private subscriptionEventsObservables() {
        this.onInputSubscription = this.onInput$.subscribe((event) => {
            this.fromPasteSubject.next(this.currencyService.onInputAction(event, this.fromPasteSubject.getValue()));
        });

        this.onBlurSubscription = this.onBlur$.subscribe((event) => {
            this.currencyService.onBlurAction(this.el, this.options.decimalLength);
        });

        this.onFocusSubscription = this.onFocus$.subscribe((event) => {
            if (this.options && !this.options['isAutocalc']) {
                this.el.nativeElement.value = this.currencyService.onFocusAction(event, this.options.decimalLength);
            }
        });

        this.onKeyUpSubscription = this.onKeyUp$.subscribe((event) => {
        });

        this.onPasteSubscription = this.onPaste$.subscribe((event) => {
            this.fromPasteSubject.next(true);
        });
    }

    ngOnDestroy(): void {
        this.onInputSubscription.unsubscribe();
        this.onBlurSubscription.unsubscribe();
        this.onFocusSubscription.unsubscribe();
        this.onKeyUpSubscription.unsubscribe();
        this.onPasteSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.createEventsObservables();
        this.subscriptionEventsObservables();
    }

}

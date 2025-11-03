import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelectOnFocus]',
})
export class SelectOnFocus {
  constructor(private elementRef: ElementRef) {}

  @HostListener('focus') onFocus() {
    this.elementRef.nativeElement.select();
  }
}

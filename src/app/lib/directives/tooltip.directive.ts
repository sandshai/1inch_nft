import { Directive, ElementRef } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  // constructor(private el: ElementRef) {}
  //   ngAfterViewInit() {
  //     new Tooltip(this.el.nativeElement);
  // }
}

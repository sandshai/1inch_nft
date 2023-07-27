import { Directive, ElementRef } from '@angular/core';
declare var bootstrap: any;

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  private tooltip: any;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const domElement: HTMLElement = this.elementRef.nativeElement;
    this.tooltip = new bootstrap.Tooltip(domElement);
  }

  ngOnDestroy(): void {
    this.tooltip.dispose();
  }
}

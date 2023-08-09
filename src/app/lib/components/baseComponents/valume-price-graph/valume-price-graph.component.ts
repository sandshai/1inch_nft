import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-valume-price-graph',
  templateUrl: './valume-price-graph.component.html'
})
export class ValumePriceGraphComponent {
  @Input() is_show: string | undefined;
  @Input() accordionBdyClass: string | undefined;
  @Input() hideFilterButtonClass: string | undefined;
  @Input() gName : string | undefined;
}

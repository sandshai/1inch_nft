import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listings-graph',
  templateUrl: './listings-graph.component.html',
})
export class ListingsGraphComponent {
  @Input() accordionBdyClass: string | undefined;
  @Input() hideFilterButtonClass : string | undefined;
}

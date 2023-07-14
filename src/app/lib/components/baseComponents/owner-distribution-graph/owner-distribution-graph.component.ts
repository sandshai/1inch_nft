import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-owner-distribution-graph',
  templateUrl: './owner-distribution-graph.component.html'
})
export class OwnerDistributionGraphComponent {
  @Input() accordionBdyClass : string | undefined;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html'
})
export class SalesGraphComponent {
  @Input() is_show : string | undefined;
}

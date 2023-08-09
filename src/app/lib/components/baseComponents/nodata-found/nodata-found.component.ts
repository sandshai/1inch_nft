import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nodata-found',
  templateUrl: './nodata-found.component.html'
})
export class NodataFoundComponent {
  @Input() message: string | undefined;
  @Input() buttonText: string | undefined;
}

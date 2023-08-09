import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-large',
  templateUrl: './card-large.component.html',
})
export class CardLargeComponent {
  @Input() bannerData: any;
}

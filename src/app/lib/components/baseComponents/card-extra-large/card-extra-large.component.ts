import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-extra-large',
  templateUrl: './card-extra-large.component.html',
})
export class CardExtraLargeComponent {
  @Input() className: string | undefined;
  @Input() imgUrl : string | undefined;
}

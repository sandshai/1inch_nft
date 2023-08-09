import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-small',
  templateUrl: './card-small.component.html',
})
export class CardSmallComponent {
  @Input() imgUrl : string | undefined;
}

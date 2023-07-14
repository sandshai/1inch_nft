import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listings-disturbtion',
  templateUrl: './listings-disturbtion.component.html',
})
export class ListingsDisturbtionComponent {
  @Input() accordionBdyClass: string | undefined;
  @Input() hideFilterButtonClass : string | undefined;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent {
  @Input() c_address: string | undefined;
  @Input() token_id: string | undefined;
  @Input() chain: string | undefined;
}

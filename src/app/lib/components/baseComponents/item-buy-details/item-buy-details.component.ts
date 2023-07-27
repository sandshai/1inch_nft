import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-buy-details',
  templateUrl: './item-buy-details.component.html',
})
export class ItemBuyDetailsComponent {
  @Input() price: any;
  @Input() usdPrice: any;
}

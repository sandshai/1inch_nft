import { Component, Input } from '@angular/core';
import { _Data1, _Data4 } from '@reservoir0x/reservoir-sdk';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-item-buy-details',
  templateUrl: './item-buy-details.component.html',
})
export class ItemBuyDetailsComponent {
  @Input() price: any;
  @Input() usdPrice: any;
  @Input() token: any;
  @Input() marketPlaceIcon: any;
  @Input() name: any;
  @Input() image: any;

  constructor(private shared: SharedDataService) {}

  // Reference: https://docs.reservoir.tools/reference/placebid
  async placeBid() {
    let tradeClient = this.shared.getTradeClient();
    if (tradeClient) {
      let data = {
        bids: [
          {
            token: `${this.token.contract}:${this.token.tokenId}`,
            weiPrice: '10000000000000',
          },
        ],
      } as _Data4;
      await tradeClient?.placeBid(data);
    }
  }

  openMakeOffer(
    address: string,
    id: string,
    name: string,
    image: any,
    method: any,
    amount?: any
  ) {
    document.querySelector('body')?.classList.add('overflow-hidden');
    this.shared.openMakeOfferPopup.emit(true);
    this.shared.nftDetails.emit({ address, id, name, image, method, amount });
  }
}

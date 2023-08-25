import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ProfileLayoutService } from 'src/app/lib/services/profile-layout.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

interface Types {
  [key: string]: any;
  '1 day': number;
  '3 days': number;
  '7 days': number;
  '1 month': number;
}
@Component({
  selector: 'app-user-profile-list-items',
  templateUrl: './user-profile-list-items.component.html',
})
export class UserProfileListItemsComponent {
  constructor(
    private profileLayoutService: ProfileLayoutService,
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef
  ) {}
  @Output() closeListItemEvent = new EventEmitter<boolean>();
  expand: boolean = false;

  listTokens: any[] = [];
  types: Types = {
    '1 day': 1,
    '3 days': 3,
    '7 days': 7,
    '1 month': 30,
  };
  selectedItem: any = '1 month';
  objectKeys = Object.keys;
  nftExpiryTime: any;
  inputValue: string = '';
  client: any;
  saleDataList: any[] = [];

  ngOnInit() {
    this.listTokens = this.shared.getItems();

    this.shared.listItemEvent.subscribe((listTokens) => {
      this.listTokens = listTokens;
    });

    if (this.selectedItem === '1 month') {
      let date = new Date();
      date.setDate(date.getDate() + 30);
      this.nftExpiryTime = new Date(date).getTime() / 1000;
      this.handleExpireTime(this.nftExpiryTime);
    }

    this.client = this.shared.getTradeClient();

    this.cdr.detectChanges();
  }

  listAllItems() {
    let tokens = this.listTokens.map((token: any) => {
      return {
        token: `${token?.token?.contract}:${token?.token?.tokenId}`,
        quantity: 1,
        automatedRoyalties: true,
        expirationTime: `${Math.round(this.nftExpiryTime)}`,
        // orderKind: 'seaport-v1.5',
        // orderbook: 'reservoir',
        weiPrice: `${
          token.amount *
          10 ** this.client?.wallet?.chain.nativeCurrency.decimals
        }`,
        // weiPrice: '30000000000000000000',
      };
    });

    this.shared.getTradeClient()?.listToken({
      listings: tokens,
      wallet: this.shared.getWallet() as any,
    });
  }

  closeListItem() {
    this.profileLayoutService.setProfileLayout(false);
    this.closeListItemEvent.emit(false);
  }

  expandPriceFilter() {
    this.expand = this.expand ? (this.expand = false) : (this.expand = true);
  }

  clearListItems() {
    this.listTokens = [];
    this.shared.removeListItems(this.listTokens);
  }

  clearParticularItems(value: any) {
    this.listTokens = this.listTokens.filter(
      (list: any) => list?.token?.tokenId !== value
    );
    this.shared.removeListItems(this.listTokens);
  }

  sendDates(value: any) {
    this.selectedItem = value;

    let expiryTime;
    if (value === '1 day') {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      expiryTime = new Date(date).getTime() / 1000;
    } else if (value === '3 days') {
      let date = new Date();
      date.setDate(date.getDate() + 3);
      expiryTime = new Date(date).getTime() / 1000;
    } else if (value === '7 days') {
      let date = new Date();
      date.setDate(date.getDate() + 7);
      expiryTime = new Date(date).getTime() / 1000;
    } else if (value === '1 month') {
      let date = new Date();
      date.setDate(date.getDate() + 30);
      expiryTime = new Date(date).getTime() / 1000;
    }

    this.nftExpiryTime = expiryTime;
  }

  handleExpireTime(value: any) {
    let finalDate;
    finalDate = value * 1000;
    const finalResult = new Date(finalDate);

    return finalResult;
  }

  onInputChange(event: any, data: any, index: any): void {
    const value = event.target.value;
    this.inputValue = value;

    this.shared.updateValue(index, value);
  }
}

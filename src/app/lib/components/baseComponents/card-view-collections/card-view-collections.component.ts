import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-view-collections',
  templateUrl: './card-view-collections.component.html',
})
export class CardViewCollectionsComponent {
  @Input() itemsCollections: any;
  @Output() dubTokenId = new EventEmitter<any>();

  selectedIcon: any;

  formatAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  goPage(val:any){
    this.dubTokenId.emit(val)
  }

  setMarketPlaceIcon(item: any) {
    let name = item?.market?.floorAsk?.source?.name;

    switch (name) {
      case 'OpenSea':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'opensea.svg',
        };
        break;
      case 'blur.io':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'blur.svg',
        };
        break;
      case 'LooksRare':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'looksrare.svg',
        };
        break;
      case 'X2Y2':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'x2y2.svg',
        };
        break;
      case 'rarible':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'rarible.svg',
        };
        break;
      default:
        this.selectedIcon = {
          iconStatus: 'cdn',
          iconLink: item?.market?.floorAsk?.source?.icon,
        };
        break;
    }
  }
}

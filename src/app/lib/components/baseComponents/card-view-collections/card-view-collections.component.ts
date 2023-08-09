import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-view-collections',
  templateUrl: './card-view-collections.component.html',
})
export class CardViewCollectionsComponent {
  @Input() itemsCollections: any;
  @Output() dubTokenId = new EventEmitter<any>();


  formatAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  goPage(val:any){
    this.dubTokenId.emit(val)
  }
}

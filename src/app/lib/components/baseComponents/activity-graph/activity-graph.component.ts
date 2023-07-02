import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Types {
  [key: string]: any;
  sale: string;
  ask: string;
  transfer: string;
  mint: string;
  bid: string;
  bid_cancel: string;
  ask_cancel: string;
}
@Component({
  selector: 'app-activity-graph',
  templateUrl: './activity-graph.component.html'
})
export class ActivityGraphComponent {
  @Input() is_show: string | undefined;
  @Input() activity: any;
  @Input() dataAvailable: any;
  @Input() pagination: any;

  formatChainAddress: any;
  formatToAddress: any;
  daysAgo: any;
  setClassName = '';

  types: Types = {
    sale: 'sale',
    ask: 'ask',
    transfer: 'transfer',
    mint: 'mint',
    bid: 'bid',
    bid_cancel: 'bid_cancel',
    ask_cancel: 'ask_cancel',
  };

  currentType: string = '';

  @Output() messageEvent = new EventEmitter<any>();
  @Output() loadMoreEvent = new EventEmitter<any>();

  objectKeys = Object.keys;

  sendTypes(key: string) {
    this.currentType = key;
    this.messageEvent.emit(key);
  }

  formatFromAddress(address: string) {
    if (address) {
      this.formatChainAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
    } else {
      this.formatChainAddress = '';
    }
  }

  formatToChainAddress(address: string) {
    if (address) {
      this.formatToAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
    } else {
      this.formatToAddress = '-';
    }
  }

  getDaysAgo(value: string) {
    const givenDate = new Date(value);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - givenDate.getTime();
    this.daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  loadMore(load = false) {
    this.loadMoreEvent.emit(load);
  }
  
  getCurrentType(val:any) {
    switch (val) {
      case 'sale':
        this.setClassName = 'text-sold'
        break;
      case 'transfer':
        this.setClassName = 'text-transfer'
        break;
      case 'bid_cancel':
        this.setClassName = 'text-cancel'
        break;
      case 'listed':
        this.setClassName = 'text-listed'
        break;
      case 'ask_cancel':
        this.setClassName = 'text-cancel'
        break;
      default:
        this.setClassName = 'text-transfer'
        break;
    }
  }
}

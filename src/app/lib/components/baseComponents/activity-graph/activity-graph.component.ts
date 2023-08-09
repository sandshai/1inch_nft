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
  templateUrl: './activity-graph.component.html',
})
export class ActivityGraphComponent {
  @Input() is_show: string | undefined;
  @Input() activity: any;
  @Input() dataAvailable: any;
  @Input() pagination: any;
  @Input() saleDate: any;

  formatChainAddress: any;
  formatToAddress: any;
  daysAgo: any;
  setClassName:any = '';
  setIcon: any = '';
  timeInterval: string = '';
  saleInterval: string = '';

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
  saleDay: any;

  @Output() messageEvent = new EventEmitter<any>();
  @Output() loadMoreEvent = new EventEmitter<any>();

  objectKeys = Object.keys;

  sendTypes(key: string) {
    this.currentType = key;
    this.loadMoreEvent.emit(false);
    this.messageEvent.emit(key);
  }

  ngOnChanges() {
    if (this.saleDate) {
      let value = new Date(this.saleDate * 1000);

      const currentDate = new Date();

      const oneDayInMillis = 1000 * 60 * 60 * 24;
      const minutesCalculation = 1000 * 60;

      const timeDiff = currentDate.getTime() - value.getTime();

      if (timeDiff < oneDayInMillis) {
        this.saleDay = Math.floor(timeDiff / (1000 * 60 * 60));
        this.saleInterval = 'h';
      } else if (timeDiff < minutesCalculation) {
        this.saleDay = Math.floor(timeDiff / (1000 * 60));
        this.saleInterval = 'm';
      } else {
        this.saleDay = Math.floor(timeDiff / (1000 * 3600 * 24));
        this.saleInterval = 'd';
      }
    }
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

  getDaysAgo(value: string): void {
    const givenDate = new Date(value);
    const currentDate = new Date();

    const oneDayInMillis = 1000 * 60 * 60 * 24;
    const minutesCalculation = 1000 * 60;

    const timeDiff = currentDate.getTime() - givenDate.getTime();
    if (timeDiff < oneDayInMillis) {
      this.daysAgo = Math.floor(timeDiff / (1000 * 60 * 60));
      this.timeInterval = 'h';
    } else if (timeDiff < minutesCalculation) {
      this.daysAgo = Math.floor(timeDiff / (1000 * 60));
      this.timeInterval = 'm';
    } else {
      this.daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
      this.timeInterval = 'd';
    }
  }

  loadMore(load = false) {
    this.loadMoreEvent.emit(load);
  }

  getCurrentType(val: any) {
    switch (val) {
      case 'sale':
        this.setClassName = 'text-green-2';
        this.setIcon = 'saleIcon';
        break;
      case 'transfer':
        this.setClassName = 'text-gray-2';
        this.setIcon = 'transferIcon';
        break;
      case 'bid_cancel':
        this.setClassName = 'text-red';
        this.setIcon = `cancelIcon`;
        break;
      case 'listed':
        this.setClassName = 'text-yellow';
        this.setIcon = 'listedIcon';
        break;
      case 'ask_cancel':
        this.setClassName = 'text-red';
        this.setIcon = `cancelIcon`;
        break;
      default:
        this.setClassName = 'text-gray-2';
        this.setIcon = 'transferIcon';
        break;
    }
  }
}

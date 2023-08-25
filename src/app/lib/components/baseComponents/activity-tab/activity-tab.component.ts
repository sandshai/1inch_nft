import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Types {
  [key: string]: any;
  'All Events':string,
  sale: string;
  ask: string;
  transfer: string;
  mint: string;
  bid: string;
  bid_cancel: string;
  ask_cancel: string;
}
@Component({
  selector: 'app-activity-tab',
  templateUrl: './activity-tab.component.html',
})
export class ActivityTabComponent {
  @Input() activityDetails: any;
  @Input() loading: any;
  @Input() loadMore: any;
  types: Types = {
    'All Events': 'all_events',
    sale: 'sale',
    ask: 'ask',
    transfer: 'transfer',
    mint: 'mint',
    bid: 'bid',
    bid_cancel: 'bid_cancel',
    ask_cancel: 'ask_cancel',
  };

  @Output() messageEvent = new EventEmitter<any>();
  @Output() loadMoreEvent = new EventEmitter<any>();
  currentType: string = '';
  objectKeys = Object.keys;
  daysAgo: any;
  timeInterval: any;
  setClassName: any;

  sendTypes(value: string) {
    this.currentType = value;
    this.messageEvent.emit(value);
  }

  formatAddress(value: string) {
    return `${value.slice(0, 4)}....${value.slice(-4)}`;
  }

  handleTimeCalculation(value: any): void {
    const givenDate = new Date(value);
    const currentDate = new Date();

    let timeDifferenceInMilliseconds =
      currentDate.getTime() - givenDate.getTime();

    let timeDifferenceInMinutes = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60)
    );
    let timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    let timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

    let finalTime;

    if (timeDifferenceInDays > 0) {
      finalTime = `${timeDifferenceInDays} day${
        timeDifferenceInDays === 1 ? '' : 's'
      } ago`;
    } else if (timeDifferenceInHours > 0) {
      finalTime = `${timeDifferenceInHours} hour${
        timeDifferenceInHours === 1 ? '' : 's'
      } ago`;
    } else {
      finalTime = `${timeDifferenceInMinutes} minute${
        timeDifferenceInMinutes === 1 ? '' : 's'
      } ago`;
    }

    this.daysAgo = finalTime;
  }

  loadMoreActivity(load: boolean = false): void {
    this.loadMoreEvent.emit(load);
  }

  getCurrentType(val: any) {
    switch (val) {
      case 'sale':
        this.setClassName = 'text-green';
        break;
      case 'transfer':
        this.setClassName = 'text-gray-2';
        break;
      case 'bid_cancel':
        this.setClassName = 'text-red';
        break;
      case 'listed':
        this.setClassName = 'text-yellow';
        break;
      case 'ask_cancel':
        this.setClassName = 'text-red';
        break;
      default:
        this.setClassName = 'text-gray-2';
        break;
    }
  }
}

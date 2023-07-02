import { Component, EventEmitter, Output } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-sweep-and-analytics-mobile-tab',
  templateUrl: './sweep-and-analytics-mobile-tab.component.html',
})
export class SweepAndAnalyticsMobileTabComponent {
  @Output() open_analytics = new EventEmitter<boolean>();
  @Output() closeSweep = new EventEmitter<boolean>();

  receivedList: any[] = [];
  selectedItems: any[] = [];
  totalAmount: any;

  constructor(private shared: SharedDataService) {}

  ngOnInit(): void {
    this.shared.getArrayList().subscribe((array) => {
      this.receivedList = array;
    });
  }

  openAnalyticsTab() {
    this.open_analytics.emit(false);
  }

  sweepClose() {
    this.closeSweep.emit(false);
    this.selectedItems = [];
    this.selectedItems.length = 0;
    this.onRangeChange(0);
  }

  onRangeChange(event: any) {
    let initialValue = event?.target?.value ? event?.target?.value : 1;
    this.selectedItems = this.receivedList.slice(0, initialValue);

    let totalAmount = 0;
    let decimalDigits = 2;

    for (const item of this.selectedItems) {
      const {
        market: {
          floorAsk: {
            price: {
              amount: { decimal },
            },
          },
        },
      } = item;
      totalAmount += decimal;
    }

    let multipliedNumber = totalAmount * Math.pow(10, decimalDigits);
    let truncatedNumber = Math.floor(multipliedNumber);
    let result = truncatedNumber / Math.pow(10, decimalDigits);

    this.totalAmount = result;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-sweep-and-analytics-mobile-tab',
  templateUrl: './sweep-and-analytics-mobile-tab.component.html',
})
export class SweepAndAnalyticsMobileTabComponent {
  @Output() closeSweep = new EventEmitter<boolean>();
  receivedList: any[] = [];
  selectedItems: any[] = [];
  totalAmount: any;

  constructor(private shared: SharedDataService) {}

  ngOnInit(): void {
    this.shared.getArrayList().subscribe((array) => {
      this.receivedList = array;
    });
    this.shared.setSliderInput.subscribe((value) => {
      this.onRangeChange(value);
    });
  }

  sweepClose() {
    this.closeSweep.emit(false);
    this.selectedItems = [];
    this.selectedItems.length = 0;
    this.onRangeChange(0);
  }

  onRangeChange(event: any) {
    let initialValue = event?.target?.value ? event?.target?.value : 0;
    this.handleInputChange(event)
    this.selectedItems = this.receivedList.slice(0, initialValue);
    this.passArrayList(this.selectedItems);

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

  passArrayList(value: any): void {
    this.shared.setSliderList(value);
  }

  handleInputChange(e:any) {
    let target = e.target
    if (e.target.type !== 'range') {
      target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value
    let percentage = (val - min) * 100 / (max - min)
    target.style.background = `linear-gradient(to right, #2F8AF5 ${percentage}%, #37445A ${percentage}%)`
  }
}

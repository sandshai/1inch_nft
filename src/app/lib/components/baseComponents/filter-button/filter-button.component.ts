import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
})
export class FilterButtonComponent {
  public mobDevice: any;
  public mdDevice: any;
  sort = {
    '1day': '1DayVolume',
    '7day': '7DayVolume',
    '30day': '30DayVolume',
    allTime: 'allTimeVolume',
  };

  @Input() sortBy?: string;

  @Output() filterByValue = new EventEmitter<{ value: string; day?: string }>();

  ngOnInit() {
    this.setFilterButton();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setFilterButton();
  }

  setFilterButton() {
    if (window.innerWidth > 767) {
      this.mobDevice = false;
      this.mdDevice = true;
    } else {
      this.mobDevice = true;
      this.mdDevice = false;
    }
  }

  filterByDayFun(value: string, day?: string) {
    const data = {
      value: value,
      day: day,
    };

    this.filterByValue.emit(data);
  }
}

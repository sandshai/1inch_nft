import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  minEvent: EventEmitter<number> = new EventEmitter<number>();

  maxEvent: EventEmitter<number> = new EventEmitter<number>();

  setSliderInput: EventEmitter<number> = new EventEmitter<number>();

  walletAddressEvent: EventEmitter<any> = new EventEmitter<any>();

  filterPriceEvent: EventEmitter<any> = new EventEmitter<any>();

  selectedChain: EventEmitter<any> = new EventEmitter<any>();

  discordUrl: EventEmitter<any> = new EventEmitter<any>();

  twitterUrl: EventEmitter<any> = new EventEmitter<any>();

  externalUrl: EventEmitter<any> = new EventEmitter<any>();

  private arrayList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private sliderArrayList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  values: any[] = [];
  valueAdded = new EventEmitter<any>();

  addValue(value?: string, keyData?: any, checked?: any) {
    const payLoad = { value, keyData, checked };

    this.valueAdded.emit({ payLoad, checked });
  }

  setValue(value: string) {
    sessionStorage.setItem('walletAddress', value);
    this.walletAddressEvent.emit(value);
  }

  getValue() {
    return sessionStorage.getItem('walletAddress');
  }

  setList(list: any[]): void {
    this.arrayList.next(list);
  }

  getArrayList(): BehaviorSubject<any[]> {
    return this.arrayList;
  }

  setSliderList(list: any[]): void {
    this.sliderArrayList.next(list);
  }

  getSliderArrayList(): BehaviorSubject<any[]> {
    return this.sliderArrayList;
  }

  private storageKey = 'searchHistory';

  getSearchHistory(): string[] {
    const historyStr = localStorage.getItem(this.storageKey);
    return historyStr ? JSON.parse(historyStr) : [];
  }

  addToSearchHistory(query: string): void {
    const history = this.getSearchHistory();
    if (!history.includes(query)) {
      history.unshift(query);
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    }
  }

  constructor() {}
}

import { EventEmitter, Injectable, Output } from '@angular/core';
import { ReservoirClient, getClient } from '@reservoir0x/reservoir-sdk';
import { BehaviorSubject } from 'rxjs';
import { WalletClient, createWalletClient } from 'viem';
import { TradeSdk } from '../components/baseComponents/trade/trade-sdk.component';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  minEvent: EventEmitter<number> = new EventEmitter<number>();

  maxEvent: EventEmitter<number> = new EventEmitter<number>();

  setSliderInput: EventEmitter<number> = new EventEmitter<number>();

  walletAddressEvent: EventEmitter<any> = new EventEmitter<any>();

  walletBalanceEvent: EventEmitter<any> = new EventEmitter<any>();

  filterPriceEvent: EventEmitter<any> = new EventEmitter<any>();

  walletEvent: EventEmitter<any> = new EventEmitter<any>();

  valueAdded = new EventEmitter<any>();

  selectedChain: EventEmitter<any> = new EventEmitter<any>();

  listItemEvent: EventEmitter<any> = new EventEmitter<any>();

  profileCurrentTab: EventEmitter<any> = new EventEmitter<any>();

  discordUrl: EventEmitter<any> = new EventEmitter<any>();

  twitterUrl: EventEmitter<any> = new EventEmitter<any>();

  externalUrl: EventEmitter<any> = new EventEmitter<any>();

  openMakeOfferPopup: EventEmitter<any> = new EventEmitter<any>();

  nftDetails: EventEmitter<any> = new EventEmitter<any>();

  private arrayList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private sliderArrayList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  values: any[] = [];
  wallet: WalletClient | any;
  tradeClient: TradeSdk | any;
  listItems: any[] = [];

  constructor() {
    this.wallet = null;
    this.tradeClient = null;
  }

  setProfileCurrentTab(tab: string) {
    localStorage.setItem('profileCurrentTab', tab);
    this.profileCurrentTab.emit(tab);
  }

  setWalletType(type: string) {
    sessionStorage.setItem('walletType', type);
  }

  setWallet(wallet: WalletClient) {
    this.wallet = wallet;
    this.walletEvent.emit({ wallet });
  }

  getWallet() {
    return this.wallet;
  }

  getTradeClient(): TradeSdk {
    if (this.tradeClient) return this.tradeClient;

    if (this.wallet) {
      this.tradeClient = new TradeSdk(this.wallet);
    }

    return this.tradeClient;
  }

  getChain() {
    return this.wallet?.chain;
  }

  getExplorerUrl() {
    return this.getChain()?.blockExplorers?.default?.url;
  }

  getWalletType(): string | null {
    return sessionStorage.getItem('walletType');
  }

  addValue(value?: string, keyData?: any, checked?: any) {
    const payLoad = { value, keyData, checked };

    this.valueAdded.emit({ payLoad, checked });
  }

  setValue(value: string) {
    sessionStorage.setItem('walletAddress', value);
    this.walletAddressEvent.emit(value);
  }

  getValue(formated?: boolean) {
    let address = sessionStorage.getItem('walletAddress') as string;
    return formated
      ? `${address?.slice(0, 4)}...${address?.slice(-4)}`
      : address;
  }

  setBalance(address: string, value: string) {
    sessionStorage.setItem(`balance-${address}`, value);
    this.walletBalanceEvent.emit(value);
  }

  getBalance(address: string) {
    return sessionStorage.getItem(`balance-${address}`);
  }

  addListItems(token: any, track?: any): void {
    if (this.listItems.indexOf(token) === -1) {
      this.listItems.push(token);
    }
    this.listItemEvent.emit(this.listItems);
  }

  updateValue(index: any, value?: any): void {
    this.listItems[index].amount = value;

    this.listItemEvent.emit(this.listItems);
  }

  removeListItems(value: any) {
    this.listItems = value;
  }

  getItems() {
    return this.listItems;
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
}

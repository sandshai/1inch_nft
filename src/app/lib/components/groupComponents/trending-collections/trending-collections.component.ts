import { ChangeDetectorRef, Component } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

interface Chains {
  [key: string]: any;
  ethereum: number;
  polygon: number;
  // Arbitrum: number;
  // Optimism: number;
}
@Component({
  selector: 'app-trending-collections',
  templateUrl: './trending-collections.component.html',
})
export class TrendingCollectionsComponent {
  trendingCollections: any = [];
  sort = {
    '1day': '1DayVolume',
    '7day': '7DayVolume',
    '30day': '30DayVolume',
  }; // [1DayVolume, 7DayVolume, 30DayVolume, allTimeVolume, createdAt, floorAskPrice]

  chains: Chains = {
    ethereum: 1,
    polygon: 137,
    // Arbitrum: 42161,
    // Optimism: 10,
  };
  selectedIcon: any;
  selectedChain: any = 'ethereum';
  limit = 9;
  normalizeRoyalties = false;
  sortBy: string = this.sort['7day'];
  sortedDay: string = '7day';
  objectKeys = Object.keys;
  isLoading = false;
  search = false;
  chain: any;

  constructor(
    private _crudService: CrudService,
    private _settings: SettingsService,
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sortedDay = '7day';

    this.shared.walletEvent.subscribe((data) => {
      this.chain = data?.wallet?.chain?.name;
      this.shared.selectedChain.emit(this.chain);
    });
    this.shared.selectedChain.subscribe((data) => {
      if (data === 'Ethereum') {
        this.selectedChain = data?.toString().toLowerCase();
        this._settings.changeChainURL(this.selectedChain);
        this.getTrendingCollections(this.sortBy);
      } else if (data === 'Polygon') {
        this.selectedChain = data?.toString().toLowerCase();
        this._settings.changeChainURL(this.selectedChain);
        this.getTrendingCollections(this.sortBy);
      } else {
        this.getTrendingCollections(this.sortBy);
      }

      this.cdr.detectChanges();
    });
    this.getTrendingCollections(this.sortBy);
    this.selectIcon();
  }

  getTrendingCollections = (sortBy?: string, chain?: any) => {
    this.isLoading = true;
    this._crudService
      .getAll(
        `collections/v5?limit=${this.limit}&sortBy=${sortBy}`,
        this.search
      )
      .subscribe((response) => {
        this.trendingCollections = response?.collections;
        this.isLoading = false;
      });
  };

  sortByDay(value: string, day?: string) {
    this.sortBy = value;
    this.sortedDay = day || '7day';
    this.getTrendingCollections(this.sortBy);
  }

  changeChain(key: string, value: any) {
    this.selectedChain = key;
    this._settings.changeChainURL(key);
    this._settings.changeChainHeader(key);
    this.getTrendingCollections(this.sortBy, value);
    this.selectIcon();
  }

  selectIcon() {
    switch (this.selectedChain) {
      case 'ethereum':
        return (this.selectedIcon = 'ethIcon');
      case 'polygon':
        return (this.selectedIcon = 'polygonIcon');
      default:
        return (this.selectedIcon = 'ethIcon');
    }
  }
}

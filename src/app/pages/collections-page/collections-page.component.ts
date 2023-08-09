import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';

interface Chains {
  [key: string]: any;
  ethereum: number;
  polygon: number;
  // Arbitrum: number;
  // Optimism: number;
}

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
})
export class CollectionsPageComponent {
  trendingCollections: any = [];
  sort = {
    '1day': '1DayVolume',
    '7day': '7DayVolume',
    '30day': '30DayVolume',
    allTime: 'allTimeVolume',
  }; // [1DayVolume, 7DayVolume, 30DayVolume, allTimeVolume, createdAt, floorAskPrice]

  chains: Chains = {
    ethereum: 1,
    polygon: 137,
    // Arbitrum: 42161,
    // Optimism: 10,
  };

  selectedChain: any = 'ethereum';
  limit = 20;
  pagination: string = '';

  normalizeRoyalties = false;
  sortBy: string = this.sort['7day'];
  sortedDay: string = '7day';
  objectKeys = Object.keys;
  public collectionName: any;
  isLoading = false;
  loadMoreStatus = false;
  search = false;
  is_filter = false;
  defaultTab: any = 'collections';

  currencyAddress = '0x0000000000000000000000000000000000000000';

  constructor(
    private _crudService: CrudService,
    public _settings: SettingsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  openCollectionFilter() {
    this.is_filter == true ? (this.is_filter = false) : (this.is_filter = true);
    document
      .getElementById('c-list-wrapper')
      ?.classList.toggle('active-filter');
    document.getElementById('open-fliter')?.classList.toggle('active');
  }

  closeFilter(value: boolean) {
    this.is_filter = value;
  }

  ngOnInit() {
    this.sortedDay = '7day';

    this.getTrendingCollections(this.sortBy);

    this.collectionName = this.activatedRoute.snapshot.paramMap.get(`{chain}`);

    this.selectedChain = this.collectionName;
    this._settings.changeChainHeader(this.selectedChain);
  }

  getTrendingCollections = (sortBy?: string, chain?: any) => {
    let colectionUrl = `collections/v5?limit=${this.limit}&sortBy=${sortBy}`;
    if (this.loadMoreStatus) {
      colectionUrl = `collections/v5?limit=${this.limit}&sortBy=${sortBy}&continuation=${this.pagination}`;
    }
    this.isLoading = true;
    this._crudService
      .getAll(colectionUrl, this.search)
      .subscribe((response) => {
        if (this.loadMoreStatus) {
          this.trendingCollections = [
            ...this.trendingCollections,
            ...response?.collections,
          ];
        } else {
          this.trendingCollections = response.collections;
        }

        if (response?.continuation) {
          this.pagination = response?.continuation;
        }
        this.isLoading = false;
      });
  };

  loadMore(load = false) {
    this.loadMoreStatus = load;
    this.getTrendingCollections(this.sortBy);
  }

  sortByDay(data: { value: string; day?: string }) {
    this.sortBy = data?.value;
    this.sortedDay = data?.day || '7day';
    this.loadMoreStatus = false;
    this.getTrendingCollections(this.sortBy);
  }

  changeChain(key: string, value: any) {
    this.selectedChain = key;
    this._settings.changeChainURL(key);
    this._settings.changeChainHeader(key);
    this.loadMoreStatus = false;
    this.getTrendingCollections(this.sortBy, value);
  }

  goToPage(collectionId: string) {
    this.router.navigate(['collection/', this.selectedChain, collectionId]);
  }

  handleTabSelection(value: string): void {
    this.defaultTab = value;
  }

  sortByShortCut(value: any) {
    return value == '1DayVolume' ? '1D' : value == '7DayVolume' ? '1W' : value == '30DayVolume' ? '1M' : 'All';
  }
}

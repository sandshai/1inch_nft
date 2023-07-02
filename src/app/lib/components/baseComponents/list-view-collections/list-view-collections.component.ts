import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-list-view-collections',
  templateUrl: './list-view-collections.component.html',
})
export class ListViewCollectionsComponent {
  itemCollections: any = [];
  selectedChain: any = 'ethereum';
  formatChainAddress: any;
  daysAgo: any;
  public collectionName: any;
  public collectionId: any;
  tokenId: any;
  search = false;
  mobDeviceView: any;
  mdDeviceView: any;
  minAmount: any;
  maxAmount: any;
  paramValue: any;
  apiValues: any;
  filteredData: any;
  loadMoreStatus: boolean = false;
  pagination: string = '';

  constructor(
    private _crudService: CrudService,
    private _settings: SettingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private shared: SharedDataService
  ) {}

  ngOnInit() {
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('{id}');

    this.activatedRoute.queryParams.subscribe((params) => {
      this.minAmount = params['minPrice'];

      this.maxAmount = params['maxPrice'];

      if ((this.minAmount, this.maxAmount)) {
        let price = { min: this.minAmount, max: this.maxAmount };
        this.getItemCollections(undefined, price, undefined, undefined);
      }
    });

    this.collectionName =
      this.activatedRoute.snapshot.paramMap.get(`{{collection}}`);

    this.selectedChain = this.collectionName;
    this._settings.changeChainURL(this.selectedChain);

    this.shared.valueAdded.subscribe((data) => {
      if (data?.checked) {
        this.paramValue.push(data?.payLoad?.value);
        this.apiValues.push(data?.payLoad);

        this.getItemCollections(undefined, undefined, undefined, {
          attributes: this.apiValues,
        });
      } else {
        this.paramValue = this.paramValue.filter(
          (e: any) => e !== data?.payLoad?.value
        );
        this.apiValues = this.apiValues.filter(
          (e: any) => e?.value !== data?.payLoad.value
        );

        this.getItemCollections(undefined, undefined, undefined, {
          attributes: this.apiValues,
        });
      }
      this.router.navigate([], {
        queryParams: { attribute: this.paramValue },
      });
    });

    this.shared.filterPriceEvent.subscribe((data) => {
      this.filteredData = data;
      this.getItemCollections(undefined, undefined, data);
      this.router.navigate([], { queryParams: data });
    });

    this.shared.dataEvent.subscribe((data: any) => {
      if (data) {
        this.getItemCollections(data);
      }
    });

    this.getItemCollections();
    this.setListView();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setListView();
  }

  getItemCollections = (
    value?: string,
    price?: any,
    filterByPrice?: any,
    attributes?: any
  ) => {
    let url = `tokens/v6?collection=${this.collectionId}`;

    if (value) {
      url += `&tokenName=${value}`;
    }
    if (price) {
      url += `&minFloorAskPrice=${price.min}&maxFloorAskPrice=${price.max}`;
    }

    if (filterByPrice) {
      url += `&sortBy=${filterByPrice?.sortBy}&sortDirection=${filterByPrice?.sortDirection}`;
    }

    if (attributes) {
      for (let i = 0; i < attributes?.attributes?.length; i++) {
        url += `&attributes[${[attributes?.attributes[i]?.keyData]}]=${
          attributes?.attributes[i]?.value
        }`;
      }
    }

    this._crudService.getAll(url, this.search).subscribe((response) => {
      if (this.loadMoreStatus) {
        this.itemCollections = [...this.itemCollections, ...response?.tokens];
      } else {
        this.itemCollections = response?.tokens;
      }

      if (response?.continuation) {
        this.pagination = response?.continuation;
      } else {
        this.pagination = '';
      }
    });
  };

  formatAddress(address: string) {
    this.formatChainAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  }
  getDaysAgo(value: string) {
    const givenDate = new Date(value);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - givenDate.getTime();
    this.daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  goToPage(value: string) {
    this.router.navigate([
      `item`,
      this.collectionName,
      this.collectionId,
      value,
    ]);
  }

  setListView = () => {
    if (window.innerWidth > 767) {
      this.mobDeviceView = false;
      this.mdDeviceView = true;
    } else {
      this.mobDeviceView = true;
      this.mdDeviceView = false;
    }
  };

  loadMore(load = false) {
    this.loadMoreStatus = load;
    this.getItemCollections();
  }
}

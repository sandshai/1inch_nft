import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { ClipboardService } from 'ngx-clipboard';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { ChangeDetectorRef } from '@angular/core';
declare var bootstrap: any;

interface Categories {
  [key: string]: any;
  'Price low to high': any;
  'Price high to low': any;
  'Rare to common': any;
  'Common to rare': any;
}

interface DefaultRouteObject {
  key: string[];
}
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private _crudService: CrudService,
    private _settings: SettingsService,
    private clipboardService: ClipboardService,
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public collectionId: any;
  public collectionName: any;
  public formatChainAddress: string = '';

  collectionDetails: any = [];
  setCollectionBannerImage: any;
  selectedChain: any = 'ethereum';
  isLoading = false;
  isCopied: boolean = false;
  header = false;
  minPrice: any;
  maxPrice: any;
  inputValue: any;
  paramValue: any = [];
  is_filter: boolean = false;
  is_analytics: boolean = true;
  gridClassName: string = '';
  searchResult: any = [];
  uniqueHolders: any = '';
  isExpanded = true;
  paramValues: any;
  paramValueList: any = [];
  apiValues: any = [];
  routeDataList: any = [];
  keys: any;
  values: any = [];
  defaultRouteList: any = {};
  data: DefaultRouteObject[] = [];
  is_sweep: boolean = false;

  categories: Categories = {
    'Price low to high': { sortBy: 'floorAskPrice', sortDirection: 'asc' },
    'Price high to low': { sortBy: 'floorAskPrice', sortDirection: 'desc' },
    'Rare to common': { sortBy: 'rarity', sortDirection: 'asc' },
    'Common to rare': { sortBy: 'rarity', sortDirection: 'desc' },
  };

  objectKeys = Object.keys;
  category: any = 'Price low to high';
  categoryValue: any = this.categories['Price low to high'];

  public getScreenWidth: any;
  public getScreenHeight: any;

  layoutactive = {
    listlogout: 'listlogout',
    '4layout': 'fourlayout',
  };

  active: string = this.layoutactive['4layout'];

  ngOnInit() {
    document.querySelector('body')?.classList.add('sweep-body-padding');
    this.sortByDay(this.active);

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.collectionId = this.activatedRoute.snapshot.paramMap.get('{id}');

    // if (this.activatedRoute.snapshot.paramMap.get('{id}')) {
    //   this.getCollectionDetails(
    //     this.activatedRoute.snapshot.paramMap.get('{id}')
    //   );
    // }

    this.getCollectionDetails();

    this.collectionName =
      this.activatedRoute.snapshot.paramMap.get(`{{collection}}`);

    this.selectedChain = this.collectionName;
    this._settings.changeChainURL(this.selectedChain);

    if (this.categoryValue) {
      this.shared.filterPriceEvent.emit(this.categoryValue);
    }

    this.activatedRoute.queryParams.subscribe((params) => {
      this.paramValues = params;
      if (this.paramValues?.sortBy) {
        const matchedKeys = Object.keys(this.categories).filter((key) => {
          const value = this.categories[key];
          return (
            value.sortBy === this.paramValues?.sortBy &&
            value.sortDirection === this.paramValues?.sortDirection
          );
        });
        this.category = matchedKeys.join();
      }
    });

    this.gridChangeFunc();

    if (window.innerWidth > 1199) {
      this.is_analytics = true;
      this.is_filter = false;
    } else {
      this.is_analytics = false;
      this.is_filter = false;
    }

    this.shared.valueAdded.subscribe((data) => {
      if (data?.checked) {
        this.paramValueList.push(data?.payLoad?.value);

        this.apiValues.push(data?.payLoad);

        const filteredData = this.apiValues.filter((obj: any) => obj?.checked);
        const result = filteredData.reduce((acc: any, obj: any) => {
          if (!acc[obj.keyData]) {
            acc[obj.keyData] = [];
          }
          acc[obj.keyData].push(obj.value);

          return acc;
        }, {});

        this.routeDataList = result;

        this.keys = Object.keys(this.routeDataList);

        this.values = Object.values(this.routeDataList);

        this.appendValuesToRoutePath(result);
      } else {
        this.paramValue = this.paramValue.filter(
          (e: any) => e !== data?.payLoad?.value
        );
        this.apiValues = this.apiValues.filter(
          (e: any) => e?.value !== data?.payLoad.value
        );

        this.routeDataList[data?.payLoad?.keyData] = this.routeDataList[
          data?.payLoad?.keyData
        ].filter((e: any) => e !== data?.payLoad?.value);

        if (this.routeDataList[data?.payLoad?.keyData].length == 0) {
          delete this.routeDataList[data?.payLoad.keyData];

          this.keys = Object.keys(this.routeDataList);

          this.values = Object.values(this.routeDataList);

          this.appendValuesToRoutePath(this.routeDataList);
        }

        this.appendValuesToRoutePath(this.routeDataList);
      }
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.defaultRouteList = params;
    });

    Object.entries(this.defaultRouteList).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const valuesArray = value.split(',');

        console.log(valuesArray, 'valuesArray');
        this.defaultRouteList[key] = valuesArray;
      }
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('sweep-body-padding');
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth > 1199) {
      this.is_analytics = true;
      this.is_filter = false;
    } else {
      this.is_analytics = false;
      this.is_filter = false;
    }
    this.gridChangeFunc();
  }

  sortByDay(value: string) {
    this.active = value;
  }

  opensweep() {
    this.is_sweep ? this.is_sweep = false : this.is_sweep = true;
    let array: any = [];
    this.passedArrayList(array);
    this.shared.setSliderInput.emit(0);
  }

  closeSweep(val: boolean) {
    this.is_sweep = val;
  }
  getCollectionDetails(value?: any) {
    this.isLoading = true;
    this._crudService
      .getAll(`collections/v5?id=${this.collectionId}`, this.header)
      .subscribe((response) => {
        this.collectionDetails = response.collections;
        this.setBannerImage(this.collectionDetails[0]);
        this.formatAddress(this.collectionDetails[0]?.id);
        this.calculateUniqueHolders();
        this.isLoading = false;
      });
  }

  goToSocialPage(value?: string) {
    value && window.open(value);
  }

  goToExternalPage(value?: string) {
    value && window.open(value);
  }

  goToAddressPage(value: string) {
    if (value) {
      if (this.selectedChain === 'ethereum') {
        let link = `https://etherscan.io/address`;
        window.open(`${link}/${value}`);
      }
      if (this.selectedChain === 'polygon') {
        let link = `https://polygonscan.com/address`;
        window.open(`${link}/${value}`);
      }
    }
  }

  formatAddress(address: string) {
    this.formatChainAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  copyToClipboard(content: string) {
    this.clipboardService.copyFromContent(content);
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 2000);
  }

  getValue(value: string) {
    this.inputValue = value;
    this.shared.dataEvent.emit(value);
  }

  onlyNumbersAllowed(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sortByCategory(key: string, value?: any) {
    this.category = key;
    this.categoryValue = value;
    this.shared.filterPriceEvent.emit(value);
    if (key) {
      this.inputValue = '';
    }
  }

  gridChangeFunc() {
    if (window.innerWidth > 1199) {
      if (this.is_filter === true && this.is_analytics === true) {
        this.gridClassName = 'grid-layout-3';
      } else if (this.is_filter === false && this.is_analytics === true) {
        this.gridClassName = 'grid-layout-4';
      } else if (this.is_filter === true && this.is_analytics === false) {
        this.gridClassName = 'grid-layout-4';
      } else if (this.is_filter === false && this.is_analytics === false) {
        this.gridClassName = 'grid-layout-5';
      }
    }
  }

  closeAnalyticsTab() {
    this.is_analytics = false;
    this.gridChangeFunc();
  }

  openAnalyticsTab(val?: boolean) {
    this.is_analytics = val ? val : true;
    this.gridChangeFunc();
  }

  closeFilterFunc(val: boolean) {
    this.is_filter = val;
  }

  openFilterTab() {
    this.is_filter === true ? this.is_filter = false : this.is_filter = true;
    this.gridChangeFunc();
  }
  receiveMessage(value: string) {
    this.searchResult = value;
  }

  calculateUniqueHolders() {
    let result;
    result =
      (this.collectionDetails[0]?.ownerCount /
        this.collectionDetails[0]?.tokenCount) *
      100;
    this.uniqueHolders = result.toFixed(2);
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  removeFilterList(value?: string) {
    this.apiValues = this.apiValues.filter(
      (list: any) => list?.value !== value
    );
    this.appendValuesToRoutePath(this.apiValues);
  }

  removeFilterListAll() {
    this.apiValues = [];
  }

  appendValuesToRoutePath(result: any) {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    let currentParams = { ...currentUrlTree.queryParams }; // Preserve the existing query parameters

    if (Object.keys(result).length !== 0)
      for (const key in result) {
        if (result.hasOwnProperty(key)) {
          const values = result[key];
          currentParams[key] = values.join(','); // Join the values array with a delimiter if needed
        }
      }
    else currentParams = {};

    const navigationExtras: NavigationExtras = {
      queryParams: currentParams,
    };

    this.router.navigate([], navigationExtras);
  }

  setBannerImage(val: any) {
    this.setCollectionBannerImage = val?.banner ? val.banner : val?.image;
  }

  passedArrayList(value: any) {
    this.shared.setSliderList(value);
  }
}

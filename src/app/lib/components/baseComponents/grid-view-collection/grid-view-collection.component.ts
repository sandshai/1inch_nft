import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-grid-view-collection',
  templateUrl: './grid-view-collection.component.html',
})
export class GridViewCollectionComponent {
  @Input() className: string | undefined;
  itemCollections: any = [];

  selectedChain: any = 'ethereum';

  public collectionName: any;
  public collectionId: any;
  search = false;
  selectedItem: string = '';
  filteredData: any;
  sortBy: string = 'floorAskPrice';
  sortDirection: string = 'asc';
  paramValue: any = [];
  attributes: any;
  apiValues: any = [];
  minAmount: any;
  maxAmount: any;
  pagination: string = '';
  loadMoreStatus: any;
  selectedList: any;

  @Output() messageEvent = new EventEmitter<any>();
  @Output() arrayListEvent = new EventEmitter<string[]>();

  constructor(
    private _crudService: CrudService,
    private _settings: SettingsService,
    private activatedRoute: ActivatedRoute,
    private shared: SharedDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('{id}');

    this.activatedRoute.queryParams.subscribe((params) => {
      this.minAmount = params['minPrice'];

      this.maxAmount = params['maxPrice'];

      if ((this.minAmount, this.maxAmount)) {
        let price = { min: this.minAmount, max: this.maxAmount };
        this.getItemCollections(
          undefined,
          price,
          undefined,
          undefined,
          undefined
        );
      }
    });

    this.shared.getSliderArrayList().subscribe((array) => {
      this.selectedList = array;
      this.handleCheckEvent(this.selectedList);
    });
    this.collectionName =
      this.activatedRoute.snapshot.paramMap.get(`{{collection}}`);

    this.selectedChain = this.collectionName;

    this._settings.changeChainURL(this.selectedChain);

    this.shared.valueAdded.subscribe((data) => {
      if (data?.checked) {
        this.paramValue.push(data?.payLoad?.value);
        this.apiValues.push(data?.payLoad);

        this.getItemCollections(undefined, undefined, undefined, undefined, {
          attributes: this.apiValues,
        });
      } else {
        this.paramValue = this.paramValue.filter(
          (e: any) => e !== data?.payLoad?.value
        );
        this.apiValues = this.apiValues.filter(
          (e: any) => e?.value !== data?.payLoad.value
        );

        this.getItemCollections(undefined, undefined, undefined, undefined, {
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

    this.shared.dataEvent.subscribe((data: any = '') => {
      this.getItemCollections(data);
    });

    this.getItemCollections();
  }

  handleCheckEvent(value: any) {
    const result = this.itemCollections?.filter((list: any) =>
      value?.includes(list)
    );
    this.selectedList = result;
  }

  getItemCollections = (
    value?: string,
    price?: any,
    filterByPrice?: any,
    filterByRarity?: any,
    attributes?: any
  ) => {
    let url = `tokens/v6?collection=${this.collectionId}`;
    if (this.loadMoreStatus) {
      if (this.pagination) {
        url = `tokens/v6?collection=${this.collectionId}&continuation=${this.pagination}`;
      } else {
        url = `tokens/v6?collection=${this.collectionId}`;
      }
    }
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
      for (let i = 0; i < attributes?.attributes?.length; i++)
        url += `&attributes[${[attributes?.attributes[i]?.keyData]}]=${
          attributes?.attributes[i]?.value
        }`;
    }

    this._crudService.getAll(url, this.search).subscribe((response) => {
      if (this.loadMoreStatus) {
        if (value) {
          this.itemCollections = response?.tokens;
          this.messageEvent.emit(this.itemCollections?.length);
          this.passArrayList(this.itemCollections);
        } else {
          this.itemCollections = [...this.itemCollections, ...response?.tokens];
          this.messageEvent.emit(this.itemCollections?.length);
          this.passArrayList(this.itemCollections);
        }
      } else {
        this.itemCollections = response?.tokens;
        this.messageEvent.emit(this.itemCollections?.length);
        this.passArrayList(this.itemCollections);
      }

      if (response?.continuation) {
        this.pagination = response?.continuation;
      } else {
        this.pagination = '';
      }
    });
  };

  loadMore(load = false) {
    this.loadMoreStatus = load;
    this.getItemCollections();
  }

  passArrayList(value: any): void {
    this.shared.setList(value);
  }
}

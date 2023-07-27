import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  SimpleChanges,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
// import { isAddress as isViemAddress } from 'viem';

interface ApiPayloadValues {
  name: string;
  limit: number;
}
@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
})
export class HeaderSearchComponent {
  collectionName: any;
  isLoading = false;
  recentCollectionList: any = [];
  searchResults: any = [];
  firstSearch: any;
  secondSearch: any;
  ethData: any = [];
  polygonData: any = [];
  totalValues: any = [];
  ethWalletData: any = [];
  polyWalletData: any = [];
  walletTotalData: any = [];
  hideContent: boolean = false;
  isOpen: boolean = false;

  chains: any[] = [
    {
      baseUrl: 'https://api.reservoir.tools',
      apiKey: 'bb7ce436-9058-5592-87ad-f0e61ffa0de6',
      chainName: 'ethereum',
    },
    {
      baseUrl: 'https://api-polygon.reservoir.tools',
      apiKey: '90483aa0-4ca2-500b-8255-82c58ee7faa2',
      chainName: 'polygon',
    },
    // {
    //   baseUrl: 'https://api-arbitrum.reservoir.tools',
    //   apiKey: 'ea3f6774-b980-5397-ae20-4471e9e8ceac',
    //   chainName: 'arbitrum',
    // },
    // {
    //   baseUrl: 'https://api-optimism.reservoir.tools',
    //   apiKey: '3dc9e4d0-d031-5d52-a3b1-ce7a8b029e6a',
    //   chainName: 'optimism',
    // },
  ];

  queryParams: ApiPayloadValues = {
    name: '',
    limit: 5,
  };

  constructor(
    private _crudService: CrudService,
    private _settings: SettingsService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private eRef: ElementRef
  ) {}

  @Output() closeDialog = new EventEmitter<boolean>();

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    const clickedInside = this.eRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      // this.closeDialog.emit();
      this.isOpen = false;
    }
  }

  onCloseClick() {
    this.closeDialog.emit(false);
  }

  removesearchhistory() {
    this.isOpen = false;
  }

  opensearchhistory(event?: any) {
    // document.getElementById('search-wrapper')?.classList.add('open__history');
    this.isOpen = true;
  }

  ngOnInit() {
    let value = 'recent';
    const list = this.retrieveValue(value);
    if (list) {
      this.recentCollectionList = [...this.recentCollectionList, list];
    }
    this.cdr.detectChanges();
  }

  getValue(val: string) {
    this.collectionName = val;
    if (this.collectionName) {
      this.opensearchhistory();
    }

    this.queryParams = { ...this.queryParams, name: this.collectionName };
    if (val?.length === 0) {
      if (this.recentCollectionList?.length === 0) {
        this.removesearchhistory();
      }
      this.hideContent = false;
      this.cdr.detectChanges();
      this.searchResults = [];
    }
    if (this.collectionName) {
      if (this.checkStrings(this.collectionName)) {
        this.chains.forEach((list: any) => {
          const { baseUrl, apiKey, chainName } = list;
          const headers = {
            headers: {
              'x-api-key': apiKey || '',
            },
          };

          let limit = 6;
          const arr: any = [];
          this.firstSearch = this.getFirstData(
            baseUrl,
            this.collectionName,
            limit,
            headers
          );

          const promises = [this.firstSearch];

          Promise.allSettled(promises).then((results) => {
            results.forEach((result) => {
              if (result?.status === 'fulfilled') {
                this.isLoading = false;

                if (chainName === 'ethereum') {
                  this.ethData = [];
                }
                if (chainName === 'polygon') {
                  this.polygonData = [];
                }

                const data = result?.value.collections.map(
                  (collections: any) => {
                    let data;
                    data = { ...collections, chain: chainName };
                    if (chainName === 'ethereum') {
                      this.ethData.push(data);
                    }
                    if (chainName === 'polygon') {
                      this.polygonData.push(data);
                    }
                  }
                );
                this.totalValues = [...this?.ethData, ...this.polygonData];
              }
              this.searchResults = this.totalValues.slice(0, 8);
            });
          });
        });
      }

      let address = this.contractAddressValidation(this.collectionName);

      if (address) {
        this.chains.forEach((list: any) => {
          const { baseUrl, apiKey, chainName } = list;
          const headers = {
            headers: {
              'x-api-key': apiKey || '',
            },
          };
          let limit = 6;
          this.secondSearch = this.getSecondData(
            baseUrl,
            this.collectionName,
            limit,
            headers
          );
          const arr: any = [];

          const promises = [this.secondSearch];

          Promise.allSettled(promises).then((results) => {
            results.forEach((result) => {
              if (result?.status === 'fulfilled') {
                this.isLoading = false;
                if (chainName === 'ethereum') {
                  this.ethWalletData = [];
                }
                if (chainName === 'polygon') {
                  this.polyWalletData = [];
                }
                const data = result?.value.collections.map(
                  (collections: any) => {
                    let data;
                    data = {
                      ...collections,
                      chain: chainName,
                      floorAskPrice:
                        collections?.floorAsk?.price?.amount?.decimal,
                      collectionId: collections?.id,
                    };
                    if (chainName === 'ethereum') {
                      this.ethWalletData.push(data);
                    }
                    if (chainName === 'polygon') {
                      this.polyWalletData.push(data);
                    }
                  }
                );
                this.walletTotalData = [
                  ...this.ethWalletData,
                  ...this.polyWalletData,
                ];
              }
              this.searchResults = this.walletTotalData;
            });
          });
        });
      }
    }
  }

  pageReload(collection: string, id: string, list?: any) {
    let key = 'recent';

    if (list) {
      this.storeValue(key, list);

      let recentValues = this.retrieveValue(key);
      this.hideContent = true;
      this.recentCollectionList.push(recentValues);
      this.removesearchhistory();
    }

    this.collectionName = '';

    this.router.navigate([`collection`, collection, id]);
    setTimeout(() => window.location.reload(), 500);
  }

  getFirstData(
    value?: any,
    query?: any,
    limit?: number,
    headers?: any
  ): Promise<any> {
    this.isLoading = true;
    return this.http
      .get(
        `${value}/search/collections/v1?name=${query}&limit=${limit}`,
        headers
      )
      .toPromise();
  }

  getSecondData(
    value?: any,
    query?: any,
    limit?: number,
    headers?: any
  ): Promise<any> {
    this.isLoading = true;
    return this.http
      .get(`${value}/collections/v5?contract=${query}&limit=${limit}`, headers)
      .toPromise();
  }

  contractAddressValidation(address: string) {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
  }

  checkStrings(value: string) {
    const regex = /^[A-Za-z]+$/;
    return regex.test(value);
  }

  storeValue(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  retrieveValue(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}

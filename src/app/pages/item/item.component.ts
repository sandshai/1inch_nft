import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { _Data1, _Data4 } from '@reservoir0x/reservoir-sdk';
import { TradeSdk } from 'src/app/lib/components/baseComponents/trade/trade-sdk.component';

interface Types {
  [key: string]: any;
  '1 day': number;
  '3 days': number;
  '7 days': number;
  '1 month': number;
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemComponent {
  constructor(
    private _crudService: CrudService,
    public _settings: SettingsService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef
  ) {}

  itemDetails: any = [];
  activityDetails: any = [];
  selectedChain: any = 'ethereum';
  activityType: any = 'sale';
  formatChainAddress: string = '';
  hasData: boolean = true;
  search = false;
  imageUrl: string = '';
  is_preview: boolean = false;
  loadMoreStatus: any;
  pagination: string = '';
  dateFormat: Date = new Date();
  creatorEarnings: any;
  ownerAddress: any;
  externalUrl: string = '';
  makeOfferPopup: boolean = false;
  externalUrlLink: any;
  selectedIcon: any;
  address: any;
  id: any;
  nftName: any;
  nftImage: any;
  inputValue: any = null;
  type: any;
  nftAmount: any;
  objectKeys = Object.keys;
  nftExpiryTime: any;
  bidErrorMessage: any;
  buyErrorMessage: any = '';
  kindOfNft: any;

  types: Types = {
    '1 day': 1,
    '3 days': 3,
    '7 days': 7,
    '1 month': 30,
  };
  selectedItem: any = '1 day';

  public collectionId: any;
  public collectionName: any;
  public tokenId: any;
  public mobDeviceImage: any;
  public mdDeviceImage: any;

  ngOnInit() {
    document.querySelector('body')?.classList.add('nft-page-bottom-padding');
    if (this.selectedItem === '1 day') {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      this.nftExpiryTime = new Date(date).getTime() / 1000;
      this.handleExpireTime(this.nftExpiryTime);
    }

    this.shared.nftDetails.subscribe((data) => {
      this.address = data?.address;
      this.id = data?.id;
      this.nftName = data?.name;
      this.nftImage = data?.image;
      this.type = data?.method;
      this.nftAmount = data?.amount;
    });

    this.shared.externalUrl.subscribe((data) => {
      this.externalUrlLink = data;
    });

    this.shared.getChain();

    this.cdr.detectChanges();

    this.collectionId =
      this.activatedRoute.snapshot.paramMap.get('{collectionId}');

    this.collectionName =
      this.activatedRoute.snapshot.paramMap.get(`{{collection}}`);

    this.tokenId = this.activatedRoute.snapshot.paramMap.get(`{tokenId}`);
    this.selectedChain = this.collectionName;
    this._settings.changeChainURL(this.selectedChain);

    this.getItemDetails();
    this.getTokenActivity(this.activityType);
    this.formatAddress(this.collectionId);
    this.setProfileImageBasedOnImage();

    this.shared.openMakeOfferPopup.subscribe((data) => {
      this.makeOfferPopup = data;
    });
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('nft-page-bottom-padding');
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setProfileImageBasedOnImage();
  }

  setProfileImageBasedOnImage = () => {
    if (window.innerWidth > 766) {
      this.mobDeviceImage = false;
      this.mdDeviceImage = true;
    } else {
      this.mobDeviceImage = true;
      this.mdDeviceImage = false;
    }
  };

  getItemDetails = (sortBy?: string, chain?: any) => {
    let attributes = true;
    this._crudService
      .getAll(
        `tokens/v6?tokens=${this.collectionId}:${
          this.tokenId
        }&includeAttributes=${attributes}&includeDynamicPricing=${true}&includeTopBid=${true}&includeLastSale=${true}`,
        this.search
      )
      .subscribe((response) => {
        this.itemDetails = response?.tokens;

        this.setMarketPlaceIcon(this.itemDetails[0]);
        this.kindOfNft = response?.tokens[0]?.token?.kind;

        this.formatAddress(response?.tokens[0]?.token?.owner, 'owner');
        if (response?.tokens[0]?.market?.topBid?.feeBreakdown) {
          this.creatorEarnings =
            response?.tokens[0]?.market?.topBid?.feeBreakdown[0]?.bps / 100;
        }

        this.dateFormat = new Date(
          this.itemDetails[0]?.token?.lastSale?.timestamp * 1000
        );
      });
  };

  receiveMessage(message: string) {
    this.activityType = message;
    this.getTokenActivity(message);
  }

  getTokenActivity = (activity: string) => {
    let url = `tokens/${this.collectionId}:${this.tokenId}/activity/v5?types=${activity}`;
    if (this.loadMoreStatus) {
      url = `tokens/${this.collectionId}:${this.tokenId}/activity/v5?types=${activity}&continuation=${this.pagination}`;
    }
    this._crudService.getAll(url, this.search).subscribe((response) => {
      if (this.loadMoreStatus) {
        this.activityDetails = [
          ...this.activityDetails,
          ...response.activities,
        ];
      } else {
        this.activityDetails = response.activities;
      }

      if (response?.continuation) {
        this.pagination = response?.continuation;
      } else {
        this.pagination = '';
      }

      if (response?.length > 0) {
        this.hasData = false;
      } else {
        this.hasData = true;
      }
    });
  };

  receiveLoadMoreStatus(message: string) {
    this.loadMoreStatus = message;
    if (this.loadMoreStatus) {
      this.getTokenActivity(this.activityType);
    }
  }

  formatAddress(address: string, type?: string) {
    this.formatChainAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
    if (type === 'owner') {
      this.ownerAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
  }

  goToPreviousPage(collection: string, id: string) {
    this.router.navigate([`collection`, collection, id]);
  }

  previewFun(url: string) {
    this.is_preview = true;
    this.imageUrl = url;
  }

  closePreviewWarpper(value: boolean) {
    this.is_preview = value;
  }

  downloadImage(cdnUrl: string, nftName: any) {
    const filename = nftName + '_nft.png';
    fetch(cdnUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        link.click();
        URL.revokeObjectURL(blobUrl);
      });
  }

  handleAddressNavigation() {
    if (this.selectedChain === 'ethereum') {
      let link = 'https://etherscan.io/token/';
      window.open(`${link}/${this.collectionId}?a=${this.tokenId}`);
    }
    if (this.selectedChain === 'polygon') {
      let link = 'https://polygonscan.com/token/';
      window.open(`${link}/${this.collectionId}?a=${this.tokenId}`);
    }
  }

  goToExternalPage(): void {
    window.open(this.externalUrlLink, '_blank');
  }
  closeMakeOfferPopup() {
    document.querySelector('body')?.classList.remove('overflow-hidden');
    this.shared.openMakeOfferPopup.emit(false);
    this.buyErrorMessage = '';
  }

  setMarketPlaceIcon(item: any) {
    let name = item?.market?.floorAsk?.source?.name;

    switch (name) {
      case 'OpenSea':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'opensea.svg',
        };
        break;
      case 'blur.io':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'blur.svg',
        };
        break;
      case 'LooksRare':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'looksrare.svg',
        };
        break;
      case 'X2Y2':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'x2y2.svg',
        };
        break;
      case 'rarible':
        this.selectedIcon = {
          iconStatus: 'image',
          iconLink: 'rarible.svg',
        };
        break;
      default:
        this.selectedIcon = {
          iconStatus: 'cdn',
          iconLink: item?.market?.floorAsk?.source?.icon,
        };
        break;
    }
  }
  async placeBid(amount?: any) {
    const tradeClient: TradeSdk = this.shared.getTradeClient();
    const chain = this.shared.getChain();

    if (tradeClient) {
      let data = {
        bids: [
          {
            token: `${this.address}:${this.id}`,
            weiPrice: `${amount * 10 ** chain?.nativeCurrency.decimals}`,
            expirationTime: `${Math.round(this.nftExpiryTime)}`,
          },
        ],
      } as _Data4;

      let response = await tradeClient?.placeBid(data);
      if (response) {
        this.shared.openMakeOfferPopup.emit(false);
      } else {
        this.bidErrorMessage = 'Unable to proceed the Transaction';
      }
    }
  }

  async buyToken() {
    let tradeClient = this.shared.getTradeClient();
    if (tradeClient) {
      let data = {
        items: [
          {
            token: `${this.address}:${this.id}`,
            quantity: 1,
            fillType: 'trade',
          },
        ],
      } as _Data1;
      let response = await tradeClient?.buyNft(data);
      if (response) {
        this.shared.openMakeOfferPopup.emit(false);
      } else {
        this.buyErrorMessage = 'Unable to proceed the Transaction';
      }
    }
  }

  onInputChange(event: any): void {
    const value = event.target.value;
    this.inputValue = value;
  }

  sendDates(value: any) {
    this.selectedItem = value;

    let expiryTime;
    if (value === '1 day') {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      expiryTime = new Date(date).getTime() / 1000;
    } else if (value === '3 days') {
      let date = new Date();
      date.setDate(date.getDate() + 3);
      expiryTime = new Date(date).getTime() / 1000;
    } else if (value === '7 days') {
      let date = new Date();
      date.setDate(date.getDate() + 7);
      expiryTime = new Date(date).getTime() / 1000;
    } else if (value === '1 month') {
      let date = new Date();
      date.setDate(date.getDate() + 30);
      expiryTime = new Date(date).getTime() / 1000;
    }

    this.nftExpiryTime = expiryTime;

    // this.handleExpireTime(expiryTime);
  }

  handleExpireTime(value: any) {
    let finalDate;
    finalDate = value * 1000;
    const finalResult = new Date(finalDate);

    return finalResult;
  }
}

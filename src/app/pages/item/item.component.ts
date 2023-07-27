import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemComponent {
  constructor(
    private _crudService: CrudService,
    public _settings: SettingsService,
    public activatedRoute: ActivatedRoute,
    private router: Router
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

  public collectionId: any;
  public collectionName: any;
  public tokenId: any;
  public mobDeviceImage: any;
  public mdDeviceImage: any;

  ngOnInit() {
    document.querySelector('body')?.classList.add('nft-page-bottom-padding');

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

  formatAddress(address: string) {
    this.formatChainAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  goToPreviousPage(collection: string, id: string) {
    this.router.navigate([`collection`, collection, id]);
  }

  previewFun(url: string) {
    console.log('parent url', url);
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
}

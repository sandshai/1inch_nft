import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
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

  public collectionId: any;
  public collectionName: any;
  public tokenId: any;
  public mobDeviceImage: any;
  public mdDeviceImage: any;

  ngOnInit() {
    // this.getScreenWidth = window.innerWidth;

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

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setProfileImageBasedOnImage();
  }

  setProfileImageBasedOnImage = () => {
    if (window.innerWidth > 767) {
      this.mobDeviceImage = false;
      this.mdDeviceImage = true;
    } else {
      this.mobDeviceImage = true;
      this.mdDeviceImage = false;
    }
  };

  getItemDetails = (sortBy?: string, chain?: any) => {
    this._crudService
      .getAll(
        `tokens/v6?tokens=${this.collectionId}:${this.tokenId}`,
        this.search
      )
      .subscribe((response) => {
        this.itemDetails = response?.tokens;
      });
  };

  receiveMessage(message: string) {
    this.activityType = message;
    this.getTokenActivity(message);
  }

  getTokenActivity = (activity: string, chain?: any) => {
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
    this.getTokenActivity(this.activityType);
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
}
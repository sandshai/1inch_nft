import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-user-profile-offer-tab',
  templateUrl: './user-profile-offer-tab.component.html',
})
export class UserProfileOfferTabComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private _crudService: CrudService,
    private shared: SharedDataService,
    private _settings: SettingsService
  ) {}
  filterData: any = {
    tabName: 'offers',
    Chains: {
      key: 'Chains',
      value: [
        {
          label: 'Ethereum',
          count: 140,
          is_checked: false,
        },
        {
          label: 'Polygon',
          count: 140,
          is_checked: false,
        },
      ],
    },
  };

  filterIsOpen: boolean | undefined;
  header: boolean = false;
  userAddress: any;
  walletChain: any;
  selectedChain: string = 'ethereum';
  userOfferDetails: any;
  userOfferContinuation: string = '';

  ngOnInit() {
    this.cdr.detectChanges();
    this.filterLayout();
    this.userAddress = this.shared.getValue();
    this.shared.getWallet();

    this.shared.walletEvent.subscribe((data) => {
      this.walletChain = data?.wallet?.chain?.name;
      if (this.walletChain === 'Polygon') {
        this.selectedChain = 'polygon';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserOfferDetails();
      } else if (this.walletChain === 'Ethereum') {
        this.selectedChain = 'ethereum;';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserOfferDetails();
      }
    });

    if (!this.walletChain) {
      this.getUserOfferDetails();
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.filterLayout();
    this.toggleBodyScroll();
  }
  filterLayout() {
    if (window.innerWidth > 1199) {
      this.filterIsOpen = true;
    } else {
      this.filterIsOpen = false;
    }
  }
  filterEvent(value: boolean) {
    this.filterIsOpen = value;
    this.toggleBodyScroll();
  }

  closePopup(value: boolean) {
    this.filterIsOpen = value;
    this.toggleBodyScroll();
  }

  private toggleBodyScroll() {
    const isMobileScreen = window.innerWidth < 992; // Adjust the width as per your requirement
    document.body.style.overflow =
      isMobileScreen && this.filterIsOpen ? 'hidden' : '';
  }

  getUserOfferDetails(load?: boolean) {
    let url = `orders/bids/v5?maker=${
      this.userAddress
    }&includeCriteriaMetadata=${true}&includeRawData=${true}&normalizeRoyalties=${false}`;
    if (this.userOfferContinuation) {
      url = `orders/bids/v5?maker=${this.userAddress}&continuation=${this.userOfferContinuation}`;
    }
    this._crudService.getAll(url, this.header).subscribe((response) => {
      if (load) {
        this.userOfferDetails = [...this.userOfferDetails, ...response?.orders];
      } else {
        this.userOfferDetails = response?.orders;
      }

      if (response?.continuation) {
        this.userOfferContinuation = response?.continuation;
      } else {
        this.userOfferContinuation = '';
      }
    });
  }

  handleLoadMore(load = false) {
    if (load) {
      this.getUserOfferDetails(load);
    }
  }

  getCheckBoxEvent(data: any) {
    if (data === 'Ethereum') {
      this.selectedChain = 'ethereum';
      this._settings.changeChainURL(this.selectedChain);
      this.getUserOfferDetails();
    }
    if (data === 'Polygon') {
      this.selectedChain = 'polygon';
      this._settings.changeChainURL(this.selectedChain);
      this.getUserOfferDetails();
    }
    if (!data) {
      let getChain;

      getChain = this.shared.getChain();

      this.selectedChain = getChain.name.toString().toLowerCase();

      if (getChain.name.toString().toLowerCase() === 'polygon') {
        this.selectedChain = 'polygon';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserOfferDetails();
      } else {
        this.selectedChain = 'ethereum';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserOfferDetails();
      }
    }
  }
}

import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-user-profile-activity-tab',
  templateUrl: './user-profile-activity-tab.component.html',
})
export class UserProfileActivityTabComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private _crudService: CrudService,
    private shared: SharedDataService,
    private _settings: SettingsService
  ) {}

  header: boolean = false;
  userAddress: any;
  chain: string = '';
  selectedChain: string = '';
  activityDetails: any;
  continuation: any;
  filterData: any = {
    tabName: 'activity',
    Transaction: {
      key: 'Transaction',
      value: [
        {
          label: 'Bought',
          is_checked: false,
        },
        {
          label: 'Sold',
          is_checked: false,
        },
        {
          label: 'Transfered',
          is_checked: false,
        },
        {
          label: 'Listed',
          is_checked: false,
        },
        {
          label: 'Minted',
          is_checked: false,
        },
      ],
    },
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
  type: string = 'sale';

  ngOnInit() {
    this.cdr.detectChanges();
    this.filterLayout();
    this.userAddress = this.shared.getValue();
    this.shared.walletEvent.subscribe((data) => {
      this.chain = data?.wallet?.chain?.name;
      this.shared.selectedChain.emit(this.chain);
      if (this.chain === 'Polygon') {
        this.selectedChain = 'polygon';
        this._settings.changeChainURL(this.selectedChain);
        this.getOurOwnActivityDetails();
      } else if (this.chain === 'Ethereum') {
        this.selectedChain = 'ethereum';
        this._settings.changeChainURL(this.selectedChain);
        this.getOurOwnActivityDetails();
      }
    });

    if (!this.chain) {
      this.getOurOwnActivityDetails();
    }
    this.cdr.detectChanges();
    // this.getOurOwnActivityDetails();
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

  getOurOwnActivityDetails(load?: boolean) {
    let url = `users/activity/v6?limit=${20}&types=${this.type}&users=${
      this.userAddress
    }`;
    if (this.continuation) {
      url = `users/activity/v6?limit=${20}&types=${this.type}&users=${
        this.userAddress
      }&continuation=${this.continuation}`;
    }
    this._crudService.getAll(url, this.header).subscribe((res) => {
      if (load) {
        this.activityDetails = [...this.activityDetails, ...res?.activities];
      } else {
        this.activityDetails = res?.activities;
      }

      if (res?.continuation) {
        this.continuation = res?.continuation;
      } else {
        this.continuation = '';
      }
    });
  }

  handleLoadMore(load = false) {
    if (load) {
      this.getOurOwnActivityDetails(load);
    }
  }

  getCheckBoxEvent(data: any) {
    if (data === 'Ethereum') {
      this.selectedChain = 'ethereum';
      this._settings.changeChainURL(this.selectedChain);
      this.getOurOwnActivityDetails();
    }
    if (data === 'Polygon') {
      this.selectedChain = 'polygon';
      this._settings.changeChainURL(this.selectedChain);
      this.getOurOwnActivityDetails();
    }
    if (!data) {
      let getChain;

      getChain = this.shared.getChain();

      this.selectedChain = getChain.name.toString().toLowerCase();

      if (getChain.name.toString().toLowerCase() === 'polygon') {
        this.selectedChain = 'polygon';
        this._settings.changeChainURL(this.selectedChain);
        this.getOurOwnActivityDetails();
      } else {
        this.selectedChain = 'ethereum';
        this._settings.changeChainURL(this.selectedChain);
        this.getOurOwnActivityDetails();
      }
    }
  }

  getCheckBoxActivityEvent(data: any) {
    if (data === 'Bought') {
      this.type = 'bid';
      this.continuation = '';
      this.getOurOwnActivityDetails();
    } else if (data === 'Sold') {
      this.type = 'sale';
      this.continuation = '';
      this.getOurOwnActivityDetails();
    } else if (data === 'Transfered') {
      this.type = 'transfer';
      this.continuation = '';
      this.getOurOwnActivityDetails();
      this.continuation = '';
    } else if (data === 'Listed') {
      this.type = 'ask';
      this.continuation = '';
      this.getOurOwnActivityDetails();
    } else if (data === 'Minted') {
      this.type = 'mint';
      this.continuation = '';
      this.getOurOwnActivityDetails();
    }

    if (!data) {
      this.type = 'sale';
      this.continuation = '';
      this.getOurOwnActivityDetails();
    }
  }
}

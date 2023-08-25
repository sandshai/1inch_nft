import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { log } from '@reservoir0x/reservoir-sdk';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-user-portfolio-tab',
  templateUrl: './user-portfolio-tab.component.html',
})
export class UserPortfolioTabComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private _crudService: CrudService,
    private shared: SharedDataService,
    private _settings: SettingsService
  ) {}
  getScreenWidth: any;
  getScreenHeight: any;
  filterData: any = {
    tabName: 'portfolio',
    Status: {
      key: 'Status',
      value: [
        {
          label: 'Show all',
          count: 140,
          is_checked: false,
        },
        {
          label: 'Listed',
          count: 100,
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
  statusList: any = [];

  @Input() is_listItemOpen: boolean | undefined;
  @Output() listItemNewEvent = new EventEmitter<boolean>();
  layOut: string = 'card';
  filterIsOpen: boolean | undefined;
  continuation: any;
  userAddress: any;
  chain: string = '';
  userItems: any = [];
  search: boolean = false;
  selectedChain: any;
  statusMethod: string = '';

  ngOnInit() {
    this.cdr.detectChanges();
    this.filterLayout();
    this.userAddress = this.shared.getValue();

    let chain = this.shared.getWallet();

    if (this.userAddress) {
      this.shared.walletEvent.emit(this.userAddress);
      this.shared.walletEvent.subscribe((data) => {
        this.chain = data?.wallet?.chain?.name;
        this.shared.selectedChain.emit(this.chain);
        if (this.chain === 'Ethereum') {
          this.selectedChain = 'ethereum';
          this._settings.changeChainURL(this.selectedChain);
          this.getUserItems(this.userAddress);
        } else if (this.chain === 'Polygon') {
          this.selectedChain = 'polygon';
          this._settings.changeChainURL(this.selectedChain);
          this.getUserItems(this.userAddress);
        }
      });
    }
    if (!this.chain) {
      this.getUserItems(this.userAddress);
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
  listItemEvent(value: boolean) {
    this.listItemNewEvent.emit(value);
  }
  setLayOut(value: string) {
    this.layOut = value;
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

  getUserItems(value?: any, load?: any, type?: any) {
    let url;
    if (type === 'listed') {
      url = `orders/asks/v5?maker=${value}&includeCriteriaMetadata=true&includeRawData=true&normalizeRoyalties=false`;
    } else {
      if (this.continuation) {
        url = `users/${value}/tokens/v7?includeTopBid=${true}&includeRawData=${true}&includeAttribute=${true}&normalizeRoyalties=${false}&continuation=${
          this.continuation
        }`;
      } else {
        url = `users/${value}/tokens/v7?includeTopBid=${true}&includeRawData=${true}&includeAttribute=${true}&normalizeRoyalties=${false}`;
      }
    }

    this._crudService.getAll(url, this.search).subscribe((response) => {
      if (type === 'listed') {
        if (load) {
          this.userItems = [...this.userItems, ...response?.orders];
        } else {
          this.userItems = response?.orders;
        }
      } else {
        if (load) {
          this.userItems = [...this.userItems, ...response?.tokens];
        } else {
          this.userItems = response?.tokens;
        }
      }

      if (response?.continuation) {
        this.continuation = response?.continuation;
      } else {
        this.continuation = '';
      }
    });
  }

  loadMore(load = false) {
    if (load) {
      this.getUserItems(this.userAddress, load);
    }
  }

  getCheckBoxEvent(data: any) {
    if (data === 'Ethereum') {
      if (this.statusMethod === 'listed') {
        this.selectedChain = 'ethereum';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserItems(this.userAddress, undefined, 'listed');
      } else {
        this.selectedChain = 'ethereum';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserItems(this.userAddress);
      }
    } else if (data === 'Polygon') {
      if (this.statusMethod === 'listed') {
        this.selectedChain = 'polygon';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserItems(this.userAddress, undefined, 'listed');
      } else {
        this.selectedChain = 'polygon';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserItems(this.userAddress);
      }
    }

    if (!data) {
      let getChain;

      getChain = this.shared.getChain();

      this.selectedChain = getChain.name.toString().toLowerCase();

      if (getChain.name.toString().toLowerCase() === 'polygon') {
        if (this.statusMethod === 'listed') {
          this.selectedChain = 'polygon';
          this._settings.changeChainURL(this.selectedChain);
          this.getUserItems(this.userAddress, undefined, 'listed');
        } else {
          this.selectedChain = 'polygon';
          this._settings.changeChainURL(this.selectedChain);
          this.getUserItems(this.userAddress);
        }
      } else {
        if (this.statusMethod === 'listed') {
          this.selectedChain = 'ethereum';
          this._settings.changeChainURL(this.selectedChain);
          this.getUserItems(this.userAddress, undefined, 'listed');
        } else {
          this.selectedChain = 'ethereum';
          this._settings.changeChainURL(this.selectedChain);
          this.getUserItems(this.userAddress);
        }
      }
    }
  }

  getStatusEvent(data: any) {
    if (data === 'Show all') {
      this.statusMethod = 'showAll';
      this.getUserItems(this.userAddress);
    } else if (data === 'Listed') {
      this.statusMethod = 'listed';
      this.getUserItems(this.userAddress, undefined, 'listed');
    }

    if (!data) {
      let getChain;

      getChain = this.shared.getChain();

      this.selectedChain = getChain.name.toString().toLowerCase();

      if (getChain.name.toString().toLowerCase() === 'polygon') {
        this.selectedChain = 'polygon';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserItems(this.userAddress);
      } else {
        this.selectedChain = 'ethereum';
        this._settings.changeChainURL(this.selectedChain);
        this.getUserItems(this.userAddress);
      }
    }
  }
}

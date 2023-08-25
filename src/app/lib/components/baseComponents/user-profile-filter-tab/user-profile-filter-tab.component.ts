import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-user-profile-filter-tab',
  templateUrl: './user-profile-filter-tab.component.html',
})
export class UserProfileFilterTabComponent {
  @Input() Data: any;
  @Output() ItemEvent = new EventEmitter<boolean>();
  @Output() checkBoxStatusEvent = new EventEmitter<any>();
  @Output() activityStatusEvent = new EventEmitter<any>();
  @Output() statusEvent = new EventEmitter<any>();

  userWalletAddress: any;
  search: boolean = false;
  userCollectionsData: any = [];
  chain: any;
  selectedChain: any = 'ethereum';
  trackEvent: string = 'offerChain';
  activeIndex: number = -1;
  offerChain: any;
  activityIndex: number = -1;
  activityType: any;
  statusIndex: number = -1;
  statusType: any;

  constructor(
    private crudService: CrudService,
    private shared: SharedDataService,
    private _settings: SettingsService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.userWalletAddress = this.shared.getValue();

    if (this.userWalletAddress) {
      this.shared.walletEvent.subscribe((data) => {
        this.chain = data?.wallet?.chain?.name;
        if (this.chain === 'Ethereum') {
          this.selectedChain = 'ethereum';
          this._settings.changeChainURL('ethereum');
          this.getUserCollections();
        } else if (this.chain === 'Polygon') {
          this.selectedChain = 'polygon';
          this._settings.changeChainURL('polygon');
          this.getUserCollections();
        }
      });
      if (!this.chain) {
        this.getUserCollections();
      }
    }
  }
  popupCloseEvent() {
    this.ItemEvent.emit(false);
  }

  getUserCollections(value?: any) {
    this.crudService
      .getAll(
        `users/${this.userWalletAddress}/collections/v3?offset=0&limit=100`,
        this.search
      )
      .subscribe((res) => {
        this.userCollectionsData = res.collections;
      });
  }

  setActiveIndex(event: any, index: number, value: any): void {
    let checked = event.target.checked;
    this.activeIndex = index;

    if (checked) {
      this.offerChain = value;
      this.checkBoxStatusEvent.emit(this.offerChain);
    } else {
      this.offerChain = '';
      this.checkBoxStatusEvent.emit(this.offerChain);
    }
  }

  setActiveIndexOfActivity(event: any, index: number, value: any) {
    let checked = event.target.checked;
    this.activityIndex = index;
    if (checked) {
      this.activityType = value;
      this.activityStatusEvent.emit(this.activityType);
    } else {
      this.activityType = '';
      this.activityStatusEvent.emit(this.activityType);
    }
  }

  handleStatus(event: any, index: number, value: any) {
    let checked = event.target.checked;
    this.statusIndex = index;
    if (checked) {
      this.statusType = value;
      this.statusEvent.emit(this.statusType);
    } else {
      this.statusType = '';
      this.statusEvent.emit(this.statusType);
    }
  }
}

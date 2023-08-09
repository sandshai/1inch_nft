import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrudService } from 'src/app/lib/services/crud.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-user-profile-filter-tab',
  templateUrl: './user-profile-filter-tab.component.html',
})
export class UserProfileFilterTabComponent {
  @Input() demoData: any;
  @Output() ItemEvent = new EventEmitter<boolean>();

  userWalletAddress: any;
  search: boolean = false;
  userCollectionsData: any = [];
  // selectedChain: any = 'polygon';

  constructor(
    private crudService: CrudService,
    private shared: SharedDataService,
    private _settings: SettingsService
  ) {}
  ngOnInit() {
    this.userWalletAddress = this.shared.getValue();
    // this._settings.changeChainURL(this.selectedChain);
    if (this.userWalletAddress) {
      this.getUserCollections();
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
}

import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ProfileLayoutService } from '../../../services/profile-layout.service';
import { CrudService } from '../../../services/crud.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
@Component({
  selector: 'app-portfolio-grid-layout',
  templateUrl: './portfolio-grid-layout.component.html',
})
export class PortfolioGridLayoutComponent {
  profileLayout: boolean = false;
  setClass: any;
  @Input() is_open: boolean | undefined;
  @Input() is_filter_open: boolean | undefined;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() data: any;
  search: boolean = true;
  userItems: any = [];
  userAddress: any;
  continuation: any;

  constructor(
    private profileLayoutService: ProfileLayoutService,
    private _crudService: CrudService,
    private shared: SharedDataService,
  ) {}

  ngOnInit() {
    this.isOpenListItem();
    this.userAddress = this.shared.getValue();

    if (this.userAddress) {
      this.getUserItems(this.userAddress);
    }
    this.setLayoutClass();
  }

  ngOnChanges() {
    this.setLayoutClass();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    if (this.profileLayoutService.getProfileLayout()) {
      this.toggleBodyScroll();
    }
  }

  openListItemCard() {
    this.profileLayoutService.setProfileLayout(true);
    this.isOpenListItem();
  }
  isOpenListItem() {
    this.profileLayout = this.profileLayoutService.getProfileLayout();
    this.newItemEvent.emit(this.profileLayout);
    this.toggleBodyScroll();
  }
  private toggleBodyScroll() {
    const isMobileScreen = window.innerWidth < 1200; // Adjust the width as per your requirement
    document.body.style.overflow =
      isMobileScreen && this.profileLayoutService.getProfileLayout()
        ? 'hidden'
        : '';
  }

  getUserItems(value?: any, load?: any) {
    let url;
    if (this.continuation) {
      url = `users/${value}/tokens/v7?includeTopBid=${true}&includeRawData=${true}&includeAttribute=${true}&normalizeRoyalties=${false}&continuation=${
        this.continuation
      }`;
    } else {
      url = `users/${value}/tokens/v7?includeTopBid=${true}&includeRawData=${true}&includeAttribute=${true}&normalizeRoyalties=${false}`;
    }
    this._crudService.getAll(url, this.search).subscribe((response) => {
      if (load) {
        this.userItems = [...this.userItems, ...response?.tokens];
      } else {
        this.userItems = response?.tokens;
      }

      if (response?.continuation) {
        this.continuation = response?.continuation;
      } else {
        this.continuation = '';
      }
    });
  }

  handleViewMore(load = false) {
    if (load) {
      this.getUserItems(this.userAddress, load);
    }
  }

  setLayoutClass() {
    this.setClass =
      this.is_open && this.is_filter_open
        ? 'both-openListItemCard'
        : this.is_open && !this.is_filter_open
        ? 'item-openListItemCard'
        : !this.is_open && this.is_filter_open
        ? 'filter-openListItemCard'
        : '';
  }
}

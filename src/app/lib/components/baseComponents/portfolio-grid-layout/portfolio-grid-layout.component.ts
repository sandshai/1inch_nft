import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ProfileLayoutService } from '../../../services/profile-layout.service';
import { CrudService } from '../../../services/crud.service';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { SettingsService } from 'src/app/lib/services/settings.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-portfolio-grid-layout',
  templateUrl: './portfolio-grid-layout.component.html',
})
export class PortfolioGridLayoutComponent {
  profileLayout: boolean = false;
  setClass: any;
  @Input() is_open: boolean | undefined;
  @Input() is_filter_open: boolean | undefined;
  @Input() statusType: any;
  @Output() newItemEvent = new EventEmitter<boolean>();

  @Input() data: any;

  search: boolean = true;
  userItems: any[] = [];
  userAddress: any;
  selectedChain: any;

  checkedItems: any = [];

  constructor(
    private profileLayoutService: ProfileLayoutService,
    private _crudService: CrudService,
    private shared: SharedDataService,
    private _settings: SettingsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.isOpenListItem();

    this.cdr.detectChanges();
    this.setLayoutClass();

    let chain = this.shared.getChain();

    if (chain?.name === 'Polygon') {
      this.selectedChain = 'polygon';
    } else if (chain?.name === 'Ethereum') {
      this.selectedChain = 'ethereum';
    }
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

  openListItemCard(token: any) {
    this.profileLayoutService.setProfileLayout(true);
    this.isOpenListItem();
    this.shared.addListItems(token);
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

  handleCheckedItems(event: any, value: any) {
    let checked = event.target.checked;
    if (checked) {
      this.checkedItems?.push(value);
    } else {
      let removeIndex = this.checkedItems.findIndex(
        (item: any) => item === value
      );
      if (removeIndex !== -1) {
        this.checkedItems.splice(removeIndex, 1);
      }
    }
  }

  goToNftBuyPage(id: any, address: any) {
    if (id && address)
      this.router.navigate([`/item`, this.selectedChain, address, id]);
  }
}

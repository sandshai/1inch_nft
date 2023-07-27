import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ProfileLayoutService } from '../../../services/profile-layout.service';
@Component({
  selector: 'app-portfolio-grid-layout',
  templateUrl: './portfolio-grid-layout.component.html'
})
export class PortfolioGridLayoutComponent {
  constructor(private profileLayoutService: ProfileLayoutService) { }
  profileLayout: boolean = false;
  setClass: any;
  @Input() is_open: boolean | undefined;
  @Input() is_filter_open: boolean | undefined;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() data: any;

  ngOnInit() {
    this.isOpenListItem();
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
    document.body.style.overflow = isMobileScreen && this.profileLayoutService.getProfileLayout() ? 'hidden' : '';
  }

  setLayoutClass() {
    this.setClass = this.is_open && this.is_filter_open ? 'both-openListItemCard' : this.is_open && !this.is_filter_open ? 'item-openListItemCard' : !this.is_open && this.is_filter_open ? 'filter-openListItemCard' : '';
  }
}

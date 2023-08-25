import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProfileLayoutService } from '../../lib/services/profile-layout.service';
import { ChangeDetectorRef } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from '@reservoir0x/reservoir-sdk';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  constructor(
    private profileLayoutService: ProfileLayoutService,
    private cdr: ChangeDetectorRef,
    private shared: SharedDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  is_listItemCard: boolean = false;
  activeTab: string = 'portfolio';

  // TODO: Unused, can be removed
  @Input() dummyNftCollections: any = ['1'];

  ngOnInit() {
    this.isOpenListItem();
    this.activeTab = localStorage.getItem('profileCurrentTab') || "portfolio";
    this.shared.profileCurrentTab.subscribe(data => {
      this.activeTab = data ? data : localStorage.getItem('profileCurrentTab') || "portfolio";
    })

    if (!this.shared.getValue()) {
      this.router.navigate(['/']);
    }
  }

  isOpenListItem() {
    this.is_listItemCard = this.profileLayoutService.getProfileLayout();
  }

  setOpenListItem(value: boolean) {
    this.is_listItemCard = value;
    if (!this.is_listItemCard) {
      this.toggleBodyScroll();
    }
  }

  private toggleBodyScroll() {
    const isMobileScreen = window.innerWidth < 1200; // Adjust the width as per your requirement
    document.body.style.overflow =
      isMobileScreen && this.profileLayoutService.getProfileLayout()
        ? 'hidden'
        : '';
  }

  listItemClose(value: string) {
    this.shared.setProfileCurrentTab(value);
    this.is_listItemCard
      ? this.profileLayoutService.setProfileLayout(false)
      : '';
    this.isOpenListItem();
  }
}

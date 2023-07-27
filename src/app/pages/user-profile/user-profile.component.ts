import { Component, Input } from '@angular/core';
import { ProfileLayoutService } from '../../lib/services/profile-layout.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  constructor(private profileLayoutService: ProfileLayoutService, private cdr: ChangeDetectorRef,) { }
  is_listItemCard: boolean = false;

  @Input() dummyNftCollections: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

  ngOnInit() {
    this.isOpenListItem();
  }

  isOpenListItem() {
    this.is_listItemCard = this.profileLayoutService.getProfileLayout();
  }

  setOpenListItem(value : boolean) {
    this.is_listItemCard = value;
    if (!this.is_listItemCard) {
      this.toggleBodyScroll();
    }
  }

  private toggleBodyScroll() {
    const isMobileScreen = window.innerWidth < 1200; // Adjust the width as per your requirement
    document.body.style.overflow = isMobileScreen && this.profileLayoutService.getProfileLayout() ? 'hidden' : '';
  }

  listItemClose() {
    this.is_listItemCard ? this.profileLayoutService.setProfileLayout(false) : '';
    this.isOpenListItem();
  }
}

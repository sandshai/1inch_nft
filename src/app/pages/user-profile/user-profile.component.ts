import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ProfileLayoutService } from '../../lib/services/profile-layout.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  constructor(private profileLayoutService: ProfileLayoutService, private cdr: ChangeDetectorRef,) { }
  is_listItemCard: boolean = false;
  is_filter: boolean | undefined;

  @Input() dummyNftCollections: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

  ngOnInit() {
    this.isOpenListItem();
    this.cdr.detectChanges();
    this.filterLayout();
  }

  isOpenListItem() {
    this.is_listItemCard = this.profileLayoutService.getProfileLayout();
  }

  setOpenListItem(value : boolean) {
    this.is_listItemCard = value;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.filterLayout();
  }

  filterLayout() {
    if (window.innerWidth > 1199) {
      this.is_filter = true;
    } else {
      this.is_filter = false;
    }
  }
}

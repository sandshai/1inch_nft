import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileLayoutService } from 'src/app/lib/services/profile-layout.service';

@Component({
  selector: 'app-user-profile-list-items',
  templateUrl: './user-profile-list-items.component.html'
})
export class UserProfileListItemsComponent {
  constructor(private profileLayoutService: ProfileLayoutService) {}
  @Input() dummyData: any;
  @Output() closeListItemEvent = new EventEmitter<boolean>();
  expand: boolean = false;
  closeListItem() {
    this.profileLayoutService.setProfileLayout(false);
    this.closeListItemEvent.emit(false);
  }
  expandPriceFilter() {
    this.expand = this.expand ? this.expand = false : this.expand = true;
  }
}

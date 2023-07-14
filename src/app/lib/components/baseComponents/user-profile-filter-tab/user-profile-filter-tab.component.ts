import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-filter-tab',
  templateUrl: './user-profile-filter-tab.component.html'
})
export class UserProfileFilterTabComponent {
  @Input() demoData: any;
  @Input() collections: any = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
}

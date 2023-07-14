import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-table-layout',
  templateUrl: './user-profile-table-layout.component.html'
})
export class UserProfileTableLayoutComponent {
  @Input() data: any;
  @Input() layOutTable: string | undefined;
}

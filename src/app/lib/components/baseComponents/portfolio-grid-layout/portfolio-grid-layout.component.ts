import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileLayoutService } from '../../../services/profile-layout.service';
@Component({
  selector: 'app-portfolio-grid-layout',
  templateUrl: './portfolio-grid-layout.component.html'
})
export class PortfolioGridLayoutComponent {
  constructor(private profileLayoutService: ProfileLayoutService) { }
  profileLayout: boolean = false;
  @Input() is_open: boolean | undefined;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() data: any;

  ngOnInit() {
    this.isOpenListItem();
  }

  openListItemCard() {
    this.profileLayoutService.setProfileLayout(true);
    this.isOpenListItem();
  }
  isOpenListItem() {
    this.profileLayout = this.profileLayoutService.getProfileLayout();
    this.newItemEvent.emit(this.profileLayout);
  }
}

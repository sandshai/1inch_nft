import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-collection-right-side-tab',
  templateUrl: './collection-right-side-tab.component.html'
})
export class CollectionRightSideTabComponent {

  @Output() is_close_tab = new EventEmitter<boolean>();

  public getScreenWidth: any;
  public getScreenHeight: any;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  closeTab() {
    this.is_close_tab.emit(false);
  }

}

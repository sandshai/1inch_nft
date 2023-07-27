import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section-filter-wrapper',
  templateUrl: './section-filter-wrapper.component.html'
})
export class SectionFilterWrapperComponent {
  @Output() viewLayout = new EventEmitter<string>();
  @Output() profileFilterEvent = new EventEmitter<boolean>();
  @Input() activeLayout: string | undefined;
  @Input() pageLayOut: string | undefined;
  @Input() profileFilterLayOut: string | undefined;
  @Input() searchBarWidth: boolean | undefined;
  @Input() filterActive: boolean | undefined;

  changeViewLayout(val:string) {
    this.viewLayout.emit(val ? val : 'table');
  }
  profileFilterClickEvent() {
    this.profileFilterEvent.emit(this.filterActive ? false : true);
  }
}

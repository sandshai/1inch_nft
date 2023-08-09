import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-collections-list-table-filter',
  templateUrl: './collections-list-table-filter.component.html'
})
export class CollectionsListTableFilterComponent {
  @Output() is_close_filter = new EventEmitter<boolean>();

  closeFilter() {
    this.is_close_filter.emit(false);
    document
    .getElementById('c-list-wrapper')
    ?.classList.remove('active-filter');
  }
}

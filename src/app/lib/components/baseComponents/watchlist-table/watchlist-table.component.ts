import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-watchlist-table',
  templateUrl: './watchlist-table.component.html'
})
export class WatchlistTableComponent {
  @Input() data: any;
}

import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html'
})
export class WatchlistCardComponent {
  @Input() data: any;
  @Input() profileOfferTabClass : any;
}

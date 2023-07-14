import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html'
})
export class WatchlistCardComponent {
  @Input() data : any;
//   windowWidth: number | undefined;

//   ngOnInit() {
//     this.windowWidth = window.innerWidth;
// }
//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.windowWidth = window.innerWidth;
//   }
}

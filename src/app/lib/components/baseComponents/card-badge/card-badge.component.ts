import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-badge',
  templateUrl: './card-badge.component.html',
})
export class CardBadgeComponent {
  @Input() imageUrl: string | undefined;
  @Input() badgeImageUrl: string | undefined;
}

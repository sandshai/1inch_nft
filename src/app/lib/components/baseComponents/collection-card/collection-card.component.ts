import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/lib/services/settings.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
})
export class CollectionCardComponent {
  @Input() item: any;
  @Input() index: any;
  @Input() collection: any;

  constructor(private _settings: SettingsService, private router: Router) {}

  baseUrl = this._settings.baseUrl;

  goToPage() {
    this.router.navigate([
      `item`,
      this.collection,
      this.item.token.contract,
      this.item.token.tokenId,
    ]);
  }
}

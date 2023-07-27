import { Component, Input } from '@angular/core';
import { SettingsService } from 'src/app/lib/services/settings.service';

@Component({
  selector: 'app-card-small-x',
  templateUrl: './card-small-x.component.html',
})
export class CardSmallXComponent {
  @Input() item: any;
  @Input() sortedDay: any;
  @Input() sortBy: any;
  @Input() index: any;
  @Input() isLoad: any;
  @Input() iconSelectedChain: any;
  @Input() marketplaceIcon: any;
  constructor(private _settings: SettingsService) {}

  baseUrl = this._settings.baseUrl;
  currencyAddress = '0x0000000000000000000000000000000000000000';

  sortByShortCut(value:any) {
    return value == '1day' ? '1D' : value == '7day' ? '1W' : '1M';
  }
}

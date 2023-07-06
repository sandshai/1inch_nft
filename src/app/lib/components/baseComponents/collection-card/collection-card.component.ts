import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
})
export class CollectionCardComponent {
  @Input() item: any;
  @Input() index: any;
  @Input() collection: any;
  @Input() selected: any;

  checkedValue: any;

  constructor(private router: Router) {}

  ngOnChanges() {
    const isChecked = this.selected.some(
      (obj: any) => obj?.token?.tokenId === this.item?.token?.tokenId
    );

    this.checkedValue = isChecked;
  }
  goToPage() {
    this.router.navigate([
      `item`,
      this.collection,
      this.item.token.contract,
      this.item.token.tokenId,
    ]);
  }
}

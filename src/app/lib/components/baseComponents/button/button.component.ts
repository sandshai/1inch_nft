import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() className: string | undefined;
  @Input() url: string | undefined;
  @Input() imgClass: string | undefined;
  @Input() i_id: string | undefined;

  minAmount: any;
  maxAmount: any;

  constructor(private shared: SharedDataService, private router: Router) {}

  ngOnInit() {
    this.shared.minEvent.subscribe((data) => {
      this.minAmount = data;
    });
    this.shared.maxEvent.subscribe((data) => {
      this.maxAmount = data;
    });
  }

  routeParamAppend(minPrice: number, maxPrice: number) {
    if (this.i_id === 'apply' && minPrice && maxPrice)
      this.router.navigate([], { queryParams: { minPrice, maxPrice } });

    if (this.i_id === 'reset') {
      this.router.navigate([]);
      this.minAmount = '';
      this.maxAmount = '';
      setTimeout(() => window.location.reload(), 500);
    }
  }
}

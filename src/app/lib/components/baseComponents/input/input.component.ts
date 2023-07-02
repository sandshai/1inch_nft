import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() g_class: string | undefined;
  @Input() labelText: string | undefined;
  @Input() i_name: string | undefined;
  @Input() i_id: string | undefined;
  @Input() i_class: string | undefined;
  @Input() i_placeholder: string | undefined;

  minAmount: any;
  maxAmount: any;

  currentValue: any;

  constructor(
    private shared: SharedDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.minAmount = params['minPrice'];
      this.maxAmount = params['maxPrice'];
    });
    if (this.i_id === 'Min' && this.minAmount) {
      this.currentValue = this.minAmount;
    }
    if (this.i_id === 'Max' && this.maxAmount) {
      this.currentValue = this.maxAmount;
    }
  }

  getValue(value: any) {
    if (this.i_id === 'Min') this.shared.minEvent.emit(value);
    if (this.i_id === 'Max') this.shared.maxEvent.emit(value);
  }
}

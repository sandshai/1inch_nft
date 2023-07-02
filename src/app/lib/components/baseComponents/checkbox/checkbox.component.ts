import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input() i_id: string | undefined;
  @Input() label: any;
  @Input() currentKey: any;

  checked: any;
  data: any;

  constructor(private shared: SharedDataService) {}

  checkboxChanged(event: any, data: string, keyData: any) {
    this.checked = event.target.checked; // Outputs the checkbox status (true or false)

    this.shared.addValue(data, keyData, this.checked);
  }
}

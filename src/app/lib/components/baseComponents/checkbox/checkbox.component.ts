import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  @Input() datas: any;

  checked: any;
  data: any;
  paramValues: any;
  defaultChecked: boolean = false;
  activeKeyData: any;
  activeLabel: any;

  constructor(
    private shared: SharedDataService,
    private activatedRoute: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.paramValues = params;
      this.handleCheckEvent(this.paramValues);
    });

    this.ChangeDetectorRef.detectChanges();
  }

  handleCheckEvent(value: any) {
    const result = value?.[this.currentKey]?.includes(this.label);

    this.defaultChecked = result;
  }

  checkboxChanged(event: any, data: string, keyData: any) {
    this.activeKeyData = keyData;
    this.activeLabel = data;
    this.checked = event.target.checked; // Outputs the checkbox status (true or false)

    this.shared.addValue(data, keyData, this.checked);
  }
}

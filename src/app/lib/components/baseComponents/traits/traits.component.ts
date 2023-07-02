import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html'
})
export class TraitsComponent {
  @Input() is_show : string | undefined;
}

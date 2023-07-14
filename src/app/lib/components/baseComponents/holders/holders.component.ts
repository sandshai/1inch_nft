import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-holders',
  templateUrl: './holders.component.html',
})
export class HoldersComponent {
  @Input() accordionBdyClass : string | undefined;
}

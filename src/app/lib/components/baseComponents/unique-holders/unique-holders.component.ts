import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-unique-holders',
  templateUrl: './unique-holders.component.html'
})
export class UniqueHoldersComponent {
  @Input() accordionBdyClass: string | undefined;
  @Input() hideFilterButtonClass : string | undefined;
}

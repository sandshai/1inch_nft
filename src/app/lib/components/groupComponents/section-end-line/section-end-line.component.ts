import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-end-line',
  templateUrl: './section-end-line.component.html',
})
export class SectionEndLineComponent {
  @Input() className: string | undefined;
}

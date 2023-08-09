import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icons',
  templateUrl: './svg-icons.component.html'
})
export class SvgIconsComponent {
  @Input() iconName?: string;
  @Input() className?: string;
}

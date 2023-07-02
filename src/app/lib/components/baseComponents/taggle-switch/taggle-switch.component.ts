import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-taggle-switch',
  templateUrl: './taggle-switch.component.html'
})
export class TaggleSwitchComponent {
  @Input() t_id : string | undefined;
}

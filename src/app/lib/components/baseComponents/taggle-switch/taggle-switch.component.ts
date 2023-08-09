import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-taggle-switch',
  templateUrl: './taggle-switch.component.html'
})
export class TaggleSwitchComponent {
  @Input() t_id: string | undefined;
  @Output() checkedEvent = new EventEmitter<boolean>();

  checkboxChanged(event: any) {
    this.checkedEvent.emit(event.target.checked); // Outputs the checkbox status (true or false)
  }
}

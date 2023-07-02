import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Output() is_closed = new EventEmitter<any>();

  closeCardWrapper() {
    this.is_closed.emit(false);
  }
}

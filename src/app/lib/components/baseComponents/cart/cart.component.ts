import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  constructor(
    private eRef: ElementRef
  ) {}
  @Output() is_closed = new EventEmitter<any>();
  data: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  closeCardWrapper() {
    this.is_closed.emit(false);
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    console.log('hi');

    const clickedInside = this.eRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.is_closed.emit(false);
    }
  }
}

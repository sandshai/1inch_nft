import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menus',
  templateUrl: './nav-menus.component.html'
})
export class NavMenusComponent {

  closemenu() {
    document.getElementById('mobile-nav')?.classList.remove('open-mobile-menu');
  }
}

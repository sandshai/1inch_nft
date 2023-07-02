import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  ngOnInit()  {
    document.querySelector('main')?.classList.add('overflow-x-hidden')
  }
}

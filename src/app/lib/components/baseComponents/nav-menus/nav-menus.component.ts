import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menus',
  templateUrl: './nav-menus.component.html'
})
export class NavMenusComponent {

  closemenu() {
    document.querySelector('body')?.classList.remove('overflow-hidden');
    document.getElementById('mobile-nav')?.classList.remove('open-mobile-menu');
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.closemenu();
  }

  // Inject the router service
  constructor(private router: Router) {}

  // Handle menu item click event
  onItemClick(route: string) {
    // Close the mobile menu
    document.getElementById('mobile-nav')?.classList.remove('open-mobile-menu');
    document.querySelector('body')?.classList.remove('overflow-hidden');
    // Add code to close the mobile menu here (e.g., using a flag or other mechanism)
    // Redirect to the selected route
    this.router.navigateByUrl(route);
  }

  isActive(route: string): boolean {
    // Check if the current route matches the specified route
    return this.router.isActive(route, true);
  }
}

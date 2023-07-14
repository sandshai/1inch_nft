import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    Array.from(tooltips).forEach((tooltip) => {
      new bootstrap.Tooltip(tooltip);
    });
  }
}

import { Component, HostListener } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
// import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  mobDevice: any;
  mdDevice: any;
  is_cart:boolean = false;
  mobDeviceCart: any;
  mdDeviceCart: any;

  constructor(
    // public _themeService: ThemeService,
    private _settingsService: SettingsService
  ) {}

  toggleTheme() {
    this._settingsService.toggleTheme();
  }

  setTheme(theme: string) {
    this._settingsService.setSetting('theme', theme);
  }

  openmenu() {
    document.getElementById('mobile-nav')?.classList.add('open-mobile-menu');
  }

  opensearch(event : Event) {
    event.stopPropagation();
    document
      .getElementById('search-wrapper')
      ?.classList.add('open__history');
  }

  closesearchhistory() {
    document.getElementById('header-search__field')?.classList.remove('open-search-history');
  }

  insidewallet(event :any) {
    event.stopPropagation();
  }

  openCardWrapper() {
    this.is_cart == true ? this.is_cart = false : this.is_cart = true;
  }

  closeCardWrapper(val:boolean) {
    this.is_cart = val;
  }
  ngOnInit() {
    this.setSearchComponent();
    this.setCartComponent();
  }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    if (document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20) {
        if (document.getElementById('header')?.classList.contains('active-mob-menu')) {
          document.getElementById('header')?.classList.remove('header-bg');
        }else {
          document.getElementById('header')?.classList.add('header-bg');
        }
    }else {
      document.getElementById('header')?.classList.remove('header-bg');
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setSearchComponent();
    this.setCartComponent();
  }

  setSearchComponent() {
    if (window.innerWidth > 991) {
      this.mobDevice = false;
      this.mdDevice = true;
    } else {
      this.mobDevice = true;
      this.mdDevice = false;
    }
  }

  setCartComponent() {
    if (window.innerWidth > 1199) {
      this.mobDeviceCart = false;
      this.mdDeviceCart = true;
    } else {
      this.mobDeviceCart = true;
      this.mdDeviceCart = false;
    }
  }
}

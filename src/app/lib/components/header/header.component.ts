import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
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
  currentLanguage: string = 'en';
  currentMode: any = 'dark';
  activePopup: string = 'globalSettings'
  openMobileSearchWrapper: boolean = false;

  languages: any = [
    { name: 'English', flag: 'flag-1', lan : 'en' },
    { name: '简体中文', flag: 'flag-2', lan : 'cn' },
    { name: 'Français', flag: 'flag-3', lan : 'fn' },
    { name: '日本語', flag: 'flag-8', lan : 'jn' },
    { name: 'Русский', flag: 'flag-7', lan : 'ru' },
    { name: 'Tiếng Việt', flag: 'flag-9', lan : 'vi' },
    { name: 'Bahasa Indonesia', flag: 'flag-6', lan : 'ina' },
    { name: '한국어', flag: 'flag-5', lan : 'ko' },
    { name: 'Español', flag: 'flag-4', lan : 'spn' }
  ]

  modes: any = [
    { name: 'Dark', icon: 'darkThemeIcon', mode: 'dark' },
    { name: 'Light', icon: 'lightThemeIcon', mode: 'light' },
    { name: 'Automatic', icon: 'automaticThemeIcon', mode: 'auto' },
  ]

  constructor(
    // public _themeService: ThemeService,
    private _settingsService: SettingsService,
    private renderer: Renderer2, private elementRef: ElementRef
  ) {}

  toggleTheme(theme: any) {
    this.currentMode = theme;
    // this._settingsService.toggleTheme(this.autoSelectTheme(theme));
  }

  autoSelectTheme(value:any) {
    let randomNumber = Math.floor(Math.random() * 2);
    let randomColor = randomNumber == 1 ? 'light' : 'dark';
    return value == 'auto' ? randomColor : value == 'light' ? 'light' : '';
  }

  setTheme(theme: string) {
    this._settingsService.setSetting('theme', theme);
  }

  openmenu() {
    document.querySelector('body')?.classList.add('overflow-hidden');
    document.getElementById('mobile-nav')?.classList.add('open-mobile-menu');
  }

  opensearch(event : Event) {
    event.stopPropagation();
    document.querySelector('body')?.classList.add('overflow-hidden');
    this.openMobileSearchWrapper = true;
  }

  closesearchhistory(val: boolean) {
    document.querySelector('body')?.classList.remove('overflow-hidden');
    this.openMobileSearchWrapper = val;
  }

  insidewallet(event :any) {
    event.stopPropagation();
  }

  openCardWrapper(event : Event) {
    event.stopPropagation();
    this.is_cart == true ? this.is_cart = false : this.is_cart = true;
    this.is_cart == true && window.innerWidth < 767 ? document.querySelector('body')?.classList.add('overflow-hidden') : document.querySelector('body')?.classList.remove('overflow-hidden');
  }

  closeCardWrapper(val: boolean) {
    document.querySelector('body')?.classList.remove('overflow-hidden');
    this.is_cart = val;
  }
  ngOnInit() {
    this.setSearchComponent();
    this.setCartComponent();
    const dropdownElement = this.elementRef.nativeElement.querySelector('.cus-settings-menu');
    this.renderer.listen(dropdownElement, 'hidden.bs.dropdown', this.onDropdownHidden.bind(this));
  }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('header')?.classList.add('header-bg');
    }else {
      document.getElementById('header')?.classList.remove('header-bg');
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.closeCardWrapper(false);
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

  chooseLanguage(value: string) {
    this.currentLanguage = value;
  }

  setActivePopup(value: string) {
    this.activePopup = value;
  }

  onDropdownHidden() {
    this.activePopup = 'globalSettings';
  }

  closePopup() {
    const ele = document.getElementById('dropdownMenuButton1');
    ele?.click();
  }
}

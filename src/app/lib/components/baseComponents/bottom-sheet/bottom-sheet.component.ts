import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html'
})
export class BottomSheetComponent {
  activePopup: string = 'globalSettings'
  currentLanguage: string = 'en';
  currentMode: any = 'dark';

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

  @Output() bottomSheetCloseEvent = new EventEmitter<boolean>();
  @Input() bottomSheetName: string | undefined;

  constructor(private elementRef: ElementRef, private _settingsService: SettingsService) {}

  onBackdropClick(event: MouseEvent): void {
    // Check if the clicked target is outside the modal content
    if (!this.elementRef.nativeElement.querySelector('.bottom-sheet-content').contains(event.target)) {
      this.bottomSheetCloseEvent.emit(false);
    }
  }

  setActivePopup(value: string) {
    this.activePopup = value;
  }

  chooseLanguage(value: string) {
    this.currentLanguage = value;
  }

  chooseMode(theme: string) {
    this.currentMode = theme;
    // this._settingsService.toggleTheme(this.autoSelectTheme(theme));
  }

  autoSelectTheme(value:any) {
    let randomNumber = Math.floor(Math.random() * 2);
    let randomColor = randomNumber == 1 ? 'light' : 'dark';
    return value == 'auto' ? randomColor : value == 'light' ? 'light' : '';
  }

  closeBottomSheet() {
    this.bottomSheetCloseEvent.emit(false);
  }
}

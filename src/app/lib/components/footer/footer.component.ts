import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  mobileWallet: any;
  bottomSheet: boolean = false;
  bottomSheetType: string | undefined;

  openwallet() {
    document
      .getElementById('connect-wallet__wrapper')
      ?.classList.add('open-wallet');
      document.querySelector('body')?.classList.add('overflow-hidden');
  }

  ngOnInit() {
    this.setWalletWarpper();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setWalletWarpper();
  }

  setWalletWarpper() {
    if (window.innerWidth > 767) {
      this.mobileWallet = false;
    } else {
      this.mobileWallet = true;
    }
  }

  openBottomSheet(value: string) {
    this.bottomSheetType = value;
    this.bottomSheet = true;
    document.querySelector('body')?.classList.add('overflow-hidden');
  }

  closeBottomSheet(value: boolean) {
    this.bottomSheet = value;
    document.querySelector('body')?.classList.remove('overflow-hidden');
  }
}

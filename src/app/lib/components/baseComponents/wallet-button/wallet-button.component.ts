import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.component.html',
})
export class WalletButtonComponent {
  walletAddress: any;
  formatAddress: any;
  storedValue: any;

  constructor(
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.walletAddress = this.shared.getValue();

    if (this.walletAddress) {
      this.formatAddress = `${this.walletAddress.slice(
        0,
        4
      )}...${this.walletAddress.slice(-4)}`;
    }
    this.shared.walletAddressEvent.subscribe((data) => {
      this.walletAddress = data;
      if (this.walletAddress) {
        this.formatAddress = `${this.walletAddress.slice(
          0,
          4
        )}...${this.walletAddress.slice(-4)}`;
      }
      this.cdr.detectChanges();
    });
    this.cdr.detectChanges();
  }

  openwallet() {
    document
      .getElementById('connect-wallet__wrapper')
      ?.classList.add('open-wallet');
  }

  clearWalletAddress() {
    let value = '';
    this.shared.setValue(value);
  }
}

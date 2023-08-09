import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.component.html',
})
export class WalletButtonComponent {
  walletAddress: any;
  formatAddress: any;
  storedValue: any;
  isCopied: boolean = false;

  constructor(
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef,
    private router: Router
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
    document.querySelector('body')?.classList.add('overflow-hidden');
  }

  clearWalletAddress() {
    let value = '';
    this.shared.setValue(value);
    this.router.navigate(['/']);
  }

  handleNavigate(value: any) {
    if (value === 'portfolio') {
      const queryParams = { tab: 'portfolio' };
      this.router.navigate(['profile'], { queryParams });
    }
  }
  copyToClipboard() {
    this.isCopied = true;
    navigator.clipboard.writeText(this.walletAddress).then(() => {
      console.log('Content copied to clipboard');
      /* Resolved - text copied to clipboard successfully */
    },() => {
      console.error('Failed to copy');
      /* Rejected - text failed to copy to the clipboard */
    });
    setTimeout(() => {
      this.isCopied = false;
    }, 2000);
  }
}

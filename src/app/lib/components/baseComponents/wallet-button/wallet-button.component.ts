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
  walletBalance: any;
  formatAddress: any;
  storedValue: any;
  isCopied: boolean = false;
  chain: any;

  constructor(
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.walletAddress = this.shared.getValue();
    this.walletBalance = this.shared.getBalance(this.walletAddress);
    this.shared.walletEvent.subscribe((data) => {
      this.chain = data?.wallet?.chain?.name;
    });

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

    this.shared.walletBalanceEvent.subscribe((balance) => {
      this.walletBalance = balance;
      this.cdr.detectChanges();
    });

    this.cdr.detectChanges();
  }

  async openExplorer() {
    const address = await this.shared.getWallet()?.getAddresses();
    const explorerUrl = address
      ? `${this.shared.getExplorerUrl()}/address/${address[0]}`
      : '';
    window.open(`${explorerUrl}`, '_blank');
  }

  openwallet() {
    document
      .getElementById('connect-wallet__wrapper')
      ?.classList.add('open-wallet');
    document.querySelector('body')?.classList.add('overflow-hidden');
  }

  clearWalletAddress() {
    let value = '';
    this.shared.setWalletType(value);
    localStorage.clear();
    this.shared.setValue(value);
    this.router.navigate(['/']);
    window.location.reload();
  }

  handleNavigate(value: any): void {
    this.router.navigate(['/profile']);
    this.shared.setProfileCurrentTab(value);

    const dropdownButton = document.getElementById('wallet-connected-btn');
    if (dropdownButton) {
      dropdownButton.dispatchEvent(new Event('click'));
    }
  }
  copyToClipboard() {
    this.isCopied = true;
    navigator.clipboard.writeText(this.walletAddress).then(
      () => {
        console.log('Content copied to clipboard');
        /* Resolved - text copied to clipboard successfully */
      },
      () => {
        console.error('Failed to copy');
        /* Rejected - text failed to copy to the clipboard */
      }
    );
    setTimeout(() => {
      this.isCopied = false;
    }, 2000);
  }
}

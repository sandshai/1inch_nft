import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
})
export class ProfileInfoComponent {
  walletAddress: any;
  formatAddress: string | null;
  isCopied: boolean = false;

  constructor(
    private shared: SharedDataService,
    private cdr: ChangeDetectorRef,
    private clipboardService: ClipboardService
  ) {
    this.shared = shared;
    this.cdr = cdr;
    this.walletAddress = null;
    this.formatAddress = null;
  }

  ngOnInit() {
    this.walletAddress = this.shared.getValue();
    this.formatAddress = this.shared.getValue(true);

    this.shared.walletAddressEvent.subscribe((data) => {
      this.walletAddress = data;

      if (this.walletAddress) {
        this.formatAddress = `${this.walletAddress.slice(
          0,
          4
        )}...${this.walletAddress.slice(-4)}`;
      }
    });
  }

  async openExplorer() {
    const address = await this.shared.getWallet()?.getAddresses();
    const explorerUrl = address ? `${this.shared.getExplorerUrl()}/address/${address[0]}` : '';
    window.open(`${explorerUrl}`, '_blank')
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

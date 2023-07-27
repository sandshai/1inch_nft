import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wallet-images',
  templateUrl: './wallet-images.component.html'
})
export class WalletImagesComponent {
  @Input() walletIcon?: string;
  @Input() className?: string
}

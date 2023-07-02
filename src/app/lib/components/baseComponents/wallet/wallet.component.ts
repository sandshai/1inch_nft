import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';

declare var WalletConnect: any;
declare var WalletConnectQRCodeModal: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
})
export class WalletComponent {
  toHex: any;
  WalletConnect: any;
  checkBox: any;
  checkConnection: any;
  sessionStorageWalletAddress: any;

  constructor(private shared: SharedDataService) {}

  closewallet() {
    document
      .getElementById('connect-wallet__wrapper')
      ?.classList.remove('open-wallet');
  }

  connect() {
    const connector = new WalletConnect.default({
      bridge: 'https://bridge.walletconnect.org',
      qrcodeModal: WalletConnectQRCodeModal.default,
    });

    // Check if connection is already established
    connector.createSession();

    // Subscribe to connection events
    connector.on('connect', (error: any, payload: any) => {
      console.log(
        '🚀 ~ file: wallet.component.ts:37 ~ WalletComponent ~ connector.on ~ payload:',
        payload
      );
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];

      if (payload?.event === 'connect') {
        this.checkConnection = accounts;
        this.shared.setValue(this.checkConnection);
        this.closewallet();
      }

      console.log(accounts);

      const msgParams = [
        accounts[0],
        `0x${this.toHex('testing message')}`, // Required
      ];

      // Sign message
      connector
        .signPersonalMessage(msgParams)
        .then((sig: any) => {
          // Returns signature.
          console.log(sig);
        })
        .catch((error: any) => {
          // Error returned when rejected
          console.error(error);
        });
    });

    connector.on('session_update', (error: any, payload: any) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on('disconnect', (error: any, payload: any) => {
      console.log(
        '🚀 ~ file: wallet.component.ts:79 ~ WalletComponent ~ connector.on ~ payload:',
        payload
      );
      if (payload?.event === 'disconnect') {
        this.checkConnection = '';
        this.shared.setValue(this.checkConnection);
      }
      if (error) {
        throw error;
      }
    });
  }

  checkboxChanged(event: any) {
    this.checkBox = event.target.checked;
  }
  invokeWallet() {
    if (this.checkBox) {
      this.connect();
    }
  }
}

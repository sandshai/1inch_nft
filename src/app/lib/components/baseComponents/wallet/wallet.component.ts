import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import SignClient from '@walletconnect/sign-client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { Subject } from 'rxjs';
import _ from 'lodash';

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

  session: any;
  client: any;
  account: string = '';
  topic: any;
  chainId: string = '';
  accountSubject = new Subject<string>();

  constructor(private shared: SharedDataService) {}

  closewallet() {
    document
      .getElementById('connect-wallet__wrapper')
      ?.classList.remove('open-wallet');
  }

  async connectWalletNew() {
    const client = await SignClient.init({
      projectId: 'd3541dee612434b6498552f570478076', // Get ProjectID from WalletConnect
      metadata: {
        name: 'sandeep Example',
        description: 'sandeep Example',
        url: '#',
        icons: [
          'https://raw.githubusercontent.com/tetrixtech/assets/main/icons/PitakaLogo.png',
        ],
      },
    });

    this.client = client;

    client.on('session_event', (args) => {
      const id = args.id;
      const ddd = args.params;
      const topic = args.topic;
      this.topic = topic;
      console.log('id===', id);
      // Handle session events, such as "chainChanged", "accountsChanged", etc.
    });

    client.on('session_update', ({ topic, params }) => {
      console.log('topic===', topic);
      const { namespaces } = params;
      const _session = client.session.get(topic);
      // Overwrite the `namespaces` of the existing session with the incoming one.
      const updatedSession = { ..._session, namespaces };
      // Integrate the updated session state into your dapp state.
      this.onSessionUpdate(updatedSession);
    });

    client.on('session_delete', () => {
      // Session was deleted -> reset the dapp state, clean up from user session, etc.
    });

    await this.showQrcode();
  }

  onSessionUpdate(updatedSession: any) {
    console.log('updatedSession===', updatedSession);
  }

  async showQrcode() {
    try {
      const { uri, approval } = await this.client.connect({
        // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
        requiredNamespaces: {
          eip155: {
            methods: [
              'eth_sendTransaction',
              'eth_signTransaction',
              'eth_sign',
              'personal_sign',
              'eth_signTypedData',
            ],
            chains: ['eip155:5'],
            events: [
              'chainChanged',
              'accountsChanged',
              'connect',
              'disconnect',
            ],
          },
        },
      });

      // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
      if (uri) {
        QRCodeModal.open(uri, _, {});
        const session = await approval();
        this.onSessionConnected(session);
        QRCodeModal.close();
      }

      // Await session approval from the wallet.
    } catch (e) {
      console.error(e);
    } finally {
      QRCodeModal.close();
    }
  }

  onSessionConnected(session: any) {
    console.log('comimng');
    this.session = session;
    console.log('session===', session);
    QRCodeModal.close();
    const accounts = session.namespaces.eip155.accounts;
    console.log('accounts=', accounts);
    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      const [namespace, reference, address] = account.split(':');
      this.chainId = namespace + ':' + reference;
      this.account = address;
      this.shared.setValue(this.account);

      this.accountSubject.next(address);
    }

    this.closewallet();
  }

  checkboxChanged(event: any) {
    this.checkBox = event.target.checked;
  }
  invokeWallet() {
    if (this.checkBox) {
      this.connectWalletNew();
    }
  }
}

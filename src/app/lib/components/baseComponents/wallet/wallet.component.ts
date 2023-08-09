import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import SignClient from '@walletconnect/sign-client';
import { WalletConnectModal } from '@walletconnect/modal';
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
  walletIcons: any;
  walletStatus: any;
  chooseNetwork: any;
  selectedNetwork: any;
  activeIcon: any;
  activeNetwork: any = 'ethereum';
  walletConnectModal: WalletConnectModal = new WalletConnectModal({
    projectId: 'd3541dee612434b6498552f570478076',
    // `standaloneChains` can also be specified when calling `walletConnectModal.openModal(...)` later on.
  });

  constructor(
    private shared: SharedDataService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    window['__1inch_connect_init_rpc__'] = {
      1: 'https://mainnet.infura.io/v3/<infura key> or custom node address',
    };
  }

  onButtonClick(): void {
    this.addExternalScript('../../../../../../one-inch.js');
    console.log('Button clicked! Custom script executed.');
    // Add any other custom logic you want to execute here
  }

  private addExternalScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  ngOnInit() {
    this.setWalletIcon();
    this.walletStatus = this.walletIcons['disabled'];
    this.selectedNetwork = this.chooseNetwork['disabled'];
    this.activeIcon = 'disabledCollectionIcon';
  }

  closewallet() {
    document
      .getElementById('connect-wallet__wrapper')
      ?.classList.remove('open-wallet');
    document.querySelector('body')?.classList.remove('overflow-hidden');
  }

  async connectWalletNew() {
    const client = await SignClient.init({
      projectId: 'd3541dee612434b6498552f570478076', // Get ProjectID from WalletConnect
      metadata: {
        name: '1inch',
        description: '1inch',
        url: '#',
        icons: [
          'https://raw.githubusercontent.com/tetrixtech/assets/main/icons/PitakaLogo.png',
        ],
      },
    });

    this.client = client;

    // client.on('');

    client.on('session_event', (args) => {
      const id = args.id;
      const ddd = args.params;
      const topic = args.topic;
      this.topic = topic;
      console.log('event ===', args);

      // Handle session events, such as "chainChanged", "accountsChanged", etc.
    });

    client.on('session_update', ({ topic, params }) => {
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
        this.walletConnectModal.openModal({ uri });
        const session = await approval();
        this.onSessionConnected(session);
        this.walletConnectModal.closeModal();
      }

      // Await session approval from the wallet.
    } catch (e) {
      console.error(e);
    } finally {
      this.walletConnectModal.closeModal();
    }
  }

  onSessionConnected(session: any) {
    console.log('comimng');
    this.session = session;
    console.log('session===', session);
    this.walletConnectModal.closeModal();
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
    this.walletStatus = event.target.checked
      ? this.walletIcons['active']
      : this.walletIcons['disabled'];
    this.selectedNetwork = event.target.checked
      ? this.chooseNetwork['active']
      : this.chooseNetwork['disabled'];
    this.activeIcon = event.target.checked
      ? 'activeCollectionIcon'
      : 'disabledCollectionIcon';
    this.checkBox = event.target.checked;
  }

  invokeWallet() {
    if (this.checkBox) {
      this.connectWalletNew();
    }
  }
  oneInchWallet() {
    if (this.checkBox) {
      this.onButtonClick();
    }
  }

  setWalletIcon() {
    let icons = {
      active: {
        oneinchWallet: '1inchWalletIcon',
        metaMask: 'metaMaskIcon',
        trustWallet: 'trustWalletIcon',
        walletConnect: 'WalletConnectIcon',
        coinbaseWallet: 'coinbaseWalletIcon',
      },
      disabled: {
        oneinchWallet: '1inchWalletDisabledIcon',
        metaMask: 'metaMaskDisabledIcon',
        trustWallet: 'trustWalletDisabledIcon',
        walletConnect: 'WalletConnectDisabledIcon',
        coinbaseWallet: 'coinbaseWalletDisabledIcon',
      },
    };
    this.walletIcons = icons;
    this.chooseNetwork = {
      active: [
        { icon: 'ethereumIcon', name: 'Ethereum', key: 'ethereum' },
        // {icon: 'BNBChainIcon', name: 'BNB Chain', key: 'BNBChain'},
        { icon: 'polygonIcon', name: 'Polygon', key: 'polygon' },
        // {icon: 'optimismIcon', name: 'Optimism', key: 'optimism'},
        // {icon: 'arbitrumIcon', name: 'Arbitrum', key: 'arbitrum'},
        // {icon: 'gnosisChainIcon', name: 'Gnosis Chain', key: 'GnosisChain'},
        // {icon: 'avalancheIcon', name: 'Avalanche', key: 'avalanche'},
        // {icon: 'fantomIcon', name: 'Fantom', key: 'fantom'},
        // {icon: 'auroraIcon', name: 'Aurora', key: 'aurora'},
        // {icon: 'klaytnIcon', name: 'Klaytn', key: 'klaytn'},
      ],
      disabled: [
        { icon: 'ethereumDisabledIcon', name: 'Ethereum', key: 'ethereum' },
        // {icon: 'BNBChainDisabledIcon', name: 'BNB Chain', key: 'BNBChain'},
        { icon: 'polygonDisabledIcon', name: 'Polygon', key: 'polygon' },
        // {icon: 'optimismDisabledIcon', name: 'Optimism', key: 'optimism'},
        // {icon: 'arbitrumDisabledIcon', name: 'Arbitrum', key: 'arbitrum'},
        // {icon: 'gnosisChainDisabledIcon', name: 'Gnosis Chain', key: 'GnosisChain'},
        // {icon: 'avalancheDisabledIcon', name: 'Avalanche', key: 'avalanche'},
        // {icon: 'fantomDisabledIcon', name: 'Fantom', key: 'fantom'},
        // {icon: 'auroraDisabledIcon', name: 'Aurora', key: 'aurora'},
        // {icon: 'klaytnDisabledIcon', name: 'Klaytn', key: 'klaytn'},
      ],
    };
  }

  selectNetwork(network: any) {
    if (this.checkBox) {
      network ? (this.activeNetwork = network) : '';
    }
  }

  onBackdropClick(event: MouseEvent): void {
    // Check if the clicked target is outside the modal content
    if (
      !this.elementRef.nativeElement
        .querySelector('.wallet-wrapper')
        .contains(event.target)
    ) {
      document
        .getElementById('connect-wallet__wrapper')
        ?.classList.remove('open-wallet');
      document.querySelector('body')?.classList.remove('overflow-hidden');
    }
  }
}

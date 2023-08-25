import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  ReservoirClient,
  _Data1,
  _Data3,
  _Data4,
} from '@reservoir0x/reservoir-sdk';
import { Data, createClient } from '@reservoir0x/reservoir-sdk';
import { getClient, Execute } from '@reservoir0x/reservoir-sdk';

import _ from 'lodash';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
import { WalletClient } from 'viem';

export class TradeSdk {
  wallet: any = null;
  client: ReservoirClient | undefined = undefined;

  constructor(wallet: any) {
    this.wallet = wallet;
    this.client = createClient({
      chains: [
        {
          id: 1,
          baseApiUrl: 'https://api.reservoir.tools',
          active: true,
          apiKey: '78ee81f7-5422-5c3f-b7d8-580f1ae2c8e0',
        },
        {
          id: 137,
          baseApiUrl: 'https://api-polygon.reservoir.tools',
          active: true,
          apiKey: '78ee81f7-5422-5c3f-b7d8-580f1ae2c8e0',
        },
      ],
      source: 'marketplace.1inch',
    }) as ReservoirClient;
  }

  // https://docs.reservoir.tools/reference/buytoken
  buyNft = async (data: _Data1) => {
    console.log('Buy: data', data);
    console.log('Buy: chainid', this.wallet.chain.id);
    // console.log('Buy: address', await this.wallet.getAddresses());

    try {
      return await this.client?.actions?.buyToken({
        items: data.items,
        wallet: this.wallet,
        chainId: this.wallet.chain.id,
        // precheck: true,
        // expectedPrice: data.expectedPrice,
        // options: data.options,
        onProgress: (steps: Execute['steps']) => {
          console.log('--- my steps', steps);
        },
      });
    } catch (error: any) {
      console.log(error, 'err');
      return false;
    }
  };

  // Reference: https://docs.reservoir.tools/reference/listtoken
  listToken = async (data: _Data3) => {
    console.log('List: data', data);
    console.log('List: wallet', data.wallet);
    console.log('List: chainid', this.wallet.chain.id);
    console.log('List: address', await this.wallet.getAddresses());

    try {
      // ---  PARAMS ---
      // listings: [{token: '232323:232', quantity: 1, wei}]
      // wallet: ReservoirWallet | WalletClient;
      // chainId?: number;
      // precheck?: boolean;
      // onProgress?: (steps: Execute['steps']) => any;

      return await this.client?.actions.listToken({
        listings: data.listings,
        wallet: this.wallet,
        chainId: this.wallet.chain.id,
        onProgress: (steps: Execute['steps']) => {
          console.log('--- my steps', steps);
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  placeBid = async (data: _Data4) => {
    console.log('Bid: data', data);
    console.log('Bid: wallet', data.wallet);
    console.log('Bid: chainid', this.wallet.chain.id);
    console.log('Bid: address', await this.wallet.getAddresses());

    try {
      // ---  PARAMS ---
      // listings: [{token: '232323:232', quantity: 1, weiPrice: 30000000000000000000}]
      // wallet: ReservoirWallet | WalletClient;
      // chainId?: number;
      // precheck?: boolean;
      // onProgress?: (steps: Execute['steps']) => any;

      return await this.client?.actions.placeBid({
        bids: data.bids,
        wallet: this.wallet,
        chainId: this.wallet.chain.id,
        onProgress: (steps: Execute['steps']) => {
          console.log('--- my steps', steps);
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  };
}

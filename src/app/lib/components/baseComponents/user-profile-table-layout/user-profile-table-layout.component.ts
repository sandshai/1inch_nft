import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/lib/services/shared-data.service';
// import * as dayjs from 'dayjs';

@Component({
  selector: 'app-user-profile-table-layout',
  templateUrl: './user-profile-table-layout.component.html',
})
export class UserProfileTableLayoutComponent {
  @Input() data: any;
  @Input() layOutTable: string | undefined;
  @Input() statusType: any;
  @Input() chain: string | undefined;

  daysAgo: any;
  offersExpiryDate: any;
  selectedChain: any;

  constructor(private rouetr: Router, private shared: SharedDataService) {}
  formatAddress(value: any) {
    return `${value.slice(0, 4)}...${value.slice(-4)}`;
  }

  ngOnInit() {
    let chain = this.shared.getChain();

    if (chain.name === 'Polygon') {
      this.selectedChain = 'polygon';
    } else if (chain.name === 'Ethereum') {
      this.selectedChain = 'ethereum';
    }
  }

  handleTimeCalculation(value: any): void {
    const givenDate = new Date(value);
    const currentDate = new Date();

    let timeDifferenceInMilliseconds =
      currentDate.getTime() - givenDate.getTime();

    let timeDifferenceInMinutes = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60)
    );
    let timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    let timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

    let finalTime;

    if (timeDifferenceInDays > 0) {
      finalTime = `${timeDifferenceInDays} day${
        timeDifferenceInDays === 1 ? '' : 's'
      } ago`;
    } else if (timeDifferenceInHours > 0) {
      finalTime = `${timeDifferenceInHours} hour${
        timeDifferenceInHours === 1 ? '' : 's'
      } ago`;
    } else {
      finalTime = `${timeDifferenceInMinutes} minute${
        timeDifferenceInMinutes === 1 ? '' : 's'
      } ago`;
    }

    this.daysAgo = finalTime;
  }

  getOfferExpiryDate(value: any) {
    let offerExpiryDate = new Date(value).getDate();

    this.offersExpiryDate = offerExpiryDate;
  }

  goFromActivityPage(contract: any, id: any, chain: any) {
    this.rouetr.navigate([`item`, chain, contract, id]);
  }

  goFromOffersPage(contract: any, id: any, chain: any) {
    this.rouetr.navigate([`item`, chain, contract, id]);
  }

  goFromPortPage(contract: any, id: any, chain: any) {
    this.rouetr.navigate([`item`, chain, contract, id]);
  }
}

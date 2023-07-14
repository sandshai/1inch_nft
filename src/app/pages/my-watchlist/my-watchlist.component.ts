import { Component } from '@angular/core';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html'
})
export class MyWatchlistComponent {
  layout: string = "table";

  dummyData: any = [];
  ngOnInit() {
    this.dummyDataFun();
  }

  dummyDataFun() {
    for (let index = 0; index < 15; index++) {
      let status = index % 2;

      this.dummyData.push({
        'id': index,
        'flag' : status == 0 ? true : false
      })

    }
  }

  setPageLayout(value: string) {
    this.layout  = value
  }
}

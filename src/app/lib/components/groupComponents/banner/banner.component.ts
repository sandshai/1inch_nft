import { Component } from '@angular/core';
import { async } from 'rxjs';
import { CrudService } from 'src/app/lib/services/crud.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  constructor(private _crudService: CrudService) {}
  sort = {
    '1day': '1DayVolume',
    '7day': '7DayVolume',
    '30day': '30DayVolume',
  };
  trendingCollections: any = [];
  selectedChain: any = 'Ethereum';
  limit = 20;
  pagination: string = '';

  normalizeRoyalties = false;
  sortBy: string = this.sort['7day'];
  isLoading = false;
  loadMoreStatus = false;
  bannerData: any = [];
  tempData: any = [];
  search = false;

  shortList = [
    'Bored Ape Yacht Club',
    'Azuki',
    'Moonbirds',
    'Pudgy Penguins',
    'Doodles',
  ];

  ngOnInit() {
    this.getTrendingCollections(this.sortBy);
  }
  getCollections = async (collections: any) => {
    collections.filter((CollectData: any) => {
      if (
        this.shortList.includes(CollectData.name) &&
        !this.tempData.includes(CollectData.name)
      ) {
        let index = this.shortList?.findIndex(
          (item) => item === CollectData?.name
        );
        this.bannerData.splice(index, 0, CollectData);

        this.tempData.push(CollectData?.name);

        return CollectData;
      }
    })[0];
  };

  getTrendingCollections = async (sortBy?: string, chain?: any) => {
    for (let i = 0; i < this.shortList.length; i++) {
      this._crudService
        .getAll(
          `collections/v5?limit=${this.limit}&sortBy=${sortBy}&name=${this.shortList[i]}`,
          this.search
        )
        .subscribe((response) => {
          this.trendingCollections = response?.collections;
          this.getCollections(response?.collections);
        });
    }
  };
}

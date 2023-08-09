import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/lib/services/crud.service';

@Component({
  selector: 'app-collection-filter',
  templateUrl: './collection-filter.component.html'
})
export class CollectionFilterComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private _crudService: CrudService
  ) {}

  collectionId: any;
  collectionsAttributes: any;
  collectionList: any = [];
  collectionName: any;
  buyNowTextClr: any;
  buyBidNowTextClr: any;
  search: boolean = false;

  @Output() close_filter = new EventEmitter<boolean>();

  ngOnInit() {
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('{id}');

    this.collectionName =
      this.activatedRoute.snapshot.paramMap.get('{{collection}}');

    this.getCollectionAttributes();
  }

  getCollectionAttributes = () => {
    this._crudService
      .getAll(`collections/${this.collectionId}/attributes/all/v4`, this.search)
      .subscribe((response) => {
        this.collectionsAttributes = response?.attributes;

        if (this.collectionsAttributes) {
          for (let i = 0; i < this.collectionsAttributes.length; i++) {
            this.collectionList.push(this.collectionsAttributes[i]);
          }
        }
      });
  };

  closeFilter() {
    this.close_filter.emit(false);
  }

  buyCheckBoxFun(value: any) {
    this.buyNowTextClr = value;
  }

  bidCheckBoxFun(value: any) {
    this.buyBidNowTextClr = value;
  }
}

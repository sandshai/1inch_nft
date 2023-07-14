import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-portfolio-tab',
  templateUrl: './user-portfolio-tab.component.html'
})
export class UserPortfolioTabComponent {
  getScreenWidth: any;
  getScreenHeight: any;
  dummyData: any = [
    {
      "key" : "status",
      "value": [
        {
          "label": "Show all",
          "count" : 140
        },
        {
          "label": "Listed",
          "count" : 100
        }
      ]
    },
    {
      "key" : "Chains",
      "value": [
        {
          "label": "OpenSea",
          "count" : 140
        },
        {
          "label": "X2Y2",
          "count" : 140
        },
        {
          "label": "LooksRare",
          "count" : 140
        },
        {
          "label": "Tofunft",
          "count" : 140
        },
      ]
    }
  ];
  dummyNftCollections: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  layOut: string = 'card';

  @Input() is_listItemOpen: boolean | undefined;
  @Input() filterIsOpen: boolean | undefined;
  @Output() listItemNewEvent = new EventEmitter<boolean>();

  listItemEvent(value : boolean) {
    this.listItemNewEvent.emit(value)
  }

  setLayOut(value :string) {
    this.layOut = value;
  }
}

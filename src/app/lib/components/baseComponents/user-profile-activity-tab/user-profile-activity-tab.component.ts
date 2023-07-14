import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-activity-tab',
  templateUrl: './user-profile-activity-tab.component.html'
})
export class UserProfileActivityTabComponent {
  dummyData: any = [
    {
      "key" : "Transaction",
      "value": [
        {
          "label": "Bought",
        },
        {
          "label": "Sold",
        },
        {
          "label": "Transfered",
        },
        {
          "label": "Listed",
        },
        {
          "label": "Minted",
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
  @Input() filterIsOpen: boolean | undefined;
}

import { ChangeDetectorRef, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-user-profile-activity-tab',
  templateUrl: './user-profile-activity-tab.component.html'
})
export class UserProfileActivityTabComponent {
  constructor(private cdr: ChangeDetectorRef,) { }
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
  filterIsOpen: boolean | undefined;

  ngOnInit() {
    this.cdr.detectChanges();
    this.filterLayout();
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.filterLayout();
    this.toggleBodyScroll();
  }
  filterLayout() {
    if (window.innerWidth > 1199) {
      this.filterIsOpen = true;
    } else {
      this.filterIsOpen = false;
    }
  }
  filterEvent(value:boolean) {
    this.filterIsOpen = value;
    this.toggleBodyScroll();
  }
  closePopup(value:boolean) {
    this.filterIsOpen = value;
    this.toggleBodyScroll();
  }

  private toggleBodyScroll() {
    const isMobileScreen = window.innerWidth < 992; // Adjust the width as per your requirement
    document.body.style.overflow = isMobileScreen && this.filterIsOpen ? 'hidden' : '';
  }
}

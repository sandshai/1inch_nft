import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-portfolio-tab',
  templateUrl: './user-portfolio-tab.component.html'
})
export class UserPortfolioTabComponent {
  constructor(private cdr: ChangeDetectorRef,) { }
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
        {
          "label": "Etherium",
          "count" : 140
        },
        {
          "label": "Polygon",
          "count" : 140
        },
      ]
    }
  ];
  dummyNftCollections: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  layOut: string = 'card';
  filterIsOpen: boolean | undefined;
  @Input() is_listItemOpen: boolean | undefined;
  @Output() listItemNewEvent = new EventEmitter<boolean>();

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
  listItemEvent(value : boolean) {
    this.listItemNewEvent.emit(value)
  }
  setLayOut(value :string) {
    this.layOut = value;
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

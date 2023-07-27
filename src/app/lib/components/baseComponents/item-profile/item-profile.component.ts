import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-profile',
  templateUrl: './item-profile.component.html',
})
export class ItemProfileComponent {
  @Input() itemDetail: any;
  @Input() mdImage: any;
  @Input() nftName: string | undefined;
  @Output() img_url = new EventEmitter<string>();
  @Output() downloadImageLink = new EventEmitter<string>();
  priviewImage(url: string) {
    this.img_url.emit(url);
  }

  downloadImage(cdnUrl: string) {
    const filename = this.nftName + '_nft.png';
    fetch(cdnUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        link.click();
        URL.revokeObjectURL(blobUrl);
      });
  }
}

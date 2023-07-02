import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html'
})
export class ImagePreviewComponent {
  @Input () url : string | undefined;
  @Output() is_close_preview_image = new EventEmitter<boolean>();

  closePreview() {
    this.is_close_preview_image.emit(false);
  }
}

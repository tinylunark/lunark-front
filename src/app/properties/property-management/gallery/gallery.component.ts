import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() files: File[] = [];
  @Output() filesChange = new EventEmitter<File[]>();

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFiles = (event.target as HTMLInputElement).files || new FileList();
    this.files = Array.from(selectedFiles);
    this.filesChange.emit(this.files);
    console.log(this.files);
  }
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-helper-menu',
  templateUrl: './helper-menu.component.html',
  styleUrl: './helper-menu.component.css'
})
export class HelperMenuComponent implements OnInit {
  @Input()
  items: string[] = [];

  selectedItem: string | null = null;

  @Output()
  selectedItemChange = new EventEmitter<string>();


  ngOnInit(): void {
    if (this.items.length > 0) {
      this.selectedItem = this.items[0];
    }
  }

  selectItem(item: string): void {
    if(item != this.selectedItem){
      this.selectedItem = item;
      this.selectedItemChange.emit(this.selectedItem);
    }
  }
}

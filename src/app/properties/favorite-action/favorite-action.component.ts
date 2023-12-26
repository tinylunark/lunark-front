import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-favorite-action',
  templateUrl: './favorite-action.component.html',
  styleUrl: './favorite-action.component.css'
})
export class FavoriteActionComponent {
  @Input() isChecked = false;
  @Output() isCheckedChange = new EventEmitter<boolean>();

  toggle() {
    this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }
}

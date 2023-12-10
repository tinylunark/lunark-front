import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-helper-menu',
  templateUrl: './helper-menu.component.html',
  styleUrl: './helper-menu.component.css'
})
export class HelperMenuComponent {
  @Input()
  items: string[] = [];

}

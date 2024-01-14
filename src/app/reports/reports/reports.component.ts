import {Component} from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  selectedMenuItem = 'generalReport';

  selectMenuItem(item: string) {
    this.selectedMenuItem = item;
  }
}

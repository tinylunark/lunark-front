import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.css'
})
export class SessionExpiredComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.setUser();
  }
}

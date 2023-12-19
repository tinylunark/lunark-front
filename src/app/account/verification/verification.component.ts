import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {

  gotResponse: boolean = false;
  verificationSuccessful: boolean = false;
  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.verify(id).subscribe({ 
      next: () => {
        this.verificationSuccessful = true;
        this.gotResponse = true;
      },
      error: () => {
        this.verificationSuccessful = false;
        this.gotResponse = true;
      }
    });
    
  }

}

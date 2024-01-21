import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountReportService } from '../account/account-report.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-host-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.css',
})
export class ReportDialogComponent {
  reportForm: FormGroup = new FormGroup({
    reason: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 \.!\?\'\"]+')]),
  });
  reportedUserId: number | null = null;
  title: string = "Report host";

  constructor(
    private accountReportService: AccountReportService,
    private dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: { reportedUserId: number, title: string },
    private sharedService: SharedService
  ) {
    this.reportedUserId = data.reportedUserId;
    this.title = data.title;
  }

  submitReport() {
    if (this.reportedUserId === null) {
      return;
    }

    this.accountReportService
      .reportAccount(this.reportedUserId, this.reportForm.value.reason)
      .subscribe(() => {
        this.sharedService.openSnack('User reported successfully!');
        this.dialogRef.close(true);
      });
  }
}

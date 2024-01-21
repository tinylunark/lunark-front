import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit {
  infoForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 \.!\?\'\"]+')]),
  });

  @Input()
  description: string = '';

  @Output()
  descriptionChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.infoForm.get('description')?.setValue(this.description);
  }

  onChange(): void {
    console.log("description changed");
    this.description = this.infoForm.get('description')?.value || '';
    this.descriptionChange.emit(this.description);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  infoForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  @Input() 
  description: string = '';

  @Output() 
  descriptionChange = new EventEmitter<string>();


  onChange(): void {
    console.log("description changed");
    this.description = this.infoForm.get('description')?.value || '';
    this.descriptionChange.emit(this.description);
  }
}

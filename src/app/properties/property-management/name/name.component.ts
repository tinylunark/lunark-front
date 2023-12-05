import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrl: './name.component.css'
})
export class NameComponent {
  infoForm = new FormGroup({
    propertyName: new FormControl('', [Validators.required]),
  });
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html'
})
export class FormFieldsComponent {
  @Input() form: FormGroup;
  @Input() submitted:boolean;
  @Input() registration:boolean;
  @Input() authService: AuthService;

  @Output() submit = new EventEmitter<boolean>();

  constructor() { }

  submitForm() {
    this.submit.emit(true);
  }

}

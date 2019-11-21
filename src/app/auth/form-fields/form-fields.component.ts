import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserRequest} from "../../shared/interfaces";

@Component({
  selector: 'app-form-fields',
  styleUrls: ['./form-fields.component.scss'],
  templateUrl: './form-fields.component.html'
})
export class FormFieldsComponent implements OnInit, OnChanges{

  submitted = false;
  form: FormGroup;

  @Input() isRegistration:boolean;
  @Input() authService: AuthService;

  @Output() submitData = new EventEmitter<UserRequest>();

  constructor() { }

  submitForm() {

    if(this.form.invalid) return;

    this.submitted = true;

    const user: UserRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    if(this.isRegistration){
      user.name = this.form.value.name
    }

    this.submitData.emit(user);

    this.submitted = false;
  }

  ngOnInit(): void {
    this.form = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    if(this.isRegistration){
      this.form.addControl('name', new FormControl('', [
        Validators.required
      ]));
    }
  }

  ngOnChanges(): void {
    if(!this.form) return;

    if(this.isRegistration){
      this.form.addControl('name', new FormControl('', [
        Validators.required
      ]));
    }
    else{
      this.form.removeControl('name');
    }
  }
}

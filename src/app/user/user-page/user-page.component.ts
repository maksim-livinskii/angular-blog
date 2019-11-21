import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {UserService} from "../services/user.service";
import {AlertService} from "../../shared/services/alert.service";
import {filter, map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  unsubscribe$ = new Subject();

  constructor(private userService: UserService, private alert: AlertService) {
    this.form = new FormBuilder().group({
      id: [],
      email: [],
      name: ['',[Validators.required]]
    });
  }

  ngOnInit() {
    let userId = localStorage.getItem('fb-user-id');
    this.userService.getInformationByUserId(userId).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(data => {
        if(typeof data == 'object' && Object.keys(data).length) this.form.setValue(data);
      });
  }

  submitForm() {
    console.log(this.form.getRawValue());
    this.userService.saveInformation(this.form.getRawValue())
      .subscribe(user=>{
        this.alert.success('Информация сохранена');
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

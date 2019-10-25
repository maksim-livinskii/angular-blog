import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertTypes, ALERT_TYPES} from "../../../../shared/interfaces";
import {Alert, AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input()
  delay = 5000;

  public alerts:Alert[] = [];
  public alertTypes = ALERT_TYPES;
  private sub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.sub = this.alertService.alert$
      .subscribe(alert=>{
        this.alerts.push(alert);
        const timeout = setTimeout(()=>{
          clearTimeout(timeout);
          this.alerts.splice(this.alerts.findIndex(item => item == alert),1);
        },this.delay);
      })
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

}

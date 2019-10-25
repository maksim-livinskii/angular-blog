import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ALERT_TYPES, AlertTypes} from "../../../shared/interfaces";

export interface Alert {
  type: AlertTypes,
  text: string
}

@Injectable()
export class AlertService {
  public alert$: Subject<Alert> = new Subject<Alert>();

  success(text: string){
    this.alert({
      type: ALERT_TYPES.Success,
      text
    });
  }

  warning(text: string){
    this.alert({
      type: ALERT_TYPES.Warning,
      text
    });
  }

  info(text: string){
    this.alert({
      type: ALERT_TYPES.Info,
      text
    });
  }

  error(text: string){
    this.alert({
      type: ALERT_TYPES.Error,
      text
    });
  }

  private alert(alert:Alert){
    this.alert$.next(alert);
  }
}

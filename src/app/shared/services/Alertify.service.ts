import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
  providedIn: "root"
})
export class AlertifyService {
  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, e => { if (e) okCallback(); });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

  alert(title, message: string) {
    alertify.defaults.theme.ok = "ws-btn ws-focus-border";
    alertify.dialog("alert").set({
      title,
      message,
      transition:'zoom',
      movable: false
    }).set('label', 'OK').show();
  }
}

import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
  providedIn: "root"
})
export class AlertifyService {
  constructor() {}

  confirm(title: string, message: string, okCallback: () => any) {
    alertify.defaults.theme.ok = "ws-btn ws-focus-border";
    alertify.defaults.theme.cancel = "ws-btn ws-focus-border";
    // TODO: Promisify
    alertify
      .confirm(message, (e: any) => {
        if (e) okCallback();
      })
      .setting({
        title,
        message,
        modal: true,
        closable: true
      })
      .set("labels", { ok: "Yes", cancel: "No" });
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

  alert(title: string, message: string) {
    alertify.defaults.theme.ok = "ws-btn ws-focus-border";
    alertify
      .dialog("alert")
      .set({
        title,
        message,
        transition: "zoom",
        movable: false
      })
      .set("label", "OK")
      .show();
  }
}

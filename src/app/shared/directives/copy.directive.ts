import { AlertifyService } from "./../services/Alertify.service";
import { Directive, HostListener, Input, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Directive({
  selector: "[wsCopyClipboard]"
})
export class CopyDirective {
  @Input("element") element: any;
  window: Window;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private alertify: AlertifyService
  ) {
    this.window = this.document.defaultView.window;
  }

  @HostListener("click") onClick() {
    const navigator = this.window.navigator as any;
    if (this.element.link)
      navigator.clipboard
        .writeText(this.element.link)
        .then(() =>
          this.alertify.success(
            `'${this.element.title || this.element.name}' link copied to clipboard.`
          )
        )
        .catch(err => console.log("Could not copy item.", err));
  }
}

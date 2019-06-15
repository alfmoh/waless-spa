import { Directive, Input, OnInit, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[wsCarousel]"
})
export class CarouselDirective implements OnInit {
  @Input("carouselActive") carouselActive: boolean;
  leftButton: any;
  rightButton: any;
  buttonContainer: any;
  parent: any;
  private val = 0;
  private switcher = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.carouselActive) {
      this.renderer.addClass(this.el.nativeElement, "ws-carousel");
      this.createButtons();
      this.activateButtons();
    }
  }
  activateButtons() {
    this.leftButton.addEventListener("click", () => {
      if (this.val !== 800) {
        this.val += 400;
        if (this.switcher) this.val += 400;
        this.el.nativeElement.style.transform = `translateX(${this.val}px)`;
        this.switcher = false;
      }
    });
    this.rightButton.addEventListener("click", () => {
      if (!(this.val < -800)) {
        if (!this.switcher) this.val -= 400;
        this.el.nativeElement.style.transform = `translateX(${this.val}px)`;
        this.val -= 400;
        this.switcher = true;
      }
    });
  }
  private createButtons() {
    this.leftButton = this.renderer.createElement("i");
    this.leftButton.style.marginRight = "10px";
    this.leftButton.classList.add(
      "browse-item-btns__btn-left",
      "fa",
      "fa-angle-left",
      "ws-btn",
      "browse-item-btns__btn"
    );

    this.rightButton = this.renderer.createElement("i");
    this.rightButton.classList.add(
      "browse-item-btns__btn-right",
      "fa",
      "fa-angle-right",
      "ws-btn",
      "browse-item-btns__btn"
    );

    this.buttonContainer = this.renderer.createElement("div");
    this.buttonContainer.classList.add("browse-item-btns");
    this.buttonContainer.appendChild(this.leftButton);
    this.buttonContainer.appendChild(this.rightButton);

    this.parent = this.el.nativeElement.parentElement;
    this.parent.style.overflowX = "hidden";
    // this.el.nativeElement.style.transform = `translateX(200px)`;
    this.parent.insertBefore(this.buttonContainer, this.el.nativeElement);
  }
}

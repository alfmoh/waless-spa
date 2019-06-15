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
      if (!this.switcher) this.val -= 30;
      this.el.nativeElement.style.transform = `translateX(${this.val}%)`;
      this.val -= 30;
      this.switcher = true;
    });
    this.rightButton.addEventListener("click", () => {
      this.val += 30;
      if (this.switcher) this.val += 30;
      this.el.nativeElement.style.transform = `translateX(${this.val}%)`;
      this.switcher = false;
    });
  }
  private createButtons() {
    this.leftButton = this.renderer.createElement("i");
    this.leftButton.style.fontSize = "30px";
    this.leftButton.style.marginRight = "10px";
    this.leftButton.classList.add("browse-item-btns__btn-left", "fa", "fa-arrow-left", "ws-btn");

    this.rightButton = this.renderer.createElement("i");
    this.rightButton.style.fontSize = "30px";
    this.rightButton.classList.add("browse-item-btns__btn-right", "fa", "fa-arrow-right", "ws-btn");

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

import { AlertifyService } from "./../../../shared/services/Alertify.service";
import { AuthComponent } from "./../auth/auth.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "ws-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  auth(join) {
    const modalRef = this.modalService.open(AuthComponent);
    if (join) modalRef.componentInstance.join = true;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("Logged out");
  }
}

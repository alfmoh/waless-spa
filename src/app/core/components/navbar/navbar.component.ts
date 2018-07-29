import { AlertifyService } from "./../../../shared/services/Alertify.service";
import { AuthComponent } from "./../auth/auth.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ws-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  auth(join) {
    const modalRef = this.modalService.open(AuthComponent);
    if (join) modalRef.componentInstance.join = true;
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("Logged out");
  }
}

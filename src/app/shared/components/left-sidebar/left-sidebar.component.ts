import { AuthService } from "./../../../core/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ws-leftsidebar",
  templateUrl: "./left-sidebar.component.html",
  styleUrls: ["./left-sidebar.component.scss"]
})
export class LeftSidebarComponent implements OnInit {
  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit() {}
}

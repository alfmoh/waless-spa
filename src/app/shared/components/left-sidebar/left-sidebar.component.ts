import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ws-leftsidebar",
  templateUrl: "./left-sidebar.component.html",
  styleUrls: ["./left-sidebar.component.scss"]
})
export class LeftSidebarComponent implements OnInit {
  returnUrl;

  constructor(public router: Router) {
    this.returnUrl = localStorage.getItem("returnUrl");
  }

  ngOnInit() {}
}

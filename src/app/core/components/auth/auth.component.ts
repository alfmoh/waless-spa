import { AuthService } from './../../services/auth.service';
import { NgbActiveModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertifyService } from "../../../shared/services/Alertify.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  regForm: FormGroup;
  @ViewChild(NgbTabset) tabSet: NgbTabset;
  join: boolean;
  loginError: boolean;
  regError: any;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.regForm = fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    })
  }

  ngOnInit() {
    setTimeout(() => { if (this.join) this.tabSet.select("ws-join"); })
  }

  get loginEmail() { return this.loginForm.get("email"); }

  get loginPassword() { return this.loginForm.get("password"); }

  get regUsername() { return this.regForm.get("username"); }
  get regEmail() { return this.regForm.get("email"); }
  get regPassword() { return this.regForm.get("password"); }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(next => {
        this.afterAuth("Logged In");
      }, err => {
        this.loginError = true;
      })
  }

  register() {
    this.authService.register(this.regForm.value)
      .subscribe(next => {
        this.afterAuth("Registered sucessfully");
      }, err => {
        this.regError = err.error;
      })
  }

  private afterAuth(alertifyMsg) {
    let returnUrl = localStorage.getItem("returnUrl");
    this.alertify.success(alertifyMsg);

    if (returnUrl) {
      this.router.navigate([returnUrl]).then(() => {
        localStorage.removeItem("returnUrl");
      })
    }
    else this.router.navigate(["browse"]);
    this.activeModal.close();
  }
}

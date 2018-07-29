import { AuthService } from './../../services/auth.service';
import { NgbActiveModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  regForm: FormGroup;
  @ViewChild(NgbTabset) tabSet: NgbTabset;
  join: boolean;

  constructor(
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
      password: ["", Validators.required]
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
        console.log("Logged in sucessfully")
      }, err => console.log("Failed to login"))
    this.activeModal.close();
  }

  register() { this.submit(this.regForm) }

  submit(formType) {
    console.log(formType.value);
    this.activeModal.close();
  }

}

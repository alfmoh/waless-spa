import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  regForm: FormGroup;

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) {
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
  }

  get loginEmail() { return this.loginForm.get("email"); }

  get loginPassword() { return this.loginForm.get("password"); }

  get regUsername() { return this.regForm.get("username"); }
  get regEmail() { return this.regForm.get("email"); }
  get regPassword() { return this.regForm.get("password"); }

  login() { this.submit(this.loginForm) }
  register() { this.submit(this.regForm) }

  submit(formType) {
    console.log(formType.value);
    this.activeModal.close();
  }

}

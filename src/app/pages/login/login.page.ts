import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.maxLength(100),
          Validators.required,
          Validators.email,
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {}

  async onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    await this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

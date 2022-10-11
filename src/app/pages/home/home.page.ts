import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: Firestore
  ) {}

  async signOut() {
    await this.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
}

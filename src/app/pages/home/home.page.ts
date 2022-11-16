import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  organisation: Organisation = {
    name: '',
    tokenIssuer: '',
    xrpIssuer: '',
    ledger: '',
    tokenSymbol: '',
  };

  orgDoc: AngularFirestoreDocument;

  constructor(
    public auth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: Firestore,
    private afs: AngularFirestore,
    private toastCtrl: ToastController
  ) {}

  async signOut() {
    await this.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }

  ngOnInit() {
    this.auth.user.subscribe(({ uid }) => {
      const users = doc(this.firestore, `users/${uid}`);
      docData(users).subscribe(({ org }) => {
        if (org) {
          this.orgDoc = this.afs.doc(`organisations/${org}`);
          const orgData = this.orgDoc.valueChanges();
          orgData.subscribe((data: Organisation) => {
            this.organisation = data;
          });
        }
      });
    });
  }

  async saveTokenIssuer(tokenIssuer: string) {
    await this.orgDoc.update({ tokenIssuer });
    this.notify();
  }

  async saveXrpIssuer(xrpIssuer: string) {
    await this.orgDoc.update({ xrpIssuer });
    this.notify();
  }

  async saveLedger(ledger: string) {
    await this.orgDoc.update({ ledger });
    this.notify();
  }

  async saveSymbol(tokenSymbol: string) {
    await this.orgDoc.update({ tokenSymbol });
    this.notify();
  }

  async notify() {
    const toast = await this.toastCtrl.create({
      message: 'Update was successful',
      color: 'success',
      duration: 1500,
    });

    await toast.present();
  }
}

interface Organisation {
  name: string;
  tokenIssuer: string;
  xrpIssuer: string;
  ledger: string;
  tokenSymbol: string;
}

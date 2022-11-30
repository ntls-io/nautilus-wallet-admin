import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  colors = [
    { name: 'primary', value: '' },
    { name: 'secondary', value: '' },
    { name: 'tertiary', value: '' },
    { name: 'success', value: '' },
    { name: 'warning', value: '' },
    { name: 'danger', value: '' },
    { name: 'medium', value: '' },
    { name: 'light', value: '' },
    { name: 'dark', value: '' },
  ];

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
    this.auth.user.pipe(untilDestroyed(this)).subscribe((user) => {
      const uid = user?.uid;
      if (uid) {
        const users = doc(this.firestore, `users/${uid}`);
        docData(users)
          .pipe(untilDestroyed(this))
          .subscribe(({ orgs }) => {
            console.log(orgs);
            if (orgs?.length) {
              this.orgDoc = this.afs.doc(`organisations/${orgs[0]}`);
              const orgData = this.orgDoc.valueChanges();
              orgData
                .pipe(untilDestroyed(this))
                .subscribe((data: Organisation) => {
                  this.organisation = data;
                });
            }
          });
      }
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

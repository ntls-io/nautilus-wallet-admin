import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

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
    issuer: '',
    ledger: '',
    code: '',
  };

  orgDoc: any;

  constructor(
    public auth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: Firestore,
    private afs: AngularFirestore
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
          orgData.subscribe((data) => {
            this.organisation = data;
          });
        }
      });
    });
  }

  saveIssuer(issuer: string) {
    console.log(issuer);
    this.orgDoc.update({ issuer });
  }

  saveLedger(value) {}
}

interface Organisation {
  name: string;
  issuer: string;
  ledger: string;
  code: string;
}

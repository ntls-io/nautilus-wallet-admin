<template>
  <b-container>
    <b-row>
      <b-col cols="auto">
        <b-form-group label="Organisation list" label-size="lg">
          <b-form-select
            v-model="orgSelected"
            :options="orgsOptions"
            @change="selectOrg($event)"
            class="text-capitalize"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >Select an organisation
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="auto">
        <b-form-group label="Environments" label-size="lg">
          <b-form-select
            :disabled="!orgSelected"
            v-model="envSelected"
            :options="envOptions"
            @change="selectEnv($event)"
            class="text-capitalize"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-card v-if="orgSelected">
      <template #header>
        <h3>Organisation Options</h3>
      </template>

      <b-form @submit.prevent="updateOptions" id="orgOptions">
        <b-form-row>
          <b-col cols="6">
            <b-form-group label="Token Issuer:">
              <b-form-input
                v-model="form.tokenIssuer"
                type="text"
                placeholder="Enter Token issuer"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Token Symbol:">
              <b-form-input
                v-model="form.tokenSymbol"
                type="text"
                placeholder="Enter Token symbol"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="XRP Issuer:">
              <b-form-input
                v-model="form.xrpIssuer"
                type="text"
                placeholder="Enter XRP issuer"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Ledger:">
              <b-form-input
                v-model="form.ledger"
                type="text"
                placeholder="Enter Ledger"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-form>

      <template #footer>
        <b-button type="submit" form="orgOptions" variant="primary"
          >Save
        </b-button>
      </template>
      <b-overlay :show="isBusy" no-wrap></b-overlay>
    </b-card>
  </b-container>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();
export default {
  name: "Home",
  created() {
    if (!auth.currentUser) {
      this.$router.push("/");
    } else {
      this.getOrgs();
    }
  },
  data() {
    return {
      envSelected: "staging",
      envOptions: ["staging", "production"],
      orgSelected: null,
      orgsOptions: [],
      form: {
        tokenIssuer: "",
        tokenSymbol: "",
        xrpIssuer: "",
        ledger: ""
      },
      isBusy: false
    };
  },
  methods: {
    async getOrgs() {
      const { uid } = auth.currentUser;
      const user = doc(db, `users/${uid}`);

      await getDoc(user)
        .then(doc => {
          if (doc.exists) {
            const { orgs } = doc.data();
            this.orgsOptions = orgs;
          } else {
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    },
    async selectOrg(name) {
      this.isBusy = true;
      const org = doc(db, `organisations/${name}`);

      await getDoc(org)
        .then(doc => {
          if (doc.exists) {
            const docData = doc.data();
            const data = docData[this.envSelected];
            if (data) {
              Object.assign(this.form, data);
            } else {
              Object.assign(this.form, {
                tokenIssuer: "",
                tokenSymbol: "",
                xrpIssuer: "",
                ledger: ""
              });
            }
          } else {
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    selectEnv() {
      this.selectOrg(this.orgSelected);
    },
    updateOptions() {
      const org = doc(db, `organisations/${this.orgSelected}`);

      updateDoc(org, {
        [this.envSelected]: this.form
      })
        .then(() => {
          console.log("Document successfully written!");
          this.$bvToast.toast(`values successfully updated!`, {
            title: "Organisation Options",
            autoHideDelay: 5000,
            variant: "success"
          });
        })
        .catch(error => {
          console.error("Error writing document: ", error);
          this.$bvToast.toast(error, {
            title: "Oops!",
            autoHideDelay: 5000,
            variant: "danger"
          });
        });
    }
  }
};
</script>

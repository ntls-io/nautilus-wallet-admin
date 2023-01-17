<template>
  <b-container fluid>
    <b-row class="h-100 justify-content-center">
      <b-col sm="6" md="5" lg="4" xl="3">
        <b-card>
          <form @submit.prevent="login">
            <b-form-group>
              <b-form-input
                trim
                type="email"
                v-model="$v.form.body.email.$model"
                :state="validateState('email')"
                placeholder="Email Address"
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mb-2">
              <b-form-input
                trim
                type="password"
                placeholder="Password"
                v-model="$v.form.body.password.$model"
                :state="validateState('password')"
              ></b-form-input>
            </b-form-group>
            <b-button variant="primary" block type="submit">
              SIGN IN
            </b-button>
          </form>
          <b-overlay :show="isBusy" no-wrap></b-overlay>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default {
  name: "Login",
  created() {
    if (auth.currentUser) {
      this.$router.push({ name: "Home" });
    }
  },
  data() {
    return {
      isBusy: false,
      form: {
        body: {
          email: "",
          password: ""
        },
        staySignedIn: false,
        errors: {}
      }
    };
  },
  validations: {
    form: {
      body: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
  },
  methods: {
    async login() {
      this.$v.form.body.$touch();

      if (!this.$v.form.body.$anyError) {
        this.isBusy = true;

        const { email, password } = this.form.body;

        await signInWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            const user = userCredential.user.toJSON();
            if (user) {
              this.$router.push({ name: "Home" });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form.body[name];
      return $dirty ? !$error : null;
    }
  }
};
</script>

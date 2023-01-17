<template>
  <b-navbar class="main-header bg-white border-0">
    <b-nav class="navbar-nav" pills>
      <b-nav-item @click="toggle()" v-if="false">
        <b-icon icon="layout-sidebar-inset"></b-icon>
      </b-nav-item>
    </b-nav>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto" v-if="user">
      <b-nav-item-dropdown :text="user.email" toggle-class="text-dark ">
        <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>
  </b-navbar>
</template>

<script lang="js">
import pushMenu from "@/mixins/PushMenu";
import { getAuth } from "firebase/auth";

const auth = getAuth();
export default {
  mixins: [pushMenu],
  computed: {
    user() {
      return auth.currentUser;
    }
  },
  methods: {
    async logout() {
      await auth.signOut();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <div class="content-wrapper">
      <div class="content pt-3">
        <slot />
      </div>
    </div>
    <div id="sidebar-overlay" @click="collapse()"></div>
  </div>
</template>

<script>
import Navbar from "@/components/Layout/Navbar";
import pushMenu from "@/mixins/PushMenu";

export default {
  props: ["menu"],
  mixins: [pushMenu],
  components: {
    Navbar
  }
};
</script>

<template>
  <footer>
    <div class="text-center small">
      <div>
        Copyright © {{ year }}.
        <span class="font-weight-bold">Nautilus Enterprises.</span>
      </div>
      <a class="font-weight-bold" href="#">Privacy </a>
      <span class="font-weight-lighter">and </span>
      <a class="font-weight-bold" href="#">Terms of Use</a>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
</style>

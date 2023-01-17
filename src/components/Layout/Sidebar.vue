<template>
  <aside class="main-sidebar sidebar-light-dark border-right">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link"> </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <b-nav pills class="nav-sidebar flex-column nav-child-indent">
          <li
            class="nav-item"
            :class="service.path === $route.path ? 'menu-open' : ''"
            v-for="service in menu"
            :key="service.name"
          >
            <b-link
              class="nav-link"
              :to="service.path"
              exact-active-class="active"
            >
              <b-icon :icon="service.icon" class="nav-icon"></b-icon>
              <p>
                {{ service.title }}
                <b-icon
                  v-if="service.items"
                  :icon="
                    service.path === $route.path
                      ? 'chevron-down'
                      : 'chevron-left'
                  "
                  class="right"
                  font-scale="1"
                ></b-icon>
              </p>
            </b-link>
            <b-nav class="nav-treeview">
              <b-nav-item
                v-for="(item, i) in service.items"
                :key="i"
                exact-active-class="active"
                :to="item.path"
              >
                <b-icon :icon="item.icon" class="nav-icon"></b-icon>
                <p>
                  {{ item.title }}
                </p>
              </b-nav-item>
            </b-nav>
          </li>
        </b-nav>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  data: () => ({
    menu: [
      {
        title: "Home",
        name: "home",
        path: "/home",
        icon: "columns-gap"
      }
    ]
  }),
  methods: {
    navigate(url) {
      if (url) {
        url.includes("http")
          ? (window.location.href = url)
          : this.$router.push(url);
      }
    }
  }
};
</script>

<style></style>

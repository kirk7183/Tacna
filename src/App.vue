<template>
  <v-app class="app">
    <Navbar v-if="this.$route.path != '/'"></Navbar>
    <ExtraOptionFab></ExtraOptionFab>
    <v-main class="v-main">
      <transition name="fade" mode="out-in" class="pageTransition">
        <router-view></router-view>
      </transition>
      <ScrollUpFab></ScrollUpFab>
    </v-main>
    <Footer v-if="this.$route.path != '/'"></Footer>
  </v-app>
</template>

<script>
import Footer from "@/views/main/Footer.vue";
import Navbar from "@/views/main/Navbar.vue";
import ScrollUpFab from "@/views/main/ScrollUp_Fab.vue";
import ExtraOptionFab from "@/views/main/ExtraOption_Fab.vue";
export default {
  name: "App",
  components: {
    Footer,
    Navbar,
    ScrollUpFab,
    ExtraOptionFab,
  },

  data: () => ({}),
};
</script>
<style lang="scss" src="./scss/main.scss">
</style>

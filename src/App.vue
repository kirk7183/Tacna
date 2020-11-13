<template>
  <v-app class="app">
    <Navbar v-if="this.$route.path != '/'"></Navbar>
    <v-main class="v-main">
      <transition name="fade" mode="out-in" class="pageTransition">
        <router-view></router-view>
      </transition>
    </v-main>
    <Footer v-if="this.$route.path != '/'"></Footer>
  </v-app>
</template>

<script>
import Footer from "@/views/main/Footer.vue";
import Navbar from "@/views/main/Navbar.vue";
export default {
  name: "App",

  components: {
    Footer,
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" src="./scss/main.scss">
</style>

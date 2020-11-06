<template>
  <v-app class="app">
    <!-- <Intro /> -->
    <v-main class="v-main">
      <transition name="fade" mode="out-in" class="pageTransition">
        <router-view></router-view>
      </transition>
      <!-- <footerMoj v-if="this.$route.path != '/'"></footerMoj> -->
    </v-main>
  </v-app>
</template>

<script>
// import footerMoj from "./views/Footer.vue";

export default {
  name: "App",

  components: {
    // footerMoj,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" src="./scss/main.scss">
</style>

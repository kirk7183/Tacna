<template>
  <v-app class="app">
    <!-- <Intro /> -->
    <v-main class="v-main">
      <transition name="fade" mode="out-in" class="pageTransition">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
// import Intro from "./views/Intro";

export default {
  name: "App",

  components: {
    // Intro,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" src="./scss/main.scss">
</style>

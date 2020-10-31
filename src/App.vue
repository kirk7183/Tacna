<template>
  <v-app>
    <Intro />
  </v-app>
</template>

<script>
import Intro from "./views/Intro";

export default {
  name: "App",

  components: {
    Intro,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" src="./scss/main.scss">
</style>

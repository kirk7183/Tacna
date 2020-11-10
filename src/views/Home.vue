<template>
  <v-container class="mainPage" fluid :class="breakpoints">
    <transition name="fade" mode="out-in">
      <router-view> </router-view
    ></transition>
    <!-- IMPORT COMPONENT-->
    <Snackbar></Snackbar>
  </v-container>
</template>

<script>
import Snackbar from "../components/add-ons/Snackbar.vue";
export default {
  components: { Snackbar },
  computed: {
    breakpoints() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
          return {
            "sm-breakpoint md-breakpoint lg-breakpoint": this.$vuetify
              .breakpoint.lgAndUp,
          };
        case "md":
          return {
            "sm-breakpoint md-breakpoint": this.$vuetify.breakpoint.mdAndUp,
          };
        case "sm":
          return { "sm-breakpoint": this.$vuetify.breakpoint.smAndUp };
        default:
          return { "": this.$vuetify.breakpoint.xs }; //default je XS i pisemo normalno bez oznacavanja klase
      }
    },
  },
};
</script>


<template>
  <v-container class="aukcija" fluid :class="breakpoints">
    <div class="content">
      <p>dsadasd</p>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    breakpoints() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
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

<style>
</style>
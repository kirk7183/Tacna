<template>
  <div class="ScrollUp_Fab">
    <v-fab-transition>
      <v-btn
        class="margin-up"
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        small
        bottom
        fixed
        right
        color="#0099C3"
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style>
</style>
<template>
  <!-- <v-container class="ma-5"> -->
  <div class="text-center ma-2">
    <v-snackbar
      v-model="update.boolean"
      :color="update.color"
      :timeout="timeout"
    >
      {{ update.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          outlined
          v-bind="attrs"
          @click="update = false"
        >
          Zatvori
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  <!-- </v-container> -->
</template>

<script>
export default {
  data() {
    return {
      timeout: 5000000,
      snackbar: false,
    };
  },
  computed: {
    update: {
      get() {
        return this.$store.getters.get_snackbar_status;
      },
      set(newValue) {
        this.$store.dispatch("set_snackbar", newValue);
      },
    },
  },
};
</script>

<style>
</style>
<template>
  <v-dialog v-model="dialog_loading" persistent width="300">
    <v-card color="primary" dark>
      <v-card-text class="body-1 pa-3 pb-4">
        <slot name="ispis"></slot>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      //   dialog_loadin: true,
    };
  },
  computed: {
    dialog_loading: {
      get() {
        return this.$store.getters.get_dialog_loading_status;
      },
      // set(newVal){
      //     this.$store.
      // }
    },
  },
};
</script>

<style>
</style>
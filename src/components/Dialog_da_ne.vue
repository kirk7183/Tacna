<template>
  <v-dialog v-model="facebook_logout" max-width="400px">
    <v-card>
      <v-card-title
        class="dialog_title justify-center"
        :class="
          $vuetify.breakpoint.xs
            ? `subtitle-1`
            : $vuetify.breakpoint.smAndDown
            ? `title`
            : $vuetify.breakpoint.md
            ? `headline`
            : `headline`
        "
      >
        <slot name="title">Ovde ide title</slot>
      </v-card-title>
      <v-card-text xs-12 sm6 offset-sm3>
        <slot name="text"> </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" class="dugme" @click="obradi_dialog">Da</v-btn>
        <v-btn color="error" class="dugme" @click="facebook_logout = false"
          >Ne</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["tip_dialoga"],
  data() {
    return {
      dialog_: null,
    };
  },
  created() {
    this.dialog_ = this.tip_dialoga;
  },
  computed: {
    facebook_logout: {
      get() {
        return this.$store.getters.get_showDialog_da_ne;
      },
      set(newValue) {
        this.$store.dispatch("set_showDialog_da_ne", newValue);
      },
    },
  },
  methods: {
    obradi_dialog() {
      if (this.dialog_ == "fb_logout") {
        this.$store.dispatch("Facebook_logout_store");
        this.facebook_logout = false;
      } else {
        console.log("nesto drugo");
      }
    },
  },
};
</script>

<style>
</style>
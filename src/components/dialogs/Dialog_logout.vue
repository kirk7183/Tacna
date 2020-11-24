<template>
  <v-dialog v-model="logout" max-width="400px">
    <div class="dialog_logout">
      <v-card>
        <v-card-title
          class="dialog_title justify-center"
          :class="
            $vuetify.breakpoint.xs
              ? `title`
              : $vuetify.breakpoint.smAndDown
              ? `headline`
              : $vuetify.breakpoint.md
              ? `headline`
              : `headline`
          "
        >
          <slot name="title">Ovde ide title</slot>
        </v-card-title>
        <v-card-text xs-12 sm6 offset-sm3 class="ceo-text">
          <slot name="text"> </slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" class="dugme" @click="obradi_dialog">Da</v-btn>
          <v-btn color="error" class="dugme" @click="logout = false">Ne</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog_: null,
    };
  },
  created() {
    this.dialog_ = this.tip_dialoga;
  },
  computed: {
    logout: {
      get() {
        return this.$store.getters["_DIALOG/get_showDialog_logout"];
      },
      set(newValue) {
        this.$store.dispatch("_DIALOG/set_showDialog_logout", newValue);
      },
    },
  },
  methods: {
    obradi_dialog() {
      this.$store.dispatch("Logout").then(() => {
        this.logout = false;
      });
    },
  },
};
</script>

<style>
</style>
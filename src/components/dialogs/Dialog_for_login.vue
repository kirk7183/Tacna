<template>
  <v-dialog v-model="dialog_for_login" max-width="400px">
    <v-card class="card-dialog-login">
      <v-card-title class="title-dialog-login">
        Odaberite način logovanja:
      </v-card-title>
      <v-card-text class="text-center">
        Trenutno radi logovanje samo preko FB naloga. U pripremi su i drugi
        načini logovanja.
      </v-card-text>
      <v-card-actions class="action-dialog-login">
        <!--Facebook login -->
        <v-btn @click="facebook_login">
          <i class="fab fa-facebook-square fa-3x"></i
        ></v-btn>
        <!--Google login -->
        <v-btn>
          <i class="fab fa-google fa-3x"></i>
        </v-btn>
        <v-btn @click="dialog_for_login = false" class="nazad"> Nazad </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return { show: false };
  },
  computed: {
    dialog_for_login: {
      get() {
        return this.$store.getters.get_dialog_for_login;
      },
      set(newValue) {
        this.$store.dispatch("set_dialog_for_login", newValue);
      },
    },
  },
  methods: {
    facebook_login() {
      this.$store.dispatch("Facebook_login");
      this.dialog_for_login = false;
    },
  },
};
</script>

<style>
</style>
<template>
  <v-dialog v-model="dialog_delete_obavestenja" max-width="400px">
    <div class="dialog_delete_obavestenja">
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
          Brisanje !?
        </v-card-title>
        <v-card-text xs-12 sm6 offset-sm3 class="ceo-text text-center">
          Da li ste sigurni da želite da obrišete obaveštenje "{{
            edit_data.naslov_obavestenja
          }}"
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" class="dugme" @click="obrisi_obavestenje"
            >Da</v-btn
          >
          <v-btn
            color="error"
            class="dugme"
            @click="dialog_delete_obavestenja = false"
            >Ne</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ["edit_data", "route"],
  data() {
    return {
      dialog_: null,
    };
  },
  created() {
    this.dialog_ = this.tip_dialoga;
  },
  computed: {
    dialog_delete_obavestenja: {
      get() {
        return this.$store.getters["_DIALOG/get_dialog_delete_obavestenja"];
      },
      set(newValue) {
        this.$store.dispatch("_DIALOG/set_dialog_delete_obavestenja", newValue);
      },
    },
  },
  methods: {
    obrisi_obavestenje() {
      this.$store
        .dispatch("_API/api_post_delete_obavestenja", {
          route: this.route,
          id_obavestenja: this.edit_data.id_obavestenja,
        })
        .then(() => {
          this.dialog_delete_obavestenja = false;
        });
    },
  },
};
</script>

<style>
</style>
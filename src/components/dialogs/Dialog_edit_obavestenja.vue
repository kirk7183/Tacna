<template>
  <v-dialog v-model="dialog_edit_obavestenja_boolean" max-width="600px">
    <div class="dialog_edit_obavestenja">
      <v-card>
        <v-card-title class="dialog_title justify-center">
          Unos novog obaveštenja
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="re_data.naslov_obavestenja"
                outlined
                label="Naslov obaveštenja:"
                counter
                maxlength="25"
                :rules="rules"
                required
              >
              </v-text-field
            ></v-col>

            <v-col class="12">
              <v-textarea
                v-model="re_data.text_obavestenja"
                outlined
                :rules="rules"
                label="Obaveštenje"
                counter
                rows="8"
                maxlength="3000"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              :disabled="!valid"
              @click="add_edit_obavestenja"
              >Snimi</v-btn
            >
            <v-btn
              color="error"
              @click="dialog_edit_obavestenja_boolean = false"
              >Poništi</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ["route", "mode", "edit_data"],
  data() {
    return {
      // id_obavestenja: "",
      // naslov_obavestenja: "",
      // text_obavestenja: "",
      valid: false,
      re_data: {},
      rules: [
        (v) => !!v || "Molimo Vas popunite polje",
        (v) => (v && v.length >= 4) || "Polje mora da ima 4 ili više karaktera",
        (v) => (v && !!v.trim()) || "Ne mozete da ostavite prazna polja",
      ],
    };
  },
  created() {
    this.re_data = Object.assign({}, this.edit_data);
  },

  computed: {
    //TRUE/FALSE DIALOG_EDIT_OBAVESTENJA
    dialog_edit_obavestenja_boolean: {
      get() {
        return this.$store.getters["_DIALOG/get_dialog_edit_obavestenja"];
      },
      set(newValue) {
        this.$refs.form.reset(); //resetovanje validacije svaki put kada se podesi false na DIALOG_EDIT_OBAVESTENJA.vue za prikazivanje dialoga(tj kada se upali dialog ili ugasi)
        this.$store.dispatch("_DIALOG/set_dialog_edit_obavestenja", newValue);
      },
    },
  },
  methods: {
    add_edit_obavestenja() {
      const validationResult = this.$refs.form.validate(); //provera da li je TRUE tj da li je prosla validacija
      if (validationResult === true) {
        this.$store
          .dispatch("_API/api_post_novo_edit_obavestenje", {
            mode: this.mode,
            route: this.route,
            id_obavestenja: this.re_data.id_obavestenja,
            naslov_obavestenja: this.re_data.naslov_obavestenja,
            text_obavestenja: this.re_data.text_obavestenja,
          })
          .then(() => {
            this.dialog_edit_obavestenja_boolean = false; //FALSE za dialog
          });
      }
    },
  },
};
</script>

<style>
</style>
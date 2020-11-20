<template>
  <v-dialog v-model="dialog_add_obavestenja_boolean" max-width="600px">
    <div class="dialog_add_obavestenja">
      <v-card>
        <v-card-title class="dialog_title justify-center">
          Unos novog obaveštenja
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="naslov_obavestenja"
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
                v-model="text_obavestenja"
                outlined
                :rules="rules"
                label="Obaveštenje"
                counter
                rows="8"
                maxlength="1000"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="dialog_add_obavestenja_boolean = false"
              >Poništi</v-btn
            >
            <v-btn color="success" :disabled="!valid" @click="add_obavestenja"
              >Snimi</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ["path"],
  data() {
    return {
      naslov_obavestenja: "",
      text_obavestenja: "",
      valid: false,
      rules: [
        (v) => !!v || "Molimo Vas popunite polje",
        (v) => (v && v.length >= 4) || "Polje mora da ima 4 ili više karaktera",
        (v) => (v && !!v.trim()) || "Ne mozete da ostavite prazna polja",
      ],
    };
  },
  computed: {
    //TRUE/FALSE DIALOG_ADD_OBAVESTENJA
    dialog_add_obavestenja_boolean: {
      get() {
        return this.$store.getters.get_dialog_add_obavestenja;
      },
      set(newValue) {
        this.$refs.form.reset(); //resetovanje validacije svaki put kada se podesi false na dialog_add_obavestenja.vue za prikazivanje dialoga(tj kada se upali dialog ili ugasi)
        this.$store.dispatch("set_Dialog_add_obavestenja", newValue);
      },
    },
  },
  methods: {
    add_obavestenja() {
      const validationResult = this.$refs.form.validate(); //provera da li je TRUE tj da li je prosla validacija
      if (validationResult === true) {
        if (this.path === "Obavestenja") {
          this.$store.dispatch(
            "_API/api_post_novo_obavestenje",
            {
              komanda: "novo_obavestenje",
              naslov_obavestenja: this.naslov_obavestenja,
              text_obavestenja: this.text_obavestenja,
            },
            { root: true }
          );
        } else {
          console.log("neka druga strana");
        }
        this.dialog_add_obavestenja_boolean = false; //FALSE za dialog
        this.$store.dispatch("_API/api_get_glavna_obavestenja"); //refresh bazu da bi se prikazalo obavestenje koje smo uneli
      }
    },
  },
};
</script>

<style>
</style>
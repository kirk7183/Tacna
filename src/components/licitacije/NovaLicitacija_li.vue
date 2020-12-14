<template>
  <div class="novaLicitacija_li">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="5" class="pa-0">
        <v-card class="mx-2 my-4 mx-sm-4 my-sm-6 my-md-5" elevation="5">
          <v-card-title> Nova licitacija </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              dense
              v-model="nudim"
              outlined
              label="Nudim"
              counter
              maxlength="50"
              :rules="rules"
              required
            ></v-text-field>

            <v-text-field
              dense
              v-model="grupa"
              outlined
              label="grupa-select treba"
              counter
              maxlength="50"
              :rules="rules"
              required
            ></v-text-field>

            <v-text-field
              v-model="pocetna_cena_u_DIN"
              :rules="rules_number"
              outlined
              label="Početna cena u DIN"
              counter
              maxlength="7"
              required
              dense
            ></v-text-field>
            <v-radio-group
              row
              class="radio_button"
              v-model="trajanje_licitacije"
              mandatory
              dense
            >
              <p>Vreme:</p>
              <v-radio name="active" label="24 h" value="1"></v-radio>
              <v-radio name="active" label="48 h" value="2"></v-radio>
            </v-radio-group>
            <v-textarea
              v-model="opis_licitacije"
              :rules="rules"
              label="Opis licitacije"
              dense
              outlined
              counter
              rows="8"
              maxlength="1000"
              required
            ></v-textarea>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :disabled="!valid"
                min-width="80"
                @click="postavi()"
                >Postavi</v-btn
              >
              <v-btn color="error" min-width="80" @click="obrisi()"
                >Obriši</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      valid: false,
      nudim: "",
      grupa: "",
      pocetna_cena_u_DIN: "",
      trajanje_licitacije: "",
      opis_licitacije: "",
      rules: [
        (v) => !!v || "Molimo Vas popunite polje",
        (v) => (v && v.length >= 4) || "Polje mora da ima 4 ili više karaktera",
        (v) => (v && !!v.trim()) || "Ne mozete da ostavite prazna polja",
      ],
      rules_number: [
        (v) => !!v || "Molimo Vas popunite polje",
        (v) => (v && v >= 0) || "Molimo Vas upisite cenu",
      ],
    };
  },
  watch: {
    pocetna_cena_u_DIN(newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      Vue.nextTick(() => (this.pocetna_cena_u_DIN = result));
    },
  },

  methods: {
    postavi() {
      //mora da se pokrene this.$refs.form.validate() inace nece izbaciti crvenim slovima da nesto ne valja tj. nece da validate
      var validnost = this.$refs.form.validate();
      if (validnost) {
        //brisanje tacke (.) posle treceg broja
        const result = this.pocetna_cena_u_DIN
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, "");
        this.pocetna_cena_u_DIN = result;
        //kraj brisanja tacke (.)

        var d = new Date();
        var pocetak_datum = new Date(); //pocetak datuma i vremena licitacije
        //u radio box je stavljeno kao value "1" ili "2" dana u zavisnosti da li je odabrano 24h ili 48h)
        if (this.trajanje_licitacije == 1) {
          d = new Date().setDate(new Date().getDate() + 1);
        } else if (this.trajanje_licitacije == 2) {
          d = new Date().setDate(new Date().getDate() + 2);
        }
        let kraj_datum = new Date(d); //pretvaranje iz milisekunde (koje JS automatski pretvara u njih kada dodajes neki dan) u pravi datum

        this.$store.dispatch("nova_licitacija", {
          nudim: this.nudim,
          grupa: this.grupa,
          pocetna_cena_u_DIN: this.pocetna_cena_u_DIN,
          trajanje_licitacije: this.trajanje_licitacije,
          opis_licitacije: this.opis_licitacije,
          pocetak_datum: pocetak_datum,
          kraj_datum: kraj_datum,
        });
      }
    },
    obrisi() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>
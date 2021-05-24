<template>
  <div class="novaLicitacija_li">
    <v-row v-if="isLoggedIn && isRegister" justify="center">
      <v-col cols="12" sm="10" md="5" class="pa-0">
        <v-card class="mx-2 my-4 mx-sm-4 my-sm-6 my-md-5" elevation="5">
          <v-card-title :style="return_boja()"> Nova licitacija </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-radio-group
              ref="separatedRef"
              row
              v-model="vrsta_licitacije"
              mandatory
              dense
              class="radio_group"
            >
              <v-layout justify-center wrap>
                <v-radio
                  name="active"
                  label="Lična"
                  value="Lična"
                  color="#988BC7"
                  class="radio-button-vrsta licna"
                  @click="boja_title = '#988BC7'"
                ></v-radio>

                <v-radio
                  name="active"
                  label="Humanitarna"
                  value="Humanitarna"
                  color="success"
                  class="radio-button-vrsta humanitarna"
                  @click="boja_title = '#4CAF50'"
                ></v-radio>
              </v-layout>
            </v-radio-group>

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

            <v-select
              v-model="grupa"
              :rules="rules_select"
              :items="grupa_lista"
              label="Grupa"
              dense
              :menu-props="{ bottom: true, offsetY: true }"
              outlined
            ></v-select>

            <v-text-field
              v-model="pocetna_cena_u_RSD"
              :rules="rules_number"
              outlined
              label="Početna cena u RSD"
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
            <!--IMPORT COMPONENT insertImages PREDMET-->
            <insertImages
              :uploading="uploading"
              :slikeZa="'predmet'"
              :clearImages="clearImages"
              :imgIspis="'Odaberite predmet koji nudite'"
              @imaSlikePredmet="imaSlikeMethodPredmet"
              :max="5"
            ></insertImages>
            <!--IMPORT KOMPONENT KRAJ-->
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

            <!--samo za humanitarne licitacije POCETAK-->
            <div v-if="vrsta_licitacije == 'Humanitarna'">
              <hr style="margin: 25px 15px" />
              <p class="osoba_naslov">
                Osoba za koju se vrši humanitarna licitacija
              </p>
              <v-text-field
                dense
                v-model="imeOsobeZaDonaciju"
                outlined
                label="Ime"
                counter
                maxlength="20"
                :rules="rules"
                required
              ></v-text-field>

              <!--IMPORT COMPONENT insertImages za OSOBU ZA KOJU SE LICITIRA-->
              <insertImages
                :uploading="uploading"
                :slikeZa="'primalacDonacije'"
                :clearImages="clearImages"
                :imgIspis="'Slika osobe mora biti sa žiro-računom'"
                @imaSlikePrimalacDonacije="imaSlikePrimalacDonacije"
                :max="2"
              ></insertImages>
              <!--IMPORT KOMPONENT KRAJ-->
            </div>
            <!--samo za humanitarne licitacije KRAJ-->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :disabled="!valid"
                :loading="this.$store.state.LoadingButton"
                min-width="80"
                @click="postavi()"
                >Postavi</v-btn
              >
              <v-btn
                color="error"
                min-width="80"
                :disabled="this.$store.state.LoadingButton"
                @click="obrisi()"
                >Obriši</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!--ako nije logovan onda prikazi ovaj div-->
    <div v-if="!isLoggedIn" class="nemaLicitacije">Molimo Vas logujte se</div>

    <!--ako je logovan ali nije registrovan onda prikazi ovaj div-->
    <div v-if="isLoggedIn && !isRegister" class="nemaLicitacije">
      Da bi ste postavljali ili pregledali svoje licitacije morate biti
      registrovani
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import insertImages from "@/components/add-ons/insertImages.vue";
export default {
  components: { insertImages },
  data() {
    return {
      broj: 0,
      isLoggedIn: false,
      isRegister: false,
      grupa_lista: [],
      boja_title: "#988BC7",
      valid: false,
      uploading: false,
      vrsta_licitacije: "",
      nudim: "",
      grupa: "",
      pocetna_cena_u_RSD: null,
      trajanje_licitacije: "",
      opis_licitacije: "",
      imeOsobeZaDonaciju: "",
      clearImages: false,
      validatePicPredmet: 0, //dobijamo preko $emit iz insertImages
      validatePicPrimalacDonacije: 0, //dobijamo preko $emit iz insertImages
      rules: [
        (v) => !!v || "Molimo Vas popunite polje",
        (v) => (v && v.length >= 3) || "Polje mora da ima 3 ili više karaktera",
        (v) => (v && !!v.trim()) || "Ne mozete da ostavite prazna polja",
      ],
      rules_number: [
        (v) => !!v || "Molimo Vas popunite polje",
        (v) => (v && v >= 1) || "Molimo Vas upisite cenu",
      ],
      rules_select: [(v) => !!v || "Molimo Vas odaberite grupu"],
    };
  },
  watch: {
    pocetna_cena_u_RSD(newValue) {
      if (newValue != undefined) {
        const result = newValue
          .toString()
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        Vue.nextTick(() => (this.pocetna_cena_u_RSD = result));
      }
    },
    get_check_is_loggedIn(newValue) {
      if (newValue) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },

    get_check_reg_korisnik(newValue) {
      if (newValue.korisnik_id != null || newValue.korisnik_id != undefined) {
        //ako ima korisnik_id znaci da je korisnik registrovan. A ako dobijamo korisnik_id znaci da je i trenutno logovan (ne moze da dobijemo podatak korisnik_id ako nije logovan)
        this.isRegister = true;
      } else if (
        newValue.korisnik_id == null ||
        newValue.korisnik_id == undefined
      ) {
        this.isRegister = false;
      }
    },
  },
  // mounted() {
  //   this.personal = this.$refs.markdowndetails.filesFirebase;
  //   console.log(this.personal);
  // },
  created() {
    //mora....kada se menjaju stranice ne dobija initial state iz Vuexa
    //postavljanje initial state iz Vuexa za isLoggedIn
    this.isLoggedIn = this.$store.getters.get_IsLoggedIn;
    //postavljanje initial state iz Vuexa za isRegister
    if (
      this.$store.getters.get_reg_korisnik.podaci.korisnik_id != null ||
      this.$store.getters.get_reg_korisnik.podaci.korisnik_id != undefined
    ) {
      this.isRegister = true;
    }

    //lista stvari iz Vuexa
    this.$store.getters.get_grupa.forEach((element) => {
      this.grupa_lista.push(element);
    });
    //sortiranje
    this.grupa_lista.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
    });

    //dodavanje na dno tabele - ako stavimo u VUEX onda ce da sortira negde na
    //sredini niza a ja zelim da bude na kraju
    this.grupa_lista.push("Neodredjeno");
  },
  computed: {
    //da li je logovan korisnik
    get_check_is_loggedIn: {
      get() {
        return this.$store.getters.get_IsLoggedIn;
      },
    },

    // //podaci iz baze sa Marsa
    get_check_reg_korisnik: {
      get() {
        return this.$store.getters.get_reg_korisnik.podaci;
      },
    },
  },

  methods: {
    imaSlikeMethodPredmet(newValue) {
      this.validatePicPredmet = newValue;
    },
    imaSlikePrimalacDonacije(newValue) {
      this.validatePicPrimalacDonacije = newValue;
    },
    postavi() {
      //mora da se pokrene this.$refs.form.validate() inace nece izbaciti crvenim slovima da nesto ne valja tj. nece da validate
      let validnost = this.$refs.form.validate();
      let validatePic = false;

      //provera validnosti tj. da li je korisnik ubacio slike u zavisnosti da li je licna ili hummanitarna licitacija
      if (this.vrsta_licitacije === "Lična") {
        if (this.validatePicPredmet != 0) {
          validatePic = true;
        }
      }
      if (this.vrsta_licitacije === "Humanitarna") {
        if (
          this.validatePicPredmet != 0 &&
          this.validatePicPrimalacDonacije != 0
        ) {
          validatePic = true;
        }
      }

      if (validnost && validatePic) {
        //daj znak da se upload (uz pomoc component prop se salje do insertImages i tako se pokrece % upload progress bar)
        this.uploading = true;
        //brisanje tacke (.) posle treceg broja
        const result = this.pocetna_cena_u_RSD
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, "");
        this.pocetna_cena_u_RSD = parseInt(result); //parse to integer da bi posle u Firebase sortirao dobro
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
          vrsta_licitacije: this.vrsta_licitacije,
          nudim: this.nudim,
          grupa: this.grupa,
          pocetna_cena_u_RSD: this.pocetna_cena_u_RSD,
          trajanje_licitacije: this.trajanje_licitacije,
          opis_licitacije: this.opis_licitacije,
          pocetak_datum: pocetak_datum,
          kraj_datum: kraj_datum,
          imeOsobeZaDonaciju: this.imeOsobeZaDonaciju, //provera se u Vuex koja je vrsta licitacije. Upisivace se ovaj podatak u Firebase samo ako je vrsta licitacije humanitarna, zato sto u Licna vrsta licitacije nema da se upise ime osobe za koju se donira (posto je licna licitacija)
        });

        // //snimanje slika u firebase POCETAK
        // let newIter = this.arrayFiles_forFirebase_predmet;
        // console.log(newIter);
        // // this.$store.state.LoadingButton = true;
        // // this.$store.state.DisabledButton = true;

        // for (const fileM of newIter) {
        //   console.log(fileM);
        //   this.broj += 1;
        //   //  const fileName =
        //   firebase
        //     .storage()
        //     .ref("humanitarne/slike/" + "slika" + "-" + this.broj)
        //     .put(fileM);

        //   // fileName.on(
        //   //   `state_change`,
        //   //   (snapshot) => {
        //   //     this.uploadValue =
        //   //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   //   },
        //   //   (error) => {
        //   //     console.log(error.message);
        //   //   },
        //   //   () => {
        //   //     this.uploadValue = 100;
        //   //     fileName.snapshot.ref.getDownloadURL().then((url) => {
        //   //       this.picture = url;
        //   //     });
        //   //   }
        //   // );
        // }
        // this.broj = 0;
        // //snimanje slike KRAJ
      }
    },
    obrisi() {
      this.clearImages = true; //slanje do child insertImages da obrise slike
      this.$store.dispatch("clearUploadingImagesObj"); //slanje u Vuex da obrise slike koje je pre toga uploadovao (ukoliko postoje)
      this.uploading = false; //da postavi krug sa % na false

      //posle 1 sekunde vrati na false zato sto je u child poslato kao prop koji uz pomoc watch slusa promene...ako ostane na "true" onda nema koju promenu da slusa kada joj ponovo posaljemo "true"
      setTimeout(() => {
        this.clearImages = false;
      }, 1000);

      //posto ne znam kako da ne resetuje samo jedan stvar (radio button za vrstu licitacije) morao sam ovako da odradim. Da zapamtim trenutnu vrstu licitacije i posle da je vratim na staro posle 100ms
      var trenutna_vrsta_licitacije = this.vrsta_licitacije;

      //resetovanje forme
      this.$refs.form.reset();

      //vracanje na staru vrstu licitacije pre reseta forme
      setTimeout(() => {
        this.vrsta_licitacije = trenutna_vrsta_licitacije;
      }, 100);
    },
    return_boja() {
      return "background-color:" + this.boja_title;
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="licitiram_li">
    <div v-for="(list, i) in sve_licitacije" :key="i">
      <v-layout row wrap justify-center>
        <v-card
          class="mx-2 my-4 mx-sm-4 my-sm-6 my-md-5"
          elevation="5"
          min-width="260"
          width="300"
          v-for="(single, ii) in list.licitacije"
          :key="ii"
        >
          <!--NUDIM - TITLE-->
          <v-card-title>
            <b>{{ truncate(single.nudim, 20) }}</b>
          </v-card-title>
          <!--KRAJ NUDIM - TITLE-->
          <div class="box">
            <!--REAL-TIME PREOSTALO VREME LICITACIJE-->
            <!--IMPORT COMPONENT-->
            <v-card-text class="text-center">
              <b>Preostalo vreme: &#177;</b>
            </v-card-text>
            <div class="row justify-center">
              <Timer :pocetak="pocetak" :kraj="kraj" class="timera"></Timer>
            </div>
            <!--KRAJ IMPORTA -->

            <!--VREME LICITACIJE-->
            <v-card-text class="text-center">
              <b>Početak licitacije:</b>
              <p>
                <!--prosledjivanje datuma pocetka licitacije i koliko dana traje (1 dan =24h ili 2 dana=48h )-->
                {{ pocetak_datumPrerada(single.pocetak_datum) }}
              </p>
              <br />
              <b>Kraj licitacije:</b>
              <p>{{ kraj_datumPrerada(single.kraj_datum) }}</p>
            </v-card-text>

            <!--KRAJ VREME LICITACIJE-->
            <!--KRAJ REAL-TIME PREOSTALO VREME LICITACIJE-->

            <!--GRUPA -->
            <v-card-text class="text-center">
              <b>Grupa:</b>
              <p>{{ truncate(single.grupa, 20) }}</p>
            </v-card-text>
            <v-card-text class="text-center">
              <b>Cena u DIN:</b>
              <p>{{ pocetna_cena_u_DIN(single.pocetna_cena_u_DIN) }},00</p>
            </v-card-text>
            <!--KRAJ GRUPA-->
            <!--KORISNIK-->
            <v-card-text class="text-center">
              <b>Korisnik:</b>
              <p>
                {{ truncate(single.korisnik_ime, 20) }}
                {{ single.korisnik_prezime }}
              </p>
            </v-card-text>
            <!--KORISNIK-->

            <!--OPIS LICITACIJE-->
            <v-card-text class="text-center">
              <b>Opis:</b>
              <p>{{ truncate(single.opis_licitacije, 52) }}</p>
            </v-card-text>
            <!--KRAJ OPIS LICITACIJE-->
          </div>
        </v-card>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Timer from "@/components/add-ons/Timer.vue";
export default {
  components: { Timer },
  data() {
    return {
      // pocetak: "",
      // kraj: "",
      Meseci: [
        "Januar",
        "Februar",
        "Mary",
        "April",
        "Maj",
        "Jun",
        "Jul",
        "Avgust",
        "Septembar",
        "Oktobar",
        "Novembar",
        "December",
      ],
    };
  },
  created() {
    this.$store.dispatch("pregled_svih_licitacija");
  },
  computed: {
    sve_licitacije: {
      get() {
        return this.$store.getters.get_sve_licitacije;
      },
    },
  },
  methods: {
    // STAVLJA 3 TACKICE NAKON ODREDJENOG BROJA KARAKTERA KOJI PROSLEDJUJEMO METODI
    truncate(source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    //KRAJ
    //STAVLJA TACKE (.) NAKON 3 BROJA RADI BOLJE PREGLEDNOSTI AKO JE VELIKI BROJ
    pocetna_cena_u_DIN(newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return result;
    },
    //KRAJ
    //PRETVARA MESECE(BROJEVE) U TEKSUALNI DATUM(npr. Januar ili Jan pogledaj niz u data())
    mesecPrerada(month) {
      return this.Meseci[month];
    },
    //kraj
    //PRETVARA DATUM IZ FIREBASE KOJI SADRZI DATUM I VREME U POJEDINACNI DAN.MESEC I GODINU
    pocetak_datumPrerada(pocetak_datum) {
      let dan = pocetak_datum.toDate().getDate();
      let mesec = this.mesecPrerada(pocetak_datum.toDate().getMonth());
      let godina = pocetak_datum.toDate().getFullYear();
      let sati = pocetak_datum.toDate().getHours();
      let minuti = pocetak_datum.toDate().getMinutes();
      //prepravka da ne prikazuje "15:5" vec "15:05" za vreme
      let minutiPrepravka = minuti < 10 ? "0" + minuti : minuti;
      let sekunde = pocetak_datum.toDate().getSeconds();
      //pretvaranje za slanje u Timer.vue posto prima datum postavljen na odredjen nacin
      let zaTimer_pocetak =
        mesec +
        " " +
        dan +
        ", " +
        godina +
        " " +
        sati +
        ":" +
        minuti +
        ":" +
        sekunde;
      //kraj pretvaranja
      this.pocetak = zaTimer_pocetak; //this.pocetak se salje kao prop u Timer.vue
      //ZA PRIKAZ POCETKA LICITACIJE
      let zaPrikaz =
        dan + " " + mesec + " " + godina + " " + sati + ":" + minutiPrepravka; //pretvaranje za prikaz pocetka licitacije
      return zaPrikaz; //vraca datum koji sluzi za prikaz pocetka licitacije
    },
    kraj_datumPrerada(kraj_datum) {
      let dan = kraj_datum.toDate().getDate();
      let mesec = this.mesecPrerada(kraj_datum.toDate().getMonth());
      let godina = kraj_datum.toDate().getFullYear();
      let sati = kraj_datum.toDate().getHours();
      let minuti = kraj_datum.toDate().getMinutes();
      //prepravka da ne prikazuje "15:5" vec "15:05" za vreme
      let minutiPrepravka = minuti < 10 ? "0" + minuti : minuti;
      let sekunde = kraj_datum.toDate().getSeconds();
      //pretvaranje za slanje u Timer.vue posto prima datum postavljen na odredjen nacin
      let zaTimer_kraj =
        mesec +
        " " +
        dan +
        ", " +
        godina +
        " " +
        sati +
        ":" +
        minuti +
        ":" +
        sekunde;
      //kraj pretvaranja
      this.kraj = zaTimer_kraj; //this.kraj se salje kao prop u Timer.vue i ne sme da se stavi u data() inace ce da pravi infinity loop zato sto je to reactive data
      //ZA PRIKAZ POCETKA LICITACIJE
      let zaPrikaz =
        dan + " " + mesec + " " + godina + " " + sati + ":" + minutiPrepravka; //pretvaranje za prikaz pocetka licitacije
      return zaPrikaz; //vraca datum koji sluzi za prikaz kraja licitacije
    },
  },
  pocetak(pocetak) {
    return pocetak;
  },
};
</script>

<style>
</style>
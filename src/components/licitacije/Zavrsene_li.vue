<template>
  <div class="licitiram_li">
    <v-layout justify-center wrap>
      <v-flex xs7 sm10 md3>
        <p class="sortiranje text">Vrste</p>
        <v-select
          class="sortiranje"
          :items="sort_vrsta"
          v-model="get_selected_vrsta"
          dense
          :menu-props="{ bottom: true, offsetY: true }"
          outlined
        ></v-select>
      </v-flex>
      <v-flex xs7 sm5 md3>
        <p class="sortiranje text">Grupe</p>
        <v-select
          class="sortiranje"
          :items="grupa"
          v-model="get_selected_grupa"
          dense
          :menu-props="{ bottom: true, offsetY: true }"
          outlined
        ></v-select>
      </v-flex>
      <v-flex xs7 sm5 md3>
        <p class="sortiranje text">Sortiranje</p>
        <v-select
          class="sortiranje"
          :items="sortiranje_od_do"
          v-model="get_selected_sortiranje_od_do"
          dense
          :menu-props="{ bottom: true, offsetY: true }"
          outlined
        ></v-select>
      </v-flex>
    </v-layout>

    <!-- v-circular dok ocitava podatke -->
    <div v-if="!loadedData" class="text-center mt-12">
      <v-progress-circular
        indeterminate
        color="red"
        class="progress_circular"
      ></v-progress-circular>
    </div>
    <!--ako ima podataka prikazi ih, ako nema podataka prikazi div na dnu stranice-->
    <div v-if="loadedData != 'nema_podataka'">
      <div>
        <v-layout row wrap justify-center>
          <div
            v-for="single in arrayData"
            :key="single.random_id"
            class="list-item"
          >
            <v-card
              class="card_licitacije mx-2 my-4 mx-sm-4 my-sm-6 my-md-5"
              elevation="5"
              min-width="260"
              max-width="300"
            >
              <!--poziv da se uradi prerada datuma i vremena kako bi se rezultat poslao u komponentu 
               Timer. Bez ovoga nece da prikaze datum. Inace ne vraca nikakav prikaz. Ovo se radi zato sto 
               ako artikal nema vreme onda ce da izbaci  "Trenutno nema završenih licitacija za traženi kriterijum"
               sto znaci da ce artikle da prebaci u kolekciju "licitacije zavrsene"-->
              {{ pocetak_datumPrerada(single.pocetak_datum) }}
              {{ kraj_datumPrerada(single.kraj_datum) }}

              <!--NUDIM - TITLE-->
              <!-- koja boja za title (licna- #988BC7 ili humanitarna-success)-->
              <v-card-title :style="vrsta_licit(single.vrsta_licitacije)">
                <b>{{ truncate(single.nudim, 25) }}</b>
              </v-card-title>
              <!--KRAJ NUDIM - TITLE-->

              <div class="box">
                <!--GRUPA -->
                <v-card-text class="text-center">
                  <b>Grupa:</b>
                  <p>{{ truncate(single.grupa, 35) }}</p>
                </v-card-text>
                <v-card-text class="text-center">
                  <b>Početna cena u RSD:</b>
                  <p>{{ pocetna_cena_u_RSD(single.pocetna_cena_u_RSD) }},00</p>
                </v-card-text>
                <!--KRAJ GRUPA-->

                <!--REAL-TIME PREOSTALO VREME LICITACIJE-->
                <!--IMPORT COMPONENT-->
                <v-card-text class="text-center">
                  <b>Preostalo vreme:</b>
                </v-card-text>
                <div class="row justify-center">
                  <Timer
                    :single_data="single"
                    :startTime="pocetak"
                    :endTime="kraj"
                    class="timera"
                  ></Timer>
                </div>
                <!--KRAJ IMPORTA -->
                <!--KRAJ REAL-TIME PREOSTALO VREME LICITACIJE-->
              </div>
            </v-card>
          </div>
        </v-layout>
      </div>
    </div>
    <!--ako nema podataka ocitanih iz vuexa onda prikazi ovaj div-->
    <div v-if="loadedData == 'nema_podataka'" class="nemaLicitacije">
      Trenutno nema završenih licitacija za traženi kriterijum
    </div>
  </div>
</template>

<script>
import Timer from "@/components/add-ons/Timer.vue";
export default {
  components: { Timer },
  data() {
    return {
      grupa: [],
      loadedData: false,
      boja_licitacije: null,
      arrayData: [],
      korisnik_id: "",
      Meseci: [
        "Januar",
        "Februar",
        "Mary",
        "April",
        "Maj",
        "Jun",
        "Jul",
        "Avgust",
        "September",
        "Oktober",
        "November",
        "December",
      ],
      Months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },

  created() {
    //da povuce podatke iz firebase-a za zavrsene licitacije
    this.$store.dispatch("sortingChange", {
      switch: true, //ako je true onda je za sve licitacije, ako je false onda znaci da je kliknuto na moje licitacije
      zavrseno: true, //da se zna da li trazimo zavrsene ili u toku licitacije
    });

    //array sort_vrsta iz Vuexa (Sve,licna,humanitarna)
    this.sort_vrsta = this.$store.getters.get_sort_vrsta;
    this.sort_vrsta.unshift("SVE"); //naknado na vrh liste dodaje "SVE" za listanje svih grupa

    //array grupa iz Vuexa
    this.$store.getters.get_grupa.forEach((element) => {
      this.grupa.push(element);
    });
    //sortiranje array-a grupa POCETAK
    this.grupa.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
    });
    //pa posle sortiranja dodajemo na pocetku i na kraju niza
    this.grupa.unshift("SVE"); //naknado na vrh liste dodaje "SVE" za listanje svih grupa
    this.grupa.push("Neodredjeno"); //dodavanje na dno tabele - ako stavimo u VUEX onda ce da sortira negde na sredini niza a ja zelim da bude na kraju

    //array sortiranje_od_do(Naziv a-z, naziv z-a, cena rastuce, cena opadajuce)
    this.sortiranje_od_do = [...this.$store.getters.get_sortiranje_od_do];
    //posto u zavrsene licitacije ne treba sortiranje po vremenu onda ih brisemo iz arraya koji smo ubacili komandom iznad
    this.sortiranje_od_do.splice(0, 2); //brisanje od 0 i 1 indexa u array-u (vreme blize i dalje)

    //posto smo gore izbacili (Preostalo vreme - manje i Preostalo vreme - više)
    //kada odemo na licitacije_li i imamo v-select npr. "Preostalo vreme - manje" i vratimo se na zavrsene_li, da v-select ne bi ostao prazan
    //stavljeno je da sortira na "Naziv A-Z"
    if (
      this.get_selected_sortiranje_od_do == "Preostalo vreme - manje" ||
      this.get_selected_sortiranje_od_do == "Preostalo vreme - više"
    )
      this.get_selected_sortiranje_od_do = "Naziv A-Z";
  },
  computed: {
    get_sve_licitacije: {
      get() {
        return this.$store.getters.get_sve_licitacije;
      },
    },

    //v-select odabrano
    get_selected_vrsta: {
      get() {
        return this.$store.getters.get_selected_vrsta;
      },
      set(newValue) {
        return this.$store.dispatch("setSelected_vrsta", newValue);
      },
    },
    get_selected_grupa: {
      get() {
        return this.$store.getters.get_selected_grupa;
      },
      set(newValue) {
        return this.$store.dispatch("setSelected_grupa", newValue);
      },
    },
    get_selected_sortiranje_od_do: {
      get() {
        return this.$store.getters.get_selected_sortiranje_od_do;
      },
      set(newValue) {
        return this.$store.dispatch("setSelected_sortiranje_od_do", newValue);
      },
    },
    //v-select odabrano KRAJ
  },

  watch: {
    //motri na computed sve_licitacije kada dobije podatke
    //ovo je na pocetku kada se ocitavaju SVE stvari (pocetno ocitavanje je po preostalom vremenu)
    get_sve_licitacije(newValue) {
      if (newValue != 0 && newValue != "nema_podataka") {
        //obrisi sve i postavi da je prazan array
        this.arrayData = [];
        //i dodaj svaki podatak iz Vuex-a u novi array "arrayData"
        newValue.forEach((value) => {
          this.arrayData.push(value);
        });
        //..onda postavi loadedData=true kako bi se render div kada je true tj. prikazao div i rendovali podaci unutra i prestao circular za ocitavanje
        this.loadedData = true;
      }
      //ali ako "nema_podataka" je vraceno onda prikazi DIV da nema podataka
      //do tada loadedData=false tj. circular (v-progress-circular) ce se vrteti
      else if (newValue == "nema_podataka") {
        this.loadedData = "nema_podataka";
      }
    },
    get_selected_vrsta() {
      this.arrayData = []; //isprazni sve iz liste
      this.loadedData = false; //pokreni circular za ocitavanje
      this.$store.dispatch("sortingChange", {
        switch: this.switch1, //ako je true onda je za sve sortiranje, ako je false onda znaci da je kliknuto na moje licitacije
        zavrseno: true, //da se zna da li trazimo zavrsene ili u toku licitacije
      });
    },
    get_selected_grupa() {
      this.arrayData = []; //isprazni sve iz liste
      this.loadedData = false; //pokreni circular za ocitavanje
      this.$store.dispatch("sortingChange", {
        switch: this.switch1, //ako je true onda je za sve sortiranje, ako je false onda znaci da je kliknuto na moje licitacije
        zavrseno: true, //da se zna da li trazimo zavrsene ili u toku licitacije
      });
    },
    get_selected_sortiranje_od_do() {
      this.arrayData = []; //isprazni sve iz liste
      this.loadedData = false; //pokreni circular za ocitavanje
      this.$store.dispatch("sortingChange", {
        switch: this.switch1, //ako je true onda je za sve sortiranje, ako je false onda znaci da je kliknuto na moje licitacije
        zavrseno: true, //da se zna da li trazimo zavrsene ili u toku licitacije
      });
    },
  },

  methods: {
    // STAVLJA 3 TACKICE NAKON ODREDJENOG BROJA KARAKTERA KOJI PROSLEDJUJEMO METODI
    truncate(source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    //KRAJ
    //STAVLJA TACKE (.) NAKON 3 BROJA RADI BOLJE PREGLEDNOSTI AKO JE VELIKI BROJ
    pocetna_cena_u_RSD(newValue) {
      const result = newValue
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return result;
    },
    //KRAJ
    //PRETVARA MESECE(BROJEVE) U TEKSUALNI DATUM(npr. Januar ili Jan pogledaj niz u data())
    mesecPrerada(month) {
      return this.Months[month];
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
      // let minutiPrepravka = minuti < 10 ? "0" + minuti : minuti;
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
      // let zaPrikaz =
      //   dan + " " + mesec + " " + godina + " " + sati + ":" + minutiPrepravka; //pretvaranje za prikaz pocetka licitacije
      // this.zaPrikazPocetak = zaPrikaz; //vraca datum koji sluzi za prikaz pocetka licitacije
    },
    kraj_datumPrerada(kraj_datum) {
      let dan = kraj_datum.toDate().getDate();
      let mesec = this.mesecPrerada(kraj_datum.toDate().getMonth());
      let godina = kraj_datum.toDate().getFullYear();
      let sati = kraj_datum.toDate().getHours();
      let minuti = kraj_datum.toDate().getMinutes();
      //prepravka da ne prikazuje "15:5" vec "15:05" za vreme
      // let minutiPrepravka = minuti < 10 ? "0" + minuti : minuti;
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
      // let zaPrikaz =
      //   dan + " " + mesec + " " + godina + " " + sati + ":" + minutiPrepravka; //pretvaranje za prikaz pocetka licitacije
      // this.zaPrikazKraj = zaPrikaz; //vraca datum koji sluzi za prikaz kraja licitacije
    },
    vrsta_licit(vrsta_licitacije) {
      var boja;
      if (vrsta_licitacije == "Lična") {
        boja = "background-color:#988BC7";
      } else if (vrsta_licitacije == "Humanitarna") {
        boja = "background-color: #4CAF50";
      } else {
        //ako nije ni jedno obelezi tako sto ne stavljas nikakvu boju na title
        boja = "background-color: transparent";
      }
      return boja;
    },
  },
};
</script>

<style>
</style>
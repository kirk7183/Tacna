<template>
  <div class="licitiram_li">
    <v-layout justify-center wrap>
      <v-flex xs7 sm10 md3>
        <v-select
          class="sortiranje"
          :items="sort_vrsta"
          v-model="defaultSelected_sort_vrsta"
          dense
          :menu-props="{ bottom: true, offsetY: true }"
          outlined
        ></v-select>
      </v-flex>
      <v-flex xs7 sm5 md3>
        <v-select
          class="sortiranje"
          :items="grupa"
          v-model="defaultSelected_grupa"
          dense
          :menu-props="{ bottom: true, offsetY: true }"
          outlined
        ></v-select>
      </v-flex>
      <v-flex xs7 sm5 md3>
        <v-select
          class="sortiranje"
          :items="sortiranje_od_do"
          v-model="defaultSelected_sortiranje_od_do"
          dense
          :menu-props="{ bottom: true, offsetY: true }"
          outlined
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout justify-center wrap>
      <!--switch-->
      <v-flex xs7 sm7 md7>
        <div class="d-flex justify-center">
          <p
            class="switch_title pointer pa-3 mx-1 my-0"
            :class="!switch1 ? `put_border left_switch` : ``"
            @click="switch1 = false"
          >
            Moje licitacije
          </p>
          <v-switch v-model="switch1" class="switch" color="blue"> </v-switch>
          <p
            class="switch_title pointer pa-3 mx-1 my-0"
            :class="switch1 ? `put_border right_switch` : ``"
            @click="switch1 = true"
          >
            Licitacije u toku
          </p>
        </div>
      </v-flex>
      <!--switch end-->
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
    <div v-if="loadedData == true">
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
               ako artikal nema vreme onda ce da izbaci  "Trenutno nema postavljenih licitacija za traženi kriterijum"
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
                  <b>Početna cena u DIN:</b>
                  <p>{{ pocetna_cena_u_DIN(single.pocetna_cena_u_DIN) }},00</p>
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
      Trenutno nema postavljenih licitacija za traženi kriterijum
    </div>

    <!--ako nije logovan onda prikazi ovaj div-->
    <div v-if="loadedData == 'niste_logovani'" class="nemaLicitacije">
      Molimo Vas logujte se
    </div>

    <!--ako je logovan ali nije registrovan onda prikazi ovaj div-->
    <div v-if="loadedData == 'niste_registrovani'" class="nemaLicitacije">
      Da bi ste postavljali ili pregledali svoje licitacije morate biti
      registrovani
    </div>
  </div>
</template>

<script>
import Timer from "@/components/add-ons/Timer.vue";
export default {
  components: { Timer },
  data() {
    return {
      switch1: null,
      grupa: [],
      defaultSelected_sort_vrsta: "SVE",
      defaultSelected_grupa: "SVE",
      defaultSelected_sortiranje_od_do: "Preostalo vreme - manje",
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
    //posto je this.switch=null na pocetku treba da se stavi da je true da bi u *watch
    //pratili promenu i pokrenuli Vuex onSnapshot
    this.switch1 = true;

    //da povuce podatke iz firebase-a
    // this.$store.dispatch("pregled_svih_licitacija", this.arrayData);

    // //da nadgleda svaku promenu u firebase (ako neko izbrise nesto, promeni ili doda)
    // this.$store.dispatch("onSnapShot");

    //lista sort_vrsta iz Vuexa (Sve,licna,humanitarna)
    this.sort_vrsta = this.$store.getters.get_sort_vrsta;
    this.sort_vrsta.unshift("SVE"); //naknado na vrh liste dodaje "SVE" za listanje svih grupa

    //lista grupa iz Vuexa
    this.$store.getters.get_grupa.forEach((element) => {
      this.grupa.push(element);
    });
    //sortiranje
    this.grupa.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
    });
    //pa posle sortiranja dodajemo na pocetku i na kraju niza
    this.grupa.unshift("SVE"); //naknado na vrh liste dodaje "SVE" za listanje svih grupa
    this.grupa.push("Neodredjeno"); //dodavanje na dno tabele - ako stavimo u VUEX onda ce da sortira negde na
    //sredini niza a ja zelim da bude na kraju

    //lista sortiranje_od_do(Naziv a-z, naziv z-a, cena rastuce, cena opadajuce)
    this.sortiranje_od_do = this.$store.getters.get_sortiranje_od_do;
  },
  watch: {
    //motri na computed sve_licitacije kada dobije podatke
    //ovo je na pocetku kada se ocitavaju SVE stvari (nisam jos odredio
    //po kom kriterijumu ce to bi - da li po preostalom vremenu ili necem drugom )
    sve_licitacije(newValue) {
      //setTimeout je da ne bi prikazalo prvo "Trenutno nema postavljenih licitacija za traženi kriterijum"
      //pa odmah zatim array listu licitacije_u_toku
      setTimeout(() => {
        //ako nije prazan i nema podatak "nema_podataka" tj. ako ima podataka onda...
        if (
          this.sve_licitacije.length != 0 &&
          this.sve_licitacije != "nema_podataka"
        ) {
          //obrisi sve i postavi da je prazan array
          this.arrayData = [];
          //..onda postavi loadedData=true kako bi se render div kada je true tj. prikazao div i rendovali podaci unutra i prestao circular za ocitavanje
          this.loadedData = true;
          //i dodaj svaki podatak iz Vuex-a u novi array "arrayData"
          newValue.forEach((value) => {
            this.arrayData.push(value);
          });
        }
        //ako je prazan (nema podatke) a i u isto vreme ne pise "nema_podataka"
        else {
          this.loadedData = "nema_podataka";
        }
      }, 1000);
    },

    switch1() {
      if (this.switch1) {
        //da nadgleda svaku promenu u firebase (ako neko izbrise nesto, promeni ili doda)
        this.$store.dispatch("licitacije_podaci");
      } else {
        //ako nije logovan
        if (!this.check_is_loggedIn) {
          this.loadedData = "niste_logovani";
        }
        //ako je logovan ali nije registrovan (znaci ne moze da postavlja licitacije a to znaci da nema svoje postavljene licitacije )
        else if (
          this.check_is_loggedIn &&
          this.reg_korisnik.podaci == undefined
        ) {
          this.loadedData = "niste_registrovani";
        } else {
          this.$store.dispatch("moje_licitacije");
        }
      }
    },
    check_is_loggedIn() {
      if (!this.check_is_loggedIn) {
        this.loadedData = "niste_logovani";
      }
      if (this.check_is_loggedIn && this.reg_korisnik.podaci == undefined) {
        this.loadedData = "niste_registrovani";
      }

      // this.switch1 = true;
    },

    //kada se u v-select odabere nesto on salje sve informacije u Vuex koji
    //trazi iz Firebase stvari po tom kriterijumu
    defaultSelected_sort_vrsta() {
      this.$store.dispatch("sortingChange", {
        zavrseno: false, //da se zna da li trazimo zavrsene ili u toku licitacije
        filter_Vrsta: this.defaultSelected_sort_vrsta,
        filter_ListaStvari: this.defaultSelected_grupa,
        filter_sortiranje_od_do: this.defaultSelected_sortiranje_od_do,
      });
    },
    defaultSelected_grupa() {
      this.$store.dispatch("sortingChange", {
        zavrseno: false, //da se zna da li trazimo zavrsene ili u toku licitacije
        filter_Vrsta: this.defaultSelected_sort_vrsta,
        filter_ListaStvari: this.defaultSelected_grupa,
        filter_sortiranje_od_do: this.defaultSelected_sortiranje_od_do,
      });
    },
    defaultSelected_sortiranje_od_do() {
      this.$store.dispatch("sortingChange", {
        zavrseno: false, //da se zna da li trazimo zavrsene ili u toku licitacije
        filter_Vrsta: this.defaultSelected_sort_vrsta,
        filter_ListaStvari: this.defaultSelected_grupa,
        filter_sortiranje_od_do: this.defaultSelected_sortiranje_od_do,
      });
    },
  },
  computed: {
    sve_licitacije: {
      get() {
        return this.$store.getters.get_sve_licitacije;
      },
    },

    //da li je logovan korisnik
    check_is_loggedIn: {
      get() {
        return this.$store.getters.get_IsLoggedIn;
      },
    },

    //podaci iz baze sa Marsa
    reg_korisnik: {
      get() {
        return this.$store.getters.get_reg_korisnik;
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
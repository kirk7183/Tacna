<template>
  <div class="zavrsene_li">
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
          :items="lista_stvari"
          v-model="defaultSelected_lista_stvari"
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
    <!-- v-circular dok ocitava podatke -->
    <div v-if="!loadedData" class="text-center mt-12">
      <v-progress-circular
        indeterminate
        color="red"
        class="progress_circular"
      ></v-progress-circular>
    </div>

    <!--ako ima podataka prikazi ako nema prikazi div na dnu stranice-->
    <div v-if="loadedData != 'nema_podataka'">
      <div>
        <v-layout row wrap justify-center>
          <div v-for="(single, ii) in arrayData" :key="ii">
            <v-card
              class="card_licitacije mx-2 my-4 mx-sm-4 my-sm-6 my-md-5"
              elevation="5"
              min-width="260"
              max-width="300"
            >
              <!--poziv da se uradi prerada datuma i vremena kako bi se rezultat poslao u komponentu 
        Timer. Bez ovoga nece da prikaze datum. Inace ne vraca nikakav prikaz-->
              <!-- {{ pocetak_datumPrerada(single.pocetak_datum) }}
              {{ kraj_datumPrerada(single.kraj_datum) }} -->

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

                <!--Poruka da je licitacija zavrsena-->
                <v-card-text class="text-center"> </v-card-text>
                <div class="row justify-center">
                  <div class="zavrsenoPoruka">Završena licitacija</div>
                </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      lista_stvari: [],
      loadedData: false,
      arrayData: [],
      defaultSelected_sort_vrsta: "SVE",
      defaultSelected_lista_stvari: "SVE",
      defaultSelected_sortiranje_od_do: "SVE",
    };
  },
  created() {
    //da povuce podatke iz firebase-a
    this.$store.dispatch("pregled_zavrsenih_licitacija");

    //da nadgleda svaku promenu u firebase (ako neko izbrise nesto, promeni ili doda)
    this.$store.dispatch("onSnapShot_zavrsene");

    //lista sort_vrsta iz Vuexa (Sve,licna,humanitarna)
    this.sort_vrsta = this.$store.getters.get_sort_vrsta;
    this.sort_vrsta.unshift("SVE"); //naknado na vrh liste dodaje "SVE" za listanje svih grupa

    //lista stvari iz Vuexa
    this.$store.getters.get_lista_stvari.forEach((element) => {
      this.lista_stvari.push(element);
    });
    //sortiranje
    this.lista_stvari.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
    });
    //pa posle sortiranja dodajemo na pocetku i na kraju niza
    this.lista_stvari.unshift("SVE"); //naknado na vrh liste dodaje "SVE" za listanje svih grupa
    this.lista_stvari.push("Neodredjeno"); //dodavanje na dno tabele - ako stavimo u VUEX onda ce da sortira negde na
    //sredini niza a ja zelim da bude na kraju

    //lista sortiranje_od_do(Naziv a-z, naziv z-a, cena rastuce, cena opadajuce)
    this.sortiranje_od_do = this.$store.getters.get_sortiranje_od_do;
    this.sortiranje_od_do.unshift("SVE"); //naknado na vrh liste dodaje "SVE" za listanje svih grupa
  },
  watch: {
    //motri na computed zavrsene_licitacije kada dobije podatke
    //ovo je na pocetku kada se ocitavaju SVE stvari (nisam jos odredio
    //po kom kriterijumu ce to bi - da li po preostalom vremenu ili necem drugom )
    zavrsene_licitacije(newValue) {
      //ako nije prazan i nema podatak "nema_podataka" tj. ako ima podataka onda...
      if (
        this.zavrsene_licitacije.length != 0 &&
        this.zavrsene_licitacije != "nema_podataka"
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
    },
  },
  computed: {
    zavrsene_licitacije: {
      get() {
        return this.$store.getters.get_zavrsene_licitacije;
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
    vrsta_licit(vrsta_licitacije) {
      var boja;
      if (vrsta_licitacije == "licna") {
        boja = "background-color:#988BC7";
      } else if (vrsta_licitacije == "humanitarna") {
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
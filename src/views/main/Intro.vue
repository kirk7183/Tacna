<template>
  <v-container class="mainPage" fluid :class="breakpoints">
    <div class="top">
      <v-row wrap>
        <v-col cols="12" md="6" class="col-left">
          <svg
            v-if="$vuetify.breakpoint.mdAndUp"
            version="1.1"
            id="svg-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1400 300"
            style="enable-background: new 0 0 1400 300"
            xml:space="preserve"
          >
            <path
              id="XMLID_2_"
              class="st0"
              d="M0,294.6c0,0,76-99.2,379.2-88.2c166.7,6.1,249.5,91.9,472.7,39.7
	c260.7-60.9,548.1,39.6,548.1,39.6v74.9L0,351.9"
            />
          </svg>

          <div class="top-left">
            <div class="group-left">
              <img class="logo" src="@/assets/logo/tacna.png" alt="logo-img" />
              <ul>
                <li>S</li>
                <li>v</li>
                <li>e</li>
                <li class="space"></li>
                <li>j</li>
                <li>e</li>
                <li class="space"></li>
                <li>n</li>
                <li>a</li>
                <li class="space"></li>
                <li>t</li>
                <li>a</li>
                <li>c</li>
                <li>n</li>
                <li>i</li>
              </ul>
              <button
                class="dobrodosli"
                v-if="$vuetify.breakpoint.mdAndUp"
                @click="changePage()"
              >
                DOBRODOŠLI
              </button>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="col-right">
          <div class="top-right">
            <div class="group-right">
              <p class="intro-paragraf-naslov">Da li ste znali?</p>

              <p class="intro-paragraf">
                <i class="fas fa-arrow-circle-right"></i>
                da 8 od 10 osoba uspešno koristi internet za promovisanje svojih
                proizvoda i usluga!
              </p>

              <p class="intro-paragraf">
                <i class="fas fa-arrow-circle-right"></i>
                dok 9 od 10 osoba koristi internet kao sredstvo informisanja!
              </p>

              <p class="nudite">Da li vaši sugradjani znaju šta nudite?</p>
              <button
                class="dobrodosli"
                v-if="$vuetify.breakpoint.smAndDown"
                @click="changePage()"
              >
                DOBRODOŠLI
              </button>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="bottom">
      <div class="big-boxes">
        <p class="natpis">Saradnja:</p>
        <div class="boxes">
          <div class="img-boxes">
            <a target="_blank" :href="saradnja1()">
              <img :src="saradnja1()" alt="img1-saradnja" />
            </a>
          </div>
          <div class="img-boxes">
            <a target="_blank" :href="saradnja2()">
              <img :src="saradnja2()" alt="img2-saradnja" />
            </a>
          </div>
          <div class="img-boxes">
            <a target="_blank" :href="saradnja3()">
              <img :src="saradnja3()" alt="img3-saradnja"
            /></a>
          </div>
        </div>
      </div>
      <div class="big-boxes">
        <p class="natpis">Medijska podrška:</p>
        <div class="boxes">
          <div class="img-boxes">
            <a target="_blank" :href="mediji1()">
              <img :src="mediji1()" alt="img1-saradnja"
            /></a>
          </div>
          <div class="img-boxes">
            <a target="_blank" :href="mediji2()">
              <img :src="mediji2()" alt="img2-saradnja"
            /></a>
          </div>
          <div class="img-boxes">
            <a target="_blank" :href="mediji3()">
              <img :src="mediji3()" alt="img3-saradnja"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      prva_saradnja: require("@/assets/pics/saradnja/slika-1.png"),
      druga_saradnja: require("@/assets/pics/saradnja/slika-2.png"),
      treca_saradnja: require("@/assets/pics/saradnja/slika-3.png"),
      prvi_mediji: require("@/assets/pics/mediji/slika-1.png"),
      drugi_mediji: require("@/assets/pics/mediji/slika-2.png"),
      treci_mediji: require("@/assets/pics/mediji/slika-3.png"),
    };
  },
  computed: {
    breakpoints() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
          return {
            "sm-breakpoint md-breakpoint lg-breakpoint": this.$vuetify
              .breakpoint.lgAndUp,
          };
        case "md":
          return {
            "sm-breakpoint md-breakpoint": this.$vuetify.breakpoint.mdAndUp,
          };
        case "sm":
          return { "sm-breakpoint": this.$vuetify.breakpoint.smAndUp };
        default:
          return { "": this.$vuetify.breakpoint.xs }; //default je XS i pisemo normalno bez oznacavanja klase
      }
    },
  },
  methods: {
    changePage() {
      this.$router.push("/home");
    },
    saradnja1() {
      return this.prva_saradnja;
    },
    saradnja2() {
      return this.druga_saradnja;
    },
    saradnja3() {
      return this.treca_saradnja;
    },
    mediji1() {
      return this.prvi_mediji;
    },
    mediji2() {
      return this.drugi_mediji;
    },
    mediji3() {
      return this.treci_mediji;
    },
  },
};
//ternarny operator sa vise uslova za Vuetify - ne brisati
// :class="
//                 $vuetify.breakpoint.xs
//                   ? `group-right-xs`
//                   : $vuetify.breakpoint.smAndDown
//                   ? `group-right-sm`
//                   : $vuetify.breakpoint.md
//                   ? `group-right-md`
//                   : `group-right-lg`
//               "
</script>

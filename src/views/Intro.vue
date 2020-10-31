<template>
  <v-container class="home" fluid :class="breakpoints">
    <div class="top">
      <v-row wrap>
        <v-col
          cols="12"
          md="6"
          class="col"
          :class="$vuetify.breakpoint.smAndDown ? `div-col-top-sm` : ``"
        >
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

          <div
            class="top-left"
            :class="$vuetify.breakpoint.smAndDown ? `top-left-sm` : ``"
          >
            <div
              class="group-left"
              :class="$vuetify.breakpoint.smAndDown ? `group-left-sm` : ``"
            >
              <img
                class="logo"
                :class="$vuetify.breakpoint.xs ? `logo-xs` : ``"
                src="../assets/logo/tacna.png"
                alt="logo-img"
              />
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
              <button class="dobrodosli" v-if="$vuetify.breakpoint.mdAndUp">
                DOBRODOŠLI
              </button>
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="6"
          class="col"
          :class="$vuetify.breakpoint.smAndDown ? `div-col-middle-sm` : ``"
        >
          <div
            class="top-right"
            :class="
              $vuetify.breakpoint.smAndDown ? `top-right-sm` : `top-right-xs`
            "
          >
            <!-- TERNARY OPERATOR sa vise uslova (uslova) -->
            <div
              class="group-right"
              :class="
                $vuetify.breakpoint.xs
                  ? `group-right-xs`
                  : $vuetify.breakpoint.smAndDown
                  ? `group-right-sm`
                  : $vuetify.breakpoint.md
                  ? `group-right-md`
                  : `group-right-lg`
              "
            >
              <!-- :style="$vuetify.breakpoint.lg ? " -->
              <p
                class="intro-paragraf-naslov"
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? `intro-paragraf-naslov-sm`
                    : $vuetify.breakpoint.md
                    ? `intro-paragraf-naslov-md`
                    : `intro-paragraf-naslov-lg`
                "
              >
                Da li ste znali?
              </p>

              <p
                class="intro-paragraf"
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? `intro-paragraf-sm`
                    : $vuetify.breakpoint.md
                    ? `intro-paragraf-md`
                    : `intro-paragraf-lg`
                "
              >
                <i class="fas fa-arrow-circle-right"></i>
                da 8 od 10 osoba uspešno koristi internet za promovisanje svojih
                proizvoda i usluga!
              </p>

              <p
                class="intro-paragraf"
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? `intro-paragraf-sm`
                    : $vuetify.breakpoint.md
                    ? `intro-paragraf-md`
                    : `intro-paragraf-lg`
                "
              >
                <i class="fas fa-arrow-circle-right"></i>
                da 9 od 10 osoba koristi internet kao sredstvo informisanja!
              </p>

              <p
                class="nudite"
                :class="
                  $vuetify.breakpoint.xs
                    ? `nudite-xs`
                    : $vuetify.breakpoint.smAndDown
                    ? `nudite-sm`
                    : $vuetify.breakpoint.md
                    ? `nudite-md`
                    : `nudite-lg`
                "
              >
                Da li vaši sugradjani znaju šta nudite?
              </p>
              <button
                class="dobrodosli"
                v-if="$vuetify.breakpoint.smAndDown"
                :class="$vuetify.breakpoint.smAndDown ? `dobrodosli-sm` : ``"
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
        <p class="natpis1">Saradnja:</p>
        <div class="boxes">
          <div class="img-boxes">
            <a target="_blank" :href="saradnja1()">
              <img :src="saradnja1()" alt="img1-saradnja" />
            </a>
          </div>
          <div class="img-boxes">
            <img :src="saradnja2()" alt="img2-saradnja" />
          </div>
          <div class="img-boxes">
            <img :src="saradnja3()" alt="img3-saradnja" />
          </div>
        </div>
      </div>
      <div class="big-boxes">
        <p class="natpis1">Medijska podrška:</p>
        <div class="boxes">
          <div class="img-boxes">
            <img :src="mediji1()" alt="img1-saradnja" />
          </div>
          <div class="img-boxes">
            <img :src="mediji2()" alt="img2-saradnja" />
          </div>
          <div class="img-boxes">
            <img :src="mediji3()" alt="img3-saradnja" />
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
      prva_saradnja: require("../assets/pics/saradnja/slika-1.png"),
      druga_saradnja: require("../assets/pics/saradnja/slika-2.png"),
      treca_saradnja: require("../assets/pics/saradnja/slika-3.png"),
      prvi_mediji: require("../assets/pics/mediji/slika-1.png"),
      drugi_mediji: require("../assets/pics/mediji/slika-2.png"),
      treci_mediji: require("../assets/pics/mediji/slika-3.png"),
    };
  },
  computed: {
    breakpoints() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return { "lg-breakpoint": " " }; //mora da ima razmak zato sto je to parametar, medjutim
        //posto je to naziv klase i nema parametar mora da ima prazno polje. Primer u projektu
        //"portfolio_igor_vasic" u projects.vue za :style
        case "md":
          return { "md-breakpoint": " " };
        case "sm":
          return { "sm-breakpoint": " " };
        default:
          return { "": "" }; //default je XS i pisemo normalno bez oznacavanja klase
      }
    },
  },
  methods: {
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
</script>

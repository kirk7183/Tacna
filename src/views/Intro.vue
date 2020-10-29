<template>
  <v-container class="home" fluid>
    <div class="top">
      <v-row wrap>
        <v-col cols="12" md="6" class="col">
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
              <img class="logo" src="../assets/logo/tacna.png" alt="logo-img" />
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

        <v-col cols="12" md="6" class="col">
          <div
            class="top-right"
            :class="$vuetify.breakpoint.smAndDown ? `top-right-sm` : ``"
          >
            <!-- TERNARY OPERATOR sa vise uslova (uslova) -->
            <div
              class="group-right"
              :class="
                $vuetify.breakpoint.smAndDown
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
                8 od 10 osoba uspešno koristi internet za promovisanje svojih
                proizvoda i usluga!
              </p>
              <br />
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
                9 od 10 osoba koristi internet kao sredstvo informisanja!
              </p>
              <br />
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
                Da li vaši sugradjani znaju šta nudite?
              </p>
              <button class="dobrodosli" v-if="$vuetify.breakpoint.smAndDown">
                DOBRODOŠLI
              </button>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="bottom"></div>
  </v-container>
</template>

<script>
export default {
  components: {},
};
</script>

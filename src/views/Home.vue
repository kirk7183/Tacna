<template>
  <v-container class="mainPage" fluid :class="breakpoints">
    <v-app-bar color="#8d81b8">
      <v-app-bar-nav-icon @click="iconClose"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <p class="ispis-tacna">Tacna</p>
      <v-spacer></v-spacer>

      <v-btn icon class="text-center">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- NAVIGATION DRAWER-->
    <v-navigation-drawer v-model="drawer" app temporary hide-overlay>
      <v-list nav dense>
        <v-list-item-group
          v-model="groupClose"
          active-class="deep-purple--text text--accent-4"
        >
          <div class="nav-drawer d-flex">
            <v-subheader>TACNA</v-subheader><br />
            <v-spacer></v-spacer>
            <v-btn icon @click="iconClose" class="ml-3">
              <i class="far fa-times-circle fa-2x black--text pa-0"></i>
            </v-btn>
          </div>
          <v-list-item
            v-for="(jednaOpcija, i) in sveOpcije"
            :key="i"
            @click="changePage(jednaOpcija.broj)"
          >
            <v-list-item-title>{{ jednaOpcija.opcija }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <transition name="fade" mode="out-in">
      <router-view> </router-view
    ></transition>
    <Footera></Footera>
  </v-container>
</template>

<script>
import Footera from "@/views/Footer.vue";
export default {
  components: { Footera },
  data() {
    return {
      activePage: 1,
      drawer: false,
      groupClose: null,
      sveOpcije: [
        { opcija: "Početna strana - Obavestenja", broj: 1 },
        { opcija: "Aukcija - u pripremi", broj: 2 },
        { opcija: "Popusti - jos ne radi", broj: 3 },
        { opcija: "Nudim - jos ne radi", broj: 4 },
        { opcija: "Trazim - jos ne radi", broj: 5 },
        { opcija: "Solidarnost Online - jos ne radi", broj: 6 },
      ],
    };
  },
  watch: {
    groupClose() {
      this.drawer = false;
    },
  },
  created() {
    if (this.$route.path == "/obavestenje") {
      this.activePage = 1;
    } else if (this.$route.path == "/aukcija") {
      this.activePage = 2;
    } else if (this.$route.path == "/popusti") {
      this.activePage = 3;
    } else if (this.$route.path == "/nudim") {
      this.activePage = 4;
    } else if (this.$route.path == "/trazim") {
      this.activePage = 5;
    } else if (this.$route.path == "/solidarnost_Online") {
      this.activePage = 6;
    }
  },
  computed: {
    breakpoints() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
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
    changePage(broj) {
      if (broj == this.activePage) {
        this.activePage = 0;
      } else if (broj == 1) {
        this.$router.push("obavestenja");
        this.activePage = 1;
      } else if (broj == 2) {
        this.$router.push("aukcija");
        this.activePage = 2;
      } else if (broj == 3) {
        this.$router.push("popusti");
        this.activePage = 3;
      } else if (broj == 4) {
        this.$router.push("nudim");
        this.activePage = 4;
      } else if (broj == 5) {
        this.$router.push("trazim");
        this.activePage = 5;
      } else if (broj == 6) {
        this.$router.push("solidarnost_Online");
        this.activePage = 6;
      }
    },
    iconClose() {
      this.drawer = !this.drawer;
    },
  },
};
</script>


<template>
  <div>
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
            <v-subheader>Tacna</v-subheader><br />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePage: 1,
      drawer: false,
      groupClose: null,
      sveOpcije: [
        { opcija: "Početna strana - Obavestenja", broj: 1 },
        { opcija: "Solidarnost Online - u pripremi", broj: 6 },
        { opcija: "Aukcija - jos ne radi", broj: 2 },
        { opcija: "Popusti - jos ne radi", broj: 3 },
        { opcija: "Nudim - jos ne radi", broj: 4 },
        { opcija: "Trazim - jos ne radi", broj: 5 },
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
      // this.changePage(1);
      this.activePage = 1;
    } else if (this.$route.path == "/aukcija") {
      console.log(this.$route.path);
      // this.changePage(2);
      this.activePage = 2;
    } else if (this.$route.path == "/popusti") {
      // this.changePage(3);
      this.activePage = 3;
    } else if (this.$route.path == "/nudim") {
      // this.changePage(4);
      this.activePage = 4;
    } else if (this.$route.path == "/trazim") {
      // this.changePage(5);
      this.activePage = 5;
    } else if (this.$route.path == "/solidarnost_Online") {
      // this.changePage(6);
      // this.activePage = 6;
    }
  },
  methods: {
    changePage(broj) {
      if (broj == this.activePage) {
        this.activePage = 0;
      }
      if (broj == 1) {
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

<style>
</style>
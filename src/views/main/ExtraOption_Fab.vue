<template>
  <div class="ExtraOption_Fab">
    <v-fab-transition>
      <v-speed-dial
        v-if="privilegije"
        :style="style"
        v-model="fab"
        fixed
        top
        right
        direction="bottom"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="green" light fab small>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-bookmark-outline </v-icon>
          </v-btn>
        </template>
        <span v-for="(button, i) in filteredButtons" :key="i">
          <v-btn fab dark small :color="button.color">
            <v-icon>{{ button.icon }}</v-icon>
          </v-btn>
        </span>
      </v-speed-dial>
    </v-fab-transition>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  data: () => ({
    buttons: [
      {
        //stranice moraju da pocinju sa velikim slovom kao path.name
        icon: "mdi-pencil",
        color: "yellow",
        stranice: ["Obavestenja", "Trazim"],
      },
      {
        icon: "mdi-plus",
        color: "white",
        stranice: ["Obavestenja"],
      },
      {
        icon: "mdi-delete",
        color: "red",
        stranice: ["Obavestenja", "Trazim", "Aukcija"],
      },
    ],
    fab: false,
    style: "",
    privilegije: false,
    windowTop: 0,
  }),

  created() {
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },

  watch: {
    //trazenje "DOZVOLE" se pokrenulo iz NavBar.vue gleda na Vuex da li ima "dozvolu = 3" ili vise, i da li je scroll at the top
    get_privilegije(value) {
      if (value && this.windowTop == 0) {
        this.privilegije = true;
      } else {
        this.privilegije = false;
      }
    },
    //gleda da li je scroll ispod 50px od top-a(do 50px je true) i da li ima "dozvolu" 3 ili vise
    windowTop(value) {
      if (value < 50 && this.get_privilegije) {
        this.privilegije = true;
        //ako su prikazane i ikonice iz velike ikone, da ih skupi
        this.fab = false;
      } else {
        this.privilegije = false;
      }
    },
    $route() {
      if (window.location.href.indexOf("solidarnost") > -1) {
        this.style = "margin-top: 102px";
      } else {
        this.style = "margin-top: 52px";
      }
    },
  },

  computed: {
    filteredButtons() {
      const path = this.$route;
      //   console.log(path);
      return this.buttons.filter((button) => {
        return button.stranice.includes(path.name);
      });

      //   button.stranice.includes == this.path
    },
    //ako je "dozvola" 3 ili veca onda je true
    get_privilegije() {
      return this.$store.getters.get_privilegije_boolean;
    },
  },
  methods: {
    //real-time update windowsTop svaki put kada se koristi scroll ispisuje njegovu vrednost
    onScroll(e) {
      this.windowTop = e.target.documentElement.scrollTop;
    },
  },
};
</script>

<style>
</style>
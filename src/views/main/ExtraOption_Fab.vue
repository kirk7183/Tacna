<template>
  <div class="extraOption_Fab_div">
    <div class="ExtraOption_Fab">
      <v-fab-transition>
        <v-speed-dial
          v-if="privilegije"
          v-model="fab"
          :style="style"
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
            <v-btn
              fab
              dark
              small
              :color="button.color"
              @click="getFunction(button.atClick)"
            >
              <v-icon>{{ button.icon }}</v-icon>
            </v-btn>
          </span>
        </v-speed-dial>
      </v-fab-transition>
      <!-- IMPORT COMPONENT-->
      <DialogAddObavestenja
        v-if="dialog_add_obavestenja_boolean"
        :mode="mode"
        :route="this.$route.path"
      ></DialogAddObavestenja>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    DialogAddObavestenja: () =>
      import("@/components/dialogs/Dialog_add_obavestenja.vue"),
  },
  data: () => ({
    mode: "add_obavestenje",
    buttons: [
      {
        //stranice moraju da pocinju sa velikim slovom kao path.name
        icon: "mdi-pencil",
        color: "yellow",
        stranice: [""],
      },
      {
        icon: "mdi-plus",
        color: "white",
        atClick: "add_obavestenje",
        stranice: [
          "Obavestenja",
          "Obavestenja_so",
          // "O_nama_so",
          "Licitacije_so",
        ],
      },
      {
        icon: "mdi-delete",
        color: "red",
        stranice: [""],
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
    //gleda na computed-get_provilegije
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
    //TRUE/FALSE DIALOG_ADD_OBAVESTENJA
    dialog_add_obavestenja_boolean: {
      get() {
        return this.$store.getters["_DIALOG/get_dialog_add_obavestenja"];
      },
      set(newValue) {
        this.$store.dispatch("_DIALOG/set_dialog_add_obavestenja", newValue);
      },
    },
    //filter prikaza icons u zavisnosti od posecene stranice
    filteredButtons() {
      const path = this.$route;
      return this.buttons.filter((button) => {
        return button.stranice.includes(path.name);
      });
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
    //sluzi da se dynamicki pozove funkcija
    getFunction(atClick) {
      this[atClick]();
    },
    add_obavestenje() {
      this.dialog_add_obavestenja_boolean = true;
    },
  },
};
</script>

<style>
</style>
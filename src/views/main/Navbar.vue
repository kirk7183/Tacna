<template>
  <div>
    <v-app-bar color="#988BC7">
      <v-app-bar-nav-icon @click="iconClose"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <p class="ispis-tacna">Tacna</p>
      <v-spacer></v-spacer>
      <!--prijava ako nisi logovan ili krug sa slikom ako si logovan-->
      <v-chip
        v-if="Facebook_Data.user_displayName == 'Niste logovani'"
        class="chipic ma-2"
        @click="dialog_for_login = true"
      >
        <v-avatar left>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        Prijava
      </v-chip>

      <div v-else class="profile-pic-div">
        <img
          class="profile-pic"
          :src="Facebook_Data.user_pic"
          @click="dialog_logout = true"
        />
      </div>
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
          <br />

          <!-- Promena ispisa ako je logovan ili ako nije u navigation drawer-->
          <p class="v-list-item__title fb-name">
            {{ Facebook_Data.user_displayName }}
          </p>
          <!--Sekcija za ispis podataka korisnika (displayName sa FB, 
          happy coin iz baze tj sa Marsa i prepoznavanje da li ima extra opcije i koje)-->

          <!-- OVO SAM UGASIO NIJE RADILO KAKO TREBA AKO NIJE REGISTROVAN KORISNIK-->
          <!-- <div class="logovan_korisnik_info">
            <div class="happy_coin" v-if="check_is_loggedIn">
              <v-img src="@/assets/happy-coin.png" max-width="30px"></v-img>
              <p class="v-list-item__title fb-name">
                Happy coin: {{ reg_korisnik.podaci.happy_coin }}
              </p>
            </div>
            <div class="div_checkbox v-list-item__title fb-name">
              <v-checkbox
                v-if="reg_korisnik.podaci.dozvola > 3"
                v-model="privilegije"
                :label="naziv_privilegija"
                class="checkbox"
              ></v-checkbox>
            </div>
          </div> -->
          <v-btn
            text
            class="login_logout_btn"
            :class="
              this.Facebook_Data.user_displayName != 'Niste logovani'
                ? `logout_btn`
                : `login_btn`
            "
            @click="login_logout"
            >{{
              this.Facebook_Data.user_displayName != "Niste logovani"
                ? "Odjava"
                : "Prijava"
            }}</v-btn
          >

          <!--PETLJA ZA ISPIS OPCIJA-->
          <v-list-item
            v-for="(jednaOpcija, i) in sveOpcije"
            :key="i"
            :class="buttonColor_selected[i]"
            @click="changePage(jednaOpcija.broj)"
          >
            <v-list-item-title>{{ jednaOpcija.opcija }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- IMPORT COMPONENT -->
    <DialogLogout>
      <template v-slot:title>Da li želite da se odjavite ?</template>
      <template v-slot:text></template>
    </DialogLogout>
    <DialogLoading>
      <template v-slot:ispis>Logovanje je u toku</template>
    </DialogLoading>
    <DialogForLogin></DialogForLogin>
  </div>
</template>

<script>
export default {
  components: {
    DialogLogout: () => import("@/components/dialogs/Dialog_logout.vue"),
    DialogLoading: () => import("@/components/dialogs/Dialog_loading"),
    DialogForLogin: () => import("@/components/dialogs/Dialog_for_login"),
  },
  data() {
    return {
      activePage: 1,
      drawer: false,
      groupClose: null,
      sveOpcije: [
        { opcija: "Početna strana - Obavestenja", broj: 1 },
        { opcija: "Solidarnost Online - u pripremi", broj: 2 },
        { opcija: "Licitacije - u pripremi", broj: 3 },
        // { opcija: "Popusti - jos ne radi", broj: 4 },
        // { opcija: "Nudim - jos ne radi", broj: 5 },
        // { opcija: "Trazim - jos ne radi", broj: 6 },
        // { opcija: "Izgubljeno - nadjeno - jos ne radi", broj: 7 },
      ],
    };
  },

  beforeCreate() {
    //ako se ugasi browser ili se refresh stranica i ako u firebase je jos uvek logovan
    //korisnik, onda da ubaci njegove podatke u Vuex
    this.$store.dispatch("check_is_user_logged_in");
  },
  created() {
    //When refresh page to check on what route is page and then setup activePage
    if (this.$route.path == "/obavestenje") {
      this.activePage = 1;
      //OZNACI KOJA JE STRANICA POSLE REFRESH-A
      //provera ukoliko URL sadrzi deo reci solidarnost ("solidarnost") nebitno da li je parent ili child u URL-u
      //ako postoji "darnost u URL onda pri Created() stranice stavi da je activePage=2"
    } else if (window.location.href.indexOf("solidarnost") > -1) {
      this.activePage = 2;
    } else if (window.location.href.indexOf("licitacije") > -1) {
      this.activePage = 3;
    } else if (this.$route.path == "/popusti") {
      this.activePage = 4;
    } else if (this.$route.path == "/nudim") {
      this.activePage = 5;
    } else if (this.$route.path == "/trazim") {
      this.activePage = 6;
    } else if (this.$route.path == "/izgubljeno_nadjeno") {
      this.activePage = 7;
    }
  },

  computed: {
    //ako ima korisnik "dozvolu" vecu od 3 onda dobija checkbox sa odredjenim nazivom u zavisnosti od visine dozvole
    naziv_privilegija() {
      let label;
      if (this.reg_korisnik.podaci.dozvola === 3) {
        label = "Moderador opcije";
      } else if (this.reg_korisnik.podaci.dozvola === 5) {
        label = "Admin opcije";
      }
      return label;
    },
    //da li je logovan korisnik
    check_is_loggedIn: {
      get() {
        return this.$store.getters.get_IsLoggedIn;
      },
    },
    //za checkbox ako je admin ili moderator da pokaze checkbox za dodatne opcije
    privilegije: {
      get() {
        return this.$store.getters.privilegije_boolean;
      },
      set(newValue) {
        this.$store.dispatch("show_privilegije", newValue);
      },
    },
    //podaci iz baze sa Marsa
    reg_korisnik: {
      get() {
        return this.$store.getters.get_reg_korisnik;
      },
    },
    //ocitava podatke iz Vuexa
    //fb podaci
    Facebook_Data: {
      get() {
        return this.$store.getters.Facebook_user_data;
      },
    },
    //DIALOG ZA LOGOUT
    dialog_logout: {
      get() {
        // return this.$store.getters.get_showDialog_logout;
        return this.$store.getters["_DIALOG/get_showDialog_logout"];
      },
      set(newValue) {
        this.$store.dispatch("_DIALOG/set_showDialog_logout", newValue);
      },
    },
    dialog_for_login: {
      get() {
        return this.$store.getters["_DIALOG/get_dialog_for_login"];
      },
      set(newValue) {
        this.$store.dispatch("_DIALOG/set_dialog_for_login", newValue);
      },
    },
    //odredjivanje i postavljanje koje je dugme aktivno tj mali kruzic na icon
    buttonColor_selected() {
      let result = [];
      for (let i = 1; i <= 6; i++) {
        if (this.activePage == i) {
          result.push("deep-purple--text text--accent-4 v-list-item--active");
        } else {
          result.push("");
        }
      }
      return result;
    },
  },
  methods: {
    login_logout() {
      if (this.Facebook_Data.user_displayName == "Niste logovani") {
        this.dialog_for_login = true;
      } else {
        this.dialog_logout = true;
      }
    },
    changePage(broj) {
      if (broj == this.activePage) {
        this.activePage = 0;
      }
      if (broj == 1) {
        this.$router.push({ path: "/obavestenja" });
        this.activePage = 1;
      } else if (broj == 2) {
        this.$router.push({ path: "/solidarnost_online" });
        this.activePage = 2;
      } else if (broj == 3) {
        this.$router.push({ path: "/licitacije" });
        this.activePage = 3;
      } else if (broj == 4) {
        this.$router.push({ path: "/popusti" });
        this.activePage = 4;
      } else if (broj == 5) {
        this.$router.push({ path: "/nudim" });
        this.activePage = 5;
      } else if (broj == 6) {
        this.$router.push({ path: "/trazim" });
        this.activePage = 6;
      } else if (broj == 7) {
        this.$router.push({ path: "/izgubljeno_nadjeno" });
        this.activePage = 7;
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
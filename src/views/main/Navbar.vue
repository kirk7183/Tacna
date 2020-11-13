<template>
  <div>
    <v-app-bar color="#8d81b8">
      <v-app-bar-nav-icon @click="iconClose"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <p class="ispis-tacna">Tacna</p>
      <v-spacer></v-spacer>

      <v-chip
        v-if="Facebook_Data.user_displayName == 'niste logovani'"
        class="chipic ma-2"
        @click="dialog_for_login = true"
      >
        <v-avatar left>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        Login
      </v-chip>

      <div v-else class="profile-pic-div">
        <img
          class="profile-pic"
          :src="Facebook_Data.user_pic"
          @click="facebook_logout = true"
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

          <!-- Promena ispisa ako je logovan ili ako nije-->
          <v-btn
            text
            class="login_logout_btn"
            :class="
              this.Facebook_Data.user_displayName != 'niste logovani'
                ? `logout_btn`
                : `login_btn`
            "
            @click="login_logout"
            >{{
              this.Facebook_Data.user_displayName != "niste logovani"
                ? "Logout"
                : "Login"
            }}</v-btn
          >

          <!--PETLJA -->
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
    <DialogDaNe :tip_dialoga="'fb_logout'">
      <template v-slot:title>Da li želite da se odjavite ?</template>
      <template v-slot:text></template>
    </DialogDaNe>
    <DialogLoading>
      <template v-slot:ispis>Logovanje je u toku</template>
    </DialogLoading>
    <DialogForLogin></DialogForLogin>
  </div>
</template>

<script>
import DialogDaNe from "@/components/dialogs/Dialog_da_ne.vue";
import DialogLoading from "@/components/dialogs/Dialog_loading";
import DialogForLogin from "@/components/dialogs/Dialog_for_login";
export default {
  components: {
    DialogDaNe,
    DialogLoading,
    DialogForLogin,
  },
  data() {
    return {
      showDialog_da_ne: false,
      activePage: 1,
      drawer: false,
      groupClose: null,
      sveOpcije: [
        { opcija: "Početna strana - Obavestenja", broj: 1 },
        { opcija: "Solidarnost Online - u pripremi", broj: 2 },
        { opcija: "Aukcija - jos ne radi", broj: 3 },
        { opcija: "Popusti - jos ne radi", broj: 4 },
        { opcija: "Nudim - jos ne radi", broj: 5 },
        { opcija: "Trazim - jos ne radi", broj: 6 },
      ],
    };
  },
  watch: {
    groupClose() {
      this.drawer = false;
    },
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
      //provera ukoliko URL sadrzi deo reci solidarnost ("darnost") nebitno da li je parent ili child u URL-u
      //ako postoji "darnost u URL onda pri Created() stranice stavi da je activePage=2"
    } else if (window.location.href.indexOf("solidarnost") > -1) {
      this.activePage = 2;
    } else if (this.$route.path == "/aukcija") {
      this.activePage = 3;
    } else if (this.$route.path == "/popusti") {
      this.activePage = 4;
    } else if (this.$route.path == "/nudim") {
      this.activePage = 5;
    } else if (this.$route.path == "/trazim") {
      this.activePage = 6;
    }
  },

  computed: {
    //ocitava podatke iz Vuexa
    Facebook_Data: {
      get() {
        return this.$store.getters.Facebook_user_data;
      },
    },
    facebook_logout: {
      get() {
        return this.$store.getters.get_showDialog_da_ne;
      },
      set(newValue) {
        this.$store.dispatch("set_showDialog_da_ne", newValue);
      },
    },
    dialog_for_login: {
      get() {
        return this.$store.getters.get_dialog_for_login;
      },
      set(newValue) {
        this.$store.dispatch("set_dialog_for_login", newValue);
      },
    },
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
      if (this.Facebook_Data.user_displayName == "niste logovani") {
        this.dialog_for_login = true;
      } else {
        this.facebook_logout = true;
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
        this.$router.push({ path: "/aukcija" });
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
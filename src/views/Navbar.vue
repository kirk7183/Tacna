<template>
  <div>
    <v-app-bar color="#8d81b8">
      <v-app-bar-nav-icon @click="iconClose"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <p class="ispis-tacna">Tacna</p>
      <v-spacer></v-spacer>

      <!-- <v-btn
        v-if="Facebook_Data.user_displayName == 'niste logovani'"
        icon
        class="text-center"
        @click="facebook_login"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn> -->
      <v-chip
        v-if="Facebook_Data.user_displayName == 'niste logovani'"
        class="chipic ma-2"
        @click="facebook_login"
      >
        <v-avatar left>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        Login
      </v-chip>

      <div
        v-if="Facebook_Data.user_displayName != 'niste logovani'"
        class="profile-pic-div"
      >
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
    <!-- IMPORT COMPONENT -->
    <DialogDaNe :tip_dialoga="'fb_logout'">
      <template v-slot:title>Da li želite da se izlogujete ?</template>
      <template v-slot:text></template>
    </DialogDaNe>
    <DialogLoading>
      <template v-slot:ispis>Logovanje je u toku</template>
    </DialogLoading>
  </div>
</template>

<script>
import DialogDaNe from "../components/Dialog_da_ne.vue";
import DialogLoading from "../components/Dialog_loading";
export default {
  components: {
    DialogDaNe,
    DialogLoading,
  },
  data() {
    return {
      showDialog_da_ne: false,
      activePage: 1,
      drawer: false,
      groupClose: null,
      sveOpcije: [
        { opcija: "Početna strana - Obavestenja", broj: 1 },
        { opcija: "Aukcija - jos ne radi", broj: 2 },
        { opcija: "Popusti - jos ne radi", broj: 3 },
        { opcija: "Nudim - jos ne radi", broj: 4 },
        { opcija: "Trazim - jos ne radi", broj: 5 },
        { opcija: "Solidarnost Online - u pripremi", broj: 6 },
      ],
    };
  },
  watch: {
    groupClose() {
      this.drawer = false;
    },
  },
  beforeCreate: function () {
    this.$store.dispatch("check_is_user_logged_in");
  },
  created() {
    // if ()
    //When refresh page to check on what route is page and then setup activePage
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
  },
  methods: {
    facebook_login() {
      this.$store.dispatch("Facebook_login");
    },
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
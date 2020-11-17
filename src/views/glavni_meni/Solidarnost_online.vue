<template>
  <div class="solidatnost_online">
    <v-app-bar class="app-bar" color="gray" elevation="1" height="50">
      <div v-for="(single, i) in icons" :key="i">
        <!--1st breakpoint buttons -->
        <v-btn
          v-if="$vuetify.breakpoint.smAndDown"
          icon
          elevation="2"
          :class="iconColor_selected[i]"
          @click="changePage(single, i)"
        >
          <v-icon class="solidarnost_icon">{{ single.icon }}</v-icon>
        </v-btn>

        <!--2nd breakpoint buttons -->
        <v-chip
          class="ma-2 pa-4"
          v-if="$vuetify.breakpoint.mdAndUp"
          icon
          elevation="2"
          :class="iconColor_selected[i]"
          @click="changePage(single, i)"
        >
          <v-avatar left>
            <v-icon class="pa-5" size="24">{{ single.icon }}</v-icon>
          </v-avatar>
          {{ single.text }}
        </v-chip>
      </div>
    </v-app-bar>

    <!-- INTERN ROUTER-->
    <transition name="fade" mode="out-in">
      <router-view> </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePage: 1,
      icons: [
        {
          icon: "fas fa-info",
          route: "/solidarnost_online/o_nama_so",
          text: "O nama",
        },
        {
          icon: "fas fa-star",
          route: "/solidarnost_online/obavestenje_so",
          text: "Obaveštenja",
        },
        {
          icon: "fas fa-heartbeat",
          route: "/solidarnost_online/donacije_so",
          text: "Donacije",
        },
        {
          icon: "fas fa-gavel",
          route: "/solidarnost_online/licitacija_so",
          text: "Licitacije",
        },
        {
          icon: "fas fa-piggy-bank",
          route: "/solidarnost_online/banka_so",
          text: "Banka",
        },
      ],
    };
  },
  watch: {
    //watch route ako je vec u nav_baru selektovana "solidarnost online" i recimo oznacena "banka", kada bi opet
    //kliknuli u navbaru na "solidarnost online promenila bi se ruta ali krug (chip) ne bi bio oznacen "i", ovo resava taj problem
    $route(to) {
      if (to.path === "/solidarnost_online/o_nama_so") {
        this.activePage = 1;
      }
    },
    activePage(value) {
      return (this.activePage = value);
    },
  },

  created() {
    //da prepozna po URL-u i da postavi broj activePage-a
    if (
      this.$route.path == "/solidarnost_online" ||
      this.$route.path == "/solidarnost_online/o_nama_so"
    ) {
      this.activePage = 1;
    } else if (this.$route.path == "/solidarnost_online/obavestenje_so") {
      this.activePage = 2;
    } else if (this.$route.path == "/solidarnost_online/donacije_so") {
      this.activePage = 3;
    } else if (this.$route.path == "/solidarnost_online/licitacija_so") {
      this.activePage = 4;
    } else if (this.$route.path == "/solidarnost_online/banka_so") {
      this.activePage = 5;
    }
  },
  computed: {
    iconColor_selected() {
      let result = [];
      for (let i = 1; i <= 5; i++) {
        if (this.activePage == i) {
          result.push("selected");
        } else {
          result.push("not_selected");
        }
      }
      return result;
    },
  },
  methods: {
    changePage(single, i) {
      this.$router.push({ path: `${single.route}` });
      this.activePage = i + 1;
    },
  },
};
</script>

<style>
</style>
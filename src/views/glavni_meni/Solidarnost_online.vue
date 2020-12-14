<template>
  <div class="solidatnost_online">
    <ChoiceBar
      :icons="icons"
      :iconColor_selected="iconColor_selected"
      :changePage="changePage"
    ></ChoiceBar>
    <!-- INTERN ROUTER-->
    <transition name="fade" mode="out-in">
      <router-view> </router-view>
    </transition>
  </div>
</template>

<script>
import ChoiceBar from "@/components/add-ons/ChoiceBar.vue";
export default {
  components: { ChoiceBar },
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
          route: "/solidarnost_online/obavestenja_so",
          text: "Obaveštenja",
        },
        {
          icon: "fas fa-heartbeat",
          route: "/solidarnost_online/donacije_so",
          text: "Donacije",
        },
        {
          icon: "fas fa-gavel",
          route: "/solidarnost_online/licitacije_so",
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
    } else if (this.$route.path == "/solidarnost_online/obavestenja_so") {
      this.activePage = 2;
    } else if (this.$route.path == "/solidarnost_online/donacije_so") {
      this.activePage = 3;
    } else if (this.$route.path == "/solidarnost_online/licitacije_so") {
      this.activePage = 4;
    } else if (this.$route.path == "/solidarnost_online/banka_so") {
      this.activePage = 5;
    }
  },
  computed: {
    iconColor_selected() {
      let result = [];
      for (let i = 1; i <= this.icons.length; i++) {
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
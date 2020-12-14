<template>
  <div class="licitacije">
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
          route: "/licitacije/uputstvo_li",
          text: "Uputstvo",
        },
        {
          icon: "fas fa-hand-holding-usd",
          route: "/licitacije/novaLicitacija_li",
          text: "Nova licitacija",
        },
        {
          icon: "fas fa-gavel",
          route: "/licitacije/licitiram_li",
          text: "Licitacije",
        },
        {
          icon: "fas fa-handshake",
          route: "/licitacije/zavrsene_li",
          text: "Završene",
        },
      ],
    };
  },
  watch: {
    //watch route ako je vec u nav_baru selektovana "solidarnost online" i recimo oznacena "banka", kada bi opet
    //kliknuli u navbaru na "solidarnost online promenila bi se ruta ali krug (chip) ne bi bio oznacen "i", ovo resava taj problem
    $route(to) {
      if (to.path === "/licitacije/uputstvo_li") {
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
      this.$route.path == "/licitacije" ||
      this.$route.path == "/licitacije/uputstvo_li"
    ) {
      this.activePage = 1;
    } else if (this.$route.path == "/licitacije/novaLicitacija_li") {
      this.activePage = 2;
    } else if (this.$route.path == "/licitacije/licitiram_li") {
      this.activePage = 3;
    } else if (this.$route.path == "/licitacije/zavrsene_li") {
      this.activePage = 4;
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
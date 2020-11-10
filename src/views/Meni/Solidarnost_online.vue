<template>
  <div class="solidatnost_online">
    <v-app-bar class="app-bar" color="gray" elevation="1" height="50">
      <div v-for="(single, i) in icons" :key="i">
        <v-btn
          class="spin circle"
          icon
          elevation="2"
          :class="iconColor_selected[i]"
          @click="changePage(single, i)"
        >
          <v-icon class="solidarnost_icon">{{ single.icon }}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
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
        { icon: "fas fa-info", route: "/solidarnost_online/info_so" },
        { icon: "fas fa-star", route: "/solidarnost_online/obavestenje_so" },
        { icon: "fas fa-gavel", route: "/solidarnost_online/licitacija_so" },
        { icon: "fas fa-piggy-bank", route: "/solidarnost_online/banka_so" },
      ],
    };
  },
  created() {
    //da prepozna po URL-u i da postavi broj activePage-a
    if (this.$route.path == "/solidarnost_online/info_so") {
      this.activePage = 1;
      console.log("info_so");
    } else if (this.$route.path == "/solidarnost_online/obavestenje_so") {
      this.activePage = 2;
    } else if (this.$route.path == "/solidarnost_online/licitacija_so") {
      this.activePage = 3;
    } else if (this.$route.path == "/solidarnost_online/banka_so") {
      this.activePage = 4;
    }
  },
  computed: {
    iconColor_selected() {
      let result = [];
      for (let i = 1; i <= 4; i++) {
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
      console.log(this.activePage);
    },
  },
};
</script>

<style>
</style>
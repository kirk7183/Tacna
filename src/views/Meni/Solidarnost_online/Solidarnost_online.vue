<template>
  <div class="solidatnost_online">
    <v-app-bar class="app-bar" color="gray" elevation="1" height="50">
      <div v-for="(single, i) in icons" :key="i">
        <v-btn icon elevation="2">
          <!-- '`${single.route}`' -->
          <!-- this.$route.push({ path: `${single.route}` }) -->
          <v-icon class="solidarnost_icon" @click="asd(single.route)">{{
            single.icon
          }}</v-icon>
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
      icons: [
        { icon: "fas fa-info", route: "/solidarnost_online/info" },
        { icon: "fas fa-star", route: "/solidarnost_online/obavestenje_so" },
        { icon: "fas fa-gavel", route: "/solidarnost_online/licitacija_so" },
        { icon: "fas fa-piggy-bank", route: "/solidarnost_online/banka_so" },
      ],
    };
  },
  methods: {
    asd(sss) {
      console.log(sss);
      this.$router.push({ path: `${sss}` });
    },
  },
};
</script>

<style>
</style>
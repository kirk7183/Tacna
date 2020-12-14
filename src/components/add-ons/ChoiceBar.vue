<template>
  <v-app-bar class="app-bar" color="gray" elevation="1" height="50">
    <div v-for="(single, i) in icons" :key="i">
      <!--1st breakpoint buttons smAndDown -->
      <v-btn
        class="solidarnost_btn"
        v-if="$vuetify.breakpoint.smAndDown"
        icon
        elevation="2"
        :class="iconColor_selected[i]"
        @click="changePage(single, i)"
      >
        <v-icon class="solidarnost_icon" size="21">{{ single.icon }}</v-icon>
      </v-btn>

      <!--2nd breakpoint buttons mdAndUp -->

      <!-- bind za klasu su uradjena 2 ovde: da doda class name IconColor_selected[i]
          kao i da kada je LG i veci ekran da poveca chip size posto izgleda da prema vuetify oni nisu responsive -->
      <v-chip
        v-if="$vuetify.breakpoint.mdAndUp"
        class="ma-2 pa-4"
        :class="[
          $vuetify.breakpoint.lgAndUp ? 'v-chip-lgAndUp' : '',
          iconColor_selected[i],
        ]"
        icon
        elevation="2"
        @click="changePage(single, i)"
      >
        <v-avatar left>
          <v-icon class="pa-5 solidarnost_icon_avatar" size="24">{{
            single.icon
          }}</v-icon>
        </v-avatar>
        {{ single.text }}
      </v-chip>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  props: ["icons", "iconColor_selected", "changePage"],
};
</script>

<style>
</style>
        <!-- // <v-btn icon class="star_icon_btn justify-end">
        //   <v-icon class="star_icon">fas fa-star</v-icon>
        // </v-btn> -->
<template>
  <div class="obavestenja_so">
    <!-- OBAVESTENJA_SO-->
    <v-card
      v-for="(jedno_obavestenje, i) in obavestenja_so"
      :key="i"
      class="ma-4 mx-2 my-4 mx-sm-4 my-sm-6 mx-md-8 my-md-12"
      elevation="5"
    >
      <v-card-title>
        <v-spacer></v-spacer>
        {{ jedno_obavestenje.naslov }}
        <v-spacer></v-spacer>
        <!--ako ima dozvolu 3 i vise -->
        <v-menu offset-y v-if="get_privilegije">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text x-small v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="
                (dialog_edit_obavestenja_boolean = true),
                  (edit_data.id_obavestenja = jedno_obavestenje.obav_id),
                  (edit_data.naslov_obavestenja = jedno_obavestenje.naslov),
                  (edit_data.text_obavestenja = jedno_obavestenje.text)
              "
            >
              <v-list-item-title class="item">Prepravka</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="
                (dialog_delete_obavestenja = true),
                  (edit_data.id_obavestenja = jedno_obavestenje.obav_id),
                  (edit_data.naslov_obavestenja = jedno_obavestenje.naslov)
              "
            >
              <v-list-item-title class="item">Brisanje</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <!-- :class="first_last_child(i, jedno_obavestenje.text.length)" -->
      <v-card-text class="px-md-7">
        <p class="ceo-text" style="white-space: pre-wrap">
          {{ jedno_obavestenje.text }}
        </p>
      </v-card-text>
    </v-card>

    <!--IMPORT COMPONENT-->
    <!-- :mode="mode" -->
    <DialogEditObavestenja
      v-if="dialog_edit_obavestenja_boolean"
      :route="this.$route.path"
      :edit_data="edit_data"
    ></DialogEditObavestenja>
    <DialogBrisanjeObavestenja :route="this.$route.path" :edit_data="edit_data">
    </DialogBrisanjeObavestenja>
  </div>
</template>

<script>
export default {
  components: {
    DialogEditObavestenja: () =>
      import("@/components/dialogs/Dialog_edit_obavestenja"),
    DialogBrisanjeObavestenja: () =>
      import("@/components/dialogs/Dialog_delete_obavestenja.vue"),
  },
  data() {
    return {
      // mode: "edit_obavestenje",
      edit_data: {
        id_obavestenja: "",
        naslov_obavestenja: "",
        text_obavestenja: "",
      },
    };
  },
  mounted() {
    //kada se kada je stranica mounted() ona u vuex-u napuni state.obavestenja
    //ona samo popunjava ne prikazuje, dole u computed getter vadi iz _API/get_obavestenja za prikaz
    this.$store.dispatch("_API/api_get_obavestenja", this.$route.path);
  },
  computed: {
    //getter da dobije state.obavestenja koji je popunjen prilikom mounted()
    obavestenja_so: {
      get() {
        return this.$store.getters["_API/get_obavestenja"];
      },
    },
    //ako je "dozvola" 3 ili veca onda je true
    get_privilegije() {
      return this.$store.getters.get_privilegije_boolean;
    },
    //DIALOG ZA ADD OBAVESTENJA
    dialog_edit_obavestenja_boolean: {
      get() {
        return this.$store.getters["_DIALOG/get_dialog_edit_obavestenja"];
      },
      set(newValue) {
        this.$store.dispatch("_DIALOG/set_dialog_edit_obavestenja", newValue);
      },
    },
    //DIALOG ZA BRISANJE OBAVESTENJA
    dialog_delete_obavestenja: {
      get() {
        return this.$store.getters["_DIALOG/get_dialog_delete_obavestenja"];
      },
      set(newValue) {
        this.$store.dispatch("_DIALOG/set_dialog_delete_obavestenja", newValue);
      },
    },
  },
  methods: {},
};
</script>

<style>
</style>
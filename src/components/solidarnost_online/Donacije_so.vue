<template>
  <div class="donacije_so">
    <v-card class="mx-2 my-4 mx-sm-4 my-sm-6 mx-md-8 my-md-12" elevation="5">
      <v-card-title :class="$vuetify.breakpoint.xs ? `v-card__title-xs` : ``">
        <p
          class="v-card__title pointer pa-0 ma-0"
          :class="!switch1 ? `put_border` : ``"
          @click="switch1 = false"
        >
          Prethodne donacije
        </p>
        <v-switch v-model="switch1" class="switch" color="white"> </v-switch>
        <p
          class="v-card__title pointer pa-0 ma-0"
          :class="switch1 ? `put_border` : ``"
          @click="switch1 = true"
        >
          Donacije u toku
        </p>
      </v-card-title>
      <v-layout row class="mx-auto">
        <v-flex
          xs12
          sm12
          md12
          lg6
          class="d-flex justify-center"
          v-for="(jedna_donacija, i) in donacije"
          :key="i"
        >
          <!--v-card u v-card - sa podacima kome se sve pomaze -->
          <v-card class="card-in-card mx-1 my-2 mx-sm-3 my-sm-4" width="750">
            <v-row>
              <v-col cols="6" sm="4" class="column mx-auto">
                <v-img
                  src="@/assets/solidarnost_online/organizatori/avatar.png"
                  max-width="100px"
                  class="mx-auto"
                >
                </v-img>
                <p class="ceo-text align-center">Ukupno skupljeno:</p>
                <div class="column circular">
                  <v-progress-circular
                    :rotate="-90"
                    :size="100"
                    :width="15"
                    :value="jedna_donacija.value"
                  >
                    {{ jedna_donacija.value }}%
                  </v-progress-circular>
                </div>
                <p class="ceo-text align-center no-pa-ma">
                  <b> Potrebno:</b> {{ jedna_donacija.potrebno }}
                </p>
                <p class="ceo-text align-center no-pa-ma">
                  <b>Nedostaje:</b> {{ jedna_donacija.nedostaje }}
                </p>
              </v-col>
              <v-col cols="12" sm="8" class="column">
                <v-card-text class="donacije_text px-md-7">
                  <p class="ceo-text no-text-align">
                    <b> Vrsta pomoći: </b>{{ jedna_donacija.vrsta_pomoci }}
                  </p>
                  <p class="ceo-text no-text-align">
                    <b> Ime i prezime: </b>{{ jedna_donacija.ime_prezime }}
                  </p>
                  <p class="ceo-text no-text-align">
                    <b>Datum rodjenja:</b> {{ jedna_donacija.datum_rodjenja }}
                  </p>
                  <p class="ceo-text no-text-align">
                    <b> Mesto: </b>{{ jedna_donacija.mesto }}
                  </p>
                  <p class="ceo-text no-text-align">
                    <b> Adresa: </b>{{ jedna_donacija.adresa }}
                  </p>
                  <p class="ceo-text">
                    <span class="ceo-text razlog_donacije"
                      ><b>Razlog donacije:</b></span
                    >
                    <br />
                    {{ jedna_donacija.razlog_donacije }}
                  </p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switch1: true,
      donacije_u_toku: [
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          vrsta_pomoci: "novčana",
          ime_prezime: "Dragan Draganović",
          datum_rodjenja: "12.05.1967.",
          mesto: "Požarevac",
          adresa: "Partizanska bb",
          razlog_donacije:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
          value: 40,
          potrebno: "1.500.000,00",
          nedostaje: "900.000,00",
        },
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          vrsta_pomoci: "adaptacija kuće",
          ime_prezime: "Jelena Jelenović",
          datum_rodjenja: "01.12.1981.",
          mesto: "Požarevac",
          adresa: "Tršćanska 14",
          razlog_donacije:
            "Rodjena 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
          value: 60,
          potrebno: "3.500.000,00",
          nedostaje: "1.400.000,00",
        },
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          vrsta_pomoci: "novčana",
          ime_prezime: "Jovan Jovanović",
          datum_rodjenja: "30.12.1965.",
          mesto: "Lučića",
          adresa: "Peta ulica 55",
          razlog_donacije:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
          value: 75,
          potrebno: "750.000,00",
          nedostaje: "187.500,00",
        },
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          vrsta_pomoci: "novčana",
          ime_prezime: "Dragana Pelević Stepić",
          datum_rodjenja: "12.05.1975.",
          mesto: "Požarevac",
          adresa: "Partizanska bb",
          razlog_donacije:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
          value: 94,
          potrebno: "5.550.000,00",
          nedostaje: "333.000,00",
        },
      ],
      prethodne_donacije: [
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          vrsta_pomoci: "novčana",
          ime_prezime: "Jovan Jovanović",
          datum_rodjenja: "30.12.1965.",
          mesto: "Lučića",
          adresa: "Peta ulica 55",
          razlog_donacije:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
          value: 100,
          potrebno: "535.000,00",
          nedostaje: "535.000,00",
        },
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          vrsta_pomoci: "novčana",
          ime_prezime: "Dragana Pelević Stepić",
          datum_rodjenja: "12.05.1975.",
          mesto: "Požarevac",
          adresa: "Partizanska bb",
          razlog_donacije:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
          value: 100,
          potrebno: "4.000.000,00",
          nedostaje: "4.000.000,00",
        },
      ],
    };
  },

  computed: {
    donacije() {
      var result;
      if (this.switch1) {
        result = this.donacije_u_toku;
      } else {
        result = this.prethodne_donacije;
      }
      return result;
    },
  },
};
</script>

<style>
</style>
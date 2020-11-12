<template>
  <div class="o_nama_so">
    <v-card class="mx-2 my-4 mx-sm-4 my-sm-6 mx-md-8 my-md-12" elevation="5">
      <v-card-title> "Solidarnost online" </v-card-title>

      <v-card-text class="px-3 px-md-7">
        <p class="ceo-text-podnaslov">Informacije o organizaciji</p>
        <p class="ceo-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio
          aenean sed adipiscing diam donec adipiscing. Iaculis urna id volutpat
          lacus laoreet. Vel turpis nunc eget lorem dolor sed. Ut pharetra sit
          amet aliquam id diam maecenas. Metus vulputate eu scelerisque felis.
          Odio ut enim blandit volutpat. Phasellus egestas tellus rutrum tellus.
          In egestas erat imperdiet sed euismod. Vitae tempus quam pellentesque
          nec nam. Amet tellus cras adipiscing enim eu turpis egestas pretium.
          Neque viverra justo nec ultrices dui sapien. At elementum eu facilisis
          sed odio morbi quis commodo odio. Ipsum dolor sit amet consectetur
          amet cursus. Leo vel orci porta non pulvinar neque laoreet
          suspendisse. At ultrices mi haretra et ultrices neque ornare aenean
          <br />
          <br />
          Donacije se vrse uplatom na: intesa doo lorem ipsum, lorem ipsum
          <br />
          <br />
          Kontakt telefon : 055/123-123-123
        </p>
      </v-card-text>
    </v-card>

    <v-card class="mx-2 my-4 mx-sm-4 my-sm-6 mx-md-8 my-md-12" elevation="5">
      <v-card-title> Članovi odbora </v-card-title>
      <v-layout row class="mx-auto">
        <v-flex
          xs12
          sm12
          md12
          lg6
          class="d-flex justify-center"
          v-for="(podatak, i) in podaci_organizatori"
          :key="i"
        >
          <!--v-card u v-card - sa podacima clanova odbora -->
          <v-card class="card-in-card mx-1 my-2 mx-sm-3 my-sm-4" width="750">
            <v-row>
              <v-col cols="6" sm="4" class="column mx-auto">
                <v-img
                  src="@/assets/solidarnost_online/organizatori/avatar.png"
                  max-width="100px"
                  class="mx-auto"
                >
                </v-img>
              </v-col>
              <v-col cols="12" sm="8" class="column">
                <v-card-text class="px-3 px-md-7">
                  <p class="ceo-text">
                    {{ podatak.text }}
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
      podaci_organizatori: [
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          text:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          text:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          text:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
        {
          pic: "@/assets/solidarnost_online/organizatori/avatar.png",
          text:
            "Rodjen 1969. u Novom Sadu. Bavio se...Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut.",
        },
      ],
    };
  },
  methods: {
    first_last_child(ii, duzina) {
      return ii === duzina - 1
        ? "last-child"
        : ii === 0
        ? `first-child`
        : `animals-${ii}`;
    },
  },
};
</script>

<style>
</style>
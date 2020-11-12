<template>
  <div class="donacije_so">
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
                <v-card-text class="px-md-7">
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
export default {};
</script>

<style>
</style>
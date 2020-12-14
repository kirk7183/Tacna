<template>
  <v-container bg fill-height grid-list-md class="pa-5">
    <v-layout row wrap justify-center>
      <v-flex>
        <h1 style="text-align: center">
          Stranica koju želite da posetite ne postoji !!!
        </h1>
        <h4 class="text-center">
          Molimo Vas vratite se korak nazad i koristite meni za navigaciju.
          Hvala !
        </h4>
        <div class="text-center" style="margin-top: 30px">
          <!-- router da vrati predhodnu stranicu kao prikaz (previous page)-->
          <v-btn @click="$router.go(-1)">Korak nazad</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
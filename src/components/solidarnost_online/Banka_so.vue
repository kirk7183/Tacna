<template>
  <div class="banka_so">
    <v-card class="mx-2 my-4 mx-sm-4 my-sm-6 mx-md-8 my-md-12" elevation="6">
      <v-card-title class="naslov">Banka </v-card-title>
      <v-layout row class="mx-auto">
        <v-flex xs12 sm12 md5 class="pa-2 pa-sm-5 pa-md-5">
          <v-card class="bank_card">
            <v-card-text class="px-1 px-md-7">
              <p
                class="ceo-text-naslov"
                :class="
                  $vuetify.breakpoint.xs
                    ? `ceo-text-naslov-xs`
                    : `ceo-text-naslov-smAndUp`
                "
              >
                Humanitarna organizacija "Solidarnost online" Vam se zahvaljuje
                na uplatama
              </p>
              <div class="novac">
                <p class="stanje_text">Doniran novac :</p>
                <p class="stanje_novac">14.350,00 din</p>
              </div>
            </v-card-text>
            <v-card-text class="px-1 px-md-7">
              <p class="ceo-text no-indent">Banka: <b>Intesa DOO</b></p>
              <p class="ceo-text no-indent">
                Račun: <b>123-123123123123-123</b>
              </p>
              <p class="ceo-text no-indent">
                Poziv na broj: <b>123-123123123-123</b>
              </p>
              <p class="ceo-text no-indent no-align">
                Svrha uplate:
                <b>za humanitarnu organizaciju Solidarnost Online</b>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md7 class="pa-2 pa-sm-5 pa-md-5">
          <v-card class="bank_card">
            <v-card-text class="px-1 px-md-7">
              <p class="stanje_text">Uplate/isplate donacija</p>
            </v-card-text>
            <v-card-text class="px-1 px-md-7">
              <p class="datum">Datum: 25.09.2020.</p>

              <div>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">Jovan Stević</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">30.000,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">Pera Perić</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">500,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">Jovana Jovanović</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">1500,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-minus-square isplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">
                      Za Draganu Kostić
                      <i
                        v-if="$vuetify.breakpoint.smAndUp"
                        class="fas fa-info-circle blue--text ml-3"
                      ></i>
                    </p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">50.000,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">S.R "Perović"</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">1.000,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">anonimno</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">500,00 din</p>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-text class="px-1 px-md-7">
              <p class="datum">Datum: 24.09.2020.</p>

              <div>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">Jovan Stević</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">30.000,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-minus-square isplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">Pera Perić</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">25000,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">Jovana Jovanović</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">1500,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-minus-square isplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">
                      Za Draganu Kostić
                      <i
                        v-if="$vuetify.breakpoint.smAndUp"
                        class="fas fa-info-circle blue--text ml-3"
                      ></i>
                    </p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">10.000,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">S.R "Perović"</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">1.000,00 din</p>
                  </v-col>
                </v-row>
                <v-row
                  class="row_uplata_isplata"
                  :class="
                    $vuetify.breakpoint.smAndUp
                      ? `row_uplata_isplata_smAndUp`
                      : `row_uplata_isplata_xs`
                  "
                >
                  <v-col cols="1" class="column plus_minus">
                    <i class="fas fa-plus-square uplata"></i>
                  </v-col>
                  <v-col cols="6" sm="6" class="column col_ime_prezime">
                    <p class="ime_prezime">anonimno</p>
                  </v-col>
                  <v-col cols="4" sm="3" md="4" class="column col_cifra">
                    <p class="cifra">500,00 din</p>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
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
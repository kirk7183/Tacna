<template>
  <div class="obavestenja">
    <!-- OBAVESTENJA-->
    <v-card
      v-for="(jedno_obavestenje, i) in glavna_obavestenja"
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

      <v-card-text class="px-md-7">
        <p class="ceo-text" style="white-space: pre-wrap">
          {{ jedno_obavestenje.text }}
        </p>
      </v-card-text>
    </v-card>

    <!--IMPORT COMPONENT-->
    <DialogEditObavestenja
      v-if="dialog_edit_obavestenja_boolean"
      :mode="mode"
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
      mode: "edit_obavestenje",
      edit_data: {
        id_obavestenja: "",
        naslov_obavestenja: "",
        text_obavestenja: "",
      },
      // route: "/obavestenja",

      // obavestenja: "",
      // obavestenja: [
      //   {
      //     naslov: "Obaveštenje",
      //     // "Postoji mogućnost da prilikom logovanja ne vidite svoju FB profilnu sliku u 'krugu', problem uglavnom stvara 'Avast Online Security'. Radimo na uklanjanju problema.",
      //     text: [
      //       "Poštovani, obaveštavamo Vas da je aplikacija u fazi razvoja i shodno tome želimo da znate da neke od opcija neće raditi kako je predvidjeno.",
      //       "Ukoliko želite da saradjujemo kako bi se ovaj projekat ostvario ili imate bilo kakvu preporuku za unapredjenje aplikacije, slobodno nam se obratite putem mail-a vasicigorjsp@gmail.com. Otvoreni smo za svaku vrstu saradnje.",
      //       "Logovanje još uvek nije omogućeno zato što je program još u razvoju.",
      //     ],
      //   },
      //   {
      //     naslov: "Upoznajte se sa idejom i načinom rada aplikacije",
      //     text: [
      //       "Cilj aplikacije je da se skupe svi proizvodi i sve usluge iz našeg komšiluka na jedno mesto. Postoji par razloga za to: ",
      //       "1. Stalno zapitkujemo po FB grupama da li neko zna gde ima da se kupi neki proizvod ili da li znamo nekoga ko obavlja odredjenu uslugu.",
      //       "2. Reklamirajući svoje usluge i proizvode konstantno se bombarduju grupe koje nisu namenjene za to.",
      //       "3. Potreba da možemo da vidimo odredjene proizvode/usluge na jednom mestu, da ih sortiramo i da vidimo dodatne informacije kao sto su: slika odredjenog proizvod, adresa gde se može kupiti proizvod ili dobiti odredjena usluga, broj telefona radi dodatnih informacija ili zakazivanja usluga, informacija da li se odredjeni proizvod dostavlja na kućnu adresu i kojim danima, da li drugi korisnici preporučuju odredjeni proizvod ili uslugu itd.",
      //       "Postoje i dve stvari koje će mnogima biti zanimljive a to su popusti i licitacija proizvoda.",
      //       "Popusti su nešto na šta ćemo posebno obratiti pažnju pre svega zbog lažnih popusta. Ideja je da ukoliko neko želi da se njegov proizvod ili usluga nadju u posebno namenjenoj grupi za popuste, moraće da budu objavljeni na sajtu barem 2 nedelje pre toga, kako ne bi došlo do toga da neko postavi odredjeni proizvod/uslugu i odmah napiše 'popust, sniženje ili akcija'. Takodje proizvod ili usluga će morati biti sniženi minimum 20% kako bi cela priča imala smisao. Razlog tome jeste 'DA POPUST BUDE POPUST' a ne marketinški trik gde će samo pisati da je proizvod/usluga sa sniženom cenom.",
      //       "Što se tiče licitacije, ukoliko imate neki proizvod za koji ne znate za koju bi ste ga cenu prodali, želite da dobijete što bolju cenu ili Vam jednostavno proizvod ne treba, možete ga dati na licitaciju gde će osoba sa najvećom ponudom moći da kupi odredjeni proizvod nakon isteka 24 ili 48h u zavisnosti od vaših podešavanja. Ove licitacije će posebno biti zanimljive za humanitarne organizacije koje sredstva za pomoć skupljaju na ovaj način.",
      //       "Veoma je bitno da naglasimo da je ova aplikacija eksperimentalna i kao takva ne služi za reklamiranje već kao sredstvo informisanja kako bi se utvrdilo koliko je gradjanima ovako nešto potrebno i kako bi se usput pomoglo humanitarnim organizacijama. Sve uplate koje se budu vršile a tiču se direktno same aplikacije, biće direktno uplaćivanje od strane DONATORA na račun neke od humanitarnih organizacija. To znači ukoliko neko želi da se njegov proizvod nadje na vrhu odredjene liste kako bi bio najzapaženiji kod kupaca, moraće da uplati odredjenu svotu novca nekoj humanitarnoj organizaciji po njegovom izboru.",
      //       "Takodje ne odgovaramo za tačnost oglasa niti garantujemo da ćе se kupovina ili usluga obaviti, zato što ovo nije sajt za reklamiranje.",
      //     ],
      //   },
      // ],
    };
  },
  mounted() {
    //kada se kada je stranica mounted() ona u vuex-u napuni state.obavestenja
    //ona samo popunjava ne prikazuje, dole u computed getter vadi iz _API/get_obavestenja za prikaz
    this.$store.dispatch("_API/api_get_obavestenja", this.$route.path);
  },
  computed: {
    //getter da dobije state.obavestenja koji je popunjen prilikom mounted()
    glavna_obavestenja: {
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
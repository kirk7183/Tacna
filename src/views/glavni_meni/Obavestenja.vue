<template>
  <div class="obavestenja">
    <!-- OBAVESTENJA-->
    <v-card
      v-for="(obavestenje, i) in obavestenja"
      :key="i"
      class="ma-4 mx-2 my-4 mx-sm-4 my-sm-6 mx-md-8 my-md-12"
      elevation="5"
    >
      <v-card-title>{{ obavestenje.naslov }}</v-card-title>
      <v-card-text
        class="px-md-7"
        v-for="(text1, ii) in obavestenje.text"
        :key="ii"
        :class="first_last_child(ii, obavestenje.text.length)"
      >
        <p class="ceo-text">
          {{ text1 }}
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obavestenja: [
        {
          naslov: "Obaveštenje",
          // "Postoji mogućnost da prilikom logovanja ne vidite svoju FB profilnu sliku u 'krugu', problem uglavnom stvara 'Avast Online Security'. Radimo na uklanjanju problema.",
          text: [
            "Poštovani, obaveštavamo Vas da je aplikacija u fazi razvoja i shodno tome želimo da znate da neke od opcija neće raditi kako je predvidjeno. Ukoliko imate bilo kakvu preporuku za unapredjenje aplikacije obratite nam se putem mail-a vasicigorjsp@gmail.com",
            "Logovanje još uvek nije omogućeno zato što je program još u razvoju.",
          ],
        },
        {
          naslov: "Upoznajte se sa idejom i načinom rada aplikacije",
          text: [
            "Cilj aplikacije je da se skupe svi proizvodi i sve usluge iz našeg komšiluka na jedno mesto. Postoji par razloga za to: ",
            "1. Stalno zapitkujemo po FB grupama da li neko zna gde ima da se kupi neki proizvod ili da li znamo nekoga ko obavlja odredjenu uslugu.",
            "2. Reklamirajući svoje usluge i proizvode konstantno se bombarduju grupe koje nisu namenjene za to.",
            "3. Potreba da možemo da vidimo odredjene proizvode/usluge na jednom mestu, da ih sortiramo i da vidimo dodatne informacije kao sto su: slika odredjenog proizvod, adresa gde se može kupiti proizvod ili dobiti odredjena usluga, broj telefona radi dodatnih informacija ili zakazivanja usluga, informacija da li se odredjeni proizvod dostavlja na kućnu adresu i kojim danima, da li drugi korisnici preporučuju odredjeni proizvod ili uslugu itd.",
            "Postoje i dve stvari koje će mnogima biti zanimljive a to su popusti i licitacija proizvoda.",
            "Popusti su nešto na šta ćemo posebno obratiti pažnju pre svega zbog lažnih popusta. Ideja je da ukoliko neko želi da se njegov proizvod ili usluga nadju u posebno namenjenoj grupi za popuste, moraće da budu objavljeni na sajtu barem 2 nedelje pre toga, kako ne bi došlo do toga da neko postavi odredjeni proizvod/uslugu i odmah napiše 'popust, sniženje ili akcija'. Takodje proizvod ili usluga će morati biti sniženi minimum 20% kako bi cela priča imala smisao. Razlog tome jeste 'DA POPUST BUDE POPUST' a ne marketinški trik gde će samo pisati da je proizvod/usluga sa sniženom cenom.",
            "Što se tiče licitacije, ukoliko imate neki proizvod za koji ne znate za koju bi ste ga cenu prodali, želite da dobijete što bolju cenu ili Vam jednostavno proizvod ne treba, možete ga dati na licitaciju gde će osoba sa najvećom ponudom moći da kupi odredjeni proizvod nakon isteka 24 ili 48h u zavisnosti od vaših podešavanja. Ove licitacije će posebno biti zanimljive za humanitarne organizacije koje sredstva za pomoć skupljaju na ovaj način.",
            "Veoma je bitno da naglasimo da je ova aplikacija eksperimentalna i kao takva ne služi za reklamiranje već kao sredstvo informisanja kako bi se utvrdilo koliko je gradjanima ovako nešto potrebno i kako bi se usput pomoglo humanitarnim organizacijama. Sve uplate koje se budu vršile a tiču se direktno same aplikacije, biće direktno uplaćivanje od strane DONATORA na račun neke od humanitarnih organizacija. To znači ukoliko neko želi da se njegov proizvod nadje na vrhu odredjene liste kako bi bio najzapaženiji kod kupaca, moraće da uplati odredjenu svotu novca nekoj humanitarnoj organizaciji po njegovom izboru.",
            "Takodje ne odgovaramo za tačnost oglasa niti garantujemo da ćе se kupovina ili usluga obaviti, zato što ovo nije sajt za reklamiranje.",
          ],
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
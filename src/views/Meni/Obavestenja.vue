<template>
  <div>
    <!-- OBAVESTENJA-->
    <v-card
      v-for="(obavestenje, i) in obavestenja"
      :key="i"
      class="card-obavestenje ma-4"
      elevation="5"
    >
      <v-card-text class="card-text text-center">
        <p v-html="obavestenje.naslov"></p>
        <span v-for="(text1, ii) in obavestenje.text" :key="ii">
          <p v-html="text1"></p>
        </span>
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
          naslov: "<p class='naslov'>Obaveštenje</p>",
          text: [
            "<p class='ceo-text'>Poštovani, obaveštavamo Vas da je aplikacija u fazi razvoja i shodno tome želimo da znate da neke od opcija neće raditi kako je predvidjeno. Ukoliko imate bilo kakvu preporuku za unapredjenje aplikacije obratite nam se putem mail-a vasicigorjsp@gmail.com</p>",
            "<p class='ceo-text'>Postoji mogućnost da prilikom logovanja ne vidite svoju FB profilnu sliku u 'krugu', problem uglavnom stvara 'Avast Online Security'. Radimo na uklanjanju problema. </p>",
          ],
        },
        {
          naslov:
            "<p class='naslov'>Upoznajte se sa idejom i načinom rada aplikacije</p>",
          text: [
            "<p class='ceo-text'>Cilj aplikacije je da se skupe svi proizvodi i sve usluge iz našeg komšiluka na jedno mesto. Postoji par razloga za to: </p>",
            "<p class='ceo-text'>1. Stalno zapitkujemo po FB grupama da li neko zna gde ima da se kupi neki proizvod ili da li znamo nekoga ko obavlja odredjenu uslugu.</p>",
            "<p class='ceo-text'>2. Reklamirajući svoje usluge i proizvode konstantno se bombarduju grupe koje nisu namenjene za to.</p>",
            "<p class='ceo-text'>3. Potreba da možemo da vidimo odredjene proizvode/usluge na jednom mestu, da ih sortiramo i da vidimo dodatne informacije kao sto su: slika odredjenog proizvod, adresa gde se može kupiti proizvod ili dobiti odredjena usluga, broj telefona radi dodatnih informacija ili zakazivanja usluga, informacija da li se odredjeni proizvod dostavlja na kućnu adresu i kojim danima, da li drugi korisnici preporučuju odredjeni proizvod ili uslugu itd. </p>",
            "<p class='ceo-text-podnaslov'>Postoje i dve stvari koje će mnogima biti zanimljive a to su popusti i licitacija proizvoda.</p>",
            "<p class='ceo-text text-left'>Popusti su nešto na šta ćemo posebno obratiti pažnju pre svega zbog lažnih popusta. Ideja je da ukoliko neko želi da se njegov proizvod ili usluga nadju u posebno namenjenoj grupi za popuste, moraće da budu objavljeni na sajtu barem 2 nedelje pre toga, kako ne bi došlo do toga da neko postavi odredjeni proizvod/uslugu i odmah napiše 'popust, sniženje ili akcija'. Takodje proizvod ili usluga će morati biti sniženi minimum 20% kako bi cela priča imala smisao. Razlog tome jeste 'DA POPUST BUDE POPUST' a ne marketinški trik gde će samo pisati da je proizvod/usluga sa sniženom cenom.</p>",
            "<p class='ceo-text text-left'>Što se tiče licitacije, ukoliko imate neki proizvod za koji ne znate za koju bi ste ga cenu prodali, želite da dobijete što bolju cenu ili Vam jednostavno proizvod ne treba, možete ga dati na licitaciju gde će osoba sa najvećom ponudom moći da kupi odredjeni proizvod nakon isteka 24 ili 48h u zavisnosti od vaših podešavanja. Ove licitacije će posebno biti zanimljive za humanitarne organizacije koje sredstva za pomoć skupljaju na ovaj način.</p>",
            "<p class='ceo-text text-left'>Veoma je bitno da naglasimo da je ova aplikacija eksperimentalna i kao takva ne služi za reklamiranje već kao sredstvo informisanja kako bi se utvrdilo koliko je gradjanima ovako nešto potrebno i kako bi se usput pomoglo humanitarnim organizacijama. Sve uplate koje se budu vršile a tiču se direktno same aplikacije, biće direktno uplaćivanje od strane DONATORA na račun neke od humanitarnih organizacija. To znači ukoliko neko želi da se njegov proizvod nadje na vrhu odredjene liste kako bi bio najzapaženiji kod kupaca, moraće da uplati odredjenu svotu novca nekoj humanitarnoj organizaciji po njegovom izboru.</p>",
            "<p class='ceo-text text-left'>Takodje ne odgovaramo za tačnost oglasa niti garantujemo da ćе se kupovina ili usluga obaviti, zato što ovo nije sajt za reklamiranje.</p>",
          ],
        },
      ],
    };
  },
};
</script>

<style>
</style>
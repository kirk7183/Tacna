import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/storage";
import $api from "@/api.js";
import { setTimeout } from "core-js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    IsLoggedIn: false,
    LoadingButton: false,
    Facebook_user_data: {
      user_displayName: "Niste logovani",
      user_pic: null,
      user_email: null,
    },
    snackbar: {
      boolean: false,
      message: "",
      color: "",
    },
    reg_korisnik: {
      podaci: {
        korisnik_id: null,
        ime: null,
        prezime: null,
        email: null,
        datum_reg: null,
        dozvola: null,
        datum_log: null,
        happy_coin: null,
        happy_coin_rez: null,
        status: null,
        br_telefona: null,
      },
    },
    grupa: [
      "Odeća i obuća",
      "Automobili, motorcikli i bicikli",
      "Igračke",
      "Hrana i piće",
      "Knjige, časopisi i stripovi",
      "Lov i ribolov",
      "Mobilni telefoni i oprema",
      "Kompjuteri i oprema",
      "Muzika i sve vezano za nju",
      "Nameštaj",
      "Nega (lica i tela) i šminka",
      "Poljoprivreda",
      "Sport i raznonoda",
      "TV, video i audio",
      "Uredjenje bašte i kuće",
    ],
    sort_vrsta: ["Lična", "Humanitarna"],
    sortiranje_od_do: [
      "Preostalo vreme - manje",
      "Preostalo vreme - više",
      "Naziv A-Z",
      "Naziv Z-A",
      "Cena rastuće",
      "Cena opadajuće",
    ],
    privilegije_boolean: false,
    sve_licitacije: [],
    zavrsene_licitacije: [],
    selected_vrsta: "SVE",
    selected_grupa: "SVE",
    selected_sortiranje_od_do: "Preostalo vreme - manje",
    licitacije_slike_predmet: [],
    licitacije_slike_primalac_donacije: [],
    uploadObjPredmet: {},
    uploadObjPrimalacDonacije: {},
    latestDoc: "",
  },
  getters: {
    get_IsLoggedIn: (state) => {
      return state.IsLoggedIn;
    },
    Facebook_user_data: (state) => {
      return state.Facebook_user_data;
    },
    get_snackbar_status: (state) => {
      return state.snackbar;
    },
    get_reg_korisnik: (state) => {
      return state.reg_korisnik;
    },
    get_obavestenja: (state) => {
      return state.glavna_obavestenja;
    },
    get_privilegije_boolean: (state) => {
      return state.privilegije_boolean;
    },
    get_sve_licitacije: (state) => {
      return state.sve_licitacije;
    },
    get_zavrsene_licitacije: (state) => {
      return state.zavrsene_licitacije;
    },
    get_sort_vrsta: (state) => {
      return state.sort_vrsta;
    },
    get_sortiranje_od_do: (state) => {
      return state.sortiranje_od_do;
    },
    get_grupa: (state) => {
      return state.grupa;
    },
    get_selected_vrsta: (state) => {
      return state.selected_vrsta;
    },
    get_selected_grupa: (state) => {
      return state.selected_grupa;
    },
    get_selected_sortiranje_od_do: (state) => {
      return state.selected_sortiranje_od_do;
    },
    get_licitacije_slike_predmet: (state) => {
      return state.licitacije_slike_predmet;
    },
    get_licitacije_slike_primalac_donacije: (state) => {
      return state.licitacije_slike_primalac_donacije;
    },
    get_uploadObjPredmet: (state) => {
      return state.uploadObjPredmet;
    },
    get_uploadObjPrimalacDonacije: (state) => {
      return state.uploadObjPrimalacDonacije;
    },
  },
  mutations: {
    FB_USER_DATA(state, payload) {
      state.Facebook_user_data.user_displayName = payload.user_displayName;
      state.Facebook_user_data.user_pic = payload.fb_profile_pic;
      state.Facebook_user_data.user_email = payload.user_email;
    },
    IS_LOGGED_IN(state, payload) {
      state.IsLoggedIn = payload.IsLoggedIn;
    },
    TOGGLE_SNACKBAR(state, payload) {
      let timeout = 0;
      //ako vec postoji otvoren snackbar
      if (state.snackbar.boolean == true) {
        state.snackbar.boolean = false;
        setTimeout(() => {
          //da bi prvo ugasio pa tek onda promenio vrednosti. Razlog je taj sto uvek prvo promeni vrednost pa tek onda nestane snackbar i smesno izgleda
          state.snackbar.message = "";
          state.snackbar.color = "";
        }, 500);
        timeout = 500;
      }
      setTimeout(() => {
        state.snackbar.boolean = payload.boolean;
        state.snackbar.message = payload.message;
        state.snackbar.color = payload.color;
      }, timeout); //bice 0 sekunde ako ne postoji snackbar ali ako postoji 500ms (da bi se videla razlika izmedju prethodnog i novog snackbara)
    },
    PODACI_REG_KORISNIKA(state, payload) {
      state.reg_korisnik.podaci = payload.podaci;
    },
    PRIVILEGIJE_PRIKAZI(state, payload) {
      state.privilegije_boolean = payload;
    },
    SVE_LICITACIJE(state, payload) {
      state.sve_licitacije = payload;
    },
    ZAVRSENE_LICITACIJE(state, payload) {
      state.zavrsene_licitacije = payload;
    },
    ADD_LICITACIJE(state, obj_licit) {
      //provera da li doc_id postoji u "state.sve_licitacije" sa doc_id koji mu prosledjujemo
      //kao novi podatak za ubacivanje u "state.sve_licitacije".
      const index = state.sve_licitacije.findIndex(
        (item) => item.random_id == obj_licit.random_id
      );
      //ako je rezultat nije "0" ili veci(1) tj. ako je rezultat "-1" znaci da ne postoji
      //podatak sa tim doc_id u bazi, sto znaci da ako ubacimo podatak onda nece biti dupliranja

      if (!(index >= 0)) {
        state.sve_licitacije.push({
          doc_id: obj_licit.doc_id,
          random_id: obj_licit.random_id,
          vrsta_licitacije: obj_licit.vrsta_licitacije,
          nudim: obj_licit.nudim,
          grupa: obj_licit.grupa,
          pocetna_cena_u_RSD: obj_licit.pocetna_cena_u_RSD,
          trajanje_licitacije: obj_licit.trajanje_licitacije,
          opis_licitacije: obj_licit.opis_licitacije,
          pocetak_datum: obj_licit.pocetak_datum,
          kraj_datum: obj_licit.kraj_datum,
          korisnik_ime: obj_licit.korisnik_ime,
          korisnik_prezime: obj_licit.korisnik_prezime,
        });
      } else {
        console.log("dupli podatak ADD LICITACIJE");
      }
    },

    ADD_ZAVRSENU(state, obj_licit) {
      //provera da li doc_id postoji u "state.sve_licitacije" sa random_id koji mu prosledjujemo
      //kao novi podatak za ubacivanje u "state.sve_licitacije".
      const index = state.zavrsene_licitacije.findIndex(
        (item) => item.random_id == obj_licit.random_id
      );
      //ako je rezultat nije "0" ili veci(1) tj. ako je rezultat "-1" znaci da ne postoji
      //podatak sa tim random_id u state.sve_licitacije, sto znaci da ako ubacimo podatak onda nece biti dupliranja
      //i zato mu dajemo napredbu da snimi podatak
      if (!(index >= 0)) {
        state.zavrsene_licitacije.push({
          doc_id: obj_licit.doc_id,
          random_id: obj_licit.random_id,
          vrsta_licitacije: obj_licit.vrsta_licitacije,
          nudim: obj_licit.nudim,
          grupa: obj_licit.grupa,
          pocetna_cena_u_RSD: obj_licit.pocetna_cena_u_RSD,
          trajanje_licitacije: obj_licit.trajanje_licitacije,
          opis_licitacije: obj_licit.opis_licitacije,
          pocetak_datum: obj_licit.pocetak_datum,
          kraj_datum: obj_licit.kraj_datum,
          korisnik_ime: obj_licit.korisnik_ime,
          korisnik_prezime: obj_licit.korisnik_prezime,
        });
      } else {
        console.log("GRESKA - dupli podatak ADD ZAVRSENU");
      }
    },

    UPDATE_ZAVRSENU(state, obj_licit) {
      const index = state.zavrsene_licitacije.findIndex(
        (item) => item.doc_id == obj_licit.id
      );
      state.zavrsene_licitacije.splice(index, 1, {
        doc_id: obj_licit.doc_id,
        random_id: obj_licit.random_id,
        vrsta_licitacije: obj_licit.vrsta_licitacije,
        nudim: obj_licit.nudim,
        grupa: obj_licit.grupa,
        pocetna_cena_u_RSD: obj_licit.pocetna_cena_u_RSD,
        trajanje_licitacije: obj_licit.trajanje_licitacije,
        opis_licitacije: obj_licit.opis_licitacije,
        pocetak_datum: obj_licit.pocetak_datum,
        kraj_datum: obj_licit.kraj_datum,
        korisnik_ime: obj_licit.korisnik_ime,
        korisnik_prezime: obj_licit.korisnik_prezime,
      });
    },

    DELETE_ZAVRSENU(state, id) {
      const index = state.zavrsene_licitacije.findIndex(
        (item) => item.doc_id == id
      );

      if (index >= 0) {
        state.zavrsene_licitacije.splice(index, 1);
      }
    },
    SET_SELECTED_VRSTA: (state, newValue) => {
      state.selected_vrsta = newValue;
    },
    SET_SELECTED_GRUPA: (state, newValue) => {
      state.selected_grupa = newValue;
    },
    SET_SELECTED_SORTIRANJE_OD_DO: (state, newValue) => {
      state.selected_sortiranje_od_do = newValue;
    },
    LICITACIJE_SLIKE_PREDMET: (state, newValue) => {
      state.licitacije_slike_predmet = newValue.slike;
    },
    LICITACIJE_SLIKE_PRIMALAC_DONACIJE: (state, newValue) => {
      state.licitacije_slike_primalac_donacije = newValue.slike;
    },
    UPLOAD_IMG_PERCENT_PREDMET: (state, payload) => {
      //update procenat uplaoda slike u Firebase/storage
      //ako vec postoji "key" sa istim imenom onda ce samo da update value
      //array(state.uploadObjPredmet), key(payload.keyName), value(payload.uploadValue)
      Vue.set(state.uploadObjPredmet, payload.keyName, payload.uploadValue);

      //primer samo - za jedan objekat ali u state.uploadObjPredmet mora biti array [](uploadObjPredmet=[])
      // Vue.set(state, "uploadObjPredmet", {
      //   [payload.keyName]: payload.uploadValue,
      // });
    },
    UPLOAD_IMG_PERCENT_PRIMALAC_DONACIJE: (state, payload) => {
      //update procenat uplaoda slike u Firebase/storage
      //ako vec postoji "key" sa istim imenom onda ce samo da update value
      //array(state.uploadObjPredmet), key(payload.keyName), value(payload.uploadValue)
      Vue.set(
        state.uploadObjPrimalacDonacije,
        payload.keyName,
        payload.uploadValue
      );
    },
    CLEAR_UPLOADING_IMAGES_OBJECT: (state) => {
      state.uploadObjPredmet = [];
      state.uploadObjPrimalacDonacije = [];
      state.licitacije_slike_predmet = [];
      state.licitacije_slike_primalac_donacije = [];
    },
  },

  actions: {
    async Facebook_login({ commit, dispatch }) {
      let user_displayName;
      let user_id;
      let user_email;
      let access_token_fb;
      // this.state.show_dialog_loading = true;
      // getters['_DIALOG/show_dialog_loading'](true)
      dispatch("_DIALOG/set_show_dialog_loading", true, { root: true });
      //obavezno u main.js mora biti importovan import "firebase/auth" inace login preko fb nece da radi;
      var provider = new firebase.auth.FacebookAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          if (result) {
            //USER DISPLAY NAME ON FB
            user_displayName = result.user.displayName;

            //NEED ID FOR FULL PATH OF PROFILE IMAGE ON FB JUST LIKE access_token
            user_id = result.additionalUserInfo.profile.id;
            //E-MAIL OF USER
            user_email = result.additionalUserInfo.profile.email;
            //NEED ACCESS TOKEN FOR FULL PATH OF PROGLE IMAGE ON FB JUST LIKE user_id
            access_token_fb = result.credential.accessToken;
            //access_token sa Facebooka stavljamo u local storage zato sto kad se ugasi browser ili refresh stranica
            //ne moze da se dodje do njega osim ako se negde u bazu ne snimi
            window.localStorage.setItem("access_token_fb", access_token_fb);
            let fb_profile_pic =
              "https://graph.facebook.com/" +
              user_id +
              "/picture?access_token=" +
              access_token_fb;
            commit("FB_USER_DATA", {
              user_displayName,
              fb_profile_pic,
              user_email,
            }),
              commit("IS_LOGGED_IN", {
                IsLoggedIn: true,
              });
          }
        })
        .then(() => {
          dispatch("_DIALOG/set_show_dialog_loading", false, { root: true });
          commit("TOGGLE_SNACKBAR", {
            boolean: true,
            message: "Uspešno ste se prijavili",
            color: "success",
          });
        })
        .catch((error) => {
          console.log(error.code);
          commit("TOGGLE_SNACKBAR", {
            boolean: true,
            message: "Došlo je do greške",
            color: "error",
          });
        });
    },

    Logout({ commit, dispatch }) {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful on firebase, then...
          //na marsu brisanje session()
          dispatch("_API/api_post_logout", { root: true });

          commit("FB_USER_DATA", {
            user_displayName: "Niste logovani",
            fb_profile_pic: null,
          });
          commit("IS_LOGGED_IN", {
            IsLoggedIn: false,
          });
          commit("TOGGLE_SNACKBAR", {
            boolean: true,
            message: "Uspešno ste se odjavili",
            color: "success",
          });
          //KADA SE IZLOGUJE BRISANJE PODATAKA
          commit("PODACI_REG_KORISNIKA", {
            podaci: {
              korisnik_id: null,
              ime: null,
              prezime: null,
              email: null,
              datum_reg: null,
              dozvola: null,
              datum_log: null,
              happy_coin: null,
              happy_coin_rez: null,
              status: null,
            },
          });
          //gasenje checkbox za privilegovane korisnike(admina i moderatora)
          commit("PRIVILEGIJE_PRIKAZI", false);
          //brisanje access_token iz local storage
          window.localStorage.removeItem("access_token_fb");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //PROVERA DA LI JE KORISNIK LOGOVAN AKO SE UGASI BROWSER ILI SE REFRESH STRANICA DA OPET POKUPI PODATKE
    //inace kada se login smatra se da je refresh-ovana stranica tako da je ovaj action poziva i on povlaci podatke ako ste
    //registrovani, a ako niste onda bude null
    check_is_user_logged_in({ commit, dispatch }) {
      //1 linija koda ispod brise obavestenja kada se refresh stranica da bi opet ocitalo iz baze ukoliko ima updatova
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          let result = firebase.auth().currentUser;
          let user_displayName = result.providerData[0].displayName;
          let user_email = result.providerData[0].email;
          //FULL PATH OF PROFILE IMAGE ON FB
          let user_id = result.providerData[0].uid;
          let access_token_fb = window.localStorage.getItem("access_token_fb");
          let fb_profile_pic =
            "https://graph.facebook.com/" +
            user_id +
            "/picture?access_token=" +
            access_token_fb;
          //izvlacenje iz localStorage zato sto se posle refresh ili gasenja strane gube podaci
          commit("FB_USER_DATA", {
            user_displayName,
            fb_profile_pic,
            user_email,
          }),
            commit("IS_LOGGED_IN", {
              IsLoggedIn: true,
            });
          //SALJE EMAIL, PROVERA NA MARSU DA LI JE REGISTROVAN (uporedjivane mail-a) I AKO JESTE
          //VRACAJU SE PODACI IZ BAZE. INACE PRI SVAKOM LOGOVANJU AUTOMATSKI SE REFRESH STRANA I
          //POKRECE OVAJ ACTION KOJI JE STAVLJEN U NAVBAR.VUE U beforeCreate() lifecycle
          //poziva api iz "_API" modula i action "api_is_reg_check"
          dispatch("_API/api_is_reg_check", user_email, { root: true });
        }
      });
    },
    set_snackbar({ commit }, newValue) {
      commit("TOGGLE_SNACKBAR", {
        boolean: newValue, //ovo je false kada se klikne na dugme zatvori
        message: "",
        color: "",
      });
    },

    show_privilegije({ commit }, newValue) {
      commit("PRIVILEGIJE_PRIKAZI", newValue);
    },

    snimanje_nove_licitacije({ commit }, payload) {
      //putanja u firebase
      var firestore_baza = firebase
        .firestore()
        .collection("licitacije_u_toku")
        .doc();

      //snimanje objecta u firestore pocetak
      firestore_baza
        .set(payload.celaLicitacija)
        .then(() => {
          commit("TOGGLE_SNACKBAR", {
            boolean: true,
            message: "Uspešno ste uneli novu licitaciju",
            color: "success",
          });
          this.state.LoadingButton = false; //prepraviti da ima mutation
          // dispatch("clearUploadingImagesObj"); //brisanje predhodnih uploadovanih slika predmeta (ukoliko postoje)
        })
        .catch((error) => {
          console.log(error);
        });

      //snimanje podatak u firestore kraj
    },

    //NOVA LICITACIJA )
    async nova_licitacija({ commit, dispatch, getters }, payload) {
      var reg_korisnik = getters.get_reg_korisnik; //podaci o registrovanom korisniku koji je logovan
      var korisnik_ime = reg_korisnik.podaci.ime; //ime korisnika
      var korisnik_prezime = reg_korisnik.podaci.prezime; //prezime korisnika
      var korisnik_email = reg_korisnik.podaci.email; //email korisnika

      //random broj koji dobijamo sabiranjem 5 random broja bla bla. Ovde ne postoji pravilo
      //jedostavno sam sam ubacio neke brojeve i sabrao i mnozio sa 3 random broja. Sto vise random broja to veca verovatnoca da nece broj da se pogodi
      var random_id =
        Math.floor(Math.random() * 1000000) * 2 -
        5 + //ovo sa *1000000 i *2 -5 bla bla to je primer sta sve moze, linije ispod su kako bi trebalo da se pise
        Math.floor(Math.random() + Math.random()) +
        Math.floor(Math.random() + Math.random()) +
        Math.floor(Math.random() + Math.random()) +
        Math.floor(Math.random() + Math.random());

      //uslov ako je korisnik registrovan na Marsu serveru onda moze da postavlja licitacije
      //stavio sam samo neke od uslova koje sam smatrao da treba proveriti da li podaci
      //postoje u bazi tj. da li je korisnik registrovan
      if (
        reg_korisnik.podaci.ime != null &&
        reg_korisnik.podaci.datum_reg != null &&
        reg_korisnik.podaci.dozvola != null
      ) {
        this.state.LoadingButton = true; //dugme da ne moze da se koristi i da se okrece kruzic (loading)

        let newIterPredmet = getters.get_licitacije_slike_predmet; //fajlovi - slike za predmet
        let newIterPrimalacDonacije =
          getters.get_licitacije_slike_primalac_donacije; //fajlovi - slike osobe za koju se vrsi donacija
        let slike_predmet_url = []; //slike koje cemo dobiti koriscenjem iteracije
        let slike_primalac_donacije_url = []; //slike koje cemo dobiti koriscenjem iteracije
        let brojPredmeta = 0; //za naziv slike da bude predmet-1, predmet-2,predmet-3 itd
        let brojPrimalacDonacije = 0; //za naziv slike da bude slika-1, slika-2,slika-3 itd

        //obavestenje
        commit("TOGGLE_SNACKBAR", {
          boolean: true,
          message: "Snimanje je u toku, budite strpljivi",
          color: "orange",
        });

        var celaLicitacija = {
          random_id: random_id,
          vrsta_licitacije: payload.vrsta_licitacije,
          nudim: payload.nudim,
          nudim_lowerCase: payload.nudim.toLowerCase(), //mora zbog .sortBy u Firestore zato sto je case sensitive (npr. "Igor" ce da stavi ispred "ana" iako je "a" ispred "I". Medjutim casesensitive stavlja veliko slovo ispred malih slova)
          grupa: payload.grupa,
          pocetna_cena_u_RSD: payload.pocetna_cena_u_RSD,
          trajanje_licitacije: payload.trajanje_licitacije,
          opis_licitacije: payload.opis_licitacije,
          pocetak_datum: payload.pocetak_datum,
          kraj_datum: payload.kraj_datum,
          korisnik_ime: korisnik_ime, //direktno je izvuceno na pocetku zato sto je sa MARS-a podataka a ne sa fronta, zato ne treba payload.
          korisnik_prezime: korisnik_prezime,
          korisnik_email: korisnik_email, //direktno je izvuceno na pocetku zato sto je sa MARS-a podataka a ne sa fronta, zato ne treba payload. //direktno je izvuceno na pocetku zato sto je sa MARS-a podataka a ne sa fronta, zato ne treba payload.
          zavrsena_licitacija: false, //ovo postavljamo na pocetku da znamo da je licitacija u toku
          slike_predmet: slike_predmet_url,
        };
        //ako je Humanitarna donacija samo Object-u "celaLicitacija" dodaj ime osobe (kljuc i value) za koju se vrsi donacija kao i slike za koga se vrsi donacija
        if (payload.vrsta_licitacije === "Humanitarna") {
          celaLicitacija.imeOsobeZaDonaciju = payload.imeOsobeZaDonaciju;
          celaLicitacija.slike_primalac_donacije = slike_primalac_donacije_url;
        }

        //slike primalacDonacije POCETAK
        if (payload.vrsta_licitacije === "Humanitarna") {
          //obradjuju se slike (snimaju u Storage Firebase) i vraca njihov URL kako bi se smestio u Firestore
          for (const primalacDonacije of newIterPrimalacDonacije) {
            brojPrimalacDonacije += 1;

            //snimanje u Firebase Storage
            const fileNamePrimalacDonacije = firebase
              .storage()
              .ref(
                "licitacije/" +
                  payload.vrsta_licitacije.toLowerCase() +
                  "/" +
                  korisnik_email +
                  "/" +
                  random_id +
                  "/primalacDonacije" +
                  "-" +
                  brojPrimalacDonacije
              )
              .put(primalacDonacije);

            //% koliko je snimljen fajl u firebase za svaki pojedinacno
            // "()=>" znaci kada zavrsi upload slike sta posle da radi (kao .then). Tu kada dobijemo nazad URL
            //slike iz Firrebase Storage, smestamo je u array "slike_primalac_donacije_url"
            fileNamePrimalacDonacije.on(
              `state_change`, //tokom rada procenat uploada
              (snapshot) => {
                let keyName = snapshot.ref.fullPath; //key u objektu ce biti putanja do slike
                this.uploadValue = Math.floor(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                ); //procenat upload-a
                //commit koliko trenutno % je slika upload u Firebase Storage. Posle se ovaj podatak tj. % uploada slike preko computed i watch u "insertImages.vue" ocitava LIVE
                commit("UPLOAD_IMG_PERCENT_PRIMALAC_DONACIJE", {
                  keyName: keyName,
                  uploadValue: this.uploadValue,
                });
              },
              //ako ima greska
              (error) => {
                console.log(error.message);
              },
              //kada je complete upload tj. kada je sve zavrseno vezano za taj dokument u petlji
              () => {
                // this.uploadValue = 100;
                fileNamePrimalacDonacije.snapshot.ref
                  .getDownloadURL()
                  .then((url) => {
                    slike_primalac_donacije_url.push(url); //snimanje URL slike u array (za svaki "const primalacDonacije" pojedinacno)

                    if (
                      slike_primalac_donacije_url.length ==
                        newIterPrimalacDonacije.length &&
                      slike_predmet_url.length == newIterPredmet.length //kada je broj slika Primaoca donacije jedna broju slika(newIterPrimalacDonacije) koje je korisnik postavi, kao i kada je broj slika u arrayu koje smo snimili u firebase (slike_predmet_url) jednak broju slika (newIterPredmet) koji je korisnik postavio
                    ) {
                      dispatch("snimanje_nove_licitacije", {
                        celaLicitacija: celaLicitacija,
                      });
                    }
                  });
              }
            );
          }
          brojPrimalacDonacije = 0;
        }
        //slike primalacDonacije KRAJ

        //slike predmeta
        //i ako je licna ili humanitarna licitacija odraditi snimanje slika za predmet
        if (
          payload.vrsta_licitacije === "Lična" ||
          payload.vrsta_licitacije === "Humanitarna"
        ) {
          //obradjuju se slike (snimaju u Storage Firebase) i vraca njihov URL kako bi se smestio u Firestore
          for (const predmet of newIterPredmet) {
            brojPredmeta += 1;

            //snimanje u Firebase Storage
            const fileNamePredmet = firebase
              .storage()
              .ref(
                "licitacije/" +
                  payload.vrsta_licitacije.toLowerCase() +
                  "/" +
                  korisnik_email +
                  "/" +
                  random_id +
                  "/predmet" +
                  "-" +
                  brojPredmeta
              )
              .put(predmet);

            //% koliko je snimljen fajl u firebase za svaki pojedinacno
            // "()=>" znaci kada zavrsi upload slike sta posle da radi (kao .then). Tu kada dobijemo nazad URL
            //slike iz Firrebase Storage, smestamo je u array "slike_predmet_url"
            fileNamePredmet.on(
              `state_change`, //tokom rada procenat uploada
              (snapshot) => {
                let keyName = snapshot.ref.fullPath; //key u objektu ce biti putanja do slike
                this.uploadValue = Math.floor(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                ); //procenat upload-a
                //commit koliko trenutno % je slika upload u Firebase Storage. Posle se ovaj podatak tj. % uploada slike preko computed i watch u "insertImages.vue" ocitava LIVE
                commit("UPLOAD_IMG_PERCENT_PREDMET", {
                  keyName: keyName,
                  uploadValue: this.uploadValue,
                });
              },
              //ako ima greska
              (error) => {
                console.log(error.message);
              },
              //kada je complete upload tj. kada je sve zavrseno vezano za taj dokument u petlji
              () => {
                // this.uploadValue = 100;
                fileNamePredmet.snapshot.ref.getDownloadURL().then((url) => {
                  slike_predmet_url.push(url); //snimanje URL slike u array (za svaki "const predmet" pojedinacno)
                  if (payload.vrsta_licitacije === "Lična") {
                    if (slike_predmet_url.length == newIterPredmet.length) {
                      //kada je broj slika u arrayu koje smo snimili u firebase (slike_predmet_url) jednak broju slika (newIterPredmet) koji je korisnik postavio
                      dispatch("snimanje_nove_licitacije", {
                        celaLicitacija: celaLicitacija,
                      });
                    }
                  }
                  if (payload.vrsta_licitacije === "Humanitarna") {
                    if (
                      slike_primalac_donacije_url.length ==
                        newIterPrimalacDonacije.length &&
                      slike_predmet_url.length == newIterPredmet.length
                    ) {
                      dispatch("snimanje_nove_licitacije", {
                        celaLicitacija: celaLicitacija,
                      });
                    }
                  }
                });
              }
            );
          }
          brojPredmeta = 0;
        }
      }
      //ako nije registrovan ne moze da postavlja licitacije
      else {
        commit("TOGGLE_SNACKBAR", {
          boolean: true,
          message: "Morate se prvo registrovati",
          color: "error",
        });
      }
    },

    //LICITACIJE U TOKU PRIKAZ (licitiram_li)
    // async licitacije_podaci({ commit }) {
    //   this.state.sve_licitacije = [];

    //   var firestore_baza = firebase.firestore().collection("licitacije_u_toku");

    //   var datum = new Date(); //trenutni datum i trenutno vreme

    //   //postavljanje "zavrsena_licitacija" na true tj. ako je datum i vreme vreci od trenutka kada smo otvorili stranicu (znaci da je licitacija gotova)
    //   await firestore_baza
    //     .where("kraj_datum", "<=", datum)
    //     .where("zavrsena_licitacija", "==", false)
    //     .get()
    //     .then((result) => {
    //       result.forEach((singleResult) => {
    //         var firestore_doc = firebase
    //           .firestore()
    //           .collection("licitacije_u_toku")
    //           .doc(singleResult.id);

    //         firestore_doc.set(
    //           {
    //             zavrsena_licitacija: true,
    //           },
    //           //da ne promeni ceo document vec samo da doda "zavrsena_licitacija"
    //           { merge: true }
    //         );
    //       });
    //     });

    //   //podaci za prikaz na licitacije_li
    //   await firestore_baza
    //     //prikaz samo onih ciji "kraj_datum" je veci ili jednak trenutnom (prilikom pokretanja tj. refresh stranice)
    //     .where("zavrsena_licitacija", "==", false)
    //     .orderBy("kraj_datum", "asc")
    //     .limit(10)
    //     .get()
    //     .then((result) => {
    //       result.forEach((singleResult) => {
    //         commit("ADD_LICITACIJE", {
    //           doc_id: singleResult.id, //samo za local prikaz array-a
    //           random_id: singleResult.data().random_id,
    //           vrsta_licitacije: singleResult.data().vrsta_licitacije,
    //           nudim: singleResult.data().nudim,
    //           grupa: singleResult.data().grupa,
    //           pocetna_cena_u_RSD: singleResult.data().pocetna_cena_u_RSD,
    //           trajanje_licitacije: singleResult.data().trajanje_licitacije,
    //           opis_licitacije: singleResult.data().opis_licitacije,
    //           pocetak_datum: singleResult.data().pocetak_datum,
    //           kraj_datum: singleResult.data().kraj_datum,
    //           korisnik_ime: singleResult.data().korisnik_ime,
    //           korisnik_prezime: singleResult.data().korisnik_prezime,
    //           zavrsena_licitacija: false,
    //         });
    //       });
    //     });
    // },

    //PRIKAZ LICITACIJA
    async sortingChange({ commit }, payload) {
      let firestore_baza = await firebase
        .firestore()
        .collection("licitacije_u_toku");

      var datum = new Date();
      //pre svakog prikaza licitacija na licitacije_li
      //POSTAVLJANJE "zavrsena_licitacija" na true tj. ako je datum i vreme vreci od trenutka kada smo otvorili stranicu (znaci da je licitacija gotova)
      console.log("await firestore_baza");
      await firestore_baza
        .where("kraj_datum", "<=", datum)
        .where("zavrsena_licitacija", "==", false)
        .get()
        .then((result) => {
          result.forEach((singleResult) => {
            var firestore_doc = firebase
              .firestore()
              .collection("licitacije_u_toku")
              .doc(singleResult.id);

            firestore_doc.set(
              {
                zavrsena_licitacija: true,
              },
              //da ne promeni ceo document vec samo da doda "zavrsena_licitacija"
              { merge: true }
            );
          });
        });

      //SORTIRANJE POCETAK

      //kada se prvi put ocita stranica licitacije_li onda ocitava iz baze podatke sa filterom
      // "zavrsena_licitacije = false" to je u Vuex-u "licitacije_podaci". Kada odaberemo nesto iz v-select onda ocitava sa kriterijumima.
      //Jedini glavni kriterijum ovde je da ocitava .limit

      let zavrseno = payload.zavrseno; //true(zavrsene licitacije) ili false(u toku licitacije)
      //ako je switch false znaci da je kliknuto na "moje licitacije" i tada trazimo licitacije onoga ko je logovan preko FaceBook-a
      //u suprotnom ovaj block koda se nece desiti tj. to znaci da je switch=true tj. da je na "Licitacije u toku" i sortiranje ce se vrsiti za sve korisnike koji imaju u toku neku licitaciju
      if (payload.switch == false) {
        firestore_baza = await firestore_baza.where(
          "korisnik_email",
          "==",
          `${this.state.Facebook_user_data.user_email}`
        );
      } else {
        firestore_baza = await firestore_baza.where(
          "zavrsena_licitacija",
          "==",
          zavrseno
        ); //u zavisnosti da li smo na licitacije_li - licitacije u toku ili u zavrsene_li dobijamo zavrseno = false ili true
      }
      //VRSTA LICITACIJE
      //ako NIJE vrsta licitacije ="SVE" onda pretrazi po onome sto je prosledjeno kao payload
      //u suprotnom ako odaberemo "SVE" onda nece imati ogranicenja i prikazace sve podatke
      if (this.state.selected_vrsta != "SVE") {
        firestore_baza = await firestore_baza.where(
          "vrsta_licitacije",
          "==",
          `${this.state.selected_vrsta}`
        );
      }
      //GRUPA LICITACIJE
      //ako NIJE lista stvari ="SVE" onda pretrazi po onome sto je prosledjeno kao payload
      //u suprotnom ako odaberemo "SVE" onda nece imati ogranicenja i prikazace sve podatke
      if (this.state.selected_grupa != "SVE") {
        firestore_baza = await firestore_baza.where(
          "grupa",
          "==",
          `${this.state.selected_grupa}`
        );
      }
      //SORTIRANJE 3ci V-SELECT
      //Preostalo vreme - manje
      if (this.state.selected_sortiranje_od_do == "Preostalo vreme - manje") {
        firestore_baza = await firestore_baza.orderBy("kraj_datum", "asc");
        // .startAfter(this.state.latestDoc || 0); //ako ima neki podatak u latestDoc
      }
      //Preostalo vreme - više
      if (this.state.selected_sortiranje_od_do == "Preostalo vreme - više") {
        firestore_baza = await firestore_baza.orderBy("kraj_datum", "desc");
        // .endBefore(this.state.latestDoc || 0); //ako ima neki podatak u latestDoc
      }
      //Naziv A-Z
      if (this.state.selected_sortiranje_od_do == "Naziv A-Z") {
        firestore_baza = await firestore_baza.orderBy("nudim_lowerCase", "asc"); //pa sam tek onda radio pretrazivanje koje meni treba
      }
      //Naziv Z-A
      if (this.state.selected_sortiranje_od_do == "Naziv Z-A") {
        firestore_baza = await firestore_baza.orderBy(
          "nudim_lowerCase",
          "desc"
        ); //pa sam tek onda radio pretrazivanje koje meni treba
      }
      //Cena rastuce
      if (this.state.selected_sortiranje_od_do == "Cena rastuće") {
        firestore_baza = firestore_baza
          // .where("kraj_datum", ">=", datum)
          // .orderBy("kraj_datum") //ovo moram da stavim zato sto Firestore trazi da *first orderBy* bude po .where koji je iznad
          .orderBy("pocetna_cena_u_RSD", "asc"); //pa sam tek onda radio pretrazivanje koje meni treba
      }
      //Cena opadajuce
      if (this.state.selected_sortiranje_od_do == "Cena opadajuće") {
        firestore_baza = firestore_baza
          // .where("kraj_datum", ">=", datum)
          // .orderBy("kraj_datum") //ovo moram da stavim zato sto Firestore trazi da *first orderBy* bude po .where koji je iznad
          .orderBy("pocetna_cena_u_RSD", "desc"); //pa sam tek onda radio pretrazivanje koje meni treba
      }
      //SORTIRANJE KRAJ

      //PRIKAZ SORTIRANJA KOJE SMO GORE ODABRALI  *POCETAK
      //pozivanje komande za slanje ka Firebase uz limit od najvise 10 rezultata

      // let latestDoc; //pocetno stanje odakle pocinje da prikazuje dokumente iz Firestora
      console.log("na pocetku", this.state.latestDoc);

      let tempListaLicitacija = []; //array
      if (
        this.state.sve_licitacije &&
        this.state.sve_licitacije === "nema_podataka"
      ) {
        tempListaLicitacija = this.state.sve_licitacije;
        console.log("tempListaLicitacije", tempListaLicitacija);
      } else {
        tempListaLicitacija = [];
      }

      await firestore_baza
        .limit(15)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            tempListaLicitacija = []; //isprazni array ako nesto postoji u njemu
            tempListaLicitacija.push("nema_podataka");
          } else {
            //ako ima podataka pravi se niz svih korisnika tj. njihovih licitacija
            querySnapshot.forEach((doc) => {
              const data = {
                doc_id: doc.id,
                ...doc.data(),
              };
              tempListaLicitacija.push(data);
              this.state.latestDoc = doc.id;
              console.log("latestDoc", this.state.latestDoc);
            });

            // latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; //za infinity scroll https://www.youtube.com/watch?v=vYBc7Le5G6s
            // latestDoc = querySnapshot.docs.length - 1; //za infinity scroll https://www.youtube.com/watch?v=vYBc7Le5G6s
            // latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            console.log("na kraju", querySnapshot.docs.length);
            console.log("---------------------------------");
          }
          commit("SVE_LICITACIJE", tempListaLicitacija);
        })
        .catch((a) => console.log(a));
      //PRIKAZ SORTIRANJA KOJE SMO GORE ODABRALI *KRAJ
    },

    //ZAVRSENE LICITACIJE
    // async zavrsene_licitacije_prikaz({ commit }) {
    //   let firestore_baza = firebase.firestore().collection("licitacije_u_toku");
    //   var datum = new Date();

    //   //postavljanje "zavrsena_licitacija" na true tj. ako je datum i vreme vreci od trenutka kada smo otvorili stranicu (znaci da je licitacija gotova)
    //   await firestore_baza
    //     .where("kraj_datum", "<=", datum)
    //     .where("zavrsena_licitacija", "==", false)
    //     .get()
    //     .then((result) => {
    //       result.forEach((singleResult) => {
    //         var firestore_doc = firebase
    //           .firestore()
    //           .collection("licitacije_u_toku")
    //           .doc(singleResult.id);

    //         firestore_doc.set(
    //           {
    //             zavrsena_licitacija: true,
    //           },
    //           //da ne promeni ceo document vec samo da doda "zavrsena_licitacija"
    //           { merge: true }
    //         );
    //       });
    //     });

    //   //prikaz zavrsenih licitacija
    //   await firestore_baza
    //     //prikaz samo onih ciji "kraj_datum" je manji ili jednak trenutnom (prilikom pokretanja tj. refresh stranice)
    //     .where("zavrsena_licitacija", "==", true)
    //     .orderBy("nudim_lowerCase", "asc")
    //     .limit(10)
    //     .get()
    //     .then((querySnapshot) => {
    //       let tempListaLicitacija = [];
    //       if (querySnapshot.empty) {
    //         tempListaLicitacija.push("nema_podataka");
    //       } else {
    //         //ako ima podataka pravi se niz svih korisnika tj. njihovih licitacija
    //         querySnapshot.forEach((doc) => {
    //           const data = {
    //             doc_id: doc.id,
    //             ...doc.data(),
    //           };
    //           tempListaLicitacija.push(data);
    //         });
    //       }
    //       commit("SVE_LICITACIJE", tempListaLicitacija);
    //     });
    // },

    //MOJE LICITACIJE
    // async moje_licitacije({ commit, getters }) {
    //   let firestore_baza = await firebase
    //     .firestore()
    //     .collection("licitacije_u_toku");

    //   //object reg_korisnik u sebi sadrzi object 'podaci' a u njemu podatke korisnika
    //   var reg_korisnik = getters.get_reg_korisnik;
    //   //ime korisnika
    //   // var korisnik_ime = reg_korisnik.podaci.ime;
    //   // //prezime korisnika
    //   // var korisnik_prezime = reg_korisnik.podaci.prezime;
    //   //email korisnika
    //   var korisnik_email = reg_korisnik.podaci.email;

    //   await firestore_baza
    //     //prikaz samo onih ciji "kraj_datum" je manji ili jednak trenutnom (prilikom pokretanja tj. refresh stranice)
    //     // .where("korisnik_ime", "==", korisnik_ime)
    //     // .where("korisnik_prezime", "==", korisnik_prezime)
    //     .where("korisnik_email", "==", korisnik_email)
    //     .orderBy("kraj_datum", "asc")
    //     .limit(10)
    //     .get()
    //     .then((querySnapshot) => {
    //       let tempListaLicitacija = [];

    //       if (querySnapshot.empty) {
    //         tempListaLicitacija.push("nema_podataka");
    //       } else {
    //         //ako ima podataka pravi se niz svih korisnika tj. njihovih licitacija
    //         querySnapshot.forEach((doc) => {
    //           const data = {
    //             doc_id: doc.id,
    //             ...doc.data(),
    //           };
    //           tempListaLicitacija.push(data);
    //         });
    //       }
    //       commit("SVE_LICITACIJE", tempListaLicitacija);
    //     });
    //   // }
    // },
    //postavljanje vrednost v-select za vrstu
    setSelected_vrsta: ({ commit }, newValue) => {
      commit("SET_SELECTED_VRSTA", newValue);
    },
    //postavljanje vrednost v-select za grupu
    setSelected_grupa: ({ commit }, newValue) => {
      commit("SET_SELECTED_GRUPA", newValue);
    },
    //postavljanje vrednost v-select za sortiranje od do
    setSelected_sortiranje_od_do: ({ commit }, newValue) => {
      commit("SET_SELECTED_SORTIRANJE_OD_DO", newValue);
    },

    //PREBACIVANJE ZAVRSENIH LICITACIJA U FIREBASE U DRUGU GRUPU "ZAVRSENE LICITACIJE" KADA ISTEKNE VREME
    //dosta batch vuec reads...zato sto koliko sam skontao ako recimo 10 korisnika
    //ima upaljen prozor licitacije_li i u tom trenutku se 2 licitacije zavrsavaju
    //on ce 20 puta da uradi reads ali ce samo jednom da odradi kompletno(cemu i sluzi batch, tj.
    //ili ce sve da odradi sa commit ili nece nista ali je mana mnogo citanja u bazi)
    // zavrsene_licitacije_move(context, payload) {
    //   let firestore_baza = firebase
    //     .firestore()
    //     .collection("licitacije_u_toku")
    //     .doc(payload.doc_id);

    //   firestore_baza.set(
    //     {
    //       zavrsena_licitacija: true,
    //     },
    //     { merge: true }
    //   );
    //   console.log(payload.doc_id);
    // let firestore_baza_zavrsene = firebase
    //   .firestore()
    //   .collection("licitacije_zavrsene")
    //   .doc();

    // var batch = firebase.firestore().batch();

    // firestore_baza
    //   .where("random_id", "==", payload.random_id)
    //   .get()
    //   .then((querySnapshot) => {
    //     console.log(querySnapshot);
    //     querySnapshot.forEach((doc) => {
    //       //delete iz kolekcije "licitacije_u_toku"
    //       batch.delete(doc.ref);
    //     });
    //     batch.set(firestore_baza_zavrsene, {
    //       //write u kolekciju "licitacije_zavrsene"
    //       random_id: payload.random_id,
    //       vrsta_licitacije: payload.vrsta_licitacije,
    //       nudim: payload.nudim,
    //       grupa: payload.grupa,
    //       pocetna_cena_u_RSD: payload.pocetna_cena_u_RSD,
    //       trajanje_licitacije: payload.trajanje_licitacije,
    //       opis_licitacije: payload.opis_licitacije,
    //       pocetak_datum: payload.pocetak_datum,
    //       kraj_datum: payload.kraj_datum,
    //       korisnik_ime: payload.korisnik_ime,
    //       korisnik_prezime: payload.korisnik_prezime,
    //     });
    //     batch.commit().then(() => {
    //       console.log("uspesno");
    //     });
    // .catch((error) => {
    //   console.log("zavrsene_licitacije_move " + error);
    // });
    // });

    //sve sto smo gore pisali batch.set ili batch.delete ce se odraditi
    //tek kada pozovemo komandu batch.commit

    //kako resiti problem pretrage delova reci u firebase
    //pretraga je iskljucivo od pocetka reci, nikako od sredine reci (ne mora cela rec)
    //Warning: all search criteria in firestore is CASE SENSITIVE
    // var strSearch = "lal";
    // var strlength = strSearch.length;
    // var strFrontCode = strSearch.slice(0, strlength - 1);
    // var strEndCode = strSearch.slice(strlength - 1, strSearch.length);
    // var startcode = strSearch;
    // var endcode =
    //   strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
    // //kraj
    // const firestore = firebase.firestore();
    // firestore.settings({ timestampsInSnapshots: true });
    // var col = firestore.collection("licitacije_u_toku");
    // var query = col
    //   .where("nudim", ">=", startcode)
    //   .where("nudim", "<", endcode);
    // query.get().then((snapshot) => {
    //   snapshot.docs.forEach(() => {
    // console.log(doc.id, doc.data());
    // });
    // });
    // return firebase
    //   .firestore()
    //   .collection("licitacije_u_toku")
    //   .where("licitacije", "array-contains", {
    //     grupa: "Kompijuteri i oprema",
    //     korisnik_ime: 'Igor',
    //     korisnik_prezime: 'Vasic',
    //     kraj
    //     nudim: "bbbbb",
    //   })
    //   .get()
    //   .then((snapshot) => {
    //     if (snapshot.empty) {
    //       console.log("No matching documents.");
    //     } else {
    //       console.log("snapshot");
    //     }
    //   });
    // },
    // async pregled_zavrsenih_licitacija({ commit }) {
    //   let firestore_baza = firebase
    //     .firestore()
    //     .collection("licitacije_zavrsene");
    //   await firestore_baza.get().then((querySnapshot) => {
    //     let tempLista_zavrs_Licitacija = [];
    //     //provera da li ima podataka uopste, ako nema poslati da nema podataka
    //     //kako bi se Licitiram_li.vue ocitalo i izbacio DIV koji ispisuje da nema podataka
    //     if (querySnapshot.empty) {
    //       tempLista_zavrs_Licitacija.push("nema_podataka");
    //     } else {
    //       //ako ima podataka pravi se niz svih korisnika tj. njihovih licitacija
    //       querySnapshot.forEach((doc) => {
    //         const data = {
    //           doc_id: doc.id,
    //           ...doc.data(),
    //         };
    //         tempLista_zavrs_Licitacija.push(data);
    //       });
    //     }
    //     commit("ZAVRSENE_LICITACIJE", tempLista_zavrs_Licitacija);
    //   });
    // },
    licitacije_slike({ commit }, payload) {
      if (payload.slikeZa === "predmet") {
        commit("LICITACIJE_SLIKE_PREDMET", payload);
      }
      if (payload.slikeZa === "primalacDonacije") {
        commit("LICITACIJE_SLIKE_PRIMALAC_DONACIJE", payload);
      }
    },
    clearUploadingImagesObj({ commit }) {
      commit("CLEAR_UPLOADING_IMAGES_OBJECT");
    },
  },
  ///////////////////////////// MODULI /////////////////////////////
  modules: {
    /////////// _API MODUL //////////////// pozivanje API-ja sa https://admin.mars-server.net/editor
    _API: {
      namespaced: true,
      state: () => ({
        obavestenja: "",
      }),
      getters: {
        get_obavestenja(state) {
          return state.obavestenja;
        },
      },
      mutations: {
        GLAVNA_OBAVESTENJA(state, payload) {
          state.obavestenja = payload;
        },
      },
      actions: {
        //PROVERA NA MARSU DA LI JE REGISTROVAN (uporedjivane mail-a koji se dobija sa fronta)
        // I AKO JESTE VRACAJU SE PODACI IZ BAZE
        api_is_reg_check({ commit }, user_email) {
          $api
            .provera_privilegija({ user_email: user_email })
            .then((response) => {
              //pravljenje local storage za sid (response podatak sa marsa)
              window.localStorage.setItem("sid", response.data.sid);
              if (response.data.reg_korisnik != undefined) {
                //ako postoji tj. ako nije undefined
                commit(
                  "PODACI_REG_KORISNIKA",
                  {
                    podaci: response.data.reg_korisnik,
                  },
                  { root: true }
                );
              }
            })
            .catch(function(error) {
              alert(error);
            });
        },

        //BRISANJE SESSION() NA MARSU
        api_post_logout() {
          $api
            .logout_post({
              sid: window.localStorage.getItem("sid"),
            })
            .then(() => {
              window.localStorage.removeItem("sid");
            });
        },

        //PRIKAZ - GLAVNA OBAVESTENJA IZ BAZE - MARS (ne treba logovanje) posto svako moze da procita obavestenja
        api_get_obavestenja({ commit }, route) {
          //na backu na osnovu route se odredjuje koja ce informacija biti prosledjena
          $api.get_obavestenja({ route: route }).then((response) => {
            let lista_obavestenja = response.data.result;
            commit("GLAVNA_OBAVESTENJA", lista_obavestenja);
          });
        },

        //DODAVANJE NOVOG OBAVESTENJA - isto koristi i route /obavestenja i /obavestenja_so
        //pa se na serveru razvrstava gde brise, zato se i salje putanja
        api_post_novo_edit_obavestenje(
          { dispatch, rootGetters, commit },
          payload
        ) {
          let korisnik = rootGetters.get_reg_korisnik; //getter, pa tek kada getter dobije objekat mozemo da izvlacimo email
          let data = {
            id_obavestenja: payload.id_obavestenja,
            route: payload.route, //putanja sa koje je pokrenuta komanda
            email: korisnik.podaci.email, //email osobe koja je objavila
            naslov_obavestenja: payload.naslov_obavestenja,
            text_obavestenja: payload.text_obavestenja,
          };
          //ako je mode add_obavestenje
          if (payload.mode === "add_obavestenje") {
            $api
              .novo_obavestenje_post({ data: data })
              .then((response) => {
                dispatch("api_get_obavestenja", payload.route); //refresh bazu da bi se prikazalo obavestenje koje smo uneli
                commit(
                  "TOGGLE_SNACKBAR",
                  {
                    boolean: true,
                    message: response.data.message.text,
                    color: response.data.message.color,
                  },
                  { root: true }
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
          //ako je mode edit_obavestenje
          else if (payload.mode === "edit_obavestenje") {
            $api.edit_obavestenje_post({ data: data }).then((response) => {
              dispatch("api_get_obavestenja", payload.route); //refresh bazu da bi se prikazalo obavestenje koje smo uneli
              commit(
                "TOGGLE_SNACKBAR",
                {
                  boolean: true,
                  message: response.data.message.text,
                  color: response.data.message.color,
                },
                { root: true }
              );
            });
          }
        },

        api_post_delete_obavestenja(
          { commit, dispatch, rootGetters },
          payload
        ) {
          let korisnik = rootGetters.get_reg_korisnik; //getter, pa tek kada getter dobije objekat mozemo da izvlacimo email
          let data = {
            email: korisnik.podaci.email, //email osobe koja brise
            route: payload.route,
            id_obavestenja: payload.id_obavestenja,
          };
          $api
            .post_delete_obavestenja({ data: data })
            .then((response) => {
              dispatch("api_get_obavestenja", payload.route); //refresh bazu da bi se prikazalo obavestenje koje smo uneli
              commit(
                "TOGGLE_SNACKBAR",
                {
                  boolean: true,
                  message: response.data.message.text,
                  color: response.data.message.color,
                },
                { root: true }
              );
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
    },
    ///////// _DIALOG MODUL ////////////
    _DIALOG: {
      namespaced: true,
      state: () => ({
        show_dialog_logout: false,
        show_dialog_loading: false,
        show_dialog_for_login: false,
        show_dialog_add_obavestenja: false,
        show_dialog_edit_obavestenja: false,
        show_dialog_delete_obavestenja: false,
      }),
      getters: {
        get_showDialog_logout: (state) => {
          return state.show_dialog_logout;
        },
        get_dialog_loading_status: (state) => {
          return state.show_dialog_loading;
        },
        get_dialog_for_login: (state) => {
          return state.show_dialog_for_login;
        },
        get_dialog_add_obavestenja: (state) => {
          return state.show_dialog_add_obavestenja;
        },
        get_dialog_edit_obavestenja: (state) => {
          return state.show_dialog_edit_obavestenja;
        },
        get_dialog_delete_obavestenja: (state) => {
          return state.show_dialog_delete_obavestenja;
        },
      },
      mutations: {
        SHOW_DIALOG_LOGOUT(state, payload) {
          state.show_dialog_logout = payload;
        },
        SHOW_DIALOG_LOADING(state, payload) {
          state.show_dialog_loading = payload;
        },
        SHOW_DIALOG_FOR_LOGIN(state, payload) {
          state.show_dialog_for_login = payload;
        },
        SHOW_DIALOG_ADD_OBAVESTENJA(state, payload) {
          state.show_dialog_add_obavestenja = payload;
        },
        SHOW_DIALOG_EDIT_OBAVESTENJA(state, payload) {
          state.show_dialog_edit_obavestenja = payload;
        },
        SHOW_DIALOG_DELETE_OBAVESTENJA(state, payload) {
          state.show_dialog_delete_obavestenja = payload;
        },
      },
      actions: {
        set_showDialog_logout({ commit }, newValue) {
          commit("SHOW_DIALOG_LOGOUT", newValue);
        },
        set_show_dialog_loading({ commit }, newValue) {
          commit("SHOW_DIALOG_LOADING", newValue);
        },
        set_dialog_for_login({ commit }, newValue) {
          commit("SHOW_DIALOG_FOR_LOGIN", newValue);
        },
        set_dialog_add_obavestenja({ commit }, newValue) {
          commit("SHOW_DIALOG_ADD_OBAVESTENJA", newValue);
        },
        set_dialog_edit_obavestenja({ commit }, newValue) {
          commit("SHOW_DIALOG_EDIT_OBAVESTENJA", newValue);
        },
        set_dialog_delete_obavestenja({ commit }, newValue) {
          commit("SHOW_DIALOG_DELETE_OBAVESTENJA", newValue);
        },
      },
    },
  },
});

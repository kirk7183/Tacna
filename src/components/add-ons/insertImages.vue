<template>
  <div
    class="insertImages"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <!-- <div class="drop" v-show="dropped == 2"></div> -->

    <!-- Error Message -->
    <div v-show="error" class="error_insertImages">
      {{ error }}
    </div>
    <!-- To inform user how to upload image -->
    <div v-show="Imgs.length == 0 && loading == false" class="beforeUpload">
      <p class="ispis_input">{{ imgIspis }}</p>
      <input
        type="file"
        style="z-index: 1"
        accept="image/*"
        ref="uploadInput"
        @change="previewImgs"
        multiple
      />
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>Upload Image</title>
        <g id="Upload_Image" data-name="Upload Image">
          <g id="_Group_" data-name="&lt;Group&gt;">
            <g id="_Group_2" data-name="&lt;Group&gt;">
              <g id="_Group_3" data-name="&lt;Group&gt;">
                <circle
                  id="_Path_"
                  data-name="&lt;Path&gt;"
                  cx="18.5"
                  cy="16.5"
                  r="5"
                  style="
                    fill: none;
                    stroke: #303c42;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  "
                />
              </g>
              <polyline
                id="_Path_2"
                data-name="&lt;Path&gt;"
                points="16.5 15.5 18.5 13.5 20.5 15.5"
                style="
                  fill: none;
                  stroke: #303c42;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              />
              <line
                id="_Path_3"
                data-name="&lt;Path&gt;"
                x1="18.5"
                y1="13.5"
                x2="18.5"
                y2="19.5"
                style="
                  fill: none;
                  stroke: #303c42;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              />
            </g>
            <g id="_Group_4" data-name="&lt;Group&gt;">
              <polyline
                id="_Path_4"
                data-name="&lt;Path&gt;"
                points="0.6 15.42 6 10.02 8.98 13"
                style="
                  fill: none;
                  stroke: #303c42;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              />
              <polyline
                id="_Path_5"
                data-name="&lt;Path&gt;"
                points="17.16 11.68 12.5 7.02 7.77 11.79"
                style="
                  fill: none;
                  stroke: #303c42;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              />
              <circle
                id="_Path_6"
                data-name="&lt;Path&gt;"
                cx="8"
                cy="6.02"
                r="1.5"
                style="
                  fill: none;
                  stroke: #303c42;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              />
              <path
                id="_Path_7"
                data-name="&lt;Path&gt;"
                d="M19.5,11.6V4A1.5,1.5,0,0,0,18,2.5H2A1.5,1.5,0,0,0,.5,4V15A1.5,1.5,0,0,0,2,16.5H13.5"
                style="
                  fill: none;
                  stroke: #303c42;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              />
            </g>
          </g>
        </g>
      </svg>

      <p class="mainMessage">
        {{ uploadMsg ? uploadMsg : "Klik za upload ili prevucite slike" }}
      </p>
    </div>
    <div class="imgsPreview" v-show="Imgs.length > 0">
      <div class="imageHolder" v-for="(img, i) in perAndImg" :key="i">
        <img :src="img.slika" />

        <v-progress-circular
          class="progress"
          v-if="uploading == true"
          :size="100"
          :width="15"
          :value="img.percent"
          :rotate="-90"
        >
          {{ img.percent }}%
        </v-progress-circular>
        <!-- {{ img.percent }} -->
        <span class="delete" @click="deleteImg(i)" v-if="uploading == false">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
      </div>
    </div>

    <!--progress bar kada se odaberu slike (neprekidno vrti u krug)-->
    <v-progress-circular v-if="loading == true" indeterminate color="primary">
    </v-progress-circular>
    <!--button za dodavanje novih slika. Pojavljuje se samo kada postoji jedna ili vise slika-->
    <v-btn
      v-if="Imgs.length != 0 && Imgs.length != $props.max && loading == false"
      @click="append"
      class="image_add mx-2"
      fab
      dark
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  //big tnx to https://www.npmjs.com/package/vue-upload-drop-images for more details about props etc visit.
  name: "VueUploadImages",
  data() {
    return {
      error: "",
      files: [],
      dropped: 0,
      Imgs: [],
      loading: false,
      filesFirebase: [],
      uploadingPercentPredmet: [],
    };
  },
  props: {
    imgIspis: String, //iz NovaLicitacija_li.vue u zavisnosti da li je za Predmet ili Osobu za koju se vrsi licitacija
    clearImages: Boolean, //iz NovaLicitacija_li.vue da li da obrise slike klikom na dugme "Obrisi"
    uploading: Boolean, //iz NovaLicitacija_li.vue procenat uploada slike
    slikeZa: String, //iz NovaLicitacija_li.vue
    max: Number,
    uploadMsg: String,
    maxError: String,
    fileError: String,
  },
  computed: {
    uploadObjPredmet: {
      get() {
        return this.$store.getters.get_uploadObjPredmet;
      },
    },
    uploadObjPrimalacDonacije: {
      get() {
        return this.$store.getters.get_uploadObjPrimalacDonacije;
      },
    },
    //kada se slika odabere - da moze da se renderuje kroz v-for
    perAndImg() {
      return this.Imgs.map((slika, i) => {
        //izvlacimo value iz objecta uploadingPercentPredmet svaki put kada se procenat za upload promeni i smestamo u "perAndImg" koji ce se renderovati kroz v-for nakon svake promene procenta prilikom uploada
        var value = Object.values(this.uploadingPercentPredmet);

        return {
          slika: slika,
          percent: value[i],
        };
      });
    },
  },
  watch: {
    uploadObjPredmet(newValue) {
      //ako je componenta importovana za "Predmet"
      if (this.slikeZa === "predmet") {
        this.uploadingPercentPredmet = newValue;
      }
    },
    uploadObjPrimalacDonacije(newValue) {
      //ako je componenta importovana za "Primalac donacije"
      if (this.slikeZa === "primalacDonacije") {
        this.uploadingPercentPredmet = newValue;
      }
    },

    //ako ima slika javi parentu koliko ih ima i odradi validaciju (NovaLicitacija_li)
    Imgs(newValue) {
      if (newValue.length >= 0) {
        if (this.slikeZa === "predmet") {
          this.$emit("imaSlikePredmet", newValue.length);
        }
        console.log(this.slikeZa);
        if (this.slikeZa === "primalacDonacije") {
          this.$emit("imaSlikePrimalacDonacije", newValue.length);
        }
      }
    },
    clearImages(newValue) {
      if (newValue === true) {
        this.Imgs = [];
        this.files = [];
        this.filesFirebase = [];
        this.$refs.uploadInput.value = null;
      }
    },
  },
  methods: {
    dragOver() {
      this.dropped = 2;
    },
    dragLeave() {},
    drop(e) {
      let status = true;
      e.dataTransfer.files.forEach((file) => {
        if (file.type.startsWith("image") === false) status = false;
      });
      if (status == true) {
        if (
          this.$props.max &&
          e.dataTransfer.files.length + this.files.length > this.$props.max
        ) {
          this.error = this.$props.maxError
            ? this.$props.maxError
            : `Maksimum broj slika: ` + this.$props.max;
        } else {
          this.files.push(...e.dataTransfer.files);
          this.previewImgs();
        }
      } else {
        this.error = this.$props.fileError
          ? this.$props.fileError
          : `Nepodrzavan tip fajla`;
      }
      this.dropped = 0;
    },
    append() {
      this.$refs.uploadInput.click();
    },
    readAsDataURL(file) {
      return new Promise(function (resolve, reject) {
        let fr = new FileReader();
        fr.onload = function () {
          resolve(fr.result);
        };
        fr.onerror = function () {
          reject(fr);
        };
        fr.readAsDataURL(file);
      });
    },
    deleteImg(index) {
      this.Imgs.splice(index, 1);
      this.files.splice(index, 1);
      this.$refs.uploadInput.value = null;
      this.filesFirebase.splice(index, 1);
    },
    previewImgs(event) {
      //deo za prikaz slika POCETAK
      if (
        this.$props.max &&
        event &&
        event.currentTarget.files.length + this.files.length > this.$props.max
      ) {
        this.error = this.$props.maxError
          ? this.$props.maxError
          : `Maksimum broj slika: ` + this.$props.max;
        return;
      }
      if (this.dropped == 0) this.files.push(...event.currentTarget.files);
      this.error = "";
      //   this.$emit("change", this.files);
      let readers = [];
      if (!this.files.length) return;

      for (let i = 0; i < this.files.length; i++) {
        this.loading = true;
        readers.push(this.readAsDataURL(this.files[i]));
      }
      Promise.all(readers)
        .then((values) => {
          this.Imgs = values;
        })
        .then(() => {
          this.loading = false;
        });
      //deo za prikaz slika KRAJ

      //deo za firebase POCETAK
      //ako korisnik odabere recimo 2fajla pa klikne ok i ono prikaze "2 files",
      //pa klikne opet pa odabere jos 3 fajla...da api za upload ce prikazati samo ta 3 fajla ali array this.files = [];
      //ce imati vec u nizu prva dva fajla i samo ce dodati ova 3 fajla i u firebase ce se snimiti sva 5 fajla zato na pocetku mora prazan niz
      //   this.filesFirebase = [];
      let fileList = event.target.files || event.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.filesFirebase.push(fileList[x]);
      });

      //slanje slika za FireBase
      this.$store.dispatch("licitacije_slike", {
        slikeZa: this.slikeZa, //dobijal kao prop od parenta
        slike: this.filesFirebase,
      });
      //deo za firebase KRAJ
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
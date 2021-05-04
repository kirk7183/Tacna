<template>
  <div class="timer">
    <div v-if="zavrsenoPoruka != 'Završena licitacija'" class="d-flex">
      <div class="card" v-for="(time, i) in times" :key="i">
        <div class="card-block">
          <p class="card-title">
            {{ time.time }}
          </p>
        </div>
        <div class="card-footer">
          {{ time.text }}
        </div>
      </div>
    </div>
    <div v-if="zavrsenoPoruka == 'Završena licitacija'" class="zavrsenoPoruka">
      {{ zavrsenoPoruka }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["startTime", "endTime", "single_data", "keya"],
  data() {
    return {
      //ovako treba da izgleda format koji componenta prima
      //   startTime: "December 14, 2020 11:00:00",
      //   endTime: "December 14, 2020 05:00:05 PM",
      times: [
        { id: 0, text: "Dan", time: 1 },
        { id: 1, text: "Sat", time: 1 },
        { id: 2, text: "Min", time: 1 },
        { id: 3, text: "Sek", time: 1 },
      ],
      progress: 100,
      // isActive: false,
      timeinterval: undefined,
      zavrsenoPoruka: null,
    };
  },
  beforeMount: function () {
    this.updateTimer();
    this.timeinterval = setInterval(this.updateTimer, 1000);
  },
  methods: {
    updateTimer: function () {
      if (
        //ovaj uslov je ispunjen (uvek je vise od 0 zato sto je
        //u data() postavljeno da bude 1)
        this.times[3].time > 0 ||
        this.times[2].time > 0 ||
        this.times[1].time > 0 ||
        this.times[0].time > 0
      ) {
        this.getTimeRemaining();
        this.updateProgressBar();
        this.startTime;
      } else {
        //nakon odbrojavanja da kada dodje sve do nula "0" da stavi zavrsena licitacija
        this.zavrsenoPoruka = "Završena licitacija";
        clearTimeout(this.timeinterval);
        this.progress = 0;
      }
    },
    getTimeRemaining: function () {
      let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
      if (t >= 0) {
        this.times[3].time = Math.floor((t / 1000) % 60); //seconds
        this.times[2].time = Math.floor((t / 1000 / 60) % 60); //minutes
        this.times[1].time = Math.floor((t / (1000 * 60 * 60)) % 24); //hours
        this.times[0].time = Math.floor(t / (1000 * 60 * 60 * 24)); //days
      } else {
        //PRILIKOM PRVOG PRIKAZA STRANICE DA ODMAH STAVI DA JE ZAVRSENA LICITACIJA
        //POCETAK
        //kada izracuna razliku ako je 0 ili ispod 0 onda odradi ovaj block code-a
        clearTimeout(this.timeinterval);
        this.progress = 0;
        this.zavrsenoPoruka = "Završena licitacija";
        //KRAJ
        this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
        this.progress = 0;
      }
    },
    updateProgressBar: function () {
      let startTime = Date.parse(new Date(this.startTime));
      let currentTime = Date.parse(new Date());
      let endTime = Date.parse(new Date(this.endTime));
      let interval = parseFloat(
        ((currentTime - startTime) / (endTime - startTime)) * 100
      ).toFixed(2);
      this.progress = 100 - interval;
    },
  },
};
</script>

<style>
</style>
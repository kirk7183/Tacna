<template>
  <div class="timer">
    <div v-if="zavrsenoPoruka === null" class="d-flex">
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
    <div v-if="zavrsenoPoruka != null" class="zavrsenoPoruka">
      {{ zavrsenoPoruka }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["startTime", "endTime", "single_data"],
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
        this.times[3].time > 0 ||
        this.times[2].time > 0 ||
        this.times[1].time > 0 ||
        this.times[0].time > 0
      ) {
        this.getTimeRemaining();
        this.updateProgressBar();
        this.startTime;
      } else {
        clearTimeout(this.timeinterval);
        // this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
        this.progress = 0;
        this.zavrsenoPoruka = "Završena licitacija";

        // slanje u Vuex kako bi se prebacilo u listu zavrsenih licitacija
        this.$store.dispatch("zavrsene_licitacije_move", this.single_data);
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
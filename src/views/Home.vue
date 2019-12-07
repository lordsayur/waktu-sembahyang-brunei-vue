<template>
  <v-carousel 
    height="100%"
    hide-delimiter-background 
    :show-arrows="false"
  >
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="i"
    >
      <v-sheet
        color="transparent"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <!-- DATE  -->
            <div class="date">
              <span>{{ date.masihi }}</span>
              <span class="divider">|</span>
              <span>{{ date.hijrah }}</span>
            </div>
            <!-- DAY -->
            <h1>{{ day }}</h1>
            <!-- TIMER -->
            <div>
              <p>111 minit lagi kn masuk waktu Maghrib</p>
            </div>
            <!-- PRAYER TIME -->
            <div v-for="(prayer, index) in prayers" :key="index" class="d-flex justify-center">
              <span>{{ prayer.name }}</span>
              <span class="divider">:</span>
              <span>{{prayer.time}} {{ prayer.state}}</span>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        colors: [
          'blue-grey darken-1',
          'blue-grey darken-1',
          'blue-grey darken-1'
        ],
        date: {
          hijrah: '10 RABIULAKHIR  1441',
          masihi: '17 DECEMBER 2019',
        },
        day: "Isnin",
        prayers: [
          {
            name: 'Imsak',
            time: '05:00',
            state: 'am'
          },
          {
            name: 'Subuh',
            time: '05:00',
            state: 'am'
          },
          {
            name: 'Dhuha',
            time: '05:00',
            state: 'am'
          },
          {
            name: 'Zuhur',
            time: '05:00',
            state: 'pm'
          },
          {
            name: 'Asar',
            time: '05:00',
            state: 'pm'
          },
          {
            name: 'Maghrib',
            time: '05:00',
            state: 'pm'
          },
          {
            name: 'Isya',
            time: '05:00',
            state: 'pm'
          },
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
.date{
  font-size: .8rem;
}
.divider{
  padding:0 2.5vw;
}
</style>

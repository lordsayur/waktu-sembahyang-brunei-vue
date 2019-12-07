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

            <!-- DAY -->
            <h1>{{ day }}</h1>
            <!-- DATE  -->
            <display-info 
              class="date"
              :left-text="day.date.masihi" 
              middle-text="|" 
              :right-text="day.date.hijrah" 
            />

            <!-- TIMER -->
            <count-down :time="10" prayer="Maghrib"/>

            <!-- PRAYER TIME -->
            <display-info 
              v-for="(prayer, index) in day.prayers" 
              :key="index"
              class="prayer"
              :left-text="prayer.name" 
              middle-text=":" 
              :right-text="`${prayer.time} ${prayer.state}`"
              :isActive="prayer.name === 'Zuhur'"
            />

          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
// Component 
  import DisplayInfo from '@/components/DisplayInfo';
  import CountDown from '@/components/CountDown';
  
  export default {
    name: 'Home',
    components: {
      'display-info': DisplayInfo,
      'count-down': CountDown,
    },

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
.prayer{
  font-size: 1.5rem;
}
</style>

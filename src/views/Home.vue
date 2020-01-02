<template>
  <v-carousel 
    height="100%"
    hide-delimiter-background 
    :show-arrows="false"
  >
    <v-carousel-item
      v-for="(day, index) in days"
      :key="index"
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
            <h1>{{ day.name }}</h1>

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
import { eventBus } from '@/main';

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
        selectedDistrict: 'brunei',
        days: [
          {
            name: "Isnin",
            date: {
              hijrah: '10 RABIULAKHIR  1441',
              masihi: '17 DECEMBER 2019',
            },
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
          },
        ],
      }
    },
      this.registerEventBus();

      registerEventBus(){
        eventBus.$on('districtClicked', data => {
          this.selectedDistrict = data;
        })
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

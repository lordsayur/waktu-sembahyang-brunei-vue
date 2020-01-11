<template>
  <v-carousel height="100%" hide-delimiter-background :show-arrows="false">
    <v-carousel-item v-for="(day, dayIndex) in days" :key="dayIndex">
      <v-sheet color="transparent" height="100%" tile>
        <v-row class="fill-height" align="center" justify="center">
          <v-col class="text-center">
            <!-- Loader -->
            <v-progress-circular
              v-if="!isDisplayApp"
              indeterminate
              color="primary"
            ></v-progress-circular>

            <div v-else>
              <!-- DAY -->
              <h1>{{ day.name }}</h1>

              <!-- DATE  -->
              <display-info
                class="date"
                :left-text="GetMasihiDate"
                middle-text="|"
                :right-text="day.date.hijrah"
              />

              <!-- TIMER -->
              <count-down
                v-if="
                  dayIndex == 0 && !(currentPrayerTime.currentPrayer === 'Isya')
                "
                :prayers-data="getTodayPrayerTime"
                :TodayDate="TodayDate"
                v-on:updatePrayerTime="updatePrayerTime($event)"
              />

              <!-- PRAYER TIME -->
              <display-info
                v-for="(prayer, prayerIndex) in day.prayers"
                :key="prayerIndex"
                class="prayer"
                :showPrayerTime="showPrayerTime"
                :prayerIndex="prayerIndex"
                :dayIndex="dayIndex"
                :left-text="prayer.name"
                middle-text=":"
                :right-text="DisplayPrayerTime(prayer)"
                :isActive="
                  prayer.name === currentPrayerTime.currentPrayer &&
                    dayIndex == 0
                "
              />
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { eventBus } from "@/main";
const moment = require("moment");

// Component
import DisplayInfo from "@/components/DisplayInfo";
import CountDown from "@/components/CountDown";

export default {
  name: "Home",
  components: {
    "display-info": DisplayInfo,
    "count-down": CountDown
  },

  data() {
    return {
      prayerData: {},
      selectedDistrict: "brunei",
      isDisplayApp: false,
      days: [
        {
          name: "Isnin",
          date: {
            hijrah: "10 RABIULAKHIR  1441",
            masihi: "17 DECEMBER 2019"
          },
          prayers: [
            {
              name: "Imsak",
              time: "05:00",
              state: "am"
            },
            {
              name: "Subuh",
              time: "05:00",
              state: "am"
            },
            {
              name: "Dhuha",
              time: "05:00",
              state: "am"
            },
            {
              name: "Zuhur",
              time: "05:00",
              state: "pm"
            },
            {
              name: "Asar",
              time: "05:00",
              state: "pm"
            },
            {
              name: "Maghrib",
              time: "05:00",
              state: "pm"
            },
            {
              name: "Isya",
              time: "05:00",
              state: "pm"
            }
          ]
        }
      ],
      day: {
        today: 0,
        tomorrow: 1,
        dayAfterTomorrow: 2
      }
    };
  },

  created() {
    this.registerEventBus();
    this.days = [];
    this.formatandPushPrayerDataToDays(this.day.today);
    this.formatandPushPrayerDataToDays(this.day.tomorrow);
    this.formatandPushPrayerDataToDays(this.day.dayAfterTomorrow);
  },

  methods: {
    formatandPushPrayerDataToDays(offsetDay) {
      this.days.push(this.GetPrayerData(offsetDay));
    },

    getDateData(dateOffset) {
      var todayDate = moment().add(dateOffset, "day");
      const day_name = this.$store.getters["days/getDisplayDayName"](
        todayDate.day()
      );
      const day_number = todayDate.date() - 1;
      const month = this.$store.getters["months/getComputerMonthName"](
        todayDate.month()
      );
      return {
        day_name,
        day_number,
        month
      };
    },

    getPrayerData(date) {
      var prayer_data = this.$store.getters["prayers/getPrayerData"](date);
      this.wsbPrint("Prayer Data:", prayer_data);
      return prayer_data;
    },

    GetPrayerData(offsetDay) {
      const today_date = this.getDateData(offsetDay);
      const prayer_data = this.getPrayerData(today_date);

      var tempObject = {};
      tempObject.name = prayer_data.day;
      tempObject.date = {};
      tempObject.date.hijrah = prayer_data.Tarikh;
      tempObject.date.masihi = prayer_data.Date;
      tempObject.prayers = [];

      var prayersTime = this.$store.getters["prayers/getPrayersTime"];

      prayersTime.forEach(time => {
        var tempPrayerObj = {};
        tempPrayerObj.name = time.name;
        tempPrayerObj.time = prayer_data[time.name];
        tempPrayerObj.state = time.state;
        tempObject.prayers.push(tempPrayerObj);
      });
      return tempObject;
    },

    registerEventBus() {
      eventBus.$on("districtClicked", data => {
        this.selectedDistrict = data;
      });

    getDisplayAppStatus() {
      setTimeout(() => {
        this.isDisplayApp = true;
      }, 1000);
    }
  },

    }
  }
};
</script>

<style lang="scss" scoped>
.date {
  font-size: 0.8rem;
}
.prayer {
  font-size: 1.5rem;
}
</style>

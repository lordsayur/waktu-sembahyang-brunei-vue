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
                :left-text="GetMasihiDate(dayIndex)"
                middle-text="|"
                :right-text="day.date.hijrah"
              />

              <!-- TIMER -->
              <count-down
                v-if="dayIndex == 0 && !IsIsyaAndBeforeMidnight"
                :prayers-data="getTodayPrayerTime"
                :TodayDate="TodayDate"
                v-on:updatePrayerTime="updatePrayerTime($event)"
              />

              <!-- PRAYER TIME -->
              <display-info
                v-for="(prayer, prayerIndex) in day.prayers"
                :key="prayerIndex"
                class="prayer"
                :isBeforeZuhur="IsBeforeZuhur"
                :prayerIndex="prayerIndex"
                :dayIndex="dayIndex"
                :left-text="prayer.name"
                middle-text=":"
                :right-text="DisplayPrayerTime(prayer)"
                :isActive="
                  prayer.name === currentPrayerTime.currentPrayer &&
                    dayIndex == 0
                "
                :prayerTime="currentPrayerTime"
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
import { add, isAfter, isBefore } from "date-fns";

// Component
import DisplayInfo from "@/components/DisplayInfo";
import CountDown from "@/components/CountDown";

/**
 * @group Page
 * This is the Main page.
 */
export default {
  name: "Home",
  components: {
    "display-info": DisplayInfo,
    "count-down": CountDown,
  },

  data() {
    return {
      prayerData: {},
      selectedDistrict: "brunei",
      currentPrayerTime: {},
      TodayDate: new Date(),
      isDisplayApp: false,
      days: [
        {
          name: "Isnin",
          date: {
            hijrah: "10 RABIULAKHIR  1441",
            masihi: "17 DECEMBER 2019",
          },
          prayers: [
            {
              name: "Imsak",
              time: "05:00",
              state: "am",
            },
          ],
        },
      ],
      day: {
        today: 0,
        tomorrow: 1,
        dayAfterTomorrow: 2,
      },
      districtOffset: {
        brunei: 0,
        tutong: 1,
        belait: 3,
      },
    };
  },

  async created() {
    await this.$store.dispatch("prayers/getPrayerData");

    let customDateTime = this.$route.query.dt;
    if (customDateTime) {
      this.TodayDate = new Date(customDateTime);
      if (this.$route.query.speed) {
        setInterval(() => {
          this.TodayDate = add(this.TodayDate, {
            [this.$route.query.interval]: 1,
          });
        }, this.$route.query.speed);
      }
    } else {
      setInterval(() => {
        this.TodayDate = new Date();
      }, 500);
    }

    this.registerEventBus();
    this.updateData();
    this.getDisplayAppStatus();
  },

  methods: {
    updateData() {
      this.days = [];
      try {
        this.formatandPushPrayerDataToDays(this.day.today);
        this.formatandPushPrayerDataToDays(this.day.tomorrow);
        this.formatandPushPrayerDataToDays(this.day.dayAfterTomorrow);
      } catch (error) {
        console.error(error);
      }
    },

    formatandPushPrayerDataToDays(offsetDay) {
      this.days[offsetDay] = this.GetPrayerData(offsetDay);
      this.updatePrayerDataBasedOnDistrict(offsetDay);
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

      prayersTime.forEach((time) => {
        var tempPrayerObj = {};
        tempPrayerObj.name = time.name;
        tempPrayerObj.time = prayer_data[time.name];
        tempPrayerObj.state = time.state;

        tempPrayerObj.time = this.$prasePrayerTime(
          tempPrayerObj.time,
          tempPrayerObj.state,
          this.TodayDate
        );

        tempObject.prayers.push(tempPrayerObj);
      });

      if (offsetDay === this.day.tomorrow) {
        this.days[0].prayers[8] = tempObject.prayers[0];
        this.days[0].prayers[9] = tempObject.prayers[1];
      }
      return tempObject;
    },

    getDateData(dateOffset) {
      let todayDate = add(this.TodayDate, { days: dateOffset });
      const day_name = this.$store.getters["days/getDisplayDayName"](
        todayDate.getDay()
      );
      const day_number = todayDate.getDate() - 1;
      const month = this.$store.getters["months/getComputerMonthName"](
        todayDate.getMonth()
      );
      return {
        day_name,
        day_number,
        month,
      };
    },

    getPrayerData(date) {
      var prayer_data = this.$store.getters["prayers/getPrayerData"](date);
      return prayer_data;
    },

    updatePrayerDataBasedOnDistrict(offsetDay) {
      this.days[offsetDay].prayers.forEach((prayer) => {
        prayer.time = add(prayer.time, {
          minutes: this.districtOffset[this.selectedDistrict],
        });
      });
    },

    updatePrayerTime(prayerTime) {
      this.currentPrayerTime = prayerTime;
    },

    registerEventBus() {
      // Update prayer data if selected district is changed
      eventBus.$on("districtClicked", (data) => {
        this.selectedDistrict = data;
        this.updateData();
      });
    },

    getDisplayAppStatus() {
      setTimeout(() => {
        this.isDisplayApp = true;
      }, 1000);
    },
  },

  computed: {
    getTodayPrayerTime() {
      return this.days[0].prayers;
    },

    IsBeforeZuhur() {
      return this.currentPrayerTime.currentPrayerIndex < 4;
    },

    DisplayPrayerTime() {
      return (prayer) => {
        let hour = prayer.time.getHours();
        let minute = prayer.time.getMinutes();

        if (hour > 12) {
          hour = hour - 12;
        }

        if (hour < 10) {
          hour = "0" + hour;
        }

        if (minute < 10) {
          minute = "0" + minute;
        }

        return `${hour}:${minute} ${prayer.state}`;
      };
    },

    GetMasihiDate() {
      return (offset) => {
        let date = add(this.TodayDate, { days: offset });
        let day = date.getDate();
        let month = this.$store.getters["months/getDisplayMonthName"](
          date.getMonth()
        );
        let year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };
    },

    IsIsyaAndBeforeMidnight() {
      let afterSeven = new Date(this.TodayDate.getTime());
      afterSeven.setHours(19);
      afterSeven.setMinutes(0);
      afterSeven.setSeconds(0);

      let midnight = new Date(this.TodayDate.getTime());
      midnight.setHours(23);
      midnight.setMinutes(59);
      midnight.setSeconds(59);

      return (
        isAfter(this.TodayDate, afterSeven) &&
        isBefore(this.TodayDate, midnight) &&
        this.currentPrayerTime.currentPrayer == "Isya"
      );
    },
  },
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

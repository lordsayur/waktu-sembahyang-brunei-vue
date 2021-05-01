<template>
  <v-progress-circular
    id="loader"
    v-if="!hasData"
    indeterminate
    color="primary"
  />
  <v-carousel
    v-else
    height="100%"
    hide-delimiter-background
    :show-arrows="false"
  >
    <v-carousel-item v-for="(day, dayIndex) in days" :key="dayIndex">
      <v-sheet color="transparent" height="100%" tile>
        <v-row style="height:100%" align="center" justify="center">
          <v-col class="text-center">
            <!-- DAY -->
            <h1>{{ day.name }}</h1>

            <section id="debug" v-if="IsDebugging">
              <button @click="addDT('hours')">➕</button>
              {{ TodayDate.getHours() }} h
              <button @click="subDT('hours')">➖</button>
              <button @click="addDT('minutes')">➕</button>
              {{ TodayDate.getMinutes() }} m
              <button @click="subDT('minutes')">➖</button>
              <button @click="addDT('seconds')">➕</button>
              {{ TodayDate.getSeconds() }} s
              <button @click="subDT('seconds')">➖</button>
            </section>

            <!-- DATE  -->
            <display-info
              class="date"
              :left-text="GetMasihiDate(dayIndex)"
              middle-text="|"
              :right-text="GetHijrahDate"
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
                prayer.name === currentPrayerTime.currentPrayer && dayIndex == 0
              "
              :prayerTime="currentPrayerTime"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { eventBus } from "@/main";
import { add, sub, isWithinInterval } from "date-fns";

// Component
import DisplayInfo from "@/components/DisplayInfo";
import CountDown from "@/components/CountDown";
import { mapState } from "vuex";

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
      days: [],
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
      debugData: null,
    };
  },

  mounted() {
    this.initTodayDate();
    this.registerEventBus();
    if (this.hasData) this.updateData();
  },

  watch: {
    hasData(newData, oldData) {
      if (newData && !oldData) {
        this.updateData();
      }
    },
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
          add(this.TodayDate, { days: offsetDay })
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
        if (this.hasData) this.updateData();
      });
    },

    addDT(interval) {
      this.TodayDate = add(this.TodayDate, { [interval]: 1 });
    },

    subDT(interval) {
      this.TodayDate = sub(this.TodayDate, { [interval]: 1 });
    },

    initTodayDate() {
      if (this.$route.query.d) {
        localStorage.setItem(
          "debug_data",
          JSON.stringify({
            isDebugging: this.$route.query.d || false,
            customDateTime: this.$route.query.dt || "",
            speed: this.$route.query.s || 1000,
            interval: this.$route.query.i || "minutes",
          })
        );
      }

      this.debugData = JSON.parse(localStorage.getItem("debug_data")) ?? {};

      if (this.IsDebugging) {
        this.TodayDate = this.debugData.customDateTime
          ? new Date(this.debugData.customDateTime)
          : new Date();

        if (this.debugData.interval) {
          setInterval(() => {
            this.TodayDate = add(this.TodayDate, {
              [this.debugData.interval]: 1,
            });
          }, this.debugData.speed);
        }
      } else {
        setInterval(() => {
          this.TodayDate = new Date();
        }, 500);
      }
    },
  },

  computed: {
    ...mapState({
      hasData: (state) => state.prayers.hasData,
    }),
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

    GetHijrahDate() {
      const reg = /[0-9]+/m;
      const today = this.days[0].date.hijrah;

      if (
        this.currentPrayerTime.currentPrayerIndex > 5 &&
        this.IsFirstHalfNight
      ) {
        const day = today.match(reg);
        const nextDay = +day + 1;
        const nextDate = today.replace(reg, nextDay);

        return nextDay < 10 ? "0" + nextDate : nextDate;
      }

      return today;
    },

    IsFirstHalfNight() {
      let afterSix = new Date(this.TodayDate.getTime());
      afterSix.setHours(18);
      afterSix.setMinutes(0);
      afterSix.setSeconds(0);

      let midnight = new Date(this.TodayDate.getTime());
      midnight.setHours(23);
      midnight.setMinutes(59);
      midnight.setSeconds(59);

      return isWithinInterval(this.TodayDate, {
        start: afterSix,
        end: midnight,
      });
    },

    IsIsyaAndBeforeMidnight() {
      return (
        this.IsFirstHalfNight && this.currentPrayerTime.currentPrayer == "Isya"
      );
    },

    IsDebugging() {
      return this.debugData.isDebugging ?? false;
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
#debug {
  padding: 2rem;
  border: 1px solid white;
  width: 50%;
  margin: 1rem auto;
  button {
    padding: 0.5rem;
  }
}
#loader {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

<template>
  <div class="count-down">
    <p v-if="!nextPrayer.name">Assalamualaikum</p>
    <p v-else-if="isIn">Sudah masuk waktu {{ nextPrayer.name }}</p>
    <p v-else>
      <span :class="{ active: isActive }">{{ time }}</span> minit lagi kn masuk
      waktu <span :class="{ active: isActive }">{{ nextPrayer.name }}</span>
    </p>
  </div>
</template>

<script>
import { eventBus } from "@/main";
const moment = require("moment");

/**
 * @group Component
 * This component display the count down to next prayer time.
 */
export default {
  name: "CountDown",

  props: {
    // Contains all data related about prayer time.
    prayersData: {
      type: Array,
      required: true,
    },

    // Contain today's date. All today's date is shared from one source for easy debugging.
    TodayDate: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Symbol,
      required: true,
    },
    // The starting time value that need to be highlighted
    activeStart: {
      type: Number,
      required: false,
      default: 15,
    },
  },

  data() {
    return {
      nextPrayer: {},
      time: "10",
      isIn: false,
    };
  },

  created() {
    setInterval(() => {
      this.nextPrayer = this.getStatus().nextPrayer;
      this.updatePrayerTime();
      this.time = this.updateCountdown();
    }, 500);
  },

  methods: {
    getStatus() {
      let currentTime = moment(this.$props.TodayDate);
      let currentPrayer = "";
      let currentPrayerIndex = 0;
      let nextPrayer = {};

      this.$props.prayersData.forEach((prayer, index) => {
        if (index > 7) {
          return;
        }

        let prayerTime = prayer;
        let isCurrentTimeLessThanNextPrayerTime =
          moment.duration(prayerTime.time.diff(currentTime))._data.minutes < 0;
        let isCurrentTimeEqualToNextPrayerTime =
          prayerTime.time.minute() === currentTime.minute() &&
          prayerTime.time.hour() === currentTime.hour();

        if (isCurrentTimeLessThanNextPrayerTime) {
          currentPrayer = prayer.name;
          currentPrayerIndex = index;
          nextPrayer.name = this.$props.prayersData[index + 1].name;
          nextPrayer.index = index + 1;
          if (currentPrayerIndex > 3) {
            eventBus.$emit("preImsak", false);
          }
        } else {
          if (index === 0) {
            // Set preImsak to be true
            // @arg The argument is a boolean value representing the state of pre Imsak
            eventBus.$emit("preImsak", true);
          } else if (this.nextPrayer.index !== index) {
            return;
          }
          if (index === 0) {
            nextPrayer.name = "Imsak";
            nextPrayer.index = 0;
            currentPrayer = "Isya";
            currentPrayerIndex = 7;
          }
          if (isCurrentTimeEqualToNextPrayerTime) {
            this.isIn = true;
            currentPrayer = nextPrayer.name;
          } else {
            this.isIn = false;
            if (index === 0) {
              this.isIn = true;
            }
          }
        }
      });

      return {
        currentPrayer,
        currentPrayerIndex,
        nextPrayer,
      };
    },

    updateCountdown() {
      let currentTime = moment(this.$props.TodayDate);
      let nextPrayerIndex = this.nextPrayer.index;
      if (nextPrayerIndex === undefined) {
        nextPrayerIndex = 0;
      }
      let prayerTime = this.$props.prayersData[nextPrayerIndex];
      let time = moment.duration(prayerTime.time.diff(currentTime))._data;
      let minutes = time.hours * 60 + time.minutes + 1;
      return minutes;
    },

    updatePrayerTime() {
      // Update prayer time.
      // @arg The argument is an object value contain status of current time.
      this.$emit("updatePrayerTime", this.getStatus());
    },
  },

  computed: {
    isActive() {
      return this.time < this.$props.activeStart;
    },
  },
};
</script>

<style lang="scss" scoped>
.count-down {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  margin: 1rem 5vw;

  p {
    margin: 0.5rem 0.2rem;
    color: gray;
    font-size: 1.2rem;
  }
}
span.active {
  color: #ffeb3b;
}
</style>

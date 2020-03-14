<template>
  <div class="count-down">
    <p
      v-if="
        !nextPrayer.name ||
          (getStatus().currentPrayer.includes('Isya') && !isPreImsak)
      "
    >
      Assalamualaikum
    </p>
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
      required: true
    },

    // Contain today's date. All today's date is shared from one source for easy debugging.
    TodayDate: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Symbol,
      required: true
    },
    // The starting time value that need to be highlighted
    activeStart: {
      type: Number,
      required: false,
      default: 15
    }
  },

  data() {
    return {
      nextPrayer: {},
      time: "10",
      isPreImsak: false,
      isIn: false
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
      let prayersData = this.$props.prayersData;

      for (let index = 0; index < prayersData.length; index++) {
        if (index > 7) {
          return;
        }

        let prayer = prayersData[index];
        let nextPrayer = prayersData[index + 1];

        // Hanlde Isya
        if (index === 7) {
          return {
            currentPrayer: "Isya",
            currentPrayerIndex: 7,
            nextPrayer: {
              name: "Imsak",
              index: 0
            }
          };
        }

        // Handle pre imsak
        let isCurrentTimeIsPreImsak = currentTime.isBefore(prayersData[0].time);
        if (isCurrentTimeIsPreImsak) {
          this.isPreImsak = true;
          eventBus.$emit("preImsak", true);
          return {
            currentPrayer: "Isya",
            currentPrayerIndex: 7,
            nextPrayer: {
              name: "Imsak",
              index: 0
            }
          };
        }
        this.isPreImsak = false;
        eventBus.$emit("preImsak", false);

        // Handle other prayers
        let isCurrentTimeIsDuringThisPrayerTime = currentTime.isBetween(
          prayer.time,
          nextPrayer.time,
          null,
          "[)"
        );
        if (isCurrentTimeIsDuringThisPrayerTime) {
          return {
            currentPrayer: prayer.name,
            currentPrayerIndex: index,
            nextPrayer: {
              name: nextPrayer.name,
              index: index + 1
            }
          };
        }
      }
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
    }
  },

  computed: {
    isActive() {
      return this.time < this.$props.activeStart;
    }
  }
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

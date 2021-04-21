<template>
  <div class="count-down">
    <p v-if="!nextPrayer.name">Assalamualaikum</p>
    <p v-else-if="isIn">Sudah masuk waktu {{ currentPrayer }}</p>
    <p v-else>
      <span :class="{ active: isActive }">{{ time }}</span> minit lagi kn masuk
      waktu <span :class="{ active: isActive }">{{ nextPrayer.name }}</span>
    </p>
  </div>
</template>

<script>
import { differenceInMinutes, isAfter, subSeconds, isBefore } from "date-fns";

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
      currentPrayer: "",
      currentTime: null,
      time: "10",
      isIn: false,
    };
  },

  created() {
    setInterval(() => {
      this.currentTime = this.$props.TodayDate;

      this.nextPrayer = this.getStatus().nextPrayer;
      this.currentPrayer = this.getStatus().currentPrayer;
      this.updatePrayerTime();
      this.time = this.updateCountdown();
      // this.currentTime = add(this.currentTime, { minutes: 1 });
    }, 100);
  },

  methods: {
    getStatus() {
      let currentPrayer = "";
      let currentPrayerIndex = 0;
      let nextPrayer = {};

      this.$props.prayersData.forEach((prayer, index) => {
        // Dont check if prayer is nextImsak and nextSubuh
        if (index > 7) {
          return;
        }

        let prayerTime = prayer;
        let isPrayerTimeCurrentlyIn = isAfter(
          this.currentTime,
          subSeconds(prayerTime.time, 1)
        );
        let isPrayerTimeIn =
          prayerTime.time.getMinutes() === this.currentTime.getMinutes() &&
          prayerTime.time.getHours() === this.currentTime.getHours();

        if (isPrayerTimeCurrentlyIn) {
          currentPrayer = prayer.name;
          currentPrayerIndex = index;
          nextPrayer.name = this.$props.prayersData[index + 1].name;
          nextPrayer.index = index + 1;

          this.isIn = isPrayerTimeIn;

          // if current prayer is zohor onwards, hide today's imsak, subuh & doha
        }

        if (isBefore(this.currentTime, this.$props.prayersData[0].time)) {
          currentPrayer = "Isya";
          currentPrayerIndex = 7;
          nextPrayer.name = "Imsak";
          nextPrayer.index = 0;
        }
        // else {
        //   if (this.nextPrayer.index !== index) return;

        //   if (index === 0) {
        //     currentPrayer = "Isya";
        //     currentPrayerIndex = 7;
        //   }
        // }
        //   if (index === 0) {
        //     this.isIn = true;
        //   }
      });

      return {
        currentPrayer,
        currentPrayerIndex,
        nextPrayer,
      };
    },

    updateCountdown() {
      let nextPrayerIndex = this.nextPrayer.index;
      if (nextPrayerIndex === undefined) {
        nextPrayerIndex = 0;
      }
      let prayerTime = this.$props.prayersData[nextPrayerIndex];
      let minutes = differenceInMinutes(prayerTime.time, this.currentTime);
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

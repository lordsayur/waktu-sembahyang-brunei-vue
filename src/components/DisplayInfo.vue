<template>
  <div
    v-if="isVisible"
    class="d-flex justify-center info-display"
    :class="{ active: isActive }"
  >
    <span class="left">{{ leftText }}</span>
    <span class="divider">{{ middleText }}</span>
    <span class="right">{{ rightText }}</span>
  </div>
</template>

<script>
/**
 * @group Component
 * This component display information about the prayer time.
 */
export default {
  name: "DisplayInfo",
  props: {
    // Show or hide the specific info
    isBeforeZuhur: {
      type: Boolean,
    },
    // Index of the info in the data's array
    prayerIndex: {
      type: Number,
    },
    // Index of the day in the data's array
    dayIndex: {
      type: Number,
    },
    // Text on the left side
    leftText: {
      type: String,
      required: true,
      default: "left",
    },
    // Text on the right side
    rightText: {
      type: String,
      required: true,
      default: "right",
    },
    // Text on the middle
    middleText: {
      type: String,
      required: true,
      default: ",",
    },
    // If the specific info need to be highlighted
    isActive: {
      type: Boolean,
      default: false,
    },
    prayerTime: {
      type: Object,
      required: false,
      default: null,
    },
  },

  computed: {
    isVisible() {
      if (!this.$props.prayerTime) return true;
      // Hide Imsak for next day
      if (
        this.$props.dayIndex > 0 &&
        this.$props.prayerTime.currentPrayerIndex < 8
      )
        return true;

      return (
        (this.$props.isBeforeZuhur && this.$props.prayerIndex < 8) ||
        (!this.$props.isBeforeZuhur && this.$props.prayerIndex > 3)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.info-display {
  margin: 0.2rem 0;
  .left {
    width: 45%;
    text-align: right;
  }
  .right {
    width: 45%;
    text-align: left;
  }
  .divider {
    width: 10%;
  }
  &.active {
    color: #ffeb3b;
  }
}
</style>

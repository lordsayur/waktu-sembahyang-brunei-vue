<template>
  <div
    v-if="FilterPrayer"
    class="d-flex justify-center info-display"
    :class="{ active: isActive }"
  >
    <span class="left">{{ leftText }}</span>
    <span class="divider">{{ middleText }}</span>
    <span class="right">{{ rightText }}</span>
  </div>
</template>

<script>
// import { type } from "os";
export default {
  name: "DisplayInfo",
  props: {
    showPrayerTime: {
      type: Boolean
    },
    prayerIndex: {
      type: Number
    },
    dayIndex: {
      type: Number
    },
    leftText: {
      type: String,
      required: true,
      default: "left"
    },
    rightText: {
      type: String,
      required: true,
      default: "right"
    },
    middleText: {
      type: String,
      required: true,
      default: ","
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    FilterPrayer() {
      // Hide Imsak for next day
      if (this.$props.dayIndex == 0) {
        if (this.$props.prayerIndex < 4) {
          return this.$props.showPrayerTime;
        } else if (this.$props.prayerIndex > 7) {
          return !this.$props.showPrayerTime;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  }
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

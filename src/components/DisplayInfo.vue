<template>
  <div class="d-flex justify-center info-display" :class="{ active: isActive }">
    <span class="left">{{ leftText }}</span>
    <span class="divider">{{ middleText }}</span>
    <span class="right">{{ rightText }}</span>
  </div>
</template>

<script>
export default {
  name: "DisplayInfo",
  props: {
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

<template>
  <div class="d-flex justify-center info-display" :class="{ active: isActive }">
    <span class="left">{{ Texts.left }}</span>
    <span class="divider">{{ textSeparator }}</span>
    <span class="right">{{ Texts.right }}</span>
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
    // Text on the left side
    Texts: {
      type: Object,
      required: true
    },
    // Text on the middle
    textSeparator: {
      type: String,
      required: false,
      default: ":"
    },
    // If the specific info need to be highlighted
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

<template>
  <div style="height: 100%">
    <v-carousel height="100%" hide-delimiter-background :show-arrows="false">
      <prayer-info></prayer-info>
      <about-wsb></about-wsb>
    </v-carousel>
    <v-btn class="mx-2 refresh" fab small dark color="blue-grey darken-2">
      <v-icon dark @click="$router.go()">mdi-refresh</v-icon>
    </v-btn>
  </div>
</template>

<script>
// Component
import Prayer from "@/components/Home/Prayers";
import About from "@/components/Home/About";

/**
 * @group Page
 * This is the Main page.
 */
export default {
  name: "Home",
  components: {
    "prayer-info": Prayer,
    "about-wsb": About
  },

  data() {
    return {};
  },

  async created() {
    await this.$store.dispatch("prayers/getPrayerData");
  }
};
</script>

<style lang="scss" scoped>
.refresh {
  position: absolute;
  right: 0;
  bottom: 1%;
  z-index: 9999;
}
</style>

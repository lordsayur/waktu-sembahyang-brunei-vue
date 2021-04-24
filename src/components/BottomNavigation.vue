<template>
  <section id="bottom-nav">
    <!-- Menu -->
    <v-speed-dial
      v-model="menu"
      bottom
      right
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="menu" color="blue-grey darken-2" dark fab small>
          <v-icon v-if="menu" small color="grey">
            close
          </v-icon>
          <v-icon v-else small color="grey">
            menu
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-bottom-navigation
      v-model="selectedDistrict"
      app
      horizontal
      grow
      background-color="blue-grey darken-2"
      dark
      color="yellow"
    >
      <v-btn
        v-for="(district, index) in districts"
        :key="index"
        height="100%"
        :value="district.value"
        @click="updateSelectedDistrict(district.value)"
      >
        <span v-html="district.name"></span>
      </v-btn>
    </v-bottom-navigation>
  </section>
</template>

<script>
import { eventBus } from "@/main";

/**
 * @group App
 * This is the application bottom navigation.
 */
export default {
  name: "BottomNavigation",

  data() {
    return {
      menu: false,
      selectedDistrict: "brunei",
      districts: [
        {
          name: "Brunei Muara <br> Temburong",
          value: "brunei",
        },
        {
          name: "Tutong",
          value: "tutong",
        },
        {
          name: "Belait",
          value: "belait",
        },
      ],
    };
  },

  mounted() {
    this.selectedDistrict = this.getSelectedDistrict();
  },

  methods: {
    getSelectedDistrict() {
      return localStorage.getItem("selectedDistrict") || "Brunei";
    },
    updateSelectedDistrict(selectedDistrict) {
      // Stop this function if recently clicked district if the same as
      // currently selected district
      if (this.selectedDistrict === selectedDistrict) return;

      // Fire when the selected district is changed.
      // @arg The argument is a string value representing the text of the selected district
      eventBus.$emit("districtClicked", selectedDistrict);
      localStorage.setItem("selectedDistrict", selectedDistrict);
    },
    refresh() {
      location.reload();
    },
  },
};
</script>

<style lang="scss">
/* This is for documentation purposes and will not be needed in your application */
#bottom-nav .v-speed-dial {
  z-index: 9999;
  position: absolute;
  bottom: 5rem;
  right: 0;
}

#bottom-nav .v-btn--floating {
  position: relative;
}
</style>

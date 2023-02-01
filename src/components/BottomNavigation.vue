<template>
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
    <v-btn text icon @click="refresh">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-bottom-navigation>
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
    this.updateSelectedDistrict(this.selectedDistrict);
  },

  methods: {
    getSelectedDistrict() {
      return localStorage.getItem("selectedDistrict") || "brunei";
    },
    updateSelectedDistrict(selectedDistrict) {
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

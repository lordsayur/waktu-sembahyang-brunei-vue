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
  </v-bottom-navigation>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "BottomNavigation",
  data() {
    return {
      selectedDistrict: "brunei",
      districts: [
        {
          name: "Brunei Muara <br> Temburong",
          value: "brunei"
        },
        {
          name: "Tutong",
          value: "tutong"
        },
        {
          name: "Belait",
          value: "belait"
        }
      ]
    };
  },

  methods: {
    updateSelectedDistrict(selectedDistrict) {
      if (this.selectedDistrict === selectedDistrict) return;
      eventBus.$emit("districtClicked", selectedDistrict);
    }
  }
};
</script>

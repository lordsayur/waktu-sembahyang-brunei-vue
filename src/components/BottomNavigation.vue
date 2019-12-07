<template>
  <v-bottom-navigation
    v-model="selectedDistrict"
    app
    horizontal
    grow
    background-color="blue-grey darken-2"
    color="white"
  >

    <v-btn v-for="(district, index) in districts" :key="index" height="100%" :value="district.value">
      <span v-html="district.name"></span>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
  export default {
    name: 'BottomNavigation',
    data () {
      return {
        selectedDistrict: 'brunei',
        districts: [
          {
            name: "Brunei Muara <br> Temburong",
            value: 'brunei'
          },
          {
            name: "Tutong",
            value: 'tutong'
          },
          {
            name: "Belait",
            value: 'belait'
          },
        ]
      }
    },
  }
</script>
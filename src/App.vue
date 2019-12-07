<template>
<v-app>

  <v-content>
    <router-view></router-view>
  </v-content>

    <wsb-bottom-navigation></wsb-bottom-navigation>

</v-app>
</template>

<script>
import WSBBottomNavigation from "@/components/BottomNavigation.vue";

export default {
  name: "App",
    components: {
    'wsb-bottom-navigation':WSBBottomNavigation
  },

  data: () => ({
    //
  })
};
</script>

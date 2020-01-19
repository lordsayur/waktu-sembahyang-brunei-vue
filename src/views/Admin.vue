<template>
  <v-container fluid>
    <h1 class="text-white">Admin</h1>
    <h2 class="text-white">Update Prayer Time Database</h2>

    <v-select
      v-model="selected_month"
      outlined
      label="Months"
      :items="months"
      :item-text="months.text"
      :item-value="months.value"
    ></v-select>

    <v-textarea
      outlined
      label="Prayer time"
      v-model="originalText"
    ></v-textarea>

    <v-btn color="primary" class="mx-2" @click="convertText">Convert</v-btn>
    <v-btn color="primary" class="mx-2" @click="uploadData">Upload</v-btn>
    <router-link to="/">
      <v-btn color="primary" class="mx-1">Home</v-btn>
    </router-link>

    <ol>
      <li v-for="(line, index) in result" :key="index">
        <ul>
          <li v-for="(value, key) in line" :key="key">
            {{ key }} - {{ value }}
          </li>
        </ul>
      </li>
    </ol>

    <v-snackbar v-model="isUploaded">
      Upload successful
      <v-btn color="pink" text @click="isUploaded = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Admin",

  data() {
    return {
      selected_month: 0,
      months: {},
    };
  },

  created() {
    this.months = this.$store.getters["months/getAllDisplayMonthName"];
  },
};
</script>

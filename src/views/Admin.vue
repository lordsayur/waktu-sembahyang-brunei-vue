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

    <v-btn
      color="primary"
      :disabled="IsConvertable"
      class="mx-1"
      @click="convertText"
      >Convert</v-btn
    >
    <v-btn
      color="primary"
      :disabled="!state.isUploadable"
      :loading="state.isProcessing"
      class="mx-1"
      @click="uploadData"
      >Upload</v-btn
    >
    <router-link to="/">
      <v-btn color="primary" class="mx-1">Home</v-btn>
    </router-link>

    <v-simple-table v-if="result.length > 0">
      <template v-slot:default>
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="text-left"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in result" :key="index">
            <td>{{ data.Date }}</td>
            <td>
              <button type="button" @click="updateDay(1, index)">+</button>
              <input type="text" v-model="data.Tarikh" class="px-2" />
              <button type="button" @click="updateDay(-1, index)">-</button>
            </td>
            <td>{{ data.Imsak }}</td>
            <td>{{ data.Subuh }}</td>
            <td>{{ data.Syuruk }}</td>
            <td>{{ data.Duha }}</td>
            <td>{{ data.Zuhur }}</td>
            <td>{{ data.Asar }}</td>
            <td>{{ data.Maghrib }}</td>
            <td>{{ data.Isya }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-snackbar v-model="state.isUploaded">
      Upload successful
      <v-btn color="pink" text @click="state.isUploaded = false"> Close </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Vue from "vue";
import {
  updatePrayerByMonth,
  updateMetadata,
} from "@/infrastructure/firebase/firestore";

/**
 * @group Page
 * This is the Admin page.
 */
export default {
  name: "Admin",

  data() {
    return {
      selected_month: 0,
      months: {},
      originalText: "",
      result: [],
      days: [],
      state: {
        isUploadable: false,
        isUploaded: false,
        isProcessing: false,
      },
      headers: [
        { text: "Date", value: "Date" },
        { text: "Tarikh", value: "Tarikh" },
        { text: "Imsak", value: "Imsak" },
        { text: "Subuh", value: "Subuh" },
        { text: "Syuruk", value: "Syuruk" },
        { text: "Duha", value: "Duha" },
        { text: "Zuhur", value: "Zuhur" },
        { text: "Asar", value: "Asar" },
        { text: "Maghrib", value: "Maghrib" },
        { text: "Isya", value: "Isya" },
      ],
    };
  },

  created() {
    this.months = this.$store.getters["months/getAllDisplayMonthName"];
    this.$store.dispatch("prayers/getPrayerData");
  },

  methods: {
    convertText() {
      let splitTextByNewLine = this.splitTextBy("\n");
      let splitTextByTab = this.splitTextBy("\t");

      let linesOfText = splitTextByNewLine(this.originalText);

      this.days = [];
      linesOfText.forEach((line) => {
        let texts = splitTextByTab(line);
        let day = {};

        let properties = [
          "Date",
          "Tarikh",
          "Imsak",
          "Subuh",
          "Syuruk",
          "Duha",
          "Zuhur",
          "Asar",
          "Maghrib",
          "Isya",
        ];

        properties.forEach((property, index) => {
          day[property] = texts[index].replace(":", ".");
        });

        this.days.push(day);
      });

      this.result = this.days;
      this.state.isUploadable = true;
    },

    async uploadData() {
      try {
        this.state.isProcessing = true;

        // upload prayer data to firebase
        await updatePrayerByMonth(this.selected_month, this.days);

        // get current metadata version, increment it, and update firebase meta data version
        let localMetadata = this.$store.getters["prayers/getMetaData"];
        localMetadata = JSON.parse(localMetadata);

        await updateMetadata(localMetadata.version + 1);
        console.log("New metadata version", localMetadata.version + 1);

        this.state.isProcessing = false;
        this.state.isUploaded = true;
      } catch (error) {
        console.error(error);
      }
    },

    splitTextBy(splitBy) {
      return (text) => {
        return text.split(splitBy);
      };
    },

    updateDay(amount, index) {
      const tarikh = this.result[index].Tarikh;
      const tarikhSplitted = tarikh.split(" ");
      let day = +tarikhSplitted[0];
      day += amount;

      Vue.set(
        this.result[index],
        "Tarikh",
        `${day} ${tarikhSplitted[1]} ${tarikhSplitted[2]}`
      );
    },
  },

  computed: {
    IsConvertable() {
      if (this.originalText === "" || this.selected_month == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-white {
  color: white;
}
</style>

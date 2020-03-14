const moment = require("moment");

export default {
  methods: {
    wsbPrint(title, message) {
      if (message === undefined) {
        message = "";
      }

      if (isObject(title) && message === "") {
        console.log(JSON.stringify(title, undefined, 4));
        return;
      }

      if (isObject(message)) {
        console.log(title, JSON.stringify(message, undefined, 4));
        return;
      }

      console.log(title, message);
    },

    $getMomentPrayerTime(prayer) {
      // Add leading 0 for hour if not available
      if (prayer.time.length < 5) {
        prayer.time = `0${prayer.time}`;
      }
      var hour = +prayer.time.substring(0, 2);
      var minute = +prayer.time.substring(3, 5);

      if (prayer.state.includes("pm") && hour < 12) {
        hour = hour + 12;
      }

      return moment()
        .hour(hour)
        .minute(minute)
        .second(0);
    }
  }
};

function isObject(value) {
  if (value === "") value = "empty";
  if (value === undefined) value = "undefined";
  return value && typeof value === "object" && value.constructor === Object;
}

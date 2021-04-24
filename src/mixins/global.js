import Push from "push.js";

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

    $prasePrayerTime(prayerTime, prayerState, todayDate) {
      // Add leading 0 for hour if not available
      if (prayerTime.length < 5) {
        prayerTime = `0${prayerTime}`;
      }
      var hour = +prayerTime.substring(0, 2);
      var minute = +prayerTime.substring(3, 5);

      if (prayerState.includes("pm") && hour < 12) {
        hour = hour + 12;
      }

      let parsedPrayerTime = new Date(todayDate.getTime());
      parsedPrayerTime.setHours(hour);
      parsedPrayerTime.setMinutes(minute);
      parsedPrayerTime.setSeconds(0);

      return parsedPrayerTime;
    },

    $requestPushPermission() {
      if (!("Notification" in window)) return;

      if (Push.Permission.has()) return;

      Push.Permission.request(
        () => {
          this.$notify("Push notification is enabled.");
        },
        () => {
          this.$notify(
            "Push notification is disabled. You can enable it in your browser's settings."
          );
        }
      );
    },

    $notify(message) {
      this.$store.commit("notify", message);
    },
  },
};

function isObject(value) {
  if (value === "") value = "empty";
  if (value === undefined) value = "undefined";
  return value && typeof value === "object" && value.constructor === Object;
}

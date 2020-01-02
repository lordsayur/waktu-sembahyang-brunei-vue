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
    }
  }
};

function isObject(value) {
  if (value === "") value = "empty";
  if (value === undefined) value = "undefined";
  return value && typeof value === "object" && value.constructor === Object;
}

<template>
  <p id="version">lordsayur{{ Version }}</p>
</template>

<script>
let pjson = require("../../package.json");

export default {
  name: "Version",

  computed: {
    Version() {
      return pjson.version;
    },
  },
};
</script>

<style lang="scss">
#version {
  position: absolute;
  top: 0;
  left: 0;
  color: grey;
  font-size: 12px;
}
</style>

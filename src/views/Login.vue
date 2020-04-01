<template>
  <v-container fluid>
    <v-form v-on:submit.prevent="login">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <h1 style="color: grey;">Log In</h1>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-btn type="submit" small color="primary">Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-snackbar v-model="snackbar" color="error">
      {{ errorMessage }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { auth } from "../firebaseConfig";

/**
 * @group Page
 * This is the Admin page.
 */
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      errorMessage: ""
    };
  },

  created() {},

  methods: {
    login() {
      if (!this.email || !this.password) {
        this.errorMessage = "Please fill all fields.";
        this.snackbar = true;
        return;
      }
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          this.$router.push("admin");
        },
        error => {
          this.errorMessage = error.message;
          this.snackbar = true;
        }
      );
    }
  },

  computed: {}
};
</script>

<style lang="scss" scoped></style>

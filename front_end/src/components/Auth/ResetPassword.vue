<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Reset Password</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="resetPasswordForm">
              <v-text-field label="Email" name="email" type="email" v-model="user.email" />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                v-model="user.password"
              />
              <v-text-field
                id="password_confirmation"
                label="Password_confirmation"
                name="password_confirmation"
                type="password"
                v-model="user.password_confirmation"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" type="submit" @click="onResetPassword">Reset Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn color="pink" text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar> -->
  </v-container>
</template>

<script>
// import axios from "axios";

import { mapActions } from "vuex";

export default {
  name: "ResetPassword",
  data() {
    return {
      user: {
        email: "",
        password: "",
        password_confirmation: ""
      },
      snackbar: {
        show: false,
        text: "Success"
      }
    };
  },
  methods: {
    ...mapActions({
      resetPassword: "user/resetPassword",
      addNotification: "application/addNotification"

    }),
    onResetPassword() {
      if (this.$refs.resetPasswordForm.validate()) {
        // this.$store.dispatch('user/loginUser',this.user)
        // const token = this.$route.query.token
        const token = 12333333;

        this.resetPassword({ ...this.user, token })
          .then(response => {
            console.log(response);
            this.addNotification({
              show: true,
                text:"Password reset successfully"
              })
              .then(()=>{

                this.$router.push({ name: "login" });
              })
            // this.snackbar = {
            //   show: true,
            //   text: "Password reset successfully"
            // };
          })
          .catch(() => {
            this.addNotification({
                show: true,
                text: "Password reset failed"
              })
          });
      }
    }
  },
  created() {
    console.log("state 1234", this.$store.state);
  }
};
</script>

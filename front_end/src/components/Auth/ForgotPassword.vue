<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Forgot Password</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="forgotPasswordForm">
              <v-text-field label="Email" name="email" type="email" v-model="email" />

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" type="submit" @click="onForgotPassword">Reset Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
     <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn color="pink" text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
// import axios from "axios";

import { mapActions } from 'vuex'

export default {
  name: "ForgotPassword",
  data() {
    return {
        email: "",
        snackbar:{
          show:false,
          text:'Success'
      }
    };
  },
  methods: {
    ...mapActions({
      forgotPassword:'user/forgotPassword'
    }),
    onForgotPassword() {
      if (this.$refs.forgotPasswordForm.validate()) {
          this.forgotPassword({email:this.email})
          .then((response)=>{
              console.log(response.data)
              this.snackbar = {
                  show:true,
                  text:'Reset password email sent'
              }    
          })
          .catch(()=>{
            this.snackbar = {
                  show:true,
                  text:'Email not sent'
              }    
          })
      }
    }
  },
  created(){
    console.log('state 1234',this.$store.state)
  }
};
</script>
